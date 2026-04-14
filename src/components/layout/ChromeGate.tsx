"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Hides public-site chrome (Footer) on routes that have their own layout
 * (admin panel, empreendimento editorial pages).
 *
 * The Header/BottomNav/WhatsAppFloat components already handle this internally
 * via usePathname — but Footer is a server component, so we gate it via this
 * client wrapper.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hidden =
    pathname.startsWith("/admin") || pathname.startsWith("/empreendimento/")
  if (hidden) return null
  return <>{children}</>
}
