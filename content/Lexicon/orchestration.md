---
title: Orchestration
name: orchestration
description: Coordinating multiple tools, models, or automated steps toward one outcome without a human approving each individual step — in AI usage specifically, the difference between directing a system's tools and simply consuming what a system outputs.
aliases:
  - orchestrate
tags:
  - term
human-reviewed: false
---
> Someone has to decide what calls what, in what order, toward what end — the question is whether that's you, or a system doing it to you.

"Orchestration" has a real, older meaning in computer science: coordinating independent, distributed components — no single one of which controls the whole — toward a shared outcome. Papadopoulos and Arbab's 1998 survey of coordination models and languages laid out the formal version of this problem decades before AI made it a buzzword: how do you compose separately-built parts into a system that behaves coherently, without hard-wiring every interaction in advance?

The current AI-specific usage — coordinating multiple models, tools, and automated steps into one workflow — is genuine engineering practice, but it doesn't yet have a settled academic literature of its own; it's 2023-onward practitioner jargon built on top of that older coordination-theory foundation, not a new theoretical construct. IBM's own definition (2026) reflects that practitioner consensus rather than a peer-reviewed one: orchestration as a governed system determining which agent acts, when, on what data, and with what authority — coordination made explicit and accountable, not left implicit. What's worth being precise about is the asymmetry it names: an [[Lexicon/ai-agent|AI agent]] chaining tool calls is orchestration happening *to* a task, on someone's behalf, under their design. Whether that someone is you — directing which tools get called and why — or whether you're the one being routed, nudged, and served by a system someone else designed, is exactly the distinction this essay's closing line draws.

*Source (industry, not peer-reviewed — no academic literature yet exists for this specific AI-agent sense): IBM, "What is AI Agent Orchestration?," ibm.com/think/topics/ai-agent-orchestration (2026).*

### 🔗 Related Concepts
- [[ai-agent|The Mechanism Being Orchestrated]]
- [[agency|The Human Side of Who Orchestrates Whom]]
