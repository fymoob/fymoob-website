"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react"

import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  fotos: string[]
  alt: string
}

function getTileClassName(className?: string) {
  return cn(
    "relative h-full w-full cursor-pointer overflow-hidden transition-all duration-300 group-hover:brightness-75 hover:!brightness-100",
    className
  )
}

function getFiveImageRadius(index: number): string {
  if (index === 1) return "rounded-tr-2xl"
  if (index === 3) return "rounded-br-2xl"
  return "rounded-none"
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

  const goNext = React.useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % count),
    [count]
  )
  const goPrev = React.useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + count) % count),
    [count]
  )

  React.useEffect(() => {
    if (!lightboxOpen) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox()
      if (event.key === "ArrowRight") goNext()
      if (event.key === "ArrowLeft") goPrev()
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev, lightboxOpen])

  React.useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.classList.add("lightbox-open")
    } else {
      document.body.style.overflow = ""
      document.documentElement.classList.remove("lightbox-open")
    }

    return () => {
      document.body.style.overflow = ""
      document.documentElement.classList.remove("lightbox-open")
    }
  }, [lightboxOpen])

  return (
    <>
      <div
        className="group relative w-full overflow-hidden rounded-2xl md:hidden"
      >
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className={getTileClassName("block aspect-video w-full rounded-2xl")}
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

        {count > 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute right-3 bottom-3 z-10 flex items-center gap-2 rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#0B1120] shadow-md transition hover:shadow-lg"
          >
            <Grid className="h-3.5 w-3.5" />
            Ver fotos
          </button>
        )}
      </div>

      <div
        className={cn(
          "group relative hidden overflow-hidden md:h-[32rem]",
          count >= 5 ? "md:rounded-none" : "md:rounded-xl",
          count === 1 && "md:grid md:grid-cols-1",
          count === 2 && "md:grid md:grid-cols-2 md:gap-2",
          count === 3 && "md:grid md:grid-cols-2 md:gap-2",
          count === 4 && "md:grid md:grid-cols-2 md:gap-2",
          count >= 5 && "md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2"
        )}
      >
        {count === 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className={getTileClassName("rounded-xl")}
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

        {count === 2 &&
          images.slice(0, 2).map((foto, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openLightbox(index)}
              className={getTileClassName("rounded-xl")}
            >
              <Image
                src={foto}
                alt={`${alt} - Foto ${index + 1}`}
                fill
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="50vw"
                priority={index === 0}
              />
            </button>
          ))}

        {count === 3 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className={getTileClassName("rounded-xl")}
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
              {images.slice(1, 3).map((foto, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => openLightbox(index + 1)}
                  className={getTileClassName("rounded-xl")}
                >
                  <Image
                    src={foto}
                    alt={`${alt} - Foto ${index + 2}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {count === 4 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className={getTileClassName("rounded-xl")}
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
                className={getTileClassName("rounded-xl")}
              >
                <Image
                  src={images[1]}
                  alt={`${alt} - Foto 2`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
              <div className="grid grid-cols-2 gap-2">
                {images.slice(2, 4).map((foto, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => openLightbox(index + 2)}
                    className={getTileClassName("rounded-xl")}
                  >
                    <Image
                      src={foto}
                      alt={`${alt} - Foto ${index + 3}`}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="12.5vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {count >= 5 && (
          <>
            <button
              type="button"
              onClick={() => openLightbox(0)}
              className={getTileClassName(
                "col-span-2 row-span-2 rounded-l-2xl rounded-r-none"
              )}
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
            {images.slice(1, 5).map((foto, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openLightbox(index + 1)}
                className={getTileClassName(getFiveImageRadius(index))}
              >
                <Image
                  src={foto}
                  alt={`${alt} - Foto ${index + 2}`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            ))}
          </>
        )}

        {count > 1 && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B1120] shadow-md transition hover:shadow-lg"
          >
            <Grid className="h-4 w-4" />
            Mostrar todas as fotos
          </button>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Top bar */}
          <div className="flex h-14 shrink-0 items-center justify-between px-4">
            <div />
            <span className="text-sm font-medium text-white/70">
              {currentIndex + 1} / {count} fotos
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="flex size-10 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Fechar galeria"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Image area */}
          <div
            className="flex flex-1 items-center justify-center px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[currentIndex]}
              alt={`${alt} - Foto ${currentIndex + 1}`}
              width={1400}
              height={900}
              className="max-h-[calc(100dvh-7rem)] w-auto max-w-[90vw] rounded-lg object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Bottom spacer */}
          <div className="h-14 shrink-0" />

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goPrev()
                }}
                className="absolute top-1/2 left-4 z-[10000] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goNext()
                }}
                className="absolute top-1/2 right-4 z-[10000] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
