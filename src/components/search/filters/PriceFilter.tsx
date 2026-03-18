"use client"

import { Slider } from "@/components/ui/slider"
import { PRICE_STEP, type PriceBounds, normalizeRange } from "./search-state"

interface PriceFilterProps {
  value: [number, number]
  bounds: PriceBounds
  onChange: (value: [number, number]) => void
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })
}

function formatCompactCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })} mi`
  }

  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 0,
    })} mil`
  }

  return formatCurrency(value)
}

export function PriceFilter({ value, bounds, onChange }: PriceFilterProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold tracking-tight text-[#0B1120]">
          Faixa de preco
        </p>
        <p className="text-xs text-neutral-500">
          {formatCurrency(value[0])} ate {formatCurrency(value[1])}
        </p>
      </div>

      <Slider
        thumbCount={2}
        min={bounds.min}
        max={bounds.max}
        step={PRICE_STEP}
        minStepsBetweenValues={1}
        value={value}
        onValueChange={(next) => onChange(normalizeRange(next, bounds))}
        aria-label="Faixa de preco"
      />

      <div className="flex items-center justify-between text-xs font-medium text-neutral-500">
        <span>{formatCompactCurrency(bounds.min)}</span>
        <span>{formatCompactCurrency(bounds.max)}</span>
      </div>
    </div>
  )
}
