import type { Metadata } from "next"
import Link from "next/link"
import { Building2, Home as HomeIcon, Landmark, TreePine } from "lucide-react"
import { getFeaturedProperties, getAllBairros, getAllTypes } from "@/services/loft"
import { getRecentPosts } from "@/services/blog"
import { SearchBar } from "@/components/search/SearchBar"
import { BairroCard } from "@/components/search/BairroCard"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyCardFeatured } from "@/components/property/PropertyCardFeatured"
import { BlogCard } from "@/components/blog/BlogCard"

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
  const [featured, bairros, types, recentPosts] = await Promise.all([
    getFeaturedProperties(8),
    getAllBairros(),
    getAllTypes(),
    getRecentPosts(3),
  ])

  const highlight = featured[0]
  const destaques = featured.slice(1, 5)
  const bairroNames = bairros.map((b) => b.bairro)
  const tipoNames = types.map((t) => t.tipo)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-fymoob-blue-dark via-fymoob-blue to-fymoob-blue-dark py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Encontre seu imóvel ideal em Curitiba
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Apartamentos, casas e sobrados à venda e para alugar nos melhores bairros da cidade.
          </p>
          <div className="mt-8">
            <SearchBar bairros={bairroNames} tipos={tipoNames} />
          </div>
        </div>
      </section>

      {/* Oportunidade de hoje */}
      {highlight && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold italic text-fymoob-blue">
            Oportunidade de hoje
          </h2>
          <div className="mt-6">
            <PropertyCardFeatured property={highlight} />
          </div>
        </section>
      )}

      {/* Destaques de lançamento */}
      {destaques.length > 0 && (
        <section className="bg-fymoob-bg-alt py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold italic text-fymoob-blue">
                Destaques de lançamento
              </h2>
              <Link
                href="/busca"
                className="text-sm font-medium text-fymoob-blue transition-colors hover:text-fymoob-blue-dark"
              >
                Ver todos
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {destaques.map((property) => (
                <PropertyCard key={property.slug} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bairros em destaque */}
      {bairros.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold italic text-fymoob-blue">
            Bairros em destaque
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bairros.map((bairro) => (
              <BairroCard key={bairro.slug} bairro={bairro} />
            ))}
          </div>
        </section>
      )}

      {/* Buscar por tipo */}
      <section className="bg-fymoob-bg-alt py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold italic text-fymoob-blue">
            Buscar por tipo de imóvel
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {tipoLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-3 rounded-lg bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                >
                  <Icon size={32} className="text-fymoob-blue" />
                  <span className="font-display text-sm font-semibold text-fymoob-gray-dark">
                    {item.label}
                  </span>
                  <span className="text-xs text-fymoob-gray-mid">
                    {item.description}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Do Blog */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold italic text-fymoob-blue">
              Do Blog
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-fymoob-blue transition-colors hover:text-fymoob-blue-dark"
            >
              Ver todos
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
