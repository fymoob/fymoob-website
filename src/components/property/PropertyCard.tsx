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
}

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)].filter(
    Boolean
  )
  return Array.from(new Set(merged))
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

export function PropertyCard({ property }: PropertyCardProps) {
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
            {photos.map((photo, index) => (
              <CarouselItem key={`${property.codigo}-${index}`} className="h-full pl-0">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={photo}
                    alt={`${alt} - foto ${index + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/25 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-semibold tracking-tight text-neutral-950 backdrop-blur-md">
            {property.tipo}
          </span>
          <span className="rounded-full bg-neutral-950/45 px-3 py-1 text-xs font-medium tracking-tight text-white backdrop-blur-md">
            Cod {property.codigo}
          </span>
        </div>

        <button
          type="button"
          onClick={toggleFavorite}
          className="absolute top-3 right-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-white/70 text-neutral-700 backdrop-blur-md transition-colors hover:text-red-500"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <Heart
            className={cn(
              "size-4",
              isFavorite ? "fill-red-500 text-red-500" : "fill-transparent"
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

            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm">
              {photos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(event) => goToSlide(index, event)}
                  className={cn(
                    "size-1.5 rounded-full transition-all",
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

      <div className="space-y-3 p-5 md:p-6">
        <Link href={propertyHref} className="block">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-950 transition-colors hover:text-brand-primary">
            {truncateText(property.titulo, 68)}
          </h2>
        </Link>

        <p className="text-sm text-neutral-500">
          {property.bairro}, {property.cidade}
        </p>

        <p className="text-xl font-bold tracking-tight text-brand-primary">
          {formatPrice(price)}
        </p>

        {property.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
            {truncateText(property.descricao, 110)}
          </p>
        )}

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
