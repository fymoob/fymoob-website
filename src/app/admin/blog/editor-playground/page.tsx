/**
 * Editor playground — rota de teste do BlockNote pre-Sprint 3.
 *
 * Permite que Bruno experimente o editor (slash menu, blocos custom, upload
 * de imagem inline, autocomplete de imovel) sem persistir no DB. O conteudo
 * fica em estado client-side; "Salvar" so loga no console.
 *
 * Removida quando Sprint 3 (18.E) entregar /admin/blog/[id] real. NAO indexada
 * no menu de navegacao oficial — apenas link no dashboard.
 */

import type { Metadata } from "next"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { EditorPlaygroundClient } from "./EditorPlaygroundClient"

export const metadata: Metadata = {
  title: "Editor — Playground",
}

export default async function EditorPlaygroundPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  return (
    <div>
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Sprint 2 · Fase 18.D
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Editor — Playground
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Espaço pra testar o editor BlockNote antes da rota oficial de artigos
          (Sprint 3). Use <code>/</code> pra abrir o slash menu — inclui blocos
          FYMOOB (Callout, Metodologia, FAQ, CTA, Histórico, Imóvel destaque).
        </p>
      </header>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white dark:border-admin-border dark:bg-admin-surface">
        <EditorPlaygroundClient />
      </div>
    </div>
  )
}
