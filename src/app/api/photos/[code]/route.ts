import { NextRequest, NextResponse } from "next/server"
import { checkApiLoftRateLimit } from "@/lib/rate-limit"

const LOFT_API_KEY = process.env.LOFT_API_KEY
const BASE_URL = "https://brunoces-rest.vistahost.com.br"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  // Rate limit 60/min/IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  const rate = await checkApiLoftRateLimit(ip)
  if (!rate.allowed) {
    return NextResponse.json(
      { error: rate.reason },
      { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : {} }
    )
  }

  const { code } = await params

  // Valida formato do código para evitar injeção
  if (!code || !/^[A-Z0-9]{1,20}$/i.test(code) || !LOFT_API_KEY) {
    return NextResponse.json([], { status: 400 })
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

    const data = await res.json()

    // Extract photo URLs
    const photos: string[] = []
    const fotoObj = data?.Foto
    if (fotoObj && typeof fotoObj === "object") {
      const sorted = Object.values(fotoObj)
        .sort((a: any, b: any) => parseInt(a.Ordem || "0") - parseInt(b.Ordem || "0"))

      for (const foto of sorted) {
        if ((foto as any).Foto) photos.push((foto as any).Foto)
      }
    }

    // Return max 5 photos
    return NextResponse.json(photos.slice(0, 5), {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800",
      },
    })
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
