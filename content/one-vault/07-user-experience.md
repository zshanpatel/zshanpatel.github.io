---
title: User Experience
permalink: /one-vault/07-user-experience
tags:
aliases:
showDate: false
draft: true
---
 Unavailable                │
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

### Validation Errors

```tsx
// Clear, inline feedback
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

**No Loans Yet:**
```
┌─────────────────────────────────────┐
│                                     │
│           💰                         │
│                                     │
│     No loans yet                    │
│                                     │
│  Create your first interest-free    │
│  loan with your circle members.     │
│                                     │
│  [Create Your First Loan]           │
│                                     │
└─────────────────────────────────────┘
```

**No Circles:**
```
┌─────────────────────────────────────┐
│                                     │
│           🔐                         │
│                                     │
│    Join or create a circle          │
│                                     │
│  Circles are trusted groups where   │
│  you can lend and borrow.           │
│                                     │
│  [Create Circle] [Join via Link]    │
│                                     │
└─────────────────────────────────────┘
```

---

## H. Performance Optimizations

### Loading States

**Skeleton Screens (preferred over spinners):**
```tsx
<Card>
  <Skeleton className="h-4 w-1/2 mb-2" />
  <Skeleton className="h-8 w-1/3 mb-4" />
  <Skeleton className="h-12 w-full" />
</Card>
```

**Progressive Loading:**
```
1. Show layout immediately (SSR)
2. Show cached data (if available)
3. Fetch fresh data in background
4. Update when ready
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/gold-price-chart.png"
  alt="Gold price trend"
  width={800}
  height={400}
  loading="lazy"
  placeholder="blur"
