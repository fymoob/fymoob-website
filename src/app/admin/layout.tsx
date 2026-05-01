import type { Metadata } from "next"
import type { ReactNode } from "react"
import { auth, signOut } from "@/auth"
import { AdminSidebar } from "./AdminSidebar"
import { AdminThemeProvider } from "./AdminThemeProvider"

export const metadata: Metadata = {
  title: {
    default: "Painel FYMOOB",
    template: "%s · Painel FYMOOB",
  },
  robots: { index: false, follow: false, nocache: true },
}

/**
 * Admin layout — wraps every /admin/* route.
 *
 * The login page at /admin/login has its own full-screen layout and skips
 * this sidebar via route group isolation (not nested here).
 *
 * This layout performs its own auth check in addition to the middleware.
 * Defense in depth: even if middleware is bypassed via the Next.js CVE,
 * the page itself won't render for an unauthenticated user.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Runtime auth check — do NOT rely solely on middleware (Next.js CVE-2025-29927)
  const session = await auth()

  if (!session?.user?.email) {
    return <>{children}</>
  }

  const userEmail = session.user.email

  async function handleSignOut() {
    "use server"
    await signOut({ redirectTo: "/admin/login" })
  }

  return (
    <AdminThemeProvider>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <AdminSidebar userEmail={userEmail} signOutAction={handleSignOut} />

        {/* Content — Fase 20.UX: full width sem max-w pra aproveitar telas
            wide. Padding lateral progressivo (4 mobile / 6 sm / 10 lg / 12 2xl). */}
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 2xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </AdminThemeProvider>
  )
}
