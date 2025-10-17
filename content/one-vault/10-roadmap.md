---
title: Development Roadmap
permalink: /one-vault/10-roadmap
tags:
aliases:
showDate: false
draft: false
---
## Overview
One-vault system development follows an **iterative, user-driven approach**. Ship fast, learn, adapt. No 2-year plans—just clear phases with flexibility.

**Philosophy:** Build what users need, not what we think they need.

---
## Phase 1: MVP (Months 1-3.5)
### Goal
Prove core concept with minimal but complete features. Get first 100 users, validate gold-pegging, test circle dynamics. Include basic Telegram bot for notifications and quick status checks.
### Core Features
**Week 1-2: Foundation**
- [ ] Landing page (Next.js + Tailwind + shadcn/ui)
- [ ] Auth system (Supabase Auth, phone OTP)
- [ ] Database schema (PostgreSQL on Supabase)
- [ ] Basic dashboard layout
**Week 3-4: Circle Management**
- [ ] Create circle
- [ ] Generate invite links
- [ ] Join circle via link
- [ ] View circle members
- [ ] Admin role basics
**Week 5-6: Wealth Sharing Core**
- [ ] Create wealth share form
- [ ] Gold price fetch (daily cron)
- [ ] Gold ↔ fiat conversion
- [ ] Select witnesses (2 required)
- [ ] Contract preview
**Week 7-8: Contracts & Signatures**
- [ ] PDF contract generation
- [ ] Digital signature flow
- [ ] Witness signing
- [ ] Contract storage (Supabase Storage)
- [ ] Wealth share goes ACTIVE when all sign
**Week 9-10: Payments & Tracking**
- [ ] Record payment (giver marks paid)
- [ ] Confirm payment (receiver confirms)
- [ ] Partial payment support
- [ ] Wealth share status: FULFILLED
- [ ] Basic notifications (email via Resend)
**Week 11-12: Ledger & Polish**
- [ ] Transparent ledger view (table)
- [ ] Export ledger (CSV)
- [ ] Dashboard summary cards
- [ ] Mobile responsive
- [ ] Bug fixes, testing
**Week 13: Telegram Bot (Basic)**
- [ ] Bot setup and registration
- [ ] Link Telegram account to web platform
- [ ] Basic notifications (wealth share created, due soon, fulfilled)
- [ ] `/status` command (quick summary)
- [ ] `/gold` command (today's rate)
- [ ] `/help` command
### What's NOT in MVP
- ❌ WhatsApp bot (requires business verification)
- ❌ Multi-language
- ❌ Advanced analytics
- ❌ Dispute system
- ❌ Trust scores
- ❌ Payment integrations
- ❌ Complex governance
- ❌ Advanced bot features (full wealth share creation in bot)
### Success Criteria
- ✅ 100 users onboarded
- ✅ 10 circles created
- ✅ 25 wealth shares created
- ✅ 15 wealth shares fulfilled
- ✅ 0 critical bugs
- ✅ User feedback collected
### Tech Stack (MVP)
```
Frontend:  Next.js 14, TypeScript, Tailwind, shadcn/ui
Backend:   Next.js API Routes, Supabase
Database:  PostgreSQL (Supabase)
Auth:      Supabase Auth (phone OTP)
Storage:   Supabase Storage (PDFs)
Email:     Resend
Bot:       Telegram Bot API (node-telegram-bot-api)
Hosting:   Vercel
Cron:      Vercel Cron (daily gold rate)
```

---
## Phase 2: Enhancements (Months 4-6)

### Goal
Improve UX based on feedback, add convenience features, grow to 1,000 users.
### Features to Add
**Enhanced Notifications System**
- [ ] In-app notifications (browser push)
- [ ] SMS notifications (Twilio, optional)
- [ ] Enhanced reminder schedule (configurable)
- [ ] Rich Telegram notifications (already in MVP)
**Telegram Bot Enhancements**
- [ ] Interactive buttons in Telegram
- [ ] `/pay` command (quick payment link)
- [ ] `/ledger` command (view in bot)
- [ ] Rich card layouts
- [ ] Inline queries
**Extensions & Forgiveness**
- [ ] Request extension flow
- [ ] Giver approve/decline
- [ ] Forgive remaining amount option
- [ ] Sadaqah tracking
**Improved Dashboard**
- [ ] Activity feed (circle-level)
- [ ] Recent wealth shares
- [ ] Upcoming due dates
- [ ] Quick actions shortcuts
**Profile & Settings**
- [ ] User profile page
- [ ] Notification preferences
- [ ] Language selection (prep for i18n)
- [ ] Privacy settings
### Success Criteria
- ✅ 1,000 active users
- ✅ 100 circles
- ✅ 500 wealth shares
- ✅ 90% fulfilment rate
- ✅ <1% error rate
- ✅ NPS >40
---
## Phase 3: Scale & Stability (Months 7-12)
### Goal
Handle growth, add advanced features, achieve sustainability (5,000+ users).
### Features
**WhatsApp Integration (Optional)**
- [ ] WhatsApp Business API setup
- [ ] Link WhatsApp account
- [ ] Critical notifications only
- [ ] Status check via WhatsApp
**Advanced Analytics**
- [ ] Circle health dashboard
- [ ] Gold price trends/charts
- [ ] Personal wealth share history
- [ ] Export reports (PDF)
**Governance Tools**
- [ ] Circle rules editor
- [ ] Member voting
- [ ] Rule change proposals
- [ ] Dispute flagging
**Multi-Language Support**
- [ ] i18n framework (next-i18next)
- [ ] English (complete)
- [ ] Urdu (priority 2)
- [ ] Hindi (priority 3)
- [ ] RTL support
**API (Developer Platform)**
- [ ] Public API documentation
- [ ] API keys management
- [ ] Rate limiting
- [ ] Webhook support
### Success Criteria
- ✅ 5,000 active users
- ✅ 500 circles
- ✅ 3,000 wealth shares
- ✅ 93% fulfilment rate
- ✅ Self-sustaining revenue
- ✅ 99.5% uptime
- ✅ NPS >50
---
## Phase 4: Ecosystem (Year 2)
### Goal
Build community, partnerships, and expand impact (20,000+ users).
### Features
**Community Platform**
- [ ] Discussion forum
- [ ] Best practices wiki
- [ ] Circle showcase
- [ ] Success stories
**Islamic Finance Education**
- [ ] Learning centre
- [ ] Video courses
- [ ] _Qard al-hassan_ guide
- [ ] Scholar endorsements
**Integrations**
- [ ] Accounting software (Zoho, Tally)
- [ ] Calendar apps (Google Calendar)
- [ ] Payment apps (UPI deep links)
- [ ] Export to Excel/PDF
**Advanced Features**
- [ ] Recurring wealth shares
- [ ] Circle templates (family, business)
- [ ] Multi-currency support
- [ ] Cross-circle connections
### Partnerships
**Islamic Organisations**
- [ ] Mosque partnerships
- [ ] Islamic schools
- [ ] Community centres
- [ ] Halal certification bodies
**Fintech**
- [ ] Islamic banks
- [ ] Microfinance institutions
- [ ] Payment processors
### Success Criteria
- ✅ 20,000 active users
- ✅ 2,000 circles
- ✅ 15,000 wealth shares
- ✅ 94% fulfilment rate
- ✅ 50+ enterprise clients
- ✅ Media coverage
---
## Phase 5: Global (Year 3+)
### Goal
Expand beyond India, establish as global standard for trust-based wealth sharing.
### Geographic Expansion
**Priority Markets:**
1. **Pakistan** (large Muslim population, similar culture)
2. **Bangladesh** (microfinance tradition)
3. **Malaysia** (Islamic finance hub)
4. **Indonesia** (largest Muslim population)
5. **Middle East** (GCC countries)
6. **UK** (diaspora communities)
7. **USA** (diaspora communities)
**Localisation:**
- [ ] Currency support (PKR, BDT, MYR, etc.)
- [ ] Local gold markets
- [ ] Regional languages
- [ ] Cultural customisation
- [ ] Local partnerships
### Platform Maturity
**Federation**
- [ ] Inter-circle wealth sharing
- [ ] Global gold price sync
- [ ] Cross-border transactions
- [ ] Multi-region hosting
**Open Source**
- [ ] Core platform open-sourced
- [ ] Self-hosting guide
- [ ] Plugin architecture
- [ ] Developer community
### Impact Goals

```
Year 5 Vision:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Users: 500,000 globally
Circles: 50,000
Wealth shared: ₹5,000 crore
Countries: 25+
Languages: 10+

Recognition:
- Industry standard
- Academic citations
- Government partnerships
- Mainstream awareness
```

---
## Development Principles
### 1. Ship Early, Ship Often
**Iteration over perfection**
- Release MVP fast (3 months)
- Get user feedback
- Iterate weekly
- Don't over-engineer
### 2. User-Driven Roadmap
**Listen to users, not assumptions**
- Weekly user interviews
- Support ticket analysis
- Feature voting
- Beta testing groups
### 3. Simplicity First
**Avoid feature bloat**
- Every feature must justify itself
- Remove unused features
- Default to simple
- Power users can self-serve
### 4. Stability > Features
**Quality over quantity**
- No new features if bugs exist
- 99.9% uptime target
- Data integrity paramount
- Security never compromised
### 5. Open & Transparent
**Build in public**
- Public roadmap (GitHub)
- Changelog with every release
- Beta features announced
- Community input welcomed
---
## Release Process
### Versioning
**Semantic Versioning:**
```
v1.0.0 - MVP launch
v1.1.0 - Minor feature addition
v1.1.1 - Bug fix
v2.0.0 - Major breaking change
```
### Release Cycle
**Weekly Releases (Phase 1-2):**
```
Monday:    Plan week's work
Wed-Thu:   Development
Friday:    Testing
Saturday:  Deploy to production
Sunday:    Monitor, hotfix if needed
```
**Bi-Weekly (Phase 3+):**
```
Week 1:    Development sprint
Week 2:    Testing, documentation
Friday:    Release
```
---
## Team Evolution
### Phase 1: Solo/Small (Months 1-6)
**Team:**
- 1 founder/developer
- Optional: 1 designer (contract)
- Optional: Islamic finance advisor
### Phase 2: Core Team (Months 7-12)
**Add:**
- 1 backend developer (part-time → full-time)
- 1 community manager (part-time)
**Total:** 2-3 people
### Phase 3: Growth (Year 2)
**Add:**
- 1 frontend developer
- 1 support specialist
- 1 Islamic finance expert (advisor)
**Total:** 5-6 people
### Phase 4: Scale (Year 3+)
**Add:**
- Product manager
- Marketing lead
- Regional managers (as expand)
- Developers as needed
**Total:** 10-15 people (stay lean)
---
## Success Metrics by Phase
### Phase 1 (MVP)
```
Users:              100
Circles:            10
Wealth Shares:      25
Fulfilment Rate:    >80%
Cost:               <₹10k/month
```
### Phase 2 (Enhancement)
```
Users:              1,000
Circles:            100
Wealth Shares:      500
Fulfilment Rate:    >90%
Revenue:            >₹2k/month (donations)
Cost:               <₹15k/month
```
### Phase 3 (Scale)
```
Users:              5,000
Circles:            500
Wealth Shares:      3,000
Fulfilment Rate:    >93%
Revenue:            >₹50k/month
Cost:               <₹30k/month
Profitable:         ✅
```
### Phase 4 (Ecosystem)
```
Users:              20,000
Circles:            2,000
Wealth Shares:      15,000
Fulfilment Rate:    >94%
Revenue:            >₹2L/month
Profit Margin:      40%+
```
### Phase 5 (Global)
```
Users:              500,000
Circles:            50,000
Wealth Shares:      500,000+
Countries:          25+
Revenue:            Self-sustaining + giving back
Impact:             Industry-shaping
```
---
**Next:** Read [Success Metrics](11-success-metrics.md) for measurement framework.