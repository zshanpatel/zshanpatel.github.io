---
title: Technical Stack
permalink: /one-vault/06-technical-stack
tags:
aliases:
showDate: false
draft: false
---
# Optimised & Cost-Efficient Architecture
## Overview
The one-vault system is a **web-first platform** with optional bot integrations. The core system operates independently through a web dashboard, with WhatsApp/Telegram bots as convenient add-ons for notifications and quick actions.

**Philosophy:** Platform should work standalone. Bots enhance convenience but aren't required.

---

## A. Core Architecture: Web-First, Bot-Optional

### Why Web-First?

**Primary Advantages:**
1. **Platform Independence**: Not dependent on Meta/Telegram policies
2. **Full Control**: Rich UI, complex interactions, no API limits
3. **No Bot Costs**: WhatsApp Business API costs ~$0.005/msg (adds up fast)
4. **Better UX for Complex Tasks**: Ledger views, analytics, multi-step flows
5. **Always Accessible**: Direct URL, bookmarkable, works everywhere
6. **SEO & Discovery**: Can be found, linked, shared publicly

**Bot Role:**
- Notifications (reminders, confirmations)
- Quick status checks (`/status` → shows summary)
- Payment confirmations
- Emergency actions
- **NOT** primary interface

---

## B. Cost Optimisation Strategy

### 1. Gold Price API - Daily Rate System

**Problem:** Real-time APIs cost $50-500/month for high-frequency calls

**Solution:** Fetch once daily, use that rate for entire day

**Why This Works:**
- Gold doesn't change drastically hour-to-hour
- Wealth shares are days/weeks long, not seconds
- Users understand "today's rate" concept
- Reduces API costs to **₹0-5/month**

**Implementation:**
```typescript
// Cron job: Daily at 6 AM IST
async function fetchDailyGoldRate() {
  try {
    // Free/cheap API: GoldAPI, MetalsAPI, or web scraping
    const response = await fetch('https://www.goodreturns.in/gold-rates/');
    const price = parseGoldPrice(response); // Scrape or API parse
    
    await db.goldPrices.create({
      date: new Date().toISOString().split('T')[0],
      pricePerGram: price,
      source: 'GoodReturns',
      fetchedAt: new Date()
    });
    
    await redis.set('gold:rate:today', price, 'EX', 86400); // 24hr cache
    
    console.log(`Gold rate set for today: ₹${price}/gram`);
  } catch (error) {
    // Fallback: Use yesterday's rate + inflation estimate
    console.error('Failed to fetch gold rate, using fallback');
  }
}
```

### 2. No AI/LLM APIs Required

**Problem:** OpenAI/Claude APIs cost $0.002-0.03 per message (expensive at scale)

**Solution:** No NLP. Use structured forms and buttons only.

**Why This Works:**
- Wealth share creation is inherently structured (amount, duration, parties)
- Forms are clearer than parsing natural language
- Zero ongoing AI costs
- Faster, more reliable
- Users expect forms for financial transactions

### 3. Minimal Bot Infrastructure

**Telegram:**
- **100% free** (no limits)
- Self-hosted bot
- No API costs ever
- Better for power users

**WhatsApp (Optional, Future):**
- Use **Twilio Sandbox** (free, limited) for testing
- For production: Meta WhatsApp Business API (free tier: 1000 conversations/month)
- Only send critical notifications (wealth share due, payment confirmed)
- Estimate: 3-5 messages per share = 200-300 shares/month in free tier

**Cost Breakdown:**
```
Telegram: ₹0/month forever

WhatsApp (conservative):
- 100 users × 2 shares/month × 4 messages/share = 800 messages
- Free tier covers 1000 conversations
- Cost: ₹0/month (within free tier)
```

### 4. Hosting Optimisation

**Backend:**
- **Railway** or **Render** free tier (₹0) or hobby (₹400/month)
- Or **Vercel Edge Functions** (generous free tier)
- Scales automatically

**Database:**
- **Supabase** free tier (500MB, 50k monthly active users)
- Upgrade to ₹2000/month if needed (unlikely for first year)

**Frontend:**
- **Vercel** free tier (unlimited bandwidth, 100GB/month)

**Redis:**
- **Upstash** free tier (10k commands/day)
- Sufficient for caching gold rates

**Total Monthly Cost (Phase 1):**
```
Backend: ₹0-400
Database: ₹0
Frontend: ₹0
Redis: ₹0
Telegram: ₹0
WhatsApp: ₹0 (free tier)
Gold API: ₹0-400 (scraping or free tier)
──────────────
Total: ₹0-800/month
```

---

## C. Technology Stack

### Frontend

**Framework:** Next.js 14 (App Router, React Server Components)
**Language:** TypeScript (type safety)
**Styling:** Tailwind CSS (utility-first)
**Components:** shadcn/ui (pre-built dark theme components)
**Primitives:** Radix UI (accessible)

