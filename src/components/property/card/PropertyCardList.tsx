"use client"

import Image from "next/image"
import Link from "next/link"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"
import { isVistaImage } from "@/lib/image-optimization"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"
import { CardBadge } from "./CardBadge"
import { FavoriteButton } from "./FavoriteButton"

interface PropertyCardListProps {
  property: Property
  prioritizeFirstImage?: boolean
  priceContext?: PriceContext
}

export function PropertyCardList({
  property,
  prioritizeFirstImage = false,
  priceContext = null,
}: PropertyCardListProps) {
  const {
    alt,
    hasPrice,
    displayPrice,
    isRental,
    pillLabel,
    hasSecondaryPrice,
    secondaryIsRental,
    displaySecondaryPrice,
    displayPhotos,
    badge,
    propertyHref,
    loadPhotosOnHover,
  } = usePropertyCard(property, priceContext)

  // Unificado com Grid/Compact — pill colorida de finalidade
  // Usa pillLabel do helper (detecta dual por precos > 0, nao por Finalidade CRM)
  const finalidadePill =
    pillLabel === "Venda"
      ? { label: "Venda", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200/70" }
      : pillLabel === "Aluguel"
        ? { label: "Aluguel", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70" }
        : pillLabel === "Venda e Locação"
          ? { label: "Venda · Aluguel", className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/70" }
          : null

  return (
    <article
      onMouseEnter={loadPhotosOnHover}
      className="group relative flex overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
    >
      {/* Image — fixed width, clean */}
      <div className="relative w-[300px] shrink-0 self-stretch overflow-hidden">
        <Image
          src={displayPhotos[0]}
          alt={alt}
          fill
          loading={prioritizeFirstImage ? "eager" : "lazy"}
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          sizes="300px"
          unoptimized={isVistaImage(displayPhotos[0])}
        />

        {/* Badge — glass morphism unificado */}
        {badge && <CardBadge badge={badge} className="absolute left-3 top-3 z-20" />}
      </div>

      {/* Content — 2 column layout */}
      <div className="flex min-w-0 flex-1 flex-row justify-between p-6">
        {/* Left: Info */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header unificado: pill finalidade + tipo · bairro inline */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm font-medium uppercase tracking-wide text-slate-500">
            {finalidadePill && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
                  finalidadePill.className
                )}
              >
                {finalidadePill.label}
              </span>
            )}
            <span className="font-semibold text-slate-700">{property.tipo}</span>
            {property.bairro && (
              <>
                <span aria-hidden className="text-slate-300">·</span>
                <span className="truncate">{property.bairro}</span>
              </>
            )}
          </div>

          <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-800 transition-colors group-hover:text-slate-600">
            {property.titulo}
          </h2>

          <div className="mt-auto pt-4">
            <PropertyFeatures
              dormitorios={property.dormitorios}
              suites={property.suites}
              banheiros={property.banheiros}
              vagas={property.vagas}
              areaPrivativa={property.areaPrivativa}
              cardCompact
            />
          </div>
        </div>

        {/* Right: Conversion */}
        <div className="flex flex-col items-end justify-between pl-6">
          {/* FavoriteButton — posicionado relative (nao absolute) neste layout */}
          <div className="relative size-9">
            <FavoriteButton
              codigo={property.codigo}
              className="inset-0 size-9 !bg-white hover:!bg-white"
            />
          </div>

          {/* Bloco de preço com hierarquia clara */}
          <div className="flex flex-col items-end gap-0.5 border-t border-slate-100 pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {isRental ? "Valor · Aluguel" : "Valor · Venda"}
            </span>
            <p
              className={cn(
                "tracking-tight tabular-nums",
                hasPrice
                  ? "text-2xl font-extrabold text-slate-900"
                  : "text-base font-medium text-slate-400"
              )}
            >
              {displayPrice}
              {isRental && hasPrice && (
                <span className="text-sm font-normal text-slate-500"> /mês</span>
              )}
            </p>
            {hasSecondaryPrice && (
              <p className="text-xs font-medium text-slate-500 tabular-nums">
                {secondaryIsRental ? "Aluguel " : "Venda "}
                {displaySecondaryPrice}
                {secondaryIsRental && " /mês"}
              </p>
            )}
            <span
              className="relative z-20 mt-1 cursor-text select-all text-xs font-medium uppercase tracking-wide text-slate-400 hover:text-slate-600"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              title="Clique para selecionar o código"
            >
              {property.codigo}
            </span>
          </div>
        </div>
      </div>

      <Link
        href={propertyHref}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${property.titulo}`}
      />
    </article>
  )
}
