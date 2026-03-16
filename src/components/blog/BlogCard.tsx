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
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-fymoob-blue/10 px-2.5 py-0.5 text-xs font-medium text-fymoob-blue"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight text-fymoob-gray-dark">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm text-fymoob-gray-mid">
          {post.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-fymoob-gray-mid">
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
