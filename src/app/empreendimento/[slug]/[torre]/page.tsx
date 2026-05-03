import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllEmpreendimentos } from "@/services/loft"
import { formatPrice } from "@/lib/utils"
import {
  getEmpreendimentoAssets,
  getTorreFromShortSlug,
  getTorreShortSlug,
} from "@/data/empreendimento-assets"
import { ScrollToTorre } from "@/components/empreendimento/ScrollToTorre"
import EmpreendimentoHubPage from "../page"
import { SITE_URL } from "@/lib/constants"

/**
 * Sprint B.7 (03/05/2026) — Sub-rota de torre.
 *
 * URL: /empreendimento/[slug]/[torre]
 *   Ex: /empreendimento/reserva-barigui/lago
 *       /empreendimento/reserva-barigui/colina
 *       /empreendimento/reserva-barigui/mirante
 *
 * Por que existe:
 * - Hoje 10 imoveis estao todos sob "Reserva Barigui" no CRM (Wagner ainda
 *   nao segmentou por torre). O hub atual mostra todos em um lugar so e a
 *   query "reserva lago" / "reserva colina" / "reserva mirante" — top
 *   Google Ads — nao tem URL especifica pra rankear.
 * - Esta sub-rota cria uma URL distinta por torre que renderiza o MESMO HTML
 *   do hub (re-import do default), mas com title/description/H1 focados na
 *   torre. Captura signal de query sem precisar do CRM segmentar.
 * - Canonical aponta pro hub (consolida autoridade no original e evita
 *   duplicate content punitivo). Google pode mostrar variantes em SERP
 *   quando query bate exato (padrao conhecido em e-commerce com filtros).
 *
 * Quando Sprint B caminho 2 (Wagner segmentar CRM) acontecer, esta sub-rota
 * pode ou ser mantida como atalho pro hub, ou substituida por landings
 * dedicadas com dados proprios de cada torre. Decisao pos-validacao 14d.
 */

interface TorreSubRouteProps {
  params: Promise<{ slug: string; torre: string }>
}

const VALID_HUB_SLUG = /^[a-z0-9][a-z0-9-]{1,100}$/
const VALID_TORRE_SLUG = /^[a-z0-9][a-z0-9-]{0,40}$/

export const revalidate = 7200
export const dynamicParams = true

export async function generateStaticParams() {
  // Pre-renderiza apenas hubs com layout editorial e suas torres conhecidas.
  // Empreendimentos sem assets editoriais nao tem torres, entao nao geram
  // sub-rotas. Wagner cadastrar torres novas no CRM nao adiciona sub-rota
  // — assets-map e curado, intencionalmente.
  const empreendimentos = await getAllEmpreendimentos()
  const params: { slug: string; torre: string }[] = []
  for (const emp of empreendimentos) {
    const assets = getEmpreendimentoAssets(emp.slug)
    if (!assets?.torres) continue
    for (const t of assets.torres) {
      params.push({ slug: emp.slug, torre: getTorreShortSlug(t.nome) })
    }
  }
  return params
}

export async function generateMetadata({ params }: TorreSubRouteProps): Promise<Metadata> {
  const { slug, torre } = await params
  if (!VALID_HUB_SLUG.test(slug) || !VALID_TORRE_SLUG.test(torre)) return {}

  const empreendimentos = await getAllEmpreendimentos()
  const emp = empreendimentos.find((e) => e.slug === slug)
  if (!emp) return {}

  const resolved = getTorreFromShortSlug(slug, torre)
  if (!resolved) return {}

  const { torre: t } = resolved
  const bairroText = emp.bairros.length > 0 ? emp.bairros[0] : "Curitiba"
  const construtoraSuffix = emp.construtora ? ` ${emp.construtora}` : ""
  const precoMin = emp.precoMin ? formatPrice(emp.precoMin) : ""
  const precoText = precoMin ? ` a partir de ${precoMin}` : ""

  // Title focado na torre. Captura queries top Google Ads:
  //   "reserva lago", "reserva colina", "reserva mirante",
  //   "reserva barigui lago", "reserva barigui colina"
  // Pattern: "{Torre} {Construtora} — {Hub} em {Bairro}, Curitiba | FYMOOB"
  const title = `${t.nome}${construtoraSuffix} — ${emp.nome} em ${bairroText}, Curitiba | FYMOOB`

  // Description usa a propria descricao curada da torre quando existe
  // (ex: "Apartamentos com 1 a 2 quartos, em formato de studio, loft..."),
  // caindo num default contextual que ainda menciona o hub. Strip de
  // pontuacao final pra evitar ".." quando concatena com sufixo.
  const torreDescDecurta = (t.descricao
    ? t.descricao.replace(/\s+/g, " ").trim().slice(0, 120)
    : `Conheça a torre ${t.nome} dentro do complexo ${emp.nome}`
  ).replace(/[.,;:\s]+$/, "")
  const description = `${t.nome} no ${emp.nome}${construtoraSuffix} — ${bairroText}, Curitiba${precoText}. ${torreDescDecurta}. Plantas, preços e atendimento FYMOOB.`.trim()

  // Canonical aponta pro HUB. Sub-rota nao deve ser indexada como autoridade
  // primaria — Google consolida ranking no hub e usa este title/H1 quando
  // query bate especificamente na torre.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/empreendimento/${slug}` },
    keywords: [
      t.nome,
      `${t.nome} ${bairroText}`,
      `${t.nome} ${emp.nome}`,
      `${emp.nome} ${t.nome}`,
      `${t.nome} plantas`,
      `${t.nome} preços`,
      ...(emp.construtora ? [`${emp.construtora} ${t.nome}`] : []),
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/empreendimento/${slug}/${torre}`,
      type: "website",
      siteName: "FYMOOB",
      locale: "pt_BR",
      ...(t.render && {
        images: [{ url: t.render, width: 1200, height: 630, alt: `${t.nome} — ${emp.nome}` }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(t.render && { images: [t.render] }),
    },
  }
}

export default async function TorreSubRoute({ params }: TorreSubRouteProps) {
  const { slug, torre } = await params
  if (!VALID_HUB_SLUG.test(slug) || !VALID_TORRE_SLUG.test(torre)) notFound()
  const resolved = getTorreFromShortSlug(slug, torre)
  if (!resolved) notFound()

  // Re-renderiza o hub com seu HTML completo (hero, parallax, torres, plantas,
  // unidades, infra, mapa, FAQ). Visualmente igual ao hub — diferenca esta no
  // metadata + scroll automatico.
  return (
    <>
      <ScrollToTorre anchor={`torre-${torre}`} />
      {/* @ts-expect-error Async server component reusado direto: o tipo de
          params no hub e Promise<{ slug: string }>, exatamente o que
          passamos. TS as vezes reclama de async server component em JSX. */}
      <EmpreendimentoHubPage params={Promise.resolve({ slug })} />
    </>
  )
}
