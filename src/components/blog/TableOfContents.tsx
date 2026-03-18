"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].indexOf(" ")
    const text = match[1].replace(/\*\*/g, "").replace(/[`*_~]/g, "")
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
    items.push({ id, text, level })
  }

  return items
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("")
  const headings = extractHeadings(content)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )

    const elements = document.querySelectorAll("h2[id], h3[id]")
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (headings.length < 3) return null

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-20">
        <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <List size={14} />
            Neste artigo
          </div>
          <ul className="mt-3 space-y-0.5 border-l-2 border-neutral-200">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className={`block border-l-2 -ml-0.5 py-1.5 text-[13px] leading-snug transition-colors duration-200 ${
                    heading.level === 3 ? "pl-5" : "pl-3"
                  } ${
                    activeId === heading.id
                      ? "border-brand-primary font-medium text-brand-primary"
                      : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
