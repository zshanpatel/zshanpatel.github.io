# Plan

Design rationale for work in this repo, kept here because Claude Code's own plan-mode files
live outside the repo (`~/.claude/plans/`) and aren't guaranteed to survive into a future
session. This is the durable version — read this instead of trying to find that file.

---

## Human/Machine toggle — design rationale

**Why it exists**: user's idea, inspired by parallel.ai's own Human/Machine toggle (confirmed
live via `browser-harness` — theirs fully swaps the page for a dark monospace raw-markdown
dump with a copy button). Dramatizes the human-readable-vs-machine-readable duality that the
About page already has substantively (resume prose + Person JSON-LD), by making it visible.

**Scope decision**: content-area-only swap, not a full alternate route/page-type mimicking
parallel's literal `/ai` sub-route. Reasoning: `pageBody` (the `<article>`) can't be
intercepted or replaced from `quartz.ts` — it's hardcoded per page-type plugin
(`@quartz-community/content-page`, an installed npm package, dist-only, not locally
patchable). Building a whole second page-type/route was judged not worth it for a personal-site
novelty feature; a `beforeBody`-injected sibling component achieves the same visual effect.

**Where the toggle button lives in the DOM**: rendered via `beforeBody` (both
`beforeBodyContent` and `beforeBodyList` — see `lessons.md` re: why both are needed), which
places it inside `.page-header .popover-hint`, a sibling *above* the actual article, not
wrapping it. This is why hiding/showing the article requires a separate CSS rule
(`.center article`, deliberately a descendant selector not a child combinator — the article
is nested two levels deep on folder-type pages) rather than the toggle "containing" the
article.

**Data flow**: `HumanMachineToggle.tsx` reads two things at render time, no client-side
fetching needed:
1. `fileData.frontmatter?.jsonLD` (existing mechanism, shared with `Head.tsx` via
   `quartz/util/jsonLd.ts`) — stripped of `telephone`/`address` before display.
2. `fileData.rawContent` — new, populated by a custom transformer (`CaptureRawContent` in
   `quartz.ts`) that captures the raw markdown body (frontmatter YAML block excised using the
   parsed frontmatter node's real end-offset, not a regex — see `lessons.md`-adjacent
   reasoning: a naive regex could truncate early if a YAML value ever contains a literal `---`
   line). Scoped to `slug === "about/index"` only, so it doesn't bloat every page's `fileData`.

**Privacy**: raw markdown body has no PII (it's the visible resume prose), so only the
frontmatter block needs excising — the JSON-LD shown alongside it is the *already-stripped*
version, not a second, separate redaction pass. One stripping mechanism
(`stripRestrictedJsonLd`), reused everywhere `jsonLD` frontmatter is ever rendered.

**Transition architecture** (the part that took three debugging passes — see `lessons.md` for
the actual bugs):
- `.center`'s own layout mode (grid-area, display) never changes between states — only
  content *inside* it fades. Layout-mode properties (`display`, `grid-area`,
  `flex-direction`) cannot be smoothly interpolated by CSS transitions at all, so anything
  that switches layout mode mid-transition will always read as a jarring instant snap
  regardless of how the opacity is handled.
- `.machine-view` is its own `min-height: 100vh` flex-centering container (not `.center`) —
  keeps `.center` untouched, per the above.
- Two separate body classes: `machine-mode` (background/sidebar/breadcrumbs/article — the
  "structural" stuff, some of which has zero transition capability, e.g. the sidebar) and
  `machine-content` (just `.machine-view`'s own fade). Entering adds both at once (verified
  fine — only one thing is appearing, the text). Leaving is sequenced in JS: drop
  `machine-content` first, wait for its 0.5s fade to actually finish (`setTimeout`, duration
  matched to the CSS), *then* drop `machine-mode` — so the instant-snap sidebar reveal never
  visually collides with the still-fading machine text.
- Every property that must hold constant across the toggle (flex alignment, grid placement)
  is declared in the **unscoped base rule**, never only inside the scoped "active" block —
  see `lessons.md` for why this specific mistake caused a visible left-jerk twice in this
  session before being generalized as a rule.

**Locked design decisions — do not silently change these**:
- Toggle shape/position: fixed top-right rectangle, sharp corners, `/` divider, identical
  pixel position and colors in both states. User explicitly locked this after earlier pill-
  shaped iterations were rejected.
- Machine mode: full black takeover, no visible card/border/modal chrome anywhere. Text
  centered, no box around it.
- Copy button: no border/background box — plain text treatment matching the toggle's own
  buttons (dim by default, brightens on hover).

## T-20 llms.txt — design rationale (brief)

Chosen to be **build-time generated**, not a static file, specifically because the user asked
for it to "self-evolve as we keep updating the blog." Essay inclusion is opt-in
(`llmsTxt: true` frontmatter) rather than "all non-draft essays," because a first unfiltered
pass surfaced several essays with tone unsuited to a page sitting next to structured resume
data meant for ATS/agent consumption — see `tasks.md`'s Shipped section for the exact essays
currently opted in.
