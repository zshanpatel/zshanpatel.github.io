---
title: Tools Registry (Runtime)
description: Master list of active tools, integrations, and connection details.
type: agent-runtime
tags: [tools, agent-context, capabilities]
last-updated: 2026-08-20
---

# Tools — Runtime Tool Registry

This is the fast-load summary of available technical leverage for your AI assistant. Maintain this file to let the AI know what superpowers it has active in this session.

---

## Enabled Tool Connections

Below is the list of active tools connected to this assistant. Update this list whenever a tool is added or removed using the **Tool Manager** skill.

| Server / Tool Name | Purpose | Connection Type | Status |
| --- | --- | --- | --- |
| `filesystem` | Scoped file read/write access to organize folders and notes. | MCP (Local) | *[Enabled / Disabled]* |
| `web-search` | Fetch real-time market data, research, and general information. | MCP / API (Tavily or DuckDuckGo) | *[Enabled / Disabled]* |
| `google-workspace` | Bridge notes with Google Docs, Sheets, and Drive. | MCP / OAuth (Google API) | *[Enabled / Disabled]* |
| `email` | Summarize and draft emails directly from Gmail or Outlook. | MCP / OAuth | *[Enabled / Disabled]* |

---

## Configuration Snippets & Guides

This section lists the configuration settings for the starter tools in different AI environments.

### 1. Claude Desktop (MCP Config)
Add the following blocks to your `claude_desktop_config.json` under the `"mcpServers"` key to enable these tools:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/path-to-your-company-brain"
      ]
    },
    "tavily-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-tavily-search"
      ],
      "env": {
        "TAVILY_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 2. ChatGPT (Custom GPT Actions)
Use these settings when creating a Custom GPT to integrate tools:
* **Schema**: Ask the AI to provide the OpenAPI specification for the chosen API (e.g. Tavily or Google Workspace).
* **Authentication**: Configure Bearer/API Key or OAuth 2.0 as specified by the API provider.

### 3. Google Antigravity (Local Customizations)
Add the tools under your root `AGENTS.md` and define corresponding tool mappings in your CLI configuration path.

---

## High-Risk Tools & Approvals

Always require explicit user confirmation before using these tools to ensure data safety:
- **Filesystem Deletions**: Deleting or replacing non-empty directories.
- **Direct Email Sending**: Sending an email draft without human proofreading.
- **Database/Write Operations**: Modifying spreadsheets or sheets containing live client logs.

---

## Preferred Tool Precedence

When solving a task, the AI should prioritize tools in the following order:
1. **Local Filesystem**: Read/write from local files instead of guessing or duplicating.
2. **Web Search**: Query the live web for facts or recent documentation if not present on disk.
3. **Workspace/Email**: Fetch external records or draft communications only when requested.
