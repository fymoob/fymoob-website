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

// Sub-screen for selecting from a list (replaces native select)
function ListPicker({
  title,
  options,
  value,
  onChange,
  onClose,
}: {
  title: string
  options: string[]
  value: string
  onChange: (v: string) => void
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100">
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">{title}</p>
        <div className="w-9" />
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <button
          type="button"
          onClick={() => { onChange(""); onClose() }}
          className={`flex w-full items-center justify-between px-5 py-4 text-left text-sm transition ${
            value === "" ? "bg-brand-primary/5 font-semibold text-brand-primary" : "text-neutral-700 hover:bg-neutral-50"
          }`}
        >
          Todos
          {value === "" && <Check className="size-4 text-brand-primary" />}
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => { onChange(opt); onClose() }}
            className={`flex w-full items-center justify-between border-t border-neutral-50 px-5 py-4 text-left text-sm transition ${
              value === opt ? "bg-brand-primary/5 font-semibold text-brand-primary" : "text-neutral-700 hover:bg-neutral-50"
            }`}
          >
            {opt}
            {value === opt && <Check className="size-4 text-brand-primary" />}
          </button>
        ))}
      </div>
    </div>
  )
}

// Price range slider
function PriceSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const steps = [0, 200000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000, 10000000]
  const idx = steps.findIndex((s) => s >= value) === -1 ? steps.length - 1 : steps.findIndex((s) => s >= value)

  return (
    <div>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={idx}
        onChange={(e) => onChange(steps[parseInt(e.target.value)])}
        className="w-full accent-brand-primary"
      />
      <div className="mt-2 flex justify-between text-xs text-neutral-400">
        <span>Sem limite</span>
        <span className="font-semibold text-neutral-900">
          {value === 0 ? "Qualquer preco" : `Ate ${formatPrice(value)}`}
        </span>
        <span>R$ 10mi+</span>
      </div>
    </div>
  )
}

export function QuickSearch({ bairros, tipos }: QuickSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [bairro, setBairro] = useState("")
  const [tipo, setTipo] = useState("")
  const [quartos, setQuartos] = useState("")
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

  const activeFilters = [bairro, tipo, quartos, precoMax > 0 ? "1" : ""].filter(Boolean).length

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams()
    if (bairro) params.set("bairro", bairro)
    if (tipo) params.set("tipo", tipo)
    if (quartos) params.set("quartos", quartos)
    if (precoMax > 0) params.set("precoMax", precoMax.toString())
    setOpen(false)
    router.push(`/busca?${params.toString()}`)
  }, [bairro, tipo, quartos, precoMax, router])

  const clearAll = () => {
    setBairro("")
    setTipo("")
    setQuartos("")
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
        <p className="font-display text-base font-bold text-neutral-900">Buscar imoveis</p>
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
              Localizacao
            </label>
            <button type="button" onClick={() => setPicker("bairro")} className={selectorBtn}>
              <span className={bairro ? "text-neutral-900" : "text-neutral-400"}>
                {bairro || "Todos os bairros"}
              </span>
              <span className="text-xs text-brand-primary">{bairro ? "Alterar" : "Escolher"}</span>
            </button>
          </div>

          {/* Tipo — tap to open list picker */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <Home className="size-4 text-brand-primary" />
              Tipo de imovel
            </label>
            <button type="button" onClick={() => setPicker("tipo")} className={selectorBtn}>
              <span className={tipo ? "text-neutral-900" : "text-neutral-400"}>
                {tipo || "Todos os tipos"}
              </span>
              <span className="text-xs text-brand-primary">{tipo ? "Alterar" : "Escolher"}</span>
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
              Preco maximo
            </label>
            <PriceSlider value={precoMax} onChange={setPrecoMax} />
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
          Buscar imoveis
        </button>
      </div>

      {/* Sub-pickers */}
      {picker === "bairro" && (
        <ListPicker
          title="Escolha o bairro"
          options={bairros}
          value={bairro}
          onChange={setBairro}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === "tipo" && (
        <ListPicker
          title="Tipo de imovel"
          options={tipos}
          value={tipo}
          onChange={setTipo}
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
        className="mx-auto flex w-full max-w-sm items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-4 text-left backdrop-blur-md transition hover:bg-white/15 active:scale-[0.98]"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary">
          <Search className="size-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Onde voce quer morar?</p>
          <p className="text-xs text-white/50">Bairro · Tipo · Preco</p>
        </div>
      </button>
      {overlay}
    </>
  )
}
