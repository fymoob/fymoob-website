import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { FileText, Building2, ArrowRight } from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
        Bem-vindo
      </h1>
      <p className="mt-2 text-base text-slate-500">
        Gerencie o conteúdo editorial do site fymoob.com.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardCard
          href="/admin/blog"
          icon={FileText}
          title="Blog"
          description="Criar, editar e publicar artigos"
          status="Em construção"
        />
        <DashboardCard
          href="/admin/empreendimentos"
          icon={Building2}
          title="Empreendimentos"
          description="Editar conteúdo editorial por empreendimento"
          status="Em construção"
        />
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Status do painel</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-500">
          <li>✅ Autenticação via magic link (sem senha)</li>
          <li>✅ Proteção anti-bot (Cloudflare Turnstile)</li>
          <li>✅ Rate limit (5 tentativas/15min por email)</li>
          <li>⏳ Editor de blog — próxima entrega</li>
          <li>⏳ Editor de empreendimentos — próxima entrega</li>
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
  status: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-primary/40 hover:bg-brand-primary/5"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-brand-primary/10 group-hover:text-brand-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{description}</p>
        <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
          {status}
        </span>
      </div>
      <ArrowRight className="size-4 text-slate-300 transition-colors group-hover:text-brand-primary" />
    </Link>
  )
}
