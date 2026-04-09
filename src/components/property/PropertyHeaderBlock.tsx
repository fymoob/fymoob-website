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
  const isDual =
    property.finalidade === "Venda e Locação" && property.precoVenda && property.precoAluguel
  const isRental = !isDual && property.finalidade !== "Venda"
  const price = isRental
    ? (property.precoAluguel ?? property.precoVenda)
    : (property.precoVenda ?? property.precoAluguel)
  const shouldShowConsultPrice = property.valorSobConsulta
  const priceLabel = shouldShowConsultPrice
    ? "VALOR DO IMÓVEL"
    : isDual
      ? "VALOR VENDA"
      : isRental
        ? "VALOR ALUGUEL"
        : "VALOR VENDA"

  return (
    <div className={cn("mt-6 md:mt-8", isPremium && "mt-8 md:mt-10")}>
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
            ? "max-w-4xl text-3xl font-semibold md:text-5xl"
            : "text-2xl font-bold md:text-3xl"
        )}
      >
        {shortTitle || property.titulo}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <PropertyBadge variant={property.finalidade === "Venda" ? "sale" : "rent"}>
          {property.finalidade}
        </PropertyBadge>
        <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>
      </div>

      {(property.endereco || property.bairro) && (
        <p
          className={cn(
            "mt-3 flex items-center gap-1.5 text-sm text-neutral-500",
            isPremium && "text-base text-slate-500"
          )}
        >
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          {property.endereco
            ? `${[property.endereco, property.numero, property.bairro].filter(Boolean).join(", ")}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {isPremium && (
        <div className="mt-6 flex flex-wrap items-end gap-4 border-t border-slate-200/80 pt-6">
          <div className="min-w-[220px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {priceLabel}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              {shouldShowConsultPrice ? "Valor sob consulta" : formatPrice(price)}
            </p>
          </div>
          <PropertyFeatures
            dormitorios={property.dormitorios}
            suites={property.suites}
            banheiros={property.banheiros}
            vagas={property.vagas}
            areaPrivativa={property.areaPrivativa}
            areaTotal={property.areaTotal}
            searchGrid
            className="min-w-[280px] flex-1"
          />
        </div>
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
    </div>
  )
}
