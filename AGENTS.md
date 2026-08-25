# AGENTS.md

This repo is the **build and deploy target** for `zshanpatel.github.io`. It is **not** the source of truth for content — don't edit anything under `content/` here directly unless you're patching a live build emergency. Real content lives in an Obsidian vault and flows into this repo one-way, automatically.

## Tooling & capabilities — check DraftVault first

This repo doesn't enumerate available tools, CLIs, or MCP servers, and shouldn't — that registry lives in DraftVault and changes independently of this repo. Before assuming a capability isn't available (or asking the user what they have), read:

- `/Users/zeeshanpatel/Documents/DraftVault/AGENTS.md` — entry point, routes to `06 Metadata/bootstrap.md`
- `06 Metadata/bootstrap.md`'s "Technical / Code / Deployment / Infrastructure" row — the load order for exactly this kind of work (`user.md`, `memory.md`, `06 Metadata/tools.md`, and `vault-operator-instructions.md` before any CLI/MCP call)
- `06 Metadata/tools.md` — the actual tool/MCP registry: what's connected, what each is for, CLI-vs-MCP precedence

Don't hardcode a tool list here — it'll drift from the real registry the moment something is added or removed there. This is the same loop in reverse: `bootstrap.md` already routes technical/code tasks to "the local project `AGENTS.md`" — this section is what makes that a two-way link instead of a dead end.

## Where publishing actually happens

- **Source of truth**: `/Users/zeeshanpatel/Documents/DraftVault/04 Blog Content/` — an Obsidian vault. Every published page starts as a Markdown file there.
- **The bridge**: `python3 "/Users/zeeshanpatel/Documents/DraftVault/00 Toolkit/Script Bank/publish.py"` — copies changed files from the vault into `content/` here, builds, commits, and pushes to `main`, which triggers the live GitHub Actions deploy (`.github/workflows/deploy.yaml`).
- **The rules content has to follow**: `/Users/zeeshanpatel/Documents/DraftVault/06 Metadata/Voice/publishing-guide.md` — frontmatter conventions, link-resolution rules, known gotchas. Read this before touching anything in `04 Blog Content/`, not just this file.
- **Link/safety checks**, run from the vault before publishing:
  - `00 Toolkit/Script Bank/check-wikilinks.py` — flags wikilinks/embeds that don't resolve, or resolve ambiguously (two files sharing a basename).
  - `publish.py`'s own safety scan — blocks the publish on unsafe link patterns and on a specific known plugin bug (a redundant `permalink:` frontmatter field that breaks bare-wikilink resolution — see the guide §2 for why).
- **The `/publish` skill**: `/Users/zeeshanpatel/Documents/DraftVault/06 Metadata/Skills/publish/skill.md` — the vault-side entry point that ties all of the above together. If you're being asked to publish something from the vault, start there, not here.

If you're working **in this repo** (code, layout, config) and need to see what content actually exists, `content/` here reflects whatever the last `publish.py` run copied — treat it as read-only unless the vault is genuinely unreachable.

If you're working **in the vault** and need to understand what a change will actually render as, this repo is where `npx quartz build --serve` runs from — see below.

## This repo, specifically

- **Quartz v5**, migrated from v4 on 2026-08-17. Config is `quartz.config.yaml` (plugins, theme, site config) + `quartz.ts` (TypeScript overrides — this site's full content-page layout, dark mode, and several conditional-sidebar rules live here since the layout is non-default). There is no `quartz.config.ts` — if you're looking for one, you're thinking of v4.
- **Deploy**: pushes to `main` trigger `.github/workflows/deploy.yaml` → GitHub Pages. `main` is also what `publish.py` pushes to — don't publish from any other branch checked out here (`publish.py` now refuses to if it detects one).
- **Local preview**: `npx quartz build --serve`, then `http://localhost:8080`.
- **Custom components** (not the community-plugin default, kept local because the plugin couldn't be configured to do what's needed): `quartz/components/Darkmode.tsx` (custom transition, wired via `quartz.ts`) and `quartz/components/Footer.tsx` (renders only the footer links, no "Created with Quartz" line).
- Full history of *why* things are built this way: `/Users/zeeshanpatel/Documents/DraftVault/06 Metadata/Session History/` — start with the most recent files, oldest first entry is 2026-08-17 (the v4→v5 migration).

## `session-notes/` — the live job board (read/update this, not this file)

There's a `session-notes/` folder at this repo's root: `tasks.md` (open items *and* current
feature state, merged into one file — see below), `lessons.md`, `plan.md`, `log.md`. This is
where live, in-progress state belongs — **not here in `AGENTS.md`**. This file stays a stable
map of how things are wired; if you're tempted to add a "recent work" or "current tasks"
section to `AGENTS.md` itself, don't — every fresh agent reads this file first as orientation,
and a live task list here would make that orientation read a moving target. That's exactly
what `session-notes/tasks.md` is for instead.

**Keep `session-notes/tasks.md` live, during the session, not just at the end.** The moment
you identify a task (a user request, a bug found mid-work, a deferred decision), add it there.
The moment something ships, move it to the Shipped section with the commit hash. Don't wait
until session close to reconstruct what happened from memory — that's exactly how this file
went stale before (see its own header for the story).

- `tasks.md` — the live job board: what's active/open, what's deferred, what's shipped and
  verified (with commit hashes), explicitly out-of-scope items, current git state
- `lessons.md` — hard-won, non-obvious facts about this codebase (page-type dispatch quirks,
  CSS gotchas, plugin-loading order bugs, etc.) — read this before touching layout or
  state-toggling CSS/JS, so you don't re-break something already solved once
- `plan.md` — design rationale for anything with real architectural decisions behind it —
  written occasionally, not every session
- `log.md` — terse chronological journal, one entry per session, newest on top

If picking up work here cold: `tasks.md` → `lessons.md` → `log.md` (only if you need the
narrative) — see `session-notes/tasks.md`'s own "if picking this up cold" note.

## Closing a session

In this order:

1. **`session-notes/` first.** If `tasks.md` was kept live during the session (see above),
   this should already be accurate — just double-check it, don't reconstruct it. Update
   `lessons.md`/`log.md`/`plan.md` if the session produced anything belonging there.
2. **Then the vault.** Append an entry to the vault's Session History:
   `06 Metadata/Session History/YYYY-MM-DD - Topic.md` (one file per date — append a new
   `# Session Log:` section if today's already exists, per the vault's `/session` skill format
   at `06 Metadata/Skills/session/skill.md`). This is a *narrative compression* of what
   `session-notes/` already tracks live — not a separate source of truth to keep in sync by
   hand. Do this even though you're not in the vault — otherwise the reasoning behind a change
   here only exists in a chat transcript that won't be there next session. Keep it short; a
   long entry costs more for the next agent to read than it saves.

This order matters: if you write the vault entry first from memory and *then* update
`session-notes/`, you're reconstructing state twice from the same fallible memory instead of
once. `session-notes/` being live all session is what makes step 2 fast — it's a compression
pass over already-accurate notes, not original research.
