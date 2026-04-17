"use client"

import { memo, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import type { MultiSelectOption } from "./types"
import type { GroupedBairroOptions } from "../useSearchBarController"

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

interface LocationFilterProps {
  bairros: MultiSelectOption[]
  cidades: MultiSelectOption[]
  selectedBairros: string[]
  selectedCidades: string[]
  onBairrosChange: (values: string[]) => void
  onCidadesChange: (values: string[]) => void
  groupedBairros?: GroupedBairroOptions[]
}

function toggleValue(values: string[], value: string): string[] {
  const set = new Set(values)
  if (set.has(value)) set.delete(value)
  else set.add(value)
  return Array.from(set)
}

// Substituimos Command/cmdk (~15KB + indexacao pesada em mount) por
// input nativo + lista renderizada com useMemo. Remount instantaneo,
// zero dep externa, sem regressao de UX (ordem/busca identicas).
function LocationFilterImpl({
  bairros,
  cidades,
  selectedBairros,
  selectedCidades,
  onBairrosChange,
  onCidadesChange,
  groupedBairros,
}: LocationFilterProps) {
  const [query, setQuery] = useState("")
  const useGrouped = !!(groupedBairros && groupedBairros.length > 0)

  const filteredGroups = useMemo(() => {
    if (!useGrouped || !groupedBairros) return []
    const q = normalize(query.trim())
    return groupedBairros
      .map((group) => ({
        ...group,
        bairros: q
          ? group.bairros.filter((b) => normalize(b.label).includes(q))
          : group.bairros,
      }))
      .filter((group) => group.bairros.length > 0)
  }, [groupedBairros, query, useGrouped])

  const filteredBairros = useMemo(() => {
    if (useGrouped) return []
    const q = normalize(query.trim())
    if (!q) return bairros
    return bairros.filter((b) => normalize(b.label).includes(q))
  }, [bairros, query, useGrouped])

  const filteredCidades = useMemo(() => {
    if (useGrouped) return []
    const q = normalize(query.trim())
    if (!q) return cidades
    return cidades.filter((c) => normalize(c.label).includes(q))
  }, [cidades, query, useGrouped])

  const isEmpty = useGrouped
    ? filteredGroups.length === 0
    : filteredBairros.length === 0 && filteredCidades.length === 0

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          inputMode="search"
          placeholder="Buscar bairro ou cidade..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-primary"
          autoComplete="off"
        />
      </div>

      <div className="mt-2 max-h-[320px] overflow-y-auto">
        {isEmpty ? (
          <p className="px-2 py-6 text-center text-sm text-neutral-500">
            Nenhuma localização encontrada.
          </p>
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
          <>
            {filteredBairros.length > 0 && (
              <div className="py-2">
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Bairros
                </p>
                <ul>
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
              </div>
            )}

            {filteredCidades.length > 0 && (
              <div className="py-2">
                <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Cidades
                </p>
                <ul>
                  {filteredCidades.map((cidade) => {
                    const checked = selectedCidades.includes(cidade.value)
                    return (
                      <li key={cidade.value}>
                        <button
                          type="button"
                          onClick={() =>
                            onCidadesChange(toggleValue(selectedCidades, cidade.value))
                          }
                          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-neutral-50"
                        >
                          <Checkbox checked={checked} />
                          <span className="text-sm">{cidade.label}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export const LocationFilter = memo(LocationFilterImpl)
