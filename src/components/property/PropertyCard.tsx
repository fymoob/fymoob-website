"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Heart, Clock } from "lucide-react"

import type { Property } from "@/types/property"
import {
  cn,
  filterPropertyPhotos,
  formatPrice,
  generateImageAlt,
  getPropertyImage,
  truncateText,
} from "@/lib/utils"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
// CSS scroll-snap carousel — no embla dependency (~50KB saved)
import { getTopViewedCodes } from "@/lib/view-tracker"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"
const RECENT_STORAGE_KEY = "fymoob:recent"
const RECENT_MAX = 8

// ---------------------------------------------------------------------------
// Badge logic
// ---------------------------------------------------------------------------

function getBadge(property: Property, topViewed?: Set<string>): { text: string; color: string } | null {
  // Priority: NOVO > LANÇAMENTO > MAIS VISTO
  if (property.dataCadastro) {
    const days = Math.floor(
      (Date.now() - new Date(property.dataCadastro).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (days <= 7) return { text: "NOVO", color: "bg-emerald-500" }
  }

  if (property.lancamento) return { text: "LANÇAMENTO", color: "bg-slate-900" }

  if (topViewed?.has(property.codigo)) return { text: "MAIS VISTO", color: "bg-neutral-900/80 backdrop-blur-sm" }

  return null
}

function getDaysAgo(date: string | null): string | null {
  if (!date) return null
  const days = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  )
  if (days === 0) return "Hoje"
  if (days === 1) return "Ontem"
  if (days <= 30) return `Há ${days} dias`
  return null
}

// ---------------------------------------------------------------------------
// Recently viewed
// ---------------------------------------------------------------------------

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

    const filtered = recent.filter((r) => r.codigo !== property.codigo)
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
    // ignore
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

// ---------------------------------------------------------------------------
// Wishlist helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Photo helpers
// ---------------------------------------------------------------------------

const MAX_CARD_PHOTOS = 5

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)].filter(
    Boolean
  )
  const uniquePhotos = Array.from(new Set(merged))
  const photos = uniquePhotos.length > 0 ? uniquePhotos : ["/logo.png"]
  return photos.slice(0, MAX_CARD_PHOTOS)
}

// ---------------------------------------------------------------------------
// PropertyCard
// ---------------------------------------------------------------------------

interface PropertyCardProps {
  property: Property
  prioritizeFirstImage?: boolean
  variant?: "vertical" | "horizontal" | "responsive"
}

