"use client"

/**
 * MethodologyBox custom block (BlockNote schema).
 *
 * Visual no editor: card cinza com inputs de period/sample/sources/lastUpdate/
 * nextReview. Conteudo NAO editavel inline (props-only) — usuario edita via
 * inputs HTML pra cada campo. Renderiza identico ao MethodologyBox publico
 * via componente compartilhado em `lib/mdx-components.tsx`.
 *
 * Pra permitir reusar no front publico (BlockRenderer.tsx) sem React duplo,
 * a forma de armazenamento e: { type: "methodologyBox", props: {...} }.
 */

import { createReactBlockSpec } from "@blocknote/react"
import { MethodologyBox as MethodologyBoxView } from "@/lib/mdx-components"

export const methodologyBlock = createReactBlockSpec(
  {
    type: "methodologyBox" as const,
    propSchema: {
      period: { default: "" },
      sample: { default: "" },
      treatment: { default: "" },
      sources: { default: "" },
      lastUpdate: { default: "" },
      nextReview: { default: "" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const update = (key: string, value: string) => {
        editor.updateBlock(block, {
          props: { ...block.props, [key]: value },
        })
      }
      return (
        <div
          className="my-3 rounded-xl border border-amber-200 bg-amber-50/40 p-4"
          contentEditable={false}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
              Bloco — Metodologia
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <BlockField
              label="Período"
              value={block.props.period}
              onChange={(v) => update("period", v)}
              placeholder="Abril/2026"
            />
            <BlockField
              label="Amostra"
              value={block.props.sample}
              onChange={(v) => update("sample", v)}
              placeholder="234 imóveis ativos no CRM"
            />
            <BlockField
              label="Tratamento"
              value={block.props.treatment}
              onChange={(v) => update("treatment", v)}
              placeholder="Ex: Mediana excluindo top/bottom 5%"
            />
            <BlockField
              label="Fontes (separadas por vírgula)"
              value={block.props.sources}
              onChange={(v) => update("sources", v)}
              placeholder="FipeZap, Secovi-PR, FYMOOB CRM"
              className="sm:col-span-2"
            />
            <BlockField
              label="Última atualização (YYYY-MM-DD)"
              value={block.props.lastUpdate}
              onChange={(v) => update("lastUpdate", v)}
              placeholder="2026-04-30"
            />
            <BlockField
              label="Próxima revisão (YYYY-MM-DD)"
              value={block.props.nextReview}
              onChange={(v) => update("nextReview", v)}
              placeholder="2026-07-30"
            />
          </div>

          {/* Preview do que aparece no site publico */}
          <div className="mt-4 border-t border-amber-200 pt-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-amber-900">
              Preview
            </p>
            <MethodologyBoxView
              period={block.props.period || undefined}
              sample={block.props.sample || undefined}
              treatment={block.props.treatment || undefined}
              sources={block.props.sources || undefined}
              lastUpdate={block.props.lastUpdate || undefined}
              nextReview={block.props.nextReview || undefined}
            />
          </div>
        </div>
      )
    },
  }
)

function BlockField({
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-amber-900/80">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
      />
    </label>
  )
}
