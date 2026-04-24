import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/services/blog"
import { generateBlogPostingSchema, safeJsonLd } from "@/lib/seo"
import { mdxComponents } from "@/lib/mdx-components"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { TableOfContents } from "@/components/blog/TableOfContents"
import { AuthorBio } from "@/components/blog/AuthorBio"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} | Blog FYMOOB`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
      images: [{ url: post.image }],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.slug, post.tags)
  const schema = generateBlogPostingSchema(post)

  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      {/* Hero Image — mobile: imagem 100% limpa. Desktop: overlay premium.
          Motivo: overlay+tags em mobile 21/9 competem com conteudo visual da
          OG image (desenhada 1.91:1 pra ser vista inteira em shares sociais).
          Ver discussao em docs/seo/article-rewrite-learnings.md */}
      <div className="relative overflow-hidden bg-neutral-950">
        {/* Mobile: imagem pura 16/9, sem overlay */}
        <div className="relative aspect-[16/9] w-full sm:hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            // unoptimized: pula /_next/image. OG images pre-dimensionadas
            // 1200x630 WebP ~30KB. Evita cota Vercel Image Optimization.
            unoptimized
          />
        </div>
        {/* Desktop: overlay com título */}
        <div className="relative mx-auto hidden aspect-[21/8] max-w-7xl sm:block">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-3 max-w-3xl font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl leading-[1.1]">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-only: tags + título em bloco limpo abaixo da imagem */}
      <div className="border-b border-neutral-200 bg-white px-4 py-6 sm:hidden">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-3 font-display text-2xl font-extrabold leading-[1.1] tracking-tight text-neutral-950">
          {post.title}
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        {/* Layout: Content + TOC sidebar */}
        <div className="mt-4 grid grid-cols-1 gap-12 xl:grid-cols-[1fr_220px]">
          {/* Main content */}
          <article className="min-w-0">
            {/* Header */}
            <header className="mb-10">
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-600">
                {post.description}
              </p>

              <div className="mt-6 flex items-center gap-4 border-b border-neutral-200 pb-6 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-brand-primary" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-brand-primary" />
                  {post.readingTime} min de leitura
                </span>
              </div>
            </header>

            {/* MDX Content — editorial typography */}
            <div className="prose-fymoob mx-auto max-w-3xl">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>

            {/* Author Bio */}
            <div className="mt-12 max-w-3xl mx-auto">
              <AuthorBio />
            </div>

            {/* Pillar pages — reforca internal linking (SEO). Todo blog
                post cita os 3 guias principais, sinalizando autoridade
                pra comprar/morar/alugar-curitiba ao Google */}
            <div className="mt-12 mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-neutral-50 p-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Guias completos
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Link
                  href="/comprar-imovel-curitiba"
                  className="group rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  <div className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-brand-primary">
                    Como comprar imóvel em Curitiba
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">Guia completo do processo</div>
                </Link>
                <Link
                  href="/morar-em-curitiba"
                  className="group rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  <div className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-brand-primary">
                    Morar em Curitiba
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">Guia dos melhores bairros</div>
                </Link>
                <Link
                  href="/alugar-curitiba"
                  className="group rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-brand-primary/60 hover:bg-brand-primary/5"
                >
                  <div className="text-sm font-semibold text-neutral-900 transition-colors group-hover:text-brand-primary">
                    Alugar em Curitiba
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">Guia completo de locação</div>
                </Link>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8 max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
              >
                <ArrowLeft size={16} />
                Voltar ao blog
              </Link>
            </div>
          </article>

          {/* Table of Contents — desktop sidebar */}
          <TableOfContents content={post.content} />
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={related} />
      </div>
    </>
  )
}
