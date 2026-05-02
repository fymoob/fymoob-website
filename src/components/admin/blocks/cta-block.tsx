"use client"

/**
 * CTABox custom block — chamada pra acao com link. Props-only (sem inline).
 */

import { createReactBlockSpec } from "@blocknote/react"
import { CTABox as CTABoxView } from "@/lib/mdx-components"

export const ctaBlock = createReactBlockSpec(
  {
    type: "ctaBox" as const,
    propSchema: {
      title: { default: "" },
      description: { default: "" },
      label: { default: "Fale com a FYMOOB" },
      href: { default: "/contato" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const update = (key: string, value: string) => {
        editor.updateBlock(block, { props: { ...block.props, [key]: value } })
      }
      const ready =
        block.props.title && block.props.description && block.props.href && block.props.label

      return (
        <div
          className="my-3 rounded-xl border border-brand-primary-muted bg-brand-primary-light/40 p-4 dark:border-brand-primary/30 dark:bg-brand-primary/10"
          contentEditable={false}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:text-brand-primary">
            Bloco — CTA (Call to Action)
          </p>
          <div className="grid grid-cols-1 gap-2">
            <BlockField
              label="Título"
              value={block.props.title as string}
              onChange={(v) => update("title", v)}
              placeholder="Quer comprar imóvel em Curitiba com segurança?"
            />
            <BlockField
              label="Descrição"
              value={block.props.description as string}
              onChange={(v) => update("description", v)}
              placeholder="Fale com nosso time. CRECI J 9420, atendimento humano."
            />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <BlockField
                label="Texto do botão"
                value={block.props.label as string}
                onChange={(v) => update("label", v)}
                placeholder="Quero falar com um corretor"
              />
              <BlockField
                label="Link (URL ou path interno)"
                value={block.props.href as string}
                onChange={(v) => update("href", v)}
                placeholder="/contato"
              />
            </div>
          </div>

          {ready && (
            <div className="mt-4 border-t border-brand-primary-muted/40 pt-3 dark:border-brand-primary/20">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-brand-primary">
                Preview
              </p>
              <CTABoxView
                title={block.props.title as string}
                description={block.props.description as string}
                label={block.props.label as string}
                href={block.props.href as string}
              />
            </div>
          )}
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
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-brand-primary/80 dark:text-brand-primary">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-primary-muted bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-brand-primary/30 dark:bg-admin-elevated dark:text-slate-100 dark:placeholder:text-slate-500"
      />
    </label>
  )
}
