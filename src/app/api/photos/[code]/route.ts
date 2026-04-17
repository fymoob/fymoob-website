import { NextRequest, NextResponse } from "next/server"
import { checkApiLoftRateLimit, getClientIp } from "@/lib/rate-limit"

const LOFT_API_KEY = process.env.LOFT_API_KEY
const BASE_URL = "https://brunoces-rest.vistahost.com.br"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Rate limit 60/min/IP — usa x-real-ip (nao forjavel). Fail-closed.
  const ip = getClientIp(request.headers)
  if (ip === null) {
    return NextResponse.json({ error: "unable to determine client ip" }, { status: 400 })
  }
  const rate = await checkApiLoftRateLimit(ip)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: rate.reason },
      { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : {} }
    )
  }

  const { code } = await params

  // 400 = input invalido do client. 500 = config do server faltando (observabilidade).
  // Separar as duas causas evita que uma env var faltante (LOFT_API_KEY) fique
  // silenciosa como "codigo invalido".
  if (!code || !/^[A-Z0-9]{1,20}$/i.test(code)) {
    return NextResponse.json({ error: "invalid code" }, { status: 400 })
  }
  if (!LOFT_API_KEY) {
    console.error("[api/photos] LOFT_API_KEY missing — env misconfigured")
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 })
  }

  try {
    const pesquisa = JSON.stringify({
      fields: ["Codigo", { Foto: ["Foto", "Ordem"] }],
    })

    const url = `${BASE_URL}/imoveis/detalhes?key=${LOFT_API_KEY}&imovel=${code}&pesquisa=${encodeURIComponent(pesquisa)}`

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 900 }, // 15 min cache
    })

    if (!res.ok) {
      return NextResponse.json([], { status: res.status })
    }

    const data = (await res.json()) as { Foto?: Record<string, { Foto?: unknown; Ordem?: unknown }> }

    // Extract photo URLs com type guards (defense in depth contra CRM poisoning)
    const photos: string[] = []
    const fotoObj = data?.Foto
    if (fotoObj && typeof fotoObj === "object") {
      const sorted = Object.values(fotoObj).sort((a, b) => {
        const oa = typeof a?.Ordem === "string" ? Number.parseInt(a.Ordem, 10) : 0
        const ob = typeof b?.Ordem === "string" ? Number.parseInt(b.Ordem, 10) : 0
        return (Number.isFinite(oa) ? oa : 0) - (Number.isFinite(ob) ? ob : 0)
      })

      for (const foto of sorted) {
        if (typeof foto?.Foto === "string" && foto.Foto.startsWith("https://")) {
          photos.push(foto.Foto)
        }
      }
    }

    // Return max 5 photos
    return NextResponse.json(photos.slice(0, 5), {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    })
  } catch (err) {
    console.error("[api/photos] fetch/parse failed", err)
    return NextResponse.json([], { status: 500 })
  }
}
