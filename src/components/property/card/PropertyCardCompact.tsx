"use client"

import Link from "next/link"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"
import { CardBadge } from "./CardBadge"
import { PhotoCarousel } from "./PhotoCarousel"
import { FavoriteButton } from "./FavoriteButton"

interface PropertyCardCompactProps {
  property: Property
  prioritizeFirstImage?: boolean
  priceContext?: PriceContext
}

export function PropertyCardCompact({
  property,
  prioritizeFirstImage = false,
  priceContext = null,
}: PropertyCardCompactProps) {
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

  return (
    <article
      onMouseEnter={loadPhotosOnHover}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <PhotoCarousel
          photos={displayPhotos}
          alt={alt}
          codigo={property.codigo}
          prioritizeFirstImage={prioritizeFirstImage}
          imageClassName="transition-transform duration-[1500ms] ease-out group-hover:scale-110"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />

        {badge && <CardBadge badge={badge} className="absolute left-3 top-3 z-20" />}

        <FavoriteButton
          codigo={property.codigo}
          className="right-3 top-3 size-9"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-slate-500">
          {pillLabel === "Venda" && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-200/70">
              Venda
            </span>
          )}
          {pillLabel === "Aluguel" && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
              Aluguel
            </span>
          )}
          {pillLabel === "Venda e Locação" && (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-amber-200/70">
              Venda · Aluguel
            </span>
          )}
          <span className="font-semibold text-slate-600">{property.tipo}</span>
          {property.bairro && (
            <>
              <span aria-hidden className="text-slate-300">·</span>
              <span className="truncate">{property.bairro}</span>
            </>
          )}
        </div>

        <h2 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-slate-800">
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

        {/* Price + Code */}
        <div className="mt-auto">
          <div className="flex items-end justify-between border-t border-slate-100 pt-3">
            <div>
              <p
                className={cn(
                  "text-2xl font-extrabold tracking-tight",
                  hasPrice ? "text-slate-900" : "text-slate-400"
                )}
              >
                {displayPrice}
                {isRental && hasPrice && (
                  <span className="text-xs font-normal text-slate-500"> /mês</span>
                )}
              </p>
              {hasSecondaryPrice && (
                <p className="mt-0.5 text-sm font-semibold text-slate-500">
                  {secondaryIsRental ? "Aluguel " : "Venda "}
                  {displaySecondaryPrice}
                  {secondaryIsRental && " /mês"}
                </p>
              )}
            </div>
            <span
              className="relative z-20 cursor-text select-all text-sm font-semibold uppercase text-slate-500 hover:text-slate-700"
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
