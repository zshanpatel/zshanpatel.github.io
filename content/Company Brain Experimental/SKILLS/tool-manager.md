---
title: Tool Manager
description: Find, install, verify, and document tools to extend your AI's capabilities.
type: skill
draft: false
showDate: false
last-updated: 2026-08-22
---
Use this skill to help the user audit their environment, select new capabilities, install tools safely, and document them.

## Purpose

Walk the user (who may be non-technical) through expanding their AI's capabilities with zero friction, explaining permissions, security, and verification at every step.

## The Goal (start here)

The default first setup gives the AI two abilities. Explain it to the user in these words:

> "We are going to give me two abilities: **hands**, so I can read, create, and organise files on your computer — and **access to your email**, so I can read your inbox and draft replies for you. Nothing gets sent without your say-so."

Everything else in the catalog (Step 2) is optional and comes later, only if the user asks.

## Recommended Default

If the user has no existing preference, recommend **Claude Desktop** (the free plan is enough):

* Gmail connects in two clicks on every plan, including Free.
* Local file access is a one-time setup that you (the agent) can perform for them.

If the user is committed to ChatGPT instead: their local hands come from **Codex**, OpenAI's local agent app — capable, but an extra install with more setup friction than Claude Desktop, and connecting Gmail requires a paid plan. Recommend Claude Desktop as the default; support Codex happily when they prefer staying in the ChatGPT ecosystem.

---

## Workflow

Follow these steps sequentially. Explain each step in plain, non-technical language.

### Step 1: Environment Detection & Diagnostic

