"use client"

interface Props {
  readingTime: number | null
  onReadingTimeChange: (v: number | null) => void
  seoOgImageUrl: string
  onSeoOgImageUrlChange: (v: string) => void
  updatedAt: Date | null
}

export function MetadataTab(props: Props) {
  return (
    <div className="space-y-4">
      <Field
        label="Tempo de leitura (minutos)"
        hint="Calculado automaticamente do body. Override só se quiser sobrescrever."
      >
        <input
          type="number"
          min={1}
          max={120}
          value={props.readingTime ?? ""}
          onChange={(e) => {
            const v = e.target.value
            props.onReadingTimeChange(v === "" ? null : Math.max(1, Number(v)))
          }}
          className={inputClass}
        />
      </Field>

      <Field
        label="Última atualização"
        hint="Atualiza automaticamente a cada save."
      >
        <input
          type="text"
          value={
            props.updatedAt
              ? props.updatedAt.toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })
              : "—"
          }
          readOnly
          disabled
          className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
        />
      </Field>

      <Field
        label="Open Graph image (override)"
        hint="Default: imagem de capa. Override pra quando quiser OG diferente do hero."
      >
        <input
          type="url"
          value={props.seoOgImageUrl}
          onChange={(e) => props.onSeoOgImageUrlChange(e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>
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
