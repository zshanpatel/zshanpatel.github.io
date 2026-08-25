# Progress

Snapshot of feature/task state in this repo. Update in place when status changes — this is a
current-state file, not a log (see `log.md` for chronology).

---

## T-31 — Homepage `<h1>` — ✅ DONE, verified, uncommitted

Homepage had zero `<h1>` (ArticleTitle unconditionally excluded on `slug === "index"` by
design — no visible title above the hero image). Added a visually-hidden `<h1>` instead of
changing the visible design.

- New: `quartz/components/VisuallyHiddenTitle.tsx`
- Changed: `quartz.ts` (`beforeBodyContent` — `ConditionalRender` for `slug === "index"`)
- Verify: `grep -ci '<h1' public/index.html` → 1. Other pages unaffected (already had their own h1 via `ArticleTitle`).

## T-20 — Person JSON-LD + llms.txt — ✅ DONE, verified, uncommitted

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

## Human/Machine toggle (About page) — ✅ DONE, verified, uncommitted

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

Nothing from this session is committed. All changes are in the working tree. This repo
deploys live to `zshanpatel.github.io` on push to `main` — do not push without an explicit
go-ahead each time (per the user's own stated preference, confirmed across this whole session).
