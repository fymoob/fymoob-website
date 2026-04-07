"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyDescriptionProps {
  descricao: string
}

// Detect lines that act as section headers inside the description
const LIST_HEADERS_PATTERNS = [
  /^o\s+(apartamento|imóvel|imovel|sobrado|casa|terreno)\s+(possui|conta|oferece|dispõe)/i,
  /^(o\s+)?condomínio\s+(oferece|possui|conta)/i,
  /^diferenciais/i,
  /^características/i,
  /^caracteristicas/i,
  /^infraestrutura/i,
  /^lazer/i,
  /^o\s+imóvel\s+conta\s+com/i,
  /^com\s+\d+.*m[²2].*conta\s+com/i,
  /^unidade\s+disponível/i,
]

function isListHeader(line: string): boolean {
  const trimmed = line.trim()
  return LIST_HEADERS_PATTERNS.some((p) => p.test(trimmed))
}

function isListItem(line: string): boolean {
  const trimmed = line.trim()
  return /^[-–•·✓✅]\s/.test(trimmed)
}

function cleanListItem(line: string): string {
  return line.trim().replace(/^[-–•·✓✅]\s*/, "").replace(/[;,.]$/, "")
}

interface DescriptionBlock {
  type: "paragraph" | "header" | "list"
  content: string       // for paragraph/header
  items?: string[]      // for list
}

function parseIntoBlocks(descricao: string): DescriptionBlock[] {
  const lines = descricao.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const blocks: DescriptionBlock[] = []
  let currentList: string[] = []

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: "list", content: "", items: [...currentList] })
      currentList = []
    }
  }

  for (const line of lines) {
    if (isListItem(line)) {
      const cleaned = cleanListItem(line)
      if (cleaned) currentList.push(cleaned)
    } else if (isListHeader(line)) {
      flushList()
      blocks.push({ type: "header", content: line })
    } else {
      flushList()
      blocks.push({ type: "paragraph", content: line })
    }
  }
  flushList()

  return blocks
}

// Simple preview: first 2-3 narrative paragraphs (no lists/headers)
function getPreviewBlocks(blocks: DescriptionBlock[]): DescriptionBlock[] {
  return blocks.filter((b) => b.type === "paragraph").slice(0, 3)
}

export function PropertyDescription({ descricao }: PropertyDescriptionProps) {
  const [expanded, setExpanded] = React.useState(false)

  if (!descricao) return null

  const blocks = parseIntoBlocks(descricao)
  if (blocks.length === 0) return null

  const previewBlocks = getPreviewBlocks(blocks)
  const fullText = blocks.map((b) => b.content || b.items?.join(" ") || "").join(" ")
  const needsTruncation = fullText.length > 300 || blocks.length > 3

  const displayBlocks = expanded ? blocks : previewBlocks

  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
        Sobre este imóvel
      </h2>

      <div className="mt-5">
        {displayBlocks.map((block, i) => {
          if (block.type === "header") {
            return (
              <h3
                key={i}
                className="mt-8 mb-4 text-base font-medium text-slate-900 first:mt-0"
              >
                {block.content}
              </h3>
            )
          }

          if (block.type === "list" && block.items) {
            return (
              <ul key={i} className="my-5 space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-base leading-relaxed text-slate-700 md:text-lg">
                    <span className="mt-2.5 block size-1.5 shrink-0 rounded-full bg-brand-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            )
          }

          // paragraph
          return (
            <p
              key={i}
              className={cn(
                "text-base leading-[1.8] text-slate-700 md:text-lg md:leading-[1.8]",
                i > 0 && "mt-5"
              )}
            >
              {block.content}
            </p>
          )
        })}
      </div>

      {needsTruncation && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
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
    </section>
  )
}
