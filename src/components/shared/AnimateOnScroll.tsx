// Server Component — pure CSS scroll animations (no JS, no hydration)
// Uses CSS animation-timeline: view() with fallback for unsupported browsers
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  stagger?: boolean
}

export function AnimateOnScroll({ children, className = "", stagger = false }: AnimateOnScrollProps) {
  return (
    <div className={cn("scroll-reveal", stagger && "scroll-reveal-stagger", className)}>
      {children}
    </div>
  )
}
