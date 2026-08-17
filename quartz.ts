import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"

import Flex from "./quartz/components/Flex"
import MobileOnly from "./quartz/components/MobileOnly"
import DesktopOnly from "./quartz/components/DesktopOnly"
import ConditionalRender from "./quartz/components/ConditionalRender"
import Darkmode from "./quartz/components/Darkmode"
import Footer from "./quartz/components/Footer"

import { Search } from "@quartz-community/search"
import { ReaderMode } from "@quartz-community/reader-mode"
import { Explorer } from "@quartz-community/explorer"
import { Graph } from "@quartz-community/graph"
import { Backlinks } from "@quartz-community/backlinks"
import { TableOfContents } from "@quartz-community/table-of-contents"
import { Breadcrumbs } from "@quartz-community/breadcrumbs"
import { ArticleTitle } from "@quartz-community/article-title"
import { ContentMeta } from "@quartz-community/content-meta"
import { PageTitle } from "@quartz-community/page-title"
import { Spacer } from "@quartz-community/spacer"

// Thesis pages that opt out of the graph/TOC/backlinks sidebar, ported from v4's quartz.layout.ts.
// v4's condition strings used a "thesis/" slug prefix that never actually matched this content
// folder ("The Research Thesis" → the-research-thesis/... once v5 lowercases slugs), so those
// conditions were already effectively dead in v4 too — using the real slugs here instead.
const GRAPH_EXCLUDED_SLUGS = new Set([
  "the-research-thesis/01-acknowledgments",
  "the-research-thesis/10-bibliography",
  "the-research-thesis/abbreviations",
])
const THESIS_PREFIX = "the-research-thesis/"

// FolderPage's sort option is a callback function that can't be expressed in YAML.
// Ported verbatim from v4's quartz.config.ts (numeric-aware sort so 00-, 01-, 02- prefixes order correctly).
componentRegistry.setOptionOverrides("@quartz-community/folder-page", {
  sort: (a: { slug?: string; filePath?: string }, b: { slug?: string; filePath?: string }) => {
    const nameA = a.slug ?? a.filePath ?? ""
    const nameB = b.slug ?? b.filePath ?? ""
    return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: "base" })
  },
})

// Toolbar row: Search grows to fill space, then Darkmode (our own custom component — see
// quartz/components/Darkmode.tsx — kept local rather than the quartz-community/darkmode plugin,
// which has no configuration options and can't host our custom transition script), then ReaderMode.
const toolbar = Flex({
  components: [
    { Component: Search(), grow: true },
    { Component: Darkmode() },
    { Component: ReaderMode() },
  ],
  direction: "row",
  gap: "0.5rem",
})

const left = [PageTitle(), MobileOnly(Spacer()), toolbar, Explorer()]

const beforeBodyContent = [
  ConditionalRender({ component: Breadcrumbs(), condition: (p) => p.fileData.slug !== "index" }),
  ConditionalRender({ component: ArticleTitle(), condition: (p) => p.fileData.slug !== "index" }),
  ConditionalRender({ component: ContentMeta(), condition: (p) => p.fileData.slug !== "index" }),
]

// No ContentMeta here — date/reading-time isn't meaningful on folder/tag index listings.
const beforeBodyList = [Breadcrumbs(), ArticleTitle()]

const right = [
  ConditionalRender({
    component: Graph({ localGraph: { showTags: false }, globalGraph: { showTags: false } }),
    condition: (p) => !GRAPH_EXCLUDED_SLUGS.has(p.fileData.slug ?? ""),
  }),
  ConditionalRender({
    component: DesktopOnly(TableOfContents()),
    condition: (p) => p.fileData.slug !== "the-research-thesis/abbreviations",
  }),
  ConditionalRender({
    component: Backlinks(),
    condition: (p) => !(p.fileData.slug ?? "").startsWith(THESIS_PREFIX),
  }),
]

const footer = [
  ConditionalRender({
    component: Footer({
      links: {
        "Get in Touch": "https://cal.com/zeeshanpatel",
        Newsletter: "https://tally.so/r/wvkGjv",
        LinkedIn: "https://linkedin.com/in/zshanpatel",
        Medium: "https://medium.com/@zeeshanpatel",
        X: "https://x.com/thezshan",
      },
    }),
    condition: (p) => p.fileData.slug === "index",
  }),
]

export const layout = await loadQuartzLayout({
  defaults: {
    beforeBody: beforeBodyContent,
    left,
    right,
    footer,
  },
  byPageType: {
    folder: { beforeBody: beforeBodyList, left, right: [], footer },
    tag: { beforeBody: beforeBodyList, left, right: [], footer },
  },
})

const config = await loadQuartzConfig()

// loadQuartzConfig() bakes its own PageTypeDispatcher internally using an
// override-less loadQuartzLayout() call, and build.ts/worker.ts only ever read
// the emitter list off `config` (never a separately-exported `layout` binding) —
// so the overridden layout above has to be spliced into the emitter here to
// actually take effect at build time.
config.plugins.emitters = config.plugins.emitters.map((emitter) =>
  emitter.name === "PageTypeDispatcher"
    ? PageTypeDispatcher({ defaults: layout.defaults, byPageType: layout.byPageType })
    : emitter,
)

export default config
