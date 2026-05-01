"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react"
import { deleteAction } from "./_actions"

interface DeleteArticleButtonProps {
  articleId: string
  articleTitle: string
}

/**
 * Quick action de exclusao de artigo na listagem — Fase 20.UX.
 *
 * Modal de confirmacao bloqueia delete acidental. Usuario precisa digitar
 * "EXCLUIR" pra habilitar o botao (pattern de destructive action perigosa,
 * estilo GitHub/Vercel pra evitar misclick).
 */
export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const canDelete = confirmText === "EXCLUIR"

  function handleClose() {
    if (pending) return
    setOpen(false)
    setConfirmText("")
    setError(null)
  }

  function handleConfirm() {
    if (!canDelete) return
    startTransition(async () => {
      const result = await deleteAction(articleId)
      if (result.ok) {
        setOpen(false)
        setConfirmText("")
        router.refresh()
      } else {
        setError(result.message ?? "Erro ao excluir")
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
        aria-label={`Excluir artigo "${articleTitle}"`}
        title="Excluir"
        className="inline-flex size-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
      >
        <Trash2 className="size-3.5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={pending}
              aria-label="Fechar"
              className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="size-4" />
            </button>

            <div className="flex size-11 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
            </div>

            <h2
              id="delete-modal-title"
              className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-slate-50"
            >
              Excluir artigo?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Esta ação <strong>não pode ser desfeita</strong>. O artigo
              &quot;<span className="font-medium text-slate-900 dark:text-slate-100">{articleTitle}</span>
              &quot; será removido permanentemente do banco. Se estiver
              publicado, vai sumir do site também.
            </p>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Para confirmar, digite <strong>EXCLUIR</strong> abaixo:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="EXCLUIR"
              autoFocus
              disabled={pending}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium uppercase tracking-wider text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={pending}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!canDelete || pending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Excluir definitivamente
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
