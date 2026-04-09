"use client"

import { useState } from "react"
import { PropertyHero } from "./PropertyHero"
import { PropertyGallery } from "./PropertyGallery"

interface PropertyHeroWithGalleryProps {
  fotos: string[]
  mainImage: string
  alt: string
}

// Hero carousel gets limited photos for performance (less DOM nodes).
// Gallery gets ALL photos — only mounts when user clicks "Ver fotos".
const HERO_MAX_PHOTOS = 10

export function PropertyHeroWithGallery({
  fotos,
  mainImage,
  alt,
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
