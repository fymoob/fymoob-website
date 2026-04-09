"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { getTopViewedCodes } from "@/lib/view-tracker"
import {
  cn,
  filterPropertyPhotos,
  formatPrice,
  generateImageAlt,
  getPropertyImage,
} from "@/lib/utils"
import type { Property } from "@/types/property"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"
const RECENT_STORAGE_KEY = "fymoob:recent"
const RECENT_MAX = 8
const MAX_CARD_PHOTOS = 5

function getBadge(
  property: Property,
  topViewed?: Set<string>
): { text: string; color: string } | null {
  if (property.dataCadastro) {
    const days = Math.floor(
      (Date.now() - new Date(property.dataCadastro).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    if (days <= 7) return { text: "NOVO", color: "bg-emerald-500" }
  }

  if (property.lancamento) {
    return { text: "LANÇAMENTO", color: "bg-slate-900" }
  }

  if (topViewed?.has(property.codigo)) {
    return { text: "MAIS VISTO", color: "bg-neutral-900/80 backdrop-blur-sm" }
  }

  return null
}

export function saveToRecentlyViewed(property: Property) {
  if (typeof window === "undefined") return

  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY)
    const recent: Array<{
      codigo: string
      slug: string
      titulo: string
      preco: number | null
      foto: string
      bairro: string
      timestamp: number
    }> = raw ? JSON.parse(raw) : []

    const filtered = recent.filter((item) => item.codigo !== property.codigo)
    filtered.unshift({
      codigo: property.codigo,
      slug: property.slug,
      titulo: property.titulo,
      preco: property.precoVenda ?? property.precoAluguel,
      foto: property.fotoDestaque,
      bairro: property.bairro,
      timestamp: Date.now(),
    })

    localStorage.setItem(
      RECENT_STORAGE_KEY,
      JSON.stringify(filtered.slice(0, RECENT_MAX))
    )
  } catch {
    // Ignore local storage failures.
  }
}

export function getRecentlyViewed(): Array<{
  codigo: string
  slug: string
  titulo: string
  preco: number | null
  foto: string
  bairro: string
  timestamp: number
}> {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function getWishlistCodes(): Set<string> {
  if (typeof window === "undefined") return new Set<string>()

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return new Set<string>()

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === "string"))
      : new Set<string>()
  } catch {
    return new Set<string>()
  }
}

export function getWishlistProperties(): string[] {
  if (typeof window === "undefined") return []

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)]
    .filter(Boolean)
  const uniquePhotos = Array.from(new Set(merged))
  const photos = uniquePhotos.length > 0 ? uniquePhotos : ["/logo.png"]

  return photos.slice(0, MAX_CARD_PHOTOS)
}

interface PropertyCardProps {
  property: Property
  prioritizeFirstImage?: boolean
  variant?: "vertical" | "horizontal" | "responsive"
  compactFeatures?: boolean
  context?: "default" | "search"
}

