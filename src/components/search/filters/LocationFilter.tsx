"use client"

import { useMemo, useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { MultiSelectOption } from "./types"
import type { GroupedBairroOptions } from "../useSearchBarController"

/** Accent-insensitive lowercase */
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
  if (set.has(value)) {
    set.delete(value)
  } else {
    set.add(value)
  }
  return Array.from(set)
}

export function LocationFilter({
  bairros,
  cidades,
  selectedBairros,
  selectedCidades,
  onBairrosChange,
  onCidadesChange,
  groupedBairros,
}: LocationFilterProps) {
  const [query, setQuery] = useState("")

  // Use grouped bairros if available, fall back to flat list
  const useGrouped = groupedBairros && groupedBairros.length > 0

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
    if (useGrouped) return [] // handled by groups
    const q = normalize(query.trim())
    if (!q) return bairros
    return bairros.filter((bairro) =>
      normalize(bairro.label).includes(q)
    )
  }, [bairros, query, useGrouped])

  const filteredCidades = useMemo(() => {
    if (useGrouped) return [] // cities become group headers
    const q = normalize(query.trim())
    if (!q) return cidades
    return cidades.filter((cidade) =>
      normalize(cidade.label).includes(q)
    )
  }, [cidades, query, useGrouped])

  const isEmpty = useGrouped
    ? filteredGroups.length === 0
    : filteredBairros.length === 0 && filteredCidades.length === 0

  return (
    <div>
      <Command>
        <CommandInput
          placeholder="Buscar bairro ou cidade..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isEmpty ? (
            <CommandEmpty>Nenhuma localização encontrada.</CommandEmpty>
          ) : useGrouped ? (
            <>
              {filteredGroups.map((group) => (
                <CommandGroup key={group.cidade} heading={group.cidade}>
                  {group.bairros.map((bairro) => {
                    const checked = selectedBairros.includes(bairro.value)
                    return (
                      <CommandItem
                        key={bairro.value}
                        onClick={() =>
                          onBairrosChange(toggleValue(selectedBairros, bairro.value))
                        }
                      >
                        <Checkbox checked={checked} />
                        <span className="flex-1 text-sm">{bairro.label}</span>
                        <span className="text-xs text-neutral-400">({bairro.count})</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
            </>
          ) : (
            <>
              {filteredBairros.length > 0 && (
                <CommandGroup heading="Bairros">
                  {filteredBairros.map((bairro) => {
                    const checked = selectedBairros.includes(bairro.value)
                    return (
                      <CommandItem
                        key={bairro.value}
                        onClick={() =>
                          onBairrosChange(toggleValue(selectedBairros, bairro.value))
                        }
                      >
                        <Checkbox checked={checked} />
                        <span className="text-sm">{bairro.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}

              {filteredCidades.length > 0 && (
                <CommandGroup heading="Cidades">
                  {filteredCidades.map((cidade) => {
                    const checked = selectedCidades.includes(cidade.value)
                    return (
                      <CommandItem
                        key={cidade.value}
                        onClick={() =>
                          onCidadesChange(toggleValue(selectedCidades, cidade.value))
                        }
                      >
                        <Checkbox checked={checked} />
                        <span className="text-sm">{cidade.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
