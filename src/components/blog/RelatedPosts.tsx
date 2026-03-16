import type { BlogPost } from "@/types/blog"
import { BlogCard } from "@/components/blog/BlogCard"

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 border-t border-fymoob-gray-light pt-12">
      <h2 className="font-display text-2xl font-bold text-fymoob-gray-dark">
        Artigos relacionados
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}
