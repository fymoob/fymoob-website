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

function getPillarContent() {
  const filePath = path.join(process.cwd(), "content/pillar/alugar-curitiba.mdx")
  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)
  const words = content.split(/\s+/).length
  return { frontmatter: data, content, readingTime: Math.ceil(words / 200) }
}

export const metadata: Metadata = {
  title: "Alugar Apartamento em Curitiba — Guia Completo 2026 | FYMOOB",
  description:
    "Guia completo para alugar imóvel em Curitiba: documentos, garantias, direitos do inquilino, melhores bairros e preços atualizados.",
  alternates: { canonical: "/alugar-curitiba" },
  openGraph: {
    title: "Alugar Apartamento em Curitiba — Guia Completo 2026",
    description: "Guia completo para alugar imóvel em Curitiba: documentos, garantias, bairros e preços.",
    type: "article",
  },
}

export default function AlugarCuritibaPage() {
  const { frontmatter, content, readingTime } = getPillarContent()
  const formattedDate = new Date(frontmatter.date as string).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  })

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Alugar em Curitiba", url: "/alugar-curitiba" },
  ]

  const relatedLinks = [
    { label: "Custo de Vida em Curitiba", href: "/blog/custo-de-vida-curitiba" },
    { label: "Melhores Bairros de Curitiba", href: "/blog/melhores-bairros-curitiba-2026" },
    { label: "Comprar Imóvel em Curitiba", href: "/comprar-imovel-curitiba" },
    { label: "Morar em Curitiba", href: "/morar-em-curitiba" },
    { label: "Buscar Imóveis para Alugar", href: "/busca" },
  ]

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { "@type": "Person", name: "Bruno César de Almeida", jobTitle: "Corretor de Imóveis", credential: "CRECI J 9420" },
    publisher: { "@type": "Organization", name: "FYMOOB Imobiliária", url: "https://fymoob.com" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="mt-6">
          <div className="flex items-center gap-3 text-sm text-neutral-500">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">Guia Completo</span>
            <span className="flex items-center gap-1"><Calendar className="size-3.5" />{formattedDate}</span>
            <span className="flex items-center gap-1"><Clock className="size-3.5" />{readingTime} min de leitura</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">{frontmatter.title as string}</h1>
          <p className="mt-4 text-lg leading-relaxed text-neutral-600">{frontmatter.description as string}</p>
          <div className="mt-6"><AuthorBio compact /></div>
        </header>
        <div className="prose-fymoob mt-10">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} components={mdxComponents} />
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-8"><AuthorBio /></div>
        <div className="mt-8"><RelatedPages links={relatedLinks} title="Conteúdo relacionado" /></div>
      </article>
    </>
  )
}
