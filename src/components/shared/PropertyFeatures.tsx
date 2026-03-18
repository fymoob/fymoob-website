import { BedDouble, Bath, Car, Maximize } from "lucide-react"
import { formatArea } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface PropertyFeaturesProps {
  dormitorios: number | null
  banheiros: number | null
  vagas: number | null
  areaPrivativa: number | null
  size?: "sm" | "md"
  className?: string
}

export function PropertyFeatures({
  dormitorios,
  banheiros,
  vagas,
  areaPrivativa,
  size = "md",
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
            className="shrink-0 text-neutral-400"
          />
          <span className={cn("font-medium", textClass)}>
            {feature.value} {feature.label}
          </span>
        </div>
      ))}
    </div>
  )
}
