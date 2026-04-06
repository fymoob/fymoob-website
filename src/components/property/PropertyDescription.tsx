"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface PropertyDescriptionProps {
  descricao: string
}

const LIST_HEADERS = [
  "o apartamento possui",
  "o apartamento conta",
  "o imóvel possui",
  "o imovel possui",
  "o sobrado possui",
  "a casa possui",
  "o condomínio oferece",
  "o condominio oferece",
  "diferenciais",
  "características",
  "caracteristicas",
]

function isListHeader(line: string): boolean {
  const lower = line.toLowerCase().trim()
  return LIST_HEADERS.some((h) => lower.startsWith(h))
}

function parseDescription(descricao: string): string[] {
  const lines = descricao.split(/\r?\n/)
  const paragraphs: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    // Skip lines that are list headers or list items (start with bullet-like patterns)
    if (isListHeader(trimmed)) continue
    if (/^[-–•·✓✅]\s/.test(trimmed)) continue
    // Skip short list-like items (e.g. " 1 quarto", " Sala aconchegante")
    if (trimmed.length < 40 && /^\d+\s/.test(trimmed)) continue
    // Skip "Sem vaga" type items
    if (/^sem\s/i.test(trimmed)) continue
    // Keep actual narrative paragraphs
    paragraphs.push(trimmed)
  }

  return paragraphs
}

function splitParagraphs(descricao: string): string[] {
  return descricao.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
}

export function PropertyDescription({ descricao }: PropertyDescriptionProps) {
  const [expanded, setExpanded] = React.useState(false)

  if (!descricao) return null

  const filteredParagraphs = parseDescription(descricao)
  const allParagraphs = splitParagraphs(descricao)

  if (allParagraphs.length === 0) return null

  // Use full text length for truncation check
  const fullText = allParagraphs.join(" ")
  const needsTruncation = fullText.length > 320

  // Collapsed: clean narrative preview. Expanded: full CRM content
  const displayParagraphs = expanded ? allParagraphs : (filteredParagraphs.length > 0 ? filteredParagraphs : allParagraphs)

  return (
    <section className="border-t border-neutral-100 pt-10">
      <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
        Sobre este imóvel
      </h2>
      <div className="relative mt-4">
        <div
          className={
            !expanded && needsTruncation
              ? "line-clamp-4 text-sm leading-relaxed text-neutral-600"
              : "text-sm leading-relaxed text-neutral-600"
          }
        >
          {displayParagraphs.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {p}
            </p>
          ))}
        </div>
        {needsTruncation && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
          >
            {expanded ? (
              <>
                Mostrar menos
                <ChevronUp className="size-4" />
              </>
            ) : (
              <>
                Mostrar mais
                <ChevronDown className="size-4" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  )
}
