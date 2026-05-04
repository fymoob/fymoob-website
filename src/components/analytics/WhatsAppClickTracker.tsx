"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Listener global delegado pra todos os cliques em [data-track="whatsapp_click"].
 * Dispatch evento GA4 `whatsapp_click` com:
 * - data-source (obrigatorio, ex: "float", "footer", "card", "hero_primary")
 * - data-property (opcional, ex: "AP00772" — codigo do imovel)
 * - data-empreendimento (opcional, ex: "Reserva Barigui")
 * - data-bairro (opcional)
 * - page_path (auto, do pathname)
 *
 * Substitui o legacy WhatsAppTracker que estava acoplado a paginas de
 * empreendimento. Desde 04/05/2026 vive no layout root pra capturar TODOS
 * os botoes WhatsApp do site (Float, Footer, LandingSEOContent, etc).
 *
 * Pre-requisito: botoes/links com `<a data-track="whatsapp_click" data-source="...">`.
 */
export function WhatsAppClickTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const cta = target.closest('[data-track="whatsapp_click"]') as HTMLElement | null
      if (!cta) return

      const source = cta.dataset.source || "unknown"
      const property = cta.dataset.property
      const empreendimento = cta.dataset.empreendimento
      const bairro = cta.dataset.bairro

      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
      if (typeof gtag === "function") {
        gtag("event", "whatsapp_click", {
          event_category: "engagement",
          event_label: source,
          page_path: pathname,
          ...(property ? { property_code: property } : {}),
          ...(empreendimento ? { empreendimento } : {}),
          ...(bairro ? { bairro } : {}),
        })
      }

      // Tambem empurra pro dataLayer (compat com GTM se um dia usar)
      const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer
      if (Array.isArray(dl)) {
        dl.push({
          event: "whatsapp_click",
          source,
          page_path: pathname,
          ...(property ? { property_code: property } : {}),
          ...(empreendimento ? { empreendimento } : {}),
          ...(bairro ? { bairro } : {}),
        })
      }
    }

    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [pathname])

  return null
}
