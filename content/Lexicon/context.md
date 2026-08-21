---
title: Context
name: context
description: The surrounding information that determines what an utterance or passage actually means beyond its literal words. A concept with a decades-old formal apparatus in linguistics, now undergoing a second, high-stakes redefinition in AI, where a model's usable "context" is a hard, priced, engineerable resource rather than an abstract backdrop.
tags:
  - concept
human-reviewed: true
---
> The same sentence means something different depending on everything around it that isn't the sentence.

No sentence carries its full meaning on its own — "it's cold in here" is a statement of fact, a request to shut the window, or a complaint, depending entirely on who says it, to whom, and what's already been said. Linguistics formalised this in the mid-to-late 20th century as pragmatics: the study of meaning that depends on context rather than word definitions alone, treating a conversation as a shared, evolving model of what's already known and what question is currently on the table.

AI systems have forced a second, much more literal redefinition of the same word. A language model's "context" is no longer just a backdrop for interpretation — it's a fixed, finite, priced resource: the actual span of text the model can attend to when generating a response, measured in tokens and directly limiting how much a system can "know" at once without external help. This gave rise to retrieval-augmented generation ([[Lexicon/rag|RAG]]), which fetches only the most relevant material into that limited window at answer-time rather than trying to cram everything in, and more recently to "context engineering" — a still-informal, not-yet-peer-reviewed industry term for the emerging discipline of deliberately curating what goes into that limited window, distinct from prompt engineering's narrower focus on instruction wording.

The AI-era version inherits the older problem in a sharper form: pragmatics always assumed a listener could draw on effectively unlimited shared background knowledge; a language model can only draw on what's inside its context window (or what retrieval fetches into it), which is why the same model can reason well about something explicitly provided and badly about something it "should" know but wasn't given room to hold onto.

*Source: Schiffrin, D. (ed.) (1984). Meaning, Form, and Use in Context: Linguistic Applications. Georgetown University Press. Gao, Y. et al. (2023). "Retrieval-Augmented Generation for Large Language Models: A Survey." arXiv:2312.10997. "Context engineering" itself is an informal, industry-coined term (practitioner blog posts and talks, no peer-reviewed literature yet) — flagged honestly rather than dressed up.*

### 🔗 Related Concepts
- [[Lexicon/hermeneutics|hermeneutics]]
- [[Lexicon/rag|RAG]]
- [[Lexicon/llm|LLM]]
