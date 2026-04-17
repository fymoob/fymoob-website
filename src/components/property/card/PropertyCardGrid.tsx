"use client"

import Link from "next/link"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"
import { CardBadge } from "./CardBadge"
import { PhotoCarousel } from "./PhotoCarousel"
import { FavoriteButton } from "./FavoriteButton"

interface PropertyCardGridProps {
  property: Property
  prioritizeFirstImage?: boolean
  priceContext?: PriceContext
}

export function PropertyCardGrid({
  property,
  prioritizeFirstImage = false,
  priceContext = null,
}: PropertyCardGridProps) {
  const {
    alt,
    hasPrice,
    displayPrice,
    isRental,
    pillLabel,
    hasSecondaryPrice,
    displaySecondaryPrice,
    displayPhotos,
    badge,
    propertyHref,
    loadPhotosOnHover,
    secondaryIsRental,
  } = usePropertyCard(property, priceContext)

  // Finalidade pill colorida — usa pillLabel do helper (detecta dual por precos > 0)
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <PhotoCarousel
          photos={displayPhotos}
          alt={alt}
          codigo={property.codigo}
          prioritizeFirstImage={prioritizeFirstImage}
          imageClassName="transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
        />

        {/* Top gradient — subtle, only to ensure badge + wishlist readability */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

        {badge && <CardBadge badge={badge} className="absolute left-3 top-3 z-20" />}

        <FavoriteButton
          codigo={property.codigo}
          className="right-3 top-3 size-9"
        />
      </div>

      {/* Content — padrão do Compact, ~20% maior por ter mais largura disponível */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
        {/* Header: pill finalidade + tipo · bairro */}
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

        <h2 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight text-slate-800 transition-colors group-hover:text-slate-600">
          {property.titulo}
        </h2>

        <PropertyFeatures
          dormitorios={property.dormitorios}
          suites={property.suites}
          banheiros={property.banheiros}
          vagas={property.vagas}
          areaPrivativa={property.areaPrivativa}
          cardCompact
        />

        {/* Price block — anchored at bottom, same pattern as Compact */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p
              className={cn(
                "tracking-tight",
                hasPrice
                  ? "text-[28px] font-extrabold leading-none text-slate-900 sm:text-3xl"
                  : "text-base font-medium text-slate-400"
              )}
            >
              {displayPrice}
              {isRental && hasPrice && (
                <span className="text-sm font-normal text-slate-500"> /mês</span>
              )}
            </p>
            {hasSecondaryPrice && (
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {secondaryIsRental ? "Aluguel " : "Venda "}
                {displaySecondaryPrice}
                {secondaryIsRental && " /mês"}
              </p>
            )}
          </div>
          <span
            className="relative z-20 cursor-text select-all self-end text-sm font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-700"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            title="Clique para selecionar o código"
          >
            {property.codigo}
          </span>
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
