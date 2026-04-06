import type { Metadata } from "next"
import { Suspense } from "react"
import { getProperties, getAllBairros, getAllTypes, getAllCities, getPropertyStats } from "@/services/loft"
import { SearchPageSearchBar } from "@/components/search/SearchPageSearchBar"
import { formatPrice } from "@/lib/utils"
import { generateItemListSchema } from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import Link from "next/link"
import { Building2, TrendingUp, MapPin } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const { properties } = await getProperties({ lancamento: true, limit: 1000 })
  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)

  const precoMin = precos.length > 0 ? formatPrice(Math.min(...precos)) : null
  const precoMax = precos.length > 0 ? formatPrice(Math.max(...precos)) : null
  const faixa = precoMin && precoMax ? ` de ${precoMin} a ${precoMax}` : ""

  return {
    title: "Lançamentos Imobiliários em Curitiba | Imóveis na Planta — FYMOOB",
    description: `${properties.length} lançamentos e imóveis na planta em Curitiba${faixa}. Apartamentos e empreendimentos novos com condições exclusivas. FYMOOB Imobiliária.`,
    alternates: { canonical: "/lancamentos" },
  }
}

export default async function LancamentosPage() {
  const [{ properties }, bairros, allTypes, cidades, stats] = await Promise.all([
    getProperties({ lancamento: true, limit: 1000 }),
    getAllBairros(),
    getAllTypes(),
    getAllCities(),
    getPropertyStats(),
  ])

  const precos = properties
    .map((p) => p.precoVenda ?? p.precoAluguel)
    .filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null

  // Bairros que têm lançamentos
  const bairrosSet = new Set(properties.map((p) => p.bairro).filter(Boolean))
  const bairrosComLancamento = bairros.filter((b) => bairrosSet.has(b.bairro))

  // Tipos disponíveis
  const tipos = [...new Set(properties.map((p) => p.tipo).filter(Boolean))]

  const itemListSchema = generateItemListSchema(properties, "/lancamentos")

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <Suspense fallback={null}>
      <SearchPageSearchBar
        bairros={bairros.map((b) => b.bairro)}
        tipos={allTypes.map((t) => t.tipo)}
        cidades={cidades}
        priceBounds={{ min: stats.precoMin ?? 50_000, max: stats.precoMax ?? 5_000_000 }}
        bairroSummaries={bairros}
        tipoSummaries={allTypes}
        sticky
      />
      </Suspense>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Lançamentos", url: "/lancamentos" },
          ]}
        />

        <h1 className="font-display text-2xl font-bold text-fymoob-gray-dark sm:text-3xl">
          Lançamentos Imobiliários em Curitiba
        </h1>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-fymoob-gray-mid">
          <span className="flex items-center gap-1.5">
            <Building2 className="size-4 text-brand-primary" />
            <span className="font-semibold text-fymoob-gray-dark">{properties.length}</span>{" "}
            lançamentos disponíveis
          </span>
          {precoMin && precoMax && (
            <span className="flex items-center gap-1.5">
              <TrendingUp className="size-4 text-brand-primary" />
              De{" "}
              <span className="font-semibold text-fymoob-gray-dark">{formatPrice(precoMin)}</span>
              {" "}a{" "}
              <span className="font-semibold text-fymoob-gray-dark">{formatPrice(precoMax)}</span>
            </span>
          )}
          {bairrosComLancamento.length > 0 && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-brand-primary" />
              <span className="font-semibold text-fymoob-gray-dark">{bairrosComLancamento.length}</span>{" "}
              bairros
            </span>
          )}
        </div>

        {/* Descrição SEO */}
        <div className="mt-6">
          <p className="max-w-3xl text-fymoob-gray-mid">
            Encontre os melhores lançamentos e imóveis na planta em Curitiba. Empreendimentos novos
            com condições especiais de pagamento direto com a construtora. Apartamentos, casas e
            sobrados em fase de lançamento nos principais bairros da cidade.
          </p>
        </div>

        {/* Tipos disponíveis */}
        {tipos.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {tipos.map((tipo) => (
              <span
                key={tipo}
                className="rounded-full border border-fymoob-gray-light bg-white px-4 py-1.5 text-sm text-fymoob-gray-dark"
              >
                {tipo}
              </span>
            ))}
          </div>
        )}

        {/* Bairros com lançamentos */}
        {bairrosComLancamento.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {bairrosComLancamento.map((b) => (
              <Link
                key={b.slug}
                href={`/imoveis/${b.slug}`}
                className="rounded-full border border-fymoob-gray-light px-4 py-1.5 text-sm text-fymoob-gray-dark transition-colors hover:border-fymoob-blue hover:text-fymoob-blue"
              >
                {b.bairro}
              </Link>
            ))}
          </div>
        )}

        {/* Grid de imóveis */}
        {properties.length > 0 ? (
          <div className="mt-8">
            <PropertyGrid properties={properties} />
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-fymoob-gray-dark">
              Nenhum lançamento disponível no momento
            </p>
            <p className="mt-2 text-sm text-fymoob-gray-mid">
              Novos lançamentos são adicionados frequentemente. Volte em breve ou explore nosso portfólio completo.
            </p>
            <Link
              href="/busca"
              className="mt-6 inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
            >
              Ver todos os imóveis
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
