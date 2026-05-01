/**
 * Pagina publica do autor — Fase 18.B
 *
 * URL canonical: /autor/[slug]
 * - Reforça E-E-A-T (Author entity dedicada com bio, CRECI, expertise, sameAs)
 * - Lista artigos publicados do autor (sinal de "experience" via volume)
 * - Schema.org Person/RealEstateAgent linkando todos os posts via author@id
 *
 * Renderiza apenas quando `BLOG_SOURCE=supabase` (autores vivem no Supabase).
 * Em modo legado (sanity/mdx), retorna 404 — autor nao existe como entidade.
 */

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Briefcase, Award, Globe, Linkedin, Instagram } from "lucide-react"

import {
  getArticleSourceMode,
  getAuthorBySlug,
  listAuthors,
  listPublishedArticlesByAuthor,
} from "@/services/articles"
import { generateAuthorSchema, safeJsonLd } from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { BlockRenderer } from "@/components/blog/BlockRenderer"
import type { BlockNoteBlock } from "@/lib/schemas/article"
import { SITE_URL } from "@/lib/constants"

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

// Pre-render apenas no modo Supabase. Em modo legado, generateStaticParams
// devolve [] e qualquer rota /autor/[slug] cai em notFound().
export async function generateStaticParams() {
  if (getArticleSourceMode() !== "supabase") return []
  const authors = await listAuthors()
  return authors.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  if (getArticleSourceMode() !== "supabase") return {}
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) return {}

  const title = `${author.name} — ${author.role} | FYMOOB`
  const description =
    author.bio_short ||
    `${author.name} é ${author.role.toLowerCase()} na FYMOOB Imobiliária${author.creci ? ` (${author.creci})` : ""}. Veja os artigos publicados.`

  return {
    title,
    description,
    alternates: { canonical: `/autor/${author.slug}` },
    openGraph: {
      title,
      description,
      type: "profile",
      url: `${SITE_URL}/autor/${author.slug}`,
      ...(author.photo_url && {
        images: [{ url: author.photo_url, alt: author.photo_alt ?? author.name }],
      }),
    },
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  if (getArticleSourceMode() !== "supabase") notFound()
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const articles = await listPublishedArticlesByAuthor(author.id!)
  const schema = generateAuthorSchema(author)

  // bio_long em BlockNote JSON (opcional). Storage Zod e `unknown`; aqui
  // narrow pra BlockNoteBlock[] de forma defensiva.
  const bioLongBlocks: BlockNoteBlock[] =
    Array.isArray(author.bio_long) ? (author.bio_long as BlockNoteBlock[]) : []
  const hasLongBio = bioLongBlocks.length > 0

  const social = author.social_links ?? {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: author.name, url: `/autor/${author.slug}` },
          ]}
        />

        {/* Hero do autor */}
        <header className="mt-4 grid grid-cols-1 gap-8 border-b border-neutral-200 pb-10 sm:grid-cols-[180px_1fr] sm:gap-10">
          {author.photo_url && (
            <div className="relative size-44 overflow-hidden rounded-2xl ring-1 ring-neutral-200 sm:size-44">
              <Image
                src={author.photo_url}
                alt={author.photo_alt ?? `Foto de ${author.name}`}
                fill
                className="object-cover"
                sizes="180px"
                priority
                unoptimized={!author.photo_url.includes("/_next/")}
              />
            </div>
          )}
          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
              {author.role}
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
              {author.name}
            </h1>
            {author.bio_short && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-600">
                {author.bio_short}
              </p>
            )}

            <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-700">
              {author.creci && (
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-brand-primary" />
                  <dt className="sr-only">CRECI</dt>
                  <dd>{author.creci}</dd>
                </div>
              )}
              {author.expertise.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-brand-primary" />
                  <dt className="sr-only">Áreas de atuação</dt>
                  <dd>{author.expertise.join(", ")}</dd>
                </div>
              )}
            </dl>

            {/* Redes sociais */}
            {(social.linkedin || social.instagram || social.website) && (
              <div className="mt-4 flex flex-wrap gap-3">
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
                )}
                {social.website && (
                  <a
                    href={social.website}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  >
                    <Globe size={14} />
                    Site
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Bio longa (opcional, BlockNote) */}
        {hasLongBio && (
          <section className="prose-fymoob mx-auto max-w-3xl py-10">
            <BlockRenderer blocks={bioLongBlocks} />
          </section>
        )}

        {/* Lista de artigos publicados */}
        <section className="py-10">
          <h2 className="font-display text-xl font-bold tracking-tight text-neutral-950">
            Artigos publicados ({articles.length})
          </h2>
          {articles.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500">
              {author.name} ainda não publicou artigos no blog.
            </p>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <li
                  key={a.id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-brand-primary"
                >
                  <Link href={`/blog/${a.slug}`} className="flex h-full flex-col">
                    {a.cover_image_url && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
                        <Image
                          src={a.cover_image_url}
                          alt={a.cover_image_alt ?? a.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized={!a.cover_image_url.includes("/_next/")}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-base font-semibold leading-snug text-neutral-950 transition-colors group-hover:text-brand-primary">
                        {a.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">
                        {a.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}
