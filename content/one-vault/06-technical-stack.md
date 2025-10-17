---
title: Technical Stack
permalink: /one-vault/06-technical-stack
tags:
aliases:
showDate: false
draft: true
---

signatures', -- 'pending_signatures', 'active', 'repaid', 'overdue', 'forgiven'
  contract_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Signatures
CREATE TABLE signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES loans(id),
  user_id UUID REFERENCES users(id),
  role TEXT NOT NULL, -- 'lender', 'borrower', 'witness'
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  UNIQUE(loan_id, user_id, role)
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_id UUID REFERENCES loans(id),
  amount_fiat DECIMAL(12, 2) NOT NULL,
  gold_grams_repaid DECIMAL(10, 4) NOT NULL,
  gold_rate DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT, -- 'upi', 'bank', 'cash'
  confirmed_by_lender BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view loans in their circles"
  ON loans FOR SELECT
  USING (
    circle_id IN (
      SELECT circle_id FROM circle_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Circle members can create loans"
  ON loans FOR INSERT
  WITH CHECK (
    circle_id IN (
      SELECT circle_id FROM circle_members 
      WHERE user_id = auth.uid()
    )
  );
```

---

## H. Supabase Realtime for Live Updates

**Use Case:** When someone signs a contract, all parties see it update instantly.

**Implementation:**
```typescript
// Subscribe to loan updates
const channel = supabase
  .channel('loan-updates')
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'loans',
      filter: `id=eq.${loanId}`
    },
    (payload) => {
      // Update UI when loan status changes
      setLoan(payload.new);
    }
  )
  .subscribe();

// Subscribe to signatures
const sigChannel = supabase
  .channel('signature-updates')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'signatures',
      filter: `loan_id=eq.${loanId}`
    },
    (payload) => {
      // Show "✓ Ahmed signed" in real-time
      addSignature(payload.new);
    }
  )
  .subscribe();
