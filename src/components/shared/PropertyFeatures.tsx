import { Bath, BedDouble, Car, Maximize } from "lucide-react"

import { cn, formatArea } from "@/lib/utils"

interface PropertyFeaturesProps {
  dormitorios: number | null
  banheiros: number | null
  vagas: number | null
  areaPrivativa: number | null
  size?: "sm" | "md"
  compact?: boolean
  iconOnly?: boolean
  editorial?: boolean
  searchGrid?: boolean
  cardCompact?: boolean
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
  searchGrid = false,
  cardCompact = false,
  className,
}: PropertyFeaturesProps) {
  const features = [
    {
      icon: Maximize,
      value: areaPrivativa ? formatArea(areaPrivativa) : null,
      unit: "m²",
      label: "Área",
      shortLabel: "M²",
      rawValue: areaPrivativa,
    },
    {
      icon: BedDouble,
      value: dormitorios,
      unit: dormitorios === 1 ? "Quarto" : "Quartos",
      label: "Quartos",
      shortLabel: "Quartos",
      rawValue: dormitorios,
    },
    {
      icon: Bath,
      value: banheiros,
      unit: banheiros === 1 ? "Banheiro" : "Banheiros",
      label: "Banheiros",
      shortLabel: "Banheiros",
      rawValue: banheiros,
    },
    {
      icon: Car,
      value: vagas,
      unit: vagas === 1 ? "Vaga" : "Vagas",
      label: "Vagas",
      shortLabel: "Vagas",
      rawValue: vagas,
    },
  ].filter((feature) => feature.value !== null && feature.value !== 0)

  if (features.length === 0) return null

  if (cardCompact) {
    return (
      <div className={cn("flex items-center gap-5", className)}>
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <span
              key={feature.label}
              className="inline-flex items-center gap-2"
            >
              <Icon size={20} className="shrink-0 text-slate-500" strokeWidth={1.75} />
              <span className="text-lg font-bold text-slate-900">
                {feature.value}
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  if (searchGrid) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 sm:gap-x-4",
          className
        )}
      >
        {features.map((feature) => {
          const Icon = feature.icon
          const displayValue =
            feature.label === "Área" && typeof feature.rawValue === "number"
              ? feature.rawValue.toLocaleString("pt-BR")
              : feature.value

          return (
            <span key={feature.label} className="inline-flex items-start gap-3">
              <Icon
                size={16}
                className="mt-0.5 shrink-0 text-slate-400"
                strokeWidth={1.9}
              />
              <span className="flex flex-col gap-1">
                <span className="text-lg font-semibold tracking-tight text-slate-900">
                  {displayValue}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  {feature.shortLabel}
                </span>
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  if (editorial) {
    return (
      <div className={cn("flex items-center justify-start gap-10 py-5", className)}>
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <span
              key={feature.label}
              className="inline-flex flex-col items-center gap-1.5"
            >
              <Icon size={18} className="text-gray-500" strokeWidth={2} />
              <span className="text-lg font-medium text-slate-800">
                {feature.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500">
                {feature.unit}
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  if (iconOnly) {
    return (
      <div className={cn("flex items-center gap-3 text-neutral-500", className)}>
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <span key={feature.label} className="inline-flex items-center gap-1">
              <Icon size={12} className="shrink-0 text-neutral-400" />
              <span className="text-[11px] font-bold text-neutral-700">
                {feature.value}
              </span>
            </span>
          )
        })}
      </div>
    )
  }

  const textSize = size === "sm" ? "text-xs" : "text-sm"

  if (compact) {
    return (
      <p className={cn(textSize, "text-neutral-500", className)}>
        {features.map((feature, index) => (
          <span key={feature.label}>
            <span className="font-bold text-neutral-900">{feature.value}</span>{" "}
            <span className="text-neutral-400">{feature.unit}</span>
            {index < features.length - 1 && (
              <span className="mx-1.5 text-neutral-300">·</span>
            )}
          </span>
        ))}
      </p>
    )
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1", className)}>
      {features.map((feature) => {
        const Icon = feature.icon

        return (
          <span
            key={feature.label}
            className={cn("inline-flex items-center gap-1.5", textSize)}
          >
            <Icon
              size={size === "sm" ? 14 : 16}
              className="shrink-0 text-neutral-400"
            />
            <span className="font-bold text-neutral-900">{feature.value}</span>
            <span className="text-neutral-400">{feature.unit}</span>
          </span>
        )
      })}
    </div>
  )
}
