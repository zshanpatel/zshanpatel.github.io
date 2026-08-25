// @ts-ignore — same as Darkmode.tsx: .inline.ts files are bundled via a custom esbuild
// loader (quartz/cli/handlers.js) that plain tsc doesn't know about.
import humanMachineToggleScript from "./scripts/humanMachineToggle.inline"
import styles from "./styles/humanMachineToggle.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { stripRestrictedJsonLd } from "../util/jsonLd"

// Only reached on the page(s) this is wired to in quartz.ts (currently just the About
// page) — so `.human-machine-toggle`/`.machine-view` never exist in the DOM elsewhere,
// and the afterDOMLoaded script below is a no-op on every other page.
const HumanMachineToggle: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const jsonLd = stripRestrictedJsonLd(
    fileData.frontmatter?.jsonLD as Record<string, unknown> | undefined,
  )
  const jsonLdBlock = jsonLd ? JSON.stringify(jsonLd, null, 2) : ""
  const rawContent = (fileData.rawContent as string | undefined) ?? ""

  return (
    <>
      <div class="human-machine-toggle">
        <button class="hm-human" aria-pressed="true">
          Human
        </button>
        <span class="hm-divider" aria-hidden="true">
          /
        </span>
        <button class="hm-machine" aria-pressed="false">
          Machine
        </button>
      </div>
      <div class="machine-view">
        <div class="mv-content">
          <button class="hm-copy">Copy</button>
          <pre>
            <code>
              {jsonLdBlock}
              {jsonLdBlock && rawContent ? "\n\n" : ""}
              {rawContent}
            </code>
          </pre>
        </div>
      </div>
    </>
  )
}

HumanMachineToggle.afterDOMLoaded = humanMachineToggleScript
HumanMachineToggle.css = styles

export default (() => HumanMachineToggle) satisfies QuartzComponentConstructor
