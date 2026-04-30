"use client"

import { useEffect } from "react"

interface WhatsAppTrackerProps {
  empreendimentoNome: string
  bairro?: string
  slug: string
}

/**
 * Global delegated click listener for [data-track="whatsapp_click"] elements
 * in editorial empreendimento pages. Dispatches a GA4 event with source
 * (navbar, intro, saiba_mais, planta, float_mobile, seo_text, final_cta)
 * pra atribuir conversão por posição de CTA na página.
 */
export function WhatsAppTracker({ empreendimentoNome, bairro, slug }: WhatsAppTrackerProps) {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return
      const cta = target.closest('[data-track="whatsapp_click"]')
      if (!cta) return

      const source = cta.getAttribute("data-source") || "unknown"
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      if (typeof gtag === "function") {
        gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: source,
          empreendimento: empreendimentoNome,
          bairro: bairro || "",
          slug,
        })
      }
    }

    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [empreendimentoNome, bairro, slug])

  return null
}
