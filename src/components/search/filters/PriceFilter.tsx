"use client"

import dynamic from "next/dynamic"
import { PRICE_STEP, type PriceBounds, normalizeRange } from "./search-state"

// Slider @base-ui/react e pesado (RAF, pointer events, range normalization).
// Nao e LCP nem above-the-fold — renderiza so quando o usuario abre o popover
// de preco. Dynamic import corta ~20KB do bundle inicial e ~80ms de parse.
const Slider = dynamic(
  () => import("@/components/ui/slider").then((m) => ({ default: m.Slider })),
  {
    ssr: false,
    loading: () => <div className="h-5 w-full animate-pulse rounded-full bg-neutral-200" />,
  }
)

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