```

**Result:** Zero WebSocket infrastructure needed. Supabase handles it.

---

## I. Cron Jobs & Background Tasks

### Daily Gold Rate Fetch

**Using Vercel Cron (free tier):**

```typescript
// app/api/cron/fetch-gold-rate/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Fetch gold rate (web scraping or API)
    const rate = await fetchGoldRateFromSource();
    
    // Store in database
    await supabase.from('gold_prices').insert({
      date: new Date().toISOString().split('T')[0],
      price_per_gram: rate,
      source: 'GoodReturns',
      fetched_at: new Date().toISOString()
    });
    
    console.log(`Gold rate updated: ₹${rate}/gram`);
    
    return NextResponse.json({ success: true, rate });
  } catch (error) {
    console.error('Failed to fetch gold rate:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

async function fetchGoldRateFromSource() {
  // Option 1: Free API
  const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=xxx&base=XAU&currencies=INR');
  const data = await response.json();
  const pricePerOunce = data.rates.INR;
  const pricePerGram = pricePerOunce / 31.1035;
  return Math.round(pricePerGram * 100) / 100;
  
  // Option 2: Web scraping (if no free API)
  // const html = await fetch('https://www.goodreturns.in/gold-rates/').then(r => r.text());
  // return parseGoldPriceFromHTML(html);
}
```

**Vercel cron config:**
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/fetch-gold-rate",
      "schedule": "0 6 * * *"
    }
  ]
}
```

**Schedule:** Every day at 6 AM IST

### Send Loan Reminders

```typescript
// app/api/cron/send-reminders/route.ts
export async function GET(request: Request) {
  // Verify auth
  
  // Find loans due in 7, 3, 1 days
  const today = new Date();
  const in7days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const in3days = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  const in1day = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000);
  
  const { data: loans } = await supabase
    .from('loans')
    .select('*, borrower:borrower_id(*), lender:lender_id(*)')
    .eq('status', 'active')
    .or(`due_date.eq.${formatDate(in7days)},due_date.eq.${formatDate(in3days)},due_date.eq.${formatDate(in1day)}`);
  
  for (const loan of loans) {
    const daysUntilDue = Math.ceil((new Date(loan.due_date) - today) / (24 * 60 * 60 * 1000));
    
    // Send notification
    await sendNotification({
      to: loan.borrower.phone,
      type: daysUntilDue === 7 ? '7-day' : daysUntilDue === 3 ? '3-day' : '1-day',
      loan
    });
  }
  
  return NextResponse.json({ success: true, sent: loans.length });
}
```

**Schedule:** Daily at 9 AM IST

---

## J. Notification System

### Multi-Channel Approach

**Priority Order:**
1. **In-App Notification** (when user is on dashboard)
2. **Email** (always sent, free via Resend/SendGrid)
3. **SMS** (optional, costs ~₹0.20/SMS via Twilio)
4. **WhatsApp** (optional, if user opted in)
5. **Telegram** (optional, if user linked account)

### Implementation

```typescript
async function sendNotification(params: {
  userId: string;
  type: 'loan_created' | 'signature_needed' | 'payment_due' | 'payment_confirmed';
  data: any;
}) {
  const user = await getUser(params.userId);
  
  // 1. In-app (via Supabase Realtime)
  await supabase.from('notifications').insert({
    user_id: params.userId,
    type: params.type,
    data: params.data,
    read: false
  });
  
  // 2. Email (always, free)
  await sendEmail({
    to: user.email,
    subject: getSubject(params.type),
    html: renderEmailTemplate(params.type, params.data)
  });
  
  // 3. SMS (only for critical: payment_due)
  if (params.type === 'payment_due' && user.sms_enabled) {
    await sendSMS({
      to: user.phone,
      body: `Loan due soon. Amount: ${params.data.amount}. Pay at bzkt.app/loans/${params.data.loanId}/pay`
    });
  }
  
  // 4. WhatsApp (if user opted in)
  if (user.whatsapp_enabled) {
    await sendWhatsAppMessage({
      to: user.phone,
      template: getWhatsAppTemplate(params.type),
      params: params.data
    });
  }
  
  // 5. Telegram (if user linked)
  if (user.telegram_id) {
    await sendTelegramMessage({
      chatId: user.telegram_id,
      text: formatTelegramMessage(params.type, params.data),
      reply_markup: getTelegramButtons(params.type, params.data)
    });
  }
}
```

### Email Templates (Free via Resend)

**Example: Signature Needed**
```typescript
// Using React Email
import { Html, Button, Container, Heading, Text } from '@react-email/components';

export default function SignatureNeededEmail({ loan, role }) {
  return (
    <Html>
      <Container>
        <Heading>Signature Required</Heading>
        <Text>You've been asked to sign a loan contract as {role}.</Text>
        
        <Text><strong>Details:</strong></Text>
        <Text>Lender: {loan.lender.name}</Text>
        <Text>Borrower: {loan.borrower.name}</Text>
        <Text>Amount: {loan.gold_grams}g (₹{loan.fiat_reference})</Text>
        <Text>Duration: {loan.duration} days</Text>
        
        <Button href={`https://bzkt.app/contracts/${loan.id}/sign`}>
          Sign Contract
        </Button>
      </Container>
    </Html>
  );
}
```

**Cost:** $0 (Resend free tier: 3,000 emails/month)

---

## K. Bot Implementation (Optional Layer)

### Telegram Bot (Simple, Free)

**Setup:**
```typescript
// lib/telegram-bot.ts
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: true });

// Link account
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const linkCode = match[1]; // User clicks bzkt.app link with code
  
  // Verify code and link Telegram to bzkt account
  const user = await linkTelegramAccount(linkCode, chatId);
  
  bot.sendMessage(chatId, `✅ Connected to bzkt!\n\nYou'll now receive notifications here.\n\nCommands:\n/status - Quick summary\n/gold - Today's rate\n/help - Get help`);
});

