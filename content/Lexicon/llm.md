---
title: Large Language Model (LLM)
name: llm
description: A neural network trained on massive text corpora to predict the next word in a sequence, whose scale in parameters and training data produces fluent, general-purpose language ability — the technology underneath ChatGPT, Claude, and every local model run through Ollama.
aliases:
  - LLMs
  - large language models
tags:
  - term
human-reviewed: false
---
> A very large next-word predictor, trained on enough text that the prediction starts looking like understanding.

Most people meet an LLM through a chat window and never see the mechanism underneath. What they're talking to is a specific kind of neural network — a Transformer — trained to do one narrow thing extremely well: given everything written so far, predict the next token. Scaled up far enough, that narrow task produces something that can hold a conversation, write code, and pass exams.

The architecture that made this possible is comparatively recent. Vaswani et al.'s 2017 paper introduced the Transformer, replacing the sequential processing of earlier language models with an attention mechanism that lets a model weigh every word against every other word at once — the change that made training on internet-scale text computationally feasible. Three years later, Brown et al.'s GPT-3 paper showed what happens when you scale that architecture up by orders of magnitude: a single model that could perform tasks it was never explicitly trained on, just from patterns in its training data. That paper is where "large language model" stopped being a research curiosity and became a product category — the ChatGPTs, Claudes, and downloadable Ollama models that followed are all descendants of the same recipe: bigger architecture, more data, more [[Lexicon/compute|compute]].

*Source: Vaswani, A. et al. (2017), "Attention Is All You Need," Advances in Neural Information Processing Systems 30 (NeurIPS); Brown, T.B. et al. (2020), "Language Models are Few-Shot Learners," Advances in Neural Information Processing Systems 33 (NeurIPS).*

### 🔗 Related Concepts
- [[predictive-technology|The Statistical Mechanism Underneath]]
- [[compute|What Training and Running One Actually Costs]]
- [[gpu|The Hardware That Makes It Possible]]
- [[open-source|Why Some LLMs Can Be Downloaded and Run Locally]]
