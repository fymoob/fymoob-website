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

interface LocationFilterProps {
  bairros: MultiSelectOption[]
  cidades: MultiSelectOption[]
  selectedBairros: string[]
  selectedCidades: string[]
  onBairrosChange: (values: string[]) => void
  onCidadesChange: (values: string[]) => void
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
}: LocationFilterProps) {
  const [query, setQuery] = useState("")

  const filteredBairros = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return bairros
    return bairros.filter((bairro) =>
      bairro.label.toLowerCase().includes(normalized)
    )
  }, [bairros, query])

  const filteredCidades = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return cidades
    return cidades.filter((cidade) =>
      cidade.label.toLowerCase().includes(normalized)
    )
  }, [cidades, query])

  const isEmpty = filteredBairros.length === 0 && filteredCidades.length === 0

  return (
    <div className="space-y-3">
      <Command>
        <CommandInput
          placeholder="Buscar bairro ou cidade..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isEmpty ? (
            <CommandEmpty>Nenhuma localizacao encontrada.</CommandEmpty>
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
                        <span className="text-sm text-[#0B1120]">{bairro.label}</span>
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
                        <span className="text-sm text-[#0B1120]">{cidade.label}</span>
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
