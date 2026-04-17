"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface PhotoCarouselProps {
  photos: string[]
  alt: string
  codigo: string
  prioritizeFirstImage?: boolean
  /** Ativa fetchPriority="high" na primeira foto. So o mobile da listagem deve usar. */
  lcpHint?: boolean
  sizes?: string
  /** Classe aplicada a cada <img> wrapper (ex: group-hover scale). */
  imageClassName?: string
}

// Carousel baseado em CSS scroll-snap — swipe touch nativo, zero state React.
// Setas (desktop) chamam scrollBy no container. Substitui o padrao antigo com
// useState<currentSlide> + transform translateX (custava ~100-150ms TBT por card).
export function PhotoCarousel({
  photos,
  alt,
  codigo,
  prioritizeFirstImage = false,
  lcpHint = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  imageClassName,
}: PhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "prev" | "next") => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    const el = scrollRef.current
    if (!el) return
    const width = el.clientWidth
    el.scrollBy({
      left: direction === "next" ? width : -width,
      behavior: "smooth",
    })
  }

  const hasMultiple = photos.length > 1

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, index) => {
          const isFirst = index === 0
          const eager = prioritizeFirstImage && isFirst
          return (
            <div
              key={`${codigo}-${index}`}
              className="relative h-full min-w-full shrink-0 snap-center overflow-hidden"
            >
              <Image
                src={photo}
                alt={`${alt} - foto ${index + 1}`}
                fill
                priority={lcpHint && isFirst}
                loading={eager ? "eager" : "lazy"}
                fetchPriority={lcpHint && isFirst ? "high" : undefined}
                className={cn("object-cover", imageClassName)}
                sizes={sizes}
              />
            </div>
          )
        })}
      </div>

      {hasMultiple && (
        <>
          {/* Setas: mobile visiveis sempre (touch affordance), desktop aparecem no hover */}
          <button
            type="button"
            onClick={handleScroll("prev")}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-20 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-3 sm:size-8 sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="size-3.5 sm:size-4" />
          </button>
          <button
            type="button"
            onClick={handleScroll("next")}
            aria-label="Proxima foto"
            className="absolute right-2 top-1/2 z-20 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-3 sm:size-8 sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="size-3.5 sm:size-4" />
          </button>
        </>
      )}
    </div>
  )
}
