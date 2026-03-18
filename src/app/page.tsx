import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Building2, Home as HomeIcon, Landmark, TreePine, ChevronDown } from "lucide-react"
import {
  getFeaturedProperties,
  getAllBairros,
  getAllCities,
  getAllTypes,
  getPropertyStats,
} from "@/services/loft"
import { getRecentPosts } from "@/services/blog"
import { SearchBar } from "@/components/search/SearchBar"
import { BairroCard } from "@/components/search/BairroCard"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyCardFeatured } from "@/components/property/PropertyCardFeatured"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"

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
    getFeaturedProperties(8),
    getAllBairros(),
    getAllCities(),
    getAllTypes(),
    getPropertyStats(),
    getRecentPosts(3),
  ])

  const highlight = featured[0]
  const destaques = featured.slice(1, 5)
  const bairros = allBairros.slice(0, 6)
  const bairroNames = allBairros.map((b) => b.bairro)
  const tipoNames = types.map((t) => t.tipo)
  const priceBounds = {
    min: stats.precoMin ?? 50_000,
    max: stats.precoMax ?? 5_000_000,
  }

  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-neutral-950">
        {/* Background video with scale-in */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,17,32,0.8) 0%, rgba(11,17,32,0.35) 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
          <h1 className="hero-animate hero-animate-1 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-7xl leading-[1.05]">
            Encontre seu imóvel{"\n"}ideal
          </h1>
          <p className="hero-animate hero-animate-2 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
            Apartamentos, casas e sobrados à venda e para alugar nos melhores bairros da cidade.
          </p>
          <div className="hero-animate hero-animate-3 mt-10">
            <Suspense fallback={<div className="h-16 w-full rounded-2xl bg-white/20" />}>
              <SearchBar
                bairros={bairroNames}
                cidades={cities}
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
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/60 transition hover:text-white/90"
          aria-label="Rolar para próxima seção"
        >
          <ChevronDown className="h-8 w-8" />
        </a>
      </section>

      {/* Oportunidade de hoje */}
      {highlight && (
        <section id="oportunidade" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
                  Oportunidade de hoje
                </h2>
                <div className="mt-8">
                  <PropertyCardFeatured property={highlight} />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Destaques de lançamento */}
      {destaques.length > 0 && (
        <section className="bg-neutral-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
                  Destaques de lançamento
                </h2>
                <Link
                  href="/busca"
                  className="text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
                >
                  Ver todos
                </Link>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll stagger className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {destaques.map((property) => (
                <div key={property.slug} className="opacity-0">
                  <PropertyCard property={property} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Bairros em destaque */}
      {bairros.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
                Bairros em destaque
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {bairros.map((bairro) => (
                <div key={bairro.slug} className="opacity-0">
                  <BairroCard bairro={bairro} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Buscar por tipo */}
      <section className="bg-neutral-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
              Buscar por tipo de imóvel
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll stagger className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {tipoLinks.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.href} className="opacity-0">
                  <Link
                    href={item.href}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-muted hover:shadow-xl"
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

      {/* Do Blog */}
      {recentPosts.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
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
                <div key={post.slug} className="opacity-0">
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
