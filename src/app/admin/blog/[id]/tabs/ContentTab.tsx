"use client"

import { useEffect, useRef, useState } from "react"
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
  const [uploadElapsed, setUploadElapsed] = useState(0)
  const [originalSize, setOriginalSize] = useState<number | null>(null)
  const uploadStartRef = useRef<number | null>(null)
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [slugTouched, setSlugTouched] = useState(true)

  // Limpa timer no unmount pra evitar leak
  useEffect(() => {
    return () => {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
    }
  }, [])

  const handleCoverUpload = async (file: File) => {
    setUploading(true)
    setUploadError(null)
    setOriginalSize(file.size)
    setUploadElapsed(0)
    uploadStartRef.current = Date.now()
    elapsedTimerRef.current = setInterval(() => {
      if (uploadStartRef.current) {
        setUploadElapsed(Math.floor((Date.now() - uploadStartRef.current) / 1000))
      }
    }, 250)

    const result = await uploadCoverImageAction(file)

    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current)
    elapsedTimerRef.current = null
    setUploading(false)
    if ("error" in result) {
      setUploadError(result.error)
      setOriginalSize(null)
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
      <Field label="Título" hint={`${props.title.length}/55 caracteres ideais`}>
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
        label="Endereço da página (URL)"
        hint={
          props.isPublished
            ? "Bloqueado: artigo já publicado. Mudar o endereço quebra os links que estão circulando."
            : "Aparece no fim da URL: /blog/{este-texto}. Gerado automaticamente a partir do título — edite só se quiser personalizar."
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

      <Field
        label="Descrição"
        hint={`${props.description.length}/160 caracteres ideais — aparece no Google embaixo do título`}
      >
        <textarea
          value={props.description}
          onChange={(e) => props.onDescriptionChange(e.target.value)}
          rows={6}
          maxLength={170}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      </Field>

      <div>
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
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
          <label
            className={`flex flex-col items-center gap-2 rounded-lg border-2 border-dashed bg-slate-50 px-4 py-6 text-xs dark:bg-admin-surface/50 ${
              uploading
                ? "cursor-wait border-brand-primary/60 text-brand-primary"
                : "cursor-pointer border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary dark:border-admin-border-strong dark:text-slate-400"
            }`}
          >
            {uploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Upload size={20} />
            )}
            {uploading ? (
              <span className="text-center">
                <span className="block font-medium">
                  {uploadElapsed < 2
                    ? "Otimizando imagem..."
                    : uploadElapsed < 6
                      ? "Convertendo para WebP..."
                      : "Enviando para o servidor..."}
                </span>
                <span className="mt-0.5 block text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
                  {originalSize
                    ? `${formatBytes(originalSize)} • ${uploadElapsed}s`
                    : `${uploadElapsed}s`}
                </span>
              </span>
            ) : (
              "Clique para escolher uma imagem"
            )}
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png,image/avif"
              disabled={uploading}
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
        <Field
          label="Descrição da imagem (acessibilidade)"
          hint="Lido por leitores de tela e usado pelo Google. Descreva o que aparece na foto."
        >
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

      <Field
        label="Palavras-chave"
        hint={`${props.tags.length}/3-7 ideais. Aperte Enter pra adicionar cada uma.`}
      >
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
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-admin-elevated dark:text-slate-200"
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

      <Field
        label="Tipo do conteúdo"
        hint="Como o Google entende este artigo. Use 'Post de blog' pra textos comuns, 'Artigo aprofundado' pra reportagens longas, 'Notícia' pra atualizações urgentes, e 'Guia passo a passo' quando ensinar algo em etapas."
      >
        <select
          value={props.schemaType}
          onChange={(e) => props.onSchemaTypeChange(e.target.value as Article["schema_type"])}
          className={inputClass}
        >
          <option value="BlogPosting">Post de blog (padrão)</option>
          <option value="Article">Artigo aprofundado</option>
          <option value="NewsArticle">Notícia</option>
          <option value="HowTo">Guia passo a passo</option>
        </select>
      </Field>
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-admin-border-strong dark:bg-admin-surface dark:text-slate-100 dark:placeholder:text-slate-500"

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
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{hint}</span>}
    </label>
  )
}
