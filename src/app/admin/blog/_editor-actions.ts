"use server"

/**
 * Server actions consumidas pelo ArticleEditor.
 *
 * - `uploadInlineImageAction`: upload no bucket articles-inline pra imagens
 *   dentro do corpo do artigo.
 * - `searchPropertiesAction`: autocomplete do bloco Imovel destaque, le
 *   propriedades publicas do servico Loft existente.
 *
 * Convencao do prefixo `_`: pasta nao gera rota Next.js. Mantem actions
 * agrupadas em `/admin/blog/` sem expor URL publica.
 */

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { uploadImage, isUploadError } from "@/lib/supabase-storage"
import { getProperties } from "@/services/loft"
import type { Property } from "@/types/property"

async function requireAdmin() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/admin/login")
  }
}

// ───────────────────────────────────────────────────────────────────
// Inline image upload
// ───────────────────────────────────────────────────────────────────

export async function uploadInlineImageAction(
  file: File
): Promise<{ url: string } | { error: string }> {
  await requireAdmin()
  const result = await uploadImage("articles-inline", file)
  if (isUploadError(result)) return { error: result.error }
  return { url: result.url }
}

// ───────────────────────────────────────────────────────────────────
// Property search (Imovel destaque autocomplete)
// ───────────────────────────────────────────────────────────────────

export interface PropertySearchResult {
  codigo: string
  slug: string
  titulo: string
  bairro: string
  cidade: string
}

function matchesQuery(p: Property, query: string): boolean {
  const q = query.toLowerCase()
  return (
    p.codigo.toLowerCase().includes(q) ||
    p.titulo.toLowerCase().includes(q) ||
    (p.bairro?.toLowerCase().includes(q) ?? false) ||
    (p.cidade?.toLowerCase().includes(q) ?? false) ||
    (p.tipo?.toLowerCase().includes(q) ?? false)
  )
}

export async function searchPropertiesAction(
  query: string
): Promise<PropertySearchResult[]> {
  await requireAdmin()
  if (!query || query.trim().length < 2) return []

  // getProperties retorna paginado — pegamos a primeira pagina ampla
  // (catalogo total ~250 imoveis). Cache em memoria do servico Loft.
  const { properties } = await getProperties({ limit: 500 })
  const matched: Property[] = properties.filter((p) => matchesQuery(p, query))

  // Ranking simples: matches em codigo ou prefix do titulo primeiro.
  const q = query.toLowerCase()
  const ranked = matched.sort((a: Property, b: Property) => {
    const aCode = a.codigo.toLowerCase().startsWith(q) ? 0 : 1
    const bCode = b.codigo.toLowerCase().startsWith(q) ? 0 : 1
    if (aCode !== bCode) return aCode - bCode
    const aTitle = a.titulo.toLowerCase().startsWith(q) ? 0 : 1
    const bTitle = b.titulo.toLowerCase().startsWith(q) ? 0 : 1
    return aTitle - bTitle
  })

  return ranked.slice(0, 8).map((p: Property) => ({
    codigo: p.codigo,
    slug: p.slug,
    titulo: p.titulo,
    bairro: p.bairro ?? "",
    cidade: p.cidade ?? "",
  }))
}
