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
      <p className="rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2 text-[11px] leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
        <strong>Conteúdos sensíveis</strong> (financeiro, jurídico, médico,
        questões de família) precisam mostrar quem revisou e como apuramos
        os dados — caso contrário o Google rebaixa o artigo nos resultados
        de busca.
      </p>

      <Field
        label="Quem revisou o artigo"
        hint='Nome do responsável que conferiu os dados. Ex: "Bruno César", "Equipe FYMOOB"'
      >
        <input
          type="text"
          value={props.reviewedBy}
          onChange={(e) => props.onReviewedByChange(e.target.value)}
          className={inputClass}
        />
      </Field>

      <Field
        label="Data da próxima revisão"
        hint="Quando este artigo deve ser revisado novamente. Conteúdo financeiro: a cada 3 meses. Conteúdo geral: anual."
      >
        <input
          type="date"
          value={props.nextReview ? props.nextReview.slice(0, 10) : ""}
          onChange={(e) => props.onNextReviewChange(e.target.value)}
          className={inputClass}
        />
      </Field>

      <fieldset className="space-y-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
        <legend className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Como apuramos este artigo
        </legend>
        <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">
          Estes dados aparecem em uma caixa destacada no início do artigo,
          mostrando ao leitor (e ao Google) que o conteúdo é confiável.
        </p>
        <Field label="Período dos dados">
          <input
            type="text"
            value={m.period ?? ""}
            onChange={(e) => update("period", e.target.value)}
            placeholder="Ex: Abril de 2026"
            className={inputClass}
          />
        </Field>
        <Field label="Tamanho da amostra analisada">
          <input
            type="text"
            value={m.sample ?? ""}
            onChange={(e) => update("sample", e.target.value)}
            placeholder="Ex: 234 imóveis ativos no nosso CRM"
            className={inputClass}
          />
        </Field>
        <Field
          label="Fontes consultadas"
          hint="Separe cada fonte com vírgula. Ex: FipeZap, Caixa Econômica, Prefeitura de Curitiba"
        >
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
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"

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
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">{hint}</span>}
    </label>
  )
}
