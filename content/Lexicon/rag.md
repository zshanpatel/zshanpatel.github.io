---
title: RAG (Retrieval-Augmented Generation)
name: rag
description: A technique that gives a model access to an external set of documents at answer-time, so it retrieves relevant material and grounds its response in that instead of relying solely on what it memorised during training.
aliases:
  - Retrieval-Augmented Generation
tags:
  - term
human-reviewed: false
---
> Don't ask the model to remember everything — hand it the right page at the right moment and let it read from there.

A model's training data is frozen the moment training ends, and it can't cite anything it wasn't trained on. RAG works around this by splitting the job in two: a retrieval step finds the most relevant documents from an external store for a given question, and a generation step feeds those documents into the model's prompt so it answers from what's actually in front of it, not from memory alone.

That split is exactly the boundary this essay keeps running into. RAG is genuinely good at operational retrieval — appointment setting, document search, anything "where the answer already exists somewhere and the model only has to find it." What it does not do is supply a different worldview to reason from: retrieving the right paragraph and understanding the frame behind it are two different problems, and RAG only solves the first one.

*Source: Lewis, P. et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," Advances in Neural Information Processing Systems 33 (NeurIPS).*

### 🔗 Related Concepts
- [[long-term-memory|A Related Technique Built on the Same Paper]]
- [[chatbot|The Simpler Interface RAG Often Sits Behind]]
- [[hallucination|The Failure Mode RAG Only Partly Solves]]
