import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getPropertyBySlug,
  getSimilarProperties,
  getAllSlugs,
} from "@/services/loft"
import {
  generatePropertySchema,
  generatePropertyDescription,
} from "@/lib/seo"
import { generateImageAlt, getPropertyImage, filterPropertyPhotos, generateShortTitle, formatPrice } from "@/lib/utils"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyHeroWithGallery } from "@/components/property/PropertyHeroWithGallery"
import { PropertyDetails } from "@/components/property/PropertyDetails"
import { PropertyDescription } from "@/components/property/PropertyDescription"
import { LazyContactSidebar } from "@/components/property/LazyContactSidebar"
import { PropertyCharacteristics } from "@/components/property/PropertyCharacteristics"
import { PropertyAmenities } from "@/components/property/PropertyAmenities"
import { LazySimilarProperties } from "@/components/property/LazySimilarProperties"
import { PropertyMap } from "@/components/property/PropertyMap"
import { MobileContactBar } from "@/components/property/MobileContactBar"
import { RecentlyViewedTracker } from "@/components/property/RecentlyViewedTracker"
import { ShareButton } from "@/components/shared/ShareButton"
import { WishlistButton } from "@/components/property/WishlistButton"
import { CompareButton } from "@/components/property/CompareButton"
import { BackButton } from "@/components/shared/BackButton"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { MapPin } from "lucide-react"

