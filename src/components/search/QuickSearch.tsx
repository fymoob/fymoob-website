"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { Search, MapPin, Home, BedDouble, DollarSign, X, SlidersHorizontal, Hash } from "lucide-react"
import { cn, slugify } from "@/lib/utils"
import type { BairroSummary, TypeSummary } from "@/types/property"

interface QuickSearchProps {
  bairroSummaries: BairroSummary[]
  tipoSummaries: TypeSummary[]
}

/* ── Helpers ── */
function formatShortPrice(v: number): string {
  if (v === 0) return "Sem limite"
  if (v >= 1000000) return `R$ ${(v / 1000000).toFixed(v % 1000000 === 0 ? 0 : 1)}mi`
  return `R$ ${(v / 1000).toFixed(0)}mil`
}


function getCountForFinalidade(
  porFinalidade: Record<string, number>,
  total: number,
  finalidade: "comprar" | "alugar" | "lancamentos" | null
): number {
  if (!finalidade || finalidade === "lancamentos") return total
  if (finalidade === "alugar") {
    return (porFinalidade["Locação"] ?? 0) +
           (porFinalidade["Venda e Locação"] ?? 0)
  }
  return (porFinalidade["Venda"] ?? 0) +
         (porFinalidade["Venda e Locação"] ?? 0)
}

/** Accent-insensitive string comparison helper */
const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

const STEPS_COMPRAR = [0, 200000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000, 10000000]
const STEPS_ALUGAR = [0, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 25000]

