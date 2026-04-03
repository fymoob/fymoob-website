import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProperties } from "@/services/loft"
import { formatPrice } from "@/lib/utils"
import { TipoFinalidadePage } from "@/components/search/TipoFinalidadePage"

const FINALIDADES = {
  venda: { finalidade: "Venda" as const, label: "a Venda" },
  aluguel: { finalidade: "Locação" as const, label: "para Alugar" },
}

interface PageProps { params: Promise<{ finalidade: string }> }

export async function generateStaticParams() {
  return [{ finalidade: "venda" }, { finalidade: "aluguel" }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { finalidade: slug } = await params
  const fin = FINALIDADES[slug as keyof typeof FINALIDADES]
  if (!fin) return {}
  const { properties } = await getProperties({ tipo: "Apartamento", finalidade: fin.finalidade, limit: 1000 })
  const precos = properties.map((p) => p.precoVenda ?? p.precoAluguel).filter((p): p is number => p !== null && p > 0)
  return {
    title: `Apartamentos ${fin.label} em Curitiba`,
    description: `${properties.length} apartamentos ${fin.label.toLowerCase()} em Curitiba.${precos.length > 0 ? ` A partir de ${formatPrice(Math.min(...precos))}.` : ""} FYMOOB Imobiliaria.`,
    alternates: { canonical: `/apartamentos-curitiba/${slug}` },
  }
}

export default async function Page({ params }: PageProps) {
  const { finalidade: slug } = await params
  const fin = FINALIDADES[slug as keyof typeof FINALIDADES]
  if (!fin) notFound()
  return <TipoFinalidadePage tipo="Apartamento" tipoPlural="Apartamentos" tipoSlug="apartamentos" finalidade={fin.finalidade} finalidadeSlug={slug} finalidadeLabel={fin.label} />
}
