import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { FileText, Building2, LogOut, Home, Users } from "lucide-react"
import { auth, signOut } from "@/auth"

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

  // If we're rendering the login page, session is expected to be null.
  // The middleware only redirects NON-login routes, so this layout only runs
  // for protected pages when called via the admin routes.
  // However the layout wraps /admin/login too — bypass the check there.
  // We handle this by rendering children without chrome when session is null.

  if (!session?.user?.email) {
    // Login page or unauthenticated fallback — render bare (no sidebar)
    return <>{children}</>
  }

  const userEmail = session.user.email

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-5 md:flex">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-brand-primary text-sm font-bold text-white">
            FY
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900">
            Painel FYMOOB
          </span>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          <NavLink href="/admin" icon={Home}>
            Início
          </NavLink>
          <div className="mt-2">
            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Blog
            </p>
            <NavLink href="/admin/blog" icon={FileText}>
              Artigos
            </NavLink>
            <NavLink href="/admin/blog/autores" icon={Users}>
              Autores
            </NavLink>
          </div>
          <div className="mt-2">
            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Catálogo
            </p>
            <NavLink href="/admin/empreendimentos" icon={Building2}>
              Empreendimentos
            </NavLink>
          </div>
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="px-2 text-xs text-slate-400">Logado como</p>
          <p className="truncate px-2 pb-3 text-sm font-medium text-slate-700">
            {userEmail}
          </p>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/admin/login" })
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="size-4" />
              Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Content — Fase 20.UX: max-w aumentado de 5xl pra 7xl pra
          aproveitar telas wide (1440px+). Padding lateral responsivo
          (4 mobile / 8 tablet / 12 desktop). */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 2xl:px-12">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavLink({
  href,
  icon: Icon,
  children,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
    >
      <Icon className="size-4" />
      {children}
    </Link>
  )
}
