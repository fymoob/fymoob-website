"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpDown } from "lucide-react"

const SORT_OPTIONS = [
  { value: "", label: "Mais relevantes" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
  { value: "area-desc", label: "Maior área" },
  { value: "area-asc", label: "Menor área" },
  { value: "recente", label: "Mais recentes" },
]

// H-20260417-005: <select> nativo tanto mobile quanto desktop.
// Mobile iOS/Android abre o picker nativo otimizado — UX superior ao
// custom bottom sheet. Remove Sheet do @base-ui + useState<open>.
export function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const current = searchParams.get("orderBy") || ""

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("orderBy", value)
    } else {
      params.delete("orderBy")
    }
    params.delete("page")
    router.push(`/busca?${params.toString()}`)
  }

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2">
      <ArrowUpDown className="size-3.5 text-neutral-400 sm:size-4" />
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Ordenar resultados"
        className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
