"use client"

/**
 * Botao "+ Novo artigo" — chama server action `createDraftAction` que insere
 * draft vazio e redireciona pra `/admin/blog/[id]`.
 *
 * Wrap client necessário pra `useTransition` + estado disabled durante a
 * insercao (evita double-click criando 2 rascunhos).
 */

import { useTransition } from "react"
import { Plus, Loader2 } from "lucide-react"
import { createDraftAction } from "./_actions"

export function CreateDraftButton() {
  const [pending, startTransition] = useTransition()

  return (
    <form
      action={() => {
        startTransition(async () => {
          await createDraftAction()
        })
      }}
    >
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60"
      >
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
        Novo artigo
      </button>
    </form>
  )
}
