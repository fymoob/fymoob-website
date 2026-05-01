/**
 * Cron — publica artigos agendados (status=scheduled, scheduled_at<=now()).
 *
 * Roda diariamente as 06:00 UTC (configurado em `vercel.json`). Vercel adiciona
 * header `Authorization: Bearer ${CRON_SECRET}` automaticamente — validamos
 * pra impedir invocacao externa.
 *
 * Logica:
 * 1. Busca artigos elegíveis (status='scheduled' AND scheduled_at <= now())
 * 2. Marca cada um como published, copiando scheduled_at → published_at
 * 3. Revalida cache (blog tag + slug + autor)
 * 4. Submete URLs ao IndexNow pra crawl rapido
 *
 * Idempotente: se rodar 2x no mesmo dia, segunda rodada nao acha mais nada.
 */

import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { submitToIndexNow } from "@/lib/indexnow"
import { SITE_URL } from "@/lib/constants"

export async function GET(request: Request) {
  // Auth: Vercel cron envia este header. Em prod, sem ele = 401.
  const authHeader = request.headers.get("authorization")
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase nao configurado" },
      { status: 503 }
    )
  }

  const sb = getSupabaseAdmin()
  const now = new Date().toISOString()

  // Find articles ready to publish
  const { data: ready, error: queryError } = await sb
    .from("articles")
    .select("id, slug, author_id, scheduled_at")
    .eq("status", "scheduled")
    .lte("scheduled_at", now)

  if (queryError) {
    console.error("[cron/publish-scheduled] query failed:", queryError)
    return NextResponse.json({ error: queryError.message }, { status: 500 })
  }

  const candidates = ready ?? []
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, published: 0, message: "Nada pra publicar." })
  }

  const publishedSlugs: string[] = []
  const failed: Array<{ id: string; slug: string; error: string }> = []

  // Atualiza um por vez pra logar erros individuais (catalogo nunca fica > 5
  // schedules em paralelo na pratica, sem ganho real em batch update).
  for (const article of candidates) {
    const { error: updateError } = await sb
      .from("articles")
      .update({
        status: "published",
        published_at: article.scheduled_at,
        seo_no_index: false,
      })
      .eq("id", article.id)

    if (updateError) {
      failed.push({
        id: article.id as string,
        slug: article.slug as string,
        error: updateError.message,
      })
      continue
    }

    publishedSlugs.push(article.slug as string)

    // Revalida tags imediatamente
    revalidateTag("blog", { expire: 0 })
    revalidateTag(`blog:${article.slug}`, { expire: 0 })
    if (article.author_id) {
      revalidateTag(`autor:${article.author_id}`, { expire: 0 })
    }
  }

  // IndexNow ping em batch (max 10000 URLs por chamada — sobra)
  if (publishedSlugs.length > 0) {
    const urls = publishedSlugs.map((slug) => `${SITE_URL}/blog/${slug}`)
    const indexNowResult = await submitToIndexNow(urls)
    if (!indexNowResult.ok) {
      console.warn(
        `[cron/publish-scheduled] IndexNow ping falhou (status ${indexNowResult.status}). Posts publicados, indexacao Google segue normal mas pode demorar mais.`
      )
    }
  }

  return NextResponse.json({
    ok: true,
    published: publishedSlugs.length,
    slugs: publishedSlugs,
    failed,
    timestamp: now,
  })
}
