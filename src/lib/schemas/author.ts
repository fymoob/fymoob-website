/**
 * Zod schemas — Author (catalogo editorial publico).
 *
 * Compartilhado entre admin (form input) e service (DB read).
 * Slug obrigatorio — gera URL /autor/[slug] e referencia em schema.org Person.
 */

import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Cargos aceitos. Mantenha sincronizado com ROLE_OPTIONS em
// src/app/admin/blog/autores/AuthorForm.tsx (select do form).
// "Sócio*" adicionados em 02/05/2026 — Bruno e Wagner sao socios da FYMOOB,
// nao corretores comuns; antes o update quebrava o listAuthors silencioso
// (schema rejeitava role fora do enum).
export const authorRoleEnum = z.enum([
  "Corretor de Imóveis",
  "Sócio",
  "Sócio e Responsável Técnico",
  "Diretor",
  "Editor",
  "Convidado",
  "Pesquisador",
])

export const socialLinksSchema = z
  .object({
    linkedin: z.string().url().optional(),
    instagram: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
  })
  .strict()
  .partial()

/**
 * URL ou path relativo (`/images/foo.jpg`). Aceita ambos pra acomodar:
 * - URLs do Supabase Storage CDN (`https://<ref>.supabase.co/storage/...`)
 * - Paths legados em `public/` (seed de Bruno/Wagner aponta pra `/images/team/`)
 */
const urlOrPath = z.union([
  z.string().url(),
  z.string().regex(/^\/[^\s]+/, "deve ser URL absoluta ou path /relativo"),
])

/**
 * ISO datetime com offset — Postgres timestamptz devolve `+00:00` em vez
 * de `Z`. `{ offset: true }` aceita ambos.
 */
const isoDatetime = z.string().datetime({ offset: true })

/**
 * Schema completo do autor — espelha tabela `public.authors`.
 * `bio_long` e BlockNote JSON (array de blocos); validado como unknown
 * pra nao acoplar Zod ao formato externo.
 */
export const authorSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(96)
    .regex(slugRegex, "slug deve ser kebab-case (a-z, 0-9, hifen)"),
  name: z.string().min(1).max(120),
  role: authorRoleEnum,
  creci: z.string().max(60).nullable().optional(),
  bio_short: z.string().max(500).nullable().optional(),
  bio_long: z.unknown().nullable().optional(),
  photo_url: urlOrPath.nullable().optional(),
  photo_alt: z.string().max(200).nullable().optional(),
  email: z.string().email().nullable().optional(),
  expertise: z.array(z.string().min(1).max(60)).max(15).default([]),
  social_links: socialLinksSchema.default({}),
  created_at: isoDatetime.optional(),
  updated_at: isoDatetime.optional(),
})

/** Versao "draft" — id ausente pra criar; tudo nullable virou opcional */
export const authorInputSchema = authorSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export type Author = z.infer<typeof authorSchema>
export type AuthorInput = z.infer<typeof authorInputSchema>
export type SocialLinks = z.infer<typeof socialLinksSchema>
