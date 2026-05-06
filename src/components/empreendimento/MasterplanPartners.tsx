import Image from "next/image"
import type { EmpreendimentoAssets } from "@/data/empreendimento-assets"

type Partner = NonNullable<EmpreendimentoAssets["partners"]>[number]

interface MasterplanPartnersProps {
  partners: Partner[]
  empreendimentoNome: string
}

/**
 * Frente C — Sprint design 06/05/2026.
 *
 * Seção "Quem assina" pra empreendimentos editoriais. Reforça autoridade
 * do produto exibindo incorporadora + escritórios de arquitetura/design +
 * parceiros técnicos. Padrão de comunicação luxury (JHSF/Cyrela
 * vendem branding — Pininfarina, Fasano, Dolce&Gabbana).
 *
 * Layout:
 * - Bg branco
 * - Caption dourado pequeno + headline serif italic
 * - Grid de cards (1 coluna mobile / 2-4 colunas desktop dependendo da
 *   quantidade de parceiros)
 * - Cada card: logo (opcional, fallback inicial) + role + nome +
 *   credential
 *
 * Server Component — zero JS no cliente.
 */
export function MasterplanPartners({ partners, empreendimentoNome }: MasterplanPartnersProps) {
  if (partners.length === 0) return null

  // Define grid columns dinamicamente baseado na qty
  const gridCols =
    partners.length <= 2
      ? "md:grid-cols-2"
      : partners.length === 3
        ? "md:grid-cols-3"
        : "md:grid-cols-2 lg:grid-cols-4"

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        // Mesmo dark warm + toque dourado da seção de intro do empreendimento
        // (page.tsx linha ~651). Cria coesão visual com o ritmo dark/light do
        // hero e respiro editorial entre Stats (branco) e Plantas (branco).
        background:
          "radial-gradient(circle at 30% 45%, rgba(195,168,107,0.07), transparent 40%), #151716",
      }}
    >
      {/* Linhas finas top/bottom em dourado quase-transparente — moldura
          editorial sutil. Padrão visto em hotelaria luxury (Aman, Belmond). */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a876]/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c9a876]/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p data-reveal className="text-[10px] tracking-[0.4em] text-[#c9a876] sm:text-[11px]">
            QUEM ASSINA
          </p>
          <h2
            data-reveal
            className="mt-4 font-serif text-3xl font-light italic tracking-tight text-white/95 sm:text-4xl lg:text-5xl"
          >
            Time por trás do {empreendimentoNome}
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-2xl text-sm text-white/55">
            Incorporação, arquitetura e engenharia de escritórios reconhecidos no
            mercado de alto padrão de Curitiba.
          </p>
        </div>

        <div
          className={`mx-auto mt-16 grid grid-cols-1 gap-12 md:gap-10 ${gridCols}`}
          data-reveal-stagger
        >
          {partners.map((partner) => (
            <div
              key={`${partner.role}-${partner.name}`}
              className="flex flex-col items-center text-center"
            >
              {/* Logos sem chip — wordmarks claros (Avantti dourado, Bacoccinni
                  e Takeda cinza-claro) foram desenhados pra contexto dark e
                  ganham presença natural aqui. Filter brightness sutil garante
                  legibilidade mesmo em logo de paleta cinza. */}
              <div className="flex h-24 w-full items-center justify-center px-6">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    width={240}
                    height={96}
                    className="h-auto max-h-16 w-auto max-w-[200px] object-contain brightness-[1.15] contrast-[1.05]"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 font-serif text-2xl font-light italic text-white/75"
                    aria-hidden="true"
                  >
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Linha dourada fina como separador editorial (alinhado com Stats) */}
              <div className="mx-auto mt-5 h-px w-10 bg-[#c9a876]/60" aria-hidden="true" />

              <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#c9a876]/85 sm:text-[11px]">
                {partner.role}
              </p>
              <p className="mt-2 font-serif text-xl font-light text-white/95 sm:text-2xl">
                {partner.name}
              </p>
              {partner.credential && (
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/55">
                  {partner.credential}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
