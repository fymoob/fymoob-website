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
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Fechar histórico"
        onClick={onClose}
        className="flex-1 bg-slate-900/40"
      />
      {/* Panel */}
      <aside className="flex h-full w-[420px] flex-col border-l border-slate-200 bg-white shadow-xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Histórico de revisões
            </h2>
            <p className="text-xs text-slate-500">
              Snapshot a cada save manual ou publicação. Restore = volta ao estado da revisão.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={16} />
          </button>
        </header>

        <ul className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {revisions.length === 0 ? (
            <li className="px-5 py-8 text-center text-xs text-slate-500">
              Nenhuma revisão ainda. Snapshots são tirados ao salvar manualmente
              ou publicar.
            </li>
          ) : (
            revisions.map((r) => (
              <li key={r.id} className="px-5 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {r.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(r.edited_at).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRestore(r.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-brand-primary hover:text-brand-primary"
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