/>
```

### Code Splitting

```tsx
// Lazy load heavy components
const LedgerTable = dynamic(() => import('@/components/LedgerTable'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

---

## I. Animations & Micro-interactions

### Subtle, Purposeful

**Principle:** Animate state changes, not decoration.

**Button Click:**
```css
button {
  transition: transform 0.1s, background-color 0.2s;
}

button:active {
  transform: scale(0.95);
}
```

**Card Hover:**
```css
.loan-card {
  transition: box-shadow 0.2s, transform 0.2s;
}

.loan-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}
```

**Success Confirmation:**
```tsx
// Checkmark animation
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 200 }}
>
  ✅
</motion.div>
```

**Toast Notifications:**
```tsx
import { toast } from 'sonner';

toast.success('Payment recorded!', {
  description: 'Waiting for lender confirmation',
  action: {
    label: 'View',
    onClick: () => router.push(`/loans/${loanId}`)
  }
});
```

---

## J. Onboarding Experience

### First-Time User Flow

**Step 1: Welcome**
```
┌─────────────────────────────────────┐
│                                     │
│       Welcome to bzkt! 👋           │
│                                     │
│  Let's get you started with         │
│  interest-free, gold-backed lending.│
│                                     │
│  [Let's Go →]                       │
│                                     │
└─────────────────────────────────────┘
```

**Step 2: Phone Verification**
```
┌─────────────────────────────────────┐
│  Enter your phone number            │
├─────────────────────────────────────┤
│                                     │
│  We'll send you a verification code.│
│                                     │
│  Country: [🇮🇳 India +91 ▾]         │
│                                     │
│  Phone Number                       │
│  ┌──────────────────────────────┐  │
│  │ 9876543210                   │  │
│  └──────────────────────────────┘  │
│                                     │
│  [Send Code →]                      │
│                                     │
│  🔒 Your number is private and      │
│  only visible to circle members.    │
│                                     │
└─────────────────────────────────────┘
```

**Step 3: Enter OTP**
```
┌─────────────────────────────────────┐
│  Enter verification code            │
├─────────────────────────────────────┤
│                                     │
│  Sent to +91 9876543210             │
│                                     │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐│
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 ││
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘│
│                                     │
│  Didn't receive? [Resend Code]      │
│                                     │
└─────────────────────────────────────┘
```

**Step 4: Basic Info**
```
┌─────────────────────────────────────┐
│  Tell us about yourself             │
├─────────────────────────────────────┤
│                                     │
│  Full Name                          │
│  ┌──────────────────────────────┐  │
│  │ Ahmed Patel                  │  │
│  └──────────────────────────────┘  │
│                                     │
│  Email (optional)                   │
│  ┌──────────────────────────────┐  │
│  │ ahmed@example.com            │  │
│  └──────────────────────────────┘  │
│                                     │
│  [Complete Setup →]                 │
│                                     │
└─────────────────────────────────────┘
```

**Step 5: Choose Path**
```
┌─────────────────────────────────────┐
│  What would you like to do?         │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🔐 Create a Circle          │  │
│  │                              │  │
│  │  Start a lending circle with │  │
│  │  family or friends.          │  │
│  │                              │  │
│  │  [Create Circle →]           │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🔗 Join a Circle            │  │
│  │                              │  │
│  │  Have an invite link?        │  │
│  │  Join an existing circle.    │  │
│  │                              │  │
│  │  [Enter Invite Code →]       │  │
│  └──────────────────────────────┘  │
│                                     │
│  [Skip for now]                     │
│                                     │
└─────────────────────────────────────┘
```

### Tooltips & Contextual Help

**First loan creation:**
```tsx
<Tooltip>
  <TooltipTrigger>
    Why gold? <InfoIcon />
  </TooltipTrigger>
  <TooltipContent>
    <p>Gold keeps your loan's value stable.</p>
    <p>If you lend ₹50,000 today, you get back</p>
    <p>the same purchasing power later.</p>
    <Link href="/learn/gold">Learn more →</Link>
  </TooltipContent>
</Tooltip>
```

**Interactive Tour (first visit):**
```tsx
// Using react-joyride or similar
const steps = [
  {
    target: '.overview-card',
    content: 'This shows your total lending and borrowing',
  },
  {
    target: '.active-loans',
    content: 'Track active loans here',
  },
  {
    target: '.create-loan-btn',
    content: 'Create a new loan with this button',
  },
  {
    target: '.ledger-link',
    content: 'See all transactions in the transparent ledger',
  }
];
```

---

## K. Copy & Microcopy

### Voice & Tone

**Principles:**
- **Clear:** No jargon, simple language
- **Friendly:** Warm but professional
- **Respectful:** Honor cultural context (Islamic values)
- **Empowering:** "You can" not "We allow you"
- **Honest:** Transparent about limitations

### Button Copy

**Action-Oriented:**
```
✅ Good:
- "Create Loan"
- "Record Payment"
- "Send Reminder"
- "Confirm Receipt"

❌ Bad:
- "Submit"
- "OK"
- "Proceed"
- "Next"
```

### Error Messages

**Helpful, Not Blaming:**
```
✅ Good:
"We couldn't find that circle. Check the invite link."

❌ Bad:
"Invalid circle ID. Error 404."
```

**With Solutions:**
```
✅ Good:
"Amount too high. Your circle limit is ₹1,00,000. 
Contact admin to increase."

❌ Bad:
"Amount exceeds maximum."
```

### Empty States

**Encouraging, Not Depressing:**
```
✅ Good:
"No active loans. You're all settled! 
Create a new loan when needed."

❌ Bad:
"No data to display."
```

### Confirmation Messages

**Specific, Reassuring:**
```
✅ Good:
"✅ Payment of ₹52,308 recorded.
Ahmed will be notified to confirm receipt."

❌ Bad:
"Success."
```

---

## L. Cultural Considerations

### Islamic Finance Terminology

**Use Correct Terms:**
- Qard al-Hassan (beautiful loan) ✅
- Not: "Islamic loan" ❌
- Interest-free ✅
- Not: "Sharia-compliant" (too corporate) ❌

**Hijri Dates (Optional):**
```tsx
<div>
  <span>Dec 16, 2025</span>
  <span className="text-muted-foreground">
    (Jumada al-Thani 16, 1447)
  </span>
</div>
```

### Language Support (Future)

**Priority Languages:**
1. English (primary)
2. Urdu (Hindi script)
3. Hindi
4. Arabic
5. Bengali

**Implementation:**
```tsx
import { useTranslation } from 'next-i18next';

const { t } = useTranslation('common');

<h1>{t('dashboard.welcome', { name: user.name })}</h1>
```

### Respectful Defaults

**Date Formats:**
- India: DD/MM/YYYY
- Include both Gregorian and Hijri

**Currency:**
- Default to user's location (₹ for India)
- Allow selection (₹, $, £, etc.)

**Names:**
- Support full names (Ahmed bin Mohammed bin...)
- No "first name / last name" split

---

## M. Feedback Mechanisms

### In-App Feedback

**Feedback Button (bottom right):**
```
┌─────────────────────────────────────┐
│                                     │
│                         [💬 Feedback]│
│                                     │
└─────────────────────────────────────┘
```

**Feedback Modal:**
```
┌─────────────────────────────────────┐
│  Send Feedback               [X]    │
├─────────────────────────────────────┤
│                                     │
│  What would you like to tell us?    │
│                                     │
│  [●] Bug Report                     │
│  [ ] Feature Request                │
│  [ ] General Feedback               │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ Describe your feedback...    │  │
│  │                              │  │
│  │                              │  │
│  └──────────────────────────────┘  │
│                                     │
│  📧 Email: ahmed@example.com        │
│  (optional, for follow-up)          │
│                                     │
│  [Send Feedback]                    │
│                                     │
└─────────────────────────────────────┘
```

### Rating Prompts (Subtle)

**After successful payment:**
```
┌─────────────────────────────────────┐
│  ✅ Payment confirmed!              │
├─────────────────────────────────────┤
│                                     │
│  How's your experience with bzkt?   │
│                                     │
│  ⭐️ ⭐️ ⭐️ ⭐️ ⭐️                  │
│                                     │
│  [Maybe later]                      │
│                                     │
└─────────────────────────────────────┘
```

---

## N. Performance Metrics to Track

### Core Web Vitals

```
LCP (Largest Contentful Paint):  < 2.5s
FID (First Input Delay):          < 100ms
CLS (Cumulative Layout Shift):    < 0.1
```

### User-Centric Metrics

```
Time to First Loan Created:       < 5 minutes
Loan Creation Completion Rate:    > 80%
Payment Confirmation Time:        < 24 hours
Dashboard Load Time:              < 1 second
```

### UX Metrics

```
Error Rate:                       < 1%
Support Ticket Rate:              < 5%
User Retention (30 days):         > 70%
NPS (Net Promoter Score):         > 50
```

---

## O. Accessibility Checklist

### Before Launch

- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Keyboard navigation works everywhere
- [ ] Screen reader tested (NVDA/JAWS)
- [ ] Color contrast > 4.5:1
- [ ] Focus indicators visible
- [ ] No flashing content (seizure risk)
- [ ] Video has captions (if any)
- [ ] ARIA labels on interactive elements
- [ ] Skip to main content link
- [ ] Semantic HTML (h1, h2, nav, main, etc.)
- [ ] Error messages announced by screen readers
- [ ] Success messages announced
- [ ] Loading states announced

---

## P. Design System Documentation

### Component Library

**Organized by:**
1. **Foundation:** Colors, typography, spacing, shadows
2. **Primitives:** Button, Input, Card, Badge
3. **Patterns:** LoanCard, LedgerRow, ContractPreview
4. **Layouts:** DashboardLayout, AuthLayout
5. **Templates:** Dashboard, LoanCreation, Ledger

**Each Component Documents:**
- Purpose
- Props/API
- Usage examples
- Accessibility notes
- Do's and Don'ts

**Example:**
```tsx
/**
 * LoanCard Component
 * 
 * Displays a summary of a loan with key details.
 * Used in dashboard and loan lists.
 * 
 * @param loan - Loan object with all details
 * @param onClick - Handler when card is clicked
 * @param actions - Optional action buttons
 * 
 * @example
 * <LoanCard 
 *   loan={loan} 
 *   onClick={() => router.push(`/loans/${loan.id}`)}
 *   actions={<Button>View</Button>}
 * />
 */
```

---

## Q. User Testing Plan

### Phase 1: Internal Testing (Week 1)

**Participants:** 5 team members + family

**Tasks:**
1. Create account
2. Create circle
3. Create loan
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
- Loans created
- Payments made
- Support tickets
- NPS scores

**Weekly Check-ins:**
- Survey: What worked? What didn't?
- Analytics review
- Feature requests

---

**Next:** Read [Governance](08-governance.md) for circle self-governance.
