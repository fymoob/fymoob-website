"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Home, BedDouble, DollarSign } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

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

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (bairro) params.set("bairro", bairro)
    if (tipo) params.set("tipo", tipo)
    if (quartos) params.set("quartos", quartos)
    if (preco) params.set("precoMax", preco)
    setOpen(false)
    router.push(`/busca?${params.toString()}`)
  }

  const selectClass =
    "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm text-neutral-800 outline-none transition focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"

  return (
    <>
      {/* Compact pill trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="mx-auto flex w-full max-w-sm items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-4 text-left backdrop-blur-md transition hover:bg-white/15 active:scale-[0.98]">
          <Search className="size-5 shrink-0 text-white/60" />
          <div>
            <p className="text-sm font-medium text-white">Onde voce quer morar?</p>
            <p className="text-xs text-white/50">Buscar por bairro, tipo ou preco</p>
          </div>
        </SheetTrigger>

        <SheetContent side="bottom" className="rounded-t-2xl pb-10">
          <SheetTitle className="px-1 pb-6 pt-2 text-center font-display text-xl font-bold text-neutral-900">
            Buscar imoveis
          </SheetTitle>

          <div className="space-y-4">
            {/* Bairro */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <MapPin className="size-3.5" />
                Localizacao
              </label>
              <select value={bairro} onChange={(e) => setBairro(e.target.value)} className={selectClass}>
                <option value="">Todos os bairros</option>
                {bairros.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Tipo */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <Home className="size-3.5" />
                Tipo de imovel
              </label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={selectClass}>
                <option value="">Todos os tipos</option>
                {tipos.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Quartos */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <BedDouble className="size-3.5" />
                Quartos
              </label>
              <div className="flex gap-2">
                {["", "1", "2", "3", "4"].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuartos(q)}
                    className={`flex-1 rounded-xl border py-3 text-sm font-medium transition ${
                      quartos === q
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {q === "" ? "Todos" : q === "4" ? "4+" : q}
                  </button>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <DollarSign className="size-3.5" />
                Preco maximo
              </label>
              <select value={preco} onChange={(e) => setPreco(e.target.value)} className={selectClass}>
                <option value="">Sem limite</option>
                <option value="300000">Ate R$ 300 mil</option>
                <option value="500000">Ate R$ 500 mil</option>
                <option value="1000000">Ate R$ 1 milhao</option>
                <option value="2000000">Ate R$ 2 milhoes</option>
                <option value="3000000">Ate R$ 3 milhoes</option>
              </select>
            </div>

            {/* Search button */}
            <button
              type="button"
              onClick={handleSearch}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary py-4 text-sm font-semibold text-white transition hover:bg-brand-primary-hover active:scale-[0.98]"
            >
              <Search className="size-4" />
              Buscar imoveis
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
