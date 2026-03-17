"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Grid3X3, ChevronLeft, ChevronRight, X } from "lucide-react"

interface PropertyGalleryProps {
  fotos: string[]
  alt: string
}

export function PropertyGallery({ fotos, alt }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const images = fotos.length > 0 ? fotos : ["/placeholder-property.jpg"]
  const count = images.length

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % count)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + count) % count)

  React.useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, count])

  // Prevent body scroll when lightbox open
  React.useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [lightboxOpen])

  return (
    <>
      {/* Bento Grid */}
      <div className={cn(
        "relative h-[28rem] md:h-[32rem] overflow-hidden rounded-xl",
        count === 1 && "grid grid-cols-1",
        count === 2 && "grid grid-cols-2 gap-2",
        count === 3 && "grid grid-cols-2 gap-2",
        count === 4 && "grid grid-cols-2 gap-2",
        count >= 5 && "grid grid-cols-4 grid-rows-2 gap-2",
      )}>
        {/* 1 photo: full width */}
        {count === 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
          >
            <Image
              src={images[0]}
              alt={`${alt} - Foto 1`}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </button>
        )}

        {/* 2 photos: 50/50 */}
        {count === 2 && images.slice(0, 2).map((foto, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openLightbox(i)}
            className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
          >
            <Image
              src={foto}
              alt={`${alt} - Foto ${i + 1}`}
              fill
              className="object-cover"
              sizes="50vw"
              priority={i === 0}
            />
          </button>
        ))}

        {/* 3 photos: 1 large left + 2 stacked right */}
        {count === 3 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative row-span-1 h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
            >
              <Image
                src={images[0]}
                alt={`${alt} - Foto 1`}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </button>
            <div className="grid grid-rows-2 gap-2">
              {images.slice(1, 3).map((foto, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => openLightbox(i + 1)}
                  className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
                >
                  <Image
                    src={foto}
                    alt={`${alt} - Foto ${i + 2}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {/* 4 photos: 1 large left + 3 right (top + 2 bottom) */}
        {count === 4 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
            >
              <Image
                src={images[0]}
                alt={`${alt} - Foto 1`}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </button>
            <div className="grid grid-rows-2 gap-2">
              <button
                type="button"
                onClick={() => openLightbox(1)}
                className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
              >
                <Image
                  src={images[1]}
                  alt={`${alt} - Foto 2`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
              <div className="grid grid-cols-2 gap-2">
                {images.slice(2, 4).map((foto, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openLightbox(i + 2)}
                    className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
                  >
                    <Image
                      src={foto}
                      alt={`${alt} - Foto ${i + 3}`}
                      fill
                      className="object-cover"
                      sizes="12.5vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* 5+ photos: 1 large left (col-span-2 row-span-2) + 4 right in 2x2 */}
        {count >= 5 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className="relative col-span-2 row-span-2 h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
            >
              <Image
                src={images[0]}
                alt={`${alt} - Foto 1`}
                fill
                className="object-cover"
                sizes="50vw"
                priority
              />
            </button>
            {images.slice(1, 5).map((foto, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openLightbox(i + 1)}
                className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl transition duration-200 hover:brightness-90"
              >
                <Image
                  src={foto}
                  alt={`${alt} - Foto ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </>
        )}

        {/* "Show all photos" button */}
        {count > 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-lg transition hover:shadow-xl"
          >
            <Grid3X3 className="h-4 w-4" />
            Mostrar todas as fotos
          </button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Fechar galeria"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-medium text-white/80">
            {currentIndex + 1} / {count} fotos
          </div>

          {/* Image */}
          <div
            className="relative mx-auto h-[80vh] w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Foto ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Navigation arrows */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
