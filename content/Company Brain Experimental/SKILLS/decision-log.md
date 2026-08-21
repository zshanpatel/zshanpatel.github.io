---
title: Decision Log
description: Document decisions clearly so they are never re-litigated. Template and workflow.
type: skill
draft: false
showDate: false
---

# Decision Log

Use this skill to document major choices when they happen. Capturing context prevents re-arguing settled topics later.

## When to Use

Run this workflow after any significant choice:
- Hiring or team structure changes
- Tool, vendor, or software selections
- Strategy shifts or product direction changes
- Policy updates or process overhauls

## Workflow

Prompt the user for details or extract answers from the current discussion. Ask these 6 questions:

1. **Decision**: What was decided?
2. **Alternatives**: What alternatives were considered?
3. **Rationale**: Why was this option chosen over the alternatives?
4. **Owner**: Who made or approved the decision?
5. **Review Triggers**: What specific conditions would trigger revisiting this decision?
6. **Date**: What is the effective date?

## Output Template

Generate the record in clean markdown:

```markdown
# Decision: [Short Title]

- **Date**: YYYY-MM-DD
- **Decision Owner**: [Name / Role]
- **Status**: Approved

## Context and Decision
[Clear statement of what was decided.]

## Alternatives Considered
- **Option A**: [Description and why it was passed over]
- **Option B**: [Description and why it was passed over]

## Rationale
[Key reasons this path was chosen, including trade-offs accepted.]

## Review Triggers
Revisit this decision only if:
- [Trigger condition 1]
- [Trigger condition 2]
```

## Sample Output

```markdown
# Decision: Switch Customer Support to Async Helpdesk

- **Date**: 2026-03-15
- **Decision Owner**: Operations Lead
- **Status**: Approved

## Context and Decision
We decided to replace live chat support with an asynchronous ticket desk.

## Alternatives Considered
- **Maintain Live Chat with Shift Hires**: Passed over due to high staffing costs across time zones.
- **AI Chatbot First Line**: Passed over because current documentation is not ready for automated resolution.

## Rationale
Async ticketing allows the current team to maintain response quality without requiring 24/7 staffing coverage.

## Review Triggers
Revisit this decision only if:
- First-response time exceeds 8 hours over two consecutive weeks.
- Customer satisfaction ratings drop below 90 percent.
```
