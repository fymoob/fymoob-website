"use client"

import { useEffect, useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

export function ScrollToTop() {
  const pathname = usePathname()

  // Disable browser scroll restoration
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  // Scroll to top before paint on route change
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
