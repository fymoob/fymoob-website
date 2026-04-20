"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2, Info } from "lucide-react"

/**
 * Rota secreta pra opt-out de metricas (tracking interno).
 *
 * Uso:
 * - Bruno, Wagner e corretores abrem essa URL em cada dispositivo que
 *   usam pra ver o site (celular + desktop)
 * - Seta cookie "fymoob_internal=1" (400 dias, limite max navegadores
 *   modernos — Chrome/Safari restringem acima)
 * - DeferredGA le o cookie e envia traffic_type=internal pros eventos
 * - GA4 Data Filter "Internal Traffic" descarta esses eventos
 *
 * Estrategia completa em docs/seo/internal-traffic-filtering.md
 *
 * Bloqueado no robots.txt + noindex pra Google nao indexar essa pagina
 * (seria constrangedor aparecer em busca).
 */
export default function InternalOptOutPage() {
  const [state, setState] = useState<"loading" | "done" | "cleared">("loading")

  useEffect(() => {
    // Se ja esta marcado, mostra confirmacao
    if (document.cookie.includes("fymoob_internal=1")) {
      setState("done")
      return
    }

    // Seta cookie 400 dias (limite maximo permitido por Chrome/Safari em 2026)
    document.cookie =
      "fymoob_internal=1; max-age=34560000; path=/; SameSite=Lax"

    setState("done")
  }, [])

  const handleClear = () => {
    document.cookie = "fymoob_internal=; max-age=0; path=/; SameSite=Lax"
    setState("cleared")
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-lg text-center">
        {state === "loading" && (
          <>
            <Loader2 className="mx-auto size-10 animate-spin text-brand-primary" />
            <h1 className="mt-6 font-display text-2xl font-bold text-slate-900">
              Marcando dispositivo...
            </h1>
          </>
        )}

        {state === "done" && (
          <>
            <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
            <h1 className="mt-6 font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Dispositivo marcado como interno
            </h1>
            <p className="mt-4 text-slate-600">
              Suas visitas neste dispositivo não contam mais nas métricas
              de analytics. Continua tudo funcionando normal — isso é só
              pra gente ter estatística real de cliente, não de equipe
              testando.
            </p>

            <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-left">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Info className="size-4 text-slate-400" />
                Como funciona
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Cookie dura <strong>400 dias</strong> (limite máximo Chrome/Safari)</li>
                <li>• Marca só <strong>este dispositivo</strong> — repita em cada celular/computador</li>
                <li>• Se limpar cookies do navegador, volta a contar — abre essa página de novo</li>
                <li>• Navegador anônimo não preserva o cookie</li>
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
                <Info className="size-4 text-amber-600" />
                Dica pra verificar SEO sem poluir métricas
              </div>
              <p className="text-sm text-amber-800">
                Quer saber se uma página tá aparecendo no Google? Use o{" "}
                <strong>Google Search Console → Inspeção de URL</strong>.
                Não pesquise direto no Google normal — cada pesquisa nossa
                conta como &quot;impressão&quot; nas métricas.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
              >
                Voltar ao site
              </Link>
              <button
                type="button"
                onClick={handleClear}
                className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-700"
              >
                Remover marca de interno
              </button>
            </div>
          </>
        )}

        {state === "cleared" && (
          <>
            <CheckCircle2 className="mx-auto size-12 text-slate-400" />
            <h1 className="mt-6 font-display text-2xl font-bold text-slate-900">
              Marca removida
            </h1>
            <p className="mt-4 text-slate-600">
              Este dispositivo voltou a ser rastreado normalmente. Pra
              marcar de novo, atualize a página.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
            >
              Voltar ao site
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
