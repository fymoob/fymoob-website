"use client"

import { Input } from "@/components/ui/input"
import type { SearchDraftFilters } from "./search-state"
import type { Dispatch, SetStateAction } from "react"

interface AdvancedFiltersProps {
  pendingFilters: SearchDraftFilters
  setPendingFilters: Dispatch<SetStateAction<SearchDraftFilters>>
}

function NumberSelector({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const options = ["", "1", "2", "3", "4"]
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <div className="flex gap-1.5">
        {options.map((opt) => (
          <button
            key={opt || "any"}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
              value === opt
                ? "bg-brand-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {opt ? `${opt}+` : "Todos"}
          </button>
        ))}
      </div>
    </div>
  )
}

export function AdvancedFilters({
  pendingFilters,
  setPendingFilters,
}: AdvancedFiltersProps) {
  return (
    <div className="space-y-5">
      {/* Codigo */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Codigo do imovel
        </p>
        <Input
          value={pendingFilters.codigo}
          onChange={(e) =>
            setPendingFilters((c) => ({ ...c, codigo: e.target.value }))
          }
          placeholder="Ex: AP00296"
          className="h-10 text-sm"
        />
      </div>

      {/* Suites */}
      <NumberSelector
        label="Suites"
        value={pendingFilters.suitesMin}
        onChange={(v) => setPendingFilters((c) => ({ ...c, suitesMin: v }))}
      />

      {/* Banheiros */}
      <NumberSelector
        label="Banheiros"
        value={pendingFilters.banheirosMin}
        onChange={(v) => setPendingFilters((c) => ({ ...c, banheirosMin: v }))}
      />

      {/* Vagas */}
      <NumberSelector
        label="Vagas de garagem"
        value={pendingFilters.vagasMin}
        onChange={(v) => setPendingFilters((c) => ({ ...c, vagasMin: v }))}
      />
    </div>
  )
}
