"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { SearchSelect } from "./SearchSelect"

interface SearchBarProps {
  bairros: string[]
  tipos: string[]
}

export function SearchBar({ bairros, tipos }: SearchBarProps) {
  const router = useRouter()
  const [finalidade, setFinalidade] = useState("")
  const [bairro, setBairro] = useState("")
  const [tipo, setTipo] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (finalidade) params.set("finalidade", finalidade)
    if (bairro) params.set("bairro", bairro)
    if (tipo) params.set("tipo", tipo)
    router.push(`/busca?${params.toString()}`)
  }

  const finalidadeOptions = [
    { value: "Venda", label: "Comprar" },
    { value: "Locação", label: "Alugar" },
  ]

  const bairroOptions = bairros.map((b) => ({ value: b, label: b }))
  const tipoOptions = tipos.map((t) => ({ value: t, label: t }))

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="rounded-full bg-white p-2 shadow-2xl shadow-black/10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
          <SearchSelect
            value={finalidade}
            onChange={setFinalidade}
            placeholder="Finalidade"
            options={finalidadeOptions}
          />

          <div className="hidden h-6 w-px bg-neutral-200 sm:block" />

          <SearchSelect
            value={bairro}
            onChange={setBairro}
            placeholder="Bairro"
            options={bairroOptions}
          />

          <div className="hidden h-6 w-px bg-neutral-200 sm:block" />

          <SearchSelect
            value={tipo}
            onChange={setTipo}
            placeholder="Tipo"
            options={tipoOptions}
          />

          <button
            type="submit"
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98]"
          >
            <Search size={16} />
            Buscar
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/busca"
          className="text-sm text-white/70 underline-offset-2 transition-colors duration-200 hover:text-white hover:underline"
        >
          Busca avançada por código
        </Link>
      </div>
    </form>
  )
}
