// Keys that should never reach a public page verbatim, even if a page author
// puts them in its `jsonLD:` frontmatter for other purposes (e.g. an ATS
// submission). Applied uniformly by every consumer of `jsonLD` frontmatter —
// the JSON-LD <script> in Head.tsx and the About page's machine-view dump —
// so there's exactly one place deciding what's safe to publish.
const RESTRICTED_JSONLD_KEYS = new Set(["telephone", "address"])

export function stripRestrictedJsonLd(
  raw: Record<string, unknown> | undefined,
): Record<string, unknown> | null {
  if (!raw) return null
  return Object.fromEntries(Object.entries(raw).filter(([k]) => !RESTRICTED_JSONLD_KEYS.has(k)))
}
