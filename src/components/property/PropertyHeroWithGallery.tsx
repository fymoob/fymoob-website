"use client"

import { useState } from "react"
import { PropertyHero } from "./PropertyHero"
import { PropertyGallery } from "./PropertyGallery"

interface PropertyHeroWithGalleryProps {
  fotos: string[]
  mainImage: string
  alt: string
}

export function PropertyHeroWithGallery({
  fotos,
  mainImage,
  alt,
}: PropertyHeroWithGalleryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      <PropertyHero
        fotos={fotos}
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
