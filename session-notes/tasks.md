# Tasks

The live job board for this repo — open items *and* current feature state in one file
(merged from a separate `progress.md` after that file went stale: it was only touched at
session-end, so it drifted from git reality between sessions).

**Keep this live.** Add an item under Active as soon as it's identified — a user request, a bug
found mid-session, a deferred decision — don't wait until session close to reconstruct it from
memory. Move an item to Shipped (with the commit hash) the moment it's actually committed, not
when the session ends. `AGENTS.md` points every fresh agent here first for "what's actually
happening in this repo right now" — treat that as the contract.

Cross-reference the vault's own `tasks.md` (`04 Blog Content` side) for the authoritative,
broader task list — this file only tracks what's actionable *from inside `~/quartz`*, so a
session working purely in this repo doesn't need vault access to know what's next. If DraftVault's
copy of a quartz-related task looks out of date, this file is the one that's current — the vault
side gets synced at session close (see "Closing a session" below), not continuously.

---

## Active — needs the user

- [ ] **Re-confirm the flex-property-snap fix**: last user message said "almost perfect,
      slight jerk on machine→human" — that was diagnosed and fixed (see `lessons.md`) but not
      yet re-confirmed live by the user. If they report it's still off, don't restart from
      scratch — re-read `lessons.md` first, the bug is almost certainly a *new* instance of
      the same "property only in scoped rule" pattern, not something new.
- [ ] **Confirm giscus restyle actually landed for the user** — Zeeshan reported GitHub's
      default black "Sign in" button after the first restyle deploy; root-caused to a
      cross-origin cache-partition bug and fixed via versioned filenames
      (`light-v2.css`/`dark-v2.css`, commit `24bc0f0`). Verified live server-side and via a
      fresh browser tab this session, but get an explicit "yes, fixed" from Zeeshan next
      session rather than assuming.

## Deferred, not started (only start if explicitly asked)

- [ ] **⌘K search shortcut** — focus the existing sidebar search box on keypress. Raised as an
      aside, user has not asked for it to be built.
- [ ] **`explicit-publish` migration** — would require adding `publish: true` to ~500 content
      files (currently 0 have it; 91 have `draft: true` under the opt-out model instead).
      Zeeshan liked the idea in passing but this is a real content-wide migration, not a
      config toggle — don't start without explicit confirmation of the approach.

## Explicitly out of scope for this repo

- **About/ content restructure sync** — vault has renamed/reorganized `About/` sub-pages;
  this repo's `content/About/` doesn't match yet. That's a vault-side `publish.py` job, not
  something to fix by hand-editing files here.
- **T-22 sub-task 3 (PDF export of the About/ATS page)** — per the user, already handled via
  typst, outside this repo/session.
