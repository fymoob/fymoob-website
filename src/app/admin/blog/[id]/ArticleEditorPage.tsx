"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Save,
  Send,
  Eye,
  Loader2,
  History,
  Calendar,
  Archive,
  Copy,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

import { ArticleEditor } from "@/components/admin/ArticleEditor"
import type { FymoobBlock } from "@/components/admin/article-editor-schema"
import { StatusBadge } from "@/components/admin/StatusBadge"
import type { Article, BlockNoteBlock } from "@/lib/schemas/article"
import {
  saveDraftAction,
  snapshotRevisionAction,
  publishAction,
  scheduleAction,
  unpublishAction,
  archiveAction,
  duplicateAction,
  restoreRevisionAction,
} from "../_actions"
import { ContentTab } from "./tabs/ContentTab"
import { MetadataTab } from "./tabs/MetadataTab"
import { YmylTab } from "./tabs/YmylTab"
import { SeoTab } from "./tabs/SeoTab"
import { RevisionsDrawer } from "./RevisionsDrawer"

interface AuthorLite {
  id: string
  name: string
  role: string
  photo_url: string | null
}

interface RevisionLite {
  id: string
  title: string
  edited_at: string
}

interface Props {
  article: Article & { body: BlockNoteBlock[] }
  authors: AuthorLite[]
  revisions: RevisionLite[]
}

type TabKey = "content" | "meta" | "ymyl" | "seo"

const TABS: { key: TabKey; label: string }[] = [
  { key: "content", label: "Conteúdo" },
  { key: "meta", label: "Metadados" },
  { key: "ymyl", label: "YMYL" },
  { key: "seo", label: "SEO" },
]

