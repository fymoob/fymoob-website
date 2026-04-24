"use client"

import { memo, useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import type { MultiSelectOption } from "./types"

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

interface CityFilterProps {
  cidades: MultiSelectOption[]
  selectedCidades: string[]
  onCidadesChange: (values: string[]) => void
}

function toggleValue(values: string[], value: string): string[] {
  const set = new Set(values)
  if (set.has(value)) set.delete(value)
  else set.add(value)
  return Array.from(set)
}

// Filtro dedicado de Cidade. Usado no mobile chip sheet e no
// AdvancedFiltersModal. Paridade com o popover "Cidade" do desktop
// (SegmentTrigger + CountedMultiSelect).
function CityFilterImpl({
  cidades,
  selectedCidades,
  onCidadesChange,
}: CityFilterProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return cidades
    return cidades.filter((c) => normalize(c.label).includes(q))
  }, [cidades, query])

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          inputMode="search"
          placeholder="Buscar cidade..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-primary"
          autoComplete="off"
        />
      </div>

      <div className="mt-2 max-h-[320px] overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-neutral-500">
            Nenhuma cidade encontrada.
          </p>
        ) : (
          <ul className="py-2">
            {filtered.map((cidade) => {
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
                    <span className="flex-1 text-sm font-medium">{cidade.label}</span>
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

export const CityFilter = memo(CityFilterImpl)
