"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { MultiSelectOption } from "./types"

interface TypeFilterProps {
  typeOptions: MultiSelectOption[]
  finalidadeOptions: MultiSelectOption[]
  selectedTipos: string[]
  selectedFinalidades: string[]
  onTiposChange: (values: string[]) => void
  onFinalidadesChange: (values: string[]) => void
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

function OptionRow({
  option,
  checked,
  onToggle,
}: {
  option: MultiSelectOption
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-neutral-100"
    >
      <Checkbox checked={checked} />
      <span className="text-sm text-[#0B1120]">{option.label}</span>
    </button>
  )
}

export function TypeFilter({
  typeOptions,
  finalidadeOptions,
  selectedTipos,
  selectedFinalidades,
  onTiposChange,
  onFinalidadesChange,
}: TypeFilterProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Tipo
        </p>
        <div className="mt-1 space-y-0.5">
          {typeOptions.map((option) => (
            <OptionRow
              key={option.value}
              option={option}
              checked={selectedTipos.includes(option.value)}
              onToggle={() =>
                onTiposChange(toggleValue(selectedTipos, option.value))
              }
            />
          ))}
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-3">
        <p className="px-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Finalidade
        </p>
        <div className="mt-1 space-y-0.5">
          {finalidadeOptions.map((option) => (
            <OptionRow
              key={option.value}
              option={option}
              checked={selectedFinalidades.includes(option.value)}
              onToggle={() =>
                onFinalidadesChange(
                  toggleValue(selectedFinalidades, option.value)
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
