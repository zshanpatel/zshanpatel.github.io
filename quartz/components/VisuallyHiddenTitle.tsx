import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// The homepage's design intentionally has no visible title (straight into the hero image),
// but a page still needs exactly one real <h1> for SEO/agent-legibility (see T-31 in vault
// tasks.md) — screen readers and search crawlers both read this fine; sighted users never see it.
const VisuallyHiddenTitle: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (!title) return null
  return <h1 class="visually-hidden-title">{title}</h1>
}

VisuallyHiddenTitle.css = `
.visually-hidden-title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`

export default (() => VisuallyHiddenTitle) satisfies QuartzComponentConstructor
