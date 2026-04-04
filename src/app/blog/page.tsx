import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getAllPosts } from "@/services/blog"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"

export const metadata: Metadata = {
  title: "Blog | Dicas sobre Imóveis em Curitiba",
  description:
    "Dicas, guias e informações sobre o mercado imobiliário em Curitiba. Saiba tudo sobre financiamento, documentação, bairros e mais. Blog FYMOOB Imobiliária.",
  alternates: {
    canonical: "/blog",
  },
}

const POSTS_PER_PAGE = 9

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const pageParam = typeof params.page === "string" ? params.page : "1"
  const currentPage = Math.max(1, Number(pageParam) || 1)

  const allPosts = await getAllPosts()
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE))
  const page = Math.min(currentPage, totalPages)

  const isFirstPage = page === 1
  const startIndex = isFirstPage ? 0 : (page - 1) * POSTS_PER_PAGE + 1
  const endIndex = isFirstPage ? POSTS_PER_PAGE + 1 : startIndex + POSTS_PER_PAGE

  const featured = isFirstPage ? allPosts[0] ?? null : null
  const gridPosts = isFirstPage
    ? allPosts.slice(1, POSTS_PER_PAGE + 1)
    : allPosts.slice(startIndex, endIndex)

  return (
    <>
      {/* Hero — compact with background image */}
      <section className="relative overflow-hidden bg-neutral-950 py-10 md:py-14">
        <Image
          src="https://ppbxdsyojwqujdrmnxdv.storage.sa-east-1.nhost.run/v1/files/13582abc-9e5d-4857-9ed9-1ef2e200b779"
          alt="Vista panorâmica de Curitiba"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,17,32,0.85) 0%, rgba(11,17,32,0.65) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ]}
            variant="dark"
          />
          <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-white md:text-4xl">
            Blog FYMOOB
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Dicas, guias e informações sobre o mercado imobiliário em Curitiba
            para ajudar você a encontrar o imóvel ideal.
          </p>
        </div>
      </section>

      {/* Featured post — first page only */}
      {featured && (
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <BlogCard post={featured} featured />
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Posts grid */}
      {gridPosts.length > 0 && (
        <section className="pb-10 md:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {gridPosts.map((post) => (
                <div key={post.slug}>
                  <BlogCard post={post} />
                </div>
              ))}
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Paginação do blog"
          className="pb-16 md:pb-24"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
            {page > 1 && (
              <Link
                href={page === 2 ? "/blog" : `/blog?page=${page - 1}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <ChevronLeft className="size-4" />
                Anterior
              </Link>
            )}
            <span className="px-4 text-sm text-neutral-500">
              Página {page} de {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/blog?page=${page + 1}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                Próximo
                <ChevronRight className="size-4" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </>
  )
}
