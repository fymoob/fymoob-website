"use client"

import { useEffect, useState } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { getSavedSearch, saveSearch, removeSavedSearch, buildSearchLabel } from "@/lib/saved-search"

export function SaveSearchButton() {
  const searchParams = useSearchParams()
  const [isSaved, setIsSaved] = useState(false)

  const currentQuery = searchParams.toString()

  useEffect(() => {
    const saved = getSavedSearch()
    setIsSaved(saved?.query === currentQuery && currentQuery !== "")
  }, [currentQuery])

  // Only show if there are active filters
  if (!currentQuery) return null

  const handleToggle = () => {
    if (isSaved) {
      removeSavedSearch()
      setIsSaved(false)
    } else {
      const label = buildSearchLabel(searchParams)
      saveSearch(currentQuery, label)
      setIsSaved(true)
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:border-brand-primary hover:text-brand-primary"
    >
      {isSaved ? (
        <>
          <BookmarkCheck className="size-3.5 text-brand-primary" />
          Busca salva
        </>
      ) : (
        <>
          <Bookmark className="size-3.5" />
          Salvar busca
        </>
      )}
    </button>
  )
}
