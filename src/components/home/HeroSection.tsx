"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Suspense } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuickSearch } from "@/components/search/QuickSearch"
import { HomeSearchBar } from "@/components/search/HomeSearchBar"

interface HeroSectionProps {
  bairroNames: string[]
  tipoNames: string[]
  cidades: string[]
  priceBounds: { min: number; max: number }
}

export function HeroSection({ bairroNames, tipoNames, cidades, priceBounds }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // default mobile (SSR-safe)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    if (!mobile) {
      // Lazy load video after LCP — wait for idle time
      const loadVideo = () => {
        const video = videoRef.current
        if (!video) return
        const source = video.querySelector("source")
        if (source?.dataset.src) {
          source.src = source.dataset.src
          video.load()
          video.play().catch(() => {})
          // Fade in after video can play
          video.addEventListener("canplay", () => setShowVideo(true), { once: true })
        }
      }

      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadVideo)
      } else {
        setTimeout(loadVideo, 2000)
      }
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Poster image — this is the LCP element (fast) */}
      <Image
        src={isMobile ? "/images/hero-poster-mobile.webp" : "/images/hero-poster.webp"}
        alt="Vista panorâmica de apartamento de luxo em Curitiba"
        fill
        priority
        quality={80}
        className="object-cover"
        sizes="100vw"
      />

      {/* Video — lazy loaded, desktop only */}
      {!isMobile && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            showVideo ? "opacity-100" : "opacity-0"
          )}
        >
          <source data-src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,17,32,0.8) 0%, rgba(11,17,32,0.35) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 text-center sm:px-6">
        <h1 className="hero-animate hero-animate-1 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl leading-[1.05]">
          Encontre seu imóvel{"\n"}ideal
        </h1>
        <p className="hero-animate hero-animate-2 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg md:text-xl">
          Apartamentos, casas e sobrados à venda e para alugar nos melhores
          bairros da cidade.
        </p>

        {/* Mobile: compact pill → expands to bottom sheet */}
        <div className="hero-animate hero-animate-3 mt-8 md:hidden">
          <QuickSearch bairros={bairroNames} tipos={tipoNames} />
        </div>

        {/* Desktop: full search bar */}
        <div className="hero-animate hero-animate-3 mt-10 hidden md:block">
          <Suspense
            fallback={<div className="h-16 w-full rounded-2xl bg-white/20" />}
          >
            <HomeSearchBar
              bairros={bairroNames}
              cidades={cidades}
              tipos={tipoNames}
              priceBounds={priceBounds}
              targetPath="/busca"
            />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#oportunidade"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40 transition hover:text-white/70"
        aria-label="Rolar para próxima seção"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  )
}
