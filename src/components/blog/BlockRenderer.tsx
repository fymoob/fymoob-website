/**
 * BlockRenderer — server component que renderiza JSON do BlockNote.
 *
 * Substitui PortableTextRenderer (Sanity). Le diretamente o `body` salvo em
 * `articles.body` (JSONB) e mapeia cada bloco pra JSX. Mesmos componentes
 * usados em MDX/Sanity sao reaproveitados (MethodologyBox, CalloutBox, etc),
 * preservando typography e alt-text rules existentes.
 *
 * Tolerancia a schema: blocos com `type` desconhecido caem em fallback
 * silencioso (renderiza children/content cru) — futura extensao do editor
 * nao quebra o site mesmo se o renderer estiver desatualizado.
 */

import Image from "next/image"
import Link from "next/link"
import {
  CalloutBox,
  CTABox,
  Changelog,
  MethodologyBox,
} from "@/lib/mdx-components"
import type { BlockNoteBlock } from "@/lib/schemas/article"

// ───────────────────────────────────────────────────────────────────
// Inline content (BlockNote)
// ───────────────────────────────────────────────────────────────────

interface InlineText {
  type: "text"
  text: string
  styles?: {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strike?: boolean
    code?: boolean
  }
}

interface InlineLink {
  type: "link"
  content: InlineText[]
  href: string
}

type InlineContent = InlineText | InlineLink

function isInlineText(node: unknown): node is InlineText {
  return Boolean(node && typeof node === "object" && (node as { type?: string }).type === "text")
}
function isInlineLink(node: unknown): node is InlineLink {
  return Boolean(node && typeof node === "object" && (node as { type?: string }).type === "link")
}

function renderInline(content: unknown, keyPrefix: string): React.ReactNode {
  if (!Array.isArray(content)) return null
  return (content as InlineContent[]).map((node, i) => {
    const k = `${keyPrefix}-${i}`
    if (isInlineLink(node)) {
      const inner = renderInline(node.content, k)
      const isExternal = /^https?:\/\//.test(node.href) && !node.href.includes("fymoob.com")
      return (
        <Link
          key={k}
          href={node.href}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          className="font-medium text-brand-primary underline underline-offset-2 transition-colors duration-200 hover:text-brand-primary-hover"
        >
          {inner}
        </Link>
      )
    }
    if (isInlineText(node)) {
      let el: React.ReactNode = node.text
      const s = node.styles ?? {}
      if (s.code) el = <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-[0.9em] text-neutral-900">{el}</code>
      if (s.strike) el = <s>{el}</s>
      if (s.underline) el = <u>{el}</u>
      if (s.italic) el = <em>{el}</em>
      if (s.bold) el = <strong className="font-semibold text-neutral-950">{el}</strong>
      return <span key={k}>{el}</span>
    }
    return null
  })
}

// ───────────────────────────────────────────────────────────────────
// Custom block prop shapes (devem casar com schemas BlockNote no admin)
// ───────────────────────────────────────────────────────────────────

interface MethodologyProps {
  period?: string
  sample?: string
  sources?: string
  treatment?: string
  lastUpdate?: string
  nextReview?: string
}
interface CalloutProps {
  variant?: "info" | "warning" | "alert"
}
interface CTAProps {
  title?: string
  description?: string
  href?: string
  label?: string
}
interface ChangelogProps {
  entries?: string // JSON serializado: [{date,change}]
}
interface ImageBlockProps {
  url?: string
  caption?: string
  name?: string
  previewWidth?: number
}
interface ImovelDestaqueProps {
  codigo?: string
  fallbackTitle?: string
  fallbackUrl?: string
}
interface FaqItemProps {
  question?: string
  answer?: string
}

// ───────────────────────────────────────────────────────────────────
// Heading helper
// ───────────────────────────────────────────────────────────────────