// Status command
bot.onText(/\/status/, async (msg) => {
  const chatId = msg.chat.id;
  const user = await getUserByTelegramId(chatId);
  
  if (!user) {
    return bot.sendMessage(chatId, 'Please link your account first: bzkt.app/settings/telegram');
  }
  
  const loans = await getActiveLoans(user.id);
  const lending = loans.filter(l => l.lender_id === user.id);
  const borrowing = loans.filter(l => l.borrower_id === user.id);
  
  const message = `📊 *Quick Status*\n\n💸 *Lending:* ${lending.length} loans\n${lending.map(l => `• ${l.gold_grams}g → ${l.borrower.name} (₹${l.current_value})`).join('\n')}\n\n💳 *Borrowing:* ${borrowing.length} loans\n${borrowing.map(l => `• ${l.gold_grams}g from ${l.lender.name} (₹${l.current_value})`).join('\n')}\n\n🔗 [View Dashboard](https://bzkt.app/dashboard)`;
  
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// Gold rate
bot.onText(/\/gold/, async (msg) => {
  const rate = await getTodayGoldRate();
  const yesterday = await getYesterdayGoldRate();
  const change = ((rate - yesterday) / yesterday * 100).toFixed(2);
  
  bot.sendMessage(msg.chat.id, `💎 *Today's Gold Rate*\n\n₹${rate}/gram\n📈 ${change > 0 ? '+' : ''}${change}% vs yesterday\n\n_Updated daily at 6 AM IST_`, { parse_mode: 'Markdown' });
});
```

**Webhook Alternative (production):**
```typescript
// app/api/telegram-webhook/route.ts
export async function POST(request: Request) {
  const update = await request.json();
  
  if (update.message) {
    await handleMessage(update.message);
  }
  
  if (update.callback_query) {
    await handleCallback(update.callback_query);
  }
  
  return new Response('OK');
}
```

**Cost:** $0 forever (Telegram bots are completely free)

### WhatsApp Bot (Optional, Limited)

**Using Meta WhatsApp Business API (Free Tier):**
- 1,000 service conversations/month free
- Service conversations = user-initiated (free)
- Business-initiated = notifications (charged after free tier)

**Strategy:** Use sparingly, only for critical notifications.

**Implementation:**
```typescript
async function sendWhatsAppNotification(params: {
  to: string; // phone with country code
  templateName: string;
  templateParams: string[];
}) {
  // Using Meta Cloud API
  const response = await fetch('https://graph.facebook.com/v18.0/{phone-number-id}/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: params.to,
      type: 'template',
      template: {
        name: params.templateName,
        language: { code: 'en' },
        components: [{
          type: 'body',
          parameters: params.templateParams.map(text => ({ type: 'text', text }))
        }]
      }
    })
  });
  
  return response.json();
}

// Usage
await sendWhatsAppNotification({
  to: '+919876543210',
  templateName: 'loan_reminder',
  templateParams: ['Ahmed', '7.69', '52308', 'December 16']
});
```

**Pre-approved Template:**
```
🔔 Loan Reminder

{{1}}, your loan of {{2}}g (₹{{3}}) is due on {{4}}.

Visit bzkt.app to repay.
```

**Cost Estimate:**
- User initiates: Free
- We send reminders: ~100 notifications/month = $0 (within free tier)

---

## L. Development Workflow

### Local Development

**Requirements:**
- Node.js 18+
- pnpm (package manager)
- Supabase CLI

**Setup:**
```bash
# Clone repo
git clone https://github.com/yourorg/bzkt
cd bzkt

# Install dependencies
pnpm install

# Setup Supabase locally
supabase init
supabase start

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with API keys

# Run dev server
pnpm dev

# Open http://localhost:3000
```

**Environment Variables:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cron secret (for Vercel)
CRON_SECRET=random_secret_string

# Optional: Telegram
TELEGRAM_BOT_TOKEN=your_telegram_token

# Optional: WhatsApp
WHATSAPP_ACCESS_TOKEN=your_meta_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id

# Optional: Twilio (for SMS)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Email (Resend)
RESEND_API_KEY=your_resend_key
```

