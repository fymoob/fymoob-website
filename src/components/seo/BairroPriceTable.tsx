import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, slugify } from "@/lib/utils"

interface BairroPriceTableProps {
  /** Properties pra agregacao. Ideal: lista representativa do tipo */
  properties: Property[]
  /** Tipo (apartamentos, casas, etc) — usado no link slug */
  tipoSlug: "apartamentos" | "casas" | "sobrados" | "terrenos"
  /** Limite de bairros mostrados */
  limit?: number
  /** Titulo do bloco */
  title?: string
}

/**
 * Tabela "Preco medio por bairro" — Fase 19.P2.Q.bonus.
 *
 * Agrega properties por bairro e renderiza tabela com count + preco
 * medio + faixa min/max + link pra landing combinada. Conteudo unico
 * + dados ao vivo do CRM = relevancia maxima pro Google.
 *
 * Server component — agregacao em build/SSR. Sem JS no client.
 */
export function BairroPriceTable({
  properties,
  tipoSlug,
  limit = 15,
  title = "Preço médio por bairro em Curitiba",
}: BairroPriceTableProps) {
  // Agregar por bairro: count + lista de precos
  const byBairro = new Map<
    string,
    { bairro: string; precos: number[]; areas: number[] }
  >()
  for (const p of properties) {
    if (!p.bairro) continue
    const price = p.precoVenda ?? p.precoAluguel
    if (!price || price <= 0) continue
    const slug = slugify(p.bairro)
    if (!byBairro.has(slug)) byBairro.set(slug, { bairro: p.bairro, precos: [], areas: [] })
    const entry = byBairro.get(slug)!
    entry.precos.push(price)
    if (p.areaPrivativa && p.areaPrivativa > 0) entry.areas.push(p.areaPrivativa)
  }

  // Calcular stats e ordenar por count desc
  const rows = Array.from(byBairro.entries())
    .map(([slug, info]) => {
      const sorted = [...info.precos].sort((a, b) => a - b)
      const median = sorted[Math.floor(sorted.length / 2)]
      const min = sorted[0]
      const max = sorted[sorted.length - 1]
      const avgArea =
        info.areas.length > 0
          ? info.areas.reduce((s, a) => s + a, 0) / info.areas.length
          : null
      return {
        bairro: info.bairro,
        slug,
        count: info.precos.length,
        median,
        min,
        max,
        avgArea,
      }
    })
    .filter((r) => r.count >= 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)

  if (rows.length === 0) return null

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-neutral-600">
          Dados ao vivo do nosso catálogo: {rows.length} bairros com{" "}
          {rows.reduce((s, r) => s + r.count, 0)} imóveis. Clique no bairro
          para ver as ofertas atualizadas.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="min-w-full divide-y divide-neutral-200 text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left font-semibold text-neutral-700"
                >
                  Bairro
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right font-semibold text-neutral-700"
                >
                  Disponíveis
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right font-semibold text-neutral-700"
                >
                  Preço mediano
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-right font-semibold text-neutral-700 sm:table-cell"
                >
                  Faixa
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-3 text-right font-semibold text-neutral-700 md:table-cell"
                >
                  Área média
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {rows.map((r) => (
                <tr key={r.slug} className="hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/imoveis/${r.slug}/${tipoSlug}`}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {r.bairro}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-700">
                    {r.count}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-neutral-900">
                    {formatPrice(r.median)}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-neutral-600 sm:table-cell">
                    {formatPrice(r.min)} – {formatPrice(r.max)}
                  </td>
                  <td className="hidden px-4 py-3 text-right text-neutral-600 md:table-cell">
                    {r.avgArea ? `${r.avgArea.toFixed(0)}m²` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Valores baseados em {rows.reduce((s, r) => s + r.count, 0)} imóveis
          ativos no nosso catálogo (atualizado em tempo real). Mediana usada para
          neutralizar outliers. Dados de mercado complementares: Índice FipeZAP
          (m² médio Curitiba R$ 11.621, mar/2026).
        </p>
      </div>
    </section>
  )
}
