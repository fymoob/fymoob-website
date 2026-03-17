import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar } from "lucide-react"
import type { BlogPost } from "@/types/blog"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

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
              className="rounded-full bg-brand-primary-light px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-primary"
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

        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readingTime} min de leitura
          </span>
        </div>
      </div>
    </Link>
  )
}
