"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { getSavedSearch, type SavedSearch } from "@/lib/saved-search"

export function SavedSearchBanner() {
  const [saved, setSaved] = useState<SavedSearch | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Only show on home page
    if (pathname !== "/") return

    const search = getSavedSearch()
    if (!search) return

    // Only show if search is less than 30 days old
    const daysSinceSaved = (Date.now() - search.timestamp) / (1000 * 60 * 60 * 24)
    if (daysSinceSaved > 30) return

    setSaved(search)
  }, [pathname])

  if (!saved || dismissed || pathname !== "/") return null

  return (
    <div className="border-b border-neutral-100 bg-neutral-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 text-sm text-neutral-600">
          <Search className="size-4 shrink-0 text-brand-primary" />
          <span>
            Sua busca salva: <strong className="text-neutral-800">{saved.label}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/busca?${saved.query}`}
            className="shrink-0 rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Ver resultados
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-600"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
