import type { Metadata } from "next"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Calendar, Clock } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { mdxComponents } from "@/lib/mdx-components"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { AuthorBio } from "@/components/blog/AuthorBio"
import { RelatedPages } from "@/components/seo/RelatedPages"
import {
  generatePillarSchema,
  generateHowToSchema,
  generateLocalBusinessSchema,
  safeJsonLd,
  generateComprarApartamentoFAQ,
} from "@/lib/seo"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"

function getPillarContent() {
  const filePath = path.join(process.cwd(), "content/pillar/comprar-apartamento-curitiba.mdx")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const words = content.split(/\s+/).length
  return { frontmatter: data, content, readingTime: Math.ceil(words / 200) }
}

export const metadata: Metadata = {
  title: { absolute: "Comprar Apartamento em Curitiba — Guia Definitivo 2026 | FYMOOB" },
  // Fase 19.P2.A.4 — encurtado de 198 → 160 chars (Google trunca em ~155)
  description:
    "Comprar apartamento em Curitiba 2026: m² médio FipeZAP, 20 bairros analisados, financiamento Caixa/Itaú, ITBI, planta vs pronto. FYMOOB CRECI J 9420.",
  alternates: { canonical: "/comprar-apartamento-curitiba" },
  keywords: [
    "comprar apartamento curitiba",
    "apartamento curitiba",
    "apartamento à venda curitiba",
    "preço apartamento curitiba 2026",
    "financiamento apartamento curitiba",
    "ITBI curitiba",
    "apartamento na planta curitiba",
    "melhores bairros curitiba apartamento",
    "FipeZAP curitiba",
    "MCMV curitiba",
  ],
  openGraph: {
    title: "Comprar Apartamento em Curitiba — Guia Definitivo 2026",
    description:
      "Guia completo de 4400+ palavras: preço médio do m², 20 bairros analisados, financiamento, ITBI, documentação, dicas de visita e armadilhas.",
    type: "article",
    url: "/comprar-apartamento-curitiba",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Guia definitivo: Comprar apartamento em Curitiba 2026 — FYMOOB Imobiliária",
      },
    ],
    locale: "pt_BR",
    siteName: "FYMOOB Imobiliária",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprar Apartamento em Curitiba — Guia Definitivo 2026",
    description:
      "Guia completo: preço médio do m², 20 bairros, financiamento, ITBI, planta vs pronto, valorização.",
    images: ["/opengraph-image"],
  },
}

