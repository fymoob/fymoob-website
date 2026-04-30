/**
 * SEO Score calculator — gate de publicacao da Fase 18.E.
 *
 * Soma "checks" sobre os campos do artigo + body BlockNote. Cada check tem
 * severidade `block` (impede publicacao) ou `warn` (alerta amarelo, nao bloqueia).
 *
 * Usado em 2 lugares:
 * - UI: painel "SEO Score" no editor (lista todos os checks com cor)
 * - Server action `publish`: valida `passes()` antes de mudar status
 *
 * NAO substitui validacao Zod do schema (formato/tipos). Foca em qualidade
 * editorial: comprimento, completude, links internos, autoria.
 */

import {
  blocksWordCount,
  countInternalLinks,
} from "@/components/blog/BlockRenderer"
import type { BlockNoteBlock } from "@/lib/schemas/article"
import { seoBlockRules } from "@/lib/schemas/article"

export interface SeoCheck {
  id: string
  label: string
  severity: "block" | "warn" | "ok"
  message: string
  hint?: string
}

interface ArticleSeoInput {
  title: string
  description: string
  body: BlockNoteBlock[]
  cover_image_url: string | null | undefined
  cover_image_alt: string | null | undefined
  author_id: string | null | undefined
  tags: string[]
  slug: string
}

/**
 * Roda todos os checks. Sempre retorna lista completa — UI renderiza tudo
 * (mostra OKs em verde) pra dar sinal de progresso.
 */
