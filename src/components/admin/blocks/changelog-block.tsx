"use client"

/**
 * Changelog custom block — lista editavel de {date, change}. Armazena
 * entries como JSON serializado em props.entries (string) pra compatibilidade
 * com BlockRenderer publico que ja faz parse defensivo.
 */

import { createReactBlockSpec } from "@blocknote/react"
import { Plus, Trash2 } from "lucide-react"

interface Entry {
  date: string
  change: string
}

function parseEntries(raw: string): Entry[] {
  try {
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.filter(
      (e): e is Entry =>
        Boolean(e && typeof e === "object" && typeof e.date === "string" && typeof e.change === "string")
    )
  } catch {
    return []
  }
}

export const changelogBlock = createReactBlockSpec(
  {
    type: "changelog" as const,
    propSchema: {
      entries: { default: "[]" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const entries = parseEntries(block.props.entries as string)

      const save = (next: Entry[]) => {
        editor.updateBlock(block, {
          props: { ...block.props, entries: JSON.stringify(next) },
        })
      }

      const addEntry = () => {
        const today = new Date().toISOString().slice(0, 10)
        save([...entries, { date: today, change: "" }])
      }

      const removeEntry = (idx: number) => {
        save(entries.filter((_, i) => i !== idx))
      }

      const update = (idx: number, key: keyof Entry, value: string) => {
        save(entries.map((e, i) => (i === idx ? { ...e, [key]: value } : e)))
      }

      return (
        <div
          className="my-3 rounded-xl border border-amber-200 bg-amber-50/40 p-4 dark:border-amber-700/40 dark:bg-amber-950/30"
          contentEditable={false}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
              Bloco — Histórico de atualizações
            </p>
            <button
              type="button"
              onClick={addEntry}
              className="inline-flex items-center gap-1 rounded-md border border-amber-300 bg-white px-2 py-1 text-[11px] font-medium text-amber-900 hover:bg-amber-100 dark:border-amber-700/50 dark:bg-admin-elevated dark:text-amber-200 dark:hover:bg-amber-900/40"
            >
              <Plus size={11} /> Entrada
            </button>
          </div>

          {entries.length === 0 ? (
            <p className="text-xs italic text-amber-900/70 dark:text-amber-200/70">
              Sem entradas. Use {`"+ Entrada"`} pra adicionar a primeira.
            </p>
          ) : (
            <ul className="space-y-2">
              {entries.map((e, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[120px_1fr_auto] items-start gap-2"
                >
                  <input
                    type="date"
                    value={e.date}
                    onChange={(ev) => update(idx, "date", ev.target.value)}
                    className="rounded-md border border-amber-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-amber-400 dark:border-amber-800/50 dark:bg-admin-elevated dark:text-slate-100"
                  />
                  <input
                    type="text"
                    value={e.change}
                    onChange={(ev) => update(idx, "change", ev.target.value)}
                    placeholder="O que mudou?"
                    className="rounded-md border border-amber-200 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-amber-400 dark:border-amber-800/50 dark:bg-admin-elevated dark:text-slate-100 dark:placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeEntry(idx)}
                    aria-label="Remover entrada"
                    className="rounded-md p-1.5 text-amber-900/70 hover:bg-amber-100 hover:text-red-600 dark:text-amber-200/70 dark:hover:bg-amber-900/40"
                  >
                    <Trash2 size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    },
  }
)
