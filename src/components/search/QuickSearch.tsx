"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Home, BedDouble, DollarSign, X, ChevronDown } from "lucide-react"

interface QuickSearchProps {
  bairros: string[]
  tipos: string[]
}

export function QuickSearch({ bairros, tipos }: QuickSearchProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [bairro, setBairro] = useState("")
  const [tipo, setTipo] = useState("")
  const [quartos, setQuartos] = useState("")
  const [preco, setPreco] = useState("")

  const activeFilters = [bairro, tipo, quartos, preco].filter(Boolean).length

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (bairro) params.set("bairro", bairro)
    if (tipo) params.set("tipo", tipo)
    if (quartos) params.set("quartos", quartos)
    if (preco) params.set("precoMax", preco)
    setOpen(false)
    router.push(`/busca?${params.toString()}`)
  }

  const clearAll = () => {
    setBairro("")
    setTipo("")
    setQuartos("")
    setPreco("")
  }

  return (
    <>
      {/* Compact pill trigger */}
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

      {/* Full-screen search overlay */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100"
            >
              <X className="size-5 text-neutral-600" />
            </button>
            <p className="font-display text-base font-bold text-neutral-900">Buscar imoveis</p>
            {activeFilters > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-brand-primary"
              >
                Limpar
              </button>
            ) : (
              <div className="w-9" />
            )}
          </div>

          {/* Filters */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="space-y-6">
              {/* Bairro */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <MapPin className="size-4 text-brand-primary" />
                  Localizacao
                </label>
                <div className="relative">
                  <select
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 pr-10 text-sm text-neutral-800 outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary"
                  >
                    <option value="">Todos os bairros</option>
                    {bairros.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <Home className="size-4 text-brand-primary" />
                  Tipo de imovel
                </label>
                <div className="relative">
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 pr-10 text-sm text-neutral-800 outline-none transition focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary"
                  >
                    <option value="">Todos os tipos</option>
                    {tipos.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                </div>
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
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <DollarSign className="size-4 text-brand-primary" />
                  Preco maximo
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "", label: "Sem limite" },
                    { value: "300000", label: "R$ 300 mil" },
                    { value: "500000", label: "R$ 500 mil" },
                    { value: "1000000", label: "R$ 1 milhao" },
                    { value: "2000000", label: "R$ 2 milhoes" },
                    { value: "3000000", label: "R$ 3 milhoes" },
                  ].map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPreco(p.value)}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                        preco === p.value
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA — fixed */}
          <div className="border-t border-neutral-100 bg-white px-5 py-4">
            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary py-4 text-base font-semibold text-white shadow-lg shadow-brand-primary/20 transition hover:bg-brand-primary-hover active:scale-[0.98]"
            >
              <Search className="size-5" />
              Buscar imoveis
            </button>
          </div>
        </div>
      )}
    </>
  )
}
