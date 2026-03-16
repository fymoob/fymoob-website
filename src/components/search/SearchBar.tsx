"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"

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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2">
        <select
          value={finalidade}
          onChange={(e) => setFinalidade(e.target.value)}
          className="h-11 flex-1 rounded-full border-0 bg-gray-50 px-4 text-sm text-fymoob-gray-dark outline-none focus:ring-2 focus:ring-fymoob-blue"
        >
          <option value="">Finalidade</option>
          <option value="Venda">Comprar</option>
          <option value="Locação">Alugar</option>
        </select>

        <select
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          className="h-11 flex-1 rounded-full border-0 bg-gray-50 px-4 text-sm text-fymoob-gray-dark outline-none focus:ring-2 focus:ring-fymoob-blue"
        >
          <option value="">Bairro</option>
          {bairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="h-11 flex-1 rounded-full border-0 bg-gray-50 px-4 text-sm text-fymoob-gray-dark outline-none focus:ring-2 focus:ring-fymoob-blue"
        >
          <option value="">Tipo</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-fymoob-blue px-8 text-sm font-semibold text-white transition-colors hover:bg-fymoob-blue-dark"
        >
          <Search size={16} />
          Buscar
        </button>
      </div>

      <div className="mt-3 text-center">
        <Link
          href="/busca"
          className="text-sm text-white/80 underline-offset-2 transition-colors hover:text-white hover:underline"
        >
          Busca avançada por código
        </Link>
      </div>
    </form>
  )
}
