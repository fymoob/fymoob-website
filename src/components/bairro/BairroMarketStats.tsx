import { TrendingUp, Home, Maximize2, DollarSign, Layers, Sparkles } from "lucide-react"
import type { BairroMarketStats as Stats } from "@/types/property"
import { formatPrice } from "@/lib/utils"

interface Props {
  stats: Stats
}

function formatCompact(value: number | null): string {
  if (value == null) return "—"
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace(".", ",")}mi`
  if (value >= 1_000) return `R$ ${Math.round(value / 1000)}k`
  return formatPrice(value)
}

function formatM2(value: number | null): string {
  if (value == null) return "—"
  return `R$ ${Math.round(value).toLocaleString("pt-BR")}`
}

const quartosLabel: Record<string, string> = {
  "1": "1 quarto",
  "2": "2 quartos",
  "3": "3 quartos",
  "4": "4 quartos",
  "5+": "5+ quartos",
}

export function BairroMarketStats({ stats }: Props) {
  const porQuartos = Object.entries(stats.precoMedioPorQuartos).sort(
    ([a], [b]) => (a === "5+" ? 6 : Number(a)) - (b === "5+" ? 6 : Number(b))
  )

  const hasHeroVenda = stats.precoMedioVenda != null
  const hasHeroM2 = stats.precoM2Medio != null

  // Secundários — só os que têm dado real
  const secondary: { icon: typeof Home; label: string; value: string; hint: string }[] = []

  if (stats.precoMedioAluguel != null) {
    secondary.push({
      icon: Layers,
      label: "Aluguel médio",
      value: formatCompact(stats.precoMedioAluguel),
      hint: `${stats.totalAluguel} ${stats.totalAluguel === 1 ? "imóvel" : "imóveis"} · /mês`,
    })
  }
  if (stats.areaMediaVenda != null) {
    secondary.push({
      icon: Maximize2,
      label: "Área média",
      value: `${stats.areaMediaVenda}m²`,
      hint: "Imóveis à venda",
    })
  }
  if (stats.precoMinVenda != null && stats.precoMaxVenda != null) {
    secondary.push({
      icon: Home,
      label: "Faixa de preço",
      value: `${formatCompact(stats.precoMinVenda)} — ${formatCompact(stats.precoMaxVenda)}`,
      hint: "Do mais acessível ao premium",
    })
  }
  secondary.push({
    icon: Sparkles,
    label: "Imóveis ativos",
    value: String(stats.totalAtivos),
    hint: `${stats.totalVenda} venda · ${stats.totalAluguel} aluguel`,
  })

  return (
    <section
      aria-label={`Dados de mercado do bairro ${stats.bairro}`}
      className="relative overflow-hidden border-y border-neutral-200 bg-gradient-to-b from-white via-neutral-50 to-white py-14 md:py-16"
    >
      {/* Ambient brand accent — discreet, editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 900px 220px at 50% -20%, rgba(41, 171, 226, 0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
              <span className="relative inline-flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand-primary" />
              </span>
              Atualizado em tempo real
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl">
              Mercado imobiliário em {stats.bairro}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
              Dados agregados a partir de {stats.totalAtivos} imóveis ativos no bairro — base viva,
              sem estoque congelado.
            </p>
          </div>
        </header>

        {/* Hero metrics — 2 cards destacados */}
        {(hasHeroVenda || hasHeroM2) && (
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {hasHeroVenda && (
              <article className="group relative overflow-hidden rounded-3xl border border-neutral-900/5 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 text-white shadow-lg shadow-neutral-900/10 sm:p-8">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, rgba(41, 171, 226, 0.25), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 text-brand-primary">
                    <DollarSign size={16} strokeWidth={2.5} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      Preço médio de venda
                    </span>
                  </div>
                  <p className="mt-4 font-display text-4xl font-black leading-none tracking-tight tabular-nums sm:text-5xl">
                    {formatCompact(stats.precoMedioVenda)}
                  </p>
                  <p className="mt-3 text-xs text-white/60">
                    Com base em {stats.totalVenda} {stats.totalVenda === 1 ? "imóvel" : "imóveis"} à venda no bairro
                  </p>
                </div>
              </article>
            )}

            {hasHeroM2 && (
              <article className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                <div className="flex items-center gap-2 text-brand-primary">
                  <TrendingUp size={16} strokeWidth={2.5} />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    Preço médio por m²
                  </span>
                </div>
                <p className="mt-4 font-display text-4xl font-black leading-none tracking-tight tabular-nums text-neutral-950 sm:text-5xl">
                  {formatM2(stats.precoM2Medio)}
                  <span className="ml-1 text-2xl font-bold text-neutral-500 sm:text-3xl">/m²</span>
                </p>
                <p className="mt-3 text-xs text-neutral-500">
                  Referência para comparar oportunidades rapidamente
                </p>
              </article>
            )}
          </div>
        )}

        {/* Secondary metrics — grid 2/4 */}
        {secondary.length > 0 && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {secondary.map(({ icon: Icon, label, value, hint }) => (
              <article
                key={label}
                className="group rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-brand-primary/30 hover:shadow-sm sm:p-5"
              >
                <div className="flex items-center gap-2 text-neutral-500 transition-colors group-hover:text-brand-primary">
                  <Icon size={14} strokeWidth={2.2} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <p className="mt-2 font-display text-xl font-bold leading-tight tracking-tight tabular-nums text-neutral-950 sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-neutral-500">{hint}</p>
              </article>
            ))}
          </div>
        )}

        {/* Breakdown por quartos */}
        {porQuartos.length > 0 && (
          <article className="mt-8 overflow-hidden rounded-3xl border border-neutral-200 bg-white">
            <header className="border-b border-neutral-100 bg-neutral-50/50 px-5 py-4 sm:px-8 sm:py-5">
              <h3 className="font-display text-base font-semibold text-neutral-950 sm:text-lg">
                Preço médio por número de quartos
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Comparativo para negociar com contexto real em {stats.bairro}
              </p>
            </header>
            <div
              className="grid divide-neutral-100"
              style={{
                gridTemplateColumns: `repeat(${Math.min(porQuartos.length, 5)}, minmax(0, 1fr))`,
              }}
            >
              {porQuartos.map(([key, preco], idx) => (
                <div
                  key={key}
                  className={`px-4 py-5 text-center sm:px-6 sm:py-6 ${
                    idx > 0 ? "border-l border-neutral-100" : ""
                  }`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                    {quartosLabel[key] ?? `${key} quartos`}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold tabular-nums text-neutral-950 sm:text-xl">
                    {formatCompact(preco)}
                  </p>
                </div>
              ))}
            </div>
          </article>
        )}

        {/* Footer note */}
        <p className="mt-6 text-[11px] leading-relaxed text-neutral-400">
          Médias calculadas sobre o estoque ativo do CRM no momento desta visualização. Dados
          disponíveis sob licença CC-BY 4.0 — cite como fonte "FYMOOB Imobiliária — fymoob.com".
        </p>
      </div>
    </section>
  )
}
