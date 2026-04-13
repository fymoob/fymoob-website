"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BedroomsFilterProps {
  minValue: string
  maxValue: string
  onMinChange: (value: string) => void
  onMaxChange: (value: string) => void
}

const BEDROOM_OPTIONS = ["1", "2", "3", "4", "5"]

function Selector({
  label,
  value,
  onChange,
  emptyLabel,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  emptyLabel: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onChange("")}
          className={cn(
            "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
            value === ""
              ? "border-brand-primary bg-brand-primary-light text-[#0B1120]"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
          )}
        >
          {emptyLabel}
        </button>
        {BEDROOM_OPTIONS.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-brand-primary bg-brand-primary-light text-[#0B1120]"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
              )}
            >
              {option === "5" ? "5+" : option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function BedroomsFilter({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: BedroomsFilterProps) {
  const hasAny = minValue !== "" || maxValue !== ""

  return (
    <div className="space-y-4">
      <Selector
        label="Mínimo"
        value={minValue}
        onChange={(v) => {
          onMinChange(v)
          // Keep max >= min
          if (v && maxValue && Number(maxValue) < Number(v)) {
            onMaxChange(v)
          }
        }}
        emptyLabel="Sem mín."
      />
      <Selector
        label="Máximo"
        value={maxValue}
        onChange={(v) => {
          onMaxChange(v)
          // Keep min <= max
          if (v && minValue && Number(minValue) > Number(v)) {
            onMinChange(v)
          }
        }}
        emptyLabel="Sem máx."
      />

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
