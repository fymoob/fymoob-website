import { NextRequest, NextResponse } from "next/server"
import { getProperties } from "@/services/loft"
import { checkApiLoftRateLimit, getClientIp } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
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

  const body = await request.json()
  const codes: string[] = body?.codes

  if (!Array.isArray(codes) || codes.length === 0) {
    return NextResponse.json([], { status: 400 })
  }

  // Limita a 20 codes + valida formato (evita injection e amplificação)
  const limitedCodes = codes
    .slice(0, 20)
    .filter((c): c is string => typeof c === "string" && /^[A-Z0-9]{1,20}$/i.test(c))

  if (limitedCodes.length === 0) {
    return NextResponse.json([], { status: 400 })
  }

  // Fetch all properties in parallel (each code is a single API call)
  const results = await Promise.all(
    limitedCodes.map(async (code) => {
      try {
        const { properties } = await getProperties({ codigo: code, limit: 1 })
        return properties[0] ?? null
      } catch {
        return null
      }
    })
  )

  const valid = results.filter(Boolean)

  return NextResponse.json(valid, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
  })
}
