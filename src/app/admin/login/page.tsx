import type { Metadata } from "next"
import Image from "next/image"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "Acesso ao painel — FYMOOB",
  robots: { index: false, follow: false, nocache: true },
}

type PageProps = {
  searchParams: Promise<{ "check-email"?: string; error?: string }>
}

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams
  const showCheckEmail = params["check-email"] === "1"
  const showError = params.error === "1"
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center gap-2">
          <Image
            src="/icon-192.png"
            alt="FYMOOB"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Painel FYMOOB
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Acesso administrativo
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Informe seu email. Você receberá um link de acesso por email — não é
          necessário usar senha.
        </p>

        {showCheckEmail && (
          <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Se este email tiver acesso, enviamos um link em instantes. Verifique
            sua caixa de entrada (e a pasta de spam).
          </div>
        )}
        {showError && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            Erro ao processar o acesso. Tente novamente em alguns minutos.
          </div>
        )}

        <LoginForm turnstileSiteKey={turnstileSiteKey} />

        <p className="mt-8 text-xs text-slate-400">
          Esta área é restrita. Todas as tentativas de acesso são registradas.
        </p>
      </div>
    </main>
  )
}
