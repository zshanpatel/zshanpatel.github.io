---
title: Tools Registry (Runtime)
description: Master list of active tools, integrations, and connection details.
type: agent-runtime
tags: [tools, agent-context, capabilities]
last-updated: 2026-08-22
---

# Tools — Runtime Tool Registry

This is the fast-load summary of available technical leverage for your AI assistant. Maintain this file to let the AI know what superpowers it has active in this session.

---

## Enabled Tool Connections

Below is the list of active tools connected to this assistant. Update this list whenever a tool is added or removed using the **Tool Manager** skill.

| Server / Tool Name | Purpose | Connection Type | Status |
| --- | --- | --- | --- |
| `desktop-commander` | Hands: file read/write plus running command-line steps behind the scenes. | Connector Directory (one-click install) | *[Enabled / Disabled]* |
| `filesystem` | Scoped file read/write for isolated document or file-based work. | Connector Directory (one-click install) | *[Enabled / Disabled]* |
| `web-search` | Real-time research and current information. | Built into Claude and ChatGPT (no install needed) | *[Enabled / Disabled]* |
| Gmail / Microsoft 365 connector | Summarize and draft emails directly from the user's inbox. | Connector Directory (OAuth sign-in) | *[Enabled / Disabled]* |
| Google Drive connector | Read and create Google Docs and Sheets. | Connector Directory (OAuth sign-in) | *[Enabled / Disabled]* |

---

## How Tools Are Installed

All starter tools install from each platform's built-in directory — no config files, no terminal, on any plan including Claude Free.

### 1. Claude (Web, Desktop, and Cowork) — recommended default
In **Customize → Connectors**, install in this order:
1. **Desktop Commander** — hands: file access plus behind-the-scenes command execution.
2. **Filesystem** — optional companion for isolated document/file work without shell access.
3. **Email connector** — Gmail, or Microsoft 365 for Outlook users.
4. **Google Drive** — Google Docs and Sheets.
Local tools prompt for settings (e.g., which folder to access) in simple forms during install.

### 2. ChatGPT / Codex
* **Hands:** install the **Codex** desktop app and sign in with the ChatGPT account. It works sandboxed inside one chosen folder by default, asking approval before acting. Included with paid plans; Free/Go get only trial-level usage.
* **Email & docs:** built-in apps/connectors on paid plans (admin-controlled on Business/Enterprise/Edu). Custom MCP connectors require Developer mode: read-only on Plus/Pro; full write actions only on Business, Enterprise, and Edu.
* Note: ChatGPT's former Agent mode was retired in August 2026 — multi-step work now lives in ChatGPT Work and the cloud browser.

### 3. Google Antigravity
Install from the built-in MCP Store (agent panel → ⋯ → MCP Servers). Custom servers go in `~/.gemini/config/mcp_config.json` (global) or `.agents/mcp_config.json` (workspace).

---

## High-Risk Tools & Approvals

Always require explicit user confirmation before using these tools to ensure data safety:
- **Terminal Commands**: Any shell command executed via Desktop Commander.
- **Filesystem Deletions**: Deleting or replacing non-empty directories.
- **Direct Email Sending**: Sending an email draft without human proofreading.
- **Database/Write Operations**: Modifying spreadsheets or sheets containing live client logs.

---

## Preferred Tool Precedence

When solving a task, the AI should prioritize tools in the following order:
1. **Desktop Commander (hands)**: The default for any work on the user's computer — read/write files, organise folders, and run any command-line step itself. Prefer acting over guessing, duplicating, or asking the user to do things manually.
2. **Filesystem (files only)**: For isolated document or file-based work where shell access is unnecessary.
3. **Web Search**: Query the live web for facts or recent documentation if not present on disk.
4. **Workspace/Email**: Fetch external records via Google Drive or draft communications via Gmail/Microsoft 365 only when requested.
