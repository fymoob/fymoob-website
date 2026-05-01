"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "fymoob:admin:theme"

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/**
 * Provider de tema escuro/claro pro painel admin — Fase 20.UX.
 *
 * Escopo: aplica classe `.dark` apenas no wrapper do /admin/*. O site
 * publico fica sempre em light (decisao Bruno: identidade visual fixa).
 *
 * Persiste em localStorage. Default: light. Hidratacao defensiva: server
 * renderiza light, client lê preferencia salva (evita FOUC mas pode causar
 * flash curto na primeira pintura — aceitavel pra admin).
 */
export function AdminThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "dark") setTheme("dark")
  }, [])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light"
      window.localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme === "dark" ? "dark" : undefined}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useAdminTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useAdminTheme deve ser usado dentro de AdminThemeProvider")
  }
  return ctx
}
