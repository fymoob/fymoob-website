"use client"

import { useEffect, type Dispatch, type SetStateAction } from "react"
import { X, Search, Bath, Car, BedDouble, Maximize2, Hash, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { SearchDraftFilters, PriceBounds } from "./search-state"
import { FilterSection } from "./FilterSection"
import {
  AreaRangeInput,
  CaracteristicasCheckboxes,
  NumberSelector,
} from "./AdvancedFields"

interface AdvancedFiltersModalProps {
  open: boolean
  onClose: () => void
  pendingFilters: SearchDraftFilters
  setPendingFilters: Dispatch<SetStateAction<SearchDraftFilters>>
  priceBounds: PriceBounds
  onApply: () => void
  onClear: () => void
  resultCount?: number
}

export function AdvancedFiltersModal({
  open,
  onClose,
  pendingFilters,
  setPendingFilters,
  onApply,
  onClear,
  resultCount,
}: AdvancedFiltersModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = "" }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  const toggleCaracteristica = (label: string) => {
    setPendingFilters((c) => ({
      ...c,
      caracteristicas: c.caracteristicas.includes(label)
        ? c.caracteristicas.filter((x) => x !== label)
        : [...c.caracteristicas, label],
    }))
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col bg-white shadow-2xl max-md:h-full max-md:max-h-full max-md:max-w-full md:mx-4 md:rounded-2xl">

        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-neutral-900">Mais filtros</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Fechar filtros"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {/* Características — collapsed (long list) */}
          <FilterSection
            title="Características"
            icon={Sparkles}
            activeCount={pendingFilters.caracteristicas.length}
            selectionSummary={
              pendingFilters.caracteristicas.length > 0
                ? pendingFilters.caracteristicas.slice(0, 3).join(", ")
                : null
            }
          >
            <CaracteristicasCheckboxes
              selected={pendingFilters.caracteristicas}
              onToggle={toggleCaracteristica}
            />
          </FilterSection>

          {/* Suítes */}
          <FilterSection
            title="Suítes"
            icon={BedDouble}
            activeCount={pendingFilters.suitesMin ? 1 : 0}
            selectionSummary={pendingFilters.suitesMin ? `${pendingFilters.suitesMin}+ suítes` : null}
          >
            <NumberSelector
              value={pendingFilters.suitesMin}
              onChange={(v) => setPendingFilters((c) => ({ ...c, suitesMin: v }))}
            />
          </FilterSection>

          {/* Banheiros */}
          <FilterSection
            title="Banheiros"
            icon={Bath}
            activeCount={pendingFilters.banheirosMin ? 1 : 0}
            selectionSummary={pendingFilters.banheirosMin ? `${pendingFilters.banheirosMin}+ banheiros` : null}
          >
            <NumberSelector
              value={pendingFilters.banheirosMin}
              onChange={(v) => setPendingFilters((c) => ({ ...c, banheirosMin: v }))}
            />
          </FilterSection>

          {/* Vagas */}
          <FilterSection
            title="Vagas de garagem"
            icon={Car}
            activeCount={pendingFilters.vagasMin ? 1 : 0}
            selectionSummary={pendingFilters.vagasMin ? `${pendingFilters.vagasMin}+ vagas` : null}
          >
            <NumberSelector
              value={pendingFilters.vagasMin}
              onChange={(v) => setPendingFilters((c) => ({ ...c, vagasMin: v }))}
            />
          </FilterSection>

          {/* Área privativa */}
          <FilterSection
            title="Área privativa (m²)"
            icon={Maximize2}
            activeCount={(pendingFilters.areaMin ? 1 : 0) + (pendingFilters.areaMax ? 1 : 0)}
            selectionSummary={
              pendingFilters.areaMin || pendingFilters.areaMax
                ? `${pendingFilters.areaMin || "0"} a ${pendingFilters.areaMax || "—"} m²`
                : null
            }
          >
            <AreaRangeInput
              minValue={pendingFilters.areaMin}
              maxValue={pendingFilters.areaMax}
              onMinChange={(v) => setPendingFilters((c) => ({ ...c, areaMin: v }))}
              onMaxChange={(v) => setPendingFilters((c) => ({ ...c, areaMax: v }))}
            />
          </FilterSection>

          {/* Código */}
          <FilterSection
            title="Código do imóvel"
            icon={Hash}
            activeCount={pendingFilters.codigo ? 1 : 0}
            selectionSummary={pendingFilters.codigo || null}
          >
            <Input
              value={pendingFilters.codigo}
              onChange={(e) =>
                setPendingFilters((c) => ({ ...c, codigo: e.target.value }))
              }
              placeholder="Ex: AP00296"
              className="h-10 max-w-xs rounded-xl text-sm"
            />
          </FilterSection>
        </div>

        {/* ── Footer ── */}
        <div className="sticky bottom-0 flex shrink-0 items-center justify-between border-t border-neutral-100 bg-white px-6 py-4">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-700"
          >
            Limpar tudo
          </button>
          <button
            type="button"
            onClick={() => {
              onApply()
              onClose()
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-primary-hover"
          >
            <Search className="size-4" />
            {resultCount !== undefined
              ? `Mostrar ${resultCount} imóveis`
              : "Aplicar filtros"}
          </button>
        </div>
      </div>
    </div>
  )
}
