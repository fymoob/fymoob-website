import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { FileText, Users, Building2, Beaker, ArrowUpRight } from "lucide-react"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { listAuthors } from "@/services/articles"

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  // Stats reais pra dashboard ter informacao util em vez de status estatico
  const stats = await fetchStats()

  return (
    <div>
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Bem-vindo
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
          Gerencie o conteúdo editorial do site fymoob.com.br.
        </p>
      </header>

      {/* Stats cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Artigos publicados" value={stats.published} accent="emerald" />
        <StatCard label="Rascunhos" value={stats.draft} accent="amber" />
        <StatCard label="Agendados" value={stats.scheduled} accent="blue" />
        <StatCard label="Autores" value={stats.authors} accent="violet" />
      </div>

      {/* Acoes rapidas */}
      <div className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Atalhos
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DashboardCard
            href="/admin/blog"
            icon={FileText}
            title="Artigos"
            description="Criar, editar, agendar e publicar."
          />
          <DashboardCard
            href="/admin/blog/autores"
            icon={Users}
            title="Autores"
            description="Cadastrar Bruno, Wagner ou autores convidados."
          />
          <DashboardCard
            href="/admin/blog/editor-playground"
            icon={Beaker}
            title="Testar editor"
            description="Sandbox pra experimentar o editor sem salvar."
            status="beta"
          />
          <DashboardCardDisabled
            icon={Building2}
            title="Empreendimentos"
            description="Editar conteúdo de cada empreendimento."
          />
        </div>
      </div>
    </div>
  )
}

interface DashboardStats {
  published: number
  draft: number
  scheduled: number
  authors: number
}

async function fetchStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured()) {
    return { published: 0, draft: 0, scheduled: 0, authors: 0 }
  }
  const sb = getSupabaseAdmin()
  const [pub, draft, scheduled, authors] = await Promise.all([
    sb.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    sb.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    sb.from("articles").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
    listAuthors().then((a) => a.length),
  ])
  return {
    published: pub.count ?? 0,
    draft: draft.count ?? 0,
    scheduled: scheduled.count ?? 0,
    authors: authors,
  }
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent: "emerald" | "amber" | "blue" | "violet"
}) {
  const accentClass = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    amber: "text-amber-600 dark:text-amber-400",
    blue: "text-blue-600 dark:text-blue-400",
    violet: "text-violet-600 dark:text-violet-400",
  }[accent]
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-admin-border dark:bg-admin-surface">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className={`mt-2 font-display text-3xl font-bold tabular-nums ${accentClass}`}>
        {value}
      </p>
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
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-primary dark:border-admin-border dark:bg-admin-surface dark:hover:border-brand-primary"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary dark:bg-brand-primary/15">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-display font-semibold text-slate-900 group-hover:text-brand-primary dark:text-slate-100">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        {status === "beta" && (
          <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            Em testes
          </span>
        )}
      </div>
      <ArrowUpRight className="size-4 text-slate-300 transition-colors group-hover:text-brand-primary dark:text-slate-600" />
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
      className="flex cursor-not-allowed items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 opacity-70 dark:border-admin-border dark:bg-admin-surface/50"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-admin-elevated dark:text-slate-500">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          Em desenvolvimento
        </span>
      </div>
    </div>
  )
}
