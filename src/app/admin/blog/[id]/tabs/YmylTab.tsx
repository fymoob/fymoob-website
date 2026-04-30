"use client"

import type { MethodologyObject } from "@/lib/schemas/article"

interface Props {
  reviewedBy: string
  onReviewedByChange: (v: string) => void
  nextReview: string
  onNextReviewChange: (v: string) => void
  methodology: MethodologyObject | null | undefined
  onMethodologyChange: (v: MethodologyObject | null) => void
}

export function YmylTab(props: Props) {
  const m = props.methodology ?? {}
  const update = (key: keyof MethodologyObject, value: string) => {
    props.onMethodologyChange({ ...m, [key]: value || undefined })
  }

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2 text-[11px] text-amber-900">
        <strong>YMYL</strong> (Your Money, Your Life): conteúdo financeiro,
        jurídico, médico, de família. Posts YMYL exigem metodologia explícita
        + revisão periódica pra ranquear.
      </p>

      <Field
        label="Revisado por"
        hint='Ex: "Bruno César", "Research Protocol v1.0"'
      >
        <input
          type="text"
          value={props.reviewedBy}
          onChange={(e) => props.onReviewedByChange(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Próxima revisão"
        hint="Data limite pra revisar conteúdo. YMYL Money: trimestral."
      >
        <input
          type="date"
          value={props.nextReview ? props.nextReview.slice(0, 10) : ""}
          onChange={(e) => props.onNextReviewChange(e.target.value)}
          className={inputClass}
        />
      </Field>

      <fieldset className="space-y-3 rounded-lg border border-slate-200 p-3">
        <legend className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Methodology (objeto top-level)
        </legend>
        <p className="text-[10px] text-slate-500">
          Aparece no schema + como <code>MethodologyBox</code> de página inteira
          (separado dos blocos inline do editor).
        </p>
        <Field label="Período">
          <input
            type="text"
            value={m.period ?? ""}
            onChange={(e) => update("period", e.target.value)}
            placeholder="Abril/2026"
            className={inputClass}
          />
        </Field>
        <Field label="Amostra">
          <input
            type="text"
            value={m.sample ?? ""}
            onChange={(e) => update("sample", e.target.value)}
            placeholder="234 imóveis ativos no CRM FYMOOB"
            className={inputClass}
          />
        </Field>
        <Field label="Fontes (separadas por vírgula)">
          <textarea
            value={(m.sources ?? []).join(", ")}
            onChange={(e) =>
              props.onMethodologyChange({
                ...m,
                sources: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            rows={2}
            className={inputClass}
          />
        </Field>
      </fieldset>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-slate-400">{hint}</span>}
    </label>
  )
}
