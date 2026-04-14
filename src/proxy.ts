import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

/**
 * Admin route protection — Layer 1 of defense in depth.
 *
 * Renamed from middleware.ts to proxy.ts per Next.js 16 convention.
 *
 * IMPORTANT: this proxy is NOT the only auth check. Every /admin page,
 * server action, and API route MUST re-verify the session via `auth()` in its
 * own code. The proxy runs at the edge and was subject to the March 2025
 * Next.js CVE (x-middleware-subrequest bypass) — fixed in 15.2.3+, but runtime
 * auth checks give defense in depth anyway.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected: everything under /admin EXCEPT /admin/login itself and API auth routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = await auth()
    if (!session?.user?.email) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
