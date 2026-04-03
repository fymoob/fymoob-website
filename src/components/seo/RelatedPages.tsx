import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface RelatedLink {
  href: string
  label: string
}

interface RelatedPagesProps {
  title?: string
  links: RelatedLink[]
}

export function RelatedPages({ title = "Veja tambem", links }: RelatedPagesProps) {
  if (links.length === 0) return null

  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-bold text-neutral-900">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 transition hover:border-brand-primary/30 hover:text-brand-primary"
          >
            {link.label}
            <ChevronRight className="size-3.5 text-neutral-400" />
          </Link>
        ))}
      </div>
    </section>
  )
}
