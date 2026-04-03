"use client"

import { ChevronLeft } from "lucide-react"

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-0.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
    >
      <ChevronLeft className="size-4" />
      Voltar
    </button>
  )
}