**Why:**
- All-in-one (frontend + backend in Next.js)
- Vercel deployment = zero config
- shadcn/ui = beautiful dark mode out of the box
- Total cost: **₹0-400/month**

### Backend

**Runtime:** Node.js / Bun
**Framework:** Next.js API Routes (serverless functions)
**Database:** Supabase (PostgreSQL + Auth + Storage + Realtime)
**Cache:** Upstash Redis (serverless)
**Queue:** Vercel Cron (for scheduled jobs)

### Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  telegram_id BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Circles
CREATE TABLE circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  admin_id UUID REFERENCES users(id),
  invite_code TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gold Prices (daily)
CREATE TABLE gold_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  price_per_gram DECIMAL(10, 2) NOT NULL,
  source TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wealth Shares
CREATE TABLE wealth_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID REFERENCES circles(id),
  giver_id UUID REFERENCES users(id),
  receiver_id UUID REFERENCES users(id),
  gold_grams DECIMAL(10, 4) NOT NULL,
  fiat_reference DECIMAL(12, 2) NOT NULL,
  gold_rate_init DECIMAL(10, 2) NOT NULL,
  initiation_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending_signatures',
  contract_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## D. Telegram Bot Implementation (MVP)

### Basic Setup

**Library:** `node-telegram-bot-api`

**Implementation:**
```typescript
// lib/telegram-bot.ts
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { 
  polling: false // Use webhooks in production
});

// Webhook endpoint
// app/api/telegram/webhook/route.ts
export async function POST(request: Request) {
  const update = await request.json();
  
  if (update.message) {
    await handleMessage(update.message);
  }
  
  return new Response('OK');
}
```

### MVP Commands

```typescript
// /start - Link account
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const linkCode = match[1];
  
  await linkTelegramAccount(linkCode, chatId);
  
  bot.sendMessage(chatId, 
    `✅ Connected!\n\n` +
    `/status - View summary\n` +
    `/gold - Today's rate\n` +
    `/help - Get help`
  );
});

// /status - Quick summary
bot.onText(/\/status/, async (msg) => {
  const user = await getUserByTelegramId(msg.chat.id);
  const shares = await getActiveShares(user.id);
  
  const message = 
    `📊 *Quick Status*\n\n` +
    `💸 Giving: ${shares.giving.length}\n` +
    `💳 Receiving: ${shares.receiving.length}\n\n` +
    `[View Dashboard](https://app.bzkt.com/dashboard)`;
  
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
});

// /gold - Today's rate
bot.onText(/\/gold/, async (msg) => {
  const rate = await getTodayGoldRate();
  bot.sendMessage(msg.chat.id, `💎 Today's Rate: ₹${rate}/gram`);
});
```

### Notifications

```typescript
async function sendTelegramNotification(
  userId: string,
  type: 'share_created' | 'due_soon' | 'fulfilled',
  data: any
) {
  const user = await getUser(userId);
  if (!user.telegram_id) return;
  
  const messages = {
    share_created: `🔔 New Wealth Share\n\n${data.giver} → ${data.receiver}\n${data.gold_grams}g (₹${data.fiat_reference})`,
    due_soon: `⏰ Reminder\n\nWealth share due in ${data.days_left} days\nAmount: ${data.current_value}`,
    fulfilled: `✅ Fulfilled\n\nWealth share completed\nAmount: ₹${data.amount}`
  };
  
  await bot.sendMessage(user.telegram_id, messages[type]);
}
```

---

## E. Development Workflow

### Local Development

```bash
# Clone repo
git clone https://github.com/yourorg/one-vault
cd one-vault

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with API keys

# Run dev server
pnpm dev

# Open http://localhost:3000
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cron secret
CRON_SECRET=random_secret_string

# Telegram
TELEGRAM_BOT_TOKEN=your_telegram_token

# Email (Resend)
RESEND_API_KEY=your_resend_key
```

---

## F. Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm install -g vercel

# Deploy
vercel

# Production
vercel --prod
```

**Automatic Deployments:**
- Push to `main` → auto-deploys to production
- Other branches → preview deployments
- Zero config needed

---

## G. Monitoring & Testing

### Monitoring

**Vercel Analytics** (Built-in, Free):
- Page views
- API response times
- Error rates
- Core Web Vitals

**Supabase Dashboard:**
- Database queries
- API usage
- Realtime connections

### Testing

**Unit Tests (Vitest):**
```typescript
test('calculates gold grams correctly', () => {
  const grams = calculateGoldGrams(50000, 6500);
  expect(grams).toBeCloseTo(7.6923, 4);
});
```

**E2E Tests (Playwright):**
```typescript
test('create wealth share flow', async ({ page }) => {
  await page.goto('/dashboard/shares/new');
  await page.fill('[name="amount"]', '50000');
  await page.click('text=Create Share');
  await expect(page.locator('text=Signatures needed')).toBeVisible();
});
```

---
**Next:** Read [User Experience Principles](07-user-experience.md) for UX principles.
