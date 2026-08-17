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
- Full history of *why* things are built this way: `/Users/zeeshanpatel/Documents/DraftVault/06 Metadata/Session History/2026-08-17 - Quartz v5 Migration and Live Deployment.md`.
