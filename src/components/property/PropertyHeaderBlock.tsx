import { MapPin } from "lucide-react"

import type { Property, PropertyPageVariant } from "@/types/property"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn, formatPrice } from "@/lib/utils"

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
  const isSaleOnly = property.finalidade === "Venda"

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
            ? "max-w-3xl text-[clamp(2.25rem,1.55rem+1.8vw,3.45rem)] font-semibold md:leading-[0.96]"
            : "text-[clamp(2rem,1.35rem+1vw,2.7rem)] font-bold"
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

      {!isPremium && isSaleOnly && property.precoVenda && (
        <p className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900 lg:hidden">
          {formatPrice(property.precoVenda)}
        </p>
      )}

      {!isPremium && (
        <div className={isSaleOnly && property.precoVenda ? "mt-5 lg:mt-5" : "mt-5"}>
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
        <div className="mt-10 border-t border-slate-200/80 pt-8 md:mt-12 md:pt-10">
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
      )}
    </div>
  )
}