/* ── Location Picker (full-screen autocomplete) ── */
/* ── City Picker (multi-select, full-screen) ── */
function CidadePicker({
  bairroSummaries,
  selected,
  finalidade,
  onChange,
  onClose,
}: {
  bairroSummaries: BairroSummary[]
  selected: string[]
  finalidade: "comprar" | "alugar" | "lancamentos"
  onChange: (cidades: string[]) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState("")

  const cities = useMemo(() => {
    const map = new Map<string, number>()
    for (const bs of bairroSummaries) {
      const count = getCountForFinalidade(bs.porFinalidade, bs.total, finalidade)
      if (count === 0) continue
      const c = bs.cidade || "Outros"
      map.set(c, (map.get(c) ?? 0) + count)
    }
    return Array.from(map.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
  }, [bairroSummaries, finalidade])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return cities
    return cities.filter((c) => normalize(c.label).includes(q))
  }, [cities, query])

  const toggle = (label: string) => {
    if (selected.includes(label)) onChange(selected.filter((s) => s !== label))
    else onChange([...selected, label])
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">Cidade</p>
        {selected.length > 0 ? (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-medium text-brand-primary"
          >
            Limpar
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      <div className="border-b border-neutral-100 px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cidade..."
            className="w-full rounded-lg bg-neutral-100 py-3 pl-10 pr-10 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-primary"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar texto"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-neutral-400">Nenhuma cidade encontrada</p>
          </div>
        ) : (
          filtered.map((city) => {
            const isSelected = selected.includes(city.label)
            return (
              <button
                key={city.label}
                type="button"
                onClick={() => toggle(city.label)}
                className={`flex w-full items-center gap-3 border-b border-neutral-50 px-5 py-4 text-left text-sm transition ${
                  isSelected
                    ? "bg-brand-primary/5 font-semibold text-brand-primary"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition ${
                    isSelected ? "border-brand-primary bg-brand-primary" : "border-neutral-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="size-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="flex-1">{city.label}</span>
                <span className="text-xs text-neutral-400">
                  {city.count} {city.count === 1 ? "imóvel" : "imóveis"}
                </span>
              </button>
            )
          })
        )}
      </div>

      <div className="shrink-0 border-t border-neutral-100 bg-white px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
        >
          {selected.length > 0
            ? `Confirmar (${selected.length} ${selected.length === 1 ? "cidade" : "cidades"})`
            : "Todas as cidades"}
        </button>
      </div>
    </div>
  )
}

/* ── Bairro Picker (multi-select, filtrado pelas cidades selecionadas) ── */
function BairroPicker({
  bairroSummaries,
  selected,
  cidadesSel,
  finalidade,
  onChange,
  onClose,
}: {
  bairroSummaries: BairroSummary[]
  selected: string[]
  cidadesSel: string[]
  finalidade: "comprar" | "alugar" | "lancamentos"
  onChange: (bairros: string[]) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState("")

  // Bairros agrupados por cidade. Se alguma cidade esta selecionada, mostra
  // apenas bairros dessas cidades. Caso contrario, mostra todos agrupados.
  const groupedByCity = useMemo(() => {
    const map = new Map<string, { bairro: string; count: number }[]>()
    for (const bs of bairroSummaries) {
      const count = getCountForFinalidade(bs.porFinalidade, bs.total, finalidade)
      if (count === 0) continue
      const c = bs.cidade || "Outros"
      if (cidadesSel.length > 0 && !cidadesSel.includes(c)) continue
      if (!map.has(c)) map.set(c, [])
      map.get(c)!.push({ bairro: bs.bairro, count })
    }
    const entries = Array.from(map.entries())
    // Ordena cidades por volume total, bairros dentro da cidade por count desc
    return entries
      .map(([cidade, bairros]) => ({
        cidade,
        totalCount: bairros.reduce((acc, b) => acc + b.count, 0),
        bairros: bairros.sort((a, b) => b.count - a.count),
      }))
      .sort((a, b) => b.totalCount - a.totalCount)
  }, [bairroSummaries, finalidade, cidadesSel])

  const filteredGroups = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return groupedByCity
    return groupedByCity
      .map((group) => ({
        ...group,
        bairros: group.bairros.filter(
          (b) =>
            normalize(b.bairro).includes(q) || normalize(group.cidade).includes(q)
        ),
      }))
      .filter((group) => group.bairros.length > 0)
  }, [groupedByCity, query])

  const toggle = (label: string) => {
    if (selected.includes(label)) onChange(selected.filter((s) => s !== label))
    else onChange([...selected, label])
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100"
        >
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">Bairro</p>
        {selected.length > 0 ? (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-medium text-brand-primary"
          >
            Limpar
          </button>
        ) : (
          <div className="w-9" />
        )}
      </div>

      <div className="border-b border-neutral-100 px-4 py-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar bairro..."
            className="w-full rounded-lg bg-neutral-100 py-3 pl-10 pr-10 text-sm text-neutral-900 outline-none focus:ring-2 focus:ring-brand-primary"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar texto"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        {cidadesSel.length > 0 && (
          <p className="mt-2 text-xs text-neutral-500">
            Mostrando bairros de: {cidadesSel.join(", ")}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {filteredGroups.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-neutral-400">Nenhum bairro encontrado</p>
            {cidadesSel.length > 0 && (
              <p className="mt-1 text-xs text-neutral-400">
                Tente remover o filtro de cidade pra ver mais opções.
              </p>
            )}
          </div>
        ) : (
          filteredGroups.map((group) => (
            <section key={group.cidade}>
              <p className="bg-neutral-50 px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {group.cidade}
              </p>
              {group.bairros.map((b) => {
                const isSelected = selected.includes(b.bairro)
                return (
                  <button
                    key={`${group.cidade}-${b.bairro}`}
                    type="button"
                    onClick={() => toggle(b.bairro)}
                    className={`flex w-full items-center gap-3 border-b border-neutral-50 px-5 py-4 text-left text-sm transition ${
                      isSelected
                        ? "bg-brand-primary/5 font-semibold text-brand-primary"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <div
                      className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary"
                          : "border-neutral-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="size-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">{b.bairro}</span>
                    <span className="text-xs text-neutral-400">{b.count}</span>
                  </button>
                )
              })}
            </section>
          ))
        )}
      </div>

      <div className="shrink-0 border-t border-neutral-100 bg-white px-5 py-4">
        <button
          type="button"
          onClick={onClose}
          className="flex w-full items-center justify-center rounded-full bg-brand-primary py-3.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
        >
          {selected.length > 0
            ? `Confirmar (${selected.length} ${selected.length === 1 ? "bairro" : "bairros"})`
            : "Todos os bairros"}
        </button>
      </div>
    </div>
  )
}

