import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Home",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://zshanpatel.github.io", // your live site URL
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Merriweather",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#f0f0f0",
          lightgray: "#e0e0e0",
          gray: "#666666",
          darkgray: "#333333",
          dark: "#333333",
          secondary: "#606060",
          tertiary: "#c0c0c0",
          highlight: "rgba(96, 96, 96, 0.15)",
          textHighlight: "#c0c0c0",
        },
        darkMode: {
          light: "#1a1a1a",
          lightgray: "#303030",
          gray: "#a8a8a8",
          darkgray: "#d9d9d9",
          dark: "#f0f0f0",
          secondary: "#c0c0c0",
          tertiary: "#404040",
          highlight: "rgba(160, 160, 160, 0.15)",
          textHighlight: "#404040",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.Citations({
        bibliographyFile: "./references.bib",
        linkCitations: true,
        suppressBibliography: false,
      }),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown({
        linkHeadings: true,
        enableSmartyPants: true,
      }),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: (a, b) => {
          // Get file names or paths (depending on how your structure is)
          const nameA = a.slug ?? a.filePath ?? "";
          const nameB = b.slug ?? b.filePath ?? "";
      
          // Compare numerically if prefixes like 00-, 01-, 02- exist
          return nameA.localeCompare(nameB, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        },
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
