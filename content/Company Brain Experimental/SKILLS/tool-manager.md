---
title: Tool Manager
description: Find, install, verify, and document tools to extend your AI's capabilities.
type: skill
draft: false
showDate: false
---

# Tool Manager

Use this skill to help the user audit their environment, select new capabilities, install tools safely, and document them.

## Purpose

Walk the user (who may be non-technical) through expanding their AI's capabilities with zero friction, explaining permissions, security, and verification at every step.

---

## Workflow

Follow these steps sequentially. Explain each step in plain, non-technical language.

### Step 1: Environment Detection & Diagnostic

Ask the user which AI assistant client they are currently using:
1. **Claude Desktop** (Mac/Windows desktop app)
2. **Claude Cowork / Code / CLI** (Terminal-based environment)
3. **ChatGPT Plus / Team** (Web UI, Custom GPTs, or Actions)
4. **Google Antigravity** (IDE-integrated developer agent)
5. **Other Web UI / Sandboxed Chat** (Claude.ai web interface, ChatGPT web interface with no custom integration)

*Note on direct access:* Check if you have file write permissions in the current workspace. If you do, inform the user: *"I can automatically update your configuration files for you, but I will show you the exact changes first and ask for your approval."*

---

### Step 2: Starter Tool Catalog & Recommendations

Introduce the starter tools in plain language. Ask the user which capability they want to enable first:

| Capability                  | What it gives the AI                                                                 | Example Tool / MCP Server                      |
| --------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------- |
| **Local Filesystem**        | Read and write files directly on your computer to organize documents and folders.    | `filesystem`                                   |
| **Web Search**              | Fetch real-time market data, research, and answers from the live web.                | `fetch`                                        |
| **Email (Gmail / Outlook)** | Draft, summarize, and reply to emails from your inbox.                               | Connectors (Native) or `gmail` / `outlook` MCP |
| **Google Docs & Sheets**    | Create spreadsheets, log metrics, and write long documents directly in Google Drive. | Connectors (Native) or `google-drive` MCP      |

Explain the security model: *“Giving an AI access to these tools means you are granting permission to interact with your local files or online accounts. You should only enable what you need, and you can approve or revoke access at any time.”*

---

### Step 3: Installation & Configuration Guides

Based on the detected environment and chosen tool, execute the appropriate protocol:

#### 1. Claude Desktop (MCP Setup)
* **If write access is allowed:** Write the config directly to `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows) **only after** showing the user the exact JSON diff and receiving explicit approval.
* **If no direct access (Sandboxed):** Provide the exact path to the configuration file, a clean JSON code block to copy-paste, and a step-by-step guide on how to open the file and paste the block.
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
- If authentication requires the user's browser interaction, pause and ask the user to authorize the connection.
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
Preferred implementation:
- `filesystem` MCP.
Install/configure it automatically if the agent has the required local permissions.
Test:
- Read the current working directory.
- Do not modify or delete anything during the test.
##### Web
Required capability:
- Search the live web.
- Fetch web pages.
- Retrieve current information.
Preferred implementation:
- Native web/search capability if available.
- Otherwise `fetch` or the configured web MCP.
Test with a harmless search.
#### 3. Google Antigravity (Customizations / Rules Setup)
* Guide the user to:
  1. Open the `AGENTS.md` file in their workspace root directory.
  2. Add the custom tool name under the `Available Skills` or `Tools` registry.
  3. Ensure the corresponding tool configuration is defined in the app-data directory.


---

### Step 4: Verification

Once the tool is configured:
1. Explain to the user how to reload the AI assistant (e.g., restart Claude Desktop, refresh the ChatGPT page).
2. Run a simple test call or instruct the user to run a test prompt:
   * *Filesystem test:* "Read the README.md file in this directory."
   * *Web Search test:* "Search the web for the current weather in London."
   * *Workspace test:* "Create a test document named 'Tool Connection Test'."
3. Confirm the test succeeded before proceeding.
4. For anything unsuccessful, explain the single action required from the user. Do not provide a long installation tutorial unless the automatic installation path fails. 

---

### Step 5: Update System Memory

Update the local [TOOLS.md](TOOLS.md) file in the user's workspace to document the newly enabled capabilities. 

*If write access is allowed,* perform the edit automatically and show the updated status.  
*If no access,* provide the markdown block for the user to append to their local `TOOLS.md` file.
