"use client"

/**
 * FAQ Item custom block — par {question, answer}. Repetido em sequencia
 * forma uma seção FAQ (BlockRenderer publico agrega os pares pra schema
 * FAQPage automaticamente).
 */

import { createReactBlockSpec } from "@blocknote/react"

export const faqItemBlock = createReactBlockSpec(
  {
    type: "faqItem" as const,
    propSchema: {
      question: { default: "" },
      answer: { default: "" },
    },
    content: "none",
  },
  {
    render: ({ block, editor }) => {
      const update = (key: string, value: string) => {
        editor.updateBlock(block, { props: { ...block.props, [key]: value } })
      }
      return (
        <div
          className="my-3 rounded-xl border border-slate-200 bg-white p-4"
          contentEditable={false}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Bloco — FAQ
          </p>
          <input
            type="text"
            value={block.props.question as string}
            onChange={(e) => update("question", e.target.value)}
            placeholder="Pergunta"
            className="mb-2 w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
          <textarea
            value={block.props.answer as string}
            onChange={(e) => update("answer", e.target.value)}
            placeholder="Resposta"
            rows={3}
            className="w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-700 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      )
    },
  }
)
