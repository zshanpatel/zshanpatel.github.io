---
title: MCP (Model Context Protocol)
name: mcp
description: An open standard, announced by Anthropic in late 2024, that lets AI assistants connect to external tools through prebuilt servers. The 2026 correction found it powerful but token-hungry, and right-sized it.
aliases:
  - Model Context Protocol
  - connectors
tags:
  - term
human-reviewed: false
---
> Every tool speaks a different dialect. MCP tried to be the one socket everything plugs into.

The Model Context Protocol is an open standard for connecting AI assistants to external tools and data: instead of hand-wiring each integration, a developer runs a small server that exposes named tools with typed parameters, and any compliant assistant can discover and call them. Anthropic framed it as a USB-C port for AI applications when they announced it in November 2024. Through 2025 it became the default answer to the question of how agents should reach calendars, databases and browsers, gaining an [[Lexicon/oauth|OAuth]] authorisation specification along the way.

Every tool definition, description and parameter schema loads into the model's [[context-window|context window]] on every turn, so a few connected servers can burn tens of thousands of tokens before a single question is asked — practitioners took to calling this JSON bureaucracy. Benchmarks in early 2026 put equivalent CLI workflows at 10 to 32 times cheaper per task with higher reliability, and even MCP's strongest advocates now position it where it genuinely wins — governance, credential isolation and audit trails for fleets of agents serving departments. For one person's assistant, the terminal plus skills usually beats the plug.

*Source: Anthropic (2024), "Introducing the Model Context Protocol," anthropic.com/news/model-context-protocol.*

### 🔗 Related Concepts
- [[api|The Older Boundary It Formalises]]
- [[terminal|The Rival Interface That Undercut It]]
- [[tool-use|The Underlying Ability]]
