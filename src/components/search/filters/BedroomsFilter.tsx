"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
    if (!val) return emptyLabel
    return val === "5" ? "5+" : val
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Mínimo
          </label>
          <Select value={minValue || "any"} onValueChange={handleMinChange}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue>{renderLabel(minValue, "Sem mín.")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Sem mín.</SelectItem>
              {BEDROOM_OPTIONS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n === "5" ? "5+" : n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Máximo
          </label>
          <Select value={maxValue || "any"} onValueChange={handleMaxChange}>
            <SelectTrigger className="w-full rounded-xl">
              <SelectValue>{renderLabel(maxValue, "Sem máx.")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Sem máx.</SelectItem>
              {BEDROOM_OPTIONS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n === "5" ? "5+" : n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasAny && (
        <Button
          variant="ghost"
          className="h-8 px-2 text-sm text-neutral-500 hover:text-[#0B1120]"
          onClick={() => {
            onMinChange("")
            onMaxChange("")
          }}
        >
          Limpar quartos
        </Button>
      )}
    </div>
  )
}
