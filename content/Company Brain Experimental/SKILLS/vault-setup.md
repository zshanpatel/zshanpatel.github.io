---
title: AI OS Setup
description: Bootstrap a personal AI operating system vault (name-ai-os) from zero — identity first, grown inside-out.
type: skill
draft: false
showDate: false
last-updated: 2026-08-22
---
Use this skill to take a brand-new user from an empty Documents folder to their own working AI operating system: a vault named `<name>-ai-os` with identity, memory, and structure — built in the right order so it survives.

## Purpose

Walk the user (who may be non-technical) through creating their own AI OS vault. Everything is plain markdown files and folders — portable, readable, never trapped inside one vendor. Narrate each step in plain English so the user chooses with understanding, not just nods along.

*Routing note:* if the user only wants a portable context brief to paste into any chat tool — not a whole vault — send them to the **Brief Your AI Assistant** prompt (`12-brief-your-ai.md`) instead. This skill is for the full build.

## The Mental Model — grow inside-out

Teach the user this picture: five layers, from a solid core out to a changing atmosphere, all sitting on a substrate where memory lives.

| Layer | What it is | How fast it changes |
|---|---|---|
| 1. Identity (the core) | Who this OS serves — voice, defaults, refusals (`user.md`, `AGENTS.md`) | Months |
| 2. Rules | Black-and-white always-do / never-do lists | Weeks |
| 3. Skills | Workflows done by hand about three times until they earn a name | Days–weeks |
| 4. Agents | Roles that hold judgment and orchestrate skills underneath them | Days |
| 5. Tools | Wires out to real software — connectors, MCPs, CLIs | Hours |

Under all five sits the **substrate**: `memory.md` plus a `Wiki/` folder of living, cross-linked notes that compound over time instead of being re-read raw on every query.

The one rule that governs everything: **grow inside-out.** Start at the core, and only add an outer layer once real usage has earned it. Never invent skills, agents, or integrations the user has not earned — those stay as one-line notes in the blueprint, not files. The deeper the layer, the slower it should ever change.

---

## Workflow

### Step 0: Check Where We Are

Before writing or changing a single file: state the exact folder path, list what is already inside it, and ask the user to confirm where the vault should live (default: `~/Documents/<name>-ai-os/`). If the location is not empty, ask whether this is a fresh home or an existing project. Do nothing until confirmed.

### Step 1: Interview the User

Ask in small batches of two or three questions and wait for answers. Dig one level deeper with one concrete follow-up per area — the obvious answer is rarely the real one:

1. What is your role, and the business you run or work inside — explained like to a smart friend?
2. Who do you serve, and what do they pay you for?
3. What is your point of view in this work, and what do you flat out refuse to do?
4. Walk me through a normal week — what recurs, and which parts drain you most?
5. What software do you actually pay for and live in daily? Where does your important information live right now?
6. What do you find yourself re-explaining or re-deciding over and over?
7. Which few tasks, if this OS owned them reliably, would change your week the most?
8. Is anything sensitive or client-confidential that must never leave your machine?
9. Do you want a thinking partner, a background workforce, or both — in what mix?

### Step 2: Write the Blueprint

Write everything learned into a single `os-blueprint.md` inside the vault folder — one plain readable section per layer plus the substrate, and what to build first versus later. Show it, play the user's operation back in one short paragraph, and ask them to confirm or correct before anything is built. This file is the single source of truth.

### Step 3: Offer Two Paths

Lay these out in plain language and let the user pick:

* **Path A — Blueprint only.** Create nothing more. Walk through `os-blueprint.md` section by section and stop. Right for users who want a plan they (or a developer) act on later.
* **Path B — Build it out.** Scaffold the real starter vault below.

### Step 4: Build (Core Outward, One Layer at a Time)

For each layer: give one sentence on what it is and why it comes now, show what is about to be created, get an okay, then write real files seeded with the interview answers.

```text
<name>-ai-os/
├── AGENTS.md            # behaviour, principles, boundaries (Layers 1–2)
├── user.md              # identity: who the user is, voice, defaults, refusals (Layer 1)
├── memory.md            # active context — updated at the end of every session (substrate)
├── os-blueprint.md      # single source of truth
├── TOOLS.md             # Layer 5 registry — connections documented, not wired
├── 01 Inbox/            # raw captures land here
├── 02 Projects/
├── 03 Metadata/
│   ├── bootstrap.md     # what an agent loads first, and in what order
│   └── rules/
│       ├── always.md    # black-and-white always-do list
│       └── never.md     # black-and-white never-do list
├── Wiki/                # substrate: schema.md, index.md, log.md, sources/
└── README.md            # what exists, what is empty, how to use this tomorrow
```

Rules while building:

* Identity first, tools last. Layers 3–5 start nearly empty by design — say so honestly.
* No filesystem access (sandboxed web chat)? Either give the AI hands first via the **Tool Manager** skill, or deliver every file as an ordered set of copy-paste blocks the user saves themselves. Never claim to have created files that were not written.
* `bootstrap.md` sets the load order: `user.md` → `memory.md` → `TOOLS.md` → task-specific routing. It must also carry the session protocol inline: at session start, load those files; at the end of any meaningful session, update `memory.md` (date, what happened, open loops, next actions).
* Give every file a `last-updated` date in its frontmatter; anything time-sensitive also gets a `revisit` date.
* The Wiki starts alive, not empty: tell the user the exact path to drop real documents, and offer to ingest one together so they see it work. Raw sources are read, never edited.
* Tools layer: document each desired connection in `TOOLS.md` with the narrowest scope it needs — then offer the **Tool Manager** skill (`SKILLS/tool-manager.md`) to wire hands and email for real.
* Guardrails throughout: confirm before anything destructive, before overwriting an existing file, and before acting outside the vault folder. Keep secrets and private data out of anything that could go public.

### Step 5: Verify and Hand Off

Read the vault back. Run one orientation test: *"What is my name, and what do you refuse to do?"* — confirm the answer comes from `user.md`, not guessing. Then tell the user plainly: future sessions begin by loading `bootstrap.md`, and `memory.md` gets updated at the end of every meaningful session.

---

## Maintenance (Anti-Rot)

Different layers rot at different rates, like a building — maintain them on different schedules, and do not panic when a fast layer moves:

* **On contact, always.** Working in a file and spot a missing edge case? Fix it now. Fast layers are maintained by use.
* **Weekly, light.** Scan the layers and Wiki against `os-blueprint.md` and report drift: stale pages, contradicting rules, unused structure. Report and recommend only — never delete without explicit approval.
* **Monthly, automatic.** Walk each file's `revisit` date and interview the user to refresh whatever is past due.
