import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllBairros, getProperties } from "@/services/loft"
import { slugify, formatPrice } from "@/lib/utils"
import type { PropertyType, PropertyFinalidade, PropertyFilters } from "@/types/property"
import {
  generateLandingTitle,
  generateLandingDescription,
  generateItemListSchema,
  generateLandingIntro,
  generateLandingStats,
  generateDynamicFAQ,
} from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGrid } from "@/components/search/PropertyGrid"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { Home, Maximize2, BedDouble, DollarSign } from "lucide-react"

// --- Type mappings ---
const TIPO_SLUG_MAP: Record<string, PropertyType> = {
  apartamentos: "Apartamento",
  casas: "Casa",
  sobrados: "Sobrado",
  terrenos: "Terreno",
}

const TIPO_PLURAL: Partial<Record<PropertyType, string>> = {
  Apartamento: "Apartamentos",
  "Apartamento Duplex": "Apartamentos Duplex",
  Casa: "Casas",
  "Casa em Condomínio": "Casas em Condomínio",
  Chácara: "Chácaras",
  Cobertura: "Coberturas",
  Kitnet: "Kitnets",
  Loja: "Lojas",
  "Ponto Comercial": "Pontos Comerciais",
  "Prédio Comercial": "Prédios Comerciais",
  "Sala Comercial": "Salas Comerciais",
  "Salas/Conjuntos": "Salas/Conjuntos",
  Sobrado: "Sobrados",
  Studio: "Studios",
  Terreno: "Terrenos",
  "Terreno Comercial": "Terrenos Comerciais",
  Empreendimento: "Empreendimentos",
}

const ALL_TIPO_SLUGS = ["apartamentos", "casas", "sobrados", "terrenos"]

// --- Finalidade mappings ---
const FINALIDADE_SLUGS: Record<string, PropertyFinalidade> = {
  venda: "Venda",
  aluguel: "Locação",
}

const FINALIDADE_LABELS: Record<string, { title: string; preposition: string }> = {
  venda: { title: "Imoveis a Venda", preposition: "a venda" },
  aluguel: { title: "Imoveis para Alugar", preposition: "para alugar" },
}

function isFinalidade(slug: string): boolean {
  return slug in FINALIDADE_SLUGS
}

function isTipo(slug: string): boolean {
  return slug in TIPO_SLUG_MAP
}

// --- Page ---
interface CombinadaPageProps {
  params: Promise<{ bairro: string; tipo: string }>
}

export async function generateStaticParams() {
  const bairros = await getAllBairros()
  const params: { bairro: string; tipo: string }[] = []

  for (const b of bairros) {
    // Type combinations (existing)
    for (const { tipo, count } of b.tipos) {
      if (count >= 3) {
        params.push({ bairro: b.slug, tipo: `${slugify(tipo)}s` })
      }
    }
    // Finalidade combinations (new) — only if bairro has 3+ properties
    if (b.total >= 3) {
      params.push({ bairro: b.slug, tipo: "venda" })
      params.push({ bairro: b.slug, tipo: "aluguel" })
    }
  }

  return params
}

export async function generateMetadata({ params }: CombinadaPageProps): Promise<Metadata> {
  const { bairro: bairroSlug, tipo: tipoSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)
  if (!bairro) return {}

  const filters: PropertyFilters = { bairro: bairro.bairro, limit: 1000 }

  if (isFinalidade(tipoSlug)) {
    filters.finalidade = FINALIDADE_SLUGS[tipoSlug]
    const { properties } = await getProperties(filters)
    const label = FINALIDADE_LABELS[tipoSlug]
    const precos = properties.map((p) => p.precoVenda ?? p.precoAluguel).filter((p): p is number => p !== null && p > 0)
    return {
      title: `${label.title} no ${bairro.bairro}, Curitiba | FYMOOB`,
      description: `${properties.length} imoveis ${label.preposition} no ${bairro.bairro}, Curitiba.${precos.length > 0 ? ` Precos a partir de ${formatPrice(Math.min(...precos))}.` : ""} Encontre seu imovel ideal com a FYMOOB.`,
      alternates: { canonical: `/imoveis/${bairroSlug}/${tipoSlug}` },
    }
  }

  const tipoKey = TIPO_SLUG_MAP[tipoSlug]
  if (!tipoKey) return {}

  filters.tipo = tipoKey
  const { properties } = await getProperties(filters)
  const precos = properties.map((p) => p.precoVenda ?? p.precoAluguel).filter((p): p is number => p !== null && p > 0)

  return {
    title: generateLandingTitle(tipoKey, bairro.bairro),
    description: generateLandingDescription(tipoKey, bairro.bairro, properties.length, {
      min: precos.length > 0 ? Math.min(...precos) : null,
      max: precos.length > 0 ? Math.max(...precos) : null,
    }),
    alternates: { canonical: `/imoveis/${bairroSlug}/${tipoSlug}` },
  }
}

