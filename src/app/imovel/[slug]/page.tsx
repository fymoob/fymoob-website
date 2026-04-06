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
import { PropertyGallery } from "@/components/property/PropertyGallery"
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
  // Limit photos on similar properties to reduce RSC payload (312 → ~50 image URLs)
  const similarProperties = rawSimilar.map((p) => ({
    ...p,
    fotos: p.fotos.slice(0, 3),
  }))
  const propertySchema = generatePropertySchema(property)
  const alt = generateImageAlt(property)
  const shortTitle = generateShortTitle(property)
  const hasLongTitle = property.titulo.length > 60

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: property.bairro, url: `/imoveis/${property.bairro.toLowerCase().replace(/\s+/g, "-")}` },
    { name: shortTitle, url: `/imovel/${property.slug}` },
  ]

  // If the original title was truncated, prepend it to the description
  const descricaoWithTitle = hasLongTitle
    ? `${property.titulo}\n\n${property.descricao}`
    : property.descricao

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      <RecentlyViewedTracker property={property} />

      {/* Section 1: Header + Info (white bg) */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* Mobile: header with back + actions */}
        <div className="flex items-center justify-between py-2 md:hidden">
          <BackButton />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} size="sm" />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} variant="overlay" />
            <WishlistButton codigo={property.codigo} size="sm" />
          </div>
        </div>

        {/* Desktop: breadcrumbs + actions */}
        <div className="hidden items-center justify-between md:flex">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} />
            <WishlistButton codigo={property.codigo} />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} />
          </div>
        </div>

        {/* Property header + specs */}
        <PropertyDetails property={property} shortTitle={shortTitle} />

        {/* Price highlight */}
        <div className="mt-3 flex items-baseline gap-2 md:hidden">
          <p className="font-display text-2xl font-bold text-brand-primary">
            {formatPrice(property.precoVenda ?? property.precoAluguel)}
          </p>
          {property.valorCondominio && property.valorCondominio > 0 && (
            <span className="text-xs text-neutral-400">
              + {formatPrice(property.valorCondominio)}/cond.
            </span>
          )}
        </div>
      </div>

      {/* Section 2: Gallery (stone-50 bg on mobile) */}
      <div className="mt-4 bg-stone-50 py-4 md:bg-transparent md:py-0">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          {/* Mobile gallery */}
          <div className="overflow-hidden rounded-xl md:hidden">
            <PropertyGallery fotos={filterPropertyPhotos(property.fotos).slice(0, 15)} alt={alt} />
          </div>
        </div>
      </div>

      {/* Section 3: Content (white bg) */}
      <div className="mx-auto w-full max-w-7xl px-4 pb-40 md:px-8 md:pb-0">
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          {/* Left column */}
          <div>
            {/* Desktop gallery */}
            <div className="hidden md:block">
              <PropertyGallery fotos={filterPropertyPhotos(property.fotos).slice(0, 15)} alt={alt} />
            </div>

            {/* Description (white) */}
            <div className="mt-4 border-t border-neutral-100 pt-4 md:mt-6 md:pt-6">
              <PropertyDescription descricao={descricaoWithTitle} />
            </div>

            {/* Amenities (stone-50 bg) */}
            <div className="-mx-4 mt-6 bg-stone-50 px-4 py-6 md:mx-0 md:rounded-xl">
              <PropertyAmenities descricao={descricaoWithTitle} />
            </div>

            {/* Characteristics (white) */}
            <div className="mt-6 border-t border-neutral-100 pt-6">
              <PropertyCharacteristics property={property} />
            </div>

            {/* Map (stone-50 bg) */}
            <div className="-mx-4 mt-6 bg-stone-50 px-4 py-6 md:mx-0 md:rounded-xl">
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                bairro={property.bairro}
                titulo={property.titulo}
              />
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <aside className="hidden lg:block">
            <LazyContactSidebar
              propertyTitle={property.titulo}
              propertyCode={property.codigo}
              precoVenda={property.precoVenda}
              precoAluguel={property.precoAluguel}
              finalidade={property.finalidade}
            />
          </aside>
        </div>
      </div>

      {/* Property code — technical footer */}
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
        <p className="text-xs text-neutral-400">Código do imóvel: {property.codigo}</p>
      </div>

      {/* Similar properties — lazy loaded (below fold) */}
      <div className="mt-2">
        <LazySimilarProperties properties={similarProperties} />
      </div>

      {/* Mobile fixed CTA bar with integrated urgency strip */}
      <MobileContactBar
        propertyTitle={property.titulo}
        propertyCode={property.codigo}
        precoVenda={property.precoVenda}
        precoAluguel={property.precoAluguel}
        dataCadastro={property.dataCadastro}
        bairro={property.bairro}
      />
    </>
  )
}
