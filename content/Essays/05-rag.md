---
title: Knowledgebase has New Meaning
tags:
  - RAG
  - digital-transformation
aliases:
showDate: true
draft: false
---
![[raghead-image.png]]
## RAG or Retrieval-Augmented Generation 

This is a topic of its own. Basically, you can build up your AI's memory and then exchange and even add information. You can use it for basic functions like fetching relevant information from documents, or feeding instructions to perform functions based on context you've provided.

![[09 Toolkit/Images/rag-image.png]]

_Different parameters, components, and models in a simple RAG application. Source: [Gradient Flow](https://gradientflow.com/techniques-challenges-and-future-of-augmented-language-models/)_

I made a basic one for myself to test out. My experiments all ended with the free tiers of [GPT's](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer) [OpenRouter](https://openrouter.ai/), [Groq](https://groq.com/), [Gemini 2.5 Pro and Flash](https://gemini.google.com/app) models. [Qwen's API](https://qwen.ai/apiplatform) needed my card even though they claimed a free tier. Broadening the [context](00-context.md) is what I'm struggling with. Like if you build a bot for appointment setting, it can only do that in intelligent ways. You give it more functionalities and it will work within those boundaries. You can program it to do those exact operational functions. 

My goal was to make it give me strategic outputs.

![GraphRag-image.png](GraphRag-image.png)
*My attempt to create a realtime GraphRAG that can give answers inspired by the divine. Source: self*

But I have to preempt what I tell the agent to do. It can't be random and I can't expect the AI to know what I want. For RAG to work strategically within a given academic context, it will either come back empty handed or hallucinate on its own. Then it gets deeper and beyond regular RAG, you give it tools and so on, for example search tools. 

The LLMs I find are built with these typical limitations: Western-European frameworks that dominate higher-level institutions and analytical thinking. I've been trying to get AI to stop defaulting to certain perspectives, to align with specific lines of academic thinking, but there's bias baked in. There are uncensored models though, which are fun to experiment with but they will fry my [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit).

Although I found this to be an evolving space, with the evolution of [GraphRAG](https://medium.com/@zilliz_learn/graphrag-explained-enhancing-rag-with-knowledge-graphs-3312065f99e1) and other hybrids this remains an interesting space to watch. And this will have more utilities to come, example [Google's NotebookLM](https://notebooklm.google/). I made one for myself and tested it but I could not produce a divinely-oriented non-secular output because of [LLM bias](https://arxiv.org/html/2411.10915v1). 

