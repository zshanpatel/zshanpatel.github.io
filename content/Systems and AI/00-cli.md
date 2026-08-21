---
title: Command Anything
name: command-anything
description: The command line is the original language of computers and models speak it natively. CLI use accelerates how agents trade.
type: context
series: The Foundations
order: 4
tags:
  - systems-and-ai
  - cli
showDate: false
draft: false
---
> An AI chatbox, combined with a [[04 Blog Content/Systems and AI/00-skills|skill]], can speak to your [[Lexicon/terminal|terminal]] and touch anything. It works beautifully.

Watch what happens in a normal AI conversation. You find the file. You open it, copy the text, paste it in. The model works. You copy the result out, paste it somewhere else, rename it, file it, send it. The thinking took seconds. Everything around the thinking took twenty minutes, and you did all of it. In a chat, you are the hands. The model advises; you execute.

The strange part is that the fix has been sitting under our fingers the whole time. The command line interface (CLI) is the oldest control surface computing has: typed instructions operating files, folders and programs directly, running Unix machines since the 1970s. Half a century of terminal usage became training data. A model does not need to be taught what `grep` (search), `git` (version control) or `cat` (read files) do. These small single-purpose functions carry most of the actual computing work, and it has read every manual, forum thread and shell script ever written around them. The original language of computers is the one your AI already speaks fluently, at zero setup cost.

For years nobody connected those two facts. From 2022 onward we ran a relay race between windows, copying context out of files and pasting answers back, burning tokens on logistics instead of thinking. Then came connectors built on [[Lexicon/mcp|MCP]], a standard promising prebuilt plugs between assistants and tools, and for one shining moment it looked like the answer. Then the bill arrived. Every tool definition, name, description and parameter schema loads into the [[Lexicon/context-window|context window]] on every turn. Wire up a few servers and you have spent tens of thousands of tokens before asking a single question. 

The turn came in January 2026. Peter Steinberger, whose [[Lexicon/openclaw|OpenClaw]] agent hit 190,000 GitHub stars in weeks, [posted seven words](https://www.firecrawl.dev/blog/mcp-vs-cli): "mcp were a mistake. bash is better." He then built MCPorter, a tool that converts MCP servers into CLIs, and OpenAI hired him to work on personal [[Lexicon/ai-agent|agents]]. Andrej Karpathy put the deeper reason plainly: CLIs are exciting precisely because they are legacy technology, which means agents can already use them, combine them, chain them through the entire terminal toolkit. The benchmarks agree. One [75 run comparison](https://www.scalekit.com/blog/mcp-vs-cli-use) found CLI tasks cost 10 to 32 times fewer tokens than equivalent MCP calls, with higher reliability.

But raw terminal access alone is just fast hands. The magic is the combination: a CLI executes, a [[04 Blog Content/Systems and AI/00-skills|skill]] decides. The skill file carries taste, defaults and procedure in a few hundred tokens; the terminal carries out the work. That pairing is how one command drives an entire [[Lexicon/obsidian|Obsidian]] vault, or a Google Workspace (`gws`) invocation reads your calendar, drafts the email and files the doc, all without a single schema being loaded first. Projects like [CLI-Anything](https://github.com/HKUDS/CLI-Anything) push the logic to its end: if software has a [[Lexicon/gui|GUI]] or an [[Lexicon/api|API]], generate it an agent-native CLI, ship it with a skill file, and any assistant can drive it ([the paper](https://arxiv.org/html/2606.03854v1) calls this agent-native computer use).

None of this kills MCP. It right-sizes it: [[Lexicon/oauth|OAuth]], audit trails and scoped permissions still matter when fifty agents serve a department. For everything you personally run, the terminal plus a folder of skills is lighter, cheaper and already understood.

Reach deserves respect. Access cuts both ways, so start narrow: one folder, tasks that mostly read, a [[Lexicon/human-in-the-loop|human]] confirming anything that deletes, moves or sends.

Hands turn an advisor into a worker. A terminal turns a worker into infrastructure.

## Go Deeper

- **Next rung**: [[04 Blog Content/Systems and AI/00-ai-os|Your AI Operating System]] is what a terminal plus a folder of skills becomes once you keep assembling.
- **See it applied**: [[16-proposal-processor|The Proposal Processor]] runs entirely on this pairing.
- **Outside the vault**: [Anthropic on Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), the [CLI-Anything hub](https://clianything.cc), and [a decision framework](https://manveerc.substack.com/p/mcp-vs-cli-ai-agents) for the rare cases where MCP still earns its keep.
- **GitHub shelves**: [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) generates agent-native CLIs for any software; [cli/cli](https://github.com/cli/cli), GitHub's own `gh`, is the model citizen every agent already knows.
