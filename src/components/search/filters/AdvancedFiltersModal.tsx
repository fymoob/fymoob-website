"use client"

import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import { X, Search, Bath, Car, BedDouble, Maximize2, Hash, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { SearchDraftFilters, PriceBounds } from "./search-state"

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

/* ── Top characteristics shown by default (most universally asked for) ── */
const TOP_CARACTERISTICAS = [
  "Churrasqueira",
  "Piscina",
  "Quintal",
  "Sacada com Churrasqueira",
  "Lareira",
  "Sauna",
  "Espaço Gourmet",
  "Salão de Festas",
  "Playground",
  "Sala Fitness",
  "Piscina Aquecida",
  "Portaria 24h",
] as const

/* ── Full list shown after "Ver mais" is clicked ── */
const MORE_CARACTERISTICAS = [
  "Aceita Pet",
  "Ar Condicionado",
  "Armários Embutidos",
  "Cozinha Planejada",
  "Hidromassagem",
  "Home Theater",
  "Mobiliado",
  "Semi Mobiliado",
  "Suíte Master",
  "Terraço",
  "Vista Panorâmica",
  "Vista para o Mar",
  "Frente Mar",
  "Deck",
  "Reformado",
  "Brinquedoteca",
  "Churrasqueira Coletiva",
  "Coworking",
  "Elevador",
  "Quadra de Esportes",
  "Quadra de Tênis",
  "Salão de Jogos",
  "Spa",
  "Vigilância 24h",
  "Bicicletário",
  "Pet Place",
  "Parque",
] as const

/* ── Number selector with "Tanto faz" explicit option ── */
function NumberSelector({
  label,
  icon: Icon,
  value,
  onChange,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  value: string
  onChange: (v: string) => void
}) {
  const options = ["", "1", "2", "3", "4"]
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <Icon className="size-4 text-neutral-400" />
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt || "any"}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-sm font-medium transition-all",
              value === opt
                ? "bg-brand-primary text-white shadow-sm"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {opt ? `${opt}+` : "Tanto faz"}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Area range input (m2) ── */
function AreaRangeInput({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  label: string
  minValue: string
  maxValue: string
  onMinChange: (v: string) => void
  onMaxChange: (v: string) => void
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-2">
        <Maximize2 className="size-4 text-neutral-400" />
        <span className="text-sm font-semibold text-neutral-700">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <Input
          type="number"
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          placeholder="Min m²"
          className="h-10 rounded-xl text-sm"
        />
        <span className="text-xs text-neutral-400">a</span>
        <Input
          type="number"
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          placeholder="Max m²"
          className="h-10 rounded-xl text-sm"
        />
      </div>
    </div>
  )
}

/* ── Characteristics checkbox grid ── */
function CaracteristicasCheckboxes({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (label: string) => void
}) {
  const [showMore, setShowMore] = useState(false)
  const visible = showMore
    ? [...TOP_CARACTERISTICAS, ...MORE_CARACTERISTICAS]
    : TOP_CARACTERISTICAS

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="size-4 text-neutral-400" />
        <span className="text-sm font-semibold text-neutral-700">
          Características
        </span>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {visible.map((label) => {
          const checked = selected.includes(label)
          return (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(label)}
                className="size-4 cursor-pointer rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
              />
              <span>{label}</span>
            </label>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="mt-4 text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
      >
        {showMore ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  )
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
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col bg-white shadow-2xl max-md:h-full max-md:max-h-full max-md:max-w-full md:mx-4 md:rounded-2xl">

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
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-8">

            {/* Suítes, Banheiros, Vagas — grid 2 cols */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <NumberSelector
                label="Suítes"
                icon={BedDouble}
                value={pendingFilters.suitesMin}
                onChange={(v) => setPendingFilters((c) => ({ ...c, suitesMin: v }))}
              />
              <NumberSelector
                label="Banheiros"
                icon={Bath}
                value={pendingFilters.banheirosMin}
                onChange={(v) => setPendingFilters((c) => ({ ...c, banheirosMin: v }))}
              />
              <NumberSelector
                label="Vagas de garagem"
                icon={Car}
                value={pendingFilters.vagasMin}
                onChange={(v) => setPendingFilters((c) => ({ ...c, vagasMin: v }))}
              />
            </div>

            {/* Área privativa */}
            <AreaRangeInput
              label="Área privativa (m²)"
              minValue={pendingFilters.areaMin}
              maxValue={pendingFilters.areaMax}
              onMinChange={(v) => setPendingFilters((c) => ({ ...c, areaMin: v }))}
              onMaxChange={(v) => setPendingFilters((c) => ({ ...c, areaMax: v }))}
            />

            {/* Características */}
            <CaracteristicasCheckboxes
              selected={pendingFilters.caracteristicas}
              onToggle={toggleCaracteristica}
            />

            {/* Código do imóvel */}
            <div>
              <div className="mb-2.5 flex items-center gap-2">
                <Hash className="size-4 text-neutral-400" />
                <span className="text-sm font-semibold text-neutral-700">Código do imóvel</span>
              </div>
              <Input
                value={pendingFilters.codigo}
                onChange={(e) =>
                  setPendingFilters((c) => ({ ...c, codigo: e.target.value }))
                }
                placeholder="Ex: AP00296"
                className="h-10 max-w-xs rounded-xl text-sm"
              />
            </div>

          </div>
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
