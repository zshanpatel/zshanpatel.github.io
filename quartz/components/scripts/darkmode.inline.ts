const userPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const currentTheme = localStorage.getItem("theme") ?? userPref
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

// Register animatable CSS properties for smooth interpolation
try {
  if (typeof (window as any).CSS.registerProperty === "function") {
    ;(window as any).CSS.registerProperty({
      name: "--reveal-radius",
      syntax: "<percentage>",
      inherits: false,
      initialValue: "0%",
    })
    ;(window as any).CSS.registerProperty({
      name: "--ray-angle",
      syntax: "<angle>",
      inherits: false,
      initialValue: "105deg",
    })
  }
} catch (e) {}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const root = document.documentElement
    const newTheme = root.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    document.getElementById("godrays-transition-veil")?.remove()

    const applyTheme = () => {
      root.setAttribute("saved-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      emitThemeChangeEvent(newTheme as "light" | "dark")
    }

    if (!(document as any).startViewTransition) {
      applyTheme()
      return
    }

    // Dynamic Origin calculation for the button click
    const button = document.querySelector(".darkmode")
    const rect = button?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : 40
    const y = rect ? rect.top + rect.height / 2 : 40

    document.getElementById("quartz-transition-override")?.remove()
    const style = document.createElement("style")
    style.id = "quartz-transition-override"

    style.innerHTML = `
      ::view-transition-old(root) {
        animation: none !important;
        opacity: 1 !important;
      }
      ::view-transition-group(root),
      ::view-transition-old(root),
      ::view-transition-new(root),
      ::view-transition-new(godrays) {
        pointer-events: none !important;
      }
      ::view-transition-new(root) {
        mask-image: radial-gradient(circle at ${x}px ${y}px, black var(--reveal-radius), transparent calc(var(--reveal-radius) + 25%));
        -webkit-mask-image: radial-gradient(circle at ${x}px ${y}px, black var(--reveal-radius), transparent calc(var(--reveal-radius) + 25%));
        animation: 1.8s cubic-bezier(0.4, 0, 0.2, 1) both theme-bloom !important;
        mix-blend-mode: normal !important;
      }
      ::view-transition-new(godrays) {
        background-image: repeating-conic-gradient(
          from var(--ray-angle, 105deg) at ${x}px ${y}px,
          rgba(255, 250, 240, 0)    0deg,
          rgba(255, 250, 240, 0.45) 8deg,
          rgba(255, 250, 240, 0)    16deg,
          transparent               32deg
        );
        filter: blur(22px);
        mix-blend-mode: screen;
        animation:
          daylight-opacity 1.8s ease-out both,
          daylight-rotate 1.8s linear both;
      }
      @keyframes theme-bloom {
        /* Start at -25% so the feather zone begins at exactly 0 — true point origin */
        from { --reveal-radius: -25%; }
        to { --reveal-radius: 150%; }
      }
    `
    document.head.appendChild(style)

    if (newTheme === "light") {
      // NIGHT → DAY: Run godrays inside the view-transition snapshot
      const veil = document.createElement("div")
      veil.style.position = "fixed"
      veil.style.inset = "0"
      veil.style.opacity = "0"
      veil.style.pointerEvents = "none"
      veil.style.setProperty("view-transition-name", "godrays")
      document.body.appendChild(veil)
      const transition = (document as any).startViewTransition(applyTheme)
      transition.finished.finally(() => {
        veil.remove()
        // Continue beams after transition without blocking clicks
        document.getElementById("godrays-transition-veil")?.remove()
        const afterVeil = document.createElement("div")
        afterVeil.id = "godrays-transition-veil"
        afterVeil.style.setProperty("--ray-origin-x", `${x}px`)
        afterVeil.style.setProperty("--ray-origin-y", `${y}px`)
        document.body.appendChild(afterVeil)
        setTimeout(() => afterVeil.remove(), 8000)
        setTimeout(() => style.remove(), 2500)
      })
    } else {
      const transition = (document as any).startViewTransition(applyTheme)
      transition.finished.finally(() => {
        setTimeout(() => style.remove(), 2500)
      })
    }
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const newTheme = e.matches ? "dark" : "light"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    emitThemeChangeEvent(newTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
