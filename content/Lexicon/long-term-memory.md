---
title: Long-Term Memory (AI)
name: long-term-memory
description: The ability of an AI system to retain and recall information across sessions rather than starting fresh every conversation — implemented through external storage the model retrieves from, not through the model itself "remembering."
aliases:
  - AI memory
  - persistent memory
tags:
  - term
human-reviewed: false
---
> The model doesn't remember you — a separate system does, and feeds the model your history back in as if it just happened.

An LLM's actual memory is its context window — everything typed in the current conversation — and nothing else; once that conversation ends, the model has no access to it again. "Long-term memory" is the name for the workaround: an external system that stores information from past interactions and retrieves the relevant pieces back into the model's context when needed, so the conversation feels continuous even though the underlying model has no persistent state of its own.

Lewis et al.'s 2020 retrieval-augmented generation (RAG) paper established the general mechanism — retrieving relevant documents from an external store and feeding them into the model's prompt rather than expecting the model to have memorized everything. Packer et al.'s 2023 MemGPT paper applied the same idea specifically to memory: managing what a model "remembers" the way an operating system manages RAM and disk, moving information between a small active context and a much larger long-term store as needed. This is the actual mechanism behind the "long-term memory" this essay lists as one of local AI's real advantages over a bare chat interface — not a smarter model, but a better-designed system around it.

*Source: Lewis, P. et al. (2020), "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks," Advances in Neural Information Processing Systems 33 (NeurIPS); Packer, C. et al. (2023), "MemGPT: Towards LLMs as Operating Systems," arXiv:2310.08560.*

### 🔗 Related Concepts
- [[llm|The System Being Given Memory]]
- [[ai-agent|Where Persistent Memory Matters Most]]