Ask the user which AI assistant client they are currently using, and which subscription plan they are on (tool availability differs by plan):
1. **Claude Web** (claude.ai in a browser — Free, Pro, Max, Team, or Enterprise plan)
2. **Claude Desktop** (Mac/Windows desktop app)
3. **Claude Cowork** (Claude's agentic desktop workspace — shares the same connectors as Claude Web/Desktop)
4. **Claude Code / CLI** (Terminal-based environment)
5. **ChatGPT / Codex** (Web UI plus OpenAI's Codex app or CLI — Free, Go, Plus, Pro, Business, or Enterprise/Edu plan)
6. **Google Antigravity** (IDE-integrated developer agent)
7. **Other Web UI / Sandboxed Chat** (any chat interface with no custom integration options)

*Note on direct access:* Check if you have file write permissions in the current workspace. If you do, inform the user: *"I can automatically update your configuration files for you, but I will show you the exact changes first and ask for your approval."*

---

### Step 2: Starter Tool Catalog & Recommendations

Introduce the starter tools in plain language. Lead with the two Goal capabilities; present the rest as "later, if you want":

| Capability                  | What it gives the AI                                                                 | Example Tool / MCP Server                      |
| --------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------- |
| **Hands (files + commands)** | Read and write files, organise folders, and run any behind-the-scenes steps themselves. | `desktop-commander`                            |
| **Files only**               | Read and write documents in listed folders — no shell access at all.                 | `filesystem`                                   |
| **Web Search & Fetch**      | Real-time research plus reading specific web pages.                                  | Built-in search, or the `fetch` MCP            |
| **Email (Gmail / Outlook)** | Draft, summarise, and reply to emails from your inbox.                               | Connectors (Native) or `gmail` / `outlook` MCP |
| **Google Docs & Sheets**    | Create spreadsheets, log metrics, and write long documents directly in Google Drive. | Connectors (Native) or `google-drive` MCP      |

Tool choice notes:
* **desktop-commander is the default hands tool.** The user never sees a terminal — Claude uses it behind the scenes to run any command-line steps, asking approval first.
* **filesystem** is the lighter companion for isolated document or file-based work where shell access is unnecessary — it can only touch folders you explicitly list.
* **Web:** Claude and ChatGPT already have built-in web search. Only install `fetch` if the user needs to read specific URLs or native search is unavailable.

Explain the security model: *"Giving an AI access to these tools means you are granting permission to interact with your local files or online accounts. You should only enable what you need, and you can approve or revoke access at any time."*

---

### Step 3: Installation & Configuration Guides

Based on the detected environment and chosen tool, execute the appropriate protocol:

#### 1. Claude (Web, Desktop, and Cowork)

Everything installs from the **Connector Directory** — one click each, no config files, no terminal. Install in this exact order — hands before email:

Open **Customize → Connectors** (or click **+** in chat → Connectors → Manage connectors), then install exactly these four:

1. **Desktop Commander** — the AI's hands, and the most important install. Search "desktop commander", click **Install**, and when prompted choose which folder it may access (start with Documents). It lets Claude read/write files AND run any command-line steps itself — the user never sees or touches a terminal; Claude handles all of that behind the scenes, asking approval before acting.
2. **Filesystem** — for isolated document or file-based work where shell access is unnecessary. Same one-click install; it gives Claude read/write access to listed folders only, nothing else.
3. **Email connector** — ask the user one question: *"Is your email Gmail or Outlook?"*
   * Gmail → connect **Gmail**
   * Outlook / Hotmail / Microsoft 365 → connect **Microsoft 365**
4. **Google Drive** — lets Claude read and create Google Docs and Sheets alongside local files.

That is the entire setup. Everything else stays unconnected until both Goal capabilities are verified working (Step 4).

Notes:
* Directory installs work on every plan including Free. On Team/Enterprise, an Owner must enable a connector org-wide before members can install it.
* Local tools like Desktop Commander prompt for their settings (e.g., which folder to access) in simple forms during install — nothing to type into files.
* Web search is already built into Claude; do not install anything for it.
* Last resort only: if a genuinely needed tool is not in the directory, it can be added manually via Settings → Developer → Edit Config — but never send a non-technical user there yourself.

#### 2. ChatGPT (Tool Installation & Configuration)
Goal: Give the AI agent access to the tools listed in the environment configuration.
General rules:
1. Detect which tools are already installed and connected.
2. Prefer native connectors when available.
3. Otherwise use the appropriate MCP server.
4. Install and configure everything possible automatically.
5. Only interrupt the user when human authentication/authorization is genuinely required.
6. Never make the user manually configure API credentials if an OAuth/native connection can handle it.
7. After installation, test every tool with a harmless read-only operation.

Plan availability (as of August 2026):
* **Built-in apps/connectors** (Gmail, Google Drive, Calendar, Outlook, Dropbox, etc.): available on paid plans; on Business/Enterprise/Edu, admins control which are enabled.
* **Custom MCP connectors via Developer mode:** Plus and Pro get read/fetch-only custom connectors. Full MCP with write actions is limited to Business, Enterprise, and Edu (beta, admin-gated).
* **Free plan:** apps directory only — no custom MCP connectors.
* **Local hands:** use **Codex**, OpenAI's local agent app — included with paid plans (Plus gets practical usage; Free/Go are heavily limited). Signs in with the ChatGPT account.
* Terminology: OpenAI renamed "Connectors" to "Apps" in December 2025. Developer mode lives under Settings → Apps → Advanced settings. ChatGPT's former Agent mode was retired in August 2026 — its multi-step work now lives in **ChatGPT Work** and the cloud browser. Never instruct users toward "agent mode".

##### Gmail
Required capability:
- Search/read emails
- Summarise emails
- Draft emails
- Reply to emails
- Send emails when explicitly instructed
Preferred order:
1. Native Gmail connector
2. Gmail MCP server
3. Other Gmail API integration only as a last resort
Authentication:
- Prefer OAuth.
- If authentication requires the user's browser interaction, pause and ask the user to authorise the connection.
- Do not ask the user to manually create Google Cloud API credentials unless absolutely necessary.
After connecting:
- Verify that the agent can search/read Gmail.
- Do not send or modify any email as part of the test.

##### Google Drive / Docs / Sheets
Required capability:
- Read and create Google Docs
- Read and create Google Sheets
- Search Google Drive
- Edit documents/spreadsheets
Preferred order:
1. Native Google Drive/Workspace connector
2. Google Drive MCP
3. Google APIs as a last resort
Authentication:
- Prefer OAuth.
- Ask the user only when browser authorization is required.
After connecting:
- Perform a harmless read-only test.

##### Local Filesystem
Required capability:
- Read/write files on the user's computer.
Implementation: **Codex** — OpenAI's local agent (desktop app for macOS/Windows, or CLI).
1. Have the user install the Codex desktop app (easiest path) and sign in with their ChatGPT account.
2. Codex works inside one chosen folder by default ("workspace") with a safe sandbox: it can read/edit files there and run routine commands, asking approval before acting.
3. Extra tools connect via MCP in Codex Settings (`~/.codex/config.toml`, `[mcp_servers]` tables) — this is power-user territory; do not send a non-technical user into config files unless a tool genuinely requires it.
Included with paid plans; Free/Go get only trial-level usage.

##### Web
Required capability:
- Search the live web.
- Fetch web pages.
- Retrieve current information.
Preferred implementation:
- Native web/search capability if available.
- Otherwise `fetch` or the configured web MCP.
Test with a harmless search.

#### 3. Google Antigravity (MCP Setup)

Tools are managed through the built-in MCP Store — never through rules files (`AGENTS.md` is for instructions only).

* **From the MCP Store (easiest):**
  1. Click **⋯** at the top of the agent side panel and select **MCP Servers**.
  2. Hover over a supported server and click **Install**, then follow the prompts.
* **Custom server (raw config):**
  1. Click **⋯** → **MCP Servers** → **Manage MCP Servers** → **View raw config**.
  2. Edit `mcp_config.json` — the global config lives at `~/.gemini/config/mcp_config.json`; a per-workspace config lives at `.agents/mcp_config.json` inside the workspace.
* Rules and instructions belong in `AGENTS.md` (workspace) or `~/.gemini/GEMINI.md` (global). Do not register tools there.

---

### Step 4: Verification

Once the tool is configured:
1. Explain to the user how to reload the AI assistant (e.g., fully quit and reopen Claude Desktop after config-file edits; refresh the ChatGPT page; connector installs in Claude need no restart).
2. Run a simple test call or instruct the user to run a test prompt:
   * *Hands test:* "Create a folder called 'AI Test' in Documents with a file inside called hello.txt."
   * *Email test:* "Summarise my three most recent unread emails." (Read-only.)
   * *Web Search test:* "Search the web for the current weather in London."
   * *Workspace test:* "Create a test document named 'Tool Connection Test'."
3. Confirm the test succeeded before proceeding.
4. For anything unsuccessful, explain the single action required from the user. Do not provide a long installation tutorial unless the automatic installation path fails.

---

### Step 5: Update System Memory

Update the local [TOOLS.md](TOOLS.md) file in the user's workspace to document the newly enabled capabilities.

*If write access is allowed,* perform the edit automatically and show the updated status.
*If no access,* provide the markdown block for the user to append to their local `TOOLS.md` file.
