import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { authorSchema } from "@/lib/schemas/author"
import { AuthorForm } from "../AuthorForm"
import { updateAuthor, deleteAuthor } from "../actions"

export const metadata: Metadata = {
  title: "Editar autor",
}

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ ok?: string }>
}

export default async function EditarAutorPage({
  params,
  searchParams,
}: PageProps) {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const { id } = await params
  const { ok } = await searchParams

  if (!isSupabaseConfigured()) notFound()

  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from("authors")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) notFound()

  const parsed = authorSchema.safeParse(data)
  if (!parsed.success) notFound()
  const author = parsed.data

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/blog/autores"
        className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-brand-primary"
      >
        <ChevronLeft size={14} />
        Voltar para autores
      </Link>
      <header className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            Editar autor
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Alterações aplicam imediato em todos os posts e na página pública.
          </p>
        </div>
        <Link
          href={`/autor/${author.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary"
        >
          <ExternalLink size={12} />
          Ver pagina publica
        </Link>
      </header>

      {ok && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Autor criado.
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <AuthorForm
          initial={author}
          action={updateAuthor}
          deleteAction={deleteAuthor}
        />
      </div>
    </div>
  )
}
