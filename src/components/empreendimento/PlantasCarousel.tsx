"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { isVistaImage } from "@/lib/image-optimization"

interface PlantasCarouselProps {
  plantas: string[]
  torreNome: string
}

export function PlantasCarousel({ plantas, torreNome }: PlantasCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
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

  if (!plantas || plantas.length === 0) return null

  return (
    <div className="mt-6">
      <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
        Plantas disponíveis
      </p>

      <div className="group relative">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {plantas.map((planta, i) => (
              <CarouselItem key={i} className="basis-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-neutral-200 bg-white">
                  <Image
                    src={planta}
                    alt={`Planta ${torreNome} ${i + 1}`}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    unoptimized={isVistaImage(planta)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Arrows */}
        {plantas.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                "absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100",
                !canScrollPrev && "cursor-not-allowed opacity-30 hover:opacity-30"
              )}
              aria-label="Planta anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                "absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100",
                !canScrollNext && "cursor-not-allowed opacity-30 hover:opacity-30"
              )}
              aria-label="Próxima planta"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {plantas.length > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {plantas.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  current === i ? "w-6 bg-[#c9a876]" : "w-1 bg-neutral-300"
                )}
                aria-label={`Ir para planta ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
