import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { generateBreadcrumbSchema } from "@/lib/seo"

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema = generateBreadcrumbSchema(items)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.url} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight size={14} className="shrink-0 text-neutral-400" />
                )}
                {isLast ? (
                  <span className="font-medium text-neutral-950">{item.name}</span>
                ) : (
                  <Link
                    href={item.url}
                    className="transition-colors duration-200 hover:text-brand-primary"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
