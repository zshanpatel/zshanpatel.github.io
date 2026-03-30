---
title: Development Roadmap
permalink: /one-vault/10-roadmap
tags:
aliases:
showDate: false
draft: false
---
## Overview
One-vault system development follows an **iterative, user-driven approach**. Build the core, learn from users, then scale.

**Philosophy:** Build what users need, not what we think they need.

---

## A. Phase Timeline Overview

```
Phase 1: Foundation & MVP (Months 1-6)
→ Core features, self-hosting, community building

Phase 2: Cloud Hosting Launch (Months 6-12)
→ Managed hosting, free tier, user growth

Phase 3: Monetization (Months 12-18)
→ Paid tiers, sustainability, team growth

Phase 4: Enterprise & Scale (Months 18-24)
→ Organizations, integrations, profitability

Phase 5: Global Expansion (Year 2+)
→ New markets, partnerships, impact
```

---

## Phase 1: Foundation & MVP (Months 1-6)

### Goal

Build core platform, release as open source, get first 500 self-hosting users, validate concept.

### Month 1-3: Core Development

**Week 1-2: Foundation**
- [ ] Repository setup (GitHub, open source)
- [ ] Landing page (explain open source + self-host)
- [ ] Auth system (Supabase Auth, phone OTP)
- [ ] Database schema (PostgreSQL)
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
- [ ] Contract storage
- [ ] Wealth share goes ACTIVE

**Week 9-10: Payments & Tracking**
- [ ] Record payment (giver marks paid)
- [ ] Confirm payment (receiver confirms)
- [ ] Partial payment support
- [ ] Wealth share status: FULFILLED
- [ ] Email notifications (Resend)

**Week 11-12: Ledger & Polish**
- [ ] Transparent ledger view
- [ ] Export ledger (CSV)
- [ ] Dashboard summary cards
- [ ] Mobile responsive
- [ ] Bug fixes, testing

### Month 4-6: Open Source Release & Growth

**Documentation:**
- [ ] Self-hosting guide (detailed)
- [ ] Docker setup
- [ ] Environment variables guide
- [ ] API documentation
- [ ] Contributing guidelines

**Community Building:**
- [ ] GitHub repository public
- [ ] Discussion forum (GitHub Discussions)
- [ ] Weekly office hours
- [ ] Video tutorials
- [ ] Blog posts explaining system

**Telegram Bot (Basic):**
- [ ] Bot setup
- [ ] Link Telegram account
- [ ] Basic notifications (due soon, fulfilled)
- [ ] `/status` command
- [ ] `/gold` command

### Success Criteria (End of Phase 1)

```
Users:
- 500 self-hosters (GitHub stars ~200)
- 50 circles created
- 150 wealth shares
- 100 fulfilled shares

Quality:
- >80% fulfillment rate
- 0 critical bugs
- Positive community feedback

Cost:
- ₹500/month (docs hosting, domain)
- Revenue: ₹0 (no monetization yet)
- Funding: Personal
```

### Tech Stack (MVP)

```
Frontend:  Next.js 14, TypeScript, Tailwind, shadcn/ui
Backend:   Next.js API Routes, Supabase
Database:  PostgreSQL (Supabase)
Auth:      Supabase Auth (phone OTP)
Storage:   Supabase Storage (PDFs)
Email:     Resend
Bot:       Telegram Bot API
Hosting:   Vercel (frontend), Railway (bot)
License:   Apache 2.0 (open source)
```

---

## Phase 2: Cloud Hosting Launch (Months 6-12)

### Goal

Launch managed cloud version (free tier), make it accessible to non-technical users, grow to 2,000 total users.

### Features to Add

**Cloud Infrastructure:**
- [ ] Multi-tenant setup
- [ ] User isolation
- [ ] Automated backups
- [ ] Monitoring & alerts
- [ ] Status page

**Enhanced Notifications:**
- [ ] In-app notifications
- [ ] Enhanced reminder schedule
- [ ] Rich Telegram notifications
- [ ] SMS (optional, for critical)

**UX Improvements:**
- [ ] Onboarding flow
- [ ] Tour/walkthrough
- [ ] Empty states
- [ ] Loading states
- [ ] Error handling

**Extensions & Forgiveness:**
- [ ] Request extension flow
- [ ] Giver approve/decline
- [ ] Forgive remaining amount
- [ ] Sadaqah tracking

**Profile & Settings:**
- [ ] User profile page
- [ ] Notification preferences
- [ ] Privacy settings
- [ ] Data export

### Success Criteria (End of Phase 2)

