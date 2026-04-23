"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface CountedMultiSelectOption {
  value: string
  label: string
  count?: number
  description?: string
}

interface CountedMultiSelectProps {
  options: CountedMultiSelectOption[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  searchPlaceholder?: string
  emptyText?: string
  maxHeightClassName?: string
}

const normalize = (value: string) =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

function toggleValue(values: string[], value: string): string[] {
  const set = new Set(values)
  if (set.has(value)) {
    set.delete(value)
  } else {
    set.add(value)
  }
  return Array.from(set)
}

export function CountedMultiSelect({
  options,
  selectedValues,
  onChange,
  searchPlaceholder = "Buscar...",
  emptyText = "Nenhuma opcao encontrada.",
  maxHeightClassName = "max-h-64",
}: CountedMultiSelectProps) {
  const [query, setQuery] = useState("")

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalize(query.trim())
    if (!normalizedQuery) return options

    return options.filter((option) => {
      const inLabel = normalize(option.label).includes(normalizedQuery)
      const inDescription = option.description
        ? normalize(option.description).includes(normalizedQuery)
        : false
      return inLabel || inDescription
    })
  }, [options, query])

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none transition-colors focus:border-brand-primary"
        />
      </div>

      <div className={cn("mt-2 overflow-y-auto", maxHeightClassName)}>
        {filteredOptions.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-neutral-500">{emptyText}</p>
        ) : (
          <ul>
            {filteredOptions.map((option) => {
              const checked = selectedValues.includes(option.value)
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => onChange(toggleValue(selectedValues, option.value))}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-neutral-50"
                  >
                    <Checkbox checked={checked} />
                    <span className="min-w-0 flex-1 truncate text-sm text-neutral-900">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="hidden truncate text-xs text-neutral-400 md:inline">
                        {option.description}
                      </span>
                    )}
                    {typeof option.count === "number" && (
                      <span className="shrink-0 text-xs text-neutral-400">
                        ({option.count})
                      </span>
                    )}
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
