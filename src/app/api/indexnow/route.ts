import { NextResponse } from "next/server"
import { timingSafeEqual } from "node:crypto"
import { submitToIndexNow } from "@/lib/indexnow"

// Comparacao em tempo constante evita timing side-channel.
function safeEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

// POST /api/indexnow { urls: string[], secret: string }
// Called after content mutations to ping Bing/Yandex/Seznam immediately.
// Secret prevents anonymous abuse — match against env var only.
export async function POST(req: Request) {
  const secret = req.headers.get("x-indexnow-secret")
  if (!safeEqual(secret, process.env.INDEXNOW_SECRET)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  let body: { urls?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 })
  }

  const urls = Array.isArray(body.urls) ? body.urls.filter((u) => typeof u === "string") : []
  if (urls.length === 0) {
    return NextResponse.json({ error: "no urls" }, { status: 400 })
  }
  if (urls.length > 10000) {
    return NextResponse.json({ error: "max 10000 urls per request" }, { status: 400 })
  }

  const result = await submitToIndexNow(urls)
  return NextResponse.json(result, { status: result.ok ? 200 : 502 })
}
