"use client"

import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  className?: string
}

export function BackButton({ className }: BackButtonProps) {
  return (
    <button
      onClick={() => window.history.back()}
      aria-label="Voltar"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition hover:bg-white",
        className
      )}
    >
      <ChevronLeft className="size-5" />
    </button>
  )
}
