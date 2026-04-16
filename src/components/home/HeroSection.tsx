// Server Component - NO "use client"
// h1 and p render without hydration dependency -> fast LCP
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"
import { HeroBackground } from "./HeroBackground"

const QuickSearch = dynamic(
  () => import("@/components/search/QuickSearch").then((m) => ({ default: m.QuickSearch })),
  { loading: () => <div className="h-14 w-full rounded-2xl bg-white/30 backdrop-blur animate-pulse" /> }
)

const HomeSearchBar = dynamic(
  () => import("@/components/search/HomeSearchBar").then((m) => ({ default: m.HomeSearchBar })),
  { loading: () => <div className="h-16 w-full rounded-2xl bg-white/30 backdrop-blur animate-pulse" /> }
)

import type { BairroSummary, TypeSummary } from "@/types/property"

interface HeroSectionProps {
  bairroNames: string[]
  tipoNames: string[]
  cidades: string[]
  priceBounds: { min: number; max: number }
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
}

export function HeroSection({ bairroNames, tipoNames, cidades, priceBounds, bairroSummaries, tipoSummaries }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[50dvh] items-center justify-center overflow-hidden bg-neutral-200 pt-16 md:min-h-[75dvh] md:pt-0"
    >
      {/* Background image */}
      <HeroBackground />

      {/* Top gradient - navbar legibility */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-24"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Mobile full-hero glass layer: readability boost with cleaner composition */}
      <div className="absolute inset-0 z-[1] bg-black/18 md:hidden" />

      {/* Bottom gradient - desktop only */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.68) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-5xl md:text-7xl md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          {"Encontre seu im\u00f3vel ideal"}
        </h1>
        <p className="hero-animate-2 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] sm:mt-6 sm:text-lg md:text-xl md:text-white/90 md:drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
          {"Im\u00f3veis para comprar ou alugar com o acompanhamento pr\u00f3ximo e seguro que voc\u00ea merece."}
        </p>

        {/* Mobile: compact pill -> expands to bottom sheet */}
        <div className="hero-animate-3 mt-8 md:hidden">
          <QuickSearch bairroSummaries={bairroSummaries ?? []} tipoSummaries={tipoSummaries ?? []} />
        </div>

        {/* Desktop: full search bar */}
        <div className="hero-animate-3 mt-10 hidden md:block">
          <HomeSearchBar
            bairros={bairroNames}
            cidades={cidades}
            tipos={tipoNames}
            priceBounds={priceBounds}
            bairroSummaries={bairroSummaries}
            tipoSummaries={tipoSummaries}
            targetPath="/busca"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#destaques"
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/50 transition hover:text-white/80 md:bottom-6"
        aria-label={"Rolar para pr\u00f3xima se\u00e7\u00e3o"}
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  )
}
