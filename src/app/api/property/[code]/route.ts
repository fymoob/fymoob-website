import { NextResponse } from "next/server"
import { getProperties } from "@/services/loft"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  if (!code) {
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
