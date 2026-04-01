"use client"

import { useEffect, useState } from "react"
import { X, Sparkles } from "lucide-react"
import Link from "next/link"

const LAST_VISIT_KEY = "fymoob:last_visit"
const DISMISSED_KEY = "fymoob:welcome_dismissed"

export function WelcomeBack() {
  const [show, setShow] = useState(false)
  const [daysSince, setDaysSince] = useState(0)

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(DISMISSED_KEY)
      if (dismissed) return

      const lastVisit = localStorage.getItem(LAST_VISIT_KEY)
      const now = Date.now()

      if (lastVisit) {
        const diff = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24))
        if (diff >= 1) {
          setDaysSince(diff)
          setShow(true)
        }
      }

      localStorage.setItem(LAST_VISIT_KEY, String(now))
    } catch {
      // ignore
    }
  }, [])

  if (!show) return null

  return (
    <div className="border-b border-brand-primary-muted bg-brand-primary-light">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <Sparkles className="size-4 shrink-0 text-brand-primary" />
          <span>
            Bem-vindo de volta! Confira os novos imóveis desde sua última visita
            {daysSince > 0 && (
              <span className="text-neutral-500"> (há {daysSince} {daysSince === 1 ? "dia" : "dias"})</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/busca?orderBy=recentes"
            className="shrink-0 rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Ver novos
          </Link>
          <button
            onClick={() => {
              setShow(false)
              sessionStorage.setItem(DISMISSED_KEY, "1")
            }}
            className="shrink-0 text-neutral-400 transition-colors hover:text-neutral-600"
            aria-label="Fechar"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
