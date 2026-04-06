"use client"

import { Checkbox } from "@/components/ui/checkbox"
import type { MultiSelectOption } from "./types"

interface TypeFilterProps {
  typeOptions: MultiSelectOption[]
  selectedTipos: string[]
  onTiposChange: (values: string[]) => void
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
  selectedTipos,
  onTiposChange,
}: TypeFilterProps) {
  return (
    <div>
      <p className="px-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        Tipo de imóvel
      </p>
      <div className="mt-1 max-h-64 space-y-0.5 overflow-y-auto">
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
  )
}
