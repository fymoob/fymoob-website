import type { Metadata } from "next"
import { getAllPosts } from "@/services/blog"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { BlogCard } from "@/components/blog/BlogCard"

export const metadata: Metadata = {
  title: "Blog | Dicas sobre Imóveis em Curitiba | FYMOOB",
  description:
    "Dicas, guias e informações sobre o mercado imobiliário em Curitiba. Saiba tudo sobre financiamento, documentação, bairros e mais. Blog FYMOOB Imobiliária.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
          Blog FYMOOB
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-fymoob-gray-mid">
          Dicas, guias e informações sobre o mercado imobiliário em Curitiba
          para ajudar você a encontrar o imóvel ideal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
