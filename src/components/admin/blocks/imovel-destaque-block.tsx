"use client"

/**
 * ImovelDestaque custom block — autocomplete da API Loft.
 *
 * Permite que o autor cite um imóvel real do CRM dentro do texto. Salva
 * apenas o codigo do imovel; o site publico re-resolve pra dados ao vivo
 * (titulo, preco, URL) na hora do render — assim, se o imovel mudar de
 * preco ou titulo no CRM, o post reflete automaticamente.
 *
 * Fallback `fallbackTitle` e `fallbackUrl` salvos no momento da insercao
 * pra que o BlockRenderer publico tenha conteudo mesmo se a API estiver
 * fora ou o imovel for despublicado.
 */

import { useState, useTransition } from "react"
import { createReactBlockSpec } from "@blocknote/react"
import { Search, X, Loader2 } from "lucide-react"
import {
  searchPropertiesAction,
  type PropertySearchResult,
} from "@/app/admin/blog/_editor-actions"

export const imovelDestaqueBlock = createReactBlockSpec(
  {
    type: "imovelDestaque" as const,
    propSchema: {
      codigo: { default: "" },
      fallbackTitle: { default: "" },
      fallbackUrl: { default: "" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const codigo = block.props.codigo as string
      const fallbackTitle = block.props.fallbackTitle as string
      const fallbackUrl = block.props.fallbackUrl as string

      const setProperty = (p: PropertySearchResult) => {
        editor.updateBlock(block, {
          props: {
            ...block.props,
            codigo: p.codigo,
            fallbackTitle: p.titulo,
            fallbackUrl: `/imovel/${p.slug}`,
          },
        })
      }

      const clear = () => {
        editor.updateBlock(block, {
          props: { ...block.props, codigo: "", fallbackTitle: "", fallbackUrl: "" },
        })
      }

      return (
        <div
          className="my-3 rounded-xl border border-brand-primary-muted bg-brand-primary-light/30 p-4 dark:border-brand-primary/30 dark:bg-brand-primary/10"
          contentEditable={false}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-primary">
            Bloco — Imóvel em destaque
          </p>

          {codigo ? (
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Código {codigo}</p>
                <p className="mt-0.5 font-display text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {fallbackTitle || `Imóvel ${codigo}`}
                </p>
                <a
                  href={fallbackUrl || `/imovel/${codigo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[11px] text-brand-primary hover:underline"
                >
                  {fallbackUrl || `/imovel/${codigo}`}
                </a>
              </div>
              <button
                type="button"
                onClick={clear}
                aria-label="Trocar imóvel"
                className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-admin-elevated dark:hover:text-slate-200"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <PropertyAutocomplete onSelect={setProperty} />
          )}
        </div>
      )
    },
  }
)

// ───────────────────────────────────────────────────────────────────
// Autocomplete UI (cliente)
// ───────────────────────────────────────────────────────────────────

function PropertyAutocomplete({
  onSelect,
}: {
  onSelect: (p: PropertySearchResult) => void
}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<PropertySearchResult[]>([])
  const [pending, startTransition] = useTransition()

  function handleQuery(value: string) {
    setQuery(value)
    if (value.trim().length < 2) {
      setResults([])
      return
    }
    startTransition(async () => {
      const r = await searchPropertiesAction(value.trim())
      setResults(r)
    })
  }

  return (
    <div>
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          placeholder="Buscar imóvel por código, bairro ou tipo..."
          className="w-full rounded-lg border border-brand-primary-muted bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-brand-primary/30 dark:bg-admin-elevated dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        {pending && (
          <Loader2
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400 dark:text-slate-500"
          />
        )}
      </div>
      {results.length > 0 && (
        <ul className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-admin-border dark:bg-admin-elevated">
          {results.map((r) => (
            <li key={r.codigo}>
              <button
                type="button"
                onClick={() => onSelect(r)}
                className="block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-brand-primary-light/40 dark:hover:bg-brand-primary/15"
              >
                <p className="font-medium text-slate-900 dark:text-slate-100">{r.titulo}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Código {r.codigo} · {r.bairro} · {r.cidade}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}
      {query.trim().length >= 2 && !pending && results.length === 0 && (
        <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
          Nenhum imóvel encontrado para “{query}”.
        </p>
      )}
    </div>
  )
}
