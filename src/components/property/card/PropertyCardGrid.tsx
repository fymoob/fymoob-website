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
    secondaryIsRental,
    goPrev,
    goNext,
    goToSlide,
  } = usePropertyCard(property, priceContext)

  // Finalidade dot (inline em vez de pill grande — mais limpo)
  const finalidadeDot =
    property.finalidade === "Venda"
      ? { label: "Venda", color: "bg-rose-500" }
      : property.finalidade === "Locação"
        ? { label: "Aluguel", color: "bg-emerald-500" }
        : property.finalidade === "Venda e Locação"
          ? { label: "Venda · Aluguel", color: "bg-amber-500" }
          : null

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
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Top gradient — subtle, only to ensure badge + wishlist readability */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

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

        {/* Wishlist — dark semi-transparent backdrop ensures readability on any photo */}
        <button
          type="button"
          onClick={toggleFavorite}
          className="group/wishlist absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-black/25 backdrop-blur-sm transition-all hover:scale-[1.08] hover:bg-black/35"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart
            className={cn(
              "size-[18px] stroke-white stroke-[2.2px] text-transparent transition-all duration-200",
              isFavorite
                ? "scale-105 fill-brand-primary stroke-brand-primary text-brand-primary"
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
            <div className="absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm sm:flex">
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
      </div>

      {/* Content — padrão do Compact, ~20% maior por ter mais largura disponível */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 sm:p-6">
        {/* Header inline: dot finalidade · tipo · bairro */}
        <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-slate-500">
          {finalidadeDot && (
            <span className="inline-flex items-center gap-1.5 text-slate-700">
              <span aria-hidden className={cn("inline-block size-1.5 rounded-full", finalidadeDot.color)} />
              <span className="font-semibold">{finalidadeDot.label}</span>
            </span>
          )}
          {finalidadeDot && <span aria-hidden className="text-slate-300">·</span>}
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
          <span className="self-end text-sm font-semibold uppercase tracking-wide text-slate-500">
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
