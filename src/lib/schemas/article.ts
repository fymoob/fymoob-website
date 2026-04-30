/**
 * Zod schemas — Article + BlockNote document (storage).
 *
 * `body` e um array de blocos BlockNote. Validamos a forma minima (cada
 * bloco tem `id`, `type`, `props`, `content`, `children`); tipos especificos
 * dos blocos custom (methodology/callout/cta/changelog/imovel-destaque) sao
 * narrow-checked no renderer, nao aqui — o storage permanece tolerante a
 * extensoes futuras de schema sem migracao.
 */

import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const articleStatusEnum = z.enum([
  "draft",
  "scheduled",
  "published",
  "archived",
])

export const articleSchemaTypeEnum = z.enum([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "HowTo",
])

/**
 * Bloco BlockNote generico — recursivo (children). Mantem extensibilidade.
 * Todos os blocos serializam `id`, `type` e `content` por padrao no editor.
 */
export const blockNoteBlockSchema: z.ZodType<BlockNoteBlock> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.string(), z.unknown()).optional(),
    content: z.unknown().optional(),
    children: z.array(blockNoteBlockSchema).optional(),
  })
)

export interface BlockNoteBlock {
  id: string
  type: string
  props?: Record<string, unknown>
  content?: unknown
  children?: BlockNoteBlock[]
}

export const articleBodySchema = z.array(blockNoteBlockSchema)

export const methodologyObjectSchema = z
  .object({
    period: z.string().optional(),
    sample: z.string().optional(),
    sources: z.array(z.string()).optional(),
    lastUpdate: z.string().optional(),
    nextReview: z.string().optional(),
  })
  .partial()

/** Schema completo (le do DB) */
// URL absoluta OU path relativo (`/blog/foo.webp`) — aceita os dois pra
// nao quebrar com seeds/legados que usam paths de `public/`.
const urlOrPath = z.union([
  z.string().url(),
  z.string().regex(/^\/[^\s]+/, "deve ser URL absoluta ou path /relativo"),
])

// ISO datetime com offset — Postgres timestamptz devolve `+00:00` em vez de `Z`.
const isoDatetime = z.string().datetime({ offset: true })

export const articleSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(96).regex(slugRegex),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(170),
  body: articleBodySchema,

  cover_image_url: urlOrPath.nullable().optional(),
  cover_image_alt: z.string().max(200).nullable().optional(),

  status: articleStatusEnum,
  published_at: isoDatetime.nullable().optional(),
  scheduled_at: isoDatetime.nullable().optional(),

  author_id: z.string().uuid().nullable().optional(),
  tags: z.array(z.string()).max(15).default([]),
  schema_type: articleSchemaTypeEnum.default("BlogPosting"),

  reading_time_min: z.number().int().nullable().optional(),
  word_count: z.number().int().nullable().optional(),

  reviewed_by: z.string().nullable().optional(),
  next_review: z.string().nullable().optional(), // date — Postgres devolve YYYY-MM-DD
  methodology: methodologyObjectSchema.nullable().optional(),

  seo_meta_title: z.string().max(70).nullable().optional(),
  seo_meta_description: z.string().max(170).nullable().optional(),
  seo_canonical: z.string().url().nullable().optional(),
  seo_no_index: z.boolean().default(false),
  seo_og_image_url: urlOrPath.nullable().optional(),

  created_by: z.string().uuid().nullable().optional(),
  created_at: isoDatetime,
  updated_at: isoDatetime,
})

/** Schema de entrada do admin pra criar/atualizar (id e timestamps geram no DB) */
export const articleInputSchema = articleSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    word_count: true,    // calculado server-side a partir do body
    reading_time_min: true,
  })
  .partial({
    status: true,
    schema_type: true,
    seo_no_index: true,
    tags: true,
    body: true,
  })

/**
 * Regras de qualidade pra publicacao (SEO Score gate da Fase 18.E).
 * `block` impede publicacao; `warn` mostra alerta amarelo no editor.
 */
export const seoBlockRules = {
  titleMin: 30,
  titleMax: 60,
  descriptionMin: 120,
  descriptionMax: 165,
  wordCountHardMin: 300,
  wordCountSoftMin: 800,
  internalLinksHardMin: 0,
  internalLinksSoftMin: 2,
  tagsMin: 3,
  tagsMax: 7,
} as const

export type Article = z.infer<typeof articleSchema>
export type ArticleInput = z.infer<typeof articleInputSchema>
export type ArticleStatus = z.infer<typeof articleStatusEnum>
export type ArticleSchemaType = z.infer<typeof articleSchemaTypeEnum>
export type MethodologyObject = z.infer<typeof methodologyObjectSchema>
