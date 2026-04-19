"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface HomeCarouselProps {
  properties: Property[]
  autoPlay?: boolean
  intervalMs?: number
  /** Tailwind gradient class for the peek fade (match section bg) */
  fadeFrom?: string
  /**
   * Embaralha a ordem dos imoveis a cada visita (client-side apos mount).
   * Rotacao pedida pelo Bruno 19/04 — visitantes recorrentes nao veem sempre
   * os mesmos imoveis no topo. Primeira render (SSR) mantem ordem original
   * pra evitar hydration mismatch; useEffect randomiza depois.
   */
  shuffle?: boolean
}

export function HomeCarousel({
  properties,
  autoPlay = true,
  intervalMs = 5000,
  fadeFrom = "from-white",
  shuffle = false,
}: HomeCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [isPaused, setIsPaused] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [shuffledOrder, setShuffledOrder] = useState<Property[] | null>(null)

  // Embaralha client-side pos-hydration pra variar ordem entre visitas sem
  // quebrar SSR (primeira render usa array original, dai substitui).
  useEffect(() => {
    if (!shuffle || properties.length <= 1) return
    const shuffled = [...properties]
    // Fisher-Yates shuffle — distribuicao uniforme correta
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setShuffledOrder(shuffled)
  }, [properties, shuffle])

  const displayProperties = useMemo(
    () => shuffledOrder ?? properties,
    [shuffledOrder, properties]
  )

  const onSelect = useCallback(() => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  // Auto-play (mobile only — desktop has arrows)
  useEffect(() => {
    if (!api || !autoPlay || isPaused) return
    const mql = window.matchMedia("(min-width: 768px)")
    if (mql.matches) return // no auto-play on desktop

    const timer = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, intervalMs)

    return () => clearInterval(timer)
  }, [api, autoPlay, intervalMs, isPaused])

  return (
    <div
      className="group/carousel relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {displayProperties.map((property) => (
            <CarouselItem
              key={property.slug}
              className="basis-[82%] pl-3 sm:basis-[46%] md:basis-[32%] md:pl-4 lg:basis-[30%]"
            >
              <PropertyCard property={property} compactFeatures />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Peek fade — right edge hint */}
      <div className={cn("pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent md:w-16", fadeFrom)} />

      {/* Desktop arrows — Netflix style, appear on hover */}
      {canScrollPrev && (
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          className={cn(
            "absolute -left-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full",
            "bg-white text-neutral-700 shadow-lg ring-1 ring-neutral-200/50",
            "opacity-0 transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-neutral-50 hover:scale-110",
            "md:flex"
          )}
          aria-label="Anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          className={cn(
            "absolute -right-4 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full",
            "bg-white text-neutral-700 shadow-lg ring-1 ring-neutral-200/50",
            "opacity-0 transition-all duration-300 group-hover/carousel:opacity-100 hover:bg-neutral-50 hover:scale-110",
            "md:flex"
          )}
          aria-label="Próximo"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
    </div>
  )
}
