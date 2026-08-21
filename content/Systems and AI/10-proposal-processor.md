---
title: The Proposal Processor
name: proposal-processor
description: A one-command system that turns a client brief into a structured presentation draft. Build the orchestrator once; after that, attach the brief and type /proposal.
type: workflow
tags:
  - proposals
  - business-strategy
showDate: false
draft: false
---
### 📑 From Brief to Presentation, One Command

A proposal is the worst kind of document: high stakes, hard deadlines, and eighty percent scaffolding. The thinking is never repeated, but the structure always is. Read the brief, extract what they actually want, hunt for what is missing, build the deck skeleton, fill it slide by slide, check it answers the question. Every time, the same assembly line around a new idea.

That assembly line is a perfect candidate for a skill.

#### What the system does

Installed, it works like this: you type `/proposal` and attach the brief. The system reads it, extracts the objective, audience, deliverables and constraints, asks you the questions the brief left unanswered, proposes a slide-by-slide structure, waits for your approval, then drafts the deck one slide at a time with headlines, body copy, visual direction and speaker notes. You review. It revises. What used to take an evening takes an hour, and the hour goes to judgment instead of formatting.

#### Building it

**Step 1: Give it something to know.** Create a project folder with your context files: who you are, services and pricing logic, three to five past proposals you are proud of, tone rules, the phrases you never use. This folder is the actual product. The command is just the door.

**Step 2: Install the orchestrator.** Save the prompt below as a skill named `proposal` wherever your assistant keeps skills, or paste it as the standing instruction of a project with your context files attached.

```
# ROLE
You are a proposal director. You turn client briefs into structured presentation drafts. You are precise, allergic to filler, and you never invent facts.

# TRIGGER
Run when the user types /proposal and attaches a brief.

# PHASE 1: INTAKE
Read the brief and extract:
- Objective: what the client is actually buying
- Audience: who will read or watch, and what they care about
- Deliverables: what must be included
- Constraints: budget, timeline, format, length
- Evaluation criteria: how this will be judged
List what is stated. List separately what is implied. Flag anything critical that is absent.

# PHASE 2: CLARIFY
Ask up to five questions, only ones whose answers will change the proposal. If the brief is complete, say so and proceed.

# PHASE 3: STRUCTURE
Propose a slide-by-slide outline: one line per slide covering the headline idea and its job in the argument. Wait for approval. Do not draft slides yet.

# PHASE 4: DRAFT
After approval, draft one slide at a time. Per slide: headline, body copy, visual direction, speaker notes. Draw claims only from the brief and my context files. Mark anything assumed as ASSUMPTION.

# PHASE 5: REVIEW
Before delivering, verify: every brief requirement addressed, no unsupported claims, terminology consistent with my context files, no filler sentences. Deliver the deck, then a list of gaps only the client can decide.

# RULES
One phase at a time. Never skip the approval gate in Phase 3. Plain language over industry language. When information is missing, ask; never fill silence with invention.
```

**Step 3: Train it on a real brief.** Run it against a live proposal, not a test. Every place the output misses, correct it, then move the correction into the context files so it holds permanently. A fix applied in chat fixes one document. A fix applied to context fixes every future one.

#### Where the real work lives

The command is the visible ten percent. What decides whether the output is generic or unmistakably yours is the context folder: the past proposals, the taste, the standards, the creative direction. Expect this to be the slow part. Teaching a system what good looks like, precisely enough that it reproduces it, is genuine work, and it is also the part nobody can copy-paste from you.

A first version that produces a rough deck in an hour is a weekend away. A first version that produces your deck takes months of feeding. Both are worth building, and only one is worth selling.

#### ✅ Action checklist

- [ ] Assemble the context folder: profile, services, three past proposals, tone rules
- [ ] Install the orchestrator as a skill or project instruction
- [ ] Run it on a live brief, corrections flowing back into the context files
- [ ] After three runs, audit the folder: is it teaching taste, or just facts?

## Go Deeper

- **The engine underneath**: [[04 Blog Content/Systems and AI/00-skills|What a Skill Is]] explains why the orchestrator is a file and not a memory trick.
- **Pair it with**: [[04 Blog Content/Systems and AI/03-business-research|Map Your Business Strategy]] feeds the research half of every proposal.
- **Outside the vault**: [Anthropic on equipping agents with skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), the pattern this whole build follows.
