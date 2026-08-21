---
title: Context Architecture
name: context-architecture
description: The discipline of designing how intent and information flow through AI systems, prompt craft, context engineering, intent engineering, and specification engineering, each level building on the one below it.
tags:
  - concept
human-reviewed: false
---
> The infrastructure layer between what an organisation knows and what it can actually get an AI system to do with that knowledge.

Most organisations using AI are stuck at the level of the individual prompt: quality depends entirely on who typed it, and nothing compounds from one session to the next. Context architecture treats this as a design problem, not a skill gap, the same shift information architecture made to raw content decades earlier, now applied to what a model can see and act on.

The discipline is cumulative across four levels. **Prompt craft** is the single instruction. **Context engineering** is everything else the model can see: documents, tools, prior exchanges, held inside its context window. **Intent engineering** encodes purpose and boundaries so a system optimises for the right outcome, not just the stated one. **Specification engineering** writes organisational knowledge in a form an agent can act on directly, without a human translating intent into instruction each time it runs. Each level requires the one below it: a gap at any level limits everything built on top of it.

"Context engineering" as a named discipline traces to Shopify's Tobi Lütke (2025); Anthropic's Model Context Protocol (2024) gave that second level a concrete technical standard. The four-level, cumulative framing above, from prompt through specification, is [[01-s4g-consultancy|S4G Consultancy]]'s own applied taxonomy built on top of that emerging field.

### 🔗 Related Concepts
- [[rag|A Level-02 Technique: Grounding a Model in Retrieved Documents]]
- [[ai-agent|What Specification Engineering Makes Possible]]
