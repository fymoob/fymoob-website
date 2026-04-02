"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ChevronLeft, ChevronRight, Grid, Maximize, Share2, X } from "lucide-react"

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

type GalleryMode = "closed" | "grid" | "fullscreen"

export function PropertyGallery({ fotos, alt }: PropertyGalleryProps) {
  const [mode, setMode] = React.useState<GalleryMode>("closed")
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const touchStartX = React.useRef(0)
  const touchEndX = React.useRef(0)

  const images = fotos.length > 0 ? fotos : ["/placeholder-property.jpg"]
  const count = images.length

  const openGrid = () => setMode("grid")
  const openFullscreen = (index: number) => {
    setCurrentIndex(index)
    setMode("fullscreen")
  }
  const close = () => setMode("closed")
  const backToGrid = () => setMode("grid")

  const goNext = React.useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % count),
    [count]
  )
  const goPrev = React.useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + count) % count),
    [count]
  )

  // Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  // Keyboard nav
  React.useEffect(() => {
    if (mode === "closed") return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mode === "fullscreen") backToGrid()
        else close()
      }
      if (event.key === "ArrowRight") goNext()
      if (event.key === "ArrowLeft") goPrev()
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev, mode])

  // Lock body scroll
  React.useEffect(() => {
    if (mode !== "closed") {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mode])

  return (
    <div>
      {/* ===== Mobile: Swipeable photo strip ===== */}
      <div className="relative md:hidden">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.slice(0, 8).map((foto, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full flex-shrink-0 snap-start cursor-pointer"
              onClick={() => openGrid()}
            >
              <Image
                src={foto}
                alt={`${alt} - Foto ${index + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Photo counter */}
        <div className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          1 / {count}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={openGrid}
            className="absolute right-3 bottom-10 z-10 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/60"
          >
            <Grid className="h-3.5 w-3.5" />
            Ver fotos
          </button>
        )}
      </div>

      {/* ===== Desktop: Grid layout ===== */}
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
          <button type="button" onClick={() => openFullscreen(0)} className={getTileClassName("rounded-xl")}>
            <Image src={images[0]} alt={`${alt} - Foto 1`} fill className="object-cover" sizes="100vw" priority />
          </button>
        )}

        {count === 2 && images.slice(0, 2).map((foto, index) => (
          <button key={index} type="button" onClick={() => openFullscreen(index)} className={getTileClassName("rounded-xl")}>
            <Image src={foto} alt={`${alt} - Foto ${index + 1}`} fill loading={index === 0 ? "eager" : "lazy"} className="object-cover" sizes="50vw" priority={index === 0} />
          </button>
        ))}

        {count === 3 && (
          <>
            <button type="button" onClick={() => openFullscreen(0)} className={getTileClassName("rounded-xl")}>
              <Image src={images[0]} alt={`${alt} - Foto 1`} fill className="object-cover" sizes="50vw" priority />
            </button>
            <div className="grid grid-rows-2 gap-2">
              {images.slice(1, 3).map((foto, index) => (
                <button key={index} type="button" onClick={() => openFullscreen(index + 1)} className={getTileClassName("rounded-xl")}>
                  <Image src={foto} alt={`${alt} - Foto ${index + 2}`} fill loading="lazy" className="object-cover" sizes="25vw" />
                </button>
              ))}
            </div>
          </>
        )}

        {count === 4 && (
          <>
            <button type="button" onClick={() => openFullscreen(0)} className={getTileClassName("rounded-xl")}>
              <Image src={images[0]} alt={`${alt} - Foto 1`} fill className="object-cover" sizes="50vw" priority />
            </button>
            <div className="grid grid-rows-2 gap-2">
              <button type="button" onClick={() => openFullscreen(1)} className={getTileClassName("rounded-xl")}>
                <Image src={images[1]} alt={`${alt} - Foto 2`} fill loading="lazy" className="object-cover" sizes="25vw" />
              </button>
              <div className="grid grid-cols-2 gap-2">
                {images.slice(2, 4).map((foto, index) => (
                  <button key={index} type="button" onClick={() => openFullscreen(index + 2)} className={getTileClassName("rounded-xl")}>
                    <Image src={foto} alt={`${alt} - Foto ${index + 3}`} fill loading="lazy" className="object-cover" sizes="12.5vw" />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {count >= 5 && (
          <>
            <button type="button" onClick={() => openFullscreen(0)} className={getTileClassName("col-span-2 row-span-2 rounded-l-2xl rounded-r-none")}>
              <Image src={images[0]} alt={`${alt} - Foto 1`} fill className="object-cover" sizes="50vw" priority />
            </button>
            {images.slice(1, 5).map((foto, index) => (
              <button key={index} type="button" onClick={() => openFullscreen(index + 1)} className={getTileClassName(getFiveImageRadius(index))}>
                <Image src={foto} alt={`${alt} - Foto ${index + 2}`} fill loading="lazy" className="object-cover" sizes="25vw" />
              </button>
            ))}
          </>
        )}

        {count > 1 && (
          <button
            type="button"
            onClick={openGrid}
            className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B1120] shadow-md transition hover:shadow-lg"
          >
            <Grid className="h-4 w-4" />
            Mostrar todas as fotos
          </button>
        )}
      </div>

      {/* ===== Thumbnail strip — desktop only ===== */}
      {count > 1 && (
        <div className="mt-2 hidden gap-2 overflow-x-auto pb-1 md:flex">
          {images.slice(0, 8).map((foto, index) => (
            <button
              key={index}
              type="button"
              onClick={() => openFullscreen(index)}
              className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-transparent transition-all hover:ring-brand-primary hover:scale-105"
            >
              <Image src={foto} alt={`${alt} - Miniatura ${index + 1}`} fill loading="lazy" className="object-cover" sizes="96px" />
            </button>
          ))}
          {count > 8 && (
            <button
              type="button"
              onClick={openGrid}
              className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-200"
            >
              +{count - 8} fotos
            </button>
          )}
        </div>
      )}

      {/* ===== Grid overlay (Airbnb style) ===== */}
      {mode === "grid" && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-white">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
            <button
              type="button"
              onClick={close}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              <ArrowLeft className="size-5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <span className="text-sm text-neutral-500">{count} fotos</span>
            <button
              type="button"
              onClick={close}
              className="flex size-9 items-center justify-center rounded-full hover:bg-neutral-100"
            >
              <X className="size-5 text-neutral-600" />
            </button>
          </div>

          {/* Photo grid */}
          <div className="mx-auto max-w-3xl columns-2 gap-2 p-2 sm:p-4">
            {images.map((foto, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openFullscreen(index)}
                className="mb-2 block w-full overflow-hidden rounded-lg transition hover:opacity-90"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto}
                  alt={`${alt} - Foto ${index + 1}`}
                  className="w-full"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== Fullscreen viewer with swipe ===== */}
      {mode === "fullscreen" && (
        <div
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col bg-black/95"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex h-12 shrink-0 items-center justify-between px-4">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); backToGrid() }}
              className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Galeria
            </button>
            <span className="text-sm font-medium text-white/70">
              {currentIndex + 1} / {count}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close() }}
              className="flex size-9 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Image area with swipe */}
          <div
            className="flex flex-1 items-center justify-center px-4 sm:px-14"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[currentIndex]}
              alt={`${alt} - Foto ${currentIndex + 1}`}
              className="max-h-[calc(100dvh-8rem)] max-w-full rounded-lg object-contain"
              draggable={false}
            />
          </div>

          {/* Navigation arrows (desktop) */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute top-1/2 left-3 z-[10000] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute top-1/2 right-3 z-[10000] hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
