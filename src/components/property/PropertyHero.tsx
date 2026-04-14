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
  const stageStyle = {
    height: "clamp(460px, 64dvh, 760px)",
    width: "min(100%, calc(clamp(460px, 64dvh, 760px) * 16 / 9))",
  }

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

          {/* Counter — bottom left on image (avoids conflict with sticky bottom bar / price card) */}
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none">
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

      <div
        className="relative hidden w-full cursor-pointer overflow-hidden bg-slate-950 md:block"
        onClick={onOpenGallery}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenGallery()
        }}
        aria-label="Abrir galeria de fotos"
      >
        <div className="absolute inset-0 bg-slate-950" aria-hidden="true" />
        <div
          className="absolute inset-0 scale-[1.08] opacity-90"
          style={{
            backgroundImage: `url(${photos[currentSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(52px) brightness(0.36)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(15,23,42,0.02) 0%, rgba(15,23,42,0.22) 52%, rgba(2,6,23,0.84) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1680px] items-center justify-center px-4 py-5 lg:px-6 lg:py-6">
          <div
            className="group/hero relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_38px_120px_rgba(0,0,0,0.42)]"
            style={stageStyle}
          >
            {photos.map((photo, index) => (
              <div
                key={`stage-${index}`}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  index === currentSlide ? "opacity-100" : "pointer-events-none opacity-0"
                )}
              >
                <Image
                  src={photo}
                  alt={`${alt} - foto ${index + 1}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-[1800ms] ease-out group-hover/hero:scale-[1.02]"
                  sizes="(max-width: 1536px) 92vw, 1350px"
                  quality={92}
                />
              </div>
            ))}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.12) 42%, rgba(2,6,23,0.34) 100%)",
              }}
              aria-hidden="true"
            />

            {photos.length > 1 && (
              <div className="absolute bottom-4 left-4 z-20">
                <span className="rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium tabular-nums text-white/90 backdrop-blur-md">
                  {currentSlide + 1} / {total}
                </span>
              </div>
            )}
          </div>
        </div>

        {photos.length > 1 && (
          <div className="absolute right-6 top-6 z-20 lg:right-8 lg:top-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur-md">
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
