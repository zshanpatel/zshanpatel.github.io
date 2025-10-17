---
title: Transaction Flow
permalink: /one-vault/05-transaction-flow
tags:
aliases:
showDate: false
draft: false
---
# Complete User Journey
This document details every step of the one-vault user experience from circle creation to loan repayment.

---
## Flow 1: Circle Creation & Onboarding
### Step 1: Download & Sign Up
1. User downloads the OVS app (App Store/Google Play)
2. Opens app → "Get Started"
3. Enters phone number
4. Receives OTP via SMS
5. Enters OTP → Account created
6. Optional: Add name, profile photo
### Step 2: Create First Circle
1. Tap "Create Circle"
2. Enter circle name (e.g., "Patel Family Vault")
3. Optional: Add description, set rules
4. Becomes Admin
5. Receives invite link
### Step 3: Invite Members
1. Admin taps "Invite Members"
2. Generates shareable link
3. Shares via WhatsApp/SMS/Email
4. Members click link → Join process
### Step 4: Member Joins
1. New user clicks invite link
2. Downloads app (if needed)
3. Signs up with phone/OTP
4. Sees circle preview
5. Taps "Request to Join"
6. Admin approves (or auto-joins if open policy)
7. Welcome message in circle feed
---
## Flow 2: Creating a Loan
### Step 1: Initiate Loan Request
**Option A: Borrower Initiates**
1. Borrower taps "Request Loan"
2. Selects lender from circle members
3. Enters amount: ₹50,000
4. Selects duration: 60 days
5. Optional: Adds purpose ("Business inventory")
**Option B: Lender Initiates**
6. Lender taps "Offer Loan"
7. Selects borrower from circle
8. Enters amount and terms
9. Sends offer
### Step 2: Gold Conversion Display
```
Amount: ₹50,000
≈ 7.69 grams of gold
@ ₹6,500/gram (live price)

Duration: 60 days
Due Date: Dec 16, 2025

⚠️ Repayment will be calculated
at gold spot price on due date
```
### Step 3: Counterparty Review
- Notification sent to counterparty
- They review terms
- Options: Accept, Reject, Counter-offer
- If accept → Proceed to witness selection
### Step 4: Select Witnesses
1. System shows available witnesses (not lender/borrower)
2. Both parties must agree on TWO witnesses
3. Suggested: Most active circle members
4. Witnesses notified
### Step 5: Witness Review & Sign
1. Witnesses receive notification
2. Review contract terms:
   - Parties involved
   - Amount (gold + fiat reference)
   - Duration and due date
   - Purpose (if provided)
3. Confirm understanding
4. Digital signature (tap to sign)
### Step 6: Lender & Borrower Sign
1. All parties review final contract
2. Lender signs
3. Borrower signs
4. Contract becomes active
### Step 7: Contract Generation & Storage
- PDF auto-generated with all terms
- Cryptographic hash created
- Stored in cloud + local device
- Ledger entry added
- All circle members notified

---
## Flow 3: Loan Active Period
### Daily Experience
**For Borrower:**
- Dashboard shows: "7.69 grams owed to Ahmed"
- Current value displayed: "₹52,100 (today's rate)"
- Days remaining: "45 days left"
- Price trend chart visible
**For Lender:**
- Dashboard shows: "7.69 grams lent to Raheem"
- Current value: "₹52,100"
- Due date countdown
- Payment reminders enabled
### Notifications Timeline
**7 Days Before Due:**
```
Reminder: Loan Due Soon
You owe 7.69 grams to Ahmed
Current value: ₹52,000
Due: Dec 16, 2025
[View Details] [Make Payment]
```
**3 Days Before Due:**
```
Reminder: Loan Due in 3 Days
Current repayment: ₹52,200
@ ₹6,785/gram
[Repay Now] [Request Extension]
```
**1 Day Before Due:**
```
Urgent: Loan Due Tomorrow
Amount: ₹52,300
Please prepare payment
[Repay Now] [Contact Lender]
```
**On Due Date:**
```
Loan Due Today
Repay: ₹52,308
7.69 grams @ ₹6,800/gram
[Repay Now]
```

