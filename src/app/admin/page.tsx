import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { FileText, Users, Building2, Beaker } from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
        Bem-vindo
      </h1>
      <p className="mt-2 text-base text-slate-500">
        Gerencie o conteúdo editorial do site fymoob.com.br.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardCard
          href="/admin/blog"
          icon={FileText}
          title="Artigos"
          description="Criar, agendar e publicar artigos do blog (com SEO Score)"
        />
        <DashboardCard
          href="/admin/blog/autores"
          icon={Users}
          title="Autores"
          description="Cadastrar Bruno, Wagner ou autores convidados (E-E-A-T)"
        />
        <DashboardCard
          href="/admin/blog/editor-playground"
          icon={Beaker}
          title="Editor — Playground"
          description="Testar o editor BlockNote sem persistir (debug/sandbox)"
          status="beta"
        />
        <DashboardCardDisabled
          icon={Building2}
          title="Empreendimentos"
          description="Editar conteúdo editorial por empreendimento"
        />
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Status do painel</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-500">
          <li>Autenticacao via magic link (sem senha)</li>
          <li>Protecao anti-bot (Cloudflare Turnstile)</li>
          <li>Rate limit (5 tentativas/15min por email)</li>
          <li>Aba Autores: <strong>pronta</strong> (Fase 18.C)</li>
          <li>Editor BlockNote: <strong>pronto</strong> (Fase 18.D)</li>
          <li>Artigos (lista, editor, publish, agendar, histórico): <strong>pronto</strong> (Fase 18.E)</li>
          <li>Migração dos 15 MDX legados: pendente (Fase 18.G)</li>
        </ul>
      </div>
    </div>
  )
}

function DashboardCard({
  href,
  icon: Icon,
  title,
  description,
  status,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  status?: "beta"
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-primary"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-slate-900 group-hover:text-brand-primary">
          {title}
        </h3>
        <p className="text-sm text-slate-500">{description}</p>
        {status === "beta" && (
          <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
            Beta — playground
          </span>
        )}
      </div>
    </Link>
  )
}

function DashboardCardDisabled({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div
      aria-disabled="true"
      className="flex cursor-not-allowed items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 opacity-70"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-700">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
        <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
          Em desenvolvimento
        </span>
      </div>
    </div>
  )
}
