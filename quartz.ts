import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { componentRegistry } from "./quartz/components/registry"
import { PageTypeDispatcher } from "./quartz/plugins/pageTypes"
import { LlmsTxt } from "./quartz/plugins/emitters"
import type { Root } from "mdast"
import type { VFile } from "vfile"

import Flex from "./quartz/components/Flex"
import MobileOnly from "./quartz/components/MobileOnly"
import DesktopOnly from "./quartz/components/DesktopOnly"
import ConditionalRender from "./quartz/components/ConditionalRender"
import Darkmode from "./quartz/components/Darkmode"
import Footer from "./quartz/components/Footer"
import VisuallyHiddenTitle from "./quartz/components/VisuallyHiddenTitle"
import HumanMachineToggle from "./quartz/components/HumanMachineToggle"

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
import { Comments } from "@quartz-community/comments"

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

// Human/Machine toggle, About page only — self-contained in HumanMachineToggle.tsx + its
// script/style files; to remove the feature, delete those 3 files, this const, and every
// reference to it below (both beforeBody arrays, plus the CaptureRawContent transformer).
// About/index.md is a folder-index page (its slug ends in "/index"), which the content-page
// plugin's matcher excludes — it's dispatched to the "folder" page type instead, hence this
// needs to be wired into beforeBodyList below, not just beforeBodyContent.
const humanMachineToggle = ConditionalRender({
  component: HumanMachineToggle(),
  condition: (p) => p.fileData.slug === "about/index",
})

const beforeBodyContent = [
  ConditionalRender({ component: Breadcrumbs(), condition: (p) => p.fileData.slug !== "index" }),
  ConditionalRender({ component: ArticleTitle(), condition: (p) => p.fileData.slug !== "index" }),
  // Homepage skips the visible title by design (straight into the hero image), but still needs
  // exactly one real <h1> for SEO/agent-legibility — rendered off-screen instead (see T-31).
  ConditionalRender({ component: VisuallyHiddenTitle(), condition: (p) => p.fileData.slug === "index" }),
  ConditionalRender({ component: ContentMeta(), condition: (p) => p.fileData.slug !== "index" }),
  humanMachineToggle,
]

// No ContentMeta here — date/reading-time isn't meaningful on folder/tag index listings.
const beforeBodyList = [Breadcrumbs(), ArticleTitle(), humanMachineToggle]

// Giscus comments, Essays only. Essays live flat under content/Essays (no index.md), so a bare
// "essays/" prefix can't accidentally match a folder-index page — the auto-generated Essays
// listing page's slug is just "essays", which doesn't match. See quartz.config.yaml for the
// (disabled) YAML-declared version of this plugin and why it's wired here instead.
const afterBody = [
  ConditionalRender({
    component: Comments({
      provider: "giscus",
      options: {
        repo: "zshanpatel/zshanpatel.github.io",
        repoId: "R_kgDOPv1PKQ",
        category: "Announcements",
        categoryId: "DIC_kwDOPv1PKc4DEJbW",
        lang: "en",
        strict: true,
        reactionsEnabled: true,
      },
    }),
    condition: (p) => (p.fileData.slug ?? "").startsWith("essays/"),
  }),
]

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
    afterBody,
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
config.plugins.emitters.push(LlmsTxt())

// Human/Machine toggle support: captures the About page's raw markdown body (frontmatter
// stripped — the jsonLD block inside it isn't safe to show verbatim, see stripRestrictedJsonLd)
// into fileData.rawContent, which HumanMachineToggle.tsx reads. Part of the same removable
// feature as the ConditionalRender above — delete this block too if reverting it.
config.plugins.transformers.unshift({
  name: "CaptureRawContent",
  markdownPlugins: () => [
    () => (tree: Root, file: VFile) => {
      if (file.data.slug !== "about/index") return
      const first = tree.children[0]
      if (first?.type === "yaml" && typeof first.position?.end.offset === "number") {
        file.data.rawContent = String(file.value)
          .slice(first.position.end.offset)
          .replace(/^\n+/, "")
      } else {
        file.data.rawContent = String(file.value).replace(/^---\n[\s\S]*?\n---\n?/, "")
      }
    },
  ],
})

export default config
