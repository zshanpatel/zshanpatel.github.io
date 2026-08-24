import { QuartzEmitterPlugin } from "../types"
import { QuartzPluginData } from "../vfile"
import { FullSlug } from "../../util/path"
import { write } from "./helpers"

const ABOUT_LINKS: [name: string, path: string, description: string][] = [
  ["About", "about", "ATS- and agent-legible resume with schema.org Person structured data."],
  [
    "S4G Consultancy",
    "about/s4g-consultancy",
    "Current role: context architecture and AI implementation strategy.",
  ],
  ["Alt Way In", "about/altway-in", "Commodity venture, Brand Director role."],
  ["Hackney", "about/hackney", "Public sector digital transformation consulting."],
]

const ELSEWHERE_LINKS: [name: string, url: string][] = [
  ["LinkedIn", "https://www.linkedin.com/in/zshanpatel/"],
  ["X", "https://x.com/thezshan"],
  ["Medium", "https://medium.com/@zeeshanpatel"],
  ["Alt Way In", "https://altway.in"],
]

export const LlmsTxt: QuartzEmitterPlugin = () => ({
  name: "LlmsTxt",
  async *emit(ctx, content) {
    const baseUrl = ctx.cfg.configuration.baseUrl ?? "example.com"

    const dateOf = (fd: QuartzPluginData) => {
      const d = fd.frontmatter?.date
      return typeof d === "string" ? new Date(d).getTime() : 0
    }

    // Opt-in only: an essay must set `llmsTxt: true` in its own frontmatter to appear here.
    // This file sits next to the Person JSON-LD on an ATS/agent-facing resume page, so nothing
    // publishes to it by default — new essays "self-evolve" into the list only once flagged.
    const essays = content
      .map(([, vfile]) => vfile.data)
      .filter(
        (fd) =>
          fd.slug?.startsWith("essays/") &&
          fd.frontmatter?.draft !== true &&
          fd.frontmatter?.llmsTxt === true &&
          typeof fd.frontmatter?.title === "string",
      )
      .sort((a, b) => dateOf(b) - dateOf(a))

    const lines: string[] = []
    lines.push("# Zeeshan Patel", "")
    lines.push(
      "> Strategy consultant working at the intersection of brand communication, context architecture, and enterprise AI implementation. This site is a personal knowledge garden — resume, essays, and a working lexicon of the frameworks behind the work.",
      "",
    )

    lines.push("## About / Resume")
    for (const [name, path, description] of ABOUT_LINKS) {
      lines.push(`- [${name}](https://${baseUrl}/${path}): ${description}`)
    }
    lines.push("")

    lines.push("## Writing")
    for (const fd of essays) {
      const description = typeof fd.frontmatter?.description === "string" ? fd.frontmatter.description : ""
      lines.push(`- [${fd.frontmatter!.title}](https://${baseUrl}/${fd.slug}): ${description}`)
    }
    lines.push("")

    lines.push("## Lexicon")
    lines.push(
      `- [Lexicon](https://${baseUrl}/lexicon/): a curated, growing glossary of the concepts and frameworks behind this site's writing.`,
    )
    lines.push("")

    lines.push("## Elsewhere")
    for (const [name, url] of ELSEWHERE_LINKS) {
      lines.push(`- [${name}](${url})`)
    }
    lines.push("")

    yield write({ ctx, slug: "llms" as FullSlug, ext: ".txt", content: lines.join("\n") })
  },
})
