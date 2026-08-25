document.addEventListener("nav", () => {
  const toggle = document.querySelector(".human-machine-toggle")
  if (!toggle) return

  const humanBtn = toggle.querySelector<HTMLButtonElement>(".hm-human")
  const machineBtn = toggle.querySelector<HTMLButtonElement>(".hm-machine")

  // Must match .machine-view's opacity transition duration in humanMachineToggle.scss.
  const MACHINE_VIEW_FADE_MS = 500

  // State lives on <body>, not <html> — Quartz's SPA nav morphs <body> against the
  // incoming page's body, so this resets for free the instant you navigate away from
  // this page. An <html> attribute (like Darkmode's saved-theme) would persist across
  // pages that never render this toggle at all, incorrectly hiding their content too.
  let pendingReveal: ReturnType<typeof setTimeout> | undefined

  const setMode = (machine: boolean) => {
    humanBtn?.setAttribute("aria-pressed", String(!machine))
    machineBtn?.setAttribute("aria-pressed", String(machine))

    if (pendingReveal) {
      clearTimeout(pendingReveal)
      pendingReveal = undefined
    }

    if (machine) {
      // Entering: everything moves together — background darkens, sidebar/breadcrumbs
      // hide, article fades out, and the machine text fades in, all at once. This
      // direction already reads fine because there's only one thing appearing (the
      // text) and everything else is just disappearing behind it.
      document.body.classList.add("machine-mode", "machine-content")
    } else {
      // Leaving: sequenced, not simultaneous. Stage 1 — drop machine-content only, so
      // the machine text fades out on its own with the black background/hidden
      // sidebar/hidden article all still exactly as they were. Stage 2, once that fade
      // actually finishes — drop machine-mode too, revealing the sidebar/breadcrumbs
      // and fading the background/article back in, now that there's no longer any
      // machine-text overlay for that to clash with.
      document.body.classList.remove("machine-content")
      pendingReveal = setTimeout(() => {
        document.body.classList.remove("machine-mode")
        pendingReveal = undefined
      }, MACHINE_VIEW_FADE_MS)
    }
  }

  const onHumanClick = () => setMode(false)
  const onMachineClick = () => setMode(true)
  humanBtn?.addEventListener("click", onHumanClick)
  machineBtn?.addEventListener("click", onMachineClick)
  window.addCleanup(() => humanBtn?.removeEventListener("click", onHumanClick))
  window.addCleanup(() => machineBtn?.removeEventListener("click", onMachineClick))

  const copyBtn = document.querySelector<HTMLButtonElement>(".hm-copy")
  const codeEl = document.querySelector(".machine-view pre code")
  const onCopyClick = () => {
    if (!codeEl) return
    navigator.clipboard.writeText(codeEl.textContent ?? "")
  }
  copyBtn?.addEventListener("click", onCopyClick)
  window.addCleanup(() => copyBtn?.removeEventListener("click", onCopyClick))
})
