"use client"

import { useEffect, useState, type ReactNode } from "react"

interface DeferredHydrationProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Defers rendering of children until the browser is idle.
 * Server-renders nothing (ssr: true via dynamic import handles this).
 * On client, waits for requestIdleCallback before mounting children.
 */
export function DeferredHydration({ children, fallback = null }: DeferredHydrationProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => setReady(true))
      return () => cancelIdleCallback(id)
    } else {
      const timer = setTimeout(() => setReady(true), 200)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!ready) return <>{fallback}</>
  return <>{children}</>
}
