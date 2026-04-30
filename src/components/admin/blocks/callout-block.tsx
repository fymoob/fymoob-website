"use client"

/**
 * CalloutBox custom block — variante info/warning/alert + conteudo rich text
 * editavel inline (typeahead, marcas, links). content: "inline" permite que
 * o slash menu insira /heading dentro? nao — apenas inline content (sem blocos).
 */

import { createReactBlockSpec } from "@blocknote/react"

const VARIANT_CLASS: Record<string, string> = {
  info: "border-brand-primary-muted bg-brand-primary-light text-neutral-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  alert: "border-red-200 bg-red-50 text-red-900",
}

export const calloutBlock = createReactBlockSpec(
  {
    type: "calloutBox" as const,
    propSchema: {
      variant: {
        default: "info",
        values: ["info", "warning", "alert"],
      },
    },
    content: "inline",
  },
  {
    render: ({ block, editor, contentRef }) => {
      const variant = (block.props.variant as string) || "info"
      const setVariant = (v: string) => {
        // Cast: o propSchema com `values` narrow pra "info" | "warning" | "alert"
        // mas o select HTML retorna string crua. Confiamos no <option> values.
        editor.updateBlock(block, {
          props: { ...block.props, variant: v as "info" | "warning" | "alert" },
        })
      }
      return (
        <div
          className={`my-3 rounded-xl border px-5 py-3 text-sm leading-relaxed ${VARIANT_CLASS[variant] ?? VARIANT_CLASS.info}`}
        >
          <div
            className="mb-2 flex items-center gap-2"
            contentEditable={false}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Callout
            </span>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="rounded-md border border-current/20 bg-white/60 px-1.5 py-0.5 text-[11px] font-medium"
            >
              <option value="info">Info</option>
              <option value="warning">Aviso</option>
              <option value="alert">Alerta</option>
            </select>
          </div>
          <div ref={contentRef} className="text-sm leading-relaxed" />
        </div>
      )
    },
  }
)
