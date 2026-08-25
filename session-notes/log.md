# Session Log

Chronological journal of work done in this repo, one entry per session. Newest on top.
For narrative "why" context, see the vault's own `06 Metadata/Session History/` — this file
is the terse, in-repo, engineering-focused counterpart, kept here so a fresh session doesn't
need vault access just to know what happened last.

---

## 2026-08-25 (later) — Essay comments (giscus), self-hosted fonts, giscus theme fix

Follow-on session, same day. Reviewed the full `quartz-community` plugin ecosystem (58 repos)
for genuinely useful additions — found almost everything already installed, the real work was
enabling/scoping what's already there, not adding more.

**Shipped and live** (commits `bc3ef73`, `24bc0f0`, pushed and deployed):
- Essay comments — `@quartz-community/comments` (giscus), wired directly in `quartz.ts` (not
  YAML-only — see `lessons.md`), scoped to `content/Essays` via a slug-prefix
  `ConditionalRender`. giscus GitHub App installed scoped to just this one repo; Discussions
  enabled via `gh repo edit --enable-discussions`.
- Self-hosted fonts — `theme.cdnCaching: false` in `quartz.config.yaml`. No third-party
  Google Fonts request at runtime; fonts bundled under `/static/fonts/` at build time.
- Giscus theme restyle — `quartz/static/giscus/{light,dark}.css` were pre-existing but stale
  (an old sage-green/steel-blue palette). Rewrote to match the live `theme.colors` palette and
  self-hosted Inter/Merriweather/Fira Code via `@font-face`.
- Cache-partition bug fix — renamed the theme files to `light-v2.css`/`dark-v2.css` after a
  real bug: the widget's cross-origin iframe caches the theme CSS fetch separately from the
  top page, so an in-place edit can serve stale colors with no way to force a refresh. Full
  writeup in `lessons.md` — bump the version suffix on any future theme edit.

**Explicitly not done**: `@quartz-community/explicit-publish` — would require adding
`publish: true` to ~500 content files to avoid emptying the live site (0 currently have it).
Flagged, not attempted.

Full narrative: vault `06 Metadata/Session History/2026-08-25 - Bot Operator Build Nanobot Live
WhatsApp Linked.md`, final `# Session Log:` section (appended after the WhatsApp Calibration
entry — search "Quartz — Essay Comments" if skimming).

## 2026-08-25 — Homepage H1, Person JSON-LD, llms.txt, Human/Machine toggle

Worked T-31 and T-20 from the vault's `tasks.md`, then built a Human/Machine toggle on the
About page (user's idea, inspired by parallel.ai's own toggle).

**Shipped:**
- Homepage `<h1>` fix (was unconditionally excluded) — `VisuallyHiddenTitle.tsx`, wired for
  `slug === "index"` only.
- Person JSON-LD on `/about/`, generic `jsonLD:` frontmatter mechanism (any page can opt in),
  telephone/address stripped at render time regardless of what's authored — `quartz/util/jsonLd.ts`.
- `llms.txt`, build-time generated (`quartz/plugins/emitters/llmsTxt.ts`), not a static file.
  Essays list is opt-in via `llmsTxt: true` frontmatter (curated 7, not all 35 — several essays
  are tonally inappropriate for an ATS-facing discovery file).
- Human/Machine toggle on `/about/` — fixed top-right rectangle, flips the whole page to a
  black terminal view of the JSON-LD + raw markdown body, copy button. Three real CSS bugs
  found and fixed along the way — see `lessons.md`, don't re-derive.

**Not done:** nothing committed/pushed yet (repo deploys live on push to `main`, needs a
separate go-ahead). See `tasks.md` for the exact open items.

Full narrative account (decisions, insights, more detail): vault
`06 Metadata/Session History/2026-08-25 - Bot Operator Build Nanobot Live WhatsApp Linked.md`
(second `# Session Log:` section in that file, appended after an unrelated Bot Operator
session that happened the same day — search for "Quartz" if skimming).
