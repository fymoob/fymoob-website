"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"

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
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"

interface PropertyCardProps {
  property: Property
  prioritizeFirstImage?: boolean
}

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)].filter(
    Boolean
  )
  const uniquePhotos = Array.from(new Set(merged))
  return uniquePhotos.length > 0 ? uniquePhotos : ["/logo.png"]
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

export function PropertyCard({
  property,
  prioritizeFirstImage = false,
}: PropertyCardProps) {
  const articleRef = useRef<HTMLElement>(null)
  const alt = generateImageAlt(property)
  const price = property.precoVenda ?? property.precoAluguel
  const photos = useMemo(() => getPropertyPhotos(property), [property])

  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const wishlist = getWishlistCodes()
    setIsFavorite(wishlist.has(property.codigo))
  }, [property.codigo])

  useEffect(() => {
    if (!carouselApi) return

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }

    onSelect()
    carouselApi.on("select", onSelect)
    carouselApi.on("reInit", onSelect)

    return () => {
      carouselApi.off("select", onSelect)
      carouselApi.off("reInit", onSelect)
    }
  }, [carouselApi])

  useEffect(() => {
    const element = articleRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

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
    carouselApi?.scrollPrev()
  }

  const goNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    carouselApi?.scrollNext()
  }

  const goToSlide = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    carouselApi?.scrollTo(index)
  }

  return (
    <article
      ref={articleRef}
      className={cn(
        "group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-muted hover:shadow-xl",
        isVisible ? "animate-fade-in-up" : "opacity-0"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Carousel
          className="h-full [&>div]:h-full"
          setApi={setCarouselApi}
          opts={{ align: "start", loop: photos.length > 1 }}
        >
          <CarouselContent className="ml-0 h-full">
            {photos.map((photo, index) => {
              const shouldPrioritize = prioritizeFirstImage && index === 0

              return (
                <CarouselItem key={`${property.codigo}-${index}`} className="h-full pl-0">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={photo}
                      alt={`${alt} - foto ${index + 1}`}
                      fill
                      priority={shouldPrioritize}
                      loading={shouldPrioritize ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent" />

        <button
          type="button"
          onClick={toggleFavorite}
          className="group/wishlist absolute top-3 right-3 z-20 inline-flex size-9 items-center justify-center transition-transform hover:scale-110"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFavorite}
        >
          <Heart
            className={cn(
              "size-5 text-transparent stroke-white stroke-[2px] drop-shadow-lg transition-all duration-200",
              isFavorite
                ? "fill-brand-primary stroke-brand-primary text-brand-primary"
                : "group-hover/wishlist:fill-brand-primary/90 group-hover/wishlist:stroke-brand-primary"
            )}
          />
        </button>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-3 z-20 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-3 z-20 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
              aria-label="Proxima foto"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
              {photos.map((_, index) => (
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
            </div>
          </>
        )}

        <Link
          href={propertyHref}
          className="absolute inset-0 z-10"
          aria-label={`Ver detalhes de ${property.titulo}`}
        />
      </div>

      <div className="space-y-2.5 p-5 md:p-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-400">
            {property.tipo}
          </span>
          <span className="text-neutral-200">·</span>
          <span className="text-xs text-neutral-300">
            {property.codigo}
          </span>
        </div>

        <Link href={propertyHref} className="block">
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-neutral-950 transition-colors hover:text-brand-primary">
            {truncateText(property.titulo, 68)}
          </h2>
        </Link>

        <p className="text-sm text-neutral-500">
          {property.bairro}, {property.cidade}
        </p>

        <p
          className={cn(
            "text-xl font-bold tracking-tight",
            price ? "text-[#0B1120]" : "text-neutral-400"
          )}
          style={{ fontFamily: "\"Plus Jakarta Sans\", var(--font-satoshi), sans-serif" }}
        >
          {formatPrice(price)}
        </p>

        <PropertyFeatures
          dormitorios={property.dormitorios}
          banheiros={property.banheiros}
          vagas={property.vagas}
          areaPrivativa={property.areaPrivativa}
          size="sm"
          className="pt-1"
        />
      </div>
    </article>
  )
}
