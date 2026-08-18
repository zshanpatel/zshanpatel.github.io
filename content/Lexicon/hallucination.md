---
title: Hallucination (AI)
name: hallucination
description: An AI model producing output that is fluent and confident but factually wrong or unsupported by its sources — not a bug that occasionally fires, but a structural consequence of how these models generate text.
aliases:
  - AI hallucination
tags:
  - term
human-reviewed: false
---
> The model isn't lying — it's finishing the sentence the way it statistically expects a sentence like this to finish, whether or not that happens to be true.

A language model generates text by predicting the next most likely word given everything before it, not by checking a fact against a ground truth. Most of the time those two things line up. When they don't — when a question has no good answer in the model's training data or retrieved context, or when a plausible-sounding continuation exists regardless of truth — the model still produces a confident, well-formed answer, because fluency was never coupled to accuracy in the first place.

This is the specific failure this essay names directly: a RAG system given a genuinely obscure or off-mainstream question "will either come back empty handed or hallucinate on its own," inventing a citation or a claim that reads as authoritative but isn't grounded in anything it actually retrieved.

*Source: Ji, Z. et al. (2023), "Survey of Hallucination in Natural Language Generation," ACM Computing Surveys, 55(12), Article 248.*

### 🔗 Related Concepts
- [[rag|The Technique That Reduces, But Doesn't Eliminate, This]]
- [[llm|The System Where This Originates]]
