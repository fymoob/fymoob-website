"use client"

import { useState } from "react"
import { Home, Building2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/* ── Top characteristics — DA UNIDADE (inside the apt/house) ── */
export const TOP_UNIDADE = [
  "Churrasqueira",
  "Piscina",
  "Quintal",
  "Sacada com Churrasqueira",
  "Lareira",
  "Sauna",
] as const

export const MORE_UNIDADE = [
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
] as const

/* ── Top characteristics — DO CONDOMÍNIO (shared common area) ── */
export const TOP_CONDOMINIO = [
  "Espaço Gourmet",
  "Salão de Festas",
  "Playground",
  "Sala Fitness",
  "Piscina Aquecida",
  "Portaria 24h",
] as const

export const MORE_CONDOMINIO = [
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

/* ── Characteristics checkbox grid with two groups ── */
export function CaracteristicasCheckboxes({
  selectedUnidade,
  selectedCondominio,
  onToggleUnidade,
  onToggleCondominio,
}: {
  selectedUnidade: string[]
  selectedCondominio: string[]
  onToggleUnidade: (label: string) => void
  onToggleCondominio: (label: string) => void
}) {
  const [showMoreUnidade, setShowMoreUnidade] = useState(false)
  const [showMoreCondominio, setShowMoreCondominio] = useState(false)

  const unidadeVisible = showMoreUnidade
    ? [...TOP_UNIDADE, ...MORE_UNIDADE]
    : TOP_UNIDADE
  const condominioVisible = showMoreCondominio
    ? [...TOP_CONDOMINIO, ...MORE_CONDOMINIO]
    : TOP_CONDOMINIO

  return (
    <div className="space-y-6">
      {/* Da unidade */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Home className="size-3.5 text-neutral-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Da unidade
          </span>
          {selectedUnidade.length > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
              {selectedUnidade.length}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {unidadeVisible.map((label) => {
            const checked = selectedUnidade.includes(label)
            return (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleUnidade(label)}
                  className="size-4 cursor-pointer rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
                />
                <span>{label}</span>
              </label>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setShowMoreUnidade((v) => !v)}
          className="mt-3 text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
        >
          {showMoreUnidade ? "Ver menos" : "Ver mais"}
        </button>
      </div>

      {/* Do condomínio */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Building2 className="size-3.5 text-neutral-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Do condomínio
          </span>
          {selectedCondominio.length > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-brand-primary text-[10px] font-bold text-white">
              {selectedCondominio.length}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
          {condominioVisible.map((label) => {
            const checked = selectedCondominio.includes(label)
            return (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-700"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleCondominio(label)}
                  className="size-4 cursor-pointer rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
                />
                <span>{label}</span>
              </label>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setShowMoreCondominio((v) => !v)}
          className="mt-3 text-sm font-medium text-brand-primary hover:text-brand-primary-hover"
        >
          {showMoreCondominio ? "Ver menos" : "Ver mais"}
        </button>
      </div>
    </div>
  )
}
