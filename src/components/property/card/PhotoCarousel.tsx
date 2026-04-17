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
      {/* Scroll container com overflow-x-auto — default touch-action auto
          permite scroll vertical pela pagina (pan-y) + horizontal snap-x
          (pan-x) pelo swipe proprio. NAO setar touch-action explicit,
          senao um dos dois scrolls sera bloqueado. */}
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
          {/* Setas: mobile visiveis sempre com bg forte (touch affordance).
              Desktop: aparecem no hover apenas. Especificidade explicita sem
              modificador 'sm:opacity-0' no mobile pra garantir visibilidade. */}
          <button
            type="button"
            onClick={handleScroll("prev")}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-30 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/80 active:scale-95 sm:left-3 sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={handleScroll("next")}
            aria-label="Proxima foto"
            className="absolute right-2 top-1/2 z-30 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm transition-all hover:bg-black/80 active:scale-95 sm:right-3 sm:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </button>
        </>
      )}
    </div>
  )
}
