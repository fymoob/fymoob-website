/**
 * Sanity Studio embarcado em /studio.
 *
 * Proteção:
 * - Auth check via NextAuth (mesmo sistema do /admin)
 * - Usuário não logado → redirect /admin/login
 * - Studio só renderiza pra session.user.email autorizado
 *
 * Configuração: sanity.config.ts (raiz do projeto).
 *
 * Setup detalhado: docs/architecture/sanity-setup-guide.md
 */

import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { StudioClient } from "./StudioClient"

export const metadata = {
  title: "Studio · FYMOOB",
  robots: { index: false, follow: false, nocache: true },
}

// Studio precisa rodar sem cache do Next.js
export const dynamic = "force-dynamic"

export default async function StudioPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/admin/login?next=/studio")
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId || projectId === "placeholder") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
        <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sanity ainda não configurado
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            O Studio precisa de um projeto Sanity criado e o ID configurado nas
            variáveis de ambiente.
          </p>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-slate-700">
            <li>
              Criar conta em{" "}
              <a
                href="https://www.sanity.io"
                className="text-brand-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                sanity.io
              </a>
            </li>
            <li>
              Criar novo projeto (qualquer nome — ex: <code>fymoob-blog</code>)
            </li>
            <li>
              Copiar o <code>Project ID</code> da página do projeto
            </li>
            <li>
              Adicionar em <code>.env.local</code>:
              <pre className="mt-2 rounded bg-slate-100 p-3 text-xs">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=seu-id-aqui
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2026-04-25`}
              </pre>
            </li>
            <li>Reiniciar dev server (npm run dev)</li>
          </ol>
          <p className="mt-6 text-xs text-slate-400">
            Ver guia completo em{" "}
            <code>docs/architecture/sanity-setup-guide.md</code>
          </p>
        </div>
      </main>
    )
  }

  return <StudioClient />
}