export default async function CombinadaPage({ params }: CombinadaPageProps) {
  const { bairro: bairroSlug, tipo: tipoSlug } = await params
  const bairros = await getAllBairros()
  const bairro = bairros.find((b) => b.slug === bairroSlug)

  if (!bairro) notFound()

  const isFin = isFinalidade(tipoSlug)
  const tipoKey = isFin ? undefined : TIPO_SLUG_MAP[tipoSlug]

  if (!isFin && !tipoKey) notFound()

  // Fetch properties
  const filters: PropertyFilters = { bairro: bairro.bairro, limit: 1000 }
  if (isFin) {
    filters.finalidade = FINALIDADE_SLUGS[tipoSlug]
  } else {
    filters.tipo = tipoKey
  }
  const { properties } = await getProperties(filters)

  // Labels
  const pageTitle = isFin
    ? `${FINALIDADE_LABELS[tipoSlug].title} no ${bairro.bairro}`
    : `${TIPO_PLURAL[tipoKey!] || `${tipoKey}s`} no ${bairro.bairro}, Curitiba`

  const breadcrumbLabel = isFin
    ? FINALIDADE_LABELS[tipoSlug].title
    : (TIPO_PLURAL[tipoKey!] || `${tipoKey}s`)

  const tipoForIntro = isFin ? undefined : (tipoKey as string)
  const stats = generateLandingStats(properties)
  const intro = generateLandingIntro(properties, bairro.bairro, tipoForIntro)
  const faqQuestions = generateDynamicFAQ(stats, bairro.bairro, tipoForIntro)
  const itemListSchema = generateItemListSchema(properties, `/imoveis/${bairroSlug}/${tipoSlug}`)

  // Cross-linking
  const relatedLinks: { href: string; label: string }[] = [
    { href: `/imoveis/${bairroSlug}`, label: `Todos os imoveis no ${bairro.bairro}` },
  ]

  if (isFin) {
    // Link to opposite finalidade
    const opposite = tipoSlug === "venda" ? "aluguel" : "venda"
    relatedLinks.push({
      href: `/imoveis/${bairroSlug}/${opposite}`,
      label: `${FINALIDADE_LABELS[opposite].title} no ${bairro.bairro}`,
    })
    // Link to types in this bairro
    for (const s of ALL_TIPO_SLUGS) {
      const match = bairro.tipos.find((t) => `${slugify(t.tipo)}s` === s && t.count >= 3)
      if (match) {
        relatedLinks.push({
          href: `/imoveis/${bairroSlug}/${s}`,
          label: `${TIPO_PLURAL[TIPO_SLUG_MAP[s]] || s} no ${bairro.bairro}`,
        })
      }
    }
  } else {
    // Link to tipo page citywide
    relatedLinks.push({
      href: `/${tipoSlug}-curitiba`,
      label: `${TIPO_PLURAL[tipoKey!] || tipoSlug} em Curitiba`,
    })
    // Link to finalidades
    relatedLinks.push(
      { href: `/imoveis/${bairroSlug}/venda`, label: `Imoveis a venda no ${bairro.bairro}` },
      { href: `/imoveis/${bairroSlug}/aluguel`, label: `Imoveis para alugar no ${bairro.bairro}` },
    )
    // Other types in same bairro
    for (const s of ALL_TIPO_SLUGS) {
      if (s === tipoSlug) continue
      const match = bairro.tipos.find((t) => `${slugify(t.tipo)}s` === s && t.count >= 3)
      if (match) {
        relatedLinks.push({
          href: `/imoveis/${bairroSlug}/${s}`,
          label: `${TIPO_PLURAL[TIPO_SLUG_MAP[s]] || s} no ${bairro.bairro}`,
        })
      }
    }
  }

  // Other bairros with same filter
  const otherBairros = bairros
    .filter((b) => b.slug !== bairroSlug && b.total >= 3)
    .slice(0, 6)
    .map((b) => ({
      href: `/imoveis/${b.slug}/${tipoSlug}`,
      label: isFin
        ? `${FINALIDADE_LABELS[tipoSlug].title} no ${b.bairro}`
        : `${TIPO_PLURAL[tipoKey!] || tipoSlug} no ${b.bairro}`,
    }))
  relatedLinks.push(...otherBairros)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero */}
      <section className="bg-neutral-950 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: bairro.bairro, url: `/imoveis/${bairroSlug}` },
              { name: breadcrumbLabel, url: `/imoveis/${bairroSlug}/${tipoSlug}` },
            ]}
          />

          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {pageTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
            {intro}
          </p>

          {stats.total > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                <Home className="size-4 text-brand-primary" />
                <span><strong>{stats.total}</strong> {stats.total === 1 ? "imovel" : "imoveis"}</span>
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

      {/* Grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-neutral-500">
                Nenhum imovel encontrado com esses filtros no momento.
              </p>
              <Link href={`/imoveis/${bairroSlug}`} className="mt-4 inline-block text-brand-primary hover:underline">
                Ver todos os imoveis no {bairro.bairro}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ + Related */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={faqQuestions}
            title={`Perguntas frequentes sobre ${pageTitle.toLowerCase()}`}
          />
          <RelatedPages title="Explore tambem" links={relatedLinks} />
        </div>
      </section>
    </>
  )
}
