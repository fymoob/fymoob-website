import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProperties } from "@/services/loft"
import { formatPrice } from "@/lib/utils"
import { TipoFinalidadePage } from "@/components/search/TipoFinalidadePage"
import type { PropertyType } from "@/types/property"

/**
 * Factory pra paginas /[tipo]-curitiba/[finalidade] — Fase 20.W2.1.
 *
 * Antes: 4 paginas (apartamentos/casas/sobrados/terrenos) com 42 linhas
 * identicas, so variando o tipo. Mudanca de padrao = 4 edits + risco de
 * divergencia. Agora cada page.tsx tem 5 linhas (config + re-export).
 *
 * Adicionar novo tipo (ex: "Cobertura"): criar
 * `/coberturas-curitiba/[finalidade]/page.tsx` chamando esta factory
 * com `{ tipo: "Cobertura", tipoPlural: "Coberturas", tipoSlug: "coberturas" }`.
 */
const FINALIDADES = {
  venda: { finalidade: "Venda" as const, label: "a Venda" },
  aluguel: { finalidade: "Locação" as const, label: "para Alugar" },
} as const

type FinalidadeSlug = keyof typeof FINALIDADES

interface FactoryConfig {
  /** Tipo canonico (igual ao PropertyType da Loft) */
  tipo: PropertyType
  /** Plural pra exibir no title (ex: "Apartamentos", "Casas") */
  tipoPlural: string
  /** Slug pro path (ex: "apartamentos", "casas") */
  tipoSlug: string
}

interface PageProps {
  params: Promise<{ finalidade: string }>
}

export function createTipoFinalidadePage({ tipo, tipoPlural, tipoSlug }: FactoryConfig) {
  async function generateStaticParams() {
    const results = await Promise.all(
      (Object.entries(FINALIDADES) as [FinalidadeSlug, (typeof FINALIDADES)[FinalidadeSlug]][]).map(
        async ([slug, { finalidade }]) => {
          const { properties } = await getProperties({ tipo, finalidade, limit: 500 })
          return properties.length >= 2 ? { finalidade: slug } : null
        }
      )
    )
    return results.filter(
      (p): p is { finalidade: FinalidadeSlug } => p !== null
    )
  }

  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { finalidade: slug } = await params
    const fin = FINALIDADES[slug as FinalidadeSlug]
    if (!fin) return {}
    const { properties } = await getProperties({ tipo, finalidade: fin.finalidade, limit: 500 })
    const precos = properties
      .map((p) => p.precoVenda ?? p.precoAluguel)
      .filter((p): p is number => p !== null && p > 0)
    return {
      title: `${tipoPlural} ${fin.label} em Curitiba`,
      description: `${properties.length} ${tipoPlural.toLowerCase()} ${fin.label.toLowerCase()} em Curitiba.${
        precos.length > 0 ? ` A partir de ${formatPrice(Math.min(...precos))}.` : ""
      } FYMOOB Imobiliaria.`,
      alternates: { canonical: `/${tipoSlug}-curitiba/${slug}` },
    }
  }

  async function Page({ params }: PageProps) {
    const { finalidade: slug } = await params
    const fin = FINALIDADES[slug as FinalidadeSlug]
    if (!fin) notFound()
    return (
      <TipoFinalidadePage
        tipo={tipo}
        tipoPlural={tipoPlural}
        tipoSlug={tipoSlug}
        finalidade={fin.finalidade}
        finalidadeSlug={slug}
        finalidadeLabel={fin.label}
      />
    )
  }

  return { generateStaticParams, generateMetadata, default: Page }
}
