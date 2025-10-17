---
title: Gold Pegging Mechanism
permalink: /one-vault/04-gold-pegging-mechanism
tags:
aliases:
showDate: false
draft: false
---
## Overview
Gold-pegging is the core innovation that makes the one-vault system both **inflation-proof** and **Islamically compliant**. This document explains the mechanics, rationale, and implementation details.

---
## A. The Problem with Fiat Lending
### Inflation Erodes Value
**Scenario:**
- You share ₹50,000 today
- Inflation rate: 6% annually
- Receiver returns ₹50,000 after 1 year
- **Real value returned:** ₹47,000 (in today's purchasing power)
- **Giver's loss:** ₹3,000 in real value
### This Creates Injustice
**For Giver:**
- Lost purchasing power
- Effectively paid the receiver to hold their money
- Disincentivised from giving _qard al-hassan_
**For Receiver:**
- Gains from inflation (unearned benefit)
- Creates moral hazard (incentive to delay return)
**Islamic Perspective:**
- Injustice to either party is prohibited
- Fair exchange of value is required
- Both parties should neither gain nor lose from the transaction itself

---
## B. Why Gold Solves This
### Gold as Universal Store of Value
**Historical Track Record:**
- 3000+ years as wealth standard
- Survives empires, currencies, governments
- Maintains purchasing power across time
**Example:**
- 1 gram of gold in 1920: Could buy ~10 loaves of bread
- 1 gram of gold in 2025: Can buy ~10 loaves of bread
- Fiat currency: Completely different story
### Islamic Precedent
**Historical Currency:**
- **Dinar:** Gold coin (4.25 grams)
- **Dirham:** Silver coin (2.975 grams)
- Used throughout Islamic civilisation
- Debts denominated in dinars/dirhams
**Modern Scholars:**
- Recognise gold as mal mutaqawwim (real wealth)
- Support gold-backed transactions
- Preferable to fiat for long-term contracts

---
## C. How Gold-Pegging Works
### Daily Rate System (Cost-Optimised)
**Implementation:**
```typescript
// Cron job: Daily at 6 AM IST
async function fetchDailyGoldRate() {
  try {
    // Fetch from GoodReturns or similar
    const response = await fetch('https://www.goodreturns.in/gold-rates/');
    const price = parseGoldPrice(response);
    
    // Store in database
    await db.goldPrices.create({
      date: new Date().toISOString().split('T')[0],
      pricePerGram: price,
      source: 'GoodReturns',
      fetchedAt: new Date()
    });
    
    // Cache in Redis
    await redis.set('gold:rate:today', price, 'EX', 86400);
    
    console.log(`✅ Gold rate set: ₹${price}/gram`);
  } catch (error) {
    // Fallback: Use yesterday's rate
    console.error('Failed to fetch, using fallback');
  }
}
```

**Cost:** ₹0-5/month (one API call per day, web scraping possible)
### Step-by-Step Example
#### Step 1: Wealth Share Initiation
**User Input:**
- Receiver wants to receive: **₹50,000**
- Duration: **60 days**
- Purpose: Business inventory
**System Calculates:**
```
Today's gold rate: ₹6,500 per gram (fetched at 6 AM)
Gold equivalent: ₹50,000 ÷ ₹6,500 = 7.6923 grams
```
**Contract States:**
- Principal: **7.6923 grams of gold**
- Fiat reference (for convenience): ₹50,000
- Rate at initiation: ₹6,500/gram
- Initiation date: October 18, 2025
- Due date: December 17, 2025
#### Step 2: During Share Period
**Gold Price Fluctuates:**
```
Day 10: ₹6,600/gram → Current value: ₹50,769
Day 20: ₹6,450/gram → Current value: ₹49,615
Day 30: ₹6,700/gram → Current value: ₹51,538
...
Day 60: ₹6,800/gram → Current value: ₹52,308
```
**Receiver Can Track:**
- Current return amount (updated daily at 6 AM)
- Historical price chart
- Projected amount (based on trends)
#### Step 3: Return Calculation
**On Due Date (Day 60):**
```
Rate on December 17, 2025: ₹6,800/gram (set at 6 AM)
Amount owed: 7.6923 grams × ₹6,800 = ₹52,308
```
**Receiver Returns:**
- Transfers ₹52,308 to giver
- Marks payment as complete in app
- Giver confirms receipt
**Contract Status:** FULFILLED
---
## D. Scenario Analysis
### Scenario A: Gold Price Increases
**Initiation:** 7.69 grams @ ₹6,500 = ₹50,000  
**Return:** 7.69 grams @ ₹6,800 = ₹52,308
**Result:**
- Receiver pays ₹2,308 more in fiat
- But returns same real value (7.69 grams worth)
- Giver protected from inflation
**Is this interest?** NO
- Receiver returns the same 7.69 grams
- The fiat amount changed because rupee weakened, not because time passed
- Both parties agreed to gold as value measure
### Scenario B: Gold Price Decreases
**Initiation:** 7.69 grams @ ₹6,500 = ₹50,000  
**Return:** 7.69 grams @ ₹6,200 = ₹47,678
**Result:**
- Receiver pays ₹2,322 LESS in fiat
- Still returns same real value (7.69 grams worth)
- Receiver benefits from gold price drop
**Is this fair?** YES
- Both parties share currency risk equally
- Neither profits from time passing
- Market forces, not exploitation
### Scenario C: Partial Returns
**Share:** 7.69 grams total
**Payment 1 (Day 20):**
- Receiver repays: ₹20,000
- Rate that day: ₹6,600/gram
- Grams repaid: ₹20,000 ÷ ₹6,600 = 3.0303 grams
- **Remaining:** 7.69 - 3.03 = 4.6597 grams
**Payment 2 (Day 40):**
- Receiver repays: ₹15,000
- Rate that day: ₹6,550/gram
- Grams repaid: ₹15,000 ÷ ₹6,550 = 2.2901 grams
- **Remaining:** 4.66 - 2.29 = 2.3696 grams
**Final Payment (Day 60):**
- Rate: ₹6,800/gram
- Amount owed: 2.37 grams × ₹6,800 = ₹16,113
- Receiver repays ₹16,113
- **Total repaid:** ₹20,000 + ₹15,000 + ₹16,113 = ₹51,113
**Key Insight:**
- Each partial payment calculated at that day's rate
- Total fiat repaid varies based on timing
- Total gold repaid always equals exactly 7.69 grams

---
## E. Implementation Details
### Getting Today's Gold Rate
```typescript
// Simple, cost-optimised approach
async function getTodayGoldRate(): Promise<number> {
  // Try Redis first (fast)
  const cached = await redis.get('gold:rate:today');
  if (cached) return parseFloat(cached);
  
  // Fallback to database
  const today = new Date().toISOString().split('T')[0];
  const rate = await db.goldPrices.findOne({ 
    where: { date: today } 
  });
  
  if (rate) {
    // Cache for rest of day
    await redis.set('gold:rate:today', rate.pricePerGram, 'EX', 86400);
    return rate.pricePerGram;
  }
  
  // Emergency: Use yesterday's rate
  console.error('No rate for today! Using yesterday.');
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const yesterdayRate = await db.goldPrices.findOne({ 
    where: { date: yesterday } 
  });
  
  return yesterdayRate?.pricePerGram || 6500; // Last resort default
}
```
### Calculating Share Amount
```typescript
function calculateGoldGrams(
  fiatAmount: number, 
  goldRatePerGram: number
): number {
  // Precise to 4 decimal places
  return Math.round((fiatAmount / goldRatePerGram) * 10000) / 10000;
}

// Example
const grams = calculateGoldGrams(50000, 6500);
// Result: 7.6923
```
### Calculating Return Amount
```typescript
function calculateReturnAmount(
  goldGrams: number,
  currentGoldRate: number
): number {
  // Round to 2 decimal places for fiat
  return Math.round(goldGrams * currentGoldRate * 100) / 100;
}

// Example
const returnAmount = calculateReturnAmount(7.6923, 6800);
// Result: 52307.64 (displayed as ₹52,308)
```
---
## F. Edge Cases & Handling
### Edge Case 1: API Failure on Due Date
**Scenario:**
- Share due today
- Gold API is down
- Cannot fetch today's rate
**Handling:**
```
1. Use yesterday's rate (with disclaimer)
2. Allow manual entry (requires witness confirmation)
3. Delay return date by 1 day (mutual agreement)

User sees:
⚠️ Gold Rate Unavailable

We couldn't fetch today's rate.

Options:
1. Use yesterday's rate: ₹6,500/gram
2. Enter rate manually (requires witness)
3. Extend due date by 1 day

[Select Option]
```
### Edge Case 2: Large Gold Price Swing
**Scenario:**
- Gold suddenly jumps 15% in one day
- Receiver's return amount spikes
**Handling:**
```
1. Alert both parties of unusual movement
2. Show 30-day trend for context
3. Offer extension option (giver can grant grace)
4. Verify rate across multiple sources
5. If real spike: Amount is what it is (shared risk)
```
### Edge Case 3: Tiny Remainder After Partials
**Scenario:**
- Multiple partial returns
- Final remainder: 0.0023 grams (₹15)
**Handling:**
```
Minimum return threshold: ₹50
If below threshold:
- Giver can forgive (one-click)
- Or combine with next share
- Precision matters: don't round away
```
---
## G. Why This is Halal
### No _Riba_ (Interest)
**Key Distinction:**
❌ **Interest (Riba):**
```
Repayment = Principal × (1 + rate × time)
Profit is function of TIME
```
✅ **Gold-Pegging:**
```
Gold_grams = Principal_fiat / Rate_init
Return_fiat = Gold_grams × Rate_return
Return is function of MARKET VALUE, not time
```
**Proof:** If you share and return on the same day, and gold price changed, the fiat amount differs. Time didn't pass, but amount changed. Therefore, it's not time-based profit (riba), it's value tracking.
### Fair Risk Distribution
**Both parties share currency risk:**
- If gold increases: Receiver pays more (giver protected)
- If gold decreases: Receiver pays less (receiver benefits)
- Neither has systematic advantage
- Market determines outcome, not contract terms
**This is fair exchange in Islamic economics.**
---
## H. User Education
### Explaining to Users
**For Givers:**
```
"Imagine you share ₹50,000 today.

Without gold-pegging:
- Receiver returns ₹50,000 next year
- Inflation reduced its value to ₹47,000
- You lost ₹3,000 in purchasing power

With gold-pegging:
- You share 7.69 grams (worth ₹50,000 today)
- Receiver returns 7.69 grams next year
- 7.69 grams still worth ~₹50,000 in real terms
- Your purchasing power preserved

You don't profit from time (no riba).
You just don't lose either (fair exchange)."
```
**For Receivers:**
```
"Gold-pegging protects you too!

If gold price drops:
- You return LESS than you received (in fiat)
- Example: Received ₹50,000, return ₹47,000
- Both parties share currency risk

If gold price rises:
- You return MORE (in fiat)
- But you're returning the same real value
- Fair exchange, not exploitation

Early return benefits you if gold drops.
This encourages prompt return without penalties."
```
---
## I. Comparison with Alternatives
### Gold vs Fiat (No Adjustment)

| Aspect               | Gold-Pegged      | Fiat Only         |
| -------------------- | ---------------- | ----------------- |
| Inflation Protection | ✅ Yes            | ❌ No              |
| Islamic Compliance   | ✅ Yes            | ⚠️ Debatable      |
| Fair Value Exchange  | ✅ Yes            | ❌ Giver loses     |
| Risk Sharing         | ✅ Equal          | ❌ Giver bears all |
| Predictability       | ⚠️ Some variance | ✅ Fixed amount    |
| Simplicity           | ⚠️ Moderate      | ✅ Simple          |

### Gold vs CPI-Indexed

| Aspect               | Gold-Pegged      | CPI-Indexed         |
| -------------------- | ---------------- | ------------------- |
| Real Asset Backing   | ✅ Yes            | ❌ No (index)        |
| Islamic Compliance   | ✅ Clear          | ⚠️ Unclear          |
| Transparency         | ✅ High           | ⚠️ CPI manipulation |
| Global Acceptance    | ✅ Universal      | ❌ Country-specific  |
| Historical Precedent | ✅ Islamic dinars | ❌ Modern invention  |

---
**Next:** Read [Transaction Flow](05-transaction-flow.md) for complete user journey.
