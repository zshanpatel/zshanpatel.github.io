---
title: User Experience Principles
permalink: /one-vault/07-user-experience
tags:
aliases:
showDate: false
draft: false
---
## Overview
The one-vault system's UX is designed around **clarity, trust, and simplicity**. Financial transactions require confidence—users must understand exactly what's happening at every step.

---

## A. Core UX Principles

### 1. Clarity Over Cleverness

**Principle:** Use plain language, not jargon.

**Examples:**

❌ **Bad:**
```
Collateralised loan instrument
Denominated in XAU
Settlement via P2P rails
```

✅ **Good:**
```
Interest-free wealth sharing
Measured in gold grams
You transfer money directly
```

**Implementation:**
- No financial jargon unless necessary
- Explain gold-pegging simply: "Keeps value stable"
- Show both gold AND fiat amounts always
- Tooltips for unfamiliar terms

### 2. Transparency Over Privacy (Within Circles)

**Principle:** Trust requires visibility.

**Why:**
- Families/friends need to see who owes what
- Hidden shares create suspicion
- Transparency = accountability
- Privacy is between circles, not within them

**Implementation:**
- Full ledger visible to all circle members
- Can't hide shares from your circle
- Clear share status indicators
- Payment history always accessible

### 3. Guidance Over Judgement

**Principle:** Help people do the right thing, don't shame failures.

**Examples:**

❌ **Judgmental:**
```
⚠️ OVERDUE SHARE - PAY NOW
You are 5 days late. This affects your reputation.
```

✅ **Guiding:**
```
Share passed due date (5 days)
Life happens—please contact Ahmed to discuss.
No penalties apply. Communication is key.
[Contact Giver] [Request Extension]
```

### 4. Automation Over Manual Entry

**Principle:** Reduce human error.

**Examples:**
- Gold grams calculated automatically (not manual entry)
- Today's gold rate fetched daily (not user-entered)
- Contract PDFs generated (not manually written)
- Return amounts calculated (not guessed)
- Dates auto-filled where possible

### 5. Progressive Disclosure

**Principle:** Show simple first, complexity on demand.

**Dashboard Home:**
```
Simple view:
━━━━━━━━━━━━━━━━━━━━━━━━━━
💸 Giving: 7.69g (₹52,308)
💳 Receiving: 0g

[Show Details →]
```

---

## B. Visual Design System

### Dark Theme Aesthetic

**Philosophy:** Calm, focused, data-centric.

**Color System (shadcn/ui dark):**
```
Background:     #0a0a0a (near black)
Surface:        #121212 (slightly lighter)
Primary:        #3b82f6 (blue)
Success:        #22c55e (green)
Warning:        #eab308 (yellow)
Danger:         #ef4444 (red)
Muted:          #71717a (grey)
Text:           #fafafa (off-white)
```

**Typography:**
```
Headings:    Inter (sans-serif, clean)
Body:        Inter (same, consistency)
Monospace:   JetBrains Mono (for numbers, gold grams)
```

---

## C. Key Screens

### Dashboard Home (`/dashboard`)

**Goal:** At-a-glance status, quick actions.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│ one-vault              🔍 Search    🔔  [User ▾]│
├─────────────────────────────────────────────────┤
│                                                 │
│ Overview                                        │
│ ┌───────────────┐ ┌───────────────┐           │
│ │ 💸 Giving     │ │ 💳 Receiving  │           │
│ │ 7.69g         │ │ 0g            │           │
│ │ ₹52,308       │ │ ₹0            │           │
│ └───────────────┘ └───────────────┘           │
│                                                 │
│ Active Shares (1)          [View All →]        │
│ ┌─────────────────────────────────────────┐   │
│ │ 💰 7.69g → Raheem                       │   │
│ │ ₹52,308 @ ₹6,800/g                      │   │
│ │ Due: Dec 16 (14 days) 🔵 Active         │   │
│ │ [View] [Remind] [Extend]                │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ Your Circles (2)           [Create Circle →]   │
│ ┌─────────────────────────────────────────┐   │
│ │ 🔐 Patel Family Vault                   │   │
│ │ 5 members • 3 active • ₹87,124          │   │
│ │ [View Ledger] [New Share]               │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ [+ New Share] [Record Payment] [View Gold]     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Wealth Share Creation (`/dashboard/shares/new`)

**Goal:** Clear, step-by-step, no ambiguity.