```
Users:
- Self-hosted: 1,000 instances
- Cloud free: 1,000 users
- Total: 2,000 users
- 200 circles
- 800 wealth shares
- >85% fulfillment rate

Quality:
- 99.5% uptime
- <1% error rate
- NPS >40

Cost:
- ₹2,000/month (infrastructure for 1,000 cloud users)
- Revenue: ₹0 (still free)
- Funding: Personal/Grants
```

---

## Phase 3: Monetization (Months 12-18)

### Goal

Launch paid tiers, achieve sustainability, grow to 5,000 users.

### Pricing Tiers Launch

**Supporter Tier (₹99/month):**
- [ ] Unlimited circles
- [ ] Up to 50 members per circle
- [ ] Priority support
- [ ] Advanced analytics
- [ ] Enhanced exports

**Circle Premium (₹499/month):**
- [ ] Unlimited members
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] White-label options
- [ ] Training calls

**Payment Integration:**
- [ ] Razorpay setup
- [ ] Subscription management
- [ ] Billing portal
- [ ] Invoice generation

### Additional Features

**Advanced Analytics:**
- [ ] Circle health dashboard
- [ ] Gold price trends
- [ ] Personal stats
- [ ] Export reports (PDF)

**Governance Tools:**
- [ ] Circle rules editor
- [ ] Member voting
- [ ] Rule change proposals
- [ ] Dispute flagging

### Success Criteria (End of Phase 3)

```
Users:
- Self-hosted: 2,000 instances
- Cloud free: 3,000 users
- Cloud supporters: 200 users (7% conversion)
- Circle premium: 20 circles
- Total: 5,000+ users

Revenue:
- Supporters: ₹19,800/month
- Circle Premium: ₹9,980/month
- Total: ₹29,780/month

Costs:
- Infrastructure: ₹10,000/month
- Tools: ₹2,000/month
- Part-time help: ₹8,000/month
- Total: ₹20,000/month

Status: PROFITABLE (₹9,780/month profit)

Quality:
- 90% fulfillment rate
- 99.9% uptime
- NPS >50
```

---

## Phase 4: Enterprise & Scale (Months 18-24)

### Goal

Support organizations, scale to 20,000 users, build sustainable 3-person team.

### Enterprise Tier Launch

**Features:**
- [ ] Multi-circle management
- [ ] White-label platform
- [ ] SSO integration
- [ ] Advanced reporting
- [ ] API access
- [ ] Dedicated support

**Target Customers:**
- Islamic charities
- Mosques
- Islamic schools
- Microfinance NGOs
- Community organizations

### Additional Features

**WhatsApp Integration (Optional):**
- [ ] WhatsApp Business API
- [ ] Link WhatsApp account
- [ ] Critical notifications only
- [ ] Status check

**Multi-Language Support:**
- [ ] i18n framework
- [ ] English (complete)
- [ ] Urdu
- [ ] Hindi
- [ ] RTL support

**API Platform:**
- [ ] Public API docs
- [ ] API keys management
- [ ] Rate limiting
- [ ] Webhook support

### Success Criteria (End of Phase 4)

```
Users:
- Self-hosted: 5,000 instances
- Cloud free: 12,000 users
- Cloud supporters: 800 users
- Circle premium: 80 circles
- Enterprise: 5 organizations
- Total: 20,000+ users

Revenue:
- Supporters: ₹79,200/month
- Circle Premium: ₹39,920/month
- Enterprise: ₹60,000/month
- Total: ₹1,79,120/month (₹21.5L/year)

Costs:
- Infrastructure: ₹35,000/month
- Team (2 full-time): ₹80,000/month
- Tools: ₹5,000/month
- Total: ₹1,20,000/month

Status: SUSTAINABLE (₹59,120/month profit)

Team: 3 people (founder + 2 developers)

Quality:
- 93% fulfillment rate
- 99.9% uptime
- NPS >50
- 50+ enterprise clients
```

---

## Phase 5: Global Expansion (Year 2+)

### Goal

Expand beyond India, establish as global standard for trust-based wealth sharing.

### Geographic Expansion

**Priority Markets:**
1. Pakistan (large Muslim population)
2. Bangladesh (microfinance tradition)
3. Malaysia (Islamic finance hub)
4. Indonesia (largest Muslim population)
5. Middle East (GCC countries)
6. UK/USA (diaspora)

**Localization:**
- [ ] Currency support (PKR, BDT, MYR, etc.)
- [ ] Local gold markets
- [ ] Regional languages
- [ ] Cultural customization
- [ ] Local partnerships

### Platform Maturity

**Federation:**
- [ ] Inter-circle wealth sharing
- [ ] Global gold price sync
- [ ] Cross-border transactions
- [ ] Multi-region hosting