export default function ComprarApartamentoPage() {
  const { frontmatter, content, readingTime } = getPillarContent()

  const formattedDate = new Date(frontmatter.date as string).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Comprar Apartamento em Curitiba", url: "/comprar-apartamento-curitiba" },
  ]

  const relatedLinks = [
    { label: "Comprar Imóvel em Curitiba — Guia geral", href: "/comprar-imovel-curitiba" },
    { label: "Morar em Curitiba — Guia da cidade", href: "/morar-em-curitiba" },
    { label: "Apartamentos à venda em Curitiba", href: "/apartamentos-curitiba" },
    { label: "Lançamentos em Curitiba", href: "/lancamentos" },
    { label: "Documentos para comprar imóvel", href: "/blog/documentos-comprar-imovel-curitiba" },
    { label: "ITBI Curitiba: valor e como pagar", href: "/blog/itbi-curitiba-valor-como-pagar" },
    { label: "Financiamento Caixa/Itaú/Bradesco", href: "/blog/financiamento-caixa-itau-bradesco-comparativo" },
    { label: "Imóvel na planta vs pronto", href: "/blog/imovel-planta-vs-pronto-curitiba" },
  ]

  const articleSchema = generatePillarSchema({
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    image: frontmatter.image as string | undefined,
    date: frontmatter.date as string,
    pagePath: "/comprar-apartamento-curitiba",
  })

  // HowTo schema — Fase 19.P2.Q.bonus. Pillar tem 12 H2 que sao literalmente
  // passos do processo de compra. Rich result com steps numerados no SERP.
  const howToSchema = generateHowToSchema({
    name: "Como Comprar Apartamento em Curitiba — Guia Definitivo 2026",
    description:
      "Guia completo em 12 passos: do panorama do mercado ao pos-compra. Inclui financiamento, ITBI, documentacao, planta vs pronto, armadilhas comuns.",
    totalTimeISO: "P60D", // 60 dias estimados do inicio ao registro
    pagePath: "/comprar-apartamento-curitiba",
    steps: [
      { name: "Entender o panorama do mercado em 2026", text: "Conhecer FipeZAP, valorizacao e momento ideal de compra em Curitiba.", anchor: "panorama" },
      { name: "Avaliar por que comprar em Curitiba", text: "Comparar custo de vida, qualidade urbana e potencial de valorizacao.", anchor: "por-que" },
      { name: "Escolher o apartamento certo pro seu perfil", text: "Definir orcamento, prioridades, perfil familiar e expectativa de uso.", anchor: "como-escolher" },
      { name: "Pesquisar os 20 melhores bairros pra apartamentos", text: "Comparar Batel, Bigorrilho, Ecoville, Mossungue, Agua Verde e demais.", anchor: "20-bairros" },
      { name: "Decidir entre apartamento na planta vs pronto", text: "Comparar INCC-DI 5,86%, prazo, garantias NBR 17170, Lei do Distrato.", anchor: "planta-vs-pronto" },
      { name: "Simular financiamento", text: "Comparar taxas Caixa (11,19%), BB (11,80%), Itau (11,95%), Bradesco (11,70%) + MCMV Faixa 4.", anchor: "financiamento" },
      { name: "Calcular ITBI Curitiba", text: "ITBI 2,7% sobre valor venal ou de compra. Verificar restituicao retroativa STJ Tema 1113.", anchor: "itbi" },
      { name: "Reunir documentacao completa", text: "Matricula, certidoes vendedor (Federal, Estadual, Trabalhista, Civel, INSS), declaracao condominio.", anchor: "documentacao" },
      { name: "Visitar e fazer proposta", text: "Checklist de 10 itens estruturais, verificacao de instalacoes e documentos antes de fechar.", anchor: "visita-proposta" },
      { name: "Realizar pos-compra", text: "Registro no cartorio, transferencia de titularidade, ITBI quitado, atualizacao cadastral.", anchor: "pos-compra" },
      { name: "Evitar armadilhas comuns", text: "Averbacao pendente, divida propter rem, vicios ocultos, financiamento mal simulado.", anchor: "armadilhas" },
      { name: "Aplicar dicas finais e proximos passos", text: "Negociacao final, contrato preliminar, assinatura e mudanca.", anchor: "dicas-finais" },
    ],
  })

  // RealEstateAgent — Fase 19.P2.Q.bonus. Reforça entidade FYMOOB nesta
  // pagina especifica (alem do schema global no layout).
  const agentSchema = generateLocalBusinessSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(agentSchema) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="mt-6">
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Guia Pillar 2026
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {readingTime} min de leitura
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
            {frontmatter.title as string}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">
            {frontmatter.description as string}
          </p>
          <div className="mt-6">
            <AuthorBio compact />
          </div>
        </header>

        <div className="prose-fymoob mt-10">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            components={mdxComponents}
          />
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-8">
          <AuthorBio />
        </div>

        {/* FAQ rica — Fase 19.P1.1 */}
        <div className="mt-12 border-t border-neutral-200 pt-8">
          <DynamicFAQ
            questions={generateComprarApartamentoFAQ()}
            title="Perguntas frequentes sobre comprar apartamento em Curitiba"
          />
        </div>

        <div className="mt-8">
          <RelatedPages links={relatedLinks} title="Conteúdo relacionado" />
        </div>
      </article>
    </>
  )
}
