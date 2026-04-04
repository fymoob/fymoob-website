import { NextResponse } from "next/server"
import { getProperties } from "@/services/loft"

export async function POST(request: Request) {
  const body = await request.json()
  const codes: string[] = body?.codes

  if (!Array.isArray(codes) || codes.length === 0) {
    return NextResponse.json([], { status: 400 })
  }

  // Limit to 20 codes max to prevent abuse
  const limitedCodes = codes.slice(0, 20)

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
