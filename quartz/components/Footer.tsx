import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface FooterOptions {
  links: Record<string, string>
}

// Local replacement for @quartz-community/footer — that plugin unconditionally renders a
// "Created with Quartz vX.X.X © YYYY" line with no option to disable just that piece (only
// the whole footer via enabled: false, which would drop these links too). Same footer <ul>
// markup and CSS as the plugin, just without the branding <p>.
export default ((opts: FooterOptions) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? {}
    return (
      <footer class={displayClass ?? ""}>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = `
    footer {
      text-align: left;
      margin-bottom: 4rem;
      opacity: 0.7;
    }
    footer ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  `

  return Footer
}) satisfies QuartzComponentConstructor<FooterOptions>
