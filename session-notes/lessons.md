# Lessons

Hard-won, non-obvious facts about this specific codebase. Read before touching layout,
page-type dispatch, or any state-toggling CSS/JS. Each of these cost real debugging time —
don't re-derive them.

---

## Page-type dispatch is not what the folder structure suggests

`content-page`'s matcher (`@quartz-community/content-page`) excludes any slug ending in
`/index`. That means every folder-index page (`About/index.md`, `Essays/index.md`, etc.) is
dispatched to the **"folder" page type**, not "content" — and folder/tag pages use a
completely different layout array in `quartz.ts` (`beforeBodyList`, not `beforeBodyContent`).

**Symptom if you get this wrong**: a component wired into `beforeBodyContent` simply never
renders on `/about/` (or any other folder-index page) — no error, it's just silently absent.
Check which page type a slug actually resolves to before wiring a new component; don't assume
from the file's folder location.

## CSS Grid auto-placement + `display:none` reflow

The site's `#quartz-body` grid uses `grid-template-areas` with 3 columns
(`320px auto 320px`). `.center` (the main content column) is not itself given an explicit
`grid-area` in the normal render path — its position only holds because sidebar elements
occupy the other two columns via their own explicit `grid-area`. If you hide a sidebar with
`display:none`, it's removed from grid auto-placement entirely, and `.center` (or whatever
relies on auto-placement) can reflow into the now-empty column.

**Fix**: pin `grid-area` explicitly on anything whose position must not depend on sibling
visibility — don't rely on auto-placement "just working" once you start hiding grid siblings.

## `visibility:hidden` is not a safe substitute for `display:none`

`visibility` is inherited, but a descendant can explicitly reset it back to `visible` —
and something in this codebase does: the Explorer's own "open folder" CSS sets
`visibility: visible` on expanded folder contents, which breaks inheritance from an ancestor
`visibility: hidden` and lets sidebar text bleed back through, visibly, even though the
ancestor is correctly hidden.

**Fix**: use `display: none` for anything that must be unconditionally hidden regardless of
what's inside it. `visibility` only works if you're certain no descendant re-asserts it.

## Properties not listed in `transition:` snap instantly — even mid-animation

If a property (e.g. `flex-direction`, `align-items`, `justify-content`, `grid-area`) is only
declared inside a scoped/"active" CSS rule and not in the base/unscoped rule, then the instant
that scope stops matching (a class is removed), the property reverts to its CSS default —
**immediately**, with zero transition, even if a *different* property on the same element
(like `opacity`) is actively mid-animation via `allow-discrete`. `transition-behavior: allow-discrete`
only holds the old value of properties actually listed in the `transition` shorthand (typically
just `display`) — it does not extend to unrelated properties that happen to differ between the
old and new matching rule.

**Symptom**: a flex-centered block visibly snaps to the opposite corner/edge the instant a
fade-out begins, even though opacity is smoothly animating.

**Fix**: any property that must stay constant across a state toggle belongs in the **unscoped
base rule**, never only in the scoped "active" block. Same underlying fix needed twice this
session (`.center`'s `grid-area`, `.machine-view`'s `flex-direction`/`align-items`/
`justify-content`) — it's a general pattern, not a one-off.

## `@starting-style` needs an explicit resting-state value on the other side too

`@starting-style { opacity: 0 }` only defines where a transition starts from when an element
newly becomes rendered (`display: none` → something). If the *base* (non-active) rule doesn't
also explicitly declare `opacity: 1` (or whatever the resting value should be), the reverse
direction's target is ambiguous and the fade can silently fail to animate. Declare both ends
explicitly on every crossfaded property, on both the scoped and unscoped rules.

## Sequencing two different transition behaviors needs two classes, not one

If some elements toggle with a real CSS transition (opacity/display via `allow-discrete`) and
others toggle with zero transition (a plain instant `display:none` swap, e.g. the sidebar,
which the base theme doesn't animate at all), putting both under one class toggle means the
instant-swap elements pop into view *while* the transitioning elements are still visibly
mid-fade — a jarring, uncoordinated moment.

**Fix**: split into two classes — one for "things that fade" (e.g. `machine-content`), one for
"things that snap" (e.g. `machine-mode`) — and sequence their removal in JS with a
`setTimeout` matching the fade's actual CSS duration, so the snap only happens after the fade
has visually finished. See `quartz/components/scripts/humanMachineToggle.inline.ts`.

## Testing transitions: screenshots lie, polling needs care

`capture_screenshot()` (browser-harness) reliably captures the **settled end-state**, not a
mid-transition frame — this held even with transition durations artificially slowed to 3s for
testing. To verify an animation is actually interpolating, poll `getComputedStyle(...)` at
controlled `wait()` intervals instead. Even that's sensitive to cumulative CDP round-trip
overhead across several sequential `js()` calls in one script block — if a reading looks
"stuck," re-verify against a generous wait (2s+) before concluding the CSS is broken; it might
just be a timing artifact of the test harness, not the page.

## `.inline.ts` script files need `// @ts-ignore` on the import

Files like `quartz/components/scripts/*.inline.ts` are bundled via a custom esbuild loader
(`quartz/cli/handlers.js`, `inline-script-loader`) that strips `export`/`export default` and
inlines the transpiled source as a string. Plain `tsc` doesn't know about this loader and will
error "is not a module" or "has no default export" on the import line. This is a pre-existing,
harmless repo convention (see `Darkmode.tsx` line 1) — add `// @ts-ignore` above the import,
don't try to "properly" type it.
