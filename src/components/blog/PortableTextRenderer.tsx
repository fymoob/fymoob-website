/**
 * PortableTextRenderer — renderiza Portable Text do Sanity com mapeamento
 * 1:1 pros componentes existentes (zero mudança visual vs MDX).
 *
 * Mapeamento:
 * - blocks normais (parágrafo, h2/h3/h4, blockquote, listas) → HTML estilizado
 * - marks (strong, em, code, link) → tags HTML
 * - image (com hotspot) → next/image otimizado
 * - table (rows markdown) → <table> com classes
 * - faqItem → <details>/<summary> nativo
 * - methodologyBox / calloutBox / ctaBox / changelog → componentes em src/lib/mdx-components.tsx
 */

import type {
  PortableTextBlock,
  PortableTextComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

import {
  CalloutBox,
  CTABox,
  Changelog,
  MethodologyBox,
} from "@/lib/mdx-components"
import { urlForImage } from "@/sanity/lib/image"

// ───────────────────────────────────────────────────────────
// Tipos dos custom blocks (espelham schemas em sanity/schemas/blocks/)
// ───────────────────────────────────────────────────────────

interface SanityImageRef {
  _type?: string
  asset?: { _ref?: string }
  alt?: string
  caption?: string
}

interface MethodologyBoxValue {
  period?: string
  sources?: string[]
  sample?: string
  lastUpdate?: string
  nextReview?: string
}

interface CalloutBoxValue {
  variant?: "default" | "info" | "warning" | "success"
  content?: PortableTextBlock[]
}

interface CTABoxValue {
  title: string
  description: string
  label: string
  href: string
}

interface ChangelogValue {
  entries: Array<{ date: string; change: string }>
}

interface TableValue {
  rows?: string
}

interface FaqItemValue {
  question: string
  answer: string
}

interface LinkMarkValue {
  href?: string
  blank?: boolean
}

// ───────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────

function parseMarkdownTable(markdown: string): { headers: string[]; rows: string[][] } {
  const lines = markdown
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length < 2) return { headers: [], rows: [] }

  const parseRow = (line: string) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())

  const headers = parseRow(lines[0])
  // segunda linha é separador (---)
  const rows = lines.slice(2).map(parseRow)
  return { headers, rows }
}

// ───────────────────────────────────────────────────────────
// Components map (eq. mdxComponents)
// ───────────────────────────────────────────────────────────

const components: PortableTextComponents = {
  // ── Blocks (estilos) ─────────────────────────────────────
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-neutral-700">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-2xl font-bold tracking-tight text-neutral-950">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 font-display text-xl font-semibold text-neutral-950">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 font-display text-lg font-semibold text-neutral-950">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-primary pl-4 italic text-neutral-600">
        {children}
      </blockquote>
    ),
  },

  // ── Lists ────────────────────────────────────────────────
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1.5 pl-6 text-neutral-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1.5 pl-6 text-neutral-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },

  // ── Marks (inline) ───────────────────────────────────────
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-950">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800">
        {children}
      </code>
    ),
    underline: ({ children }) => <u>{children}</u>,
    link: ({
      children,
      value,
    }: PortableTextMarkComponentProps<LinkMarkValue & { _type: "link" }>) => {
      const href = value?.href || "#"
      const isExternal = href.startsWith("http")
      const blank = value?.blank ?? isExternal

      const className =
        "font-medium text-brand-primary underline underline-offset-2 transition-colors duration-200 hover:text-brand-primary-hover"

      if (isExternal) {
        return (
          <a
            href={href}
            target={blank ? "_blank" : undefined}
            rel={blank ? "noopener noreferrer" : undefined}
            className={className}
          >
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      )
    },
  },

  // ── Custom types ─────────────────────────────────────────
  types: {
    image: ({ value }: { value: SanityImageRef }) => {
      if (!value?.asset?._ref) return null
      const builder = urlForImage(value)
      const src = builder?.width(1200).quality(85).url()
      if (!src) return null
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt || "Ilustração do artigo"}
            width={1200}
            height={675}
            className="rounded-xl"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm italic text-neutral-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    table: ({ value }: { value: TableValue }) => {
      if (!value?.rows) return null
      const { headers, rows } = parseMarkdownTable(value.rows)
      if (headers.length === 0) return null
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full border-collapse text-sm text-neutral-700">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr
                  key={ri}
                  className="transition-colors hover:bg-neutral-50/50"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-neutral-100 px-4 py-3"
                      dangerouslySetInnerHTML={{
                        __html: cell
                          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                          .replace(/\*(.+?)\*/g, "<em>$1</em>"),
                      }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },

    faqItem: ({ value }: { value: FaqItemValue }) => (
      <details className="my-3 rounded-xl border border-neutral-200 bg-white p-4 group">
        <summary className="cursor-pointer font-display text-base font-semibold text-neutral-900 group-open:mb-3">
          {value.question}
        </summary>
        <div className="text-base leading-relaxed text-neutral-700">
          {value.answer}
        </div>
      </details>
    ),

    methodologyBox: ({ value }: { value: MethodologyBoxValue }) => (
      <MethodologyBox
        period={value.period}
        sources={value.sources}
        sample={value.sample}
        lastUpdate={value.lastUpdate}
        nextReview={value.nextReview}
      />
    ),

    calloutBox: ({ value }: { value: CalloutBoxValue }) => {
      // CalloutBox legacy aceita "info" | "alert" | "warning"
      // Sanity define "default" | "info" | "warning" | "success"
      // Map: default → info, success → info, warning → warning
      const variant: "info" | "alert" | "warning" =
        value.variant === "warning" ? "warning" : "info"

      return (
        <CalloutBox variant={variant}>
          <PortableText value={value.content || []} components={components} />
        </CalloutBox>
      )
    },

    ctaBox: ({ value }: { value: CTABoxValue }) => (
      <CTABox
        title={value.title}
        description={value.description}
        label={value.label}
        href={value.href}
      />
    ),

    changelog: ({ value }: { value: ChangelogValue }) => (
      <Changelog entries={value.entries} />
    ),
  },
}

// ───────────────────────────────────────────────────────────
// Componente principal
// ───────────────────────────────────────────────────────────

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}
