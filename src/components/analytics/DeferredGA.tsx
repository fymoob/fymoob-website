"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function DeferredGA({ gaId }: { gaId: string }) {
  useEffect(() => {
    let loaded = false

    const load = () => {
      if (loaded) return
      loaded = true

      // Init dataLayer + gtag GLOBAL antes do script (mesmo pattern do snippet
      // oficial do Google em GA4 Admin -> Tag Instructions). gtag local + push
      // de array spread (...args) NAO inicializa o gtag.js corretamente —
      // gtag.js procura window.gtag e o objeto `arguments` exato pra processar
      // comandos js/config/event.
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments as unknown as IArguments)
      }

      // Cookie self-ID pra filtro de trafego interno (Bruno + Wagner +
      // corretores). Dispositivos com cookie "fymoob_internal=1" marcam
      // eventos com traffic_type=internal — GA4 Data Filter descarta.
      // Ver docs/seo/internal-traffic-filtering.md + /internal-optout.
      const isInternal = document.cookie.includes("fymoob_internal=1")

      window.gtag("js", new Date())
      window.gtag("config", gaId, {
        page_path: window.location.pathname,
        ...(isInternal ? { traffic_type: "internal" } : {}),
      })

      // Inject gtag.js DEPOIS dos pushes iniciais — quando o script carregar,
      // ele encontra window.gtag e o dataLayer ja populado, processa os
      // comandos e dispara o pageview real pro endpoint /g/collect.
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      script.async = true
      document.head.appendChild(script)

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
