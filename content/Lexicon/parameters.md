---
title: Parameters (AI Model)
name: parameters
description: The internal numeric values a neural network adjusts during training — its actual learned "knowledge," in the sense that everything a model can do is encoded as settings on these numbers, nowhere else.
aliases:
  - model parameters
  - weights
tags:
  - term
human-reviewed: false
---
> Not lines of code the model follows — millions or billions of dials, each nudged slightly during training until the whole set of them, together, produces useful output.

A neural network doesn't contain rules in the way a traditional program does. It contains parameters — numbers (also called weights) attached to the connections between its artificial neurons — and training is the process of adjusting those numbers, repeatedly, until the network's output gets closer to what's wanted. Nothing about how the model behaves is written down anywhere else; the parameters are the model. A foundational 1989 result showed why this works at all: a network with enough of these adjustable parameters can, in principle, approximate any reasonably well-behaved function, which is the theoretical basis for why scaling up parameter count reliably makes models more capable.

That's the literal mechanism behind this essay's observation that "the algorithm can stack words and connect patterns within its parameters" — the model isn't reasoning about the text in any deliberate sense, it's running input through a fixed set of learned numbers and reading off what comes out.

*Source: Hornik, K., Stinchcombe, M. & White, H. (1989), "Multilayer feedforward networks are universal approximators," Neural Networks, 2(5), 359–366.*

### 🔗 Related Concepts
- [[llm|The Kind of Model Built From Parameters at Scale]]
- [[gpt|A Specific Model Whose Parameter Count Was Scaled Up Repeatedly]]
