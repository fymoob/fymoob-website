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

      {/* Hero Image with title overlay */}
      <div className="relative overflow-hidden bg-neutral-950">
        <div className="relative mx-auto aspect-[21/9] max-w-7xl sm:aspect-[21/8]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
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
