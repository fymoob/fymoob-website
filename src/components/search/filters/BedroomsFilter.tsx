"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BedroomsFilterProps {
  minValue: string
  maxValue: string
  onMinChange: (value: string) => void
  onMaxChange: (value: string) => void
}

const BEDROOM_OPTIONS = ["1", "2", "3", "4", "5"]

export function BedroomsFilter({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: BedroomsFilterProps) {
  const hasAny = minValue !== "" || maxValue !== ""

  const handleMinChange = (value: string | null) => {
    const next = !value || value === "any" ? "" : value
    onMinChange(next)
    if (next && maxValue && Number(maxValue) < Number(next)) {
      onMaxChange(next)
    }
  }

  const handleMaxChange = (value: string | null) => {
    const next = !value || value === "any" ? "" : value
    onMaxChange(next)
    if (next && minValue && Number(minValue) > Number(next)) {
      onMinChange(next)
    }
  }

  const renderLabel = (val: string, emptyLabel: string) => {
    if (!val) return <span className="text-neutral-400">{emptyLabel}</span>
    const display = val === "5" ? "5+" : val
    return (
      <span className="font-semibold text-slate-900">
        {display} <span className="font-normal text-slate-500">{Number(val) === 1 ? "quarto" : "quartos"}</span>
      </span>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Mínimo
          </label>
          <Select value={minValue || "any"} onValueChange={handleMinChange}>
            <SelectTrigger className="h-11 w-full rounded-xl border-neutral-200 bg-white px-3.5 hover:border-neutral-300 data-[popup-open]:border-brand-primary data-[popup-open]:ring-2 data-[popup-open]:ring-brand-primary/10">
              <SelectValue>{renderLabel(minValue, "Sem mín.")}</SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="z-[10000] rounded-xl border-neutral-200 shadow-lg">
              <SelectItem value="any" className="py-2.5 text-sm text-neutral-500">
                Sem mínimo
              </SelectItem>
              {BEDROOM_OPTIONS.map((n) => (
                <SelectItem key={n} value={n} className="py-2.5 text-sm font-medium">
                  {n === "5" ? "5+" : n} {Number(n) === 1 ? "quarto" : "quartos"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Máximo
          </label>
          <Select value={maxValue || "any"} onValueChange={handleMaxChange}>
            <SelectTrigger className="h-11 w-full rounded-xl border-neutral-200 bg-white px-3.5 hover:border-neutral-300 data-[popup-open]:border-brand-primary data-[popup-open]:ring-2 data-[popup-open]:ring-brand-primary/10">
              <SelectValue>{renderLabel(maxValue, "Sem máx.")}</SelectValue>
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false} className="z-[10000] rounded-xl border-neutral-200 shadow-lg">
              <SelectItem value="any" className="py-2.5 text-sm text-neutral-500">
                Sem máximo
              </SelectItem>
              {BEDROOM_OPTIONS.map((n) => (
                <SelectItem key={n} value={n} className="py-2.5 text-sm font-medium">
                  {n === "5" ? "5+" : n} {Number(n) === 1 ? "quarto" : "quartos"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasAny && (
        <button
          type="button"
          onClick={() => {
            onMinChange("")
            onMaxChange("")
          }}
          className="text-xs font-medium text-neutral-500 underline underline-offset-2 hover:text-slate-900"
        >
          Limpar quartos
        </button>
      )}
    </div>
  )
}