export function PropertyCard({
  property,
  prioritizeFirstImage = false,
  variant = "vertical",
  compactFeatures = false,
  context = "default",
}: PropertyCardProps) {
  const alt = generateImageAlt(property)
  const price = property.precoVenda ?? property.precoAluguel
  const photos = useMemo(() => getPropertyPhotos(property), [property])
  const [topViewed, setTopViewed] = useState<Set<string>>(new Set())
  useEffect(() => {
    const load = () => setTopViewed(getTopViewedCodes())
    if ("requestIdleCallback" in window) {
      requestIdleCallback(load)
    } else {
      load()
    }
  }, [])

  const badge = useMemo(() => getBadge(property, topViewed), [property, topViewed])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [dynamicPhotos, setDynamicPhotos] = useState<string[] | null>(null)
  const fetchedRef = useRef(false)

  const loadPhotosOnHover = useCallback(() => {
    if (fetchedRef.current || photos.length > 1) return

    fetchedRef.current = true
    fetch(`/api/photos/${property.codigo}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((apiPhotos: string[]) => {
        if (apiPhotos.length > 1) {
          setDynamicPhotos(apiPhotos)
          setCurrentSlide(0)
        }
      })
      .catch(() => {})
  }, [property.codigo, photos.length])

  const displayPhotos = dynamicPhotos ?? photos

  useEffect(() => {
    const check = () => setIsFavorite(getWishlistCodes().has(property.codigo))
    if ("requestIdleCallback" in window) {
      requestIdleCallback(check)
    } else {
      check()
    }
  }, [property.codigo])

  const propertyHref = `/imovel/${property.slug}`
  const isHorizontal = variant === "horizontal"
  const isResponsive = variant === "responsive"
  const isSearchContext = context === "search"
  const isCompactCard = compactFeatures && !isHorizontal && !isResponsive
  const useInlineFeatures =
    (isResponsive || compactFeatures || (isHorizontal && !isSearchContext)) && !isCompactCard
  const hasPrice = price !== null && price > 0
  const displayPrice = hasPrice
    ? formatPrice(price)
    : isSearchContext
      ? "Consultar valor"
      : formatPrice(price)

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsFavorite((previous) => {
      const next = !previous
      const wishlist = getWishlistCodes()

      if (next) {
        wishlist.add(property.codigo)
      } else {
        wishlist.delete(property.codigo)
      }

      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(Array.from(wishlist))
      )

      return next
    })
  }

  const goPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide((previous) =>
      previous <= 0 ? displayPhotos.length - 1 : previous - 1
    )
  }

  const goNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide((previous) => (previous + 1) % displayPhotos.length)
  }

  const goToSlide = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide(index)
  }

  return (
    <article
      onMouseEnter={loadPhotosOnHover}
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        isResponsive
          ? "flex flex-row rounded-2xl border border-neutral-200 bg-white hover:shadow-lg sm:flex-col sm:hover:-translate-y-1.5 sm:hover:border-brand-primary/30 sm:hover:shadow-2xl"
          : isHorizontal
            ? "flex flex-col rounded-2xl border border-neutral-200 bg-white hover:shadow-lg sm:flex-row sm:hover:shadow-xl"
            : isSearchContext
              ? "flex h-full flex-col rounded-2xl border border-neutral-200 bg-white shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
              : isCompactCard
                ? "flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-md hover:-translate-y-1.5 hover:shadow-xl"
                : "flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-xl"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isResponsive
            ? "w-28 shrink-0 self-stretch sm:w-full sm:shrink sm:self-auto sm:aspect-[4/3]"
            : isHorizontal
              ? "aspect-[4/3] sm:aspect-auto sm:min-h-[250px] sm:w-2/5 sm:shrink-0 sm:self-stretch"
              : isSearchContext
                ? "aspect-[16/9]"
                : isCompactCard
                  ? "aspect-[16/10]"
                  : "aspect-[21/9] max-h-[400px] xl:max-h-[480px]"
        )}
      >
        {isHorizontal && !isResponsive ? (
          <Image
            src={displayPhotos[0]}
            alt={alt}
            fill
            priority={prioritizeFirstImage}
            loading={prioritizeFirstImage ? "eager" : "lazy"}
            className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 40vw"
          />
        ) : (
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
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />
        {isSearchContext && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        )}

        {badge && (
          <span
            className={cn(
              "absolute z-20 font-semibold uppercase text-white",
              badge.color,
              isHorizontal || isResponsive
                ? "left-1.5 top-1.5 rounded-full px-1.5 py-0.5 text-[8px] tracking-wider shadow-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]"
                : "left-3 top-3 rounded-md px-2.5 py-1 text-[10px] tracking-widest"
            )}
          >
            {badge.text}
          </span>
        )}

        <button
            type="button"
            onClick={toggleFavorite}
            className={cn(
              "group/wishlist absolute z-20 inline-flex items-center justify-center transition-transform hover:scale-110",
              isHorizontal || isResponsive
                ? "right-1.5 top-1.5 size-6 sm:right-3 sm:top-3 sm:size-9"
                : "right-3 top-3 size-9"
            )}
            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            aria-pressed={isFavorite}
          >
            <Heart
              className={cn(
                "text-transparent stroke-white stroke-[2px] drop-shadow-lg transition-all duration-200",
                isHorizontal || isResponsive ? "size-3.5 sm:size-5" : "size-5",
                isFavorite
                  ? "fill-brand-primary stroke-brand-primary text-brand-primary scale-110"
                  : "group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
              )}
            />
          </button>

        {isCompactCard && displayPhotos.length > 1 && (
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

        {!isHorizontal && !isCompactCard && displayPhotos.length > 1 && (
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

            <div className={cn(
              "absolute left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm sm:flex",
              isSearchContext ? "bottom-12" : "bottom-2.5"
            )}>
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

        {isSearchContext && (
          <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-4">
            <p className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
              {displayPrice}
              {property.finalidade !== "Venda" && hasPrice && (
                <span className="text-sm font-normal text-white/80"> /mês</span>
              )}
            </p>
            <span className="text-sm font-medium uppercase text-slate-200 drop-shadow-md">
              {property.codigo}
            </span>
          </div>
        )}

      </div>

      <div
        className={cn(
          isResponsive
            ? "flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:flex-none sm:gap-0 sm:space-y-1.5 sm:p-4 md:p-5"
            : isSearchContext
                ? "flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5"
                : isHorizontal
                  ? "flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6"
                  : isCompactCard
                    ? "flex flex-1 flex-col gap-2.5 p-4"
                    : "flex flex-1 flex-col space-y-3 p-5"
        )}
      >
        {isSearchContext ? (
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
        ) : isHorizontal || isResponsive ? (
          <p className="text-xs text-neutral-500">
            {property.tipo}
            {property.bairro && (
              <>
                <span className="mx-2">•</span>
                {property.bairro}
              </>
            )}
          </p>
        ) : isCompactCard ? (
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {property.tipo}
            {property.bairro && (
              <>
                <span className="mx-1.5 text-slate-300">&bull;</span>
                {property.bairro}
              </>
            )}
          </p>
        ) : null}

        <h2
          className={cn(
            "tracking-tight transition-colors",
            isSearchContext
              ? "line-clamp-2 text-lg font-semibold leading-snug text-slate-800 group-hover:text-slate-600"
              : isHorizontal
                ? "line-clamp-2 text-sm font-bold text-neutral-900 sm:text-lg"
                : isResponsive
                ? "line-clamp-2 text-sm font-bold text-neutral-900 sm:text-base"
                : isCompactCard
                  ? "line-clamp-2 text-[15px] font-semibold leading-snug text-slate-800"
                  : "truncate text-lg font-semibold leading-snug text-slate-800"
          )}
        >
          {property.titulo}
        </h2>

        {useInlineFeatures && (
          <p
            className={cn(
              "font-semibold tracking-tight text-slate-900",
              isHorizontal
                ? "text-lg sm:text-xl"
                : isResponsive
                  ? "text-base sm:text-lg"
                  : "text-xl",
              hasPrice ? "text-slate-900" : "text-slate-500"
            )}
          >
            {displayPrice}
            {property.finalidade !== "Venda" && hasPrice && (
              <span className="text-xs font-normal text-neutral-500"> /mês</span>
            )}
          </p>
        )}

        {isCompactCard ? (
          <PropertyFeatures
            dormitorios={property.dormitorios}
            suites={property.suites}
            banheiros={property.banheiros}
            vagas={property.vagas}
            areaPrivativa={property.areaPrivativa}
            cardCompact
          />
        ) : !useInlineFeatures ? (
          <div className="pb-1">
            <PropertyFeatures
              dormitorios={property.dormitorios}
              banheiros={property.banheiros}
              vagas={property.vagas}
              areaPrivativa={property.areaPrivativa}
              cardCompact={isSearchContext}
              editorial={!isSearchContext}
            />
          </div>
        ) : (
          <PropertyFeatures
            dormitorios={property.dormitorios}
            suites={property.suites}
            banheiros={property.banheiros}
            vagas={property.vagas}
            areaPrivativa={property.areaPrivativa}
            size="sm"
            compact={isResponsive}
          />
        )}

        {isCompactCard ? (
          <div className="mt-auto">
            <div className="flex items-end justify-between border-t border-slate-100 pt-3">
              <p
                className={cn(
                  "text-lg font-bold tracking-tight sm:text-2xl sm:font-extrabold",
                  hasPrice ? "text-slate-900" : "text-slate-400"
                )}
              >
                {displayPrice}
                {property.finalidade !== "Venda" && hasPrice && (
                  <span className="text-[10px] font-normal text-slate-500 sm:text-xs"> /mês</span>
                )}
              </p>
              <span className="text-xs font-medium text-slate-400 sm:text-sm sm:font-semibold sm:text-slate-500">
                {property.codigo}
              </span>
            </div>
          </div>
        ) : !useInlineFeatures && !isSearchContext ? (
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
            <p
              className={cn(
                "text-2xl font-extrabold tracking-tight",
                hasPrice ? "text-slate-900" : "text-slate-500"
              )}
            >
              {displayPrice}
              {property.finalidade !== "Venda" && hasPrice && (
                <span className="text-sm font-normal text-neutral-500"> /mês</span>
              )}
            </p>
            <span className="shrink-0 text-right text-xs font-medium text-slate-400">
              {property.codigo}
            </span>
          </div>
        ) : null}
      </div>

      <Link
        href={propertyHref}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalhes de ${property.titulo}`}
      />
    </article>
  )
}
