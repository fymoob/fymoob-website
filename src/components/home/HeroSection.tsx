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
import type { CaracteristicaOption } from "@/services/taxonomy"

interface HeroSectionProps {
  bairroNames: string[]
  tipoNames: string[]
  cidades: string[]
  priceBounds: { min: number; max: number }
  bairroSummaries?: BairroSummary[]
  tipoSummaries?: TypeSummary[]
  caracteristicas?: CaracteristicaOption[]
}

export function HeroSection({ bairroNames, tipoNames, cidades, priceBounds, bairroSummaries, tipoSummaries, caracteristicas }: HeroSectionProps) {
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

      {/* Desktop readability gradient: stronger on top/center, transparent toward water */}
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,14,22,0.52) 0%, rgba(9,14,22,0.36) 34%, rgba(9,14,22,0.18) 58%, rgba(9,14,22,0.04) 78%, rgba(9,14,22,0) 100%)",
        }}
      />

      {/* Content \u2014 max-width escala progressivamente: 4xl (896px) ate XL,
          5xl (1024px) em XL+, 6xl (1152px) em 2K+. Evita que h1 quebre em
          2 linhas em 2K e mantem proporcao em FullHD. */}
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 text-center sm:px-6 xl:max-w-5xl 2xl:max-w-6xl">
        {/* Tipografia em duas fases:
            - Mobile -> 2xl (1536px): Tailwind breakpoints predictiveis
              (30 -> 36 -> 48 -> 60). FullHD (1920) entra em 2xl mas a
              clamp dah valor proporcional pro viewport real, evitando
              que 1920 e 2560 tenham mesmo tamanho.
            - 2xl em diante: clamp(3.75rem, 3.5vw, 5.5rem) escala
              60->88 entre 1714px e 2514px. FullHD (1920) renderiza ~67px,
              2K (2560) renderiza 88px (cap). */}
        <h1 className="font-display font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-[clamp(3.75rem,3.5vw,5.5rem)]">
          {"Encontre seu im\u00f3vel ideal"}
        </h1>
        <p className="hero-animate-2 mx-auto mt-4 max-w-2xl leading-relaxed text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] sm:mt-6 md:font-medium md:leading-relaxed md:text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] xl:max-w-3xl 2xl:max-w-4xl text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-[clamp(1.25rem,0.5rem+0.5vw,1.5rem)]">
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
            caracteristicas={caracteristicas}
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
