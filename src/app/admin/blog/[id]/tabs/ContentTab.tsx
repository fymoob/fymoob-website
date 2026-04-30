"use client"

import { useState } from "react"
import Image from "next/image"
import { Upload, X, Loader2 } from "lucide-react"
import { slugify } from "@/lib/utils"
import { uploadCoverImageAction } from "../../_cover-action"
import type { Article } from "@/lib/schemas/article"

interface AuthorOpt {
  id: string
  name: string
  role: string
  photo_url: string | null
}

interface Props {
  title: string
  onTitleChange: (v: string) => void
  slug: string
  onSlugChange: (v: string) => void
  description: string
  onDescriptionChange: (v: string) => void
  coverUrl: string
  onCoverUrlChange: (v: string) => void
  coverAlt: string
  onCoverAltChange: (v: string) => void
  authorId: string
  onAuthorIdChange: (v: string) => void
  tags: string[]
  onTagsChange: (v: string[]) => void
  schemaType: Article["schema_type"]
  onSchemaTypeChange: (v: Article["schema_type"]) => void
  authors: AuthorOpt[]
  isPublished: boolean
}

export function ContentTab(props: Props) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [slugTouched, setSlugTouched] = useState(true)

  const handleCoverUpload = async (file: File) => {
    setUploading(true)
    setUploadError(null)
    const result = await uploadCoverImageAction(file)
    setUploading(false)
    if ("error" in result) {
      setUploadError(result.error)
      return
    }
    props.onCoverUrlChange(result.url)
  }

  const addTag = () => {
    const v = tagInput.trim()
    if (!v || props.tags.includes(v)) {
      setTagInput("")
      return
    }
    props.onTagsChange([...props.tags, v])
    setTagInput("")
  }

  const removeTag = (t: string) => {
    props.onTagsChange(props.tags.filter((x) => x !== t))
  }

  return (
    <div className="space-y-4">
      <Field label="Título" hint={`${props.title.length}/55 chars ideais`}>
        <input
          type="text"
          value={props.title}
          onChange={(e) => {
            props.onTitleChange(e.target.value)
            if (!slugTouched && !props.isPublished) {
              props.onSlugChange(slugify(e.target.value))
            }
          }}
          maxLength={120}
          className={inputClass}
        />
      </Field>

      <Field
        label="Slug (URL)"
        hint={
          props.isPublished
            ? "Bloqueado: artigo publicado. Mudar slug quebra SEO."
            : "kebab-case. Auto do título até primeira edição manual."
        }
      >
        <input
          type="text"
          value={props.slug}
          onChange={(e) => {
            props.onSlugChange(e.target.value)
            setSlugTouched(true)
          }}
          disabled={props.isPublished}
          maxLength={96}
          className={`${inputClass} font-mono text-xs disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500`}
        />
      </Field>

      <Field label="Descrição" hint={`${props.description.length}/160 chars ideais`}>
        <textarea
          value={props.description}
          onChange={(e) => props.onDescriptionChange(e.target.value)}
          rows={3}
          maxLength={170}
          className={inputClass}
        />
      </Field>

      <div>
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Imagem de capa <span className="text-red-500">*</span>
        </span>
        {props.coverUrl ? (
          <div className="relative">
            <Image
              src={props.coverUrl}
              alt={props.coverAlt || "Capa"}
              width={320}
              height={180}
              className="aspect-[16/9] w-full rounded-lg object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => {
                props.onCoverUrlChange("")
                props.onCoverAltChange("")
              }}
              aria-label="Remover capa"
              className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate-700 shadow-sm hover:bg-white"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-xs text-slate-500 hover:border-brand-primary hover:text-brand-primary">
            {uploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Upload size={20} />
            )}
            {uploading ? "Enviando..." : "Clique pra escolher imagem"}
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png,image/avif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void handleCoverUpload(f)
              }}
            />
          </label>
        )}
        {uploadError && <p className="mt-1 text-xs text-red-600">{uploadError}</p>}
      </div>

      {props.coverUrl && (
        <Field label="Texto alternativo da capa">
          <input
            type="text"
            value={props.coverAlt}
            onChange={(e) => props.onCoverAltChange(e.target.value)}
            placeholder="Ex: Vista panorâmica do Batel, Curitiba"
            maxLength={200}
            className={inputClass}
          />
        </Field>
      )}

      <Field label="Autor">
        <select
          value={props.authorId}
          onChange={(e) => props.onAuthorIdChange(e.target.value)}
          className={inputClass}
        >
          <option value="">— sem autor —</option>
          {props.authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} ({a.role})
            </option>
          ))}
        </select>
      </Field>

      <Field label="Tags" hint={`${props.tags.length}/3-7 ideais. Enter pra adicionar.`}>
        <div className="space-y-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Curitiba, Apartamentos, ..."
            className={inputClass}
          />
          {props.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {props.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                >
                  {t}
                  <button
                    type="button"
                    onClick={() => removeTag(t)}
                    aria-label={`Remover ${t}`}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </Field>

      <Field label="Schema.org type">
        <select
          value={props.schemaType}
          onChange={(e) => props.onSchemaTypeChange(e.target.value as Article["schema_type"])}
          className={inputClass}
        >
          <option value="BlogPosting">BlogPosting (default)</option>
          <option value="Article">Article</option>
          <option value="NewsArticle">NewsArticle</option>
          <option value="HowTo">HowTo</option>
        </select>
      </Field>
    </div>
  )
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
