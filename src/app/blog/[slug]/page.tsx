import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/services/blog"
import { generateBlogPostingSchema } from "@/lib/seo"
import { mdxComponents } from "@/lib/mdx-components"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { RelatedPosts } from "@/components/blog/RelatedPosts"

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]}
        />

        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-fymoob-blue/10 px-3 py-1 text-xs font-medium text-fymoob-blue"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-fymoob-gray-mid">
              {post.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm text-fymoob-gray-mid">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime} min de leitura
              </span>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* Content */}
          <div className="prose-fymoob">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-fymoob-blue transition-colors hover:text-fymoob-blue-dark"
          >
            <ArrowLeft size={16} />
            Voltar ao blog
          </Link>
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={related} />
      </div>
    </>
  )
}
