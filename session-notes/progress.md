# Progress

Snapshot of feature/task state in this repo. Update in place when status changes — this is a
current-state file, not a log (see `log.md` for chronology).

---

## Essay comments (giscus) — ✅ DONE, verified, live

`@quartz-community/comments` wired directly in `quartz.ts` (YAML-only registration doesn't
work in this fork — see `lessons.md`), scoped to `content/Essays` only via a slug-prefix
`ConditionalRender`. giscus GitHub App installed on `zshanpatel/zshanpatel.github.io` only
(not all repos); Discussions enabled on the repo.

- Changed: `quartz.ts` (`Comments()` in the `afterBody` array), `quartz.config.yaml` (entry
  kept `enabled: false`, full `options:` retained for documentation only)
- Verify: `grep -rl giscus public/essays --include=*.html | wc -l` → 34 (every essay, nothing
  else). Live: https://zshanpatel.github.io/essays/01-why-trade

## Self-hosted fonts — ✅ DONE, verified, live

`theme.cdnCaching: false` in `quartz.config.yaml`. Fonts (Inter, Merriweather, Fira Code)
download and bundle under `/static/fonts/` at build time instead of the visitor's browser
fetching from `fonts.googleapis.com`/`fonts.gstatic.com` live.

- Verify: `grep -c "fonts.googleapis.com\|fonts.gstatic.com" public/essays/*/index.html` → 0.
  `ls public/static/fonts | wc -l` → 8 files.

## Giscus theme restyle — ✅ DONE, verified, live

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

## Deferred / explicitly not done (this session)

- **`@quartz-community/explicit-publish`** — would only publish files with `publish: true` in
  frontmatter. Vault has 597 content files, 0 with `publish: true` (91 have `draft: true`
  instead, under the current opt-out `remove-draft` model). Enabling it as-is would empty the
  live site. Would need a deliberate ~500-file frontmatter migration first — not attempted,
  flagged to Zeeshan only.

## T-31 — Homepage `<h1>` — ✅ DONE, verified, committed (`36e02f3`)

Homepage had zero `<h1>` (ArticleTitle unconditionally excluded on `slug === "index"` by
design — no visible title above the hero image). Added a visually-hidden `<h1>` instead of
changing the visible design.

- New: `quartz/components/VisuallyHiddenTitle.tsx`
- Changed: `quartz.ts` (`beforeBodyContent` — `ConditionalRender` for `slug === "index"`)
- Verify: `grep -ci '<h1' public/index.html` → 1. Other pages unaffected (already had their own h1 via `ArticleTitle`).

## T-20 — Person JSON-LD + llms.txt — ✅ DONE, verified, committed (`36e02f3`)

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

## Human/Machine toggle (About page) — ✅ DONE, verified, committed (`49f4954`)

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

## Deferred / explicitly not done

- **⌘K search shortcut** — raised as an aside by the user, explicitly not committed to. Small,
  separate feature (focus the existing sidebar search box). Don't build unless asked.
- **Full vault→repo content sync for About/** — the vault's `About/` folder has been
  restructured (renamed sub-files: `01-s4g.md` vs this repo's `01-s4g-consultancy.md`, etc.)
  ahead of what's synced here. Only the `jsonLD` frontmatter block was hand-copied over this
  session, not the body/link structure. A future full `publish.py` sync will need to reconcile
  this — out of scope here, don't attempt it from this repo.

## Git state

All feature work above (H1/JSON-LD/llms.txt, Human/Machine toggle, comments/fonts/giscus
restyle) is committed and pushed to `main` (`36e02f3`, `49f4954`, `bc3ef73`, `24bc0f0`) and
live on `zshanpatel.github.io`. Only `session-notes/*.md` (this file and its siblings) is
uncommitted as of the last update. This repo deploys live on push to `main` — still confirm
with the user before pushing each time; the two pushes this session were done only after
explicit go-ahead, not as a standing default.