### Deployment

**Vercel (Recommended, Free):**
```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Automatic Deployments:**
- Push to `main` branch → auto-deploys to production
- Push to other branches → preview deployments
- Zero config needed

---

## M. Cost Breakdown (Realistic)

### Phase 1: MVP (0-100 users)

```
Hosting:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vercel (Frontend + API)         $0 (free tier)
Supabase (Database)             $0 (free tier: 500MB)
Upstash Redis (Cache)           $0 (free tier: 10k/day)

APIs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gold Price (daily cron)         $0 (web scraping/free API)

Notifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email (Resend)                  $0 (3000/month free)
SMS (Twilio, optional)          ₹200/month (~1000 SMS)
WhatsApp (Meta, optional)       $0 (1000 conversations free)
Telegram                        $0 (unlimited)

Domain:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
bzkt.app                        ₹1000/year

═══════════════════════════════════
TOTAL:                          ₹1200/year = ₹100/month
```

### Phase 2: Growth (100-1000 users)

```
Hosting:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vercel Pro                      $20/month
Supabase Pro                    $25/month
Upstash                         $0 (still within free)

APIs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gold Price API                  $5/month

Notifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email                           $10/month
SMS (if used)                   ₹500/month
WhatsApp                        $20/month
Telegram                        $0

═══════════════════════════════════
TOTAL:                          $80/month = ₹6,500/month
```

### Phase 3: Scale (1000+ users)

```
Hosting:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vercel Pro                      $20/month
Supabase Team                   $599/month (or self-host)
Redis                           $10/month

APIs:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Gold Price                      $10/month

Notifications:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email                           $50/month
SMS                             ₹2000/month
WhatsApp                        $100/month
Telegram                        $0

═══════════════════════════════════
TOTAL:                          $789/month = ₹65,000/month

With 10,000 users:              ₹6.5/user/month (sustainable)
```

**Revenue Model (if needed):**
- Optional donations: ₹50/month per user
- 10% donation rate × 1000 users = ₹5,000/month
- Covers Phase 2 costs

---

## N. Technology Decisions Summary

| Decision | Choice | Why |
|----------|--------|-----|
| **Primary Interface** | Web Dashboard | Full control, no platform dependency |
| **Bot Role** | Optional notifications | Convenience, not required |
| **Gold API Frequency** | Once daily (6 AM) | $0-5/month vs $50-500/month |
| **NLP/AI** | None | Zero AI costs, structured forms better |
| **Frontend** | Next.js + shadcn/ui | Fast, dark theme built-in, free hosting |
| **Backend** | Next.js API Routes | Serverless, scales automatically |
| **Database** | Supabase PostgreSQL | Managed, realtime, RLS, $0-25/month |
| **Realtime** | Supabase Realtime | No WebSocket infrastructure needed |
| **Cache** | Upstash Redis | Serverless, $0 free tier |
| **Email** | Resend | 3000/month free, React Email templates |
| **SMS** | Twilio (optional) | Standard, reliable |
| **WhatsApp** | Meta API (optional) | 1000 free/month |
| **Telegram** | Official API | 100% free forever |
| **Hosting** | Vercel | Zero config, free tier generous |
| **Cron Jobs** | Vercel Cron | Built-in, free |
| **File Storage** | Supabase Storage | Included in DB plan |

---

## O. Security & Compliance

### Authentication Flow

**Magic Link (Passwordless):**
```typescript
// User enters phone number
const { data } = await supabase.auth.signInWithOtp({
  phone: '+919876543210',
  options: {
    shouldCreateUser: true,
    data: {
      name: userName // if new user
    }
  }
});

// User receives SMS with 6-digit code
// User enters code

const { data: session } = await supabase.auth.verifyOtp({
  phone: '+919876543210',
  token: '123456',
  type: 'sms'
});

