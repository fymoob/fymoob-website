import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { FileText, Search } from "lucide-react"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { listAuthors } from "@/services/articles"
import type { ArticleStatus } from "@/lib/schemas/article"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { CreateDraftButton } from "./CreateDraftButton"

export const metadata: Metadata = {
  title: "Artigos",
}

interface PageProps {
  searchParams: Promise<{
    status?: ArticleStatus | "all"
    author?: string
    q?: string
  }>
}

interface ArticleRow {
  id: string
  slug: string
  title: string
  description: string
  cover_image_url: string | null
  cover_image_alt: string | null
  status: ArticleStatus
  published_at: string | null
  scheduled_at: string | null
  updated_at: string
  word_count: number | null
  author: { id: string; name: string; photo_url: string | null } | null
}

async function fetchArticles(filters: {
  status?: ArticleStatus | "all"
  authorId?: string
  query?: string
}): Promise<ArticleRow[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()
  let q = sb
    .from("articles")
    .select(
      `
        id, slug, title, description, cover_image_url, cover_image_alt,
        status, published_at, scheduled_at, updated_at, word_count,
        author:authors!articles_author_id_fkey ( id, name, photo_url )
      `
    )
    .order("updated_at", { ascending: false })

  if (filters.status && filters.status !== "all") {
    q = q.eq("status", filters.status)
  }
  if (filters.authorId) {
    q = q.eq("author_id", filters.authorId)
  }
  if (filters.query) {
    q = q.or(
      `title.ilike.%${filters.query}%,slug.ilike.%${filters.query}%`
    )
  }

  const { data, error } = await q
  if (error) {
    console.error("[admin/blog] list failed:", error)
    return []
  }
  return (data ?? []) as unknown as ArticleRow[]
}

export default async function ArticlesListPage({ searchParams }: PageProps) {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const params = await searchParams
  const statusFilter = params.status ?? "all"
  const authorFilter = params.author ?? ""
  const query = params.q ?? ""

  const [articles, authors] = await Promise.all([
    fetchArticles({
      status: statusFilter,
      authorId: authorFilter || undefined,
      query: query || undefined,
    }),
    listAuthors(),
  ])

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Blog
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Artigos
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Crie, edite, agende e publique artigos. Cada publicação atualiza o
            site automaticamente e avisa o Google.
          </p>
        </div>
        <CreateDraftButton />
      </header>

      {!isSupabaseConfigured() && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Supabase nao configurado.</strong> Defina as env vars em <code>.env.local</code>.
        </div>
      )}

      {/* Filtros */}
      <form
        action="/admin/blog"
        className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        <label className="flex-1 min-w-[200px]">
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Buscar
          </span>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Título ou slug..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
          </div>
        </label>
        <label>
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Status
          </span>
          <select
            name="status"
            defaultValue={statusFilter}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          >
            <option value="all">Todos</option>
            <option value="draft">Rascunho</option>
            <option value="scheduled">Agendado</option>
            <option value="published">Publicado</option>
            <option value="archived">Arquivado</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Autor
          </span>
          <select
            name="author"
            defaultValue={authorFilter}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          >
            <option value="">Todos</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-primary-hover"
        >
          Filtrar
        </button>
      </form>

      {/* Tabela / empty */}
      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
          <FileText className="mx-auto size-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            {query || statusFilter !== "all" || authorFilter
              ? "Nenhum artigo encontrado com esses filtros."
              : "Nenhum artigo ainda"}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Comece criando o primeiro rascunho.
          </p>
          <div className="mt-5 inline-block">
            <CreateDraftButton />
          </div>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Artigo</th>
                <th className="px-4 py-3 text-left font-semibold">Autor</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Atualizado</th>
                <th className="px-4 py-3 text-right font-semibold">Palavras</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {articles.map((a) => (
                <tr
                  key={a.id}
                  className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-3">
                    <Link href={`/admin/blog/${a.id}`} className="flex items-center gap-3">
                      {a.cover_image_url ? (
                        <Image
                          src={a.cover_image_url}
                          alt={a.cover_image_alt ?? a.title}
                          width={56}
                          height={42}
                          className="size-14 rounded-md object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex size-14 items-center justify-center rounded-md bg-slate-100 text-[10px] text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                          sem capa
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-slate-900 group-hover:text-brand-primary dark:text-slate-100">
                          {a.title}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          /blog/{a.slug}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {a.author?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                    {new Date(a.updated_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-xs text-slate-500 dark:text-slate-400">
                    {a.word_count ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
