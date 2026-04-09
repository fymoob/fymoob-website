import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Building2, Home as HomeIcon, Landmark, TreePine, TrendingUp, MapPin, LayoutGrid } from "lucide-react"
import {
  getFeaturedProperties,
  getAllBairros,
  getAllCities,
  getAllTypes,
  getPropertyStats,
} from "@/services/loft"
import { getRecentPosts } from "@/services/blog"
import { BairroCard } from "@/components/search/BairroCard"
import { HeroSection } from "@/components/home/HeroSection"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { GoogleReviews } from "@/components/shared/GoogleReviews"

// Dynamic imports — client components that return null for most visitors or are below-the-fold
const RecentlyViewed = dynamic(
  () => import("@/components/shared/RecentlyViewed").then((m) => ({ default: m.RecentlyViewed })),
  { ssr: true }
)
const SavedSearchBanner = dynamic(
  () => import("@/components/search/SavedSearchBanner").then((m) => ({ default: m.SavedSearchBanner })),
  { ssr: true }
)
const HomeCarousel = dynamic(
  () => import("@/components/home/HomeCarousel").then((m) => ({ default: m.HomeCarousel })),
  { ssr: true }
)

export const metadata: Metadata = {
  title: "Imóveis à Venda e Aluguel em Curitiba | FYMOOB",
  description:
    "Encontre apartamentos, casas e sobrados à venda e para alugar em Curitiba. FYMOOB Imobiliária — seu imóvel ideal com atendimento personalizado.",
  alternates: {
    canonical: "/",
  },
}

const tipoLinks = [
  {
    href: "/apartamentos-curitiba",
    label: "Apartamentos",
    icon: Building2,
    description: "Apartamentos à venda e aluguel",
  },
  {
    href: "/casas-curitiba",
    label: "Casas",
    icon: HomeIcon,
    description: "Casas à venda e aluguel",
  },
  {
    href: "/sobrados-curitiba",
    label: "Sobrados",
    icon: Landmark,
    description: "Sobrados à venda e aluguel",
  },
  {
    href: "/terrenos-curitiba",
    label: "Terrenos",
    icon: TreePine,
    description: "Terrenos à venda",
  },
]

export default async function Home() {
  const [featured, allBairros, cities, types, stats, recentPosts] = await Promise.all([
    getFeaturedProperties(15),
    getAllBairros(),
    getAllCities(),
    getAllTypes(),
    getPropertyStats(),
    getRecentPosts(3),
  ])

  const lancamentos = featured.filter((p) => p.lancamento)
  const prontosParaMorar = featured.filter((p) => !p.lancamento).slice(0, 6)
  const destaques = lancamentos.slice(0, 6)
  const bairros = allBairros.slice(0, 6)
  const bairroNames = allBairros.map((b) => b.bairro)
  const tipoNames = types.map((t) => t.tipo)
  const priceBounds = {
    min: stats.precoMin ?? 50_000,
    max: stats.precoMax ?? 5_000_000,
  }
  // Rich data for SearchBar filtering (tasks 6, 8)
  const bairroSummaries = allBairros
  const tipoSummaries = types

  return (
    <>
      {/* Hero — poster image (LCP) + lazy video (desktop only) */}
      <HeroSection
        bairroNames={bairroNames}
        tipoNames={tipoNames}
        cidades={cities}
        priceBounds={priceBounds}
        bairroSummaries={bairroSummaries}
        tipoSummaries={tipoSummaries}
      />

      {/* Saved search banner */}
      <SavedSearchBanner />

      {/* Imóveis em destaque — Prontos para morar */}
      {prontosParaMorar.length > 0 && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                  Imóveis em destaque
                </h2>
                <p className="mt-1 text-sm text-neutral-500">Prontos para morar nos melhores bairros</p>
              </div>
              <Link
                href="/busca"
                className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
              >
                Ver todos
              </Link>
            </div>
            <div className="mt-6">
              <HomeCarousel properties={prontosParaMorar} fadeFrom="from-white" />
            </div>
          </div>
        </section>
      )}

      {/* Destaques de lançamento */}
      {destaques.length > 0 && (
        <section className="bg-neutral-50 py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-2xl">
                  Destaques de lançamento
                </h2>
                <p className="mt-1 text-sm text-neutral-500">Novos empreendimentos em Curitiba</p>
              </div>
              <Link
                href="/lancamentos"
                className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
              >
                Ver todos
              </Link>
            </div>
            <div className="mt-6">
              <HomeCarousel properties={destaques} fadeFrom="from-neutral-50" />
            </div>
          </div>
        </section>
      )}

      {/* Bairros em destaque */}
      {bairros.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-3xl md:font-bold">
                Bairros em destaque
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {bairros.map((bairro) => (
                <div key={bairro.slug} className="">
                  <BairroCard bairro={bairro} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Avaliações Google — prova social */}
      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <GoogleReviews variant="compact" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Buscar por tipo */}
      <section className="bg-neutral-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-3xl md:font-bold">
              Buscar por tipo de imóvel
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {tipoLinks.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.href} className="">
                  <Link
                    href={item.href}
                    className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-neutral-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-muted hover:shadow-xl"
                  >
                    <Icon size={32} className="text-brand-primary" />
                    <span className="font-display text-sm font-semibold text-neutral-950">
                      {item.label}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {item.description}
                    </span>
                  </Link>
                </div>
              )
            })}
          </AnimateOnScroll>
        </div>
      </section>

      {/* Stats Bar — Prova Social (autoridade, mais abaixo) */}
      <section className="border-y border-neutral-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-6 px-4 sm:gap-10 sm:px-6 lg:gap-16 lg:px-8">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="size-5 text-brand-primary" />
            <div>
              <span className="text-lg font-bold text-neutral-950">{stats.total}</span>
              <span className="ml-1.5 text-sm text-neutral-500">imóveis disponíveis</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <div className="flex items-center gap-2.5">
            <MapPin className="size-5 text-brand-primary" />
            <div>
              <span className="text-lg font-bold text-neutral-950">{allBairros.length}</span>
              <span className="ml-1.5 text-sm text-neutral-500">bairros em Curitiba</span>
            </div>
          </div>
          <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
          <div className="flex items-center gap-2.5">
            <TrendingUp className="size-5 text-brand-primary" />
            <div>
              <span className="text-lg font-bold text-neutral-950">{types.length}</span>
              <span className="ml-1.5 text-sm text-neutral-500">tipos de imóvel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vistos recentemente — só aparece se o usuário já visitou imóveis */}
      <RecentlyViewed />

      {/* Do Blog */}
      {recentPosts.length > 0 && (
        <section className="py-10 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-3xl md:font-bold">
                  Do Blog
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
                >
                  Ver todos
                </Link>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {recentPosts.map((post) => (
                <div key={post.slug} className="">
                  <BlogCard post={post} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      )}
    </>
  )
}
