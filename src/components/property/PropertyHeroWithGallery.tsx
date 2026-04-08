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
  titulo: string
}

export function PropertyHeroWithGallery({
  fotos,
  mainImage,
  alt,
  tipo,
  bairro,
  titulo,
}: PropertyHeroWithGalleryProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <>
      <PropertyHero
        fotos={fotos}
        mainImage={mainImage}
        alt={alt}
        tipo={tipo}
        bairro={bairro}
        titulo={titulo}
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
