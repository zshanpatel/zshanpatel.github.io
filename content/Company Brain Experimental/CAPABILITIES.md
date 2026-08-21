---
title: System Capabilities & Superpowers
description: Master Registry of high-performance tools, CLIs, and skills.
type: agent-memory
tags: [capabilities, clis, skills, mcp, infrastructure, agent-context]
last-updated: 2026-08-20
---

# System Capabilities & Superpowers

This file is the Master Registry of all high-performance tools, integrations, and specialised skills available to your AI assistant. It makes the invisible capabilities of the system visible, ensuring the AI can leverage its full range.

---

## ⚡ Integrated CLIs & Environments (The "Hands")

The AI has access to the following command-line tools or client execution APIs in this environment:

### 1. Terminal / Shell Access
* **Strategic Intent**: File operations, folder structures, and script execution.
* **Status**: *[Enabled / Disabled / Read-Only]*

### 2. Web & Research Fetch
* **Strategic Intent**: Connecting to APIs, downloading raw markdown documentation, and scraping research links.
* **Status**: *[Enabled / Disabled]*

---

## 🧩 Active Skills (Procedural Workflows)

Specialised multi-step procedures stored in `/SKILLS`. The AI reads the corresponding skill file before starting any of these tasks:

* **System Audit** ([sys-audit.md](SKILLS/sys-audit.md)): Diagnostic review of current knowledge storage and decision-making bottlenecks.
* **Decision Log** ([decision-log.md](SKILLS/decision-log.md)): Framework for recording context, options, and rationale for major decisions.
* **Weekly Review** ([weekly-review.md](SKILLS/weekly-review.md)): Structural check-in to clear mental clutter, review goals, and set the next week's priorities.
* **Tool Manager** ([tool-manager.md](SKILLS/tool-manager.md)): Structured assistant workflow to look up, install, configure, and record new tools.

---

## Changelog

### 2026-08-20 — Added Tool Manager Skill
- Added the `tool-manager.md` skill workflow to enable interactive environment audits and tool installation.
- Cleaned and generalised `TOOLS.md` and `CAPABILITIES.md` to serve as clean starter templates.
