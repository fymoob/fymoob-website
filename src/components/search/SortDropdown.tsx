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
    <div className="flex items-center gap-2">
      <ArrowUpDown className="size-4 text-neutral-400 hidden sm:block" />
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
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
