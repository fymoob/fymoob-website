"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface PropertyHeroProps {
  fotos: string[]
  mainImage: string
  alt: string
  tipo: string
  bairro: string
  titulo: string
  onOpenGallery: () => void
}

export function PropertyHero({
  fotos,
  mainImage,
  alt,
  tipo,
  bairro,
  titulo,
  onOpenGallery,
}: PropertyHeroProps) {
  const photos = fotos.length > 0 ? fotos : [mainImage]
  const [currentSlide, setCurrentSlide] = useState(0)

  const goPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? photos.length - 1 : prev - 1))
  }, [photos.length])

  const goNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  return (
    <div className="group relative w-screen overflow-hidden" style={{ marginLeft: "calc(-50vw + 50%)" }}>
      {/* ═══ MOBILE: full-bleed cover ═══ */}
      <div
        className="relative h-[52vh] w-full cursor-pointer md:hidden"
        onClick={onOpenGallery}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenGallery()
        }}
        aria-label="Abrir galeria de fotos"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div key={`mobile-${index}`} className="relative h-full min-w-full shrink-0">
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
            ))}
          </div>
        </div>

        {/* Mobile: info overlay */}
        <div className="absolute bottom-0 inset-x-0 z-20 px-5 pb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            {tipo} &bull; {bairro}
          </span>
          <h2 className="mt-2 max-w-sm text-base font-semibold leading-snug text-white drop-shadow-lg">
            {titulo}
          </h2>
        </div>

        {/* Mobile: counter */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 right-4 z-20">
            <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white/90 backdrop-blur-sm">
              {currentSlide + 1}/{photos.length}
            </span>
          </div>
        )}

        {/* Mobile: Ver fotos */}
        {photos.length > 1 && (
          <div className="absolute right-4 top-4 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-sm">
              <Grid className="size-3.5" />
              Ver {photos.length} fotos
            </span>
          </div>
        )}
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

        {/* The Focus — responsive container, image adapts via object-contain */}
        <div
          className="relative z-10 flex items-center justify-center px-10 py-8 lg:px-20 lg:py-10"
          style={{ height: "clamp(400px, 55vh, 680px)" }}
        >
          <div className="relative h-full w-full" style={{ maxWidth: "88%" }}>
            {/* Carousel track — fixed height, images contained inside */}
            <div className="h-full overflow-hidden rounded-xl">
              <div
                className="flex h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {photos.map((photo, index) => (
                  <div key={`stage-${index}`} className="relative h-full min-w-full shrink-0">
                    <Image
                      src={photo}
                      alt={`${alt} - foto ${index + 1}`}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="object-contain"
                      sizes="(max-width: 1400px) 85vw, 1200px"
                      quality={90}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Deep floating shadow beneath artwork */}
            <div
              className="pointer-events-none absolute -bottom-6 left-[8%] right-[8%] h-12"
              style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.5)", borderRadius: "50%" }}
              aria-hidden="true"
            />

            {/* Counter — bottom right inside artwork */}
            {photos.length > 1 && (
              <div className="absolute bottom-3 right-3 z-20">
                <span className="rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium tabular-nums text-white/90 backdrop-blur-md">
                  {currentSlide + 1} / {photos.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stage info — dedicated strip below image, inside dark area */}
        <div className="relative z-20 pb-5">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative mx-auto px-10 lg:px-20" style={{ maxWidth: "90%" }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
              {tipo} &bull; {bairro}
            </span>
            <h2 className="mt-1.5 max-w-2xl text-xl font-semibold leading-snug text-white/95 md:text-2xl">
              {titulo}
            </h2>
          </div>
        </div>

        {/* Stage: Ver fotos — top right */}
        {photos.length > 1 && (
          <div className="absolute right-10 top-6 z-20 lg:right-16 lg:top-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all hover:bg-white/20">
              <Grid className="size-4" />
              Ver {photos.length} fotos
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

      {/* ═══ Mobile dots ═══ */}
      {photos.length > 1 && (
        <div className="absolute bottom-14 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 md:hidden">
          {photos.slice(0, 8).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(index) }}
              className={cn(
                "size-1.5 rounded-full transition-all",
                index === currentSlide
                  ? "scale-125 bg-white"
                  : "bg-white/40"
              )}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
          {photos.length > 8 && (
            <span className="text-[10px] text-white/50">+{photos.length - 8}</span>
          )}
        </div>
      )}
    </div>
  )
}
