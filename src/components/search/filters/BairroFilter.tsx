"use client"

import { memo, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import type { MultiSelectOption } from "./types"
import type { GroupedBairroOptions } from "../useSearchBarController"

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

interface BairroFilterProps {
  bairros: MultiSelectOption[]
  groupedBairros?: GroupedBairroOptions[]
  selectedBairros: string[]
  /** Cidades selecionadas — quando preenchido, filtra bairros dessas cidades */
  selectedCidades?: string[]
  onBairrosChange: (values: string[]) => void
}

function toggleValue(values: string[], value: string): string[] {
  const set = new Set(values)
  if (set.has(value)) set.delete(value)
  else set.add(value)
  return Array.from(set)
}

// Filtro dedicado de Bairro. Usado no mobile chip sheet e no
// AdvancedFiltersModal. Paridade com o popover "Bairro" do desktop.
// Agrupa bairros por cidade. Se selectedCidades tem cidades, filtra
// apenas bairros dessas cidades. Senao, mostra todos agrupados.
function BairroFilterImpl({
  bairros,
  groupedBairros,
  selectedBairros,
  selectedCidades = [],
  onBairrosChange,
}: BairroFilterProps) {
  const [query, setQuery] = useState("")
  const useGrouped = !!(groupedBairros && groupedBairros.length > 0)

  // Agrupados filtrados: aplica filtro de cidade (se houver) + query de busca
  const filteredGroups = useMemo(() => {
    if (!useGrouped || !groupedBairros) return []
    const q = normalize(query.trim())
    const cityFilter =
      selectedCidades.length > 0 ? new Set(selectedCidades) : null

    return groupedBairros
      .map((group) => ({
        ...group,
        bairros: group.bairros.filter((b) => {
          if (q && !normalize(b.label).includes(q) && !normalize(group.cidade).includes(q)) {
            return false
          }
          return true
        }),
      }))
      .filter((group) => {
        if (group.bairros.length === 0) return false
        if (cityFilter) {
          // groupedBairros usa cidade normalizada como label; procura match
          // por inclusao (case insensitive) pra cobrir slug e nome exato
          const cityNorm = normalize(group.cidade)
          return Array.from(cityFilter).some(
            (c) => normalize(c) === cityNorm
          )
        }
        return true
      })
  }, [groupedBairros, query, selectedCidades, useGrouped])

  // Lista flat filtrada (fallback se nao houver agrupamento)
  const filteredBairros = useMemo(() => {
    if (useGrouped) return []
    const q = normalize(query.trim())
    if (!q) return bairros
    return bairros.filter((b) => normalize(b.label).includes(q))
  }, [bairros, query, useGrouped])

  const isEmpty = useGrouped
    ? filteredGroups.length === 0
    : filteredBairros.length === 0

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          inputMode="search"
          placeholder="Buscar bairro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-primary"
          autoComplete="off"
        />
      </div>

      {selectedCidades.length > 0 && (
        <p className="mt-2 text-xs text-neutral-500">
          Mostrando bairros de: <span className="font-medium text-neutral-700">{selectedCidades.join(", ")}</span>
        </p>
      )}

      <div className="mt-2 max-h-[320px] overflow-y-auto">
        {isEmpty ? (
          <div className="px-2 py-6 text-center">
            <p className="text-sm text-neutral-500">Nenhum bairro encontrado.</p>
            {selectedCidades.length > 0 && (
              <p className="mt-1 text-xs text-neutral-400">
                Remova o filtro de cidade pra ver mais opções.
              </p>
            )}
          </div>
        ) : useGrouped ? (
          filteredGroups.map((group) => (
            <div key={group.cidade} className="py-2">
              <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                {group.cidade}
              </p>
              <ul>
                {group.bairros.map((bairro) => {
                  const checked = selectedBairros.includes(bairro.value)
                  return (
                    <li key={bairro.value}>
                      <button
                        type="button"
                        onClick={() =>
                          onBairrosChange(toggleValue(selectedBairros, bairro.value))
                        }
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-neutral-50"
                      >
                        <Checkbox checked={checked} />
                        <span className="flex-1 text-sm">{bairro.label}</span>
                        <span className="text-xs text-neutral-400">({bairro.count})</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))
        ) : (
          <ul className="py-2">
            {filteredBairros.map((bairro) => {
              const checked = selectedBairros.includes(bairro.value)
              return (
                <li key={bairro.value}>
                  <button
                    type="button"
                    onClick={() =>
                      onBairrosChange(toggleValue(selectedBairros, bairro.value))
                    }
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-neutral-50"
                  >
                    <Checkbox checked={checked} />
                    <span className="text-sm">{bairro.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export const BairroFilter = memo(BairroFilterImpl)
