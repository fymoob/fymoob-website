"use client"

import Image from "next/image"
import { Grid } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyHeroProps {
  mainImage: string
  alt: string
  tipo: string
  bairro: string
  photoCount: number
  onOpenGallery: () => void
}

export function PropertyHero({
  mainImage,
  alt,
  tipo,
  bairro,
  photoCount,
  onOpenGallery,
}: PropertyHeroProps) {
  return (
    <div className="relative h-[50vh] w-full overflow-hidden rounded-3xl md:h-[60vh]">
      <Image
        src={mainImage}
        alt={alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Top-left: tipo + bairro pill */}
      <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {tipo} • {bairro}
        </span>
      </div>

      {/* Bottom-right: Ver Galeria button */}
      {photoCount > 1 && (
        <button
          type="button"
          onClick={onOpenGallery}
          className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-white hover:scale-105 md:right-6 md:bottom-6"
        >
          <Grid className="size-4" />
          Ver {photoCount} fotos
        </button>
      )}
    </div>
  )
}
