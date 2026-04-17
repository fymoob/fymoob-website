"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowLeft, ChevronLeft, ChevronRight, Grid, X } from "lucide-react"

import { cn } from "@/lib/utils"

interface PropertyGalleryProps {
  fotos: string[]
  alt: string
  /** When set, gallery renders only overlays (no inline grid/strip) starting in this mode */
  initialMode?: "grid" | "fullscreen"
  /** Called when the overlay closes — required when using initialMode */
  onClose?: () => void
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

export function PropertyGallery({ fotos, alt, initialMode, onClose: onCloseExternal }: PropertyGalleryProps) {
  const [mode, setMode] = React.useState<GalleryMode>(initialMode ?? "closed")
  const isOverlayOnly = !!initialMode
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [animating, setAnimating] = React.useState(false)
  const touchStartX = React.useRef(0)
  const touchEndX = React.useRef(0)
  const [showUI, setShowUI] = React.useState(true)
  const tapTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const autoHideTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // YouTube/Netflix-style auto-hide: any interaction shows the UI and
  // restarts a 3.5s timer. Timer is cleared on unmount or when the gallery
  // closes.
  const showUIWithAutoHide = React.useCallback(() => {
    setShowUI(true)
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    autoHideTimer.current = setTimeout(() => setShowUI(false), 3500)
  }, [])

  // Reset/clear timer when fullscreen closes or on unmount
  React.useEffect(() => {
    if (mode !== "fullscreen") {
      if (autoHideTimer.current) {
        clearTimeout(autoHideTimer.current)
        autoHideTimer.current = null
      }
      return
    }
    // Start visible with auto-hide
    showUIWithAutoHide()
    return () => {
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current)
    }
  }, [mode, showUIWithAutoHide])

  const images = fotos.length > 0 ? fotos : ["/placeholder-property.jpg"]
  const count = images.length

  const openGrid = () => {
    setAnimating(true)
    setMode("grid")
    requestAnimationFrame(() => setAnimating(false))
  }
  const openFullscreen = (index: number) => {
    setCurrentIndex(index)
    setShowUI(true)
    setAnimating(true)
    setMode("fullscreen")
    requestAnimationFrame(() => setAnimating(false))
  }
  const close = () => {
    setMode("closed")
    onCloseExternal?.()
  }
  const backToGrid = () => {
    setAnimating(true)
    setMode("grid")
    requestAnimationFrame(() => setAnimating(false))
  }

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
    touchEndX.current = 0
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
      {/* ===== Mobile: Swipeable photo strip (hidden in overlay-only mode) ===== */}
      {!isOverlayOnly && (<>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <div className="relative overflow-hidden md:hidden">
        <div
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.slice(0, 8).map((foto, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full flex-shrink-0 snap-center cursor-pointer"
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

      {/* ===== Desktop: Bento Box grid ===== */}
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
            className="absolute right-4 bottom-4 z-10 flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-[#0B1120] shadow-md transition-all hover:scale-105 hover:bg-neutral-100 hover:shadow-lg"
          >
            <Grid className="h-4 w-4" />
            Mostrar todas as fotos
          </button>
        )}
      </div>
      </>)}

      {/* ===== Grid Modal (Masonry) — Airbnb style ===== */}
      {mode === "grid" && (
        <div className="fixed inset-0 z-[9999] animate-[fadeIn_0.25s_ease-out] overflow-y-auto bg-white">
          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white/95 px-4 py-3 backdrop-blur-sm">
            <button
              type="button"
              onClick={close}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
            >
              <ArrowLeft className="size-5" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
            <span className="text-sm font-medium text-neutral-500">{count} fotos</span>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar galeria"
              className="flex size-9 items-center justify-center rounded-full transition hover:bg-neutral-100"
            >
              <X className="size-5 text-neutral-600" />
            </button>
          </div>

          {/* Immersive grid — full-width, large images */}
          <div className="mx-auto max-w-7xl columns-1 gap-4 p-4 sm:columns-2 lg:columns-3 sm:gap-5 sm:p-8">
            {images.map((foto, index) => (
              <button
                key={index}
                type="button"
                onClick={() => openFullscreen(index)}
                className="mb-4 block w-full overflow-hidden rounded-2xl transition-transform duration-200 hover:scale-[1.01] hover:shadow-xl sm:mb-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto}
                  alt={`${alt} - Foto ${index + 1}`}
                  className="w-full"
                  loading={index < 6 ? "eager" : "lazy"}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===== Fullscreen Viewer (Immersive) ===== */}
      {mode === "fullscreen" && (
        <div
          className="fixed inset-0 z-[9999] flex h-[100dvh] w-screen flex-col bg-black animate-[fadeIn_0.2s_ease-out]"
          onClick={showUIWithAutoHide}
          onMouseMove={showUIWithAutoHide}
        >
          {/* Top bar — toggles with tap */}
          <div className={cn(
            "flex h-14 shrink-0 items-center justify-between px-4 transition-opacity duration-200 sm:px-6",
            showUI ? "opacity-100" : "pointer-events-none opacity-0"
          )}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); backToGrid() }}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
            >
              <Grid className="size-4" />
              Galeria
            </button>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              {currentIndex + 1} / {count}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close() }}
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition hover:bg-white/20 hover:text-white"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Image area with swipe + pinch-to-zoom */}
          <div
            className="flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-16"
            style={{ touchAction: "pan-y pinch-zoom" }}
            // Click propaga para o wrapper (showUIWithAutoHide). Evita
            // que tap na foto pareça travado (bug anterior).
            onTouchStart={(e) => {
              handleTouchStart(e)
              if (tapTimeout.current) clearTimeout(tapTimeout.current)
            }}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => {
              const diff = touchStartX.current - touchEndX.current
              if (Math.abs(diff) > 50) {
                // Swipe — navega e reinicia auto-hide
                if (diff > 0) goNext()
                else goPrev()
                showUIWithAutoHide()
              }
              // Tap simples: o onClick do wrapper ja dispara showUIWithAutoHide
              touchEndX.current = 0
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${alt} - Foto ${currentIndex + 1}`}
              className="max-h-[calc(100dvh-4rem)] w-full object-contain animate-[fadeIn_0.15s_ease-out]"
              draggable={false}
            />
          </div>

          {/* Navigation arrows (desktop) — toggles with UI */}
          {count > 1 && (
            <div className={cn("transition-opacity duration-200", showUI ? "opacity-100" : "pointer-events-none opacity-0")}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute top-1/2 left-4 z-[10000] hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-110 sm:flex"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute top-1/2 right-4 z-[10000] hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-110 sm:flex"
                aria-label="Próxima foto"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
