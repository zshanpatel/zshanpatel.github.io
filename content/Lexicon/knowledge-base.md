---
title: Knowledge Base
name: knowledge-base
description: A structured store of facts and rules a system can draw on to answer questions or reason about a domain — in modern AI products, the part that has to be built by hand for each client, which is why it's harder to sell than the chatbot sitting on top of it.
tags:
  - term
human-reviewed: false
---
> The chatbot is the easy part. What it actually knows is the hard part.

"Knowledge base" comes out of 1970s–80s AI research into expert systems — programs meant to replicate a human specialist's judgment in a narrow domain, like medical diagnosis. Edward Feigenbaum's work on knowledge engineering, and Ronald Brachman and Hector Levesque's later systematisation of the field in Knowledge Representation and Reasoning, established the core split still used today: a knowledge base (the facts and rules) is separate from the inference engine (the logic that reasons over them). Get the knowledge base wrong — incomplete, inconsistent, or badly organised — and no amount of reasoning sophistication on top of it produces a good answer.

This essay names the real difficulty directly: "programming a simple meeting scheduler or AI assistant is not the hard part. The challenge is building the appropriate knowledge base." A chatbot's conversational layer is largely reusable across clients; the knowledge base — what this specific business does, how it prices things, what its edge cases are — is not, and has to be built fresh nearly every time. That asymmetry is why the knowledge base, not the chatbot, is where the actual consulting work lives.

*Source: Brachman, R.J. & Levesque, H.J. (2004), Knowledge Representation and Reasoning, Morgan Kaufmann.*

### 🔗 Related Concepts
- [[long-term-memory|A Related Way Modern AI Systems Store What They Know]]
- [[chatbot|The Layer Sitting on Top of the Knowledge Base]]
