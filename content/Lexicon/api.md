---
title: API (Application Programming Interface)
name: api
description: A defined interface that lets one piece of software use another's functionality without needing to know how it's built internally — the mechanism that lets an app "call" ChatGPT or Claude over the internet instead of running the model itself.
aliases:
  - Application Programming Interface
tags:
  - term
human-reviewed: true
---
> You don't need to know how the engine works — only which lever does what, and what it hands back when you pull it.

The principle behind an API is older than the term's current usage. David Parnas' 1972 paper on module specification made the formal case for why: a system built from modules that only expose what other modules need to know, and hide everything else, is easier to change, easier to trust, and easier to reason about than one where every part depends on every other part's internal details. An API is that principle made concrete — a defined, documented boundary across which one piece of software can ask another to do work without needing to understand, or be able to change, what's happening on the other side.

For AI specifically, the API is what makes "using a model" different from "running a model." Calling ChatGPT or Claude's API sends a prompt to someone else's servers and gets a response back — no download, no [[Lexicon/gpu|GPU]], no local [[Lexicon/compute|compute]] cost, but also no visibility into what happens to that prompt once it leaves your machine. That trade-off — convenience and low hardware cost against a total loss of visibility — is the real choice this essay is describing between running a model locally and calling one through an API.

*Source: Parnas, D.L. (1972), "A Technique for Software Module Specification with Examples," Communications of the ACM, 15(5), 330–336.*

### 🔗 Related Concepts
- [[open-source|The Alternative: Running It Yourself]]
- [[surveillance-capitalism|What Crosses That Boundary When You Don't]]