// Session created, redirect to dashboard
```

**Why Passwordless:**
- No password to forget
- More secure (no phishing)
- Better UX (one-time code)
- Standard for fintech

### Row Level Security (RLS)

**Concept:** Database-level access control

**Example:**
```sql
-- Users can only see loans in their circles
CREATE POLICY "Users see own circle loans"
  ON loans FOR SELECT
  USING (
    circle_id IN (
      SELECT circle_id 
      FROM circle_members 
      WHERE user_id = auth.uid()
    )
  );
```

**Result:** Even if frontend is compromised, users can't access other circles' data.

### Data Encryption

- **At Rest:** Supabase encrypts all data (AES-256)
- **In Transit:** TLS 1.3 for all connections
- **PII:** Phone numbers hashed, names encrypted
- **Contracts:** Stored with access control

### GDPR Compliance

- **Right to Access:** Users can export all data
- **Right to Deletion:** Users can delete account (after settling loans)
- **Data Minimization:** Only collect necessary info
- **Consent:** Clear opt-ins for notifications

---

## P. Monitoring & Observability

### Vercel Analytics (Built-in, Free)

- Page views
- API response times
- Error rates
- Core Web Vitals

### Supabase Dashboard (Built-in)

- Database queries
- API usage
- Storage usage
- Realtime connections

### Custom Metrics

```typescript
// Track loan creation
await logMetric({
  event: 'loan_created',
  properties: {
    circle_id: loan.circle_id,
    gold_grams: loan.gold_grams,
    duration_days: loan.duration
  }
});

// Track payment completion
await logMetric({
  event: 'payment_completed',
  properties: {
    loan_id: payment.loan_id,
    amount: payment.amount_fiat,
    days_to_repay: daysBetween(loan.created_at, payment.created_at)
  }
});
```

### Alerts

```typescript
// Alert if gold rate fetch fails
if (!goldRateFetched) {
  await sendAlert({
    to: 'admin@bzkt.app',
    subject: 'Gold rate fetch failed',
    body: 'Manual intervention needed'
  });
}

// Alert if payment confirmation delayed >24h
if (payment.created_at < Date.now() - 24 * 60 * 60 * 1000 && !payment.confirmed) {
  await sendAlert({
    to: lender.email,
    subject: 'Payment confirmation needed',
    body: 'Please confirm or decline payment'
  });
}
```

---

## Q. Testing Strategy

### Unit Tests (Vitest)

```typescript
// lib/gold.test.ts
import { expect, test } from 'vitest';
import { calculateRepayment, getTodayGoldRate } from './gold';

test('calculates repayment correctly', () => {
  const loan = {
    gold_grams: 7.69,
    gold_rate_init: 6500
  };
  
  const repayment = calculateRepayment(loan, 6800);
  
  expect(repayment).toBeCloseTo(52308, 0);
});

test('fetches today gold rate from cache', async () => {
  // Mock Redis
  const rate = await getTodayGoldRate();
  expect(rate).toBeGreaterThan(0);
});
```

### Integration Tests (Playwright)

```typescript
// e2e/loan-creation.spec.ts
import { test, expect } from '@playwright/test';

test('complete loan creation flow', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="phone"]', '+919876543210');
  await page.click('text=Send Code');
  // ... OTP flow
  
  // Create loan
  await page.goto('/dashboard/loans/new');
  await page.selectOption('[name="lender"]', 'user-1');
  await page.selectOption('[name="borrower"]', 'user-2');
  await page.fill('[name="amount"]', '50000');
  await page.click('text=60 days');
  await page.click('text=Create Loan Contract');
  
  // Verify loan created
  await expect(page.locator('text=Signatures needed')).toBeVisible();
});
```

### Load Testing (k6)

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function () {
  let res = http.get('https://bzkt.app/api/gold/current');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

---

**Next:** Continue with remaining documentation files (07-13)?

Or would you like me to:
1. Create the blog entry revision for YouTube
2. Create UI mockups/wireframes
3. Develop specific implementation code
4. Something else?
