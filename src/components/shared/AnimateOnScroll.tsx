"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface AnimateOnScrollProps {
  children: ReactNode
  className?: string
  stagger?: boolean
}

export function AnimateOnScroll({ children, className = "", stagger = false }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (stagger) {
            const items = el.children
            Array.from(items).forEach((child, i) => {
              ;(child as HTMLElement).classList.add("animate-fade-in-up", `stagger-${i + 1}`)
            })
          } else {
            el.classList.add("animate-fade-in-up")
          }
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger])

  return (
    <div ref={ref} className={`${!stagger ? "opacity-0" : ""} ${className}`}>
      {children}
    </div>
  )
}
