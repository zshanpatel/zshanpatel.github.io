---
title: Context Window
name: context-window
description: Everything a language model can see at once during a turn — the working memory that holds your prompt, the conversation so far, retrieved documents and tool outputs. Nothing outside it exists for the model.
aliases:
  - context size
  - token limit
tags:
  - term
human-reviewed: false
---
> The model knows exactly one thing: whatever is currently on its desk.

The context window is the span of text a model can attend to in a single pass, measured in tokens — roughly word fragments — and it functions as the machine's entire working memory. Your prompt sits in it, alongside the system instructions, the whole prior conversation, any documents you pasted or a retrieval system fetched, and every output a tool returned mid-task. When people say a model "sees" something, they mean it entered this window; when a session ends, the window empties, which is why chat assistants feel like they have amnesia and why anything worth keeping has to be written down somewhere else.

Two properties shape everything built on top of it. First, space is finite and billed by the token, so stuffing the window is not free: bloated prompts cost money directly and quality indirectly. Second, attention is not uniform across the span — models reason best over what sits at the beginning and end, and measurably worse over material buried in the middle, so more context is not automatically better context. These two facts are the entire economic case for [[Lexicon/context-architecture|context architecture]]: curate what enters, keep the important stuff near the edges, and persist the rest to files rather than hoping the window remembers.

*Source: Liu, N.F. et al. (2023), "Lost in the Middle: How Language Models Use Long Contexts," Transactions of the Association for Computational Linguistics.*

### 🔗 Related Concepts
- [[context|The Broader Discipline This Enables]]
- [[context-architecture|Why Filling It Is Not The Goal]]
- [[long-term-memory|Where Anything Worth Keeping Goes Instead]]