**Community Platform:**
- [ ] Discussion forum
- [ ] Best practices wiki
- [ ] Success stories
- [ ] Learning center

### Impact Goals (Year 5)

```
Users: 500,000 globally
Circles: 50,000
Wealth shared: ₹5,000 crore
Countries: 25+
Languages: 10+

Revenue: ₹66L/year
Team: 5-7 people
Status: Self-sustaining + giving back

Recognition:
- Industry standard
- Academic citations
- Government partnerships
- Mainstream awareness
```

---

## B. Development Principles

### 1. Ship Early, Ship Often

- Release MVP fast (6 months)
- Get user feedback
- Iterate based on usage
- Don't over-engineer

### 2. User-Driven Roadmap

- Weekly user interviews
- Support ticket analysis
- Feature voting
- Beta testing groups

### 3. Simplicity First

- Every feature must justify itself
- Remove unused features
- Default to simple
- Power users can self-serve

### 4. Stability > Features

- No new features if bugs exist
- 99.9% uptime target
- Data integrity paramount
- Security never compromised

### 5. Open & Transparent

- Public roadmap (GitHub)
- Changelog with every release
- Beta features announced
- Community input welcomed

---

## C. Release Process

### Versioning

**Semantic Versioning:**
```
v1.0.0 - Open source launch
v1.1.0 - Minor feature addition
v1.1.1 - Bug fix
v2.0.0 - Major breaking change
```

### Release Cycle

**Phase 1-2 (Weekly releases):**
```
Monday:    Plan week's work
Wed-Thu:   Development
Friday:    Testing
Saturday:  Deploy
Sunday:    Monitor
```

**Phase 3+ (Bi-weekly releases):**
```
Week 1:    Development sprint
Week 2:    Testing, documentation
Friday:    Release
```

---

## D. Team Evolution

### Phase 1: Solo (Months 1-6)
- 1 founder/developer
- Optional: 1 designer (contract)
- Optional: Islamic finance advisor

### Phase 2: Solo + Community (Months 6-12)
- 1 founder/developer
- Community contributors (unpaid)
- Cost: ₹2,000/month

### Phase 3: Core Team (Months 12-18)
**Add:**
- 1 backend developer (part-time)
- Team: 1.5 people
- Cost: ₹20,000/month

### Phase 4: Growth (Months 18-24)
**Add:**
- 1 backend dev → full-time
- 1 frontend developer
- Team: 3 people
- Cost: ₹1,20,000/month

### Phase 5: Scale (Year 2+)
**Add:**
- Product manager
- Support specialist
- Regional managers (as expand)
- Team: 5-7 people (stay lean)

---

## E. Cost & Revenue Projections

### Phase 1 (Months 1-6)
```
Infrastructure: ₹500/month
Revenue: ₹0
Burn: ₹500/month
Funding: Personal
```

### Phase 2 (Months 6-12)
```
Infrastructure: ₹2,000/month
Revenue: ₹0
Burn: ₹2,000/month
Funding: Personal/Grants
```

### Phase 3 (Months 12-18)
```
Infrastructure: ₹10,000/month
Team: ₹10,000/month (part-time)
Total Cost: ₹20,000/month

Revenue: ₹29,780/month
Profit: ₹9,780/month ✅
Status: PROFITABLE
```

### Phase 4 (Months 18-24)
```
Infrastructure: ₹35,000/month
Team: ₹85,000/month (3 full-time)
Total Cost: ₹1,20,000/month

Revenue: ₹1,79,120/month
Profit: ₹59,120/month ✅
Status: SUSTAINABLE
```

### Phase 5 (Year 2+)
```
Infrastructure: ₹2,00,000/month
Team: ₹3,00,000/month (5-7 people)
Total Cost: ₹5,00,000/month

Revenue: ₹5,50,000/month
Profit: ₹50,000/month ✅
Status: THRIVING
```

---

## F. Key Milestones

### Month 6: Open Source Launch
- ✅ Code public on GitHub
- ✅ 500 self-hosters
- ✅ Community building

### Month 12: Cloud Launch
- ✅ Free cloud tier available
- ✅ 2,000 total users
- ✅ Proven infrastructure

### Month 18: Profitability
- ✅ Paid tiers launched
- ✅ Revenue > Costs
- ✅ 5,000 users

### Month 24: Sustainability
- ✅ 3-person team
- ✅ 20,000 users
- ✅ Enterprise customers

### Year 5: Impact
- ✅ 500,000 users globally
- ✅ ₹5,000 crore circulated
- ✅ Industry recognition

---
**Next:** Read [Success Metrics](11-success-metrics.md) for measurement framework.
