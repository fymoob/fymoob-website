import { NextResponse } from "next/server"
import { submitToIndexNow } from "@/lib/indexnow"

// POST /api/indexnow { urls: string[], secret: string }
// Called after content mutations to ping Bing/Yandex/Seznam immediately.
// Secret prevents anonymous abuse — match against env var only.
export async function POST(req: Request) {
  const secret = req.headers.get("x-indexnow-secret")
  if (!secret || secret !== process.env.INDEXNOW_SECRET) {
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
