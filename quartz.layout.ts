import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
  ],
    footer: Component.ConditionalRender({
    component: Component.Footer({
      links: {
        "LinkedIn": "https://linkedin.com/in/zshanpatel",
        "Medium": "https://medium.com/@zeeshanpatel",
        "X": "https://x.com/ucbqzp6"
      },
    }),
    condition: (page) => page.fileData.slug === "index" && !page.fileData.slug.startsWith("thesis/")
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) =>
        page.fileData.slug !== "thesis/01-acknowledgments" &&
        page.fileData.slug !== "index" &&
        page.fileData.slug !== "thesis/10-bibliography" &&
        page.fileData.slug !== "thesis/abbreviations", // Add this condition
    }),
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.TableOfContents()),
      condition: (page) =>
        page.fileData.slug !== "index" &&
        page.fileData.slug !== "thesis/abbreviations", // Add this condition
    }),
    Component.ConditionalRender({
      component: Component.Backlinks(),
      condition: (page) => !page.fileData.slug?.startsWith("thesis/"),
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}