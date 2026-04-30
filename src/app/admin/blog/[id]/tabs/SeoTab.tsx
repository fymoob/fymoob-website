"use client"

import { useMemo } from "react"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { runSeoChecks, scoreFromChecks, type SeoCheck } from "@/lib/seo-score"
import type { BlockNoteBlock } from "@/lib/schemas/article"

interface Props {
  article: {
    title: string
    description: string
    body: BlockNoteBlock[]
    cover_image_url: string | null
    cover_image_alt: string | null
    author_id: string | null
    tags: string[]
    slug: string
  }
  seoMetaTitle: string
  onSeoMetaTitleChange: (v: string) => void
  seoMetaDescription: string
  onSeoMetaDescriptionChange: (v: string) => void
  seoCanonical: string
  onSeoCanonicalChange: (v: string) => void
  seoNoIndex: boolean
  onSeoNoIndexChange: (v: boolean) => void
  coverImageUrl: string
}

export function SeoTab(props: Props) {
  const checks = useMemo(() => runSeoChecks(props.article), [props.article])
  const score = scoreFromChecks(checks)
  const hasBlocks = checks.some((c) => c.severity === "block")

  const effectiveTitle = props.seoMetaTitle || props.article.title
  const effectiveDesc = props.seoMetaDescription || props.article.description

  return (
    <div className="space-y-5">
      {/* Score panel */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            SEO Score
          </span>
          <span
            className={`text-2xl font-bold tabular-nums ${
              hasBlocks
                ? "text-red-600"
                : score >= 80
                  ? "text-emerald-600"
                  : "text-amber-600"
            }`}
          >
            {score}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            style={{ width: `${score}%` }}
            className={`h-full transition-all ${
              hasBlocks
                ? "bg-red-500"
                : score >= 80
                  ? "bg-emerald-500"
                  : "bg-amber-500"
            }`}
          />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          {hasBlocks
            ? "Bloqueios impedem publicação. Resolva os items vermelhos abaixo."
            : score >= 80
              ? "Pronto pra publicar."
              : "Funcional, mas dá pra melhorar."}
        </p>
      </div>

      {/* Lista de checks */}
      <ul className="space-y-1.5">
        {checks.map((c) => (
          <CheckRow key={c.id} check={c} />
        ))}
      </ul>

      {/* SERP Preview */}
      <div>
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Preview Google (SERP)
        </span>
        <div className="rounded-lg border border-slate-200 bg-white p-3 font-sans">
          <p className="text-[11px] text-emerald-700">
            fymoob.com.br › blog › {props.article.slug || "<slug>"}
          </p>
          <p className="mt-0.5 line-clamp-1 text-base font-medium text-blue-700 hover:underline">
            {effectiveTitle || "Título do artigo"}
          </p>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">
            {effectiveDesc || "Descrição do artigo aparece aqui."}
          </p>
        </div>
      </div>

      {/* Form fields */}
      <Field
        label="Title custom (override)"
        hint="Default: usa o título do artigo. Override só se quiser SEO title diferente do H1 visível."
      >
        <input
          type="text"
          value={props.seoMetaTitle}
          onChange={(e) => props.onSeoMetaTitleChange(e.target.value)}
          maxLength={70}
          className={inputClass}
        />
      </Field>

      <Field
        label="Description custom (override)"
        hint="Default: descrição do artigo. Use só se quiser meta diferente."
      >
        <textarea
          value={props.seoMetaDescription}
          onChange={(e) => props.onSeoMetaDescriptionChange(e.target.value)}
          rows={2}
          maxLength={170}
          className={inputClass}
        />
      </Field>

      <Field
        label="URL canonical"
        hint="Use só pra apontar pra outro post canônico (ex: post duplicado em outra rota)."
      >
        <input
          type="url"
          value={props.seoCanonical}
          onChange={(e) => props.onSeoCanonicalChange(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>

      <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-slate-200 bg-white p-3">
        <input
          type="checkbox"
          checked={props.seoNoIndex}
          onChange={(e) => props.onSeoNoIndexChange(e.target.checked)}
          className="mt-0.5 size-4 rounded border-slate-300 text-brand-primary"
        />
        <span className="block">
          <span className="text-xs font-semibold text-slate-900">noindex</span>
          <span className="mt-0.5 block text-[10px] text-slate-500">
            Bloqueia indexação no Google. Auto-ligado em rascunho/agendado/arquivado;
            auto-desliga ao publicar.
          </span>
        </span>
      </label>

      {/* OG Card preview */}
      <div>
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Preview Open Graph (Facebook / WhatsApp)
        </span>
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          {props.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={props.coverImageUrl}
              alt="OG"
              className="aspect-[1.91/1] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-slate-100 text-xs text-slate-400">
              sem capa
            </div>
          )}
          <div className="p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">
              fymoob.com.br
            </p>
            <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
              {effectiveTitle || "Título do artigo"}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-slate-600">
              {effectiveDesc || "Descrição..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckRow({ check }: { check: SeoCheck }) {
  const { Icon, color } = ICON_BY_SEVERITY[check.severity]
  return (
    <li
      className={`rounded-lg border px-3 py-2 text-xs ${
        check.severity === "block"
          ? "border-red-200 bg-red-50"
          : check.severity === "warn"
            ? "border-amber-200 bg-amber-50"
            : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <div className="flex items-start gap-2">
        <Icon size={14} className={`mt-0.5 shrink-0 ${color}`} />
        <div className="flex-1">
          <p className="font-semibold text-slate-900">
            {check.label}: <span className="font-normal">{check.message}</span>
          </p>
          {check.hint && (
            <p className="mt-0.5 text-[11px] text-slate-600">{check.hint}</p>
          )}
        </div>
      </div>
    </li>
  )
}

const ICON_BY_SEVERITY = {
  block: { Icon: XCircle, color: "text-red-600" },
  warn: { Icon: AlertTriangle, color: "text-amber-600" },
  ok: { Icon: CheckCircle2, color: "text-emerald-600" },
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-slate-400">{hint}</span>}
    </label>
  )
}
