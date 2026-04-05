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
  className?: string
}

export function PropertyFeatures({
  dormitorios,
  banheiros,
  vagas,
  areaPrivativa,
  size = "md",
  compact = false,
  className,
}: PropertyFeaturesProps) {
  const iconSize = size === "sm" ? 14 : 18
  const textClass = size === "sm" ? "text-xs" : "text-sm"

  const features = [
    { icon: Maximize, value: areaPrivativa ? formatArea(areaPrivativa) : null, label: "Área" },
    { icon: BedDouble, value: dormitorios, label: dormitorios === 1 ? "Quarto" : "Quartos" },
    { icon: Bath, value: banheiros, label: banheiros === 1 ? "Banheiro" : "Banheiros" },
    { icon: Car, value: vagas, label: vagas === 1 ? "Vaga" : "Vagas" },
  ].filter((f) => f.value !== null && f.value !== 0)

  if (features.length === 0) return null

  if (compact) {
    return (
      <p className={cn("text-xs text-neutral-500", className)}>
        {features.map((f, i) => (
          <span key={f.label}>
            <span className="font-semibold text-neutral-700">{f.value}</span>
            {" "}{f.label}
            {i < features.length - 1 && <span className="mx-1.5 text-neutral-300">·</span>}
          </span>
        ))}
      </p>
    )
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {features.map((feature) => (
        <div
          key={feature.label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-neutral-50 text-neutral-600",
            size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5"
          )}
        >
          <feature.icon
            size={iconSize}
            className="shrink-0 text-neutral-500"
          />
          <span className={cn("font-medium", textClass)}>
            {feature.value} {feature.label}
          </span>
        </div>
      ))}
    </div>
  )
}
