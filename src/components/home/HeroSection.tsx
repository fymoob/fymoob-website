// Server Component — NO "use client"
// h1 and p render without hydration dependency → fast LCP
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
      className="relative flex min-h-[50dvh] items-center justify-center overflow-hidden rounded-b-[40px] bg-neutral-200 pt-16 md:min-h-[75dvh] md:rounded-b-[60px] md:pt-0"
    >
      {/* Background image */}
      <HeroBackground />

      {/* Top gradient — navbar legibility */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-24"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Bottom gradient — text/search legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl leading-[1.05] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          Encontre seu imóvel{"\n"}ideal
        </h1>
        <p className="hero-animate-2 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-lg md:text-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)]">
          Apartamentos, casas e sobrados à venda e para alugar nos melhores
          bairros da cidade.
        </p>

        {/* Mobile: compact pill → expands to bottom sheet */}
        <div className="hero-animate-3 mt-8 md:hidden">
          <QuickSearch bairros={bairroNames} tipos={tipoNames} />
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
        href="#oportunidade"
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50 transition hover:text-white/80 md:bottom-6"
        aria-label="Rolar para próxima seção"
      >
        <ChevronDown className="h-7 w-7" />
      </a>
    </section>
  )
}
