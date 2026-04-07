"use client"

import { useState } from "react"
import { LayoutGrid, List } from "lucide-react"
import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"

interface PropertyListingGridProps {
  properties: Property[]
  totalLabel?: string
  showToolbar?: boolean
}

const ABOVE_THE_FOLD_PRIORITY_CARDS = 3

export function ViewToggle({ viewMode, setViewMode }: { viewMode: "grid" | "list"; setViewMode: (v: "grid" | "list") => void }) {
  return (
    <div className="hidden items-center gap-1 rounded-lg border border-neutral-200 p-1 md:flex">
      <button
        onClick={() => setViewMode("grid")}
        className={`rounded-md p-1.5 transition-colors ${viewMode === "grid" ? "bg-brand-primary text-white" : "text-neutral-400 hover:text-neutral-600"}`}
        aria-label="Visualização em grade"
      >
        <LayoutGrid className="size-4" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`rounded-md p-1.5 transition-colors ${viewMode === "list" ? "bg-brand-primary text-white" : "text-neutral-400 hover:text-neutral-600"}`}
        aria-label="Visualização em lista"
      >
        <List className="size-4" />
      </button>
    </div>
  )
}

export function PropertyListingGrid({ properties, totalLabel = "imóveis", showToolbar = true }: PropertyListingGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  if (properties.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
        <p className="text-lg text-neutral-500">Nenhum imóvel encontrado para os filtros atuais.</p>
      </div>
    )
  }

  return (
    <div>
      {showToolbar && (
        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
          <p className="text-lg font-medium text-slate-800">
            {properties.length} {totalLabel} encontrados
          </p>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      )}

      <section
        aria-live="polite"
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
            : "flex flex-col gap-5"
        }
      >
        {properties.map((property, index) => (
          <PropertyCard
            key={property.slug}
            property={property}
            prioritizeFirstImage={index < ABOVE_THE_FOLD_PRIORITY_CARDS}
            variant={viewMode === "grid" ? "vertical" : "horizontal"}
          />
        ))}
      </section>
    </div>
  )
}
