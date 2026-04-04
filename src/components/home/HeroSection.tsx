// Server Component — NO "use client"
// h1 and p render without hydration dependency → fast LCP
import dynamic from "next/dynamic"
import { ChevronDown } from "lucide-react"
import { HeroBackground } from "./HeroBackground"

const QuickSearch = dynamic(
  () => import("@/components/search/QuickSearch").then((m) => ({ default: m.QuickSearch })),
  { loading: () => <div className="h-14 w-full rounded-2xl bg-white/20 animate-pulse" /> }
)

const HomeSearchBar = dynamic(
  () => import("@/components/search/HomeSearchBar").then((m) => ({ default: m.HomeSearchBar })),
  { loading: () => <div className="h-16 w-full rounded-2xl bg-white/20 animate-pulse" /> }
)

interface HeroSectionProps {
  bairroNames: string[]
  tipoNames: string[]
  cidades: string[]
  priceBounds: { min: number; max: number }
}

export function HeroSection({ bairroNames, tipoNames, cidades, priceBounds }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* Background: poster image (LCP) + lazy video (desktop) */}
      <HeroBackground />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(11,17,32,0.8) 0%, rgba(11,17,32,0.35) 100%)",
        }}
      />

      {/* Content — Server rendered, NO hydration needed for LCP */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 text-center sm:px-6">
        {/* h1: NO animation class — must be instantly visible for LCP */}
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl leading-[1.05]">
          Encontre seu imóvel{"\n"}ideal
        </h1>
        <p className="hero-animate-2 mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg md:text-xl">
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
            targetPath="/busca"
          />
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
