import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Property } from "@/types/property"
import { formatPrice } from "@/lib/utils"
import { chooseListingBadge, getBadgeLabel, type ListingBadge } from "./chooseListingBadge"
import {
  getEditorialTitle,
  getRowAccolade,
  getRowAccoladeLabel,
  getTorreAccent,
} from "./editorial"

interface UnitsTableProps {
  properties: Property[]
  badge?: ListingBadge
  /** Slug curto da torre (lago/colina/mirante) — define cor signature S5 */
  torreSlug?: string
  /**
   * Conjunto de imoveis irmaos da torre — usado pra calcular accolades
   * (mais acessivel, maior area, etc). Quando nao passado, usa as
   * `properties` em si como base de comparacao.
   */
  siblings?: Property[]
}

/**
 * Sprint design 06/05/2026 — S4 + S5 (revisao "menu degustacao").
 *
 * Lista editorial de unidades. Substitui a tabela classica (com colunas
 * uniformes) por um formato magazine-style: cada row e uma "linha do menu"
 * com tipografia editorial, accolades de raridade ("Mais acessivel",
 * "Maior area") e accent color da torre no hover.
 *
 * - Tipologia em serif italic 20-24px
 * - Stats inline pequenos cinza (area · quartos · vagas)
 * - Preco serif extralight alinhado a direita
 * - Tag dourada de raridade so onde aplica (1 por torre)
 * - Hover: bg neutral-50 + border-l accent da torre
 *
 * Server Component — zero JS no client. Stagger via CSS scroll-driven
 * (`data-reveal-rows`).
 */
export function UnitsTable({
  properties,
  badge,
  torreSlug,
  siblings,
}: UnitsTableProps) {
  if (properties.length === 0) return null

  const compareSet = siblings ?? properties
  const resolvedBadge = badge ?? chooseListingBadge(properties)
  const accent = getTorreAccent(torreSlug)

  return (
    <ul className="divide-y divide-neutral-100" data-reveal-rows>
      {properties.map((p) => {
        const editorialTitle = getEditorialTitle(p)
        const badgeLabel = resolvedBadge ? getBadgeLabel(resolvedBadge, p) : null
        const accolade = getRowAccolade(p, compareSet)
        const accoladeLabel = getRowAccoladeLabel(accolade)
        const area = p.areaPrivativa ?? p.areaTotal

        // Stats inline — depende de tipo (comercial omite quartos/suites)
        const isCommercial = /loja|sala|comercial|conjunto/i.test(p.tipo || "")
        const inlineStats: string[] = []
        if (area) inlineStats.push(`${Math.round(area)} m²`)
        if (!isCommercial) {
          if (p.dormitorios !== null && p.dormitorios > 0) {
            inlineStats.push(
              `${p.dormitorios} ${p.dormitorios === 1 ? "quarto" : "quartos"}`,
            )
          }
        }
        if (p.vagas !== null && p.vagas > 0) {
          inlineStats.push(
            `${p.vagas} ${p.vagas === 1 ? "vaga" : "vagas"}`,
          )
        }

        return (
          <li
            key={p.codigo}
            className="group relative transition-colors duration-300"
            style={
              {
                "--accent-color": accent.color,
                "--accent-bg": accent.bgSoft,
              } as React.CSSProperties
            }
          >
            <Link
              href={p.url}
              className="block py-6 transition-colors duration-300 hover:[background:var(--accent-bg)] sm:py-8 sm:[grid-template-columns:1fr_auto] sm:[display:grid] sm:items-center sm:gap-6 sm:px-2"
            >
              {/* Border-l accent — aparece no hover */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-origin:top] group-hover:scale-y-100"
                style={{ backgroundColor: accent.color, opacity: 0.5 }}
              />

              {/* COLUNA ESQUERDA: tipologia + stats + accolade */}
              <div className="min-w-0 px-5 sm:px-3 lg:px-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h4 className="font-serif text-xl font-light italic leading-tight tracking-tight text-neutral-900 sm:text-2xl">
                    {editorialTitle}
                  </h4>

                  {/* Accolade chip — raridade editorial */}
                  {accoladeLabel && (
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.25em]"
                      style={{
                        color: accent.color,
                        borderColor: accent.borderSoft,
                        backgroundColor: accent.bgSoft,
                      }}
                    >
                      {accoladeLabel}
                    </span>
                  )}

                  {/* Badge lancamento (so quando o badge global e 'launch') */}
                  {badgeLabel && resolvedBadge === "launch" && (
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.25em]"
                      style={{
                        color: accent.color,
                        borderColor: accent.borderSoft,
                      }}
                    >
                      {badgeLabel}
                    </span>
                  )}
                </div>

                {/* Stats inline + codigo */}
                <p className="mt-2 text-[12px] tracking-[0.04em] text-neutral-500 sm:text-[13px]">
                  {inlineStats.join(" · ") || "—"}
                  {p.codigo ? (
                    <span className="ml-2 text-neutral-300">· {p.codigo}</span>
                  ) : null}
                </p>
              </div>

              {/* COLUNA DIREITA: preço + chip arrow */}
              <div className="mt-3 flex items-center justify-between gap-4 px-5 sm:mt-0 sm:justify-end sm:px-3 lg:px-5">
                {p.precoVenda ? (
                  <p className="font-serif text-xl font-extralight tracking-tight text-neutral-900 sm:text-2xl">
                    {formatPrice(p.precoVenda)}
                  </p>
                ) : (
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400">
                    Sob consulta
                  </p>
                )}

                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-500 transition group-hover:bg-[var(--accent-color)] group-hover:[border-color:var(--accent-color)] group-hover:text-white"
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