/* ── Type Picker (filtered, full-screen) ── */
function TypePicker({
  options,
  selected,
  onChange,
  onClose,
}: {
  options: { label: string; count: number }[]
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
        <button type="button" onClick={onClose} aria-label="Fechar filtros" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100">
          <X className="size-5 text-neutral-600" />
        </button>
        <p className="font-display text-base font-bold text-neutral-900">Tipo de imóvel</p>
        {selected.length > 0 ? (
          <button type="button" onClick={() => onChange([])} className="text-xs font-medium text-brand-primary">Limpar</button>
        ) : (
          <div className="w-9" />
        )}
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.label)
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => toggle(opt.label)}
              className={`flex w-full items-center gap-3 border-b border-neutral-50 px-5 py-4 text-left text-sm transition ${
                isSelected ? "bg-brand-primary/5 font-semibold text-brand-primary" : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <div className={`flex size-5 shrink-0 items-center justify-center rounded border-2 transition ${
                isSelected ? "border-brand-primary bg-brand-primary" : "border-neutral-300"
              }`}>
                {isSelected && <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="flex-1">{opt.label}</span>
              <span className="text-xs text-neutral-400">{opt.count}</span>
            </button>
          )
        })}
      </div>
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

/* ── Dual-range price slider ── */
function PriceRangeSlider({
  min, max, onMinChange, onMaxChange, steps = STEPS_COMPRAR,
}: {
  min: number; max: number; onMinChange: (v: number) => void; onMaxChange: (v: number) => void; steps?: number[]
}) {
  const total = steps.length - 1
  const minIdx = steps.findIndex((s) => s >= min) === -1 ? 0 : steps.findIndex((s) => s >= min)
  const maxIdx = steps.findIndex((s) => s >= max) === -1 ? total : steps.findIndex((s) => s >= max)
  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => { onMinChange(steps[Math.min(parseInt(e.target.value), maxIdx - 1)]) }
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => { onMaxChange(steps[Math.max(parseInt(e.target.value), minIdx + 1)]) }
  const leftPct = (minIdx / total) * 100
  const rightPct = (maxIdx / total) * 100

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">{formatShortPrice(min)}</span>
        <span className="text-xs text-neutral-400">—</span>
        <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 text-xs font-semibold text-brand-primary">{formatShortPrice(max)}</span>
      </div>
      <div className="relative h-10 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-neutral-200" />
        <div className="absolute h-1.5 rounded-full bg-brand-primary" style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }} />
        <input type="range" min={0} max={total} value={minIdx} onChange={handleMin} className="dual-range-thumb absolute inset-x-0 z-20" />
        <input type="range" min={0} max={total} value={maxIdx} onChange={handleMax} className="dual-range-thumb absolute inset-x-0 z-30" />
      </div>
    </div>
  )
}

/* ── Main QuickSearch Component ── */
export function QuickSearch({ bairroSummaries, tipoSummaries }: QuickSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [finalidade, setFinalidade] = useState<"comprar" | "alugar" | "lancamentos">("comprar")
  // Multi-select de cidade e bairro (paridade com desktop). Cada dropdown
  // e independente. Bairro e filtrado pelas cidades selecionadas quando ha
  // alguma marcada — se nenhuma cidade esta selecionada, todos os bairros
  // aparecem agrupados por cidade.
  const [cidadesSel, setCidadesSel] = useState<string[]>([])
  const [bairrosSel, setBairrosSel] = useState<string[]>([])
  const [tiposSel, setTiposSel] = useState<string[]>([])
  const [quartos, setQuartos] = useState("")
  const [precoMin, setPrecoMin] = useState(0)
  const [precoMax, setPrecoMax] = useState(0)
  const [codigo, setCodigo] = useState("")
  const [mounted, setMounted] = useState(false)
  const [picker, setPicker] = useState<"cidade" | "bairro" | "tipo" | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open || picker) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open, picker])

  const handleFinalidade = (f: "comprar" | "alugar" | "lancamentos") => {
    setFinalidade(f)
    setPrecoMin(0)
    setPrecoMax(0)
    // Clear tipos that may not exist for new finalidade
    setTiposSel([])
  }

  // Filter tipos by finalidade + location
  const filteredTipos = useMemo(() => {
    let filtered = tipoSummaries.filter((ts) => ts.total > 0)

    // Filter by finalidade
    if (finalidade === "alugar") {
      filtered = filtered.filter((ts) =>
        (ts.porFinalidade["Locação"] ?? 0) > 0 ||
        (ts.porFinalidade["Venda e Locação"] ?? 0) > 0
      )
    } else {
      filtered = filtered.filter((ts) =>
        (ts.porFinalidade["Venda"] ?? 0) > 0 ||
        (ts.porFinalidade["Venda e Locação"] ?? 0) > 0
      )
    }

    // Filter by location (cidades OR bairros selecionados)
    const hasLocationFilter = cidadesSel.length > 0 || bairrosSel.length > 0
    if (hasLocationFilter) {
      const matchingBairros = bairroSummaries.filter((bs) => {
        const cidadeMatch = cidadesSel.length > 0 && cidadesSel.includes(bs.cidade)
        const bairroMatch = bairrosSel.length > 0 && bairrosSel.includes(bs.bairro)
        return cidadeMatch || bairroMatch
      })
      if (matchingBairros.length > 0) {
        const validTypes = new Set<string>()
        for (const bs of matchingBairros) {
          for (const t of bs.tipos) validTypes.add(t.tipo)
        }
        filtered = filtered.filter((ts) => validTypes.has(ts.tipo))
      }
    }

    return filtered
      .map((ts) => ({
        label: ts.tipo,
        count: getCountForFinalidade(ts.porFinalidade, ts.total, finalidade),
      }))
      .filter((t) => t.count > 0)
      .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))
  }, [tipoSummaries, bairroSummaries, finalidade, cidadesSel, bairrosSel])

  const activeFilters = [
    cidadesSel.length > 0 ? "1" : "",
    bairrosSel.length > 0 ? "1" : "",
    tiposSel.length > 0 ? "1" : "",
    quartos,
    (precoMin > 0 || precoMax > 0) ? "1" : "",
    codigo ? "1" : "",
  ].filter(Boolean).length

  const handleSearch = useCallback(() => {
    // Busca por codigo tem prioridade: ignora outros filtros e vai direto
    // pra /busca com ?codigo=X (mesma rota usada pela /busca desktop).
    const codigoTrim = codigo.trim()
    if (codigoTrim) {
      const params = new URLSearchParams()
      params.set("codigo", codigoTrim)
      setOpen(false)
      router.push(`/busca?${params.toString()}`)
      return
    }
    const params = new URLSearchParams()
    if (finalidade === "lancamentos") {
      if (cidadesSel.length > 0) params.set("cidade", cidadesSel.map(slugify).join(","))
      if (bairrosSel.length > 0) params.set("bairro", bairrosSel.map(slugify).join(","))
      if (tiposSel.length > 0) params.set("tipo", tiposSel.map(slugify).join(","))
      if (quartos) params.set("quartos", quartos)
      if (precoMin > 0) params.set("precoMin", precoMin.toString())
      if (precoMax > 0) params.set("precoMax", precoMax.toString())
      setOpen(false)
      const query = params.toString()
      router.push(query ? `/lancamentos?${query}` : "/lancamentos")
      return
    }
    if (finalidade === "alugar") params.set("finalidade", "locacao")
    else params.set("finalidade", "venda")
    if (cidadesSel.length > 0) params.set("cidade", cidadesSel.map(slugify).join(","))
    if (bairrosSel.length > 0) params.set("bairro", bairrosSel.map(slugify).join(","))
    if (tiposSel.length > 0) params.set("tipo", tiposSel.map(slugify).join(","))
    if (quartos) params.set("quartos", quartos)
    if (precoMin > 0) params.set("precoMin", precoMin.toString())
    if (precoMax > 0) params.set("precoMax", precoMax.toString())
    setOpen(false)
    router.push(`/busca?${params.toString()}`)
  }, [finalidade, cidadesSel, bairrosSel, tiposSel, quartos, precoMin, precoMax, codigo, router])

  const clearAll = () => {
    setFinalidade("comprar")
    setCidadesSel([])
    setBairrosSel([])
    setTiposSel([])
    setQuartos("")
    setPrecoMin(0)
    setPrecoMax(0)
    setCodigo("")
  }

  const selectorBtn = "flex w-full items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-800 transition hover:border-neutral-300"

  const overlay = open && mounted ? createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 px-4 py-4">
        <button type="button" onClick={() => setOpen(false)} aria-label="Fechar" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100">
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
          {/* Finalidade */}
          <div className="rounded-xl bg-neutral-100 p-1">
            <div className="grid grid-cols-3 gap-1">
              {(["comprar", "alugar", "lancamentos"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFinalidade(f)}
                  className={cn(
                    "whitespace-nowrap rounded-lg py-3 text-xs font-semibold transition sm:text-sm",
                    finalidade === f
                      ? "bg-white text-neutral-900 shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  )}
                >
                  {f === "comprar" ? "Comprar" : f === "alugar" ? "Alugar" : "Lançamentos"}
                </button>
              ))}
            </div>
          </div>

          {/* Cidade — dropdown multi-select (paridade com desktop) */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <MapPin className="size-4 text-brand-primary" />
              Cidade
            </label>
            <button type="button" onClick={() => setPicker("cidade")} className={selectorBtn}>
              <span className={cidadesSel.length > 0 ? "text-neutral-900" : "text-neutral-400"}>
                {cidadesSel.length === 0
                  ? "Todas as cidades"
                  : cidadesSel.length === 1
                    ? cidadesSel[0]
                    : `${cidadesSel.length} cidades`}
              </span>
              <span className="text-xs text-brand-primary">
                {cidadesSel.length > 0 ? "Alterar" : "Escolher"}
              </span>
            </button>
          </div>

          {/* Bairro — dropdown multi-select, filtrado pelas cidades selecionadas */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <MapPin className="size-4 text-brand-primary" />
              Bairro
            </label>
            <button type="button" onClick={() => setPicker("bairro")} className={selectorBtn}>
              <span className={bairrosSel.length > 0 ? "text-neutral-900" : "text-neutral-400"}>
                {bairrosSel.length === 0
                  ? "Todos os bairros"
                  : bairrosSel.length === 1
                    ? bairrosSel[0]
                    : `${bairrosSel.length} bairros`}
              </span>
              <span className="text-xs text-brand-primary">
                {bairrosSel.length > 0 ? "Alterar" : "Escolher"}
              </span>
            </button>
          </div>

          {/* Tipo — tap to open filtered list */}
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
            {filteredTipos.length === 0 && (
              <p className="mt-1.5 text-xs text-neutral-400">Nenhum tipo disponível para a seleção atual</p>
            )}
          </div>

          {/* Quartos */}
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

          {/* Preço */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-neutral-900">
              <DollarSign className="size-4 text-brand-primary" />
              Faixa de preço
            </label>
            <PriceRangeSlider
              min={precoMin}
              max={precoMax}
              onMinChange={setPrecoMin}
              onMaxChange={setPrecoMax}
              steps={finalidade === "alugar" ? STEPS_ALUGAR : STEPS_COMPRAR}
            />
          </div>

          {/* Codigo do imovel — ja sabe qual eh, vai direto. Prioridade sobre
              outros filtros no handleSearch. */}
          <div>
            <label
              htmlFor="qs-codigo"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900"
            >
              <Hash className="size-4 text-brand-primary" />
              Código do imóvel
            </label>
            <input
              id="qs-codigo"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Ex: 12345"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value.replace(/[^\w-]/g, ""))}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-800 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
            />
            {codigo.trim() && (
              <p className="mt-1.5 text-xs text-neutral-500">
                Busca pelo código ignora os outros filtros.
              </p>
            )}
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
      {picker === "cidade" && (
        <CidadePicker
          bairroSummaries={bairroSummaries}
          selected={cidadesSel}
          finalidade={finalidade}
          onChange={setCidadesSel}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === "bairro" && (
        <BairroPicker
          bairroSummaries={bairroSummaries}
          selected={bairrosSel}
          cidadesSel={cidadesSel}
          finalidade={finalidade}
          onChange={setBairrosSel}
          onClose={() => setPicker(null)}
        />
      )}
      {picker === "tipo" && (
        <TypePicker
          options={filteredTipos}
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
