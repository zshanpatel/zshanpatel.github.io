---
title: Human-in-the-Loop
name: human-in-the-loop
description: A system design principle where a person reviews, corrects, or approves an AI system's outputs during its operation, rather than letting it act fully autonomously — a specific engineering pattern for keeping human judgment in the decision path.
aliases:
  - HITL
tags:
  - term
human-reviewed: false
---
> Not full automation and not full manual work — a designed seam where a person still gets to look before the system acts, or corrects it after.

Human-in-the-loop (HITL) is a specific term of art in interactive machine learning, not just a description of "people using AI." It refers to systems deliberately architected so a human's feedback, correction, or approval is part of the operating loop — training the model, gating its outputs, or both — rather than the system running fully autonomously end to end.

Saleema Amershi and colleagues' widely-cited 2014 survey frames this as a tight coupling between system and user: end-users don't just consume outputs, they shape the model's behaviour through ongoing interaction, catching errors and steering the system in ways a fully automated pipeline would simply propagate.

Whether "human-in-the-loop" survives as a real design constraint or becomes a hollow phrase covering rubber-stamp approval is a live question — see [[Lexicon/agency|Agency]] for why who is actually supervising whom is the more fundamental question underneath the technical pattern.

*Source: Amershi, S., Cakmak, M., Knox, W.B., & Kulesza, T. (2014), "Power to the People: The Role of Humans in Interactive Machine Learning," AI Magazine, 35(4), 105–120.*

### 🔗 Related Concepts
- [[agency|Who Is Actually Supervising Whom]]
- [[ai-agent|The System Being Kept in Check]]
- [[npc|The Failure Mode When the Loop Is Hollow]]
