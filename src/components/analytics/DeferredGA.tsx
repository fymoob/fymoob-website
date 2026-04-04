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
      gtag("js", new Date())
      gtag("config", gaId, { page_path: window.location.pathname })

      // Cleanup listeners
      events.forEach((e) => window.removeEventListener(e, load))
    }

    const events = ["scroll", "click", "touchstart", "keydown", "mousemove"]
    events.forEach((e) =>
      window.addEventListener(e, load, { once: true, passive: true })
    )

    // Fallback: load after 5 seconds even without interaction
    const timer = setTimeout(load, 5000)

    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, load))
    }
  }, [gaId])

  return null
}
