"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn, formatPrice } from "@/lib/utils"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"
import { CardBadge } from "./CardBadge"

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
    hasSecondaryPrice,
    secondaryIsRental,
    displaySecondaryPrice,
    displayPhotos,
    badge,
    currentSlide,
    isFavorite,
    propertyHref,
    loadPhotosOnHover,
    toggleFavorite,
    goPrev,
    goNext,
    goToSlide,
  } = usePropertyCard(property, priceContext)

  return (
    <article
      onMouseEnter={loadPhotosOnHover}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {displayPhotos.map((photo, index) => {
              const shouldPrioritize = prioritizeFirstImage && index === 0
              return (
                <div
                  key={`${property.codigo}-${index}`}
                  className="relative h-full min-w-full shrink-0 overflow-hidden"
                >
                  <Image
                    src={photo}
                    alt={`${alt} - foto ${index + 1}`}
                    fill
                    priority={shouldPrioritize}
                    loading={shouldPrioritize ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Top gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Badge — glass morphism unificado */}
        {badge && <CardBadge badge={badge} className="absolute left-3 top-3 z-20" />}

        {/* Wishlist — mesmo padrao glass do CardBadge pra coerencia visual */}
        <button
          type="button"
          onClick={toggleFavorite}
          className="group/wishlist absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-white/85 shadow-sm ring-1 ring-black/5 backdrop-blur-md transition-all hover:scale-[1.08] hover:bg-white/95"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart
            className={cn(
              "size-[18px] stroke-[2.2px] transition-all duration-200",
              isFavorite
                ? "scale-105 fill-brand-primary stroke-brand-primary"
                : "fill-transparent stroke-neutral-700 group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
            )}
          />
        </button>

        {/* Carousel controls */}
        {displayPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Proxima foto"
            >
              <ChevronRight className="size-3.5" />
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-slate-500">
          {property.finalidade === "Venda" && (
            <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 ring-1 ring-rose-200/70">
              Venda
            </span>
          )}
          {property.finalidade === "Locação" && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-200/70">
              Aluguel
            </span>
          )}
          {property.finalidade === "Venda e Locação" && (
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