```
┌─────────────────────────────────────────────────┐
│ Create New Wealth Share            [X Close]    │
├─────────────────────────────────────────────────┤
│                                                 │
│ Step 1: Basic Details                          │
│                                                 │
│ Circle *                                        │
│ [Patel Family Vault ▾]                         │
│                                                 │
│ Giver *                                         │
│ [You (Ahmed) ▾]                                │
│                                                 │
│ Receiver *                                      │
│ [Raheem ▾]                                     │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Step 2: Amount                                 │
│                                                 │
│ Amount (INR) *                                  │
│ ┌─────────────────────────────────────────┐   │
│ │ ₹ 50,000                                │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ 💎 Equivalent Gold                             │
│ ┌─────────────────────────────────────────┐   │
│ │ 7.6923 grams                            │   │
│ │ @ ₹6,500/gram (today's rate)            │   │
│ │ Last updated: 2 hours ago               │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│ ℹ️ Why gold? [Learn More]                     │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Step 3: Duration                               │
│                                                 │
│ [30 days] [●60 days] [90 days] [Custom]       │
│                                                 │
│ Due Date: December 16, 2025                    │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Step 4: Witnesses (Select 2) *                │
│                                                 │
│ [✓] Bilal                                      │
│ [✓] Tariq                                      │
│ [ ] Imran                                       │
│                                                 │
│ [Create Wealth Share Contract →]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Ledger View (`/circles/[id]/ledger`)

**Goal:** Complete transparency, easy filtering.

```
┌─────────────────────────────────────────────────────────┐
│ Patel Family Vault Ledger                [Export CSV ↓]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Filters:                                                │
│ Status: [All ▾] Member: [All ▾] Date: [All time ▾]    │
│                                                         │
├──────┬────────┬─────────┬─────────┬─────────┬─────────┤
│ Date │ Giver  │ Receiver│ Gold(g) │ Value   │ Status  │
├──────┼────────┼─────────┼─────────┼─────────┼─────────┤
│ Oct  │ Ahmed  │ Raheem  │  7.69   │ ₹52,308 │🔵 Active│
│ 17   │        │         │         │ 14 days │         │
├──────┼────────┼─────────┼─────────┼─────────┼─────────┤
│ Oct  │ Bilal  │ Tariq   │  5.12   │ ₹34,816 │🔵 Active│
│ 20   │        │         │         │ 30 days │         │
├──────┼────────┼─────────┼─────────┼─────────┼─────────┤
│ Sep  │ Ahmed  │ Bilal   │  3.50   │   -     │💜Forgiv-│
│ 30   │        │         │         │ Charity │  en     │
└──────┴────────┴─────────┴─────────┴─────────┴─────────┘
```

---

## D. Error Handling

### Validation Errors

**Clear, inline feedback:**

```tsx
<Input
  type="number"
  name="amount"
  error={errors.amount}
  helperText={
    errors.amount?.type === 'min' 
      ? 'Amount must be at least ₹1,000'
      : errors.amount?.type === 'max'
      ? 'Amount cannot exceed ₹10,00,000'
      : undefined
  }
/>
```

### Empty States

**No Shares Yet:**
```
┌─────────────────────────────────────┐
│                                     │
│           💰                         │
│                                     │
│     No wealth shares yet            │
│                                     │
│  Create your first interest-free    │
│  share with your circle members.    │
│                                     │
│  [Create Your First Share]          │
│                                     │
└─────────────────────────────────────┘
```

### Gold Rate Unavailable

```
┌─────────────────────────────────────┐
│ ℹ️ Gold Rate Unavailable            │
├─────────────────────────────────────┤
│                                     │
│ We couldn't fetch today's gold rate.│
│                                     │
│ Using yesterday's rate:             │
│ ₹6,500/gram (Oct 16, 2025)          │
│                                     │
│ ⚠️ This is an estimate. Actual      │
│ amount may vary slightly.           │
│                                     │
│ [Continue with Estimate]            │
│ [Wait for Update]                   │
│                                     │
└─────────────────────────────────────┘
```

---

## E. Mobile Responsiveness

### Breakpoints

```css
sm:  640px  /* Phones (landscape) */
md:  768px  /* Tablets */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
```

### Mobile-First Approach

**Dashboard on Mobile:**
```
┌─────────────────────┐
│ one-vault   [☰ Menu]│
├─────────────────────┤
│                     │
│ Overview            │
│ ┌─────────────────┐│
│ │ 💸 Giving       ││
│ │ 7.69g           ││
│ │ ₹52,308         ││
│ └─────────────────┘│
│                     │
│ Active Shares       │
│ [View All →]        │
│ ┌─────────────────┐│
│ │ 7.69g→Raheem    ││
│ │ ₹52,308         ││
│ │ Due: Dec 16     ││
│ │ [View Details]  ││
│ └─────────────────┘│
│                     │
│ Quick Actions       │
│ [+ New Share]       │
│                     │
└─────────────────────┘
```

---

## F. Accessibility (WCAG AA)

### Keyboard Navigation

- All actions accessible via Tab
- Enter/Space to activate
- Escape to close modals
- Arrow keys for dropdowns

### Screen Reader Support

```tsx
<button
  aria-label="View wealth share details for Raheem"
  aria-describedby="share-summary"
>
  View Details
</button>

<div id="share-summary" className="sr-only">
  Share of 7.69 grams to Raheem, due December 16
</div>
```

### Color Contrast

- Text: 16:1 (AAA level)
- UI elements: 4.5:1 (AA level)
- Never rely on color alone (use icons + text)

---

## G. Copy & Microcopy

### Button Copy

**Action-Oriented:**
```
✅ Good:
- "Create Share"
- "Record Payment"
- "Send Reminder"

❌ Bad:
- "Submit"
- "OK"
- "Proceed"
```

### Error Messages

**Helpful, Not Blaming:**
```
✅ Good:
"We couldn't find that circle. Check the invite link."

❌ Bad:
"Invalid circle ID. Error 404."
```

---

## H. User Testing Plan

### Phase 1: Internal Testing (Week 1)

**Participants:** 5 team members + family

**Tasks:**
1. Create account
2. Create circle
3. Create wealth share
4. Sign contract (as witness)
5. Record payment
6. View ledger

**Metrics:**
- Task completion rate
- Time per task
- Errors encountered
- Feedback notes

### Phase 2: Alpha Testing (Week 2-3)

**Participants:** 20 users from target audience

**Format:** Moderated remote sessions

**Focus:**
- Onboarding clarity
- Gold-pegging understanding
- Trust factors
- Pain points

### Phase 3: Beta Testing (Week 4-8)

**Participants:** 100 users (real circles)

**Format:** Unmoderated, in-the-wild usage

**Track:**
- Daily active users
- Wealth shares created
- Payments made
- Support tickets
- NPS scores

**Weekly Check-ins:**
- Survey: What worked? What didn't?
- Analytics review
- Feature requests

---

**Next:** Read [Governance & Social Dynamics](08-governance.md) for circle self-governance.

---

**Created:** October 18, 2025  
**Last Updated:** October 18, 2025
