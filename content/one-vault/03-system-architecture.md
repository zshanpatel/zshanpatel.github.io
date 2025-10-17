---
title: System Architecture
permalink: /one-vault/03-system-architecture
tags:
aliases:
showDate: false
draft: false
---
## Overview
The one-vault system uses a **federated architecture** where independent circles (families/friend groups) operate parallel wealth sharing systems with a shared protocol and template. Each circle is sovereign, but all speak the same language.

Think: **Email protocols** (federated, interoperable) NOT Facebook (centralised, controlled).

---
## A. Circle Structure (Federated Model)
### What is a Circle?
A **circle** is an independent wealth sharing vault for a trusted group. It operates autonomously with its own:
- Member list
- Transparent ledger
- Governance rules
- Privacy boundaries
**Size Constraints:**
- **Minimum:** 3 members (need at least 1 giver, 1 receiver, 1 witness)
- **Optimal:** 5-15 members (maintains high trust, manageable transparency)
- **Maximum:** 50 members (beyond this, trust dilutes)
### Types of Circles
**Family Circles:**
- Extended family unit
- Multi-generational
- High pre-existing trust
- Example: Parents, siblings, cousins
**Friend Circles:**
- Close friend groups
- University/work colleagues with strong bonds
- Shared values and history
- Example: College roommates, business partners
**Community Circles:**
- Mosque/religious community
- Neighbourhood groups
- Professional networks with regular interaction
- Example: Local business owners, community leaders
### Circle Roles
#### 1. Admin (Circle Creator)
**Permissions:**
- Create the circle
- Send invitations
- Remove members (rare, requires cause)
- View all transactions (same as all members)
- Set circle-level rules (max share amount, etc.)
**Responsibilities:**
- Maintain circle health
- Mediate disputes
- Onboard new members
- Ensure ledger integrity
**Limitations:**
- Cannot see other circles' data
- Cannot modify completed contracts
- Cannot override witness requirements
- No financial privileges over members
#### 2. Member (Default Role)
**Permissions:**
- Share wealth with circle members (as giver)
- Receive wealth from circle members
- Witness transactions (if not party to them)
- View full transparent ledger
- Invite new members (with admin approval)
**Responsibilities:**
- Fulfil amanah (trust obligations)
- Share or receive on time
- Communicate proactively
- Witness honestly
- Support fellow members
#### 3. Witness (Dynamic Role)
**Context:** Any member can witness any transaction they're not party to.
**Permissions:**
- Review contract terms
- Sign as attestor
- Provide testimony if disputes arise
**Responsibilities:**
- Verify free consent
- Confirm clarity of terms
- Be available for resolution
- Testify truthfully
**Cannot:**
- Be giver or receiver in the same share
- Have financial interest in the share outcome
- Refuse witnessing without valid reason

---
## B. Data Model & Storage

### Core Tables
#### 1. **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT UNIQUE NOT NULL,
  name TEXT,
  email TEXT,
  telegram_id BIGINT,
  whatsapp_linked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
#### 2. **Circles Table**
```sql
CREATE TABLE circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  admin_id UUID REFERENCES users(id),
  invite_code TEXT UNIQUE,
  rules_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
#### 3. **Circle Members Table**
```sql
CREATE TABLE circle_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circle_id UUID REFERENCES circles(id),
  user_id UUID REFERENCES users(id),
  role TEXT DEFAULT 'member', -- 'admin' or 'member'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  vouched_by UUID REFERENCES users(id),
  trust_score INTEGER,
  status TEXT DEFAULT 'active', -- 'active', 'left', 'removed'
  UNIQUE(circle_id, user_id)
);
```
#### 4. **Gold Prices Table**
```sql
CREATE TABLE gold_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  price_per_gram DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  source TEXT,
  fetched_at TIMESTAMPTZ DEFAULT NOW()
);
```
#### 5. **Wealth Shares Table**
```sql
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
  purpose TEXT,
  status TEXT DEFAULT 'pending_signatures',
  -- 'pending_signatures', 'active', 'fulfilled', 'overdue', 'forgiven'
  contract_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
#### 6. **Signatures Table**
```sql
CREATE TABLE signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wealth_share_id UUID REFERENCES wealth_shares(id),
  user_id UUID REFERENCES users(id),
  role TEXT NOT NULL, -- 'giver', 'receiver', 'witness'
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  UNIQUE(wealth_share_id, user_id, role)
);
```
#### 7. **Payments Table**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wealth_share_id UUID REFERENCES wealth_shares(id),
  amount_fiat DECIMAL(12, 2) NOT NULL,
  gold_grams_repaid DECIMAL(10, 4) NOT NULL,
  gold_rate DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT, -- 'upi', 'bank', 'cash'
  confirmed_by_giver BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---
## C. Web Dashboard Architecture

### Technology Stack
**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components (dark theme)
- Radix UI primitives
**Backend:**
- Next.js API Routes (serverless)
- Supabase (PostgreSQL + Auth + Storage + Realtime)
**Why This Stack:**
- All-in-one (frontend + backend)
- Vercel deployment = zero config
- shadcn/ui = beautiful dark mode built-in
- Supabase = database + auth + realtime in one
- Total cost: **₹0-5/month**

---
## D. Telegram Bot Architecture
### Bot Setup
**Technology:** Telegram Bot API
**Library:** `node-telegram-bot-api`
**Hosting:** Same Next.js app (API routes)
**Implementation:**
```typescript
// lib/telegram-bot.ts
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { 
  polling: false // Use webhooks in production
});

// Webhook endpoint
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
### Bot Commands (MVP)

```typescript
// /start - Link account
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const linkCode = match[1];
  
  // Link Telegram to user account
  await linkTelegramAccount(linkCode, chatId);
  
  bot.sendMessage(chatId, `✅ Connected to one-vault!\n\n/status - View summary\n/gold - Today's rate\n/help - Get help`);
});

// /status - Quick summary
bot.onText(/\/status/, async (msg) => {
  const user = await getUserByTelegramId(msg.chat.id);
  const shares = await getActiveShares(user.id);
  
  const message = `📊 *Quick Status*\n\n💸 Giving: ${shares.giving.length}\n💳 Receiving: ${shares.receiving.length}\n\n[View Dashboard](https://app.bzkt.com/dashboard)`;
  
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
});

// /gold - Today's rate
bot.onText(/\/gold/, async (msg) => {
  const rate = await getTodayGoldRate();
  bot.sendMessage(msg.chat.id, `💎 Today's Rate: ₹${rate}/gram`);
});
```

---
## E. System Reliability
### Uptime Target
**Goal:** 99.9% uptime (43 minutes downtime per month)
**Monitoring:**
- Health checks every 30 seconds
- Automated failover
- Status page for transparency
### Performance Targets
```
API Response Time:
- P50: <100ms
- P95: <300ms
- P99: <500ms

Database Query Time:
- Simple queries: <50ms
- Ledger queries: <300ms

Page Load Time:
- <1 second (first contentful paint)
```
---
**Next:** Read [Gold Pegging Mechanism](04-gold-pegging-mechanism.md) for detailed gold mechanics.