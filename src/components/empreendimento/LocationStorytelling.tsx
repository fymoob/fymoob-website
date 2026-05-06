import Image from "next/image"
import { MapPin, Trees, ShoppingBag, Car, UtensilsCrossed, Hospital, GraduationCap } from "lucide-react"
import type { EmpreendimentoAssets } from "@/data/empreendimento-assets"

type NearbyPlace = NonNullable<EmpreendimentoAssets["nearbyPlaces"]>[number]
type Category = NearbyPlace["category"]

interface LocationStorytellingProps {
  empreendimentoNome: string
  nearbyPlaces: NearbyPlace[]
  aerialImage?: string
  endereco?: { endereco: string; numero: string; cep?: string; bairro?: string }
  bairro?: string
  mapEmbedUrl?: string
}

const CATEGORY_ICONS: Record<Category, typeof Trees> = {
  parque: Trees,
  shopping: ShoppingBag,
  transporte: Car,
  saude: Hospital,
  educacao: GraduationCap,
  gastronomia: UtensilsCrossed,
}

/**
 * Frente B — Sprint design 06/05/2026.
 *
 * Substitui o iframe puro do Google Maps em #localizacao por uma
 * narrativa visual: foto aérea + lista curada "Tudo a 5 minutos" +
 * iframe Google em <details> colapsado.
 *
 * Padrão luxury: vender lifestyle/contexto (parque, shopping, escola
 * próximos com tempo) em vez de apenas marcar coordenada num mapa.
 *
 * Server Component — <details> nativo, zero JS no client.
 */
export function LocationStorytelling({
  empreendimentoNome,
  nearbyPlaces,
  aerialImage,
  endereco,
  bairro,
  mapEmbedUrl,
}: LocationStorytellingProps) {
  const enderecoText = endereco
    ? [endereco.endereco, endereco.numero, bairro].filter(Boolean).join(", ")
    : null

  return (
    <section id="localizacao" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p data-reveal className="text-[10px] tracking-[0.4em] text-[#c9a876] sm:text-[11px]">
            ENDEREÇO PRIVILEGIADO
          </p>
          <h2
            data-reveal
            className="mt-4 font-serif text-3xl font-light italic tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Localização
          </h2>
          {enderecoText && (
            <p
              data-reveal
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-500"
            >
              <MapPin className="h-3.5 w-3.5" /> {enderecoText}, Curitiba — PR
            </p>
          )}
        </div>

        {/* Grid duplo: foto aérea (esquerda) + lista de proximidades (direita) */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          {/* Foto aérea com overlay sutil + caption editorial */}
          {aerialImage ? (
            <div
              data-reveal
              className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200 lg:aspect-auto"
            >
              <Image
                src={aerialImage}
                alt={`Vista aérea do ${empreendimentoNome} — Mossunguê, Curitiba`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-8 sm:pb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/75">
                  Vista aérea
                </p>
                <p className="mt-1 font-serif text-lg italic text-white/95 sm:text-xl">
                  Mossunguê, Curitiba — em frente ao Parque Barigui
                </p>
              </div>
            </div>
          ) : (
            // Fallback quando não temos aerial — mostra Mapa direto
            mapEmbedUrl && (
              <div
                data-reveal
                className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-neutral-200 lg:aspect-auto"
              >
                <iframe
                  src={mapEmbedUrl}
                  title="Localização"
                  className="h-full w-full"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )
          )}

          {/* Lista "Tudo a 5 minutos" */}
          {nearbyPlaces.length > 0 && (
            <div data-reveal className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a876]">
                Tudo perto
              </p>
              <h3 className="mt-2 font-serif text-2xl font-light italic tracking-tight text-neutral-900 sm:text-3xl">
                Tudo a 5 minutos
              </h3>
              <ul className="mt-6 space-y-1">
                {nearbyPlaces.map((place) => {
                  const Icon = CATEGORY_ICONS[place.category] ?? MapPin
                  return (
                    <li
                      key={place.name}
                      className="flex items-center justify-between gap-4 border-b border-neutral-100 py-3 last:border-b-0"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <Icon
                          className="h-4 w-4 shrink-0 text-[#c9a876]"
                          strokeWidth={1.8}
                        />
                        <span className="truncate text-sm text-neutral-700">
                          {place.name}
                        </span>
                      </div>
                      <span className="shrink-0 text-[12px] uppercase tracking-[0.15em] text-neutral-400">
                        {place.distance}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Mapa Google em accordion — fallback secundário */}
        {mapEmbedUrl && aerialImage && (
          <details
            className="mx-auto mt-10 max-w-5xl rounded-xl border border-neutral-200 bg-white p-5"
            data-reveal
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-neutral-700 transition hover:text-neutral-900">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#c9a876]" strokeWidth={1.8} />
                <span>Ver no Google Maps</span>
              </span>
              <svg
                className="h-4 w-4 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-5 overflow-hidden rounded-lg">
              <iframe
                src={mapEmbedUrl}
                title="Localização no Google Maps"
                className="h-[420px] w-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
