"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ArrowUpDown, Check } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

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
  const [open, setOpen] = useState(false)

  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === current)?.label || "Mais relevantes"

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("orderBy", value)
    } else {
      params.delete("orderBy")
    }
    params.delete("page")
    router.push(`/busca?${params.toString()}`)
    setOpen(false)
  }

  return (
    <>
      {/* Desktop: native select */}
      <div className="hidden items-center gap-2 sm:flex">
        <ArrowUpDown className="size-4 text-neutral-400" />
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

      {/* Mobile: bottom sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 sm:hidden">
          <ArrowUpDown className="size-3.5" />
          {currentLabel}
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl pb-8">
          <SheetTitle className="px-5 pb-4 pt-2 text-lg font-bold text-neutral-900">
            Ordenar por
          </SheetTitle>
          <div className="space-y-1 px-2">
            {SORT_OPTIONS.map((opt) => {
              const isSelected = opt.value === current
              return (
                <button
                  key={opt.value}
                  onClick={() => handleChange(opt.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base transition ${
                    isSelected
                      ? "bg-brand-primary/10 font-semibold text-brand-primary"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {opt.label}
                  {isSelected && <Check className="size-5 text-brand-primary" />}
                </button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
