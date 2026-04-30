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
  description:
    "Tudo sobre comprar apartamento em Curitiba: preço médio do m² (FipeZAP), 20 melhores bairros, financiamento, ITBI, documentação, planta vs pronto, valorização. Por especialistas FYMOOB CRECI J 9420.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
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
