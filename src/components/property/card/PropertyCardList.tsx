"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"
import { CardBadge } from "./CardBadge"

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
    hasSecondaryPrice,
    secondaryIsRental,
    displaySecondaryPrice,
    displayPhotos,
    badge,
    isFavorite,
    propertyHref,
    loadPhotosOnHover,
    toggleFavorite,
  } = usePropertyCard(property, priceContext)

  // Finalidade badge color cue for quick scanning (QuintoAndar/ZAP pattern)
  const finalidadeBadge =
    property.finalidade === "Venda"
      ? { label: "Venda", className: "bg-rose-50 text-rose-700 ring-1 ring-rose-200/70" }
      : property.finalidade === "Locação"
        ? { label: "Aluguel", className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70" }
        : property.finalidade === "Venda e Locação"
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
          priority={prioritizeFirstImage}
          loading={prioritizeFirstImage ? "eager" : "lazy"}
          className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
          sizes="300px"
        />

        {/* Badge — glass morphism unificado */}
        {badge && <CardBadge badge={badge} className="absolute left-3 top-3 z-20" />}
      </div>

      {/* Content — 2 column layout */}
      <div className="flex min-w-0 flex-1 flex-row justify-between p-6">
        {/* Left: Info */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {finalidadeBadge && (
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                  finalidadeBadge.className
                )}
              >
                {finalidadeBadge.label}
              </span>
            )}
            <span className="rounded-full bg-slate-100/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
              {property.tipo}
            </span>
            {property.bairro && (
              <span className="rounded-full bg-slate-100/90 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                {property.bairro}
              </span>
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
          <button
            type="button"
            onClick={toggleFavorite}
            className="group/wishlist z-20 inline-flex size-9 items-center justify-center transition-transform hover:scale-110"
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={isFavorite}
          >
            <Heart
              className={cn(
                "size-5 stroke-[2px] drop-shadow-sm transition-all duration-200",
                isFavorite
                  ? "scale-110 fill-brand-primary stroke-brand-primary"
                  : "fill-transparent stroke-slate-300 group-hover/wishlist:stroke-slate-400"
              )}
            />
          </button>

          <div className="flex flex-col items-end gap-1">
            <span
              className="relative z-20 cursor-text select-all text-xs font-medium uppercase text-slate-400 hover:text-slate-600"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              title="Clique para selecionar o código"
            >
              {property.codigo}
            </span>
            <p
              className={cn(
                "tracking-tight",
                hasPrice
                  ? "text-2xl font-extrabold text-slate-900"
                  : "text-base font-medium text-slate-400"
              )}
            >
              {displayPrice}
              {isRental && hasPrice && (
                <span className="text-sm font-normal text-neutral-500"> /mês</span>
              )}
            </p>
            {hasSecondaryPrice && (
              <p className="text-sm font-semibold text-slate-500">
                {secondaryIsRental ? "Aluguel " : "Venda "}
                {displaySecondaryPrice}
                {secondaryIsRental && " /mês"}
              </p>
            )}
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
