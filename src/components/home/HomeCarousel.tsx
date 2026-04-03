"use client"

import { useEffect, useState, useCallback } from "react"
import type { Property } from "@/types/property"
import { PropertyCard } from "@/components/property/PropertyCard"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface HomeCarouselProps {
  properties: Property[]
  autoPlay?: boolean
  intervalMs?: number
}

export function HomeCarousel({
  properties,
  autoPlay = true,
  intervalMs = 5000,
}: HomeCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
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

  // Auto-play
  useEffect(() => {
    if (!api || !autoPlay || isPaused) return

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
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
          skipSnaps: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {properties.map((property) => (
            <CarouselItem
              key={property.slug}
              className="basis-[85%] pl-3 sm:basis-[48%]"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dot indicators */}
      {properties.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {properties.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                index === current
                  ? "h-2 w-5 bg-brand-primary"
                  : "size-2 bg-neutral-300"
              )}
              aria-label={`Ir para imóvel ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
