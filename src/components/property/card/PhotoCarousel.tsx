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
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
          <button
            type="button"
            onClick={handleScroll("prev")}
            className="absolute left-3 top-1/2 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleScroll("next")}
            className="absolute right-3 top-1/2 z-20 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 sm:inline-flex sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Proxima foto"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}
    </div>
  )
}
