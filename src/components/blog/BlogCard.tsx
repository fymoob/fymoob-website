import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:border-brand-primary-muted hover:shadow-xl md:grid md:grid-cols-[1.2fr_1fr]"
      >
        <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[320px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center space-y-4 p-6 md:p-10">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold leading-tight text-neutral-950 transition-colors duration-200 group-hover:text-brand-primary md:text-2xl">
            {post.title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 md:text-base">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readingTime} min de leitura
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-muted hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-3 p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-semibold leading-tight text-neutral-950 transition-colors duration-200 group-hover:text-brand-primary">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {post.readingTime} min de leitura
          </span>
        </div>
      </div>
    </Link>
  )
}
