"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

// Error boundary para runtime errors dentro do layout raiz.
// Global-error.tsx cobre erros no próprio layout raiz (fallback último recurso).
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app/error.tsx]", error)
  }, [error])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="size-8 text-red-500" strokeWidth={2} />
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-neutral-950 sm:text-3xl">
          Algo deu errado
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Encontramos um problema ao carregar esta página. Nosso time foi notificado
          e estamos trabalhando nisso. Tente novamente em alguns instantes.
        </p>

        {error.digest && (
          <p className="mt-4 rounded-lg bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-500">
            Código de referência: <span className="text-neutral-700">{error.digest}</span>
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
          >
            <RefreshCw className="size-4" />
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <Home className="size-4" />
            Voltar ao início
          </Link>
        </div>

        <p className="mt-8 text-xs text-neutral-400">
          Persistindo o erro, entre em contato:{" "}
          <a
            href="https://wa.me/5541999780517"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-primary hover:underline"
          >
            WhatsApp (41) 99978-0517
          </a>
        </p>
      </div>
    </main>
  )
}
