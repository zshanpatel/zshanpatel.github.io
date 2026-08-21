---
title: README
description: What the Company Brain starter kit is and how to use it.
type: documentation
draft: false
showDate: false
---

# Company Brain Starter Kit

Company Brain is a markdown-driven context protocol that configures any AI assistant as an operational partner. It provides structured behavioural rules, skill workflows, and prompt templates with zero infrastructure overhead.

## Quick Start

1. Copy the bootstrap prompt from `index.md` or the hosted site.
2. Paste it into your AI assistant (Claude, ChatGPT, Cursor, AI Studio, or any tool that accepts prompts).
3. Start working. The AI will guide you from there.

## File Structure

```text
Company Brain Experimental/
├── index.md                 # Entry point and bootstrap prompt
├── AGENTS.md                # AI behavioral rules and routing logic
├── PROMPTS.md               # Prompt library index
├── CONTACT.md               # Creator attribution and user template
├── CAPABILITIES.md          # AI capabilities registry template
├── TOOLS.md                 # Tool setup and active registry template
├── 10-12-*.md               # Knowledge and operational setup prompts
└── SKILLS/                  # Guided multi-step operational workflows
    ├── sys-audit.md         # Audit current knowledge and workflows
    ├── decision-log.md      # Framework for recording decisions
    ├── weekly-review.md     # Structured end-of-week review
    └── tool-manager.md      # Look up, install, and verify tools
```

## How to Customize

- **Change AI Behaviour:** Edit `AGENTS.md` to add custom rules, constraints, or tone guidelines.
- **Add New Workflows:** Create new markdown files in `SKILLS/` following the existing format.
- **Add Your Details:** Edit `CONTACT.md` with your profile and business context so your AI can reference it.

## Built by

Built by Zeeshan Patel (zshanpatel@gmail.com).

## License

Free to use and adapt. Attribution appreciated.
