import Image from "next/image"
import { getPropertyFeatureIcon } from "@/components/property/propertyFeatureIcons"
import type { EmpreendimentoAssets } from "@/data/empreendimento-assets"

type AmenityCard = NonNullable<EmpreendimentoAssets["amenitiesShowcase"]>[number]

interface AmenitiesShowcaseProps {
  showcase: AmenityCard[]
  fullList: string[]
  empreendimentoNome: string
}

/**
 * Frente A — Sprint design 06/05/2026.
 *
 * Substitui a seção #infraestrutura quando o empreendimento tem
 * `amenitiesShowcase` configurado. Antes: grid flat de 42 ícones idênticos
 * (UX de imobiliária comum). Agora: 6-8 cards visuais grandes com renders
 * dos amenities-âncora + lista completa colapsada num <details> nativo
 * (SEO preservado, zero JS).
 *
 * Padrão luxury: foto/render hero do espaço + nome + descrição editorial
 * curta. Lista exaustiva fica como referência secundária.
 *
 * Server Component — <details>/<summary> nativos = zero JS no client.
 */
export function AmenitiesShowcase({
  showcase,
  fullList,
  empreendimentoNome,
}: AmenitiesShowcaseProps) {
  if (showcase.length === 0 && fullList.length === 0) return null

  return (
    <section id="infraestrutura" className="bg-neutral-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p data-reveal className="text-[10px] tracking-[0.4em] text-[#c9a876] sm:text-[11px]">
            LAZER COMPLETO
          </p>
          <h2
            data-reveal
            className="mt-4 font-serif text-3xl font-light italic tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Lazer pensado em escala de hotel
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-2xl text-sm text-neutral-500">
            {fullList.length > 0
              ? `${fullList.length} itens de lazer e conveniência. Áreas comuns equipadas pra que cada unidade seja apenas o seu refúgio.`
              : "Áreas comuns completas pra que cada unidade seja apenas o seu refúgio."}
          </p>
        </div>

        {/* Showcase grid — 2 colunas mobile, 3 colunas desktop */}
        {showcase.length > 0 && (
          <div
            className="mx-auto mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-reveal-stagger
          >
            {showcase.map((amenity, idx) => (
              <article
                key={amenity.name}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-100 transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={amenity.image}
                    alt={`${amenity.name} — render do ${empreendimentoNome}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading={idx < 3 ? "eager" : "lazy"}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-serif text-lg font-light tracking-tight text-neutral-900 sm:text-xl">
                    {amenity.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    {amenity.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Lista completa — accordion nativo HTML5, SEO friendly, zero JS */}
        {fullList.length > 0 && (
          <details
            className="mx-auto mt-14 max-w-5xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8"
            data-reveal
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-neutral-700 transition hover:text-neutral-900">
              <span className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a876]">
                  Lista completa
                </span>
                <span className="text-neutral-400">·</span>
                <span>Ver todos os {fullList.length} itens</span>
              </span>
              <svg
                className="h-4 w-4 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
              {fullList.map((item) => {
                const Icon = getPropertyFeatureIcon(item)
                return (
                  <div key={item} className="flex items-center gap-3">
                    <Icon
                      className="h-5 w-5 shrink-0 text-[#c9a876]"
                      strokeWidth={1.8}
                    />
                    <span className="text-sm text-neutral-700">{item}</span>
                  </div>
                )
              })}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
