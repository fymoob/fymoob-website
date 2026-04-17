import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

// POST /api/revalidate { tag: string }
// Headers: { "x-revalidate-secret": "<REVALIDATE_SECRET>" }
//
// Invalida cache do Next Data Cache por tag, forcando re-fetch ao Loft/Vista
// na proxima request. Usado em:
// - Webhook pos-sync do CRM (imovel vendido/novo/atualizado)
// - Trigger manual via admin quando mudanca urgente
// - Cron job (5-15min intervalo, opcional)
//
// Tags disponiveis:
// - "imoveis" (src/services/loft.ts:398) — invalida catalogo inteiro
//
// Secret protege contra abuso anonimo. Pattern igual ao /api/indexnow.

const VALID_TAGS = new Set(["imoveis"])

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret")
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: { tag?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const tag = body.tag
  if (!tag || typeof tag !== "string") {
    return NextResponse.json(
      { error: "missing tag", validTags: Array.from(VALID_TAGS) },
      { status: 400 }
    )
  }

  if (!VALID_TAGS.has(tag)) {
    return NextResponse.json(
      { error: "invalid tag", validTags: Array.from(VALID_TAGS) },
      { status: 400 }
    )
  }

  try {
    // Next 16 API: revalidateTag(tag, profile). Profile controla expire
    // do proximo cache apos invalidacao. Usamos { expire: 0 } para forcar
    // refetch imediato na proxima request.
    revalidateTag(tag, { expire: 0 })
    return NextResponse.json({
      ok: true,
      tag,
      revalidatedAt: new Date().toISOString(),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: "revalidation failed", message },
      { status: 500 }
    )
  }
}
