---
title: OpenClaw
name: openclaw
description: The open-source personal agent that became the fastest-growing repository in GitHub history, then the year's defining security cautionary tale. Its rise, dominance and fall, all inside six months.
aliases:
  - Clawdbot
  - Moltbot
tags:
  - term
human-reviewed: false
---
> The fastest-growing repository GitHub had ever seen was one man's weekend project. Within months it was a job, a crisis, and a lesson the whole industry got to watch.

Peter Steinberger, an Austrian developer, published Clawdbot in November 2025: an orchestration harness letting a language model drive his actual machine — calendar, email, files, twenty-odd messaging platforms — from one always-on process. In January 2026 it detonated. Twenty thousand GitHub stars arrived in a single day, Anthropic sent a trademark notice over the name's resemblance to Claude, two forced rebrands followed in a week (Moltbot, then OpenClaw), scammers grabbed the abandoned handle mid-rename and floated a fake token to sixteen million dollars before it went to zero, and the attention only grew. By March it had passed 250,000 stars, faster than any project in the platform's history; people bought Mac Minis purely to host their agent, and Jensen Huang called it the most successful open-source project humanity had produced.

The fall was not a single event but a squeeze. Security researchers named a campaign, ClawHavoc, flooding its ClawHub marketplace with malicious skills: over four hundred packages and three hundred plus skills designed to steal data were identified by February. A critical vulnerability earned a formal government advisory at 9.9 out of 10 in March, tens of thousands of exposed instances were found running without authentication, and the blast radius was structural — half a million lines of code with full shell access is not a toy you leave plugged in. Steinberger, publicly burnt out — the tell, he said, was that he had stopped using his own product — left for OpenAI on Valentine's Day; the project passed to a foundation, April releases wobbled badly, and in June the press declared it dead. Weekly downloads promptly hit their peak of 4.7 million.

The residue matters more than the obituaries. OpenClaw proved ordinary people want agents with hands, proved marketplaces of capabilities get attacked like any marketplace, and proved that giving a model your whole machine without [[Lexicon/human-in-the-loop|a human confirming the irreversible steps]] is a bet most installations lose.

*Sources: Glukhov.org "OpenClaw Rise and Fall" timeline; Ruh.ai analysis of the ClawHavoc campaign; openclaw.ai, "OpenClaw Had a Rough Week" (May 2026).*

### 🔗 Related Concepts
- [[terminal|The Workshop It Handed Agents]]
- [[mcp|The Protocol Era It Overshadowed]]
- [[human-in-the-loop|The Safeguard It Skipped]]
