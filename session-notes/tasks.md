# Tasks

Open items for this repo specifically. Cross-reference the vault's own `tasks.md`
(`04 Blog Content` side) for the authoritative, broader task list — this file only tracks
what's actionable *from inside `~/quartz`*, so a session working purely in this repo doesn't
need vault access to know what's next.

---

## Immediate — needs the user

- [ ] **Re-confirm the flex-property-snap fix**: last user message said "almost perfect,
      slight jerk on machine→human" — that was diagnosed and fixed (see `lessons.md`,
      `session-notes/progress.md`) but not yet re-confirmed live by the user. If they report
      it's still off, don't restart from scratch — re-read `lessons.md` first, the bug is
      almost certainly a *new* instance of the same "property only in scoped rule" pattern,
      not something new.
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

## If picking this up cold (no memory of this session)

Read in this order: `progress.md` (what exists) → `lessons.md` (why it's built the way it is,
so you don't re-break it) → this file (what's actually left to do) → `log.md` (chronology, only
if you need the narrative). `plan.md` has the original design rationale for the toggle if you
need to understand a specific CSS decision in more depth than `lessons.md` covers.
