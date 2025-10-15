---
title: What is Artificial Intelligence
tags:
  - open-source
  - MVP
  - AI-agents
  - RAG
  - digital-transformation
aliases:
showDate: true
draft: false
---
![[ai-brain.png]]
A prediction by a San Francisco tech guy caught my attention recently. He broadly said:

>_AI creates a new class divide: those who know how to orchestrate agents vs those who get orchestrated by them. Middle managers don't disappear, they become agent supervisors. This starts in tech jobs and moves beyond that._
### ⁠We're at Peak AI
Let me explain.

What I mean by peak AI: the bubble is artificially inflated, driven by institutional players and financial instruments. Just like the dot com bubble, or the 2008 financial crisis, or the 2020 pandemic. We're already living in what looks like the much hyped [Artificial General Intelligence (AGI)](https://en.wikipedia.org/wiki/Artificial_general_intelligence). This is it. 

AI makes things easy, sure, but it shouldn't be made into God. In the end, it's prediction tech. Period.

I also say that because I see overflowing tangents of AI in cryptocurrency there somewhere as well. 

I think we're at the peak of the AI bubble, just like the [memecoin-casino hype-cycle](01-how-to-trade.md) back in December 2024. Which as I am writing this in October 2025, is back again. People never learn.

![[memecoin.png]]
_Total memecoin market capitalisation. Source: [CoinMarketCap](https://coinmarketcap.com/charts/)_

All the fields and their experts will recognise that using AI as a tool is as necessary as using Google to search. Those who use this tech will cut their work in half and eventually become humans in the loop: supervising, iterating, approving and disapproving decisions made by AI agents.

I’ve been messing about with AI use cases for the past couple of months.  
### What I've Been Building

#### 1. Local AI:
You can download  [Large Language Models (LLMs)](https://medium.com/data-science-at-microsoft/how-large-language-models-work-91c362f5b78f) on your computer and use them without the internet, if you want. I've been playing with [open source models](https://klu.ai/blog/open-source-llm-models). Some I downloaded locally (which basically means on my computer) from [ollama](https://ollama.com), some through [Application Programming Interface (API)](https://www.forbes.com/sites/adrianbridgwater/2022/10/24/why-we-need-apis-and-apis-need-us-too/). It took me a while to familiarise myself with the setup and different models.

They're not quite the [ChatGPT](https://www.chatgpt.com) experience yet, mostly because of the [LLM's](https://medium.com/data-science-at-microsoft/how-large-language-models-work-91c362f5b78f) size and your system's memory. But there's massive scope for personalisation: integrations with other software, long-term memory, and most importantly, they're free and private. Fast-forward to what is becoming valuable in the AI world: your data. Yes. They are using it and you are not protected or getting paid for it.

The catch? You need a lot of compute power for a good enough model. [Ollama's](https://ollama.com) local models almost destroyed my [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit). While [DeepSeek](https://chat.deepseek.com/a/chat/s/d13915d7-ee87-46c1-b4d5-76f2482da9ff) and [Qwen's](https://chat.qwen.ai/) smaller models were amazingly [open source](https://en.wikipedia.org/wiki/Open_source) and performed all functions that [ChatGPT](https://www.chatgpt.com) or [Claude](https://claude.ai/) could, the smaller local models couldn't handle the coding development work I needed.
#### 2. ⁠⁠Automation: 
This is the most hyped AI product: automating processes using AI. A lot of AI agencies are selling these apart from chatbots: personal assistants, lead generation, email management, calendar scheduling.

![[n8n.png]]
_Source: [n8n](https://n8n.io/)_

I set up a few automations for myself but I'm yet to close in on what I actually need agents for. And it seems like every day there are new AI agents with more advanced functionalities. Very interesting and entertaining space. 

I would compare this to graphic design tools in the 90s or social media management in the 2000s. While these tools were all the rage, the real value remained at the macro-strategy level.

Anyway, I bet most influencers, are making more from their [Skool](https://www.skool.com/) communities than actually selling these agents. But there's still scope for specialisation.
#### 3. RAG (Retrieval-Augmented Generation): 
This is a topic of its own. Basically, you can build up your AI's memory and then exchange and even add information. You can use it for basic functions like fetching relevant information from documents, or feeding instructions to perform functions based on context you've provided.

![[RAG.png]]
_Different parameters, components, and models in a simple RAG application. Source: [Gradient Flow](https://gradientflow.com/techniques-challenges-and-future-of-augmented-language-models/)_

I made a basic one for myself to test out. My experiments all ended with the free tiers of [GPT's](https://en.wikipedia.org/wiki/Generative_pre-trained_transformer) [OpenRouter](https://openrouter.ai/), [Groq](https://groq.com/), [Gemini 2.5 Pro and Flash](https://gemini.google.com/app) models. [Qwen's API](https://qwen.ai/apiplatform) needed my card even though they claimed a free tier. Broadening the [context](AI%20and%20I/00-why-prompts.md) is what I'm struggling with. Like if you build a bot for appointment setting, it can only do that in intelligent ways. You give it more functionalities and it will work within those boundaries. You can program it to do those exact operational functions. 

My goal was to make it give me strategic outputs.

But I have to preempt what I tell the agent to do. It can't be random and I can't expect the AI to know what I want. For RAG to work strategically within a given academic context, it will either come back empty handed or hallucinate on its own. Then it gets deeper and beyond regular RAG, you give it tools and so on, for example search tools. 

The LLMs I find are built with these typical limitations: Western-European frameworks that dominate higher-level institutions and analytical thinking. I've been trying to get AI to stop defaulting to certain perspectives, to align with specific lines of academic thinking, but there's bias baked in. There are uncensored models though, which are fun to experiment with but they will fry my [GPU](https://en.wikipedia.org/wiki/Graphics_processing_unit).

Although I found this to be an evolving space, with the evolution of [GraphRAG](https://medium.com/@zilliz_learn/graphrag-explained-enhancing-rag-with-knowledge-graphs-3312065f99e1) and other hybrids this remains an interesting space to watch. And this will have more utilities to come, example [Google's NotebookLM](https://notebooklm.google/). I made one for myself and tested it but I could not produce a divinely-oriented non-secular output because of [LLM bias](https://arxiv.org/html/2411.10915v1). 

![[GraphRag-image.png]]
_My attempt to create a realtime GraphRAG that can give answers inspired by the divine. Source: self_
#### 4. Open-source Versus Closed Source: 
This is one of those spaces I keep going down the rabbit hole of. Basically: zero ads, forget paying for software, decentralised social media. I think this is the direction we're moving in or at least I hope we do or we will be forced to. Obviously not anytime soon because [monopolies like private OpenAI](https://hackernoon.com/breaking-big-techs-ai-monopoly-requires-decentralized-cross-chain-rails) will find ways to distract and keep the sheep in the present status quo. But it's inevitable. 

![[awesome-selfhosted.png]]
_Source: [awesome-selfhosted repo](https://github.com/awesome-selfhosted/awesome-selfhosted)_

Especially for people like us who don't want to pay $200 to [OpenAI](https://chatgpt.com/pricing) for using their tech. Every software you can imagine has an open source [GitHub](https://github.com/btw-so/open-source-alternatives) repository you can clone. You need some technical expertise, but if you have the testicular tenacity, you can [vibe code](https://en.wikipedia.org/wiki/Vibe_coding) your way to write code, or feed it the code and ask what it means, edit, iterate, copy and paste. You have been warned.

I found myself doing this way too much. It's time-energy-consuming. It's more important to actually spend that time on what you're trying to achieve instead of trying out different stuff and going down the rabbit hole of figuring out the code. Too many times I kept finding myself trying to sort out small issues instead of building an overall [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product).
### The Real Problem: Too Many Unfinished Projects
So many projects started and never completed. Maybe I underestimated the project. Maybe I overestimated my skills and available resources. Or didn't understand the stack enough before starting. There's a fear of actually finishing something, you know?
### What Actually Sells
The intelligent chatbot is actually the easiest and most sold product. It takes some back and forth with the client to understand what the customer is looking for, but programming a simple meeting scheduler or AI assistant is not the hard part. The challenge is building the appropriate knowledge base and user experience. If someone wants to buy for their business, it can be built.

What we need to do first is create 'ecosystems'. That is an offering.
#### Strategic Thinking
We must start by asking: what is valuable to my business that I need? Then create it. The cut-paste solutions of just automation crafts are just tools. Showing a demo of an ecosystem, now that's a working use case.

Example of an automation: a social media agent that emails you content it's going to post for you. You reply "approved" and it's done, on all your platforms. Or reply with "make these changes" and it sends back revised content.

Example of an ecosystem: builds a business solution that uses multiple digital avenues to transform outputs for business. Here the focus is on evolving technology. Build versus buy. Evolving tech like real-time data use. 
Basically, for businesses, return on investment, efficiency and ease of use and user interface that will matter eventually.
### Where We Are Now
Creating AI Agents or "digital workers." These are software applications designed to do tasks and share the workload. For example, that social media agent I mentioned. Once set up, all you need to do is approve the content. Like an agency model, understanding the basics of how you can use AI and keep selling it. The next step would be to create a [SaaS](https://en.wikipedia.org/wiki/Software_as_a_service).

Models have almost plateaued with slightly better efficiency than the last wave of AI-models.

The gap is closing fast. While with some AI, you can't even tell anymore. The intelligent use of AI as a tool, that's what separates those who orchestrate from those who get orchestrated.

The big LLM companies continue dominating the game. Now it's open season for low to no budget builders. But are the builders the farmers or are they being farmed? 