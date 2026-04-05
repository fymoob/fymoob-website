"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { Search, MapPin, Home, BedDouble, DollarSign, X, Check } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface QuickSearchProps {
  bairros: string[]
  tipos: string[]
}

// Sub-screen for selecting multiple items from a list (checkbox style)
function MultiListPicker({
  title,
  options,
  selected,
  onChange,
  onClose,
}: {
  title: string
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
  onClose: () => void
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt))
    } else {
      onChange([...selected, opt])
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100">
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">{title}</p>
        {selected.length > 0 ? (
          <button type="button" onClick={() => onChange([])} className="text-xs font-medium text-brand-primary">Limpar</button>
        ) : (
          <div className="w-9" />
        )}
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {options.map((opt) => {
          const isSelected = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex w-full items-center gap-3 border-b border-neutral-50 px-5 py-4 text-left text-sm transition ${
                isSelected ? "bg-brand-primary/5 font-semibold text-brand-primary" : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <div className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition ${
                isSelected ? "border-brand-primary bg-brand-primary" : "border-neutral-300"
              }`}>
                {isSelected && <Check className="size-3 text-white" />}
              </div>
              {opt}
            </button>
          )
        })}
      </div>
      {/* Confirm button */}
      <div className="shrink-0 border-t border-neutral-100 bg-white px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
        >
          {selected.length > 0 ? `Confirmar (${selected.length})` : "Todos selecionados"}
        </button>
      </div>
    </div>
  )
}

// Dual-range price slider (Airbnb/Zillow pattern)
function formatShortPrice(v: number): string {
  if (v === 0) return "Sem limite"
  if (v >= 1000000) return `R$ ${(v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 1)}mi`
  return `R$ ${(v / 1000).toFixed(0)}mil`
}

function PriceRangeSlider({
  min,
  max,
  onMinChange,
  onMaxChange,
}: {
  min: number
  max: number
  onMinChange: (v: number) => void
  onMaxChange: (v: number) => void
}) {
  const steps = [0, 200000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000, 10000000]
  const total = steps.length - 1
  const minIdx = steps.findIndex((s) => s >= min) === -1 ? 0 : steps.findIndex((s) => s >= min)
  const maxIdx = steps.findIndex((s) => s >= max) === -1 ? total : steps.findIndex((s) => s >= max)

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value)
    onMinChange(steps[Math.min(v, maxIdx - 1)])
  }

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value)
    onMaxChange(steps[Math.max(v, minIdx + 1)])
  }

  // Track fill percentage
  const leftPct = (minIdx / total) * 100
  const rightPct = (maxIdx / total) * 100

  return (
    <div>
      {/* Labels above */}
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">
          {formatShortPrice(min)}
        </span>
        <span className="text-xs text-neutral-400">—</span>
        <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">
          {formatShortPrice(max)}
        </span>
      </div>

      {/* Dual range track */}
      <div className="relative h-10 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200" />
        {/* Active range fill */}
        <div
          className="absolute h-1.5 rounded-full bg-brand-primary"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={0}
          max={total}
          value={minIdx}
          onChange={handleMin}
          className="dual-range-thumb absolute inset-x-0 z-20"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={0}
          max={total}
          value={maxIdx}
          onChange={handleMax}
          className="dual-range-thumb absolute inset-x-0 z-30"
        />
      </div>
    </div>
  )
}

export function QuickSearch({ bairros, tipos }: QuickSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [bairrosSel, setBairrosSel] = useState<string[]>([])
  const [tiposSel, setTiposSel] = useState<string[]>([])

  const [quartos, setQuartos] = useState("")
  const [precoMin, setPrecoMin] = useState(0)
  const [precoMax, setPrecoMax] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [picker, setPicker] = useState<"bairro" | "tipo" | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open || picker) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open, picker])

  const activeFilters = [bairrosSel.length > 0 ? "1" : "", tiposSel.length > 0 ? "1" : "", quartos, (precoMin > 0 || precoMax > 0) ? "1" : ""].filter(Boolean).length

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (bairrosSel.length > 0) params.set("bairro", bairrosSel.join(","))
    if (tiposSel.length > 0) params.set("tipo", tiposSel.join(","))
    if (quartos) params.set("quartos", quartos)
    if (precoMin > 0) params.set("precoMin", precoMin.toString())
    if (precoMax > 0) params.set("precoMax", precoMax.toString())
    setOpen(false)
    router.push(`/busca?${params.toString()}`)
  }, [bairrosSel, tiposSel, quartos, precoMin, precoMax, router])

  const clearAll = () => {
    setBairrosSel([])
    setTiposSel([])
    setQuartos("")
    setPrecoMin(0)
    setPrecoMax(0)
  }

  const selectorBtn = "flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-800 transition hover:border-neutral-300"

  const overlay = open && mounted ? createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button type="button" onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100">
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">Buscar imóveis</p>
        {activeFilters > 0 ? (
          <button type="button" onClick={clearAll} className="text-xs font-medium text-brand-primary">Limpar</button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
        <div className="space-y-6">
          {/* Bairro — tap to open list picker */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <MapPin className="size-4 text-brand-primary" />
              Localização
            </label>
            <button type="button" onClick={() => setPicker("bairro")} className={selectorBtn}>
              <span className={bairrosSel.length > 0 ? "text-neutral-900" : "text-neutral-400"}>
                {bairrosSel.length === 0 ? "Todos os bairros" : bairrosSel.length === 1 ? bairrosSel[0] : `${bairrosSel.length} bairros`}
              </span>
              <span className="text-xs text-brand-primary">{bairrosSel.length > 0 ? "Alterar" : "Escolher"}</span>
            </button>
          </div>

          {/* Tipo — tap to open list picker */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <Home className="size-4 text-brand-primary" />
              Tipo de imóvel
            </label>
            <button type="button" onClick={() => setPicker("tipo")} className={selectorBtn}>
              <span className={tiposSel.length > 0 ? "text-neutral-900" : "text-neutral-400"}>
                {tiposSel.length === 0 ? "Todos os tipos" : tiposSel.length === 1 ? tiposSel[0] : `${tiposSel.length} tipos`}
              </span>
              <span className="text-xs text-brand-primary">{tiposSel.length > 0 ? "Alterar" : "Escolher"}</span>
            </button>
          </div>

          {/* Quartos — button group */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <BedDouble className="size-4 text-brand-primary" />
              Quartos
            </label>
            <div className="flex gap-2">
              {["", "1", "2", "3", "4"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuartos(q)}
                  className={`flex-1 rounded-xl border py-3.5 text-sm font-semibold transition ${
                    quartos === q
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {q === "" ? "Todos" : q === "4" ? "4+" : q}
                </button>
              ))}
            </div>
          </div>

          {/* Preço — range slider */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <DollarSign className="size-4 text-brand-primary" />
              Faixa de preço
            </label>
            <PriceRangeSlider min={precoMin} max={precoMax} onMinChange={setPrecoMin} onMaxChange={setPrecoMax} />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 border-t border-neutral-100 bg-white px-5 py-4 pb-6">
        <button
          type="button"
          onClick={handleSearch}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary py-4 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:bg-brand-primary-hover active:scale-[0.98]"
        >
          <Search className="size-5" />
          Buscar imóveis
        </button>
      </div>

      {/* Sub-pickers */}
      {picker === "bairro" && (
        <MultiListPicker
          title="Escolha os bairros"
          options={bairros}
          selected={bairrosSel}
          onChange={setBairrosSel}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === "tipo" && (
        <MultiListPicker
          title="Tipo de imóvel"
          options={tipos}
          selected={tiposSel}
          onChange={setTiposSel}
          onClose={() => setPicker(null)}
        />
      )}
    </div>,
    document.body
  ) : null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto flex w-full max-w-xs items-center gap-2.5 rounded-full border border-white/30 bg-white/80 px-4 py-2.5 text-left shadow-lg backdrop-blur-xl transition hover:bg-white/90 active:scale-[0.98]"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary">
          <Search className="size-3.5 text-white" />
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-800">Onde você quer morar?</p>
          <p className="text-[10px] text-neutral-400">Bairro · Tipo · Preço</p>
        </div>
      </button>
      {overlay}
    </>
  )
}
