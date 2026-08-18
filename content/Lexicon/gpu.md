---
title: GPU (Graphics Processing Unit)
name: gpu
description: A processor built for running thousands of simple calculations in parallel rather than one complex calculation at a time — originally designed to render graphics, and now the default hardware for training and running AI models because that same parallelism happens to be exactly what neural networks need.
aliases:
  - Graphics Processing Unit
  - graphics card
tags:
  - term
human-reviewed: false
---
> Built to draw a screen full of pixels at once — which turns out to be almost exactly the same math problem as training a neural network.

A GPU wasn't built for AI. It was built to do one thing well: update millions of pixels on a screen simultaneously, which requires doing the same simple calculation many times in parallel rather than one complicated calculation in sequence. That architecture sat mostly unused by AI research until Krizhevsky, Sutskever, and Hinton's 2012 AlexNet paper showed that the same parallel structure — matrix multiplication at massive scale — is almost exactly what training a neural network requires. Their GPU-trained model beat the previous state of the art in image recognition by a wide enough margin that the field never went back to CPU training.

That single result is why "GPU" and "AI hardware" became near-synonyms, and why running a model locally is a hardware problem before it's a software one: a model too large for the GPU's memory doesn't run slowly, it doesn't run at all, or it forces the machine to improvise with slower system memory instead — which is the mechanism behind a local model straining, or outright overheating, consumer hardware never designed to carry that load.

*Source: Krizhevsky, A., Sutskever, I. & Hinton, G.E. (2012/2017), "ImageNet Classification with Deep Convolutional Neural Networks," Communications of the ACM, 60(6), 84–90.*

### 🔗 Related Concepts
- [[compute|The Resource GPUs Provide]]
- [[llm|What GPUs Are Usually Training or Running Today]]