- **Full vault→repo content sync for About/** — the vault's `About/` folder has been
  restructured (renamed sub-files: `01-s4g.md` vs this repo's `01-s4g-consultancy.md`, etc.)
  ahead of what's synced here. Only the `jsonLD` frontmatter block was hand-copied over. A
  future full `publish.py` sync will need to reconcile this — don't attempt it from this repo.

---

## Shipped

Most recent first. Move an item here the moment it's actually committed.

### Essay comments (giscus) — ✅ DONE, verified, live

`@quartz-community/comments` wired directly in `quartz.ts` (YAML-only registration doesn't
work in this fork — see `lessons.md`), scoped to `content/Essays` only via a slug-prefix
`ConditionalRender`. giscus GitHub App installed on `zshanpatel/zshanpatel.github.io` only
(not all repos); Discussions enabled on the repo.

- Changed: `quartz.ts` (`Comments()` in the `afterBody` array), `quartz.config.yaml` (entry
  kept `enabled: false`, full `options:` retained for documentation only)
- Verify: `grep -rl giscus public/essays --include=*.html | wc -l` → 34 (every essay, nothing
  else). Live: https://zshanpatel.github.io/essays/01-why-trade

### Self-hosted fonts — ✅ DONE, verified, live

`theme.cdnCaching: false` in `quartz.config.yaml`. Fonts (Inter, Merriweather, Fira Code)
download and bundle under `/static/fonts/` at build time instead of the visitor's browser
fetching from `fonts.googleapis.com`/`fonts.gstatic.com` live.

- Verify: `grep -c "fonts.googleapis.com\|fonts.gstatic.com" public/essays/*/index.html` → 0.
  `ls public/static/fonts | wc -l` → 8 files.

### Giscus theme restyle — ✅ DONE, verified, live

`quartz/static/giscus/light-v2.css` / `dark-v2.css` (renamed from `light.css`/`dark.css` —
see cache-partition bug below) rewritten to match the site's actual `theme.colors` palette and
self-host Inter/Merriweather/Fira Code via `@font-face`, instead of the stale sage-green/
steel-blue palette that was there before this session (predates the current grayscale theme).

- Changed: `quartz/static/giscus/light-v2.css`, `dark-v2.css` (renamed + rewritten),
  `quartz.ts` (`lightTheme`/`darkTheme` options on `Comments()`)
- **Real bug found and fixed**: giscus's iframe is cross-origin and caches the theme CSS fetch
  in a separate browser cache partition from the top page — an in-place edit to `light.css`
  can serve stale colors indefinitely, confirmed via Zeeshan reporting GitHub's default black
  "Sign in" button after the first (same-filename) restyle attempt had already deployed. Fixed
  by versioning the filename. Full detail in `lessons.md` — **bump the `-v2` suffix again on
  any future theme edit**, don't just edit the existing file in place.
- Verify: `curl -s https://zshanpatel.github.io/essays/01-why-trade | grep -o 'data-light-theme="[^"]*"'`
  → `data-light-theme="light-v2"`. Visually confirmed live in browser (gray button, Merriweather
  font, not GitHub's default black/sans).

### T-31 — Homepage `<h1>` — ✅ DONE, verified, committed (`36e02f3`)

Homepage had zero `<h1>` (ArticleTitle unconditionally excluded on `slug === "index"` by
design — no visible title above the hero image). Added a visually-hidden `<h1>` instead of
changing the visible design.

- New: `quartz/components/VisuallyHiddenTitle.tsx`
- Changed: `quartz.ts` (`beforeBodyContent` — `ConditionalRender` for `slug === "index"`)
- Verify: `grep -ci '<h1' public/index.html` → 1. Other pages unaffected (already had their own h1 via `ArticleTitle`).

### T-20 — Person JSON-LD + llms.txt — ✅ DONE, verified, committed (`36e02f3`)

- **JSON-LD**: generic mechanism — any page can opt in via a `jsonLD:` frontmatter object
  (schema.org shape). `Head.tsx` reads it, strips restricted keys (`telephone`, `address`) via
  the shared `quartz/util/jsonLd.ts`, and emits `<script type="application/ld+json">`.
  Currently only `content/About/index.md` uses it (synced from the vault's authored block —
  name, email, url, sameAs, jobTitle, worksFor, alumniOf; telephone/address present in the
  source frontmatter but always stripped before publishing).
- **llms.txt**: build-time emitter, `quartz/plugins/emitters/llmsTxt.ts`, wired into
  `quartz.ts`'s `config.plugins.emitters`. Sections: About/Resume (static, 4 links),
  Writing (**dynamic** — any essay with `llmsTxt: true` in frontmatter, sorted by date desc;
  currently 7 essays opted in: `02-what-is-artificial-intelligence`, `03-local-ai`,
  `04-automation`, `05-rag`, `06-open-source`, `07-why-art-matters`, `17-prosperity-paradox`),
  Lexicon (static single link to the index, not enumerated — ~500 entries), Elsewhere
  (LinkedIn/X/Medium/altway.in).
- Verify: `grep -c 'application/ld+json' public/about/index.html` → 1, nowhere else.
  `cat public/llms.txt` reads clean. `grep -c '"telephone"\|"address"' public/about/index.html` → 0.

### Human/Machine toggle (About page) — ✅ DONE, verified, committed (`49f4954`)

Fixed top-right rectangle toggle (`HUMAN / MACHINE`, `/` divider — **do not restyle this,
user explicitly locked the visual design**). Machine mode is a full black-page takeover:
sidebars/breadcrumbs/article hidden, page shows the page's own stripped JSON-LD + raw
markdown body, centered, monospace, with a copy button.

- New: `quartz/components/HumanMachineToggle.tsx`,
  `quartz/components/scripts/humanMachineToggle.inline.ts`,
  `quartz/components/styles/humanMachineToggle.scss`
- New: `quartz/util/jsonLd.ts` (shared with `Head.tsx` — extracted, not duplicated)
- New transformer in `quartz.ts`: `CaptureRawContent` — captures the About page's raw
  markdown body (frontmatter stripped) into `fileData.rawContent`, scoped to
  `slug === "about/index"` only (not every page)
- Changed: `quartz.ts` — wired into **both** `beforeBodyContent` and `beforeBodyList` (see
  `lessons.md` re: folder page type), `.center { grid-area: grid-center }` pinned
  unconditionally
- Went through three real CSS bugs before landing (grid reflow, visibility bleed-through,
  flex-property snap) — full detail in `lessons.md`, don't re-debug from scratch if something
  regresses here, check that file first.
- Transition duration: 0.5s, sequenced exit (see `machine-mode`/`machine-content` split in
  `lessons.md`). Entering is a single simultaneous transition (confirmed to already look
  right); exiting is two-staged in JS.

**User feedback already incorporated**: full-page black takeover (not a modal/card), no
borders anywhere, toggle stays pixel-identical in both states, copy button styled like the
toggle's own plain-text buttons (no border/box), sequenced exit transition, flex-property
snap fixed. As of the last check-in, user said "almost perfect" pending the flex-snap fix —
that fix is applied but not yet re-confirmed by the user in a live browser.

---

## Git state

All feature work above (H1/JSON-LD/llms.txt, Human/Machine toggle, comments/fonts/giscus
restyle) is committed and pushed to `main` (`36e02f3`, `49f4954`, `bc3ef73`, `24bc0f0`) and
live on `zshanpatel.github.io`. This repo deploys live on push to `main` — confirm with the
user before pushing, every time; don't treat a prior approval as standing permission.

## Closing a session

1. Make sure this file (`tasks.md`) is current — if it's been kept live during the session,
   this should already be true, not a big reconciliation pass.
2. Update `log.md` (terse chronology) and `lessons.md` (any hard-won, non-obvious facts) if
   this session produced either.
3. Only then, write/append the narrative entry in the vault's
   `06 Metadata/Session History/YYYY-MM-DD - Topic.md` — that's the retrospective compression
   of what this file already tracks live, not a separate source of truth. See `AGENTS.md`'s
   "After working here" section for the exact format.

## If picking this up cold (no memory of this session)

Read in this order: this file (what exists, what's active) → `lessons.md` (why it's built the
way it is, so you don't re-break it) → `log.md` (chronology, only if you need the narrative).
`plan.md` has original design rationale for anything with a real architectural decision behind
it, if you need more depth than `lessons.md` covers.
