# Session Log

Chronological journal of work done in this repo, one entry per session. Newest on top.
For narrative "why" context, see the vault's own `06 Metadata/Session History/` — this file
is the terse, in-repo, engineering-focused counterpart, kept here so a fresh session doesn't
need vault access just to know what happened last.

---

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
