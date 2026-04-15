import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Building2, MapPin, BedDouble, Car, ShowerHead, Phone, ChevronDown } from "lucide-react"
import {
  getAllEmpreendimentos,
  getPropertiesByEmpreendimento,
} from "@/services/loft"
import { slugify, formatPrice, formatArea } from "@/lib/utils"
import { generateItemListSchema, generateLandingStats, generateDynamicFAQ } from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { DynamicFAQ } from "@/components/seo/DynamicFAQ"
import { RelatedPages } from "@/components/seo/RelatedPages"
import { PropertyMap } from "@/components/property/PropertyMap"
import { getPropertyFeatureIcon } from "@/components/property/propertyFeatureIcons"
import { getEmpreendimentoAssets, hasEditorialLayout } from "@/data/empreendimento-assets"
import { PlantasCarousel } from "@/components/empreendimento/PlantasCarousel"
import { PlantasGallery } from "@/components/empreendimento/PlantasGallery"
import type { Property } from "@/types/property"

interface EmpreendimentoPageProps {
  params: Promise<{ slug: string }>
}

// 2 hours — empreendimento pages change even less than individual imóveis
// (new launches, not daily edits). Reduces ISR writes by ~87% vs the
// previous 900s setting.
export const revalidate = 7200
export const dynamicParams = true

const FYMOOB_PHONE = "5541999780517"

