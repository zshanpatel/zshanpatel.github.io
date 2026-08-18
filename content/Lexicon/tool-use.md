---
title: Tool Use (AI)
name: tool-use
description: A model's ability to call external functions — a search engine, a calculator, a database query — mid-answer, and fold the result back into its response, rather than being limited to whatever it can generate from its own training and context alone.
aliases:
  - function calling
  - tool calling
tags:
  - term
human-reviewed: false
---
> The model doesn't know today's weather. But it knows how to ask something that does, and read the answer back.

A language model on its own can only produce text based on patterns learned during training plus whatever's in its current context window — it has no way to check a live fact, run a calculation reliably, or query a database. Tool use closes that gap: the model is given a set of defined external functions it can call mid-generation — a web search, a calculator, an API — and is trained to recognise when a question needs one, issue the call, and incorporate whatever comes back into its answer. Research introducing this specifically as a trainable model skill, rather than a hand-built wrapper around the model, showed a model can learn on its own when and how to reach for a given tool.

This is the "deeper" layer this essay gestures at when it says a RAG setup that's come up empty "gets deeper and beyond regular RAG, you give it tools and so on, for example search tools" — retrieval finds what's already written down; tool use lets the model go get something that isn't.

*Source: Schick, T. et al. (2023), "Toolformer: Language Models Can Teach Themselves to Use Tools," Advances in Neural Information Processing Systems 36 (NeurIPS).*

### 🔗 Related Concepts
- [[rag|The Simpler Retrieval This Extends]]
- [[ai-agent|Where Chained Tool Calls Become an Agent Loop]]
