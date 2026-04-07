"use client"

import { useState } from "react"
import { PropertyHero } from "./PropertyHero"
import { PropertyGallery } from "./PropertyGallery"

interface PropertyHeroWithGalleryProps {
  fotos: string[]
  mainImage: string
  alt: string
  tipo: string
  bairro: string
}

export function PropertyHeroWithGallery({
  fotos,
  mainImage,
  alt,
  tipo,
  bairro,
}: PropertyHeroWithGalleryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      <PropertyHero
        mainImage={mainImage}
        alt={alt}
        tipo={tipo}
        bairro={bairro}
        photoCount={fotos.length}
        onOpenGallery={() => setGalleryOpen(true)}
      />

      {/* Gallery: opens in fullscreen lightbox, with grid accessible via button */}
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
