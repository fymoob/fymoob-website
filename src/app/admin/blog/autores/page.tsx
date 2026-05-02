import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Plus, FileText } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase-admin"
import { authorSchema } from "@/lib/schemas/author"

export const metadata: Metadata = {
  title: "Autores",
}

interface PageProps {
  searchParams: Promise<{ deleted?: string }>
}

interface AuthorWithCount {
  id: string
  slug: string
  name: string
  role: string
  photo_url: string | null
  photo_alt: string | null
  postCount: number
}

async function listAuthorsWithPostCounts(): Promise<AuthorWithCount[]> {
  if (!isSupabaseConfigured()) return []
  const sb = getSupabaseAdmin()

  const { data, error } = await sb
    .from("authors")
    .select("*")
    .order("name", { ascending: true })
  if (error || !data) return []

  // Conta posts por autor (paralelo). Em base com 5-10 autores, esse fan-out
  // de queries leves e mais simples que aggregation com count(grouped).
  const authors = data
    .map((row) => authorSchema.safeParse(row))
    .filter((r) => r.success)
    .map((r) => r.data)

  const counts = await Promise.all(
    authors.map(async (a) => {
      if (!a.id) return 0
      const { count } = await sb
        .from("articles")
        .select("*", { count: "exact", head: true })
        .eq("author_id", a.id)
      return count ?? 0
    })
  )

  return authors.map((a, i) => ({
    id: a.id!,
    slug: a.slug,
    name: a.name,
    role: a.role,
    photo_url: a.photo_url ?? null,
    photo_alt: a.photo_alt ?? null,
    postCount: counts[i],
  }))
}

export default async function AutoresPage({ searchParams }: PageProps) {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const { deleted } = await searchParams
  const authors = await listAuthorsWithPostCounts()

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Blog
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Autores
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Cadastre os autores que assinam os artigos. Cada autor ganha página
            pública própria com biografia, foto e lista de artigos publicados —
            isso ajuda o Google a confiar mais no conteúdo.
          </p>
        </div>
        <Link
          href="/admin/blog/autores/novo"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
        >
          <Plus size={14} />
          Novo autor
        </Link>
      </header>

      {deleted && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Autor excluído.
        </div>
      )}

      {!isSupabaseConfigured() && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Supabase nao configurado.</strong> Defina <code>NEXT_PUBLIC_SUPABASE_URL</code>
          {" "}e <code>SUPABASE_SERVICE_ROLE_KEY</code> em <code>.env.local</code>. Ver{" "}
          <code>supabase/README.md</code>.
        </div>
      )}

      {authors.length === 0 ? (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center dark:border-admin-border dark:bg-admin-surface">
          <FileText className="mx-auto size-10 text-slate-300 dark:text-slate-600" />
          <p className="mt-3 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
            Nenhum autor cadastrado
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Crie o primeiro autor pra começar a publicar artigos.
          </p>
          <Link
            href="/admin/blog/autores/novo"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            <Plus size={14} />
            Criar primeiro autor
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((a) => (
            <li
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-brand-primary dark:border-admin-border dark:bg-admin-surface dark:hover:border-brand-primary"
            >
              <Link
                href={`/admin/blog/autores/${a.id}`}
                className="flex h-full flex-col"
              >
                {/* aspect-[4/5] portrait + object-[center_top] prioriza rosto.
                    Fotos de team sao tipicamente headshots verticais; aspect-[4/3]
                    landscape cortava o pescoco em algumas fotos. */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-admin-elevated">
                  {a.photo_url ? (
                    <Image
                      src={a.photo_url}
                      alt={a.photo_alt ?? a.name}
                      width={400}
                      height={500}
                      className="size-full object-cover object-[center_top] transition-transform duration-300 group-hover:scale-[1.02]"
                      unoptimized
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-xs text-slate-400 dark:text-slate-500">
                      Sem foto
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                    {a.role}
                  </p>
                  <h2 className="mt-0.5 font-display text-base font-semibold text-slate-900 transition-colors group-hover:text-brand-primary dark:text-slate-100">
                    {a.name}
                  </h2>
                  <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                    /autor/{a.slug}
                  </p>
                  <div className="mt-auto pt-3 text-xs text-slate-500 dark:text-slate-400">
                    {a.postCount} artigo{a.postCount === 1 ? "" : "s"}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
