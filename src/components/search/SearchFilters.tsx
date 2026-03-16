"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { SlidersHorizontal } from "lucide-react"

interface SearchFiltersProps {
  bairros: string[]
  tipos: string[]
}

export function SearchFilters({ bairros, tipos }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete("page")
      router.push(`/busca?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="rounded-lg border border-fymoob-gray-light bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-fymoob-gray-dark">
        <SlidersHorizontal size={16} />
        Filtros
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <select
          value={searchParams.get("tipo") ?? ""}
          onChange={(e) => updateParam("tipo", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Tipo</option>
          {tipos.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("finalidade") ?? ""}
          onChange={(e) => updateParam("finalidade", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Finalidade</option>
          <option value="Venda">Venda</option>
          <option value="Locação">Locação</option>
        </select>

        <select
          value={searchParams.get("bairro") ?? ""}
          onChange={(e) => updateParam("bairro", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Bairro</option>
          {bairros.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={searchParams.get("dormitoriosMin") ?? ""}
          onChange={(e) => updateParam("dormitoriosMin", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Quartos</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>

        <select
          value={searchParams.get("precoMax") ?? ""}
          onChange={(e) => updateParam("precoMax", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Preço até</option>
          <option value="300000">R$ 300 mil</option>
          <option value="500000">R$ 500 mil</option>
          <option value="750000">R$ 750 mil</option>
          <option value="1000000">R$ 1 milhão</option>
          <option value="2000000">R$ 2 milhões</option>
        </select>

        <select
          value={searchParams.get("orderBy") ?? ""}
          onChange={(e) => updateParam("orderBy", e.target.value)}
          className="h-10 rounded-md border border-fymoob-gray-light bg-white px-3 text-sm text-fymoob-gray-dark outline-none focus:border-fymoob-blue focus:ring-1 focus:ring-fymoob-blue"
        >
          <option value="">Ordenar</option>
          <option value="preco-asc">Menor preço</option>
          <option value="preco-desc">Maior preço</option>
          <option value="area-desc">Maior área</option>
          <option value="recente">Mais recentes</option>
        </select>
      </div>
    </div>
  )
}
