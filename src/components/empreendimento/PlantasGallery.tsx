"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlantasGalleryProps {
  plantas: string[]
}

export function PlantasGallery({ plantas }: PlantasGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const close = useCallback(() => setOpen(false), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % plantas.length), [plantas.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + plantas.length) % plantas.length), [plantas.length])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
      return () => { document.body.style.overflow = "" }
    }
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, close, next, prev])

  const openAt = (i: number) => {
    setIndex(i)
    setOpen(true)
  }

  if (!plantas || plantas.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plantas.map((planta, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="group overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={planta}
                alt={`Planta ${i + 1}`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
              Planta {i + 1} · Clique para ampliar
            </p>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black animate-[fadeIn_0.2s_ease-out]"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex h-14 shrink-0 items-center justify-between px-4 sm:px-6">
            <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm">
              Planta {index + 1} / {plantas.length}
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

          {/* Image */}
          <div
            className="flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={index}
              src={plantas[index]}
              alt={`Planta ${index + 1}`}
              width={1200}
              height={900}
              className="max-h-[calc(100dvh-4rem)] w-auto object-contain animate-[fadeIn_0.15s_ease-out]"
              priority
            />
          </div>

          {/* Navigation arrows (desktop) */}
          {plantas.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute top-1/2 left-4 z-[10000] hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-110 sm:flex"
                aria-label="Planta anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute top-1/2 right-4 z-[10000] hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-110 sm:flex"
                aria-label="Próxima planta"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Mobile dots */}
          {plantas.length > 1 && (
            <div className="flex justify-center gap-1.5 pb-6 sm:hidden">
              {plantas.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIndex(i) }}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    index === i ? "w-6 bg-[#c9a876]" : "w-1 bg-white/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
