"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

interface PropertyGalleryProps {
  fotos: string[]
  alt: string
}

export function PropertyGallery({ fotos, alt }: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) return
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap())
    })
  }, [api])

  const images = fotos.length > 0 ? fotos : ["/placeholder-property.jpg"]

  return (
    <>
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((foto, index) => (
            <CarouselItem key={index}>
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex(index)
                  setLightboxOpen(true)
                }}
                className="relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl"
              >
                <Image
                  src={foto}
                  alt={`${alt} - Foto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={index === 0}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </>
        )}
      </Carousel>

      {/* Photo counter */}
      {images.length > 1 && (
        <div className="mt-2 text-center text-xs font-medium text-neutral-500">
          {currentIndex + 1} / {images.length} fotos
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.slice(0, 8).map((foto, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200",
                currentIndex === index
                  ? "border-brand-primary ring-1 ring-brand-primary/30"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={foto}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
          {images.length > 8 && (
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(8)
                setLightboxOpen(true)
              }}
              className="flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border-2 border-transparent bg-neutral-100 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-200"
            >
              +{images.length - 8}
            </button>
          )}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-2 sm:max-w-4xl">
          <DialogTitle className="sr-only">
            Galeria de fotos - {alt}
          </DialogTitle>
          <Carousel opts={{ startIndex: currentIndex }}>
            <CarouselContent>
              {images.map((foto, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg">
                    <Image
                      src={foto}
                      alt={`${alt} - Foto ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="90vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
          <p className="text-center text-sm font-medium text-neutral-500">
            {currentIndex + 1} / {images.length}
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}