export const revalidate = 900
export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    return { title: "Imóvel não encontrado" }
  }

  const shortTitle = generateShortTitle(property)
  const description = generatePropertyDescription(property)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

  return {
    title: shortTitle,
    description,
    openGraph: {
      title: shortTitle,
      description,
      type: "website",
      url: `${siteUrl}/imovel/${property.slug}`,
      images: getPropertyImage(property)
        ? [
            {
              url: getPropertyImage(property),
              width: 1200,
              height: 630,
              alt: generateImageAlt(property),
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `/imovel/${property.slug}`,
    },
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const rawSimilar = await getSimilarProperties(property, 4)
  const similarProperties = rawSimilar.map((p) => ({
    ...p,
    fotos: p.fotos.slice(0, 3),
  }))
  const propertySchema = generatePropertySchema(property)
  const alt = generateImageAlt(property)
  const shortTitle = generateShortTitle(property)
  const hasLongTitle = property.titulo.length > 60
  const mainImage = getPropertyImage(property)
  const allPhotos = filterPropertyPhotos(property.fotos)
  const isDual = property.finalidade === "Venda e Locação" && property.precoVenda && property.precoAluguel
  const isRental = !isDual && property.finalidade !== "Venda"
  const price = isRental ? (property.precoAluguel ?? property.precoVenda) : (property.precoVenda ?? property.precoAluguel)

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: property.bairro, url: `/imoveis/${property.bairro.toLowerCase().replace(/\s+/g, "-")}` },
    { name: shortTitle, url: `/imovel/${property.slug}` },
  ]

  const descricaoWithTitle = hasLongTitle
    ? `${property.titulo}\n\n${property.descricao}`
    : property.descricao

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      <RecentlyViewedTracker property={property} />

      {/* ══════ Hero Section ══════ */}
      {/* Breadcrumbs + actions above full-bleed hero */}
      <div className="mx-auto w-full max-w-7xl px-4 pt-4 md:px-8 md:pt-6">
        {/* Mobile: back + actions */}
        <div className="mb-3 flex items-center justify-between md:hidden">
          <BackButton />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} size="sm" />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} variant="overlay" />
            <WishlistButton codigo={property.codigo} size="sm" />
          </div>
        </div>

        {/* Desktop: breadcrumbs + actions */}
        <div className="mb-4 hidden items-center justify-between md:flex">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} />
            <WishlistButton codigo={property.codigo} />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} />
          </div>
        </div>
      </div>

      {/* Full-bleed hero image */}
      <PropertyHeroWithGallery
        fotos={allPhotos}
        mainImage={mainImage}
        alt={alt}
        tipo={property.tipo}
        bairro={property.bairro}
        titulo={shortTitle || property.titulo}
      />

      {/* ══════ Info Strip + Content ══════ */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* SEO h1 — sr-only since title is visible on hero overlay */}
        <h1 className="sr-only">{shortTitle || property.titulo}</h1>

        {/* ══════ Two Column Layout — contact card overlaps hero ══════ */}
        <div className="grid grid-cols-1 gap-8 pb-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] md:pb-0">
          {/* Left column */}
          <div className="mt-6 md:mt-8">
            {/* Compact info strip: badges + address + price + specs inline */}
            <div className="flex flex-wrap items-center gap-2">
              <PropertyBadge variant={property.finalidade === "Venda" ? "sale" : "rent"}>{property.finalidade}</PropertyBadge>
              <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>
            </div>

            {(property.endereco || property.bairro) && (
              <p className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500">
                <MapPin size={14} className="shrink-0 text-neutral-400" />
                {property.endereco
                  ? `${[property.endereco, property.numero, property.bairro].filter(Boolean).join(", ")}, ${property.cidade} - ${property.estado}`
                  : `${property.bairro}, ${property.cidade} - ${property.estado}`}
              </p>
            )}

            {/* Price + specs inline */}
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <div>
                {/* --- Preço principal (venda ou aluguel) --- */}
                {isDual && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Valor venda
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <p className="font-display text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                    {formatPrice(price)}
                  </p>
                  {isRental && (
                    <span className="text-sm text-neutral-500">/mês</span>
                  )}
                </div>

                {/* --- Valor aluguel (dual) — igualmente destacado --- */}
                {isDual && (
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Valor aluguel
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-bold tracking-tight text-slate-900">
                      {formatPrice(property.precoAluguel)} <span className="text-sm font-normal text-neutral-500">/mês</span>
                    </p>
                  </div>
                )}
              </div>

              <span className="hidden h-8 w-px bg-slate-200 md:block" />

              <PropertyFeatures
                dormitorios={property.dormitorios}
                suites={property.suites}
                banheiros={property.banheiros}
                vagas={property.vagas}
                areaPrivativa={property.areaPrivativa}
                size="sm"
              />
            </div>

            {/* Condomínio/IPTU — mobile only (sidebar cobre no desktop) */}
            {(isRental || isDual) && (property.valorCondominio || property.valorIptu) && (
              <div className="mt-3 flex items-center gap-4 text-sm text-slate-500 lg:hidden">
                {property.valorCondominio && property.valorCondominio > 0 && (
                  <span>Condomínio: <span className="font-medium text-slate-700">{formatPrice(property.valorCondominio)}</span></span>
                )}
                {property.valorIptu && property.valorIptu > 0 && (
                  <span>IPTU: <span className="font-medium text-slate-700">{formatPrice(property.valorIptu)}</span></span>
                )}
              </div>
            )}

            {/* Ficha Técnica — complementary specs only */}
            <div className="mt-4">
              <PropertyCharacteristics property={property} />
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <PropertyDescription descricao={descricaoWithTitle} />
            </div>

            {/* Amenities */}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <PropertyAmenities descricao={descricaoWithTitle} />
            </div>

            {/* Map */}
            <div className="mt-8 border-t border-slate-200 pt-8">
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                bairro={property.bairro}
                titulo={property.titulo}
              />
            </div>
          </div>

          {/* Right sidebar — floats up over hero */}
          <aside className="relative z-30 hidden lg:block">
            <div className="sticky top-24 -mt-16">
              <LazyContactSidebar
                propertyTitle={property.titulo}
                propertyCode={property.codigo}
                precoVenda={property.precoVenda}
                precoAluguel={property.precoAluguel}
                finalidade={property.finalidade}
                valorCondominio={property.valorCondominio}
                valorIptu={property.valorIptu}
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Similar properties */}
      <div className="mt-2">
        <LazySimilarProperties properties={similarProperties} />
      </div>

      {/* Mobile fixed CTA bar */}
      <MobileContactBar
        propertyTitle={property.titulo}
        propertyCode={property.codigo}
        precoVenda={property.precoVenda}
        precoAluguel={property.precoAluguel}
        finalidade={property.finalidade}
        dataCadastro={property.dataCadastro}
        bairro={property.bairro}
      />
    </div>
  )
}
