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
      {/* Main image container */}
      <div
        className="relative h-[52vh] w-full cursor-pointer md:h-[66vh]"
        onClick={onOpenGallery}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenGallery()
        }}
        aria-label="Abrir galeria de fotos"
      >
        {/* Cinematic vignette — darkens edges like a movie frame */}
        <div className="pointer-events-none absolute inset-0 z-10" style={{ boxShadow: "inset 0 0 150px 60px rgba(0,0,0,0.45)" }} />

        {/* Top gradient for badge area */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/50 to-transparent" />

        {/* Bottom gradient for text overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Image carousel — full bleed with cover */}
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {photos.map((photo, index) => (
              <div
                key={`hero-${index}`}
                className="relative h-full min-w-full shrink-0"
              >
                <Image
                  src={photo}
                  alt={`${alt} - foto ${index + 1}`}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom-left: tipo + bairro + titulo */}
        <div className="absolute bottom-0 inset-x-0 z-20 px-6 pb-6 md:px-12 md:pb-8 lg:px-20">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            {tipo} &bull; {bairro}
          </span>
          <h2 className="mt-2 max-w-2xl text-lg font-semibold leading-snug text-white drop-shadow-lg md:text-2xl">
            {titulo}
          </h2>
        </div>

        {/* Top-right: Ver fotos button */}
        {photos.length > 1 && (
          <div className="absolute right-4 top-4 z-20 md:right-12 md:top-6 lg:right-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl md:px-4 md:py-2.5 md:text-sm">
              <Grid className="size-3.5 md:size-4" />
              Ver {photos.length} fotos
            </span>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:inline-flex md:left-8 lg:left-12"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/30 md:inline-flex md:right-8 lg:right-12"
            aria-label="Próxima foto"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-1.5 md:flex md:bottom-8">
          {photos.slice(0, 8).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(index) }}
              className={cn(
                "size-2 rounded-full transition-all",
                index === currentSlide
                  ? "scale-125 bg-white"
                  : "bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Ir para foto ${index + 1}`}
            />
          ))}
          {photos.length > 8 && (
            <span className="text-xs text-white/60">+{photos.length - 8}</span>
          )}
        </div>
      )}
    </div>
  )
}
