"use client"

/**
 * AuthorForm — form compartilhado entre `/novo` e `/[id]`.
 *
 * Server action injetada via prop `action`. Estado de submissao via
 * useFormState/useActionState (Next 15+). Valida em runtime soft (server
 * tem validacao Zod hard).
 *
 * Slug auto-gerado a partir do nome enquanto o usuario nao mexe — depois
 * passa a ser editavel sem auto-overwrite (hook de touched).
 */

import { useState, useTransition } from "react"
import Image from "next/image"
import { Trash2, Save, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { slugify } from "@/lib/utils"
import type { Author } from "@/lib/schemas/author"
import type { ActionResult } from "./actions"

type ActionFn = (prev: ActionResult, formData: FormData) => Promise<ActionResult>

interface AuthorFormProps {
  initial?: Author
  action: ActionFn
  /** Acao secundaria (delete) — so aparece em modo edicao */
  deleteAction?: ActionFn
}

const INITIAL_RESULT: ActionResult = { ok: false }

const ROLE_OPTIONS = [
  "Corretor de Imóveis",
  "Diretor",
  "Editor",
  "Convidado",
  "Pesquisador",
] as const

export function AuthorForm({ initial, action, deleteAction }: AuthorFormProps) {
  const isEdit = Boolean(initial?.id)

  const [name, setName] = useState(initial?.name ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug))
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initial?.photo_url ?? null
  )
  const [result, setResult] = useState<ActionResult>(INITIAL_RESULT)
  const [pending, startTransition] = useTransition()
  const [pendingDelete, startDelete] = useTransition()

  function onNameChange(v: string) {
    setName(v)
    if (!slugTouched) setSlug(slugify(v))
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const r = await action(INITIAL_RESULT, formData)
      setResult(r)
    })
  }

  function handleDelete() {
    if (!deleteAction || !initial?.id) return
    if (!confirm(`Excluir o autor "${initial.name}"? Esta acao nao pode ser desfeita.`)) {
      return
    }
    const fd = new FormData()
    fd.set("id", initial.id)
    startDelete(async () => {
      const r = await deleteAction(INITIAL_RESULT, fd)
      if (!r.ok) setResult(r)
    })
  }

  const fieldError = (name: string) => result.fieldErrors?.[name]
  const expertiseInitial = initial?.expertise?.join(", ") ?? ""

  return (
    <form
      action={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {isEdit && initial?.id && (
        <input type="hidden" name="id" value={initial.id} />
      )}
      {initial?.photo_url && (
        <input type="hidden" name="photo_url_existing" value={initial.photo_url} />
      )}

      {/* Banner de status */}
      {result.message && (
        <div
          className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
            result.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {result.ok ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          ) : (
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
          )}
          <span>{result.message}</span>
        </div>
      )}

      {/* Foto */}
      <Section title="Foto" required={!isEdit}>
        <div className="flex items-start gap-4">
          {photoPreview ? (
            <div className="relative size-28 shrink-0 overflow-hidden rounded-2xl ring-1 ring-slate-200">
              {/* Preview pode ser blob URL — fallback img tag */}
              {photoPreview.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="size-full object-cover"
                />
              ) : (
                <Image
                  src={photoPreview}
                  alt="Foto atual"
                  fill
                  sizes="112px"
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          ) : (
            <div className="flex size-28 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-xs text-slate-400">
              Sem foto
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              name="photo"
              accept="image/webp,image/jpeg,image/png,image/avif"
              onChange={onPhotoChange}
              className="block w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-brand-primary-hover"
            />
            <p className="mt-1.5 text-xs text-slate-500">
              JPG/PNG/WebP/AVIF até 5 MB. Foto profissional, fundo neutro.
            </p>
          </div>
        </div>
      </Section>

      {/* Nome + slug */}
      <Section title="Identificação">
        <Field label="Nome completo" required error={fieldError("name")}>
          <input
            name="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            maxLength={120}
            placeholder="Bruno César de Almeida"
            className={inputClass}
          />
        </Field>
        <Field
          label="Slug (URL: /autor/<slug>)"
          required
          hint="kebab-case, sem acentos. Auto-gerado do nome."
          error={fieldError("slug")}
        >
          <input
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value)
              setSlugTouched(true)
            }}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            maxLength={96}
            className={`${inputClass} font-mono text-sm`}
          />
        </Field>
        <Field label="Cargo" required error={fieldError("role")}>
          <select
            name="role"
            defaultValue={initial?.role ?? "Corretor de Imóveis"}
            className={inputClass}
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="CRECI"
          hint="Ex: CRECI/PR 24.494. Obrigatorio se cargo = Corretor."
          error={fieldError("creci")}
        >
          <input
            name="creci"
            defaultValue={initial?.creci ?? ""}
            maxLength={60}
            placeholder="CRECI/PR 24.494"
            className={inputClass}
          />
        </Field>
        <Field
          label="Texto alternativo da foto"
          hint="Descricao acessivel pra leitores de tela."
          error={fieldError("photo_alt")}
        >
          <input
            name="photo_alt"
            defaultValue={initial?.photo_alt ?? ""}
            maxLength={200}
            placeholder="Foto do corretor Bruno em frente ao escritorio FYMOOB"
            className={inputClass}
          />
        </Field>
      </Section>

      {/* Bio + expertise */}
      <Section title="Apresentação">
        <Field
          label="Bio curta"
          hint="1-3 frases. Aparece no rodape do post + schema Person."
          error={fieldError("bio_short")}
        >
          <textarea
            name="bio_short"
            defaultValue={initial?.bio_short ?? ""}
            maxLength={500}
            rows={3}
            placeholder="Corretor responsavel pela FYMOOB. Atua em Curitiba ha mais de uma decada com foco em apartamentos e casas residenciais."
            className={inputClass}
          />
        </Field>
        <Field
          label="Email (opcional)"
          hint="Aparece no schema Person — ajuda E-E-A-T."
          error={fieldError("email")}
        >
          <input
            type="email"
            name="email"
            defaultValue={initial?.email ?? ""}
            placeholder="bruno@fymoob.com.br"
            className={inputClass}
          />
        </Field>
        <Field
          label="Áreas de expertise"
          hint="Separadas por virgula. Ex: Curitiba, Apartamentos, Financiamento. Vira `knowsAbout` no schema."
          error={fieldError("expertise")}
        >
          <input
            name="expertise"
            defaultValue={expertiseInitial}
            placeholder="Curitiba, Apartamentos, Mercado Imobiliário PR"
            className={inputClass}
          />
        </Field>
      </Section>

      {/* Social links */}
      <Section title="Redes sociais (opcional)">
        <p className="-mt-2 mb-3 text-xs text-slate-500">
          Vira <code>sameAs</code> do schema Person. Cada perfil reforca E-E-A-T.
        </p>
        <Field label="LinkedIn" error={fieldError("social_links.linkedin")}>
          <input
            type="url"
            name="social_linkedin"
            defaultValue={initial?.social_links?.linkedin ?? ""}
            placeholder="https://linkedin.com/in/usuario"
            className={inputClass}
          />
        </Field>
        <Field label="Instagram" error={fieldError("social_links.instagram")}>
          <input
            type="url"
            name="social_instagram"
            defaultValue={initial?.social_links?.instagram ?? ""}
            placeholder="https://instagram.com/usuario"
            className={inputClass}
          />
        </Field>
        <Field label="Twitter / X" error={fieldError("social_links.twitter")}>
          <input
            type="url"
            name="social_twitter"
            defaultValue={initial?.social_links?.twitter ?? ""}
            placeholder="https://twitter.com/usuario"
            className={inputClass}
          />
        </Field>
        <Field label="Site pessoal" error={fieldError("social_links.website")}>
          <input
            type="url"
            name="social_website"
            defaultValue={initial?.social_links?.website ?? ""}
            placeholder="https://meusite.com"
            className={inputClass}
          />
        </Field>
      </Section>

      {/* Acoes */}
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
        {isEdit && deleteAction ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={pendingDelete}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
          >
            {pendingDelete ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Excluir autor
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60"
        >
          {pending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Save size={14} />
          )}
          {isEdit ? "Salvar alterações" : "Criar autor"}
        </button>
      </div>
    </form>
  )
}

// ───────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"

function Section({
  title,
  required,
  children,
}: {
  title: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="font-display text-sm font-semibold text-slate-900">
        {title}
        {required && <span className="ml-1 text-red-500">*</span>}
      </legend>
      {children}
    </fieldset>
  )
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 inline-flex items-center gap-1 text-xs font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="mt-1 block text-xs text-slate-500">{hint}</span>
      )}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
