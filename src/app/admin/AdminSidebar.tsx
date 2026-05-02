"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import {
  FileText,
  Building2,
  LogOut,
  Home,
  Users,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"
import { useAdminTheme } from "./AdminThemeProvider"

const STORAGE_KEY = "fymoob:admin:sidebar-expanded"

interface AdminSidebarProps {
  userEmail: string
  /** Server action passada do layout pra logout */
  signOutAction: () => Promise<void>
}

/**
 * Sidebar admin colapsavel — Fase 20.UX.
 *
 * Default: colapsada (so icones, w-16). Toggle via botao chevron no topo.
 * Estado persistido em localStorage. Hidratacao defensiva: server renderiza
 * colapsada, client hidrata estado salvo (evita flash).
 *
 * Mobile: oculta totalmente (md:flex).
 */
export function AdminSidebar({ userEmail, signOutAction }: AdminSidebarProps) {
  const [expanded, setExpanded] = useState(false)
  const { theme, toggle: toggleTheme } = useAdminTheme()

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "true") setExpanded(true)
  }, [])

  function toggle() {
    setExpanded((prev) => {
      const next = !prev
      window.localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-slate-200 bg-white py-5 transition-[width] duration-200 dark:border-admin-border dark:bg-admin-surface md:flex ${
        expanded ? "w-64 px-5" : "w-16 px-2"
      }`}
    >
      {/* Header com logo + toggle */}
      <div className={`flex items-center gap-2 ${expanded ? "px-2 py-2" : "justify-center py-2"}`}>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-sm font-bold text-white">
          FY
        </div>
        {expanded && (
          <span className="flex-1 truncate text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Painel FYMOOB
          </span>
        )}
      </div>

      {/* Botao toggle — sempre visivel, posicionado no topo do nav */}
      <button
        type="button"
        onClick={toggle}
        aria-label={expanded ? "Recolher menu" : "Expandir menu"}
        className={`mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-admin-elevated dark:hover:text-slate-200 ${
          expanded ? "" : "justify-center"
        }`}
      >
        {expanded ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        {expanded && <span>Recolher</span>}
      </button>

      <nav className="mt-3 flex flex-col gap-1">
        <NavLink href="/admin" icon={Home} expanded={expanded}>
          Início
        </NavLink>

        <NavGroup label="Blog" expanded={expanded}>
          <NavLink href="/admin/blog" icon={FileText} expanded={expanded}>
            Artigos
          </NavLink>
          <NavLink href="/admin/blog/autores" icon={Users} expanded={expanded}>
            Autores
          </NavLink>
        </NavGroup>

        <NavGroup label="Catálogo" expanded={expanded}>
          <NavLink href="/admin/empreendimentos" icon={Building2} expanded={expanded}>
            Empreendimentos
          </NavLink>
        </NavGroup>
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-4 dark:border-admin-border">
        {/* Toggle tema */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Mudar pra tema claro" : "Mudar pra tema escuro"}
          title={
            expanded
              ? undefined
              : theme === "dark"
              ? "Tema claro"
              : "Tema escuro"
          }
          className={`mb-1 flex w-full items-center gap-2.5 rounded-xl py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-admin-elevated dark:hover:text-slate-100 ${
            expanded ? "px-3" : "justify-center px-0"
          }`}
        >
          {theme === "dark" ? (
            <Sun className="size-4 shrink-0" />
          ) : (
            <Moon className="size-4 shrink-0" />
          )}
          {expanded && (
            <span className="truncate">
              {theme === "dark" ? "Tema claro" : "Tema escuro"}
            </span>
          )}
        </button>

        {expanded && (
          <>
            <p className="px-2 pt-2 text-xs text-slate-400 dark:text-slate-500">Logado como</p>
            <p className="truncate px-2 pb-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              {userEmail}
            </p>
          </>
        )}
        <form action={signOutAction}>
          <button
            type="submit"
            aria-label="Sair"
            title={expanded ? undefined : `Sair (${userEmail})`}
            className={`flex w-full items-center gap-2 rounded-xl py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-admin-elevated dark:hover:text-slate-100 ${
              expanded ? "px-3" : "justify-center px-0"
            }`}
          >
            <LogOut className="size-4 shrink-0" />
            {expanded && <span>Sair</span>}
          </button>
        </form>
      </div>
    </aside>
  )
}

function NavGroup({
  label,
  expanded,
  children,
}: {
  label: string
  expanded: boolean
  children: ReactNode
}) {
  return (
    <div className="mt-2">
      {expanded && (
        <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

function NavLink({
  href,
  icon: Icon,
  expanded,
  children,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  expanded: boolean
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      title={expanded ? undefined : String(children)}
      className={`flex items-center gap-2.5 rounded-xl py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-admin-elevated dark:hover:text-slate-100 ${
        expanded ? "px-3" : "justify-center px-0"
      }`}
    >
      <Icon className="size-4 shrink-0" />
      {expanded && <span className="truncate">{children}</span>}
    </Link>
  )
}
