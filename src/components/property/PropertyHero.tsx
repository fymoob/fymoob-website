"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

interface PropertyHeroProps {
  fotos: string[]
  /** Total photos available (gallery may have more than hero carousel) */
  totalPhotos?: number
  mainImage: string
  alt: string
  onOpenGallery: () => void
}

export function PropertyHero({
  fotos,
  totalPhotos,
  mainImage,
  alt,
  onOpenGallery,
}: PropertyHeroProps) {
  const photos = fotos.length > 0 ? fotos : [mainImage]
  const total = totalPhotos ?? photos.length
  const [currentSlide, setCurrentSlide] = useState(0)

  // Desktop nav (fade carousel)
  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? photos.length - 1 : prev - 1))
  }, [photos.length])

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  // Mobile embla carousel
  const [mobileApi, setMobileApi] = useState<CarouselApi>()
  const [mobileSlide, setMobileSlide] = useState(0)

  useEffect(() => {
    if (!mobileApi) return
    const onSelect = () => setMobileSlide(mobileApi.selectedScrollSnap())
    onSelect()
    mobileApi.on("select", onSelect)
    return () => { mobileApi.off("select", onSelect) }
  }, [mobileApi])

  return (
    <div className="group relative w-screen overflow-hidden" style={{ marginLeft: "calc(-50vw + 50%)" }}>
      {/* ═══ MOBILE: embla carousel with swipe + info below ═══ */}
      <div className="md:hidden">
        {/* Photo carousel */}
        <div className="relative h-[48vh] w-full">
          <Carousel
            setApi={setMobileApi}
            opts={{ align: "start", loop: false, skipSnaps: false }}
            className="h-full w-full [&>[data-slot=carousel-content]]:h-full"
          >
            <CarouselContent className="h-full -ml-0">
              {photos.map((photo, index) => (
                <CarouselItem key={`mobile-${index}`} className="h-full pl-0 basis-full">
                  <div
                    className="relative h-full w-full cursor-pointer"
                    onClick={onOpenGallery}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onOpenGallery()
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`${alt} - foto ${index + 1}`}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-cover"
                      sizes="100vw"
                      quality={85}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Counter — bottom right on image */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
              <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/90 backdrop-blur-sm">
                {mobileSlide + 1}/{total}
              </span>
            </div>
          )}

          {/* Ver fotos — top right on image */}
          {photos.length > 1 && (
            <div className="absolute right-4 top-4 z-20">
              <button
                type="button"
                onClick={onOpenGallery}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-sm"
              >
                <Grid className="size-3.5" />
                Ver {total} fotos
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ═══ DESKTOP: Palco com Reflexo e Profundidade ═══ */}
      <div
        className="relative hidden w-full cursor-pointer overflow-hidden md:block"
        onClick={onOpenGallery}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenGallery()
        }}
        aria-label="Abrir galeria de fotos"
      >
        {/* Background Layer 1: blurred photo fill */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${photos[currentSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px) brightness(0.55)",
          }}
          aria-hidden="true"
        />

        {/* Background Layer 2: radial gradient overlay — dark edges, lighter center */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.7) 100%)",
          }}
          aria-hidden="true"
        />

        {/* The Focus — responsive container, object-cover fills naturally */}
        <div
          className="relative z-10 flex items-center justify-center px-10 py-10 lg:px-20 lg:py-12"
          style={{ height: "clamp(400px, 55vh, 680px)" }}
        >
          <div className="group/hero relative h-full w-full overflow-hidden rounded-xl" style={{ maxWidth: "60%" }}>
            {/* Fade carousel — stacked slides with opacity transition */}
            {photos.map((photo, index) => (
              <div
                key={`stage-${index}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <Image
                  src={photo}
                  alt={`${alt} - foto ${index + 1}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover/hero:scale-105"
                  sizes="(max-width: 1400px) 85vw, 1200px"
                  quality={90}
                />
              </div>
            ))}

            {/* Counter — bottom right inside artwork */}
            {photos.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20">
                <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium tabular-nums text-white/90 backdrop-blur-md">
                  {currentSlide + 1} / {total}
                </span>
              </div>
            )}
          </div>

        </div>

        {/* Ver fotos — top right */}
        {photos.length > 1 && (
          <div className="absolute right-10 top-6 z-20 lg:right-16 lg:top-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2.5 text-sm font-semibold text-white/95 shadow-lg backdrop-blur-md transition-all hover:bg-black/40">
              <Grid className="size-4" />
              Ver {total} fotos
            </span>
          </div>
        )}
      </div>

      {/* ═══ Navigation arrows (desktop) — glass circles on blur area ═══ */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-5 top-1/2 z-30 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.07] text-white/70 backdrop-blur-lg transition-all hover:bg-white/15 hover:text-white md:inline-flex lg:left-8"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="size-6" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-5 top-1/2 z-30 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.07] text-white/70 backdrop-blur-lg transition-all hover:bg-white/15 hover:text-white md:inline-flex lg:right-8"
            aria-label="Próxima foto"
          >
            <ChevronRight className="size-6" strokeWidth={1.5} />
          </button>
        </>
      )}
    </div>
  )
}
