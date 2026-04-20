import type { Metadata } from "next"

// Pagina nao-indexavel: noindex + nofollow pra Google nao listar na SERP.
// Tambem bloqueada no robots.ts via Disallow: /internal-optout.
export const metadata: Metadata = {
  title: "Internal Opt-Out | FYMOOB",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
}

export default function InternalOptOutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
