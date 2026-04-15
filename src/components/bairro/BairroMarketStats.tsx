import { TrendingUp, Home, Maximize2, DollarSign, BedDouble, Layers } from "lucide-react"
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
  return `R$ ${Math.round(value).toLocaleString("pt-BR")}/m²`
}

const quartosLabel: Record<string, string> = {
  "1": "1 quarto",
  "2": "2 quartos",
  "3": "3 quartos",
  "4": "4 quartos",
  "5+": "5+ quartos",
}

export function BairroMarketStats({ stats }: Props) {
  const cards: { icon: typeof Home; label: string; value: string; hint?: string }[] = []

  if (stats.precoMedioVenda != null) {
    cards.push({
      icon: DollarSign,
      label: "Preço médio de venda",
      value: formatCompact(stats.precoMedioVenda),
      hint: `${stats.totalVenda} ${stats.totalVenda === 1 ? "imóvel" : "imóveis"}`,
    })
  }

  if (stats.precoM2Medio != null) {
    cards.push({
      icon: TrendingUp,
      label: "Preço médio por m²",
      value: formatM2(stats.precoM2Medio),
      hint: "Baseado em estoque ativo",
    })
  }

  if (stats.precoMedioAluguel != null) {
    cards.push({
      icon: Layers,
      label: "Aluguel médio",
      value: formatCompact(stats.precoMedioAluguel) + "/mês",
      hint: `${stats.totalAluguel} ${stats.totalAluguel === 1 ? "imóvel" : "imóveis"}`,
    })
  }

  if (stats.areaMediaVenda != null) {
    cards.push({
      icon: Maximize2,
      label: "Área média",
      value: `${stats.areaMediaVenda}m²`,
      hint: "Imóveis à venda",
    })
  }

  if (stats.precoMinVenda != null && stats.precoMaxVenda != null) {
    cards.push({
      icon: Home,
      label: "Faixa de preço",
      value: `${formatCompact(stats.precoMinVenda)} a ${formatCompact(stats.precoMaxVenda)}`,
      hint: "Mínimo até máximo",
    })
  }

  cards.push({
    icon: BedDouble,
    label: "Total de imóveis",
    value: String(stats.totalAtivos),
    hint: "Disponíveis agora",
  })

  const porQuartos = Object.entries(stats.precoMedioPorQuartos).sort(
    ([a], [b]) => (a === "5+" ? 6 : Number(a)) - (b === "5+" ? 6 : Number(b))
  )

  return (
    <section
      aria-label={`Dados de mercado do bairro ${stats.bairro}`}
      className="border-y border-neutral-200 bg-gradient-to-b from-neutral-50 to-white py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-neutral-950 sm:text-3xl">
              Mercado imobiliário em {stats.bairro}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Estatísticas com base nos {stats.totalAtivos} imóveis ativos no bairro
            </p>
          </div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Atualizado em tempo real via CRM
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {cards.map(({ icon: Icon, label, value, hint }) => (
            <div
              key={label}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-brand-primary">
                <Icon size={16} strokeWidth={2.2} />
                <span className="text-[11px] font-semibold uppercase tracking-wide">
                  {label}
                </span>
              </div>
              <p className="mt-2 font-display text-xl font-bold leading-tight text-neutral-950 sm:text-2xl">
                {value}
              </p>
              {hint && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
            </div>
          ))}
        </div>

        {porQuartos.length > 0 && (
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="font-display text-base font-semibold text-neutral-950">
              Preço médio de venda por número de quartos
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Útil para comparar tamanho × preço ao negociar em {stats.bairro}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {porQuartos.map(([key, preco]) => (
                <div
                  key={key}
                  className="rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-2.5 text-center"
                >
                  <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500">
                    {quartosLabel[key] ?? `${key} quartos`}
                  </p>
                  <p className="mt-0.5 font-display text-base font-bold text-neutral-950">
                    {formatCompact(preco)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
