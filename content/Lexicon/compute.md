---
title: Compute
name: compute
description: The processing power, measured in floating-point operations, GPU-hours, or training FLOPs,  required to train or run an AI model; in practice, the resource constraint that determines who can build, train, or even just run a competitive model at all.
aliases:
  - compute power
tags:
  - term
human-reviewed: true
---
> Not "how smart is the model" but "how much processing power did it take to get there" — a very different, much more countable question.

Model capability doesn't arrive for free; it's bought with compute: [[Lexicon/gpu|GPU]] time, electricity, and the infrastructure to run both at scale. Kaplan et al.'s 2020 scaling-laws study made this relationship precise: model performance improves in a predictable, near-power-law relationship with the compute, data, and parameters thrown at it. That finding turned AI progress into an economics problem as much as a research one, the frontier keeps moving because whoever has the most compute keeps buying it, not because of a periodic conceptual breakthrough.

That constraint shows up just as sharply at the small scale as at the frontier. Running an open-source model locally instead of through an API doesn't remove the compute requirement, it just relocates it, from a data center to a personal GPU that was never designed to carry that load. "You need a lot of compute power for a good enough model" is the individual-scale version of the same law that governs the trillion-dollar end of the industry.

*Source: Kaplan, J. et al. (2020), "Scaling Laws for Neural Language Models," arXiv:2001.08361.*

### 🔗 Related Concepts
- [[gpu|The Hardware Compute Actually Runs On]]
- [[llm|What Compute Is Being Spent On]]
- [[diminishing-returns|Whether More Compute Still Buys Proportional Gains]]
