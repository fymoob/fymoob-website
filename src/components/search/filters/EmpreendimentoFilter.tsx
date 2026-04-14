"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { slugify } from "@/lib/utils"

interface EmpreendimentoFilterProps {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export function EmpreendimentoFilter({ options, value, onChange }: EmpreendimentoFilterProps) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const suggestions = useMemo(() => {
    const q = slugify(query.trim())
    if (!q) return []
    return options
      .filter((name) => slugify(name).includes(q))
      .slice(0, 8)
  }, [options, query])

  // If a value is already applied, show it as a chip
  if (value) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl border border-brand-primary bg-brand-primary/5 px-3 py-2">
        <span className="truncate text-sm font-medium text-brand-primary">
          {value}
        </span>
        <button
          type="button"
          onClick={() => {
            onChange("")
            setQuery("")
          }}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-brand-primary hover:bg-brand-primary/10"
          aria-label="Remover empreendimento"
        >
          <X className="size-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          // Delay to allow click on suggestion
          setTimeout(() => setFocused(false), 150)
        }}
        placeholder="Digite para buscar..."
        className="h-10 rounded-xl text-sm"
      />
      {focused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-lg">
          <ul className="py-1">
            {suggestions.map((name) => (
              <li key={name}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    onChange(name)
                    setQuery("")
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {focused && query.trim() && suggestions.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-500 shadow-lg">
          Nenhum empreendimento encontrado
        </div>
      )}
    </div>
  )
}
