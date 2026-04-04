"use client"

import { useState, useEffect } from "react"
import { GitCompareArrows } from "lucide-react"
import { cn } from "@/lib/utils"

const COMPARE_KEY = "fymoob:compare"
const MAX_COMPARE = 3

function getCompareCodes(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(COMPARE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : []
  } catch {
    return []
  }
}

interface CompareButtonProps {
  codigo: string
  size?: "sm" | "md"
}

export function CompareButton({ codigo, size = "md" }: CompareButtonProps) {
  const [isComparing, setIsComparing] = useState(false)

  useEffect(() => {
    const check = () => setIsComparing(getCompareCodes().includes(codigo))
    if ("requestIdleCallback" in window) {
      requestIdleCallback(check)
    } else {
      check()
    }

    window.addEventListener("compare-change", check)
    return () => window.removeEventListener("compare-change", check)
  }, [codigo])

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsComparing((prev) => {
      const next = !prev
      const codes = getCompareCodes()

      if (next) {
        if (codes.length >= MAX_COMPARE) {
          // Remove oldest, add new
          codes.shift()
        }
        codes.push(codigo)
      } else {
        const idx = codes.indexOf(codigo)
        if (idx > -1) codes.splice(idx, 1)
      }

      localStorage.setItem(COMPARE_KEY, JSON.stringify(codes))
      window.dispatchEvent(new Event("compare-change"))
      return next
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all",
        size === "sm" ? "size-7 sm:size-8" : "size-9",
        isComparing
          ? "bg-amber-500 text-white shadow-md"
          : "bg-black/20 text-white/80 backdrop-blur-sm hover:bg-black/40 hover:text-white"
      )}
      aria-label={isComparing ? "Remover da comparação" : "Adicionar à comparação"}
      title={isComparing ? "Remover da comparação" : "Comparar imóvel"}
    >
      <GitCompareArrows className={cn(size === "sm" ? "size-3.5 sm:size-4" : "size-4.5")} />
    </button>
  )
}
