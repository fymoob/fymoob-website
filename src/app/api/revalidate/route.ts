import { NextResponse } from "next/server"
import { revalidateTag } from "next/cache"
import { timingSafeEqual } from "node:crypto"

// Comparacao em tempo constante evita timing side-channel na recuperacao
// byte-a-byte do secret. Retorna false se tamanhos divergem (sem leak).
function safeEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

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
// - "blog" — invalida lista do blog + post(s) afetados
// - "blog:<slug>" — invalida apenas um post especifico (ex: "blog:meu-post")
//
// Secret protege contra abuso anonimo. Pattern igual ao /api/indexnow.

const STATIC_VALID_TAGS = new Set(["imoveis", "blog"])

function isValidTag(tag: string): boolean {
  return STATIC_VALID_TAGS.has(tag) || /^blog:[a-z0-9-]+$/.test(tag)
}

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret")
  if (!safeEqual(secret, process.env.REVALIDATE_SECRET)) {
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
      {
        error: "missing tag",
        validTags: [...Array.from(STATIC_VALID_TAGS), "blog:<slug>"],
      },
      { status: 400 }
    )
  }

  if (!isValidTag(tag)) {
    return NextResponse.json(
      {
        error: "invalid tag",
        validTags: [...Array.from(STATIC_VALID_TAGS), "blog:<slug>"],
      },
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
    // Loga detalhes server-side para debug — NAO expoe err.message ao caller
    // (evita info disclosure sobre internals do Next/runtime).
    console.error("[revalidate] failed for tag", tag, err)
    return NextResponse.json(
      { error: "revalidation failed" },
      { status: 500 }
    )
  }
}