export async function generateStaticParams() {
  try {
    const empreendimentos = await getAllEmpreendimentos()
    return empreendimentos.map((e) => ({ slug: e.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: EmpreendimentoPageProps): Promise<Metadata> {
  const { slug } = await params
  const empreendimentos = await getAllEmpreendimentos()
  const emp = empreendimentos.find((e) => e.slug === slug)
  if (!emp) return {}

  const precoText = emp.precoMin && emp.precoMax ? `Preços de ${formatPrice(emp.precoMin)} a ${formatPrice(emp.precoMax)}.` : ""
  const bairroText = emp.bairros.length > 0 ? emp.bairros.join(", ") : "Curitiba"
  const assets = getEmpreendimentoAssets(slug)

  return {
    title: `${emp.nome} | ${bairroText} — FYMOOB`,
    description: `${emp.nome} em ${bairroText}, Curitiba. ${emp.total} unidades disponíveis. ${precoText} ${emp.construtora ? `Construtora ${emp.construtora}.` : ""} FYMOOB Imobiliária.`.trim(),
    alternates: { canonical: `/empreendimento/${slug}` },
    openGraph: {
      title: `${emp.nome} | ${bairroText} - Curitiba`,
      description: `${emp.total} unidades disponíveis no ${emp.nome}. ${precoText}`,
      images: assets?.heroImage ? [{ url: assets.heroImage, width: 1200, height: 630 }] : emp.imageUrl ? [{ url: emp.imageUrl, width: 1200, height: 630 }] : undefined,
    },
  }
}

function groupUnitTypes(properties: Property[]) {
  const groups = new Map<string, { properties: Property[]; area: number; dorms: number; suites: number; banheiros: number; vagas: number; precoMin: number; foto: string }>()
  for (const p of properties) {
    const key = `${p.tipo} ${p.dormitorios || 0}q ${Math.round(p.areaPrivativa || 0)}m²`
    if (!groups.has(key)) {
      groups.set(key, { properties: [], area: p.areaPrivativa || 0, dorms: p.dormitorios || 0, suites: p.suites || 0, banheiros: p.banheiros || 0, vagas: p.vagas || 0, precoMin: p.precoVenda || p.precoAluguel || 0, foto: p.fotoDestaque || "" })
    }
    const g = groups.get(key)!
    g.properties.push(p)
    const preco = p.precoVenda || p.precoAluguel || 0
    if (preco > 0 && (preco < g.precoMin || g.precoMin === 0)) g.precoMin = preco
  }
  return Array.from(groups.entries()).map(([key, g]) => ({ key, ...g, count: g.properties.length })).sort((a, b) => a.area - b.area)
}

export default async function EmpreendimentoPage({ params }: EmpreendimentoPageProps) {
  const { slug } = await params
  const empreendimentos = await getAllEmpreendimentos()
  const emp = empreendimentos.find((e) => e.slug === slug)
  if (!emp) notFound()

  const properties = await getPropertiesByEmpreendimento(emp.nome)
  const assets = getEmpreendimentoAssets(slug)

  const precos = properties.map((p) => p.precoVenda ?? p.precoAluguel).filter((p): p is number => p !== null && p > 0)
  const precoMin = precos.length > 0 ? Math.min(...precos) : null
  const precoMax = precos.length > 0 ? Math.max(...precos) : null
  const areas = properties.map((p) => p.areaPrivativa).filter((a): a is number => a !== null && a > 0)
  const areaMin = areas.length > 0 ? Math.min(...areas) : null
  const areaMax = areas.length > 0 ? Math.max(...areas) : null

  const tipos = [...new Set(properties.map((p) => p.tipo))]
  const bairros = [...new Set(properties.map((p) => p.bairro).filter(Boolean))]
  const construtora = properties.find((p) => p.construtora)?.construtora || emp.construtora
  const descricao = assets?.descricaoMarketing || properties.find((p) => p.descricaoEmpreendimento)?.descricaoEmpreendimento
  const situacao = properties.find((p) => p.situacao)?.situacao
  const endereco = properties.find((p) => p.endereco)
  const allPhotos = [...new Set(properties.flatMap((p) => [p.fotoDestaque, ...p.fotos]).filter(Boolean))]
  const heroPhotos = allPhotos.slice(0, 8)
  const infraestrutura = [...new Set(properties.flatMap((p) => p.infraestrutura))].sort()
  const unitTypes = groupUnitTypes(properties)
  const lat = properties.find((p) => p.latitude)?.latitude || null
  const lng = properties.find((p) => p.longitude)?.longitude || null
  const videoUrl = assets?.videoUrl || properties.find((p) => p.urlVideo)?.urlVideo

  // Auto-extract plantas from CRM: fotos with Tipo="Planta"
  // Wagner marks photos as "Planta" in the Loft CRM photo editor
  const plantasFromCRM = [...new Set(
    properties.flatMap((p) =>
      (p.fotosPorTipo || [])
        .filter((f) => f.tipo.toLowerCase() === "planta")
        .map((f) => f.foto)
    )
  )]
  // Static fallback is ONLY applied when the slug explicitly matches an
  // editorial empreendimento. For standard empreendimentos we ONLY show
  // plantas that come from their OWN properties in the CRM.
  const plantasFinal = plantasFromCRM.length > 0
    ? plantasFromCRM
    : (hasEditorialLayout(slug) ? (assets?.plantas || []) : [])

  const itemListSchema = generateItemListSchema(properties, `/empreendimento/${slug}`)
  const realEstateSchema = {
    "@context": "https://schema.org", "@type": "RealEstateListing", name: emp.nome,
    description: descricao || `${emp.total} unidades disponíveis no ${emp.nome}`,
    url: `https://fymoob.com/empreendimento/${slug}`,
    image: assets?.heroImage || emp.imageUrl || undefined,
    offers: precoMin ? { "@type": "AggregateOffer", lowPrice: precoMin, highPrice: precoMax || precoMin, priceCurrency: "BRL", offerCount: properties.length } : undefined,
    address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" },
  }

  const whatsMessage = `Olá! Tenho interesse no empreendimento ${emp.nome}. Gostaria de mais informações.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`
  const hasEditorial = hasEditorialLayout(slug) && assets

  if (!hasEditorial || !assets) {
    // Standard layout (existing) for empreendimentos without custom assets
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([realEstateSchema, itemListSchema]) }} />
        <section className="bg-[#0d0d0d]">
          <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
            <div className="[&_nav]:text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_span]:text-white/80">
              <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Empreendimentos", url: "/empreendimentos" }, { name: emp.nome, url: `/empreendimento/${slug}` }]} />
            </div>
          </div>
          {heroPhotos.length > 0 && (
            <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:grid-cols-4 sm:grid-rows-2 sm:gap-3 md:h-[420px]">
                <div className="relative col-span-2 row-span-2 min-h-[240px]">
                  <Image src={heroPhotos[0]} alt={`${emp.nome} — foto principal`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" priority />
                </div>
                {heroPhotos.slice(1, 5).map((foto, i) => (
                  <div key={i} className="relative hidden min-h-[120px] sm:block">
                    <Image src={foto} alt={`${emp.nome} — foto ${i + 2}`} fill className="object-cover" sizes="25vw" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl font-light tracking-tight text-white sm:text-5xl">{emp.nome}</h1>
            {construtora && <p className="mt-3 flex items-center gap-1.5 text-sm text-neutral-300"><Building2 className="h-4 w-4 text-[#c9a876]" /> Construtora {construtora}</p>}
            {bairros.length > 0 && <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-400"><MapPin className="h-4 w-4 text-[#c9a876]" /> {bairros.join(", ")}, Curitiba - PR</p>}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"><p className="font-serif text-2xl font-light text-white">{properties.length}</p><p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">{properties.length === 1 ? "Unidade" : "Unidades"}</p></div>
              {precoMin && <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"><p className="font-serif text-lg font-light text-white">{formatPrice(precoMin)}</p><p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">A partir de</p></div>}
              {areaMin && areaMax && <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"><p className="font-serif text-lg font-light text-white">{areaMin === areaMax ? `${formatArea(areaMin)} m²` : `${formatArea(areaMin)} - ${formatArea(areaMax)} m²`}</p><p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">Área privativa</p></div>}
              {tipos.length > 0 && <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"><p className="font-serif text-sm font-light text-white">{tipos.join(", ")}</p><p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400">{tipos.length === 1 ? "Tipo" : "Tipos"}</p></div>}
            </div>
          </div>
        </section>
        <StandardContent emp={emp} properties={properties} precoMin={precoMin} precoMax={precoMax} bairros={bairros} unitTypes={unitTypes} infraestrutura={infraestrutura} lat={lat} lng={lng} endereco={endereco} construtora={construtora} slug={slug} empreendimentos={empreendimentos} whatsUrl={whatsUrl} descricao={descricao} plantas={plantasFinal} />
      </>
    )
  }

  // ============================================
  // EDITORIAL LAYOUT (Reserva Barigui and others with full assets)
  // ============================================
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([realEstateSchema, itemListSchema]) }} />

      {/* ===== EDITORIAL HERO — 65vh with logo centered ===== */}
      <section className="relative flex h-[65vh] min-h-[500px] items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0">
          <Image
            src={assets.heroImage}
            alt={emp.nome}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute top-6 left-0 right-0 z-10 sm:top-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="[&_nav]:text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/90">
              <Breadcrumbs items={[{ name: "Home", url: "/" }, { name: "Empreendimentos", url: "/empreendimentos" }, { name: emp.nome, url: `/empreendimento/${slug}` }]} />
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          {assets.tagline && (
            <p className="text-[10px] tracking-[0.35em] text-white/80 sm:text-xs">
              {assets.tagline}
            </p>
          )}

          {assets.subtitulo && (
            <p className="mt-6 text-[10px] tracking-[0.4em] text-white/60">
              {assets.subtitulo}
            </p>
          )}

          {assets.logo ? (
            <div className="mt-4 flex justify-center">
              <Image
                src={assets.logo}
                alt={`Logo ${emp.nome}`}
                width={500}
                height={240}
                className="h-auto max-h-[160px] w-auto max-w-[70vw] object-contain sm:max-h-[220px] sm:max-w-[420px]"
                priority
              />
            </div>
          ) : (
            <h1 className="mt-6 font-serif text-5xl font-light italic tracking-widest text-white sm:text-6xl lg:text-7xl">
              {emp.nome}
            </h1>
          )}
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
          <ChevronDown className="h-5 w-5 animate-bounce text-white/60" />
        </div>
      </section>

      {/* ===== SECTION 1 — Intro with video ===== */}
      <section className="relative bg-[#1a1a1a] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-serif text-3xl font-light italic leading-tight tracking-tight text-[#c9a876] sm:text-4xl lg:text-5xl">Na frente, o parque.</p>
              <p className="mt-2 font-serif text-3xl font-light italic leading-tight tracking-tight text-[#c9a876] sm:text-4xl lg:text-5xl">Ao lado, o shopping.</p>
              <p className="mt-2 font-serif text-3xl font-light italic leading-tight tracking-tight text-[#c9a876] sm:text-4xl lg:text-5xl">E no centro, você.</p>

              {descricao && (
                <div className="mt-10 whitespace-pre-line text-[15px] leading-relaxed text-neutral-300">
                  {descricao}
                </div>
              )}

              {precoMin && (
                <div className="mt-10 flex items-baseline gap-3">
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-400">A partir de</p>
                  <p className="font-serif text-3xl font-light text-white">{formatPrice(precoMin)}</p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1da851]"
                >
                  <svg viewBox="0 0 24 24" className="size-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>
                  Falar pelo WhatsApp
                </a>
                <Link
                  href="#empreendimentos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/90 transition hover:border-white/40 hover:bg-white/5"
                >
                  Ver empreendimentos
                </Link>
              </div>
            </div>

            {videoUrl && (
              <div className="overflow-hidden rounded-lg">
                <div className="relative aspect-video">
                  <iframe
                    src={videoUrl}
                    title={`Vídeo ${emp.nome}`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== PARALLAX 1 — Piscina/lake ===== */}
      {assets.parallaxImages[0] && (
        <div className="relative h-[50vh] overflow-hidden md:h-[70vh]">
          <div
            className="absolute inset-0 bg-fixed bg-center bg-cover"
            style={{ backgroundImage: `url(${assets.parallaxImages[0]})` }}
          />
        </div>
      )}

      {/* ===== SECTION 2 — Saiba mais heading + implantação ===== */}
      <section className="bg-white pt-16 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
              Saiba mais sobre
            </h2>
            <h2 className="mt-1 font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
              o empreendimento
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm text-neutral-500">
              Confira os detalhes do empreendimento com exclusividade.
              <br />Nossa equipe entrará em contato.
            </p>

            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-neutral-800"
            >
              Fale conosco no WhatsApp
            </a>
          </div>
        </div>

        {assets.implantacaoImage && (
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={assets.implantacaoImage}
                  alt="Implantação do empreendimento"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-light tracking-[0.15em] text-neutral-900 sm:text-4xl">
                  Um complexo
                  <br />
                  <span className="italic">imobiliário único.</span>
                </h3>

                <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                  A vista cinematográfica e a natureza se tornam luxo somente no {emp.nome}.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Um complexo imobiliário de alto padrão, desenhado e planejado para você morar e trabalhar com a mais definitiva do Parque Barigui, ao lado do Shopping.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Localizado em uma região que transforma qualidade em excelência de vida, em frente ao parque e ao lado do Parkshopping.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                  Conheça os 3 empreendimentos independentes para você morar, trabalhar ou ambos.
                </p>

                <Link
                  href="#empreendimentos"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#c9a876] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#b8966a]"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== SECTION 3 — Torres ===== */}
      {assets.torres && assets.torres.length > 0 && (
        <section id="empreendimentos" className="bg-neutral-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
                Três empreendimentos independentes
              </h2>
              <p className="mt-2 font-serif text-lg font-light italic text-neutral-600 sm:text-xl">
                para você morar, trabalhar ou ambos
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {assets.torres.map((torre) => {
                const hasSlugLink = torre.slug && torre.slug !== slug

                // Auto-fetch plantas from CRM for this torre's empreendimento.
                // Static fallback (torre.plantas) is torre-specific by design —
                // each torre in the asset map has its own plantas, never shared.
                const torreProperties = properties.filter((p) =>
                  p.empreendimento?.toLowerCase() === torre.nome.toLowerCase()
                )
                const plantasFromCRM = [...new Set(
                  torreProperties.flatMap((p) =>
                    (p.fotosPorTipo || [])
                      .filter((f) => f.tipo.toLowerCase() === "planta")
                      .map((f) => f.foto)
                  )
                )]
                const torrePlantas = plantasFromCRM.length > 0 ? plantasFromCRM : (torre.plantas || [])

                return (
                  <div
                    key={torre.nome}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    {torre.render && (
                      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-neutral-200">
                        <Image
                          src={torre.render}
                          alt={torre.nome}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="mt-6 text-center">
                      {torre.logo ? (
                        <Image
                          src={torre.logo}
                          alt={torre.nome}
                          width={200}
                          height={70}
                          className="mx-auto h-14 w-auto object-contain"
                        />
                      ) : (
                        <h3 className="font-serif text-2xl font-light italic tracking-wider text-neutral-900">
                          {torre.nome}
                        </h3>
                      )}

                      {torre.descricao && (
                        <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                          {torre.descricao}
                        </p>
                      )}
                    </div>

                    {torrePlantas.length > 0 && (
                      <PlantasCarousel plantas={torrePlantas} torreNome={torre.nome} />
                    )}

                    <div className="mt-auto pt-6 flex flex-col items-center gap-3">
                      {hasSlugLink ? (
                        <Link
                          href={`/empreendimento/${torre.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#c9a876] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#b8966a]"
                        >
                          Ver empreendimento
                        </Link>
                      ) : (
                        <a
                          href={whatsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#c9a876] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-[#b8966a]"
                        >
                          Ver empreendimento
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 4 — Unidades disponíveis (grid only) ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
              Unidades disponíveis
            </h2>
            <p className="mt-3 text-sm text-neutral-500">{properties.length} {properties.length === 1 ? "unidade" : "unidades"} para morar ou investir</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <Link key={p.codigo} href={`/imovel/${p.slug}`} className="group overflow-hidden rounded-sm border border-neutral-200 bg-white transition hover:border-[#c9a876] hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.fotoDestaque || "/placeholder-property.jpg"} alt={p.titulo} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" loading="lazy" />
                  {p.lancamento && <span className="absolute top-3 left-3 rounded-full bg-[#c9a876] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">Lançamento</span>}
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">{p.tipo} · {p.bairro}</p>
                  <p className="mt-2 line-clamp-1 font-serif text-base font-medium text-neutral-900">{p.titulo}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                    {p.areaPrivativa && <span>{formatArea(p.areaPrivativa)} m²</span>}
                    {p.dormitorios && <span>{p.dormitorios} {p.dormitorios === 1 ? "quarto" : "quartos"}</span>}
                    {p.vagas && <span>{p.vagas} {p.vagas === 1 ? "vaga" : "vagas"}</span>}
                  </div>
                  {(p.precoVenda || p.precoAluguel) && (
                    <p className="mt-4 font-serif text-xl font-light text-neutral-900">{formatPrice(p.precoVenda || p.precoAluguel)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5 — Infrastructure ===== */}
      {infraestrutura.length > 0 && (
        <section className="bg-neutral-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
                Infraestrutura do condomínio
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
              {infraestrutura.map((item) => {
                const Icon = getPropertyFeatureIcon(item)
                return (
                  <div key={item} className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-[#c9a876]" strokeWidth={1.8} />
                    <span className="text-sm text-neutral-700">{item}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 6 — Localização ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-light italic tracking-[0.15em] text-neutral-900 sm:text-3xl">
              Localização
            </h2>
            {endereco && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
                <MapPin className="h-3.5 w-3.5" /> {[endereco.endereco, endereco.numero, bairros[0]].filter(Boolean).join(", ")}, Curitiba - PR
              </p>
            )}
          </div>

          <div className="mt-12 overflow-hidden border border-neutral-200">
            {assets.mapEmbedUrl ? (
              <iframe src={assets.mapEmbedUrl} title="Localização" className="h-[400px] w-full md:h-[500px]" loading="lazy" allowFullScreen />
            ) : lat && lng ? (
              <PropertyMap latitude={lat} longitude={lng} bairro={bairros[0] || ""} titulo={emp.nome} endereco={endereco?.endereco} numero={endereco?.numero} cidade="Curitiba" estado="PR" />
            ) : null}
          </div>
        </div>
      </section>

      {/* ===== SECTION 7 — Final CTA ===== */}
      <section className="relative overflow-hidden bg-[#1a1a1a] py-20 md:py-28">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-light italic tracking-[0.15em] text-white sm:text-4xl">
            Agende sua visita
          </h2>
          <p className="mt-4 text-sm text-white/60">
            Nossos especialistas do {emp.nome} estão prontos para atender você
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#1da851]"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>
              WhatsApp
            </a>
            <a
              href="tel:+554199978-0517"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              <Phone className="size-5" /> (41) 99978-0517
            </a>
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-white/40">CRECI J 9420 · Seg-sex 8h30-17h</p>
        </div>
      </section>

      {/* FAQ + Related */}
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={(() => {
              const stats = generateLandingStats(properties)
              const baseFaq = generateDynamicFAQ(stats, bairros[0])
              return [{ question: `Quantas unidades estão disponíveis no ${emp.nome}?`, answer: `O ${emp.nome} possui ${properties.length} ${properties.length === 1 ? "unidade disponível" : "unidades disponíveis"} no site da FYMOOB.${precoMin ? ` Preços a partir de ${formatPrice(precoMin)}.` : ""}` }, ...baseFaq.slice(1)]
            })()}
            title={`Perguntas frequentes sobre o ${emp.nome}`}
          />
          <RelatedPages title="Explore também" links={[...bairros.map((bairro) => ({ href: `/imoveis/${slugify(bairro)}`, label: `Imóveis no ${bairro}` })), ...empreendimentos.filter((e) => e.slug !== slug && e.total >= 3).slice(0, 6).map((e) => ({ href: `/empreendimento/${e.slug}`, label: e.nome }))]} />
        </div>
      </section>
    </>
  )
}

// ====================================================
// Standard content (for empreendimentos without assets)
// ====================================================
function StandardContent(props: {
  emp: { nome: string; slug: string }
  properties: Property[]
  precoMin: number | null
  precoMax: number | null
  bairros: string[]
  unitTypes: ReturnType<typeof groupUnitTypes>
  infraestrutura: string[]
  lat: number | null
  lng: number | null
  endereco: Property | undefined
  construtora: string | null
  slug: string
  empreendimentos: Awaited<ReturnType<typeof getAllEmpreendimentos>>
  whatsUrl: string
  descricao: string | null | undefined
  plantas?: string[]
}) {
  const { emp, properties, precoMin, precoMax, bairros, unitTypes, infraestrutura, lat, lng, endereco, slug, empreendimentos, whatsUrl, descricao, plantas } = props
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-16">
            {descricao && (
              <section>
                <h2 className="font-display text-2xl font-bold text-neutral-900">Sobre o {emp.nome}</h2>
                <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-600">{descricao}</div>
              </section>
            )}
            <section>
              <h2 className="font-display text-2xl font-bold text-neutral-900">Tipos de unidades</h2>
              <div className="mt-6 space-y-4">
                {unitTypes.map((ut) => (
                  <div key={ut.key} className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4">
                    {ut.foto && (
                      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-lg sm:block">
                        <Image src={ut.foto} alt={ut.key} fill className="object-cover" sizes="112px" loading="lazy" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900">{ut.properties[0].tipo} {ut.area > 0 ? `${formatArea(ut.area)}m²` : ""}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                        {ut.dorms > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {ut.dorms} {ut.dorms === 1 ? "quarto" : "quartos"}</span>}
                        {ut.suites > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {ut.suites} suítes</span>}
                        {ut.banheiros > 0 && <span className="flex items-center gap-1"><ShowerHead className="h-3.5 w-3.5" /> {ut.banheiros}</span>}
                        {ut.vagas > 0 && <span className="flex items-center gap-1"><Car className="h-3.5 w-3.5" /> {ut.vagas} vagas</span>}
                      </div>
                      {ut.precoMin > 0 && <p className="mt-2 text-sm font-bold text-slate-900">A partir de {formatPrice(ut.precoMin)}</p>}
                    </div>
                    <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">{ut.count}</span>
                  </div>
                ))}
              </div>
            </section>
            {plantas && plantas.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-light italic tracking-tight text-neutral-900">Plantas disponíveis</h2>
                <p className="mt-1 text-sm text-neutral-500">{plantas.length} {plantas.length === 1 ? "opção" : "opções"} de planta — clique para ampliar</p>
                <div className="mt-6">
                  <PlantasGallery plantas={plantas} />
                </div>
              </section>
            )}

            {infraestrutura.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-neutral-900">Infraestrutura</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 xl:grid-cols-3">
                  {infraestrutura.map((item) => {
                    const Icon = getPropertyFeatureIcon(item)
                    return (
                      <div key={item} className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.9} />
                        <span className="text-sm text-neutral-700">{item}</span>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
            {lat && lng && (
              <section>
                <PropertyMap latitude={lat} longitude={lng} bairro={bairros[0] || ""} titulo={emp.nome} endereco={endereco?.endereco} numero={endereco?.numero} cidade="Curitiba" estado="PR" />
              </section>
            )}
            <section>
              <h2 className="font-display text-2xl font-bold text-neutral-900">Todas as unidades ({properties.length})</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((p) => (
                  <Link key={p.codigo} href={`/imovel/${p.slug}`} className="group overflow-hidden rounded-xl border border-neutral-200 transition hover:shadow-md">
                    <div className="relative aspect-[4/3]">
                      <Image src={p.fotoDestaque || "/placeholder-property.jpg"} alt={p.titulo} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" loading="lazy" />
                      {p.lancamento && <span className="absolute top-3 left-3 rounded-full bg-brand-primary px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">Lançamento</span>}
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-medium text-neutral-500">{p.tipo} · {p.bairro}</p>
                      <p className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900">{p.titulo}</p>
                      {(p.precoVenda || p.precoAluguel) && <p className="mt-2 text-base font-extrabold text-slate-900">{formatPrice(p.precoVenda || p.precoAluguel)}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-6">
                <h3 className="font-display text-lg font-bold text-neutral-900">Fale com um especialista</h3>
                <p className="mt-1 text-sm text-neutral-500">Tire suas dúvidas sobre o {emp.nome}</p>
                <a href={whatsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white">
                  <svg viewBox="0 0 24 24" className="size-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>
                  WhatsApp
                </a>
                <a href="tel:+554199978-0517" className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700">
                  <Phone className="size-4" /> (41) 99978-0517
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="fixed bottom-14 left-0 z-[100] w-full border-t border-neutral-200 bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            {precoMin && <><p className="text-lg font-extrabold text-slate-900">{formatPrice(precoMin)}</p><p className="text-xs text-neutral-500">A partir de</p></>}
          </div>
          <a href={whatsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
            <svg viewBox="0 0 24 24" className="size-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" /></svg>
            Visitar
          </a>
        </div>
      </div>
      <section className="border-t border-neutral-100 bg-neutral-50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DynamicFAQ
            questions={(() => {
              const stats = generateLandingStats(properties)
              const baseFaq = generateDynamicFAQ(stats, bairros[0])
              return [{ question: `Quantas unidades estão disponíveis no ${emp.nome}?`, answer: `O ${emp.nome} possui ${properties.length} ${properties.length === 1 ? "unidade disponível" : "unidades disponíveis"} no site da FYMOOB.${precoMin ? ` Preços a partir de ${formatPrice(precoMin)}.` : ""}` }, ...baseFaq.slice(1)]
            })()}
            title={`Perguntas frequentes sobre o ${emp.nome}`}
          />
          <RelatedPages title="Explore também" links={[...bairros.map((bairro) => ({ href: `/imoveis/${slugify(bairro)}`, label: `Imóveis no ${bairro}` })), ...empreendimentos.filter((e) => e.slug !== slug && e.total >= 3).slice(0, 6).map((e) => ({ href: `/empreendimento/${e.slug}`, label: e.nome }))]} />
        </div>
      </section>
    </>
  )
}
