"use client"

import { useMemo, useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { slugify } from "@/lib/utils"

interface EmpreendimentoFilterProps {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
}

export function EmpreendimentoFilter({ options, values, onChange }: EmpreendimentoFilterProps) {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const suggestions = useMemo(() => {
    const q = slugify(query.trim())
    if (!q) return []
    return options
      .filter((name) => slugify(name).includes(q) && !values.includes(name))
      .slice(0, 8)
  }, [options, query, values])

  const toggle = (name: string) => {
    if (values.includes(name)) {
      onChange(values.filter((v) => v !== name))
    } else {
      onChange([...values, name])
    }
  }

  return (
    <div className="space-y-2">
      {/* Selected chips */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary bg-brand-primary/5 px-3 py-1 text-xs font-medium text-brand-primary"
            >
              {name}
              <button
                type="button"
                onClick={() => toggle(name)}
                className="flex size-4 shrink-0 items-center justify-center rounded-full hover:bg-brand-primary/10"
                aria-label={`Remover ${name}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => setFocused(false), 150)
          }}
          placeholder={
            values.length > 0 ? "Adicionar outro..." : "Digite para buscar..."
          }
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
                      toggle(name)
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
    </div>
  )
}
