---
title: GraphRAG
name: graphrag
description: A retrieval-augmented generation variant that builds a knowledge graph of entities and their relationships from a document set first, then retrieves from that graph structure — aimed at questions a plain document-chunk search can't answer well.
aliases:
  - Graph RAG
tags:
  - term
human-reviewed: false
---
> Plain RAG finds you the right paragraph. GraphRAG tries to find you the right relationship between ten paragraphs it never would have grouped on its own.

Standard [[rag|RAG]] retrieves by similarity: it finds the chunks of text that most resemble the question and hands them to the model. That works when an answer lives in one place, but fails on questions that require connecting information scattered across many documents — "what are the main themes across this whole collection," not "what does document 12 say." GraphRAG addresses this by first extracting entities and relationships from a document set into a knowledge graph, then using that graph's structure — clusters, communities, connections — to retrieve and summarise across the whole set rather than one chunk at a time.

That's the gap this essay is pointing at with "a realtime GraphRAG that can give answers inspired by the divine" — an attempt to get connections and higher-level patterns out of a personal knowledge base, not just single-document lookups.

Microsoft's 2024 paper introducing this specific approach is a preprint, not yet peer-reviewed — worth stating plainly rather than treating it as more settled than it is.

*Source: Edge, D. et al. (2024), "From Local to Global: A Graph RAG Approach to Query-Focused Summarization," arXiv:2404.16130 (Microsoft Research) — preprint, not peer-reviewed.*

### 🔗 Related Concepts
- [[rag|The Technique This Extends]]
