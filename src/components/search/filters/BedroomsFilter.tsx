"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BedroomsFilterProps {
  value: string
  onChange: (value: string) => void
}

const BEDROOM_OPTIONS = [1, 2, 3, 4, 5, 6]

export function BedroomsFilter({ value, onChange }: BedroomsFilterProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold tracking-tight text-[#0B1120]">
        Quartos minimos
      </p>

      <div className="grid grid-cols-3 gap-2">
        {BEDROOM_OPTIONS.map((option) => {
          const active = value === String(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(String(option))}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-brand-primary bg-brand-primary-light text-[#0B1120]"
                  : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
              )}
            >
              {option}+
            </button>
          )
        })}
      </div>

      <Button
        variant="ghost"
        className="h-8 px-2 text-sm text-neutral-500 hover:text-[#0B1120]"
        onClick={() => onChange("")}
      >
        Limpar quartos
      </Button>
    </div>
  )
}
