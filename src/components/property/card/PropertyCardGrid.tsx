"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { cn } from "@/lib/utils"
import type { Property } from "@/types/property"
import { usePropertyCard, type PriceContext } from "./hooks/usePropertyCard"

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
    hasSecondaryPrice,
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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
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

        {/* Gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-20 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white",
              badge.color
            )}
          >
            {badge.text}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={toggleFavorite}
          className="group/wishlist absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center transition-transform hover:scale-110"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart
            className={cn(
              "size-5 stroke-white stroke-[2px] text-transparent drop-shadow-lg transition-all duration-200",
              isFavorite
                ? "scale-110 fill-brand-primary stroke-brand-primary text-brand-primary"
                : "group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
            )}
          />
        </button>

        {/* Carousel controls */}
        {displayPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Proxima foto"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="absolute bottom-12 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm sm:flex">
              {displayPhotos.slice(0, 6).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(event) => goToSlide(index, event)}
                  className={cn(
                    "size-1 rounded-full transition-all",
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  )}
                  aria-label={`Ir para foto ${index + 1}`}
                />
              ))}
              {displayPhotos.length > 6 && (
                <span className="text-[9px] text-white/70">
                  +{displayPhotos.length - 6}
                </span>
              )}
            </div>
          </>
        )}

        {/* Price + Code overlay */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-4">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              {displayPrice}
              {isRental && hasPrice && (
                <span className="text-sm font-normal text-white/80"> /mês</span>
              )}
            </p>
            {hasSecondaryPrice && (
              <p className="mt-0.5 text-sm font-semibold text-white/80 drop-shadow-md">
                {displaySecondaryPrice} /mês
              </p>
            )}
          </div>
          <span className="text-sm font-medium uppercase text-slate-200 drop-shadow-md">
            {property.codigo}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
            {property.tipo}
          </span>
          {property.bairro && (
            <span className="rounded-full bg-slate-100/90 px-2.5 py-1 text-[11px] font-medium text-slate-500">
              {property.bairro}
            </span>
          )}
        </div>

        <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-slate-800 transition-colors group-hover:text-slate-600">
          {property.titulo}
        </h2>

        <div className="pb-1">
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

      <Link
        href={propertyHref}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${property.titulo}`}
      />
    </article>
  )
}
