---
title: System Capabilities & Superpowers
description: Master Registry of high-performance tools, CLIs, and skills.
type: agent-memory
tags:
  - capabilities
  - agent-context
last-updated: 2026-08-22
---

This file is the Master Registry of all high-performance tools, integrations, and specialised skills available to your AI assistant. It makes the invisible capabilities of the system visible, ensuring the AI can leverage its full range.

---

## ⚡ Integrated CLIs & Environments

The AI has access to the following command-line tools or client execution APIs in this environment:

### 1. Terminal / Shell Access
* **Strategic Intent**: File operations, folder structures, and script execution — granted via the Desktop Commander connector on Claude Desktop. The user never touches a terminal; the AI runs commands with approval.
* **Status**: *[Enabled / Disabled / Read-Only]*

### 2. Web & Research Fetch
* **Strategic Intent**: Connecting to APIs, downloading raw markdown documentation, and scraping research links.
* **Status**: *[Enabled / Disabled]*

---

## 🧩 Active Skills (Procedural Workflows)

Specialised multi-step procedures stored in `/SKILLS`. The AI reads the corresponding skill file before starting any of these tasks:

* **System Audit** ([sys-audit.md](SKILLS/sys-audit.md)): Diagnostic review of current knowledge storage and decision-making bottlenecks.
* **Decision Log** ([decision-log.md](SKILLS/decision-log.md)): Framework for recording context, options, and rationale for major decisions.
* **AI OS Setup** ([vault-setup.md](SKILLS/vault-setup.md)): Guided bootstrap of a personal AI operating system vault (`<name>-ai-os`) — interview, blueprint, inside-out build, plus anti-rot maintenance.
* **Tool Manager** ([tool-manager.md](SKILLS/tool-manager.md)): Structured assistant workflow to look up, install, configure, and record new tools.
* **Session Protocol** ([session.md](SKILLS/session.md)): Open and close working sessions — orient from memory at the start, persist changes to `memory.md` at the end.

---

## Changelog

### 2026-08-22 — CLI Policy Clarified
- Added "CLI Requirements" to `tool-manager.md`: zero CLIs required by default (Desktop Commander uses commands built into macOS/Windows); git is the only earned exception, with agent-driven install paths verified Aug 2026 (macOS: first git command triggers Apple's Command Line Tools dialog; Windows: `winget install --id Git.Git`).
- `vault-setup.md` Step 5 now offers an optional git "safety net" — version snapshots of the new vault, driven entirely by the agent.

### 2026-08-22 — Added Session Protocol
- Added `session.md`: session-start orientation (bootstrap → user → memory → tools) and session-end persistence (update `memory.md`, prune stale entries, bump `last-updated`/`revisit` dates).
- Registered in `AGENTS.md` §3, `index.md`, `README.md`; corrected `AGENTS.md` §4 to list only the prompts that actually ship.

### 2026-08-22 — Replaced Weekly Review with AI OS Setup
- Removed `weekly-review.md` (generic end-of-week ritual with no structural role).
- Added `vault-setup.md`: bootstraps a personal `<name>-ai-os` vault in Documents — five-layer inside-out model (identity → rules → skills → agents → tools on a Wiki/memory substrate), interview → `os-blueprint.md` → confirm → build or blueprint-only paths, and an anti-rot maintenance cadence (fix-on-contact, weekly drift report, monthly revisit walk).
- Updated skill routing in `AGENTS.md`, `index.md`, and `README.md`.

### 2026-08-22 — Tool Setup Modernised
- Rewrote `tool-manager.md` around Claude Desktop's Connector Directory: one-click installs only (Desktop Commander, Filesystem, Gmail/Microsoft 365, Google Drive), no config files for non-technical users.
- Updated `AGENTS.md` §6 and `TOOLS.md` to match (ChatGPT Apps/Developer mode realities, Antigravity MCP Store, terminal commands flagged as high-risk).
- Added Codex as the ChatGPT-side path for local file access; noted retirement of ChatGPT Agent mode (replaced by ChatGPT Work / cloud browser).

### 2026-08-20 — Added Tool Manager Skill
- Added the `tool-manager.md` skill workflow to enable interactive environment audits and tool installation.
- Cleaned and generalised `TOOLS.md` and `CAPABILITIES.md` to serve as clean starter templates.
