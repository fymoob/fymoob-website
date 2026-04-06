"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MapPin, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/utils"
import type { GroupedBairroOptions } from "../useSearchBarController"

/* ── Types ── */
interface LocationItem {
  type: "cidade" | "bairro"
  label: string
  slug: string
  cidade?: string
  count: number
}

interface LocationAutocompleteProps {
  groupedBairros: GroupedBairroOptions[]
  cidades: { label: string; slug: string; count: number }[]
  selectedBairros: string[]
  selectedCidades: string[]
  onSelect: (item: LocationItem) => void
  onClose?: () => void
}

/* ── Debounce hook ── */
function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

/* ── Component ── */
export function LocationAutocomplete({
  groupedBairros,
  cidades,
  selectedBairros,
  selectedCidades,
  onSelect,
  onClose,
}: LocationAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebouncedValue(query, 200)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Build flat list of all locations
  const allLocations = useMemo<LocationItem[]>(() => {
    const items: LocationItem[] = []

    // Add cities
    for (const cidade of cidades) {
      items.push({
        type: "cidade",
        label: cidade.label,
        slug: cidade.slug,
        count: cidade.count,
      })
    }

    // Add bairros from groups
    for (const group of groupedBairros) {
      for (const bairro of group.bairros) {
        items.push({
          type: "bairro",
          label: bairro.label,
          slug: bairro.value,
          cidade: group.cidade,
          count: bairro.count,
        })
      }
    }

    return items
  }, [cidades, groupedBairros])

  // Filter results based on query (accent-insensitive)
  const filteredResults = useMemo<LocationItem[]>(() => {
    if (!debouncedQuery.trim()) return []
    const normalize = (s: string) =>
      s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const q = normalize(debouncedQuery.trim())
    return allLocations
      .filter((item) => {
        const inLabel = normalize(item.label).includes(q)
        const inCidade = item.cidade ? normalize(item.cidade).includes(q) : false
        return inLabel || inCidade
      })
      .sort((a, b) => {
        // Cities first, then bairros. Within each, by count desc
        if (a.type !== b.type) return a.type === "cidade" ? -1 : 1
        return b.count - a.count
      })
      .slice(0, 15)
  }, [allLocations, debouncedQuery])

  // Default state: show cities
  const defaultCities = useMemo(
    () => cidades.sort((a, b) => b.count - a.count).slice(0, 8),
    [cidades]
  )

  const isSearching = debouncedQuery.trim().length > 0
  const displayItems = isSearching ? filteredResults : []
  const isEmpty = isSearching && filteredResults.length === 0

  // Check if item is already selected
  const isSelected = useCallback(
    (item: LocationItem) => {
      if (item.type === "cidade") return selectedCidades.includes(item.slug)
      return selectedBairros.includes(item.slug)
    },
    [selectedBairros, selectedCidades]
  )

  // Handle selection
  const handleSelect = useCallback(
    (item: LocationItem) => {
      onSelect(item)
      setQuery("")
      setActiveIndex(-1)
    },
    [onSelect]
  )

  // Keyboard navigation
  const currentList = isSearching ? displayItems : defaultCities.map((c) => ({
    type: "cidade" as const,
    label: c.label,
    slug: c.slug,
    count: c.count,
  }))

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const maxIndex = currentList.length - 1

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
          break
        case "ArrowUp":
          e.preventDefault()
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
          break
        case "Enter":
          e.preventDefault()
          if (activeIndex >= 0 && activeIndex < currentList.length) {
            handleSelect(currentList[activeIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose?.()
          break
      }
    },
    [activeIndex, currentList, handleSelect, onClose]
  )

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0) return
    const list = listRef.current
    if (!list) return
    const item = list.children[activeIndex] as HTMLElement
    if (item) item.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIndex(-1) }}
          onKeyDown={handleKeyDown}
          placeholder="Digite uma cidade ou bairro..."
          className="w-full rounded-lg bg-neutral-100 py-3 pl-10 pr-10 text-sm text-neutral-900 outline-none transition-shadow focus:ring-2 focus:ring-brand-primary"
          role="combobox"
          aria-expanded={displayItems.length > 0 || !isSearching}
          aria-autocomplete="list"
          aria-controls="location-listbox"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(""); setActiveIndex(-1); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-neutral-400 hover:text-neutral-600"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Results list */}
      <div
        ref={listRef}
        id="location-listbox"
        role="listbox"
        className="mt-2 max-h-64 overflow-y-auto"
      >
        {/* State 1: Empty — show default cities */}
        {!isSearching && (
          <>
            <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Cidades disponíveis
            </p>
            {defaultCities.map((cidade, i) => (
              <button
                key={cidade.slug}
                type="button"
                role="option"
                aria-selected={activeIndex === i}
                onClick={() =>
                  handleSelect({
                    type: "cidade",
                    label: cidade.label,
                    slug: cidade.slug,
                    count: cidade.count,
                  })
                }
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors",
                  activeIndex === i
                    ? "bg-neutral-100"
                    : "hover:bg-neutral-50",
                  selectedCidades.includes(cidade.slug) && "text-brand-primary font-medium"
                )}
              >
                <MapPin className="size-4 shrink-0 text-neutral-400" />
                <span className="font-medium text-neutral-900">{cidade.label}</span>
                <span className="ml-auto text-xs text-neutral-400">{cidade.count} imóveis</span>
              </button>
            ))}
          </>
        )}

        {/* State 2: Search results */}
        {isSearching && !isEmpty && (
          <>
            <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
              Resultados
            </p>
            {displayItems.map((item, i) => (
              <button
                key={`${item.type}-${item.slug}`}
                type="button"
                role="option"
                aria-selected={activeIndex === i}
                onClick={() => handleSelect(item)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors",
                  activeIndex === i
                    ? "bg-neutral-100"
                    : "hover:bg-neutral-50",
                  isSelected(item) && "text-brand-primary"
                )}
              >
                <MapPin className="size-4 shrink-0 text-neutral-400" />
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-neutral-900">{item.label}</span>
                  {item.type === "bairro" && item.cidade && (
                    <span className="ml-1.5 text-xs text-neutral-400">
                      {item.cidade} - PR
                    </span>
                  )}
                  {item.type === "cidade" && (
                    <span className="ml-1.5 text-xs text-neutral-400">Cidade</span>
                  )}
                </div>
                <span className="shrink-0 text-xs text-neutral-400">
                  {item.count}
                </span>
              </button>
            ))}
          </>
        )}

        {/* State: No results */}
        {isEmpty && (
          <div className="px-2 py-6 text-center">
            <p className="text-sm text-neutral-400">Nenhuma localização encontrada</p>
            <p className="mt-1 text-xs text-neutral-300">Tente outro nome de cidade ou bairro</p>
          </div>
        )}
      </div>
    </div>
  )
}