function headingId(content: unknown): string {
  if (!Array.isArray(content)) return ""
  const text = (content as InlineContent[])
    .map((n) => {
      if (isInlineText(n)) return n.text
      if (isInlineLink(n)) {
        return Array.isArray(n.content)
          ? (n.content as InlineText[]).map((c) => c.text).join("")
          : ""
      }
      return ""
    })
    .join("")
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

// ───────────────────────────────────────────────────────────────────
// Block renderer
// ───────────────────────────────────────────────────────────────────

interface BlockRendererProps {
  blocks: BlockNoteBlock[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return <>{blocks.map((b, i) => renderBlock(b, `b-${i}`))}</>
}

function renderBlock(block: BlockNoteBlock, key: string): React.ReactNode {
  const { type, props = {}, content } = block

  switch (type) {
    case "paragraph": {
      const inner = renderInline(content, `${key}-p`)
      // Paragrafo vazio → preserva espaco vertical sem warning React
      const isEmpty =
        !Array.isArray(content) ||
        (content as InlineContent[]).every((n) => isInlineText(n) && !n.text)
      return (
        <p
          key={key}
          className="mb-4 text-base leading-relaxed text-neutral-700"
          data-block-id={block.id}
        >
          {isEmpty ? " " : inner}
        </p>
      )
    }

    case "heading": {
      const level = (props as { level?: number }).level ?? 2
      const inner = renderInline(content, `${key}-h`)
      const id = headingId(content)
      const baseClass =
        level === 2
          ? "mt-12 mb-4 font-display text-2xl font-bold tracking-tight text-neutral-950 scroll-mt-24"
          : level === 3
            ? "mt-8 mb-3 font-display text-xl font-semibold text-neutral-950 scroll-mt-24"
            : "mt-6 mb-2 font-display text-lg font-semibold text-neutral-950 scroll-mt-24"
      const HeadingTag = (`h${Math.min(Math.max(level, 2), 4)}` as "h2" | "h3" | "h4")
      return (
        <HeadingTag key={key} id={id} className={baseClass}>
          {inner}
        </HeadingTag>
      )
    }

    case "bulletListItem":
      // BlockNote serializa cada item como bloco separado; agrupamos em <ul>
      // com `data-bullet` pra CSS opcional. Pra um <ul> verdadeiro, ver agrup-
      // amento no walker abaixo (renderBlocks).
      return (
        <li
          key={key}
          className="mb-1.5 ml-6 list-disc leading-relaxed text-neutral-700"
        >
          {renderInline(content, `${key}-li`)}
        </li>
      )

    case "numberedListItem":
      return (
        <li
          key={key}
          className="mb-1.5 ml-6 list-decimal leading-relaxed text-neutral-700"
        >
          {renderInline(content, `${key}-oli`)}
        </li>
      )

    case "checkListItem": {
      const checked = (props as { checked?: boolean }).checked === true
      return (
        <div key={key} className="mb-1.5 flex items-start gap-2 text-neutral-700">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mt-1 size-4 rounded border-neutral-300 text-brand-primary"
            aria-label={checked ? "Item concluido" : "Item pendente"}
          />
          <span className="leading-relaxed">
            {renderInline(content, `${key}-check`)}
          </span>
        </div>
      )
    }

    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-brand-primary pl-4 italic text-neutral-600"
        >
          {renderInline(content, `${key}-q`)}
        </blockquote>
      )

    case "codeBlock": {
      const language = (props as { language?: string }).language ?? "text"
      const text = Array.isArray(content)
        ? (content as InlineText[]).map((n) => n.text).join("")
        : ""
      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-xl bg-neutral-950 p-4 text-sm text-neutral-100"
        >
          <code className={`language-${language}`}>{text}</code>
        </pre>
      )
    }

    case "image": {
      const p = props as ImageBlockProps
      if (!p.url) return null
      const caption = p.caption?.trim()
      return (
        <figure key={key} className="my-6">
          <Image
            src={p.url}
            alt={caption || p.name || "Ilustração do artigo"}
            width={p.previewWidth ?? 1200}
            height={Math.round(((p.previewWidth ?? 1200) * 9) / 16)}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full rounded-xl"
            unoptimized={!p.url.includes("/_next/")}
          />
          {caption && (
            <figcaption className="mt-2 text-center text-sm italic text-neutral-500">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case "table":
      return renderTable(block, key)

    case "methodologyBox": {
      const p = props as MethodologyProps
      return (
        <MethodologyBox
          key={key}
          period={p.period}
          sample={p.sample}
          treatment={p.treatment}
          sources={p.sources}
          lastUpdate={p.lastUpdate}
          nextReview={p.nextReview}
        />
      )
    }

    case "calloutBox": {
      const p = props as CalloutProps
      return (
        <CalloutBox key={key} variant={p.variant ?? "info"}>
          {renderInline(content, `${key}-callout`)}
        </CalloutBox>
      )
    }

    case "ctaBox": {
      const p = props as CTAProps
      if (!p.title || !p.description || !p.href || !p.label) return null
      return (
        <CTABox
          key={key}
          title={p.title}
          description={p.description}
          href={p.href}
          label={p.label}
        />
      )
    }

    case "changelog": {
      const p = props as ChangelogProps
      let entries: { date: string; change: string }[] = []
      if (p.entries) {
        try {
          const parsed = JSON.parse(p.entries)
          if (Array.isArray(parsed)) entries = parsed
        } catch {
          entries = []
        }
      }
      return <Changelog key={key} entries={entries} />
    }

    case "imovelDestaque": {
      const p = props as ImovelDestaqueProps
      // Render minimo (server-only). O autocomplete + card rico vivem no
      // editor (Fase 18.D); aqui mostramos card simples linkado.
      const title = p.fallbackTitle || `Imóvel ${p.codigo ?? ""}`.trim()
      const url = p.fallbackUrl || (p.codigo ? `/imovel/${p.codigo}` : null)
      if (!url) return null
      return (
        <div
          key={key}
          className="my-6 rounded-xl border border-brand-primary-muted bg-brand-primary-light p-5"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Imóvel em destaque
          </p>
          <Link
            href={url}
            className="font-display text-lg font-semibold text-neutral-950 hover:text-brand-primary"
          >
            {title}
          </Link>
        </div>
      )
    }

    case "faqItem": {
      const p = props as FaqItemProps
      if (!p.question || !p.answer) return null
      return (
        <details
          key={key}
          className="my-3 rounded-xl border border-neutral-200 bg-white p-4 [&[open]>summary]:mb-2"
        >
          <summary className="cursor-pointer text-base font-semibold text-neutral-900">
            {p.question}
          </summary>
          <p className="text-sm leading-relaxed text-neutral-700">{p.answer}</p>
        </details>
      )
    }

    default:
      // Bloco desconhecido — fallback silencioso renderizando inline content
      // se tiver. Garante que extensoes futuras nao quebrem render legado.
      if (Array.isArray(content)) {
        return (
          <p
            key={key}
            className="mb-4 text-base leading-relaxed text-neutral-700"
          >
            {renderInline(content, `${key}-fallback`)}
          </p>
        )
      }
      return null
  }
}

// ───────────────────────────────────────────────────────────────────
// Tabela — BlockNote tem 2 shapes:
//   Legado: rows[i].cells = InlineContent[][]            (cell = array direto)
//   Atual:  rows[i].cells[j] = { type:"tableCell", props:{textAlignment,...},
//                                content: InlineContent[] }
// Detectado 02/05/2026: tabelas vinham vazias no /blog porque o renderer so
// suportava o legado. Suporta ambos pra resilencia.
// ───────────────────────────────────────────────────────────────────

interface TableCellWrapped {
  type: "tableCell"
  props?: {
    colspan?: number
    rowspan?: number
    textAlignment?: "left" | "center" | "right"
  }
  content: InlineContent[]
}

type TableCell = InlineContent[] | TableCellWrapped

interface TableContent {
  type: "tableContent"
  rows: Array<{ cells: TableCell[] }>
}

function isCellWrapped(cell: unknown): cell is TableCellWrapped {
  return Boolean(
    cell &&
      typeof cell === "object" &&
      !Array.isArray(cell) &&
      (cell as { type?: string }).type === "tableCell" &&
      Array.isArray((cell as { content?: unknown }).content)
  )
}

function getCellInline(cell: TableCell): InlineContent[] {
  if (Array.isArray(cell)) return cell
  if (isCellWrapped(cell)) return cell.content
  return []
}

function getCellAlignClass(cell: TableCell): string {
  if (!isCellWrapped(cell)) return ""
  const a = cell.props?.textAlignment
  if (a === "center") return "text-center"
  if (a === "right") return "text-right"
  return ""
}

function renderTable(block: BlockNoteBlock, key: string) {
  const tc = block.content as TableContent | undefined
  if (!tc || !Array.isArray(tc.rows) || tc.rows.length === 0) return null
  const [headerRow, ...bodyRows] = tc.rows
  return (
    <div
      key={key}
      className="my-6 overflow-x-auto rounded-xl border border-neutral-200"
    >
      <table className="w-full border-collapse text-sm text-neutral-700">
        <thead>
          <tr>
            {headerRow.cells.map((cell, ci) => {
              const align = getCellAlignClass(cell)
              return (
                <th
                  key={`${key}-th-${ci}`}
                  className={`border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${align || "text-left"}`}
                >
                  {renderInline(getCellInline(cell), `${key}-th-${ci}`)}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr
              key={`${key}-tr-${ri}`}
              className="transition-colors hover:bg-neutral-50/50"
            >
              {row.cells.map((cell, ci) => {
                const align = getCellAlignClass(cell)
                return (
                  <td
                    key={`${key}-td-${ri}-${ci}`}
                    className={`border-b border-neutral-100 px-4 py-3 ${align}`}
                  >
                    {renderInline(getCellInline(cell), `${key}-td-${ri}-${ci}`)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Helper: extrai apenas headings (h2/h3/h4) como "markdown pseudo" pro
 * TableOfContents (que ja consome formato `^(#{2,4})\s+text`).
 */
export function blocksToHeadingsMarkdown(blocks: BlockNoteBlock[]): string {
  return blocks
    .filter((b) => b.type === "heading")
    .map((b) => {
      const level = Math.min(Math.max((b.props as { level?: number })?.level ?? 2, 2), 4)
      const text = Array.isArray(b.content)
        ? (b.content as InlineContent[])
            .map((n) => {
              if (isInlineText(n)) return n.text
              if (isInlineLink(n)) {
                return Array.isArray(n.content)
                  ? (n.content as InlineText[]).map((c) => c.text).join("")
                  : ""
              }
              return ""
            })
            .join("")
        : ""
      return `${"#".repeat(level)} ${text}`
    })
    .join("\n\n")
}

/**
 * Conta palavras no body inteiro — usado pra calcular reading_time / SEO Score.
 */
export function blocksWordCount(blocks: BlockNoteBlock[]): number {
  let total = 0
  const walk = (b: BlockNoteBlock) => {
    if (Array.isArray(b.content)) {
      for (const node of b.content as InlineContent[]) {
        if (isInlineText(node)) total += node.text.trim().split(/\s+/).filter(Boolean).length
        if (isInlineLink(node) && Array.isArray(node.content)) {
          for (const inner of node.content) {
            if (isInlineText(inner)) total += inner.text.trim().split(/\s+/).filter(Boolean).length
          }
        }
      }
    }
    if (Array.isArray(b.children)) b.children.forEach(walk)
  }
  blocks.forEach(walk)
  return total
}

/**
 * Conta links internos (href que comeca com `/` ou inclui fymoob.com).
 * Usado pelo SEO Score.
 */
export function countInternalLinks(blocks: BlockNoteBlock[]): number {
  let total = 0
  const walk = (b: BlockNoteBlock) => {
    if (Array.isArray(b.content)) {
      for (const node of b.content as InlineContent[]) {
        if (isInlineLink(node)) {
          if (node.href.startsWith("/") || node.href.includes("fymoob.com")) total++
        }
      }
    }
    if (Array.isArray(b.children)) b.children.forEach(walk)
  }
  blocks.forEach(walk)
  return total
}

/**
 * Coleta todos os pares {question,answer} de blocos faqItem para gerar
 * schema FAQPage automaticamente em /blog/[slug].
 */
export function collectFaqItems(
  blocks: BlockNoteBlock[]
): Array<{ question: string; answer: string }> {
  const items: Array<{ question: string; answer: string }> = []
  const walk = (b: BlockNoteBlock) => {
    if (b.type === "faqItem") {
      const p = (b.props ?? {}) as FaqItemProps
      if (p.question && p.answer) items.push({ question: p.question, answer: p.answer })
    }
    if (Array.isArray(b.children)) b.children.forEach(walk)
  }
  blocks.forEach(walk)
  return items
}
