import type { Metadata } from "next"
import { getAllPosts } from "@/services/blog"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { BlogCard } from "@/components/blog/BlogCard"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"

export const metadata: Metadata = {
  title: "Blog | Dicas sobre Imoveis em Curitiba | FYMOOB",
  description:
    "Dicas, guias e informacoes sobre o mercado imobiliario em Curitiba. Saiba tudo sobre financiamento, documentacao, bairros e mais. Blog FYMOOB Imobiliaria.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="bg-neutral-950 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ]}
          />
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Blog FYMOOB
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Dicas, guias e informacoes sobre o mercado imobiliario em Curitiba
            para ajudar voce a encontrar o imovel ideal.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <div key={post.slug} className="opacity-0">
                <BlogCard post={post} />
              </div>
            ))}
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
