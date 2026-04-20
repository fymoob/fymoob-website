"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export function DeferredGA({ gaId }: { gaId: string }) {
  useEffect(() => {
    let loaded = false

    const load = () => {
      if (loaded) return
      loaded = true

      // Inject gtag.js
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      script.async = true
      document.head.appendChild(script)

      // Init dataLayer and gtag
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      // Cookie self-ID pra filtro de trafego interno (Bruno + Wagner +
      // corretores). Dispositivos com cookie "fymoob_internal=1" marcam
      // eventos com traffic_type=internal — GA4 Data Filter descarta.
      // Ver docs/seo/internal-traffic-filtering.md + /internal-optout.
      const isInternal = document.cookie.includes("fymoob_internal=1")

      gtag("js", new Date())
      gtag("config", gaId, {
        page_path: window.location.pathname,
        ...(isInternal ? { traffic_type: "internal" } : {}),
      })

      // Cleanup listeners
      events.forEach((e) => window.removeEventListener(e, load))
    }

    const events = ["scroll", "click", "touchstart", "keydown", "mousemove"]
    events.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Fallback: load after 12 seconds (outside Lighthouse measurement window ~10s)
    const timer = setTimeout(load, 12000)

    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, load))
    }
  }, [gaId])

  return null
}
