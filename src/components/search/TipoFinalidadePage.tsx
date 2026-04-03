import { getProperties, getAllBairros } from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import type { PropertyType, PropertyFinalidade } from "@/types/property"
import {
  generateItemListSchema,
  generateLandingStats,
  generateDynamicFAQ,
  generateLandingIntro,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { Home, DollarSign, Maximize2, BedDouble } from "lucide-react"

interface TipoFinalidadePageProps {
  tipo: PropertyType
  tipoPlural: string
  tipoSlug: string
  finalidade: PropertyFinalidade
  finalidadeSlug: string
  finalidadeLabel: string
}

export async function TipoFinalidadePage({
  tipo,
  tipoPlural,
  tipoSlug,
  finalidade,
  finalidadeSlug,
  finalidadeLabel,
}: TipoFinalidadePageProps) {
  const [{ properties }, bairros] = await Promise.all([
    getProperties({ tipo, finalidade, limit: 1000 }),
    getAllBairros(),
  ])

  const stats = generateLandingStats(properties)
  const intro = generateLandingIntro(properties, undefined, tipo)
  const faqQuestions = generateDynamicFAQ(stats, undefined, tipo)
  const pageUrl = `/${tipoSlug}-curitiba/${finalidadeSlug}`
  const itemListSchema = generateItemListSchema(properties, pageUrl)

  const bairrosComTipo = bairros
    .filter((b) => b.tipos.some((t) => t.tipo === tipo && t.count >= 3))
    .slice(0, 10)

  const oppositeFin = finalidadeSlug === "venda" ? "aluguel" : "venda"
  const oppositeLabel = finalidadeSlug === "venda" ? "para alugar" : "a venda"

  const relatedLinks = [
    { href: `/${tipoSlug}-curitiba`, label: `Todos os ${tipoPlural.toLowerCase()} em Curitiba` },
    { href: `/${tipoSlug}-curitiba/${oppositeFin}`, label: `${tipoPlural} ${oppositeLabel} em Curitiba` },
    ...bairrosComTipo.map((b) => ({
      href: `/imoveis/${b.slug}/${tipoSlug}s`,
      label: `${tipoPlural} no ${b.bairro}`,
    })),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="bg-neutral-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: `${tipoPlural} em Curitiba`, url: `/${tipoSlug}-curitiba` },
              { name: finalidadeLabel, url: pageUrl },
            ]}
          />

          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {tipoPlural} {finalidadeLabel} em Curitiba
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {intro}
          </p>

          {stats.total > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                <Home className="size-4 text-brand-primary" />
                <span><strong>{stats.total}</strong> imoveis</span>
              </div>
              {stats.precoMin && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <DollarSign className="size-4 text-brand-primary" />
                  <span>A partir de <strong>{formatPrice(stats.precoMin)}</strong></span>
                </div>
              )}
              {stats.areaMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <Maximize2 className="size-4 text-brand-primary" />
                  <span>Media <strong>{stats.areaMedio} m²</strong></span>
                </div>
              )}
              {stats.quartosMedio && (
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  <BedDouble className="size-4 text-brand-primary" />
                  <span>Media <strong>{stats.quartosMedio} quartos</strong></span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-neutral-500">Nenhum {tipo.toLowerCase()} {finalidadeLabel.toLowerCase()} encontrado no momento.</p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={faqQuestions}
            title={`Perguntas sobre ${tipoPlural.toLowerCase()} ${finalidadeLabel.toLowerCase()} em Curitiba`}
          />
          <RelatedPages title="Explore tambem" links={relatedLinks} />
        </div>
      </section>
    </>
  )
}
