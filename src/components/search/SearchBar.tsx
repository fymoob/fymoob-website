"use client"

import { useRouter } from "next/navigation"
import { useState, useCallback, useRef } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { SearchSelect } from "./SearchSelect"

interface SearchBarProps {
  bairros: string[]
  tipos: string[]
}

export function SearchBar({ bairros, tipos }: SearchBarProps) {
  const router = useRouter()
  const [mode, setMode] = useState<"filters" | "code">("filters")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [finalidade, setFinalidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [tipo, setTipo] = useState("")
  const [codigo, setCodigo] = useState("")
  const codeInputRef = useRef<HTMLInputElement>(null)

  const toggleMode = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setMode((prev) => (prev === "filters" ? "code" : "filters"))
      setIsTransitioning(false)
      if (mode === "filters") {
        setTimeout(() => codeInputRef.current?.focus(), 50)
      }
    }, 200)
  }, [mode])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (mode === "code") {
      if (codigo.trim()) {
        router.push(`/busca?codigo=${encodeURIComponent(codigo.trim())}`)
      }
    } else {
      const params = new URLSearchParams()
      if (finalidade) params.set("finalidade", finalidade)
      if (bairro) params.set("bairro", bairro)
      if (tipo) params.set("tipo", tipo)
      router.push(`/busca?${params.toString()}`)
    }
  }

  const finalidadeOptions = [
    { value: "Venda", label: "Comprar" },
    { value: "Locação", label: "Alugar" },
  ]

  const bairroOptions = bairros.map((b) => ({ value: b, label: b }))
  const tipoOptions = tipos.map((t) => ({ value: t, label: t }))

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="transition-opacity duration-200"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {mode === "filters" ? (
          <div className="rounded-2xl bg-white p-2 shadow-2xl shadow-black/10 sm:rounded-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-0">
              <SearchSelect
                value={finalidade}
                onChange={setFinalidade}
                placeholder="Finalidade"
                options={finalidadeOptions}
              />

              <div className="mx-3 h-px bg-neutral-100 sm:mx-0 sm:h-6 sm:w-px sm:bg-neutral-200" />

              <SearchSelect
                value={bairro}
                onChange={setBairro}
                placeholder="Bairro"
                options={bairroOptions}
              />

              <div className="mx-3 h-px bg-neutral-100 sm:mx-0 sm:h-6 sm:w-px sm:bg-neutral-200" />

              <SearchSelect
                value={tipo}
                onChange={setTipo}
                placeholder="Tipo"
                options={tipoOptions}
              />

              <div className="mt-2 sm:mt-0 sm:ml-2">
                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98] sm:w-auto sm:rounded-full"
                >
                  <Search size={16} />
                  Buscar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-2 shadow-2xl shadow-black/10 sm:rounded-full">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-3 px-4">
                <Search size={18} className="shrink-0 text-neutral-400" />
                <input
                  ref={codeInputRef}
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Digite o código do imóvel"
                  className="h-11 w-full border-0 bg-transparent text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98] sm:rounded-full"
              >
                <Search size={16} />
                Buscar
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={toggleMode}
          className="inline-flex items-center text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
        >
          {mode === "filters" ? (
            <>
              <Search className="mr-1.5 h-4 w-4" />
              Buscar por código
            </>
          ) : (
            <>
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Voltar para busca por filtros
            </>
          )}
        </button>
      </div>
    </form>
  )
}
