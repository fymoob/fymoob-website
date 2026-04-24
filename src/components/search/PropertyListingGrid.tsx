"use client"

import { type ReactNode, useCallback, useEffect, useState } from "react"
import { Grid3X3, LayoutGrid, List } from "lucide-react"

import { PropertyCardCompact, PropertyCardGrid, PropertyCardList, type PriceContext } from "@/components/property/card"
import { PropertyCard } from "@/components/property/PropertyCard"
import type { Property } from "@/types/property"

interface PropertyListingGridProps {
  properties: Property[]
  total?: number
  totalLabel?: string
  showToolbar?: boolean
  toolbarActions?: ReactNode
  cardContext?: "default" | "search"
  priceContext?: PriceContext
}

const ABOVE_THE_FOLD_PRIORITY_CARDS = 3

type ViewMode = "grid" | "grid3" | "list"

const VIEW_MODE_KEY = "fymoob:viewMode"
const VALID_MODES = new Set<ViewMode>(["grid", "grid3", "list"])

function getSavedViewMode(): ViewMode {
  if (typeof window === "undefined") return "grid"
  try {
    const saved = localStorage.getItem(VIEW_MODE_KEY) as ViewMode | null
    return saved && VALID_MODES.has(saved) ? saved : "grid"
  } catch {
    return "grid"
  }
}

export function ViewToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode
  setViewMode: (value: ViewMode) => void
}) {
  const modes: { value: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
    { value: "grid", icon: LayoutGrid, label: "Grade 2 colunas" },
    { value: "grid3", icon: Grid3X3, label: "Grade 3 colunas" },
    { value: "list", icon: List, label: "Lista" },
  ]

  return (
    <div className="hidden items-center gap-1 rounded-lg border border-neutral-200 p-1 md:flex">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setViewMode(value)}
          className={`rounded-md p-1.5 transition-colors ${viewMode === value ? "bg-brand-primary text-white" : "text-neutral-400 hover:text-neutral-600"}`}
          aria-label={`Visualização em ${label}`}
          aria-pressed={viewMode === value}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}

export function PropertyListingGrid({
  properties,
  total,
  totalLabel = "imóveis",
  showToolbar = true,
  toolbarActions,
  cardContext = "default",
  priceContext = null,
}: PropertyListingGridProps) {
  // Default "grid" no primeiro render pra evitar hydration mismatch
  // (SSR nao tem acesso ao localStorage). useEffect sincroniza com o
  // valor salvo no cliente apos mount. Trade-off: flicker minimo no
  // primeiro load pra usuarios que tinham "list"/"grid3" salvo.
  const [viewMode, setViewModeState] = useState<ViewMode>("grid")
  useEffect(() => {
    const saved = getSavedViewMode()
    if (saved !== "grid") setViewModeState(saved)
  }, [])
  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode)
    try { localStorage.setItem(VIEW_MODE_KEY, mode) } catch {}
  }, [])
  const totalResults = total ?? properties.length
  const showingPartialResults = totalResults > properties.length

  return (
    <div className="space-y-5">
      {showToolbar && (
        <div className="flex flex-col gap-3 px-1 py-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-lg tracking-tight text-slate-600">
              {showingPartialResults ? (
                <>
                  Mostrando{" "}
                  <span className="font-bold text-slate-900">{properties.length}</span>
                  {" de "}
                  <span className="font-bold text-slate-900">{totalResults}</span>
                  {" "}
                  {totalLabel}
                </>
              ) : (
                <>
                  <span className="font-bold text-slate-900">{totalResults}</span>
                  {" "}
                  {totalLabel} encontrados
                </>
              )}
            </p>
            {!showingPartialResults && (
              <p className="text-sm text-neutral-500">Resultados em tempo real.</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            {toolbarActions}
            {properties.length > 0 && (
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            )}
          </div>
        </div>
      )}

      {properties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-14 text-center">
          <p className="text-lg font-medium text-neutral-700">
            Nenhum imóvel encontrado para os filtros atuais.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Ajuste os filtros para ampliar a busca.
          </p>
        </div>
      ) : (
        <section
          aria-live="polite"
          className={
            viewMode === "grid"
              ? "flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6 xl:gap-8"
              : viewMode === "grid3"
                ? "flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6"
                : "flex flex-col gap-4"
          }
        >
          {properties.map((property, index) => {
            if (cardContext === "search" && viewMode === "grid") {
              return (
                <div key={property.slug} className="h-full">
                  {/* Mobile: clean card (model 1). Desktop: search grid card (model 2) */}
                  <div className="md:hidden h-full">
                    <PropertyCard
                      property={property}
                      prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                      compactFeatures
                      priceContext={priceContext}
                    />
                  </div>
                  <div className="hidden md:block h-full">
                    <PropertyCardGrid
                      property={property}
                      prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                      priceContext={priceContext}
                    />
                  </div>
                </div>
              )
            }
            if (cardContext === "search" && viewMode === "grid3") {
              return (
                <div key={property.slug} className="h-full">
                  <div className="md:hidden h-full">
                    <PropertyCard
                      property={property}
                      prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                      compactFeatures
                      priceContext={priceContext}
                    />
                  </div>
                  <div className="hidden md:block h-full">
                    <PropertyCardCompact
                      property={property}
                      prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                      priceContext={priceContext}
                    />
                  </div>
                </div>
              )
            }
            if (cardContext === "search" && viewMode === "list") {
              return (
                <PropertyCardList
                  key={property.slug}
                  property={property}
                  prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                  priceContext={priceContext}
                />
              )
            }
            return (
              <PropertyCard
                key={property.slug}
                property={property}
                prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
                variant={viewMode === "list" ? "horizontal" : "responsive"}
                context={cardContext}
                priceContext={priceContext}
              />
            )
          })}
        </section>
      )}
    </div>
  )
}
