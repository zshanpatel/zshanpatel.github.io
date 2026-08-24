---
title: Knowledgebase has New Meaning
name: rag
description: Notes from building a personal second brain setup, and the wall of secular western bias baked into models.
permalink: /essays/rag
tags:
  - digital-transformation
aliases:
showDate: true
draft: false
llmsTxt: true
date: 2024-03-31
---
![[raghead-image.png]]

[[Lexicon/knowledge-base|A knowledgebase]] is a body of information that can give AI a digital brain. Not a mind, as I found out. It gives the model more material to search through. I was trying to see whether AI could move beyond retrieval.

My goal was to build one that could produce strategic output from a body of knowledge shaped by [[Lexicon/secular|non-secular assumptions]], not a [[Lexicon/chatbot|chatbot]] that could fetch information. 
 
In tech, a knowledgebase is usually treated as documentation, stored information: documents, records, user IDs, passwords, notes, files, structured data, and other details. For my naive self, knowledgebase meant connecting information to build patterns that are genuinely insightful and higher level.

So, I made a basic knowledge-base-scrambled-eggs for myself to test it out. 

![GraphRag-image.png](GraphRag-image.png)
*My attempt to create a realtime [[Lexicon/graphrag|GraphRAG]] that can give answers inspired by the divine. Source: self*

But I had to keep preempting what I wanted the agent to do. It can't be random and I can't expect the AI to connect semantics that I want it to connect. The algorithm can stack words and connect patterns within its [[Lexicon/parameters|parameters]]. What it cannot do is originate thought: the kind of insight I was looking for, what I call [[Lexicon/intrinsic-epistemic|divine insight]]. 

The industry solution is what is called a [[Lexicon/rag|RAG]] or Retrieval-Augmented Generation. It is a topic of its own. Basically, you can [[Lexicon/long-term-memory|build up your AI's memory]] and then exchange and even add information. You can use it for basic functions like fetching relevant information from documents, or feeding instructions to perform functions based on context you've provided.

My experiments all ended with the free tiers of [[Lexicon/gpt|GPT's]] [OpenRouter](https://openrouter.ai/), [Groq](https://groq.com/), [Gemini 2.5 Pro and Flash](https://gemini.google.com/app) models. [Qwen's API](https://qwen.ai/apiplatform) needed my card even though they claimed a free tier. Broadening the [[context]] is what I was struggling with. Like if you build a bot for appointment setting, it can only do that in intelligent ways, know what service requires how much time and not block time against an already set appointment, etc. You give it more functionality, like email access and your daily task notes, and it will work within those boundaries. You can program it to do those exact operational functions. 

## RAG (Retrieval-Augmented Generation) 
RAG, or Retrieval-Augmented Generation, is the industry answer to this problem. Instead of asking a model to answer from memory, you give it access to your own documents. It retrieves the most relevant pieces, then uses them to answer.

This works well for operational tasks. Appointment setting. Document search. Customer support. Internal FAQs. Anything where the answer already exists somewhere and the model only has to find it.

Strategic insight is different.

A model can retrieve the right paragraph and still misunderstand the worldview behind it. It can quote the source and miss the frame. It can connect words without understanding why those words belong together.

For a RAG to work strategically within a given academic context, it will either come back empty handed or [[Lexicon/hallucination|hallucinate]] on its own. Then it gets deeper and beyond regular RAG, you give it [[Lexicon/tool-use|tools]] and so on, for example search tools. 

The model could search my material, summarise it, and arrange it into something that looked intelligent. But it still defaulted toward the assumptions it had absorbed from the wider internet: secular, [[Lexicon/colonial-epistemology|Western-European, institutionally approved ways of thinking]].

Inputting a different body of knowledge, divinely sourced in my case, does not automatically produce a different intelligence. More precisely, it does not automatically produce output from a different epistemic frame.

The LLMs are built with these typical limitations in their training: Western-European frameworks, data that dominate institutions and one-sided analytical thinking. I've been trying to get AI to stop defaulting to certain perspectives, to align with specific lines of academic thinking, but there's bias baked in. There are [[Lexicon/uncensored-models|uncensored models]] though, which are fun to experiment with, but they will fry my [[Lexicon/gpu|GPU]].

Although I found this to be an evolving space, with the evolution of GraphRAG and other hybrids this remains an interesting space to watch. And this will have more utilities to come, example [Google's NotebookLM](https://notebooklm.google/). I made one for myself and tested it but I could not produce a divinely-oriented non-secular output because of [LLM bias](https://arxiv.org/html/2411.10915v1). 
![[rag-image.png]]

_Different parameters, components, and models in a simple RAG application. Source: [Gradient Flow](https://gradientflow.com/techniques-challenges-and-future-of-augmented-language-models/)_

---
2026 Update: I now operate from an [[Lexicon/obsidian|Obsidian]] vault with multiple levels of knowledge systems baked in one place. We were building it. And in 2026, it was validated by [Karpathy's wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). In 2024, I was trying to make RAG produce divine insight. In 2026, I understand the problem differently.

I am now building a foundational first layer, and building the frame around it: [[Lexicon/taxonomy|the taxonomy]], [[Lexicon/canon|the canon]], [[Lexicon/hermeneutics|rules of interpretation]], and the refusal to let the model flatten everything back into secular consensus, which it has failed to do consistently.