---
## Flow 4: Repayment Process
### Full Repayment
**Step 1: Borrower Initiates**
1. Tap "Repay Loan"
2. System fetches live gold price
3. Calculates: 7.69g × ₹6,800 = ₹52,308
4. Displays repayment amount
**Step 2: Payment Method Selection**
```
Repay ₹52,308 to Ahmed

Payment Methods:
○ UPI: ahmed@paytm
○ Bank Transfer: HDFC XXXX1234
○ Cash (mark after handover)

[Confirm Payment Method]
```
**Step 3: Transfer Funds**
- Borrower transfers via chosen method
- External to OVS (peer-to-peer)
**Step 4: Mark as Paid**
- Borrower taps "I have paid ₹52,308"
- Timestamp recorded
- Lender notified
**Step 5: Lender Confirms**
- Lender receives notification
- Checks bank account/UPI
- Confirms receipt
- Taps "Confirm ₹52,308 received"
**Step 6: Loan Marked Repaid**
- Status: ACTIVE → REPAID
- Ledger updated
- All parties + witnesses notified
- Contract archived
- Success message displayed
### Partial Repayment
**Step 1: Select Partial Payment**
1. Borrower taps "Make Partial Payment"
2. Enters amount: ₹20,000
3. System calculates at TODAY'S rate
4. Shows: "Repaying 3.03 grams (of 7.69 total)"
**Step 2: Process Payment**
- Same transfer process as full repayment
- Lender confirms
**Step 3: Update Remaining Balance**
```
Partial Payment Recorded

Paid: ₹20,000 (3.03 grams)
Remaining: 4.66 grams
@ ₹6,600/gram on Oct 20, 2025

Next payment due: Dec 16, 2025
Current value of remaining: ₹31,656
```
**Step 4: Multiple Partials Supported**
- Borrower can make many partial payments
- Each calculated at that day's rate
- Running balance maintained
- Final payment settles exactly 0.00 grams
---
## Flow 5: Extension Request
### When Borrower Needs More Time
**Step 1: Request Extension**
1. Borrower taps "Request Extension"
2. Selects new due date (+15 days, +30 days, custom)
3. Optional: Adds reason
4. Sends request to lender
**Step 2: Lender Reviews**
```
Extension Request from Raheem

Current Due: Dec 16, 2025
Requested: Dec 31, 2025 (+15 days)
Reason: "Waiting for client payment"

Current Amount: ₹52,300

○ Accept Extension (No penalty)
○ Negotiate Different Date
○ Decline (requires conversation)
```
**Step 3: If Accepted**
- Contract amended (new due date)
- Witnesses notified
- Amendment logged
- No fees or penalties
**Step 4: If Declined**
- Encourages direct communication
- Suggests mediation
- Circle admin can facilitate
---
## Flow 6: Late Repayment (Overdue)
### Islamic Approach: Mercy, Not Punishment
**Day 1 Overdue:**
```
Loan Overdue (1 day)
Please contact Ahmed to discuss

No penalties apply.
Communication is encouraged.

[Contact Lender] [Repay Now]
```
**Day 3 Overdue:**
- Gentle reminder
- Circle admin notified (for support, not punishment)
- Encourages communication
**Day 7 Overdue:**
- Circle members can see overdue status (social accountability)
- Admin may reach out to help
- Still no financial penalties
**Day 30 Overdue:**
- Formal mediation offered
- Circle discusses collectively
- Focus: How to help borrower repay
**Key Principle:** 
No late fees, no penalties, no compounding. Only encouragement to communicate and fulfil _amanah_.

---
## Flow 7: Loan Forgiveness
### When Lender Forgives Debt
**Step 1: Lender Initiates**
1. Lender taps loan details
2. Selects "Forgive Debt"
3. Options:
   - Forgive remaining amount
   - Forgive partial amount
