import { BedDouble, Bath, Car, Maximize } from "lucide-react"
import { formatArea } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PropertyFeaturesProps {
  dormitorios: number | null
  banheiros: number | null
  vagas: number | null
  areaPrivativa: number | null
  size?: "sm" | "md"
  compact?: boolean
  iconOnly?: boolean
  editorial?: boolean
  className?: string
}

export function PropertyFeatures({
  dormitorios,
  banheiros,
  vagas,
  areaPrivativa,
  size = "md",
  compact = false,
  iconOnly = false,
  editorial = false,
  className,
}: PropertyFeaturesProps) {
  const features = [
    { icon: Maximize, value: areaPrivativa ? formatArea(areaPrivativa) : null, unit: "m²", label: "Área" },
    { icon: BedDouble, value: dormitorios, unit: dormitorios === 1 ? "Quarto" : "Quartos", label: "Quartos" },
    { icon: Bath, value: banheiros, unit: banheiros === 1 ? "Banheiro" : "Banheiros", label: "Banheiros" },
    { icon: Car, value: vagas, unit: vagas === 1 ? "Vaga" : "Vagas", label: "Vagas" },
  ].filter((f) => f.value !== null && f.value !== 0)

  if (features.length === 0) return null

  // Editorial: spread-out with justify-between, bronze accents
  if (editorial) {
    return (
      <div className={cn("flex items-center justify-start gap-8 py-4", className)}>
        {features.map((f) => {
          const Icon = f.icon
          return (
            <span key={f.label} className="inline-flex flex-col items-center gap-1.5">
              <Icon size={18} className="text-gray-500" strokeWidth={2} />
              <span className="text-lg font-medium text-slate-800">{f.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">{f.unit}</span>
            </span>
          )
        })}
      </div>
    )
  }

  // Icon-only: compact for card overlays
  if (iconOnly) {
    return (
      <div className={cn("flex items-center gap-3 text-neutral-500", className)}>
        {features.map((f) => {
          const Icon = f.icon
          return (
            <span key={f.label} className="inline-flex items-center gap-1">
              <Icon size={12} className="shrink-0 text-neutral-400" />
              <span className="text-[11px] font-bold text-neutral-700">{f.value}</span>
            </span>
          )
        })}
      </div>
    )
  }

  // Clean inline: "263 m² · 3 Quartos · 2 Vagas" — no pill backgrounds
  const textSize = size === "sm" ? "text-xs" : "text-sm"

  if (compact) {
    return (
      <p className={cn(textSize, "text-neutral-500", className)}>
        {features.map((f, i) => (
          <span key={f.label}>
            <span className="font-bold text-neutral-900">{f.value}</span>
            {" "}<span className="text-neutral-400">{f.unit}</span>
            {i < features.length - 1 && <span className="mx-1.5 text-neutral-300">·</span>}
          </span>
        ))}
      </p>
    )
  }

  // Default: clean inline with icons, no pill backgrounds
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <span
            key={feature.label}
            className={cn("inline-flex items-center gap-1.5", textSize)}
          >
            <Icon size={size === "sm" ? 14 : 16} className="shrink-0 text-neutral-400" />
            <span className="font-bold text-neutral-900">{feature.value}</span>
            <span className="text-neutral-400">{feature.unit}</span>
          </span>
        )
      })}
    </div>
  )
}