export function PropertyCard({
  property,
  prioritizeFirstImage = false,
  variant = "vertical",
}: PropertyCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const alt = generateImageAlt(property)
  const price = property.precoVenda ?? property.precoAluguel
  const photos = useMemo(() => getPropertyPhotos(property), [property])
  const daysAgo = useMemo(() => getDaysAgo(property.dataCadastro), [property.dataCadastro])

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

  // Lazy-load extra photos on first hover (only if we have 1 photo)
  const [dynamicPhotos, setDynamicPhotos] = useState<string[] | null>(null)
  const fetchedRef = useRef(false)
  const loadPhotosOnHover = useCallback(() => {
    if (fetchedRef.current || photos.length > 1) return
    fetchedRef.current = true
    fetch(`/api/photos/${property.codigo}`)
      .then((r) => r.ok ? r.json() : [])
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

  // No auto-cycle — carousel navigates only via arrow clicks

  const propertyHref = `/imovel/${property.slug}`

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
    setCurrentSlide((prev) => prev <= 0 ? displayPhotos.length - 1 : prev - 1)
  }

  const goNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide((prev) => (prev + 1) % displayPhotos.length)
  }

  const goToSlide = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide(index)
  }

  const isHorizontal = variant === "horizontal"
  const isResponsive = variant === "responsive"

  return (
    <article
      ref={articleRef}
      onMouseEnter={loadPhotosOnHover}
      className={cn(
        "group overflow-hidden transition-all duration-300",
        isResponsive
          ? "flex flex-row sm:flex-col rounded-2xl border border-neutral-200 bg-white hover:shadow-lg sm:hover:-translate-y-1.5 sm:hover:border-brand-primary/30 sm:hover:shadow-2xl"
          : isHorizontal
            ? "flex flex-col sm:flex-row rounded-2xl border border-neutral-200 bg-white hover:shadow-lg sm:hover:shadow-xl"
            : "rounded-sm border border-slate-200 bg-white shadow-none hover:border-slate-300"
      )}
    >
      {/* Photo section */}
      <div className={cn(
        "relative overflow-hidden",
        isResponsive
          ? "w-28 shrink-0 self-stretch sm:w-full sm:shrink sm:self-auto sm:aspect-[4/3]"
          : isHorizontal ? "aspect-[4/3] sm:aspect-auto sm:w-2/5 sm:min-h-[250px] sm:shrink-0 sm:self-stretch" : "aspect-[21/9] max-h-[400px] xl:max-h-[480px]"
      )}>
        {(isHorizontal && !isResponsive) ? (
          /* Horizontal: single image, no carousel */
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
          /* Transform-based carousel — no scroll, no library */
          <div className="relative h-full w-full overflow-hidden">
            <div
              className="flex h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
            {displayPhotos.map((photo, index) => {
              const shouldPrioritize = prioritizeFirstImage && index === 0
              return (
                <div key={`${property.codigo}-${index}`} className="relative h-full min-w-full shrink-0 overflow-hidden">
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

        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "absolute z-20 font-semibold uppercase text-white",
              badge.color,
              (isHorizontal || isResponsive)
                ? "top-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[8px] tracking-wider shadow-md sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-[11px]"
                : "top-3 left-3 rounded-sm px-2.5 py-1 text-[10px] tracking-widest"
            )}
          >
            {badge.text}
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={toggleFavorite}
          className={cn(
            "group/wishlist absolute z-20 inline-flex items-center justify-center transition-transform hover:scale-110",
            (isHorizontal || isResponsive)
              ? "top-1.5 right-1.5 size-6 sm:top-3 sm:right-3 sm:size-9"
              : "top-3 right-3 size-9"
          )}
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart
            className={cn(
              "text-transparent stroke-white stroke-[2px] drop-shadow-lg transition-all duration-200",
              (isHorizontal || isResponsive) ? "size-3.5 sm:size-5" : "size-5",
              isFavorite
                ? "fill-brand-primary stroke-brand-primary text-brand-primary scale-110"
                : "group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
            )}
          />
        </button>

        {/* Carousel controls — only show if multiple photos available */}
        {!isHorizontal && displayPhotos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-3 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:inline-flex"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-3 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:opacity-0 sm:group-hover:opacity-100 sm:inline-flex"
              aria-label="Proxima foto"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="absolute bottom-2.5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm sm:flex">
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
                <span className="text-[9px] text-white/70">+{displayPhotos.length - 6}</span>
              )}
            </div>
          </>
        )}

        <Link
          href={propertyHref}
          className="absolute inset-0 z-10"
          aria-label={`Ver detalhes de ${property.titulo}`}
        />
      </div>

      {/* Content section */}
      <div className={cn(
        isResponsive
          ? "flex min-w-0 flex-1 flex-col justify-center gap-1 p-3 sm:flex-none sm:gap-0 sm:space-y-1.5 sm:p-4 md:p-5"
          : isHorizontal
            ? "flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-4 sm:gap-2 sm:p-6"
            : "space-y-1.5 px-5 py-4"
      )}>
        {/* Line 1: Type · Location */}
        <p className={cn(
          (isHorizontal || isResponsive) ? "text-xs text-neutral-500" : "text-[10px] uppercase tracking-widest text-gray-500"
        )}>
          {property.tipo}
          <span className="mx-2">•</span>
          {property.bairro}
        </p>

        {/* Line 2: Title (1 line) */}
        <Link href={propertyHref} className="block">
          <h2 className={cn(
            "truncate tracking-tight transition-colors hover:text-brand-primary",
            isHorizontal ? "text-sm sm:text-lg font-bold text-neutral-900" : isResponsive ? "text-sm sm:text-base font-bold text-neutral-900" : "text-lg font-medium text-slate-800"
          )}>
            {property.titulo}
          </h2>
        </Link>

        {/* Price — above features for horizontal/responsive */}
        {(isHorizontal || isResponsive) && (
          <p className={cn(
            "font-semibold tracking-tight",
            isHorizontal ? "text-lg sm:text-xl" : "text-base sm:text-lg",
            price ? "text-slate-900" : "text-neutral-400"
          )}>
            {formatPrice(price)}
          </p>
        )}

        {/* Features — editorial (stacked) for grid, inline for list/responsive */}
        {!(isHorizontal || isResponsive) ? (
          <div className="border-y border-gray-100">
            <PropertyFeatures
              dormitorios={property.dormitorios}
              banheiros={property.banheiros}
              vagas={property.vagas}
              areaPrivativa={property.areaPrivativa}
              editorial
            />
          </div>
        ) : (
          <PropertyFeatures
            dormitorios={property.dormitorios}
            banheiros={property.banheiros}
            vagas={property.vagas}
            areaPrivativa={property.areaPrivativa}
            size="sm"
            iconOnly={isResponsive}
          />
        )}

        {/* Price — anchored at bottom for grid (editorial) */}
        {!(isHorizontal || isResponsive) && (
          <p className={cn(
            "text-2xl font-semibold tracking-tight pt-3",
            price ? "text-slate-900" : "text-neutral-400"
          )}>
            {formatPrice(price)}
          </p>
        )}

      </div>
    </article>
  )
}