1. Confirms intention
**Step 2: Reason (Optional)**
```
Why are you forgiving this debt?

○ Borrower in hardship (charity)
○ Relationship more important
○ Fulfilling sadaqah (voluntary charity)
○ Other reason

[Confirm Forgiveness]
```
**Step 3: Witnesses Notified**
- Forgiveness is documented
- Witnesses attest to voluntary nature
- Prevents disputes later
**Step 4: Loan Status**
- Marked as FORGIVEN
- Ledger updated
- Both parties notified
- Counted as _sadaqah_ for lender (spiritual reward)
---
## Flow 8: Viewing Ledger
### Circle Transparency
**Access:**
- Any circle member can view full ledger
- Tap "Ledger" in circle view
**Ledger Display:**
```
┌─────────────────────────────────────┐
│  Patel Family Vault Ledger          │
├─────────────────────────────────────┤
│ Date      │ Lender │ Borrower │ Gold│
│           │        │          │ (g) │
├───────────┼────────┼──────────┼─────┤
│ Oct 17    │ Ahmed  │ Raheem   │7.69 │
│ Status: Repaid    │ ₹52,308 paid    │
├───────────┼────────┼──────────┼─────┤
│ Oct 20    │ Bilal  │ Tariq    │5.12 │
│ Status: Active    │ Due: Nov 19     │
├───────────┼────────┼──────────┼─────┤
│ Sep 30    │ Ahmed  │ Bilal    │3.50 │
│ Status: Forgiven  │ Charity         │
└─────────────────────────────────────┘

Total Loans: 3
Active: 1
Repayment Rate: 100%
```
**Filters:**
- By member
- By status (active/repaid/overdue/forgiven)
- By date range
- By amount
**Actions:**
- Tap any loan → See full contract
- Download contract PDF
- Export ledger as CSV
---
## Flow 9: Dispute Resolution
### Rare, But Necessary
**Step 1: Raise Dispute**
1. Either party taps "Raise Dispute"
2. Selects issue type:
   - Payment amount disagreement
   - Gold price dispute
   - Terms misunderstood
   - Other
3. Describes issue
4. Submits to witnesses + admin
**Step 2: Witnesses Review**
- Witnesses see original contract
- Review payment records
- Provide testimony
**Step 3: Admin Mediation**
- Circle admin facilitates conversation
- Proposes resolution
- Both parties vote: Accept/Reject
**Step 4: Resolution**
- If accepted: Loan adjusted, documented
- If rejected: Escalate to external arbitration (future feature)
---
## Flow 10: Leaving a Circle
### Voluntary Exit
**Preconditions:**
- All loans as borrower must be repaid
- Loans as lender must be settled or transferred
**Process:**
1. Tap "Leave Circle"
2. System checks active loans
3. If clean: Confirm exit
4. If pending: "Settle these first" list
5. After settlement: Leave confirmed
6. Retains contract copies
7. Access to historical data preserved
---
## Edge Case Flows
### Flow: API Failure on Repayment Day
1. System displays: "Gold price API unavailable"
2. Shows last cached price (with disclaimer)
3. Options:
   - Use cached price (both parties agree)
   - Enter manual price (witnesses confirm)
   - Extend due date until API restored
4. All parties must agree on chosen approach
5. Decision documented in contract notes
### Flow: Borrower Passes Away
1. Circle admin contacts next of kin
2. Debt passes to estate (Islamic law)
3. Options:
   - Estate repays
   - Lender forgives (sadaqah for deceased)
   - Reschedule with heirs
4. Handled with compassion, not legal force
### Flow: Lender Deletes Account
1. Active loans prevent deletion
2. Must transfer loans to another circle member
3. Or mark as forgiven
4. Historical data remains in ledger (immutable)
---
## User Interface Principles
### Clarity
- Always show both gold grams AND fiat equivalent
- Timestamp every price display
- Explain calculations transparently
### Guidance
- Tooltips on first use
- "Why gold?" explainer accessible
- Islamic principles cited when relevant
### Empathy
- No shame language for overdue loans
- Encourage communication over enforcement
- Default to mercy, not punishment
### Efficiency
- Common actions: 2 taps max
- Smart defaults
- Minimize typing
---
**Next:** Read [Technical Stack](06-technical-stack.md) for technology choices.