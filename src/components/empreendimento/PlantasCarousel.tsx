"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { isVistaImage } from "@/lib/image-optimization"

interface PlantasCarouselProps {
  plantas: string[]
  torreNome: string
  empreendimentoNome?: string
  bairro?: string
  whatsappPhone?: string
}

const FYMOOB_PHONE = "5541999780517"

export function PlantasCarousel({
  plantas,
  torreNome,
  empreendimentoNome,
  bairro,
  whatsappPhone = FYMOOB_PHONE,
}: PlantasCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [api])

  useEffect(() => {
    if (!api) return
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api, onSelect])

  if (!plantas || plantas.length === 0) return null

  const buildWhatsUrl = (plantaIdx: number) => {
    const empContext = empreendimentoNome ? `${torreNome} (${empreendimentoNome})` : torreNome
    const bairroContext = bairro ? ` em ${bairro}` : ""
    const msg = `Olá! Vi a planta ${plantaIdx + 1} do ${empContext}${bairroContext} no site da FYMOOB e quero mais informações: valores, disponibilidade e condições. Pode me ajudar?`
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(msg)}`
  }

  // Tracking de clique no WhatsApp da planta — dispara evento GA4 se gtag
  // estiver disponivel. Sem gtag, simplesmente segue o link normalmente.
  const handleWhatsClick = (plantaIdx: number) => {
    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === "function") {
      ;(window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "planta",
        empreendimento: empreendimentoNome || torreNome,
        torre: torreNome,
        planta_index: plantaIdx + 1,
      })
    }
  }

  const altText = (i: number) =>
    `Planta ${i + 1} do ${torreNome}${empreendimentoNome ? ` — ${empreendimentoNome}` : ""}${bairro ? `, ${bairro} Curitiba` : ""}`

  return (
    <div className="mt-6">
      <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
        Plantas disponíveis
      </p>

      <div className="group relative">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {plantas.map((planta, i) => (
              <CarouselItem key={i} className="basis-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-neutral-200 bg-white">
                  <Image
                    src={planta}
                    alt={altText(i)}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    unoptimized={isVistaImage(planta)}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Arrows */}
        {plantas.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                "absolute top-1/2 left-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100",
                !canScrollPrev && "cursor-not-allowed opacity-30 hover:opacity-30"
              )}
              aria-label="Planta anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                "absolute top-1/2 right-2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-md backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100",
                !canScrollNext && "cursor-not-allowed opacity-30 hover:opacity-30"
              )}
              aria-label="Próxima planta"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* WhatsApp CTA por planta — mensagem especifica + tracking */}
        <div className="mt-4 flex justify-center">
          <a
            href={buildWhatsUrl(current)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsClick(current)}
            data-track="whatsapp_click"
            data-source="planta"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition hover:bg-[#1da851]"
          >
            <svg viewBox="0 0 24 24" className="size-3.5 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            Quero esta planta
          </a>
        </div>

        {/* Dots */}
        {plantas.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {plantas.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  current === i ? "w-6 bg-[#c9a876]" : "w-1 bg-neutral-300"
                )}
                aria-label={`Ir para planta ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
