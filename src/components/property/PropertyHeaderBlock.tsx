import { MapPin } from "lucide-react"

import type { Property, PropertyPageVariant } from "@/types/property"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"

interface PropertyHeaderBlockProps {
  property: Property
  shortTitle: string
  variant: PropertyPageVariant
}

export function PropertyHeaderBlock({
  property,
  shortTitle,
  variant,
}: PropertyHeaderBlockProps) {
  const isPremium = variant === "premium"

  return (
    <div className={cn("mt-6 md:mt-8", isPremium && "mt-10 md:mt-14")}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase text-slate-500",
          isPremium ? "tracking-[0.24em]" : "tracking-wider"
        )}
      >
        {property.tipo} • {property.bairro}
      </span>

      <h1
        className={cn(
          "mt-3 leading-tight tracking-tight text-slate-900",
          isPremium
            ? "max-w-3xl text-3xl font-semibold md:text-[3.35rem] md:leading-[0.96]"
            : "text-2xl font-bold md:text-3xl"
        )}
      >
        {shortTitle || property.titulo}
      </h1>

      <div className={cn("mt-4 flex flex-wrap items-center gap-2", isPremium && "mt-5")}>
        <PropertyBadge variant={property.finalidade === "Venda" ? "sale" : "rent"}>
          {property.finalidade}
        </PropertyBadge>
        {!isPremium && <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>}
      </div>

      {(property.endereco || property.bairro) && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1.5 text-sm text-neutral-500",
            isPremium && "mt-5 text-base text-slate-500"
          )}
        >
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          {property.endereco
            ? `${[property.endereco, property.numero, property.bairro].filter(Boolean).join(", ")}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {!isPremium && (
        <div className="mt-5">
          <div className="h-0.5 w-16 rounded-full bg-brand-primary" />
          <div className="mt-4">
            <PropertyFeatures
              dormitorios={property.dormitorios}
              suites={property.suites}
              banheiros={property.banheiros}
              vagas={property.vagas}
              areaPrivativa={property.areaPrivativa}
              areaTotal={property.areaTotal}
              searchGrid
            />
          </div>
        </div>
      )}

      {isPremium && (
        <div className="mt-10 max-w-2xl border-t border-slate-200/80 pt-8 md:mt-12 md:pt-10">
          <p className="text-sm leading-7 text-slate-500 md:text-[15px]">
            Atendimento consultivo com foco na apresentação completa do imóvel,
            disponibilidade e condições de visita.
          </p>
        </div>
      )}
    </div>
  )
}
