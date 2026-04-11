"use client"

import { useState } from "react"
import { PropertyHero } from "./PropertyHero"
import { PropertyGallery } from "./PropertyGallery"
import type { PropertyPageVariant } from "@/types/property"

interface PropertyHeroWithGalleryProps {
  fotos: string[]
  mainImage: string
  alt: string
  variant: PropertyPageVariant
}

// Hero carousel gets limited photos for performance (less DOM nodes).
// Gallery gets ALL photos — only mounts when user clicks "Ver fotos".
const HERO_MAX_PHOTOS = 5

export function PropertyHeroWithGallery({
  fotos,
  mainImage,
  alt,
  variant,
}: PropertyHeroWithGalleryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const heroPhotos = fotos.slice(0, HERO_MAX_PHOTOS)

  return (
    <>
      <PropertyHero
        fotos={heroPhotos}
        totalPhotos={fotos.length}
        mainImage={mainImage}
        alt={alt}
        variant={variant}
        onOpenGallery={() => setGalleryOpen(true)}
      />

      {galleryOpen && (
        <PropertyGallery
          fotos={fotos}
          alt={alt}
          initialMode="fullscreen"
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  )
}
