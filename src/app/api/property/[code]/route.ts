import { NextRequest, NextResponse } from "next/server"
import { getProperties } from "@/services/loft"
import { checkApiLoftRateLimit, getClientIp } from "@/lib/rate-limit"

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

  // Valida formato do código (evita injection)
  if (!code || !/^[A-Z0-9]{1,20}$/i.test(code)) {
    return NextResponse.json(null, { status: 400 })
  }

  const { properties } = await getProperties({ codigo: code, limit: 1 })
  const property = properties[0] ?? null

  if (!property) {
    return NextResponse.json(null, { status: 404 })
  }

  return NextResponse.json(property, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
  })
}
