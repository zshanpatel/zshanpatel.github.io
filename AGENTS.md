# AGENTS.md

This repo is the **build and deploy target** for `zshanpatel.github.io`. It is **not** the source of truth for content — don't edit anything under `content/` here directly unless you're patching a live build emergency. Real content lives in an Obsidian vault and flows into this repo one-way, automatically.

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

## After working here

If you make a change in this repo — config, layout, plugins, deploy setup, a bug fix, anything — append an entry to the vault's Session History when you're done: `06 Metadata/Session History/YYYY-MM-DD - Topic.md` (one file per date — append a new `# Session Log:` section if today's already exists, per the vault's `/session` skill format at `06 Metadata/Skills/session/skill.md`). Do this even though you're not in the vault — otherwise the reasoning behind a change here only exists in a chat transcript that won't be there next session. Keep each entry short — a few lines is enough. The point is a trail future sessions can pick up quickly, not a full transcript; a long entry costs more for the next agent to read than it saves.

**This file should stay a stable map of how things are wired, not a running log.** To pick up current context — what's actively being tried, what's still open — read the most recent Session History file(s), not this one. If you're tempted to add a "recent work" summary here instead, don't: it'll duplicate the log and go stale the moment nobody remembers to update it.

## `session-notes/` — in-repo checkpoints

There's also a `session-notes/` folder at this repo's root (`log.md`, `lessons.md`, `progress.md`, `tasks.md`, `plan.md`). It exists *alongside* the vault's Session History, not instead of it — the vault entry (above) is the narrative "why" record that survives even if this repo is ever wiped and re-cloned; `session-notes/` is a finer-grained, in-repo counterpart so a fresh session working purely in `~/quartz` (no vault access) can still pick up exactly where the last one left off, without needing to read a full chat transcript.

If you make a non-trivial change here, update the relevant file(s) in `session-notes/` in the same pass you update the vault:
- `progress.md` — current state of each feature/task (what's shipped, what's uncommitted, what's verified)
- `lessons.md` — hard-won, non-obvious facts about this codebase (page-type dispatch quirks, CSS gotchas, etc.) — read this before touching layout or state-toggling CSS/JS, so you don't re-break something already solved once
- `tasks.md` — what's actually left to do in this repo, including anything that needs the user's go-ahead (commit/push decisions)
- `plan.md` — design rationale for anything with real architectural decisions behind it
- `log.md` — terse chronological journal, one entry per session, newest on top

If picking up work here cold, read `session-notes/` in this order: `progress.md` → `lessons.md` → `tasks.md` → `log.md` (only if you need the narrative) — see `session-notes/tasks.md`'s own "if picking this up cold" note.
