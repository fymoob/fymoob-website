import { BedDouble, Car, Maximize, ShowerHead, Toilet } from "lucide-react"

import { cn, formatArea } from "@/lib/utils"

interface PropertyFeaturesProps {
  dormitorios: number | null
  suites?: number | null
  banheiros: number | null
  vagas: number | null
  areaPrivativa: number | null
  areaTotal?: number | null
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
  suites,
  banheiros,
  vagas,
  areaPrivativa,
  areaTotal,
  size = "md",
  compact = false,
  iconOnly = false,
  editorial = false,
  searchGrid = false,
  cardCompact = false,
  className,
}: PropertyFeaturesProps) {
  const showAreaTotal = areaTotal && areaTotal !== areaPrivativa

  const features = [
    {
      icon: Maximize,
      value: areaPrivativa ? formatArea(areaPrivativa) : null,
      unit: "m²",
      label: "Área",
      shortLabel: "m²",
      rawValue: areaPrivativa,
    },
    ...(showAreaTotal ? [{
      icon: Maximize,
      value: formatArea(areaTotal),
      unit: "m² total",
      label: "Área total",
      shortLabel: "m² total",
      rawValue: areaTotal,
    }] : []),
    {
      icon: BedDouble,
      value: dormitorios,
      unit: dormitorios === 1 ? "quarto" : "quartos",
      label: "Quartos",
      shortLabel: dormitorios === 1 ? "quarto" : "quartos",
      rawValue: dormitorios,
    },
    {
      icon: ShowerHead,
      value: suites,
      unit: suites === 1 ? "suíte" : "suítes",
      label: "Suítes",
      shortLabel: suites === 1 ? "suíte" : "suítes",
      rawValue: suites,
    },
    {
      icon: Toilet,
      // CRM includes suites in TotalBanheiros — subtract to show only social bathrooms
      value: banheiros && suites ? banheiros - suites : banheiros,
      unit: (banheiros && suites ? banheiros - suites : banheiros) === 1 ? "banheiro" : "banheiros",
      label: "Banheiros",
      shortLabel: (banheiros && suites ? banheiros - suites : banheiros) === 1 ? "banheiro" : "banheiros",
      rawValue: banheiros && suites ? banheiros - suites : banheiros,
    },
    {
      icon: Car,
      value: vagas,
      unit: vagas === 1 ? "vaga" : "vagas",
      label: "Vagas",
      shortLabel: vagas === 1 ? "vaga" : "vagas",
      rawValue: vagas,
    },
  ].filter((feature) => feature.value !== null && feature.value !== 0)

  if (features.length === 0) return null

  if (cardCompact) {
    return (
      <div className={cn("flex items-center gap-3 sm:gap-5", className)}>
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <span
              key={feature.label}
              className="inline-flex items-center gap-1.5 sm:gap-2"
            >
              <Icon className="shrink-0 size-3.5 sm:size-5 text-slate-700" strokeWidth={2} />
              <span className="text-sm font-semibold text-slate-800 sm:text-lg sm:font-bold sm:text-slate-900">
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
          "grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-5 sm:gap-x-3 sm:gap-y-3",
          className
        )}
      >
        {features.map((feature) => {
          const Icon = feature.icon
          const displayValue =
            feature.label === "Área" && typeof feature.rawValue === "number"
              ? feature.rawValue.toLocaleString("pt-BR")
              : feature.label === "Área total" && typeof feature.rawValue === "number"
                ? feature.rawValue.toLocaleString("pt-BR")
                : feature.value

          return (
            <div key={feature.label} className="flex items-center gap-2.5 sm:flex-col sm:items-center sm:gap-1.5">
              <Icon
                className="size-4 shrink-0 text-slate-400 sm:size-4 sm:text-slate-500"
                strokeWidth={2}
              />
              <div className="sm:text-center">
                <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-lg">
                  {displayValue}
                </span>
                <span className="ml-1 text-xs font-medium text-slate-500">
                  {feature.shortLabel}
                </span>
              </div>
            </div>
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
              <Icon size={18} className="text-slate-500" strokeWidth={2} />
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
              <Icon size={12} className="shrink-0 text-neutral-500" strokeWidth={2} />
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
              className="shrink-0 text-neutral-500"
              strokeWidth={2}
            />
            <span className="font-bold text-neutral-900">{feature.value}</span>
            <span className="text-neutral-400">{feature.unit}</span>
          </span>
        )
      })}
    </div>
  )
}