export function ArticleEditorPage({ article, authors, revisions: initialRevisions }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<TabKey>("content")
  const [showRevisions, setShowRevisions] = useState(false)
  // Revisions list re-fetched via router.refresh() apos snapshot — nao usamos
  // setRevisions diretamente, deixamos o server-side re-render do parent atualizar.
  const revisions = initialRevisions

  // Form state — sincronizado com o backend via saveDraftAction debounce
  const [title, setTitle] = useState(article.title)
  const [slug, setSlug] = useState(article.slug)
  const [description, setDescription] = useState(article.description)
  const [coverUrl, setCoverUrl] = useState(article.cover_image_url ?? "")
  const [coverAlt, setCoverAlt] = useState(article.cover_image_alt ?? "")
  const [authorId, setAuthorId] = useState(article.author_id ?? "")
  const [tags, setTags] = useState<string[]>(article.tags)
  const [schemaType, setSchemaType] = useState(article.schema_type)
  const [readingTime, setReadingTime] = useState<number | null>(article.reading_time_min ?? null)
  const [reviewedBy, setReviewedBy] = useState(article.reviewed_by ?? "")
  const [nextReview, setNextReview] = useState(article.next_review ?? "")
  const [methodology, setMethodology] = useState(article.methodology ?? null)
  const [seoMetaTitle, setSeoMetaTitle] = useState(article.seo_meta_title ?? "")
  const [seoMetaDescription, setSeoMetaDescription] = useState(article.seo_meta_description ?? "")
  const [seoCanonical, setSeoCanonical] = useState(article.seo_canonical ?? "")
  const [seoNoIndex, setSeoNoIndex] = useState(article.seo_no_index)
  const [seoOgImageUrl, setSeoOgImageUrl] = useState(article.seo_og_image_url ?? "")

  const [body, setBody] = useState<BlockNoteBlock[]>(article.body)
  const [savedAt, setSavedAt] = useState<Date | null>(new Date(article.updated_at))
  const [autosaving, setAutosaving] = useState(false)
  const [actionResult, setActionResult] = useState<{ ok?: boolean; message?: string }>({})
  const [pending, startTransition] = useTransition()

  // Refs pra valores correntes nos hooks
  const stateRef = useRef({ title, slug, description, coverUrl, coverAlt, authorId, tags, schemaType, readingTime, reviewedBy, nextReview, methodology, seoMetaTitle, seoMetaDescription, seoCanonical, seoNoIndex, seoOgImageUrl, body })
  useEffect(() => {
    stateRef.current = { title, slug, description, coverUrl, coverAlt, authorId, tags, schemaType, readingTime, reviewedBy, nextReview, methodology, seoMetaTitle, seoMetaDescription, seoCanonical, seoNoIndex, seoOgImageUrl, body }
  })

  // Autosave debouncer pros campos do form (separado do body — body usa o
  // proprio onChange do BlockNote tambem debounceado)
  const formTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const triggerFormAutosave = () => {
    if (formTimer.current) clearTimeout(formTimer.current)
    formTimer.current = setTimeout(() => doSave({ skipBody: true }), 1500)
  }

  const doSave = async (opts: { skipBody?: boolean } = {}) => {
    setAutosaving(true)
    const s = stateRef.current
    const result = await saveDraftAction({
      id: article.id,
      title: s.title,
      slug: s.slug,
      description: s.description,
      body: opts.skipBody ? undefined : (s.body as FymoobBlock[]),
      cover_image_url: s.coverUrl || null,
      cover_image_alt: s.coverAlt || null,
      author_id: s.authorId || null,
      tags: s.tags,
      schema_type: s.schemaType,
      reading_time_min: s.readingTime,
      reviewed_by: s.reviewedBy || null,
      next_review: s.nextReview || null,
      methodology: s.methodology,
      seo_meta_title: s.seoMetaTitle || null,
      seo_meta_description: s.seoMetaDescription || null,
      seo_canonical: s.seoCanonical || null,
      seo_no_index: s.seoNoIndex,
      seo_og_image_url: s.seoOgImageUrl || null,
    })
    setAutosaving(false)
    if (result.ok) {
      setSavedAt(new Date())
      setActionResult({})
    } else {
      setActionResult({ ok: false, message: result.message })
    }
  }

  // Body autosave (callback do BlockNote)
  const handleBodyChange = (blocks: FymoobBlock[]) => {
    setBody(blocks as BlockNoteBlock[])
    // Atualiza ref imediato + dispara save no proximo tick
    stateRef.current = { ...stateRef.current, body: blocks as BlockNoteBlock[] }
    void doSave()
  }

  // Snapshot manual antes de cada save importante
  const snapshotBeforeSave = async () => {
    await snapshotRevisionAction(article.id)
    // refresh revisions list
    router.refresh()
  }

  // Acoes de toolbar
  const handlePublish = () => {
    startTransition(async () => {
      await snapshotBeforeSave()
      await doSave()
      const r = await publishAction(article.id)
      setActionResult({ ok: r.ok, message: r.message })
      if (r.ok) router.refresh()
    })
  }

  const handleUnpublish = () => {
    if (!confirm("Despublicar este artigo? Vai sumir do site público.")) return
    startTransition(async () => {
      const r = await unpublishAction(article.id)
      setActionResult({ ok: r.ok, message: r.message })
      if (r.ok) router.refresh()
    })
  }

  const handleArchive = () => {
    if (!confirm("Arquivar este artigo?")) return
    startTransition(async () => {
      const r = await archiveAction(article.id)
      setActionResult({ ok: r.ok, message: r.message })
      if (r.ok) router.push("/admin/blog")
    })
  }

  const handleDuplicate = () => {
    startTransition(async () => {
      const r = await duplicateAction(article.id)
      if (r.ok && r.id) router.push(`/admin/blog/${r.id}`)
      else setActionResult({ ok: false, message: r.message })
    })
  }

  const handleSchedule = () => {
    const input = prompt(
      "Agendar publicação para (formato: YYYY-MM-DD HH:MM, hora local):",
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace("T", " ")
    )
    if (!input) return
    const iso = new Date(input.replace(" ", "T")).toISOString()
    startTransition(async () => {
      const r = await scheduleAction(article.id, iso)
      setActionResult({ ok: r.ok, message: r.message })
      if (r.ok) router.refresh()
    })
  }

  const handleRestoreRevision = (revisionId: string) => {
    if (!confirm("Restaurar esta versão? O estado atual será salvo no histórico antes.")) return
    startTransition(async () => {
      const r = await restoreRevisionAction(article.id, revisionId)
      setActionResult({ ok: r.ok, message: r.message })
      if (r.ok) {
        setShowRevisions(false)
        router.refresh()
      }
    })
  }

  // Tab content — render direto. React Compiler memoiza automaticamente.
  let tabContent: React.ReactNode = null
  switch (tab) {
    case "content":
      tabContent = (
        <ContentTab
            title={title}
            onTitleChange={(v) => { setTitle(v); triggerFormAutosave() }}
            slug={slug}
            onSlugChange={(v) => { setSlug(v); triggerFormAutosave() }}
            description={description}
            onDescriptionChange={(v) => { setDescription(v); triggerFormAutosave() }}
            coverUrl={coverUrl}
            onCoverUrlChange={(v) => { setCoverUrl(v); triggerFormAutosave() }}
            coverAlt={coverAlt}
            onCoverAltChange={(v) => { setCoverAlt(v); triggerFormAutosave() }}
            authorId={authorId}
            onAuthorIdChange={(v) => { setAuthorId(v); triggerFormAutosave() }}
            tags={tags}
            onTagsChange={(v) => { setTags(v); triggerFormAutosave() }}
            schemaType={schemaType}
            onSchemaTypeChange={(v) => { setSchemaType(v); triggerFormAutosave() }}
            authors={authors}
            isPublished={article.status === "published"}
          />
        )
      break
    case "meta":
      tabContent = (
        <MetadataTab
          readingTime={readingTime}
          onReadingTimeChange={(v) => { setReadingTime(v); triggerFormAutosave() }}
          seoOgImageUrl={seoOgImageUrl}
          onSeoOgImageUrlChange={(v) => { setSeoOgImageUrl(v); triggerFormAutosave() }}
          updatedAt={savedAt}
        />
      )
      break
    case "ymyl":
      tabContent = (
        <YmylTab
          reviewedBy={reviewedBy}
          onReviewedByChange={(v) => { setReviewedBy(v); triggerFormAutosave() }}
          nextReview={nextReview}
          onNextReviewChange={(v) => { setNextReview(v); triggerFormAutosave() }}
          methodology={methodology}
          onMethodologyChange={(v) => { setMethodology(v); triggerFormAutosave() }}
        />
      )
      break
    case "seo":
      tabContent = (
        <SeoTab
          article={{
            title, description, body, cover_image_url: coverUrl || null,
            cover_image_alt: coverAlt || null, author_id: authorId || null,
            tags, slug,
          }}
          seoMetaTitle={seoMetaTitle}
          onSeoMetaTitleChange={(v) => { setSeoMetaTitle(v); triggerFormAutosave() }}
          seoMetaDescription={seoMetaDescription}
          onSeoMetaDescriptionChange={(v) => { setSeoMetaDescription(v); triggerFormAutosave() }}
          seoCanonical={seoCanonical}
          onSeoCanonicalChange={(v) => { setSeoCanonical(v); triggerFormAutosave() }}
          seoNoIndex={seoNoIndex}
          onSeoNoIndexChange={(v) => { setSeoNoIndex(v); triggerFormAutosave() }}
          coverImageUrl={coverUrl}
        />
      )
      break
  }

  return (
    <div>
      {/* Top bar — margens negativas espelham padding do AdminLayout
          (px-4 mobile, px-6 sm, px-10 lg, px-12 2xl) pra ocupar largura total
          do main, criando barra continua de borda a borda. */}
      <div className="-mx-4 -mt-6 border-b border-slate-200 bg-white px-4 py-4 sm:-mx-6 sm:-mt-8 sm:px-6 lg:-mx-10 lg:-mt-10 lg:px-10 2xl:-mx-12 2xl:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-primary"
            >
              <ChevronLeft size={14} />
              Artigos
            </Link>
            <StatusBadge status={article.status} />
            <span className="text-xs text-slate-500">
              {autosaving ? (
                <span className="inline-flex items-center gap-1 text-amber-700">
                  <Loader2 size={12} className="animate-spin" /> Salvando...
                </span>
              ) : savedAt ? (
                <>Salvo às {savedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</>
              ) : (
                "Sem alterações"
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowRevisions(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary"
            >
              <History size={12} />
              Histórico ({revisions.length})
            </button>
            <Link
              href={`/admin/blog/preview/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary"
            >
              <Eye size={12} />
              Preview
            </Link>
            <button
              type="button"
              onClick={() => doSave()}
              disabled={pending || autosaving}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary disabled:opacity-50"
            >
              <Save size={12} />
              Salvar agora
            </button>
            {article.status !== "published" ? (
              <>
                <button
                  type="button"
                  onClick={handleSchedule}
                  disabled={pending}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary disabled:opacity-50"
                >
                  <Calendar size={12} />
                  Agendar
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={pending}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-primary px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-primary-hover disabled:opacity-60"
                >
                  {pending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                  Publicar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleUnpublish}
                disabled={pending}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100 disabled:opacity-50"
              >
                <EyeOff size={12} />
                Despublicar
              </button>
            )}
            <DropdownMenu
              onDuplicate={handleDuplicate}
              onArchive={handleArchive}
            />
          </div>
        </div>
      </div>

      {/* Action result banner */}
      {actionResult.message && (
        <div
          className={`mt-4 flex items-start gap-2 whitespace-pre-line rounded-xl border px-4 py-3 text-sm ${
            actionResult.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {actionResult.ok ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          )}
          <span>{actionResult.message}</span>
        </div>
      )}

      {/* Split layout: editor + sidebar — Fase 20.UX.
          Editor ocupa toda largura disponivel (grid 1fr). Sidebar separada
          em coluna fixa 380-440px (cresce em wide). Gap maior pra dar
          impressao visual de blocos independentes (como Notion).
          Editor card tem padding generoso (top + horizontal) pra respiro. */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 2xl:grid-cols-[minmax(0,1fr)_440px] 2xl:gap-10">
        <div className="rounded-2xl border border-slate-200 bg-white py-8 sm:py-10 lg:py-12">
          <ArticleEditor
            initialContent={body as FymoobBlock[]}
            onChange={handleBodyChange}
            debounceMs={1500}
          />
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start lg:h-fit">
          <div className="rounded-2xl border border-slate-200 bg-white">
            <div className="flex border-b border-slate-100">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 px-3 py-3 text-xs font-medium transition-colors ${
                    tab === t.key
                      ? "border-b-2 border-brand-primary text-brand-primary"
                      : "border-b-2 border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-4">{tabContent}</div>
          </div>
        </aside>
      </div>

      {showRevisions && (
        <RevisionsDrawer
          revisions={revisions}
          onClose={() => setShowRevisions(false)}
          onRestore={handleRestoreRevision}
        />
      )}
    </div>
  )
}

function DropdownMenu({
  onDuplicate,
  onArchive,
}: {
  onDuplicate: () => void
  onArchive: () => void
}) {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-primary">
        Mais ▾
      </summary>
      <div className="absolute right-0 top-full z-30 mt-1 w-44 rounded-lg border border-slate-200 bg-white shadow-lg">
        <button
          type="button"
          onClick={onDuplicate}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
        >
          <Copy size={12} /> Duplicar
        </button>
        <button
          type="button"
          onClick={onArchive}
          className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
        >
          <Archive size={12} /> Arquivar
        </button>
      </div>
    </details>
  )
}
