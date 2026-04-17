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
import { generatePillarSchema , safeJsonLd} from "@/lib/seo"

function getPillarContent() {
  const filePath = path.join(process.cwd(), "content/pillar/comprar-imovel-curitiba.mdx")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const words = content.split(/\s+/).length
  return { frontmatter: data, content, readingTime: Math.ceil(words / 200) }
}

export const metadata: Metadata = {
  title: { absolute: "Comprar Imóvel em Curitiba — Guia Completo 2026 | FYMOOB" },
  description:
    "Guia definitivo para comprar imóvel em Curitiba: melhores bairros, preços, financiamento, documentação, custos e dicas de especialistas.",
  alternates: { canonical: "/comprar-imovel-curitiba" },
  openGraph: {
    title: "Comprar Imóvel em Curitiba — Guia Completo 2026",
    description: "Guia definitivo para comprar imóvel em Curitiba: melhores bairros, preços, financiamento e documentação.",
    type: "article",
    url: "/comprar-imovel-curitiba",
  },
}

export default function ComprarImovelPage() {
  const { frontmatter, content, readingTime } = getPillarContent()

  const formattedDate = new Date(frontmatter.date as string).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Comprar Imóvel em Curitiba", url: "/comprar-imovel-curitiba" },
  ]

  const relatedLinks = [
    { label: "Melhores Bairros de Curitiba 2026", href: "/blog/melhores-bairros-curitiba-2026" },
    { label: "ITBI Curitiba: Valor e Como Pagar", href: "/blog/itbi-curitiba-valor-como-pagar" },
    { label: "Documentos para Comprar Imóvel", href: "/blog/documentos-comprar-imovel-curitiba" },
    { label: "Financiamento Minha Casa Minha Vida", href: "/blog/como-financiar-minha-casa-minha-vida" },
    { label: "Buscar Imóveis à Venda", href: "/busca" },
    { label: "Apartamentos em Curitiba", href: "/apartamentos-curitiba" },
  ]

  const articleSchema = generatePillarSchema({
    title: frontmatter.title as string,
    description: frontmatter.description as string,
    image: frontmatter.image as string | undefined,
    date: frontmatter.date as string,
    pagePath: "/comprar-imovel-curitiba",
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
              Guia Completo
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

        <div className="mt-8">
          <RelatedPages links={relatedLinks} title="Conteúdo relacionado" />
        </div>
      </article>
    </>
  )
}
