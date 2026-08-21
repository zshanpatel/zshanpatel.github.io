---
title: OAuth (Open Authorization)
name: oauth
description: The delegation protocol that lets one system act on your behalf with a limited token instead of your password — the mechanism any fleet of AI agents needs before it touches shared infrastructure.
aliases:
  - Open Authorization
  - OAuth 2.0
  - OAuth 2.1
tags:
  - term
human-reviewed: false
---
> Never give out the master key. Issue a pass that opens one door, for one hour, and logs every turn of the lock.

OAuth is an open delegation standard: instead of handing a third party your actual password, you approve a scoped, expiring token that grants access to specific actions and nothing more. You have used it every time an app offered "Sign in with Google" or asked to read your calendar. Three properties make it foundational for agents rather than just convenient for logins — tokens carry scopes that cap what the holder can do, they expire so a leak is an incident rather than a catastrophe, and every use can be logged, which turns "what did the agent touch?" from a mystery into a query.

This is precisely why OAuth anchors the surviving case for [[mcp|MCP]]. A single agent on your own machine does not need it; the terminal's own permissions do fine. But when fifty agents serve a department across shared systems — inboxes, databases, customer records — distributing raw credentials to every session recreates the security posture of the pre-SSO era at machine speed, and no audit trail exists to reconstruct a mistake. MCP's authorisation specification, published in 2025, made OAuth mandatory for remote servers for exactly this reason. Delegation is boring right up until something acts on your behalf at scale; then it is the whole ballgame.

*Source: Hardt, D. (2012), "The OAuth 2.0 Authorization Framework," RFC 6749, Internet Engineering Task Force.*

### 🔗 Related Concepts
- [[mcp|The Protocol That Made It Mandatory]]
- [[human-in-the-loop|The Other Half Of Safe Delegation]]
- [[api|The Boundary It Guards]]
