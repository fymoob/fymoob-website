import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AuthorForm } from "../AuthorForm"
import { createAuthor } from "../actions"

export const metadata: Metadata = {
  title: "Novo autor",
}

export default async function NovoAutorPage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/blog/autores"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-brand-primary"
      >
        <ChevronLeft size={14} />
        Voltar para autores
      </Link>
      <header className="mt-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Novo autor
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Cada autor cadastrado vira uma página pública em <code>/autor/&lt;slug&gt;</code>{" "}
          + schema Person/RealEstateAgent linkando todos os posts assinados.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <AuthorForm action={createAuthor} />
      </div>
    </div>
  )
}
