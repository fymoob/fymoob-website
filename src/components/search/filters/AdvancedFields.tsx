"use client"

import { useState } from "react"
import { Maximize2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/* ── Top characteristics shown by default (most universally asked for) ── */
export const TOP_CARACTERISTICAS = [
  "Churrasqueira",
  "Piscina",
  "Quintal",
  "Sacada com Churrasqueira",
  "Lareira",
  "Sauna",
  "Espaço Gourmet",
  "Salão de Festas",
  "Playground",
  "Sala Fitness",
  "Piscina Aquecida",
  "Portaria 24h",
] as const

/* ── Full list shown after "Ver mais" is clicked ── */
export const MORE_CARACTERISTICAS = [
  "Aceita Pet",
  "Ar Condicionado",
  "Armários Embutidos",
  "Cozinha Planejada",
  "Hidromassagem",
  "Home Theater",
  "Mobiliado",
  "Semi Mobiliado",
  "Suíte Master",
  "Terraço",
  "Vista Panorâmica",
  "Vista para o Mar",
  "Frente Mar",
  "Deck",
  "Reformado",
  "Brinquedoteca",
  "Churrasqueira Coletiva",
  "Coworking",
  "Elevador",
  "Quadra de Esportes",
  "Quadra de Tênis",
  "Salão de Jogos",
  "Spa",
  "Vigilância 24h",
  "Bicicletário",
  "Pet Place",
  "Parque",
] as const

/* ── Number selector with "Tanto faz" explicit option ── */
export function NumberSelector({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const options = ["", "1", "2", "3", "4"]
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt || "any"}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "flex-1 rounded-xl py-2.5 text-sm font-medium transition-all",
            value === opt
              ? "bg-brand-primary text-white shadow-sm"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          )}
        >
          {opt ? `${opt}+` : "Tanto faz"}
        </button>
      ))}
    </div>
  )
}

/* ── Area range input (m²) ── */
export function AreaRangeInput({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  minValue: string
  maxValue: string
  onMinChange: (v: string) => void
  onMaxChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <Input
        type="number"
        value={minValue}
        onChange={(e) => onMinChange(e.target.value)}
        placeholder="Min m²"
        className="h-10 rounded-xl text-sm"
      />
      <span className="text-xs text-neutral-400">a</span>
      <Input
        type="number"
        value={maxValue}
        onChange={(e) => onMaxChange(e.target.value)}
        placeholder="Max m²"
        className="h-10 rounded-xl text-sm"
      />
    </div>
  )
}

/* ── Characteristics checkbox grid ── */
export function CaracteristicasCheckboxes({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (label: string) => void
}) {
  const [showMore, setShowMore] = useState(false)
  const visible = showMore
    ? [...TOP_CARACTERISTICAS, ...MORE_CARACTERISTICAS]
    : TOP_CARACTERISTICAS

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
        {visible.map((label) => {
          const checked = selected.includes(label)
          return (
            <label
              key={label}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(label)}
                className="size-4 cursor-pointer rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
              />
              <span>{label}</span>
            </label>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="mt-4 text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
      >
        {showMore ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  )
}
