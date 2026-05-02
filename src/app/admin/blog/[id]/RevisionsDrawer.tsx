"use client"

import { X, RotateCcw } from "lucide-react"

interface Revision {
  id: string
  title: string
  edited_at: string
}

interface Props {
  revisions: Revision[]
  onClose: () => void
  onRestore: (revisionId: string) => void
}

export function RevisionsDrawer({ revisions, onClose, onRestore }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop — dark mode usa preto com blur leve, igual padrao do
          AdvancedFiltersModal da busca publica */}
      <button
        type="button"
        aria-label="Fechar histórico"
        onClick={onClose}
        className="flex-1 bg-slate-900/40 dark:bg-black/60 dark:backdrop-blur-sm"
      />
      {/* Panel — dark mode com efeito glass: bg semi-transparente +
          backdrop-blur-xl + saturate. Cria sensacao de "vidro fume" sobre
          o editor sem perder legibilidade */}
      <aside className="flex h-full w-[420px] flex-col border-l border-slate-200 bg-white shadow-xl dark:border-admin-border dark:bg-admin-surface/80 dark:shadow-2xl dark:shadow-black/50 dark:backdrop-blur-xl dark:backdrop-saturate-150">
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-admin-border">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-50">
              Histórico de revisões
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Snapshot a cada save manual ou publicação. Restore = volta ao estado da revisão.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-admin-elevated dark:hover:text-slate-100"
          >
            <X size={16} />
          </button>
        </header>

        <ul className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-admin-border">
          {revisions.length === 0 ? (
            <li className="px-5 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              Nenhuma revisão ainda. Snapshots são tirados ao salvar manualmente
              ou publicar.
            </li>
          ) : (
            revisions.map((r) => (
              <li key={r.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                      {r.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(r.edited_at).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRestore(r.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary dark:border-admin-border dark:bg-admin-elevated/60 dark:text-slate-200 dark:hover:border-brand-primary"
                  >
                    <RotateCcw size={11} />
                    Restaurar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  )
}
