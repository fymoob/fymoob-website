"use client"

import { useEffect } from "react"

interface ScrollToTorreProps {
  anchor: string
}

/**
 * Sprint B.7 (03/05/2026) — Scroll automatico pro anchor da torre quando o
 * usuario chega via sub-rota /empreendimento/[hub]/[torre]. Hub e sub-rota
 * compartilham o mesmo HTML (renderizado via re-import do componente do
 * hub) — esta e a unica diferenca de comportamento client-side.
 *
 * Comportamento:
 * - Mount: scroll-to anchor com offset (header sticky).
 * - Scroll suave (smooth) pra evitar jump brusco.
 * - "auto" como fallback se browser nao suporta smooth.
 * - Em prod, IntersectionObserver podia atrasar render. Como anchor e ID
 *   na pagina mesma, scrollIntoView dispara ja com layout pronto.
 */
export function ScrollToTorre({ anchor }: ScrollToTorreProps) {
  useEffect(() => {
    if (typeof window === "undefined") return
    const el = document.getElementById(anchor)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [anchor])

  return null
}
