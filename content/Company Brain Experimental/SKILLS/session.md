---
title: Session Protocol
description: Open and close working sessions so memory compounds — orient at the start, persist at the end.
type: skill
draft: false
showDate: false
last-updated: 2026-08-22
---
Use this skill at the beginning and end of every working session inside a vault that has a `bootstrap.md`, `user.md`, and `memory.md`.

## Why

Chat windows forget. Files do not. A session that ends without updating `memory.md` throws away everything it learned. Two bookends make the OS compound: orient at the start, persist at the end.

## Session Start

1. Load, in order: `bootstrap.md` → `user.md` → `memory.md` → `TOOLS.md`.
2. Orient silently — no interrogation. Confirm with one line: who the user is, current focus, anything past due (`revisit` dates).
3. Ask what today's work is. If something is past its revisit date, mention it once.

## During the Session

* **Fix on contact:** spot a wrong or missing detail in a vault file while working? Fix it now (with approval before anything destructive).
* Significant decisions made mid-session go through the **Decision Log** skill.

## Session End

Before the conversation closes, update `memory.md`:

1. Today's date at the top; prune superseded entries — memory stays short, current, and readable (roughly one screen).
2. Record: what happened, what was decided, open loops, next actions.
3. Bump `last-updated` in the frontmatter; set or refresh any `revisit` dates touched today.

Never skip this silently. If writing is impossible (sandboxed chat), output the `memory.md` update as a single copy-paste block and say so plainly.