export function runSeoChecks(article: ArticleSeoInput): SeoCheck[] {
  const wordCount = blocksWordCount(article.body)
  const internalLinks = countInternalLinks(article.body)
  const h2Count = article.body.filter(
    (b) => b.type === "heading" && (b.props as { level?: number })?.level === 2
  ).length

  const checks: SeoCheck[] = []

  // ────────── Title ──────────
  if (article.title.length === 0) {
    checks.push({
      id: "title-required",
      label: "Título",
      severity: "block",
      message: "Título é obrigatório.",
    })
  } else if (article.title.length < seoBlockRules.titleMin) {
    checks.push({
      id: "title-short",
      label: "Título",
      severity: "warn",
      message: `Curto demais (${article.title.length} chars). Ideal: 30-55.`,
      hint: "Títulos curtos perdem oportunidade de captar long-tail. Adicione modificador (ano, lugar, número).",
    })
  } else if (article.title.length > seoBlockRules.titleMax) {
    checks.push({
      id: "title-long",
      label: "Título",
      severity: "warn",
      message: `Longo (${article.title.length} chars). Google corta acima de 60.`,
      hint: "Mover info menos crítica pra description ou subtítulo.",
    })
  } else {
    checks.push({
      id: "title-ok",
      label: "Título",
      severity: "ok",
      message: `${article.title.length} chars (ideal).`,
    })
  }

  // ────────── Description ──────────
  if (article.description.length === 0) {
    checks.push({
      id: "desc-required",
      label: "Descrição",
      severity: "block",
      message: "Descrição é obrigatória.",
    })
  } else if (article.description.length < seoBlockRules.descriptionMin) {
    checks.push({
      id: "desc-short",
      label: "Descrição",
      severity: "warn",
      message: `Curta (${article.description.length} chars). Ideal: 120-160.`,
      hint: "Description curta gera CTR menor. Adicione benefício/promessa.",
    })
  } else if (article.description.length > seoBlockRules.descriptionMax) {
    checks.push({
      id: "desc-long",
      label: "Descrição",
      severity: "warn",
      message: `Longa (${article.description.length} chars). Google corta acima de 165.`,
    })
  } else {
    checks.push({
      id: "desc-ok",
      label: "Descrição",
      severity: "ok",
      message: `${article.description.length} chars (ideal).`,
    })
  }

  // ────────── Cover image ──────────
  if (!article.cover_image_url) {
    checks.push({
      id: "cover-required",
      label: "Imagem de capa",
      severity: "block",
      message: "Imagem de capa é obrigatória.",
      hint: "Aparece no card OG, Google Discover e schema.org Article.image.",
    })
  } else if (!article.cover_image_alt || article.cover_image_alt.length < 5) {
    checks.push({
      id: "cover-alt",
      label: "Alt da capa",
      severity: "block",
      message: "Texto alternativo da capa é obrigatório.",
      hint: "Acessibilidade + SEO de imagem. Ex: 'Vista do Batel, Curitiba'.",
    })
  } else {
    checks.push({
      id: "cover-ok",
      label: "Imagem de capa",
      severity: "ok",
      message: "OK com alt.",
    })
  }

  // ────────── Author ──────────
  if (!article.author_id) {
    checks.push({
      id: "author-required",
      label: "Autor",
      severity: "block",
      message: "Selecione um autor.",
      hint: "E-E-A-T: schema Person/RealEstateAgent precisa de autor identificado.",
    })
  } else {
    checks.push({ id: "author-ok", label: "Autor", severity: "ok", message: "Selecionado." })
  }

  // ────────── Tags ──────────
  if (article.tags.length < seoBlockRules.tagsMin) {
    checks.push({
      id: "tags-min",
      label: "Tags",
      severity: "warn",
      message: `${article.tags.length} tag(s). Ideal: 3-7.`,
      hint: "Tags alimentam articleSection + keywords no schema, e powered links internos automáticos.",
    })
  } else if (article.tags.length > seoBlockRules.tagsMax) {
    checks.push({
      id: "tags-max",
      label: "Tags",
      severity: "warn",
      message: `${article.tags.length} tags (muitas). Ideal: 3-7.`,
    })
  } else {
    checks.push({
      id: "tags-ok",
      label: "Tags",
      severity: "ok",
      message: `${article.tags.length} tag(s).`,
    })
  }

  // ────────── Slug ──────────
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
    checks.push({
      id: "slug-format",
      label: "Slug",
      severity: "block",
      message: "Slug inválido (kebab-case sem acentos).",
    })
  } else {
    checks.push({ id: "slug-ok", label: "Slug", severity: "ok", message: "Formato válido." })
  }

  // ────────── Word count ──────────
  if (wordCount < seoBlockRules.wordCountHardMin) {
    checks.push({
      id: "wordcount-block",
      label: "Tamanho",
      severity: "block",
      message: `${wordCount} palavras. Mínimo: ${seoBlockRules.wordCountHardMin}.`,
      hint: "Conteudo abaixo de 300 palavras geralmente nao ranqueia.",
    })
  } else if (wordCount < seoBlockRules.wordCountSoftMin) {
    checks.push({
      id: "wordcount-warn",
      label: "Tamanho",
      severity: "warn",
      message: `${wordCount} palavras. Ideal: 800+.`,
      hint: "Posts extensos ranqueiam melhor pra long-tail.",
    })
  } else {
    checks.push({
      id: "wordcount-ok",
      label: "Tamanho",
      severity: "ok",
      message: `${wordCount} palavras.`,
    })
  }

  // ────────── H2 headings ──────────
  if (h2Count === 0) {
    checks.push({
      id: "h2-required",
      label: "Estrutura (H2)",
      severity: "warn",
      message: "Nenhum H2. Use headings pra estruturar leitura.",
      hint: "Posts sem H2 sao mais difíceis de escanear. ToC fica vazio.",
    })
  } else {
    checks.push({
      id: "h2-ok",
      label: "Estrutura (H2)",
      severity: "ok",
      message: `${h2Count} H2(s).`,
    })
  }

  // ────────── Internal links ──────────
  if (internalLinks < seoBlockRules.internalLinksSoftMin) {
    checks.push({
      id: "internal-links",
      label: "Links internos",
      severity: "warn",
      message: `${internalLinks} link(s) interno(s). Ideal: 2+.`,
      hint: "Linka pillar pages, bairros, FAQ — distribui PageRank interno.",
    })
  } else {
    checks.push({
      id: "internal-links-ok",
      label: "Links internos",
      severity: "ok",
      message: `${internalLinks} link(s) interno(s).`,
    })
  }

  return checks
}

/**
 * True quando nenhum check tem severidade `block`. Usado por `publishArticle`.
 */
export function passesPublishGate(checks: SeoCheck[]): boolean {
  return !checks.some((c) => c.severity === "block")
}

/**
 * Score 0-100. Cada check `ok` adiciona 100/N, `warn` adiciona 50/N, `block` 0.
 * Util pra resumo visual sem ler todos os items.
 */
export function scoreFromChecks(checks: SeoCheck[]): number {
  if (checks.length === 0) return 0
  const total = checks.reduce((sum, c) => {
    if (c.severity === "ok") return sum + 100
    if (c.severity === "warn") return sum + 50
    return sum
  }, 0)
  return Math.round(total / checks.length)
}
