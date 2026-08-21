---
title: How Tools Work
name: how-tools-work
description: A model alone can only predict text. Tools let it search, calculate and act, turning a knower into a doer.
type: context
series: The Foundations
order: 3
tags:
  - systems-and-ai
  - tools
showDate: false
draft: false
---
> A model left alone can only talk about the world. A model with tools can go check.

A bare model lives with two hard limits. It knows nothing that happened after its training stopped, and it cannot do anything: it produces text describing an action, not the action. Ask it for last week's exchange rate and it either guesses from memory or admits blindness. Ask it to multiply four large numbers and it stumbles, because prediction is a poor calculator.

A tool is any capability the model can call instead of guessing. Web search for fresh facts. Code execution for exact arithmetic. An [[Lexicon/api|API]] for your calendar. A database for your real numbers. The flow is always the same: the model recognises it needs something it does not have, calls the tool, reads what comes back, and continues thinking with the result in view.

This explains a daily confusion. The same model can be useless in one window and formidable in another, and people attribute it to mood or luck. It is equipment. One session had search, code, and file access; the other had a text box. Judging models without checking their tools is like judging workers without checking their workshops.

Tool use carries its own failure mode worth knowing early: a tool's output enters the model's attention like any other text, and the model will reason confidently over garbage as readily as over gold. A bad search result becomes a confident answer. So the habit that separates careful users from burned ones is inspection: look at which tools fired and what they returned before trusting the conclusion built on them.

When the tool list includes your own file system and terminal, everything changes again. That is [[04 Blog Content/Systems and AI/00-cli|Command Anything]].

Judge any assistant by two lists: what it knows and what it can touch. The first list is frozen at training. The second grows every month, and it is where the leverage moved.

## Go Deeper

- **Where tools get fast**: [[04 Blog Content/Systems and AI/00-cli|Command Anything]], on why terminals beat protocol tax.
- **The vocabulary**: [[Lexicon/tool-use|tool use]], [[Lexicon/ui|interfaces]], [[Lexicon/compute|compute]].
- **Outside the vault**: [MCP, the standard behind connectors](https://modelcontextprotocol.io), and [Anthropic's original announcement](https://www.anthropic.com/news/model-context-protocol).
- **GitHub shelves**: [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers), the reference implementations, and [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers), the catalogue of everything built on it.
