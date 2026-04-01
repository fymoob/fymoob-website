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
import { generateImageAlt, getPropertyImage, filterPropertyPhotos, generateShortTitle } from "@/lib/utils"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGallery } from "@/components/property/PropertyGallery"
import { PropertyDetails } from "@/components/property/PropertyDetails"
import { PropertyDescription } from "@/components/property/PropertyDescription"
import { ContactSidebar } from "@/components/property/ContactSidebar"
import { PropertyCharacteristics } from "@/components/property/PropertyCharacteristics"
import { PropertyAmenities } from "@/components/property/PropertyAmenities"
import { SimilarProperties } from "@/components/property/SimilarProperties"
import { PropertyMap } from "@/components/property/PropertyMap"
import { MobileContactBar } from "@/components/property/MobileContactBar"
import { RecentlyViewedTracker } from "@/components/property/RecentlyViewedTracker"
import { ShareButton } from "@/components/shared/ShareButton"

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

      <div className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-8 md:pb-0">
        <div className="flex items-center justify-between">
          <Breadcrumbs items={breadcrumbItems} />
          <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} />
        </div>

        {/* Property header + specs */}
        <PropertyDetails property={property} shortTitle={shortTitle} />

        {/* Main content grid */}
        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          {/* Left column */}
          <div className="space-y-10">
            <PropertyGallery fotos={filterPropertyPhotos(property.fotos).slice(0, 15)} alt={alt} />
            <PropertyDescription descricao={descricaoWithTitle} />
            <PropertyAmenities descricao={descricaoWithTitle} />
            <PropertyCharacteristics property={property} />
            <PropertyMap
              latitude={property.latitude}
              longitude={property.longitude}
              bairro={property.bairro}
              titulo={property.titulo}
            />
          </div>

          {/* Right sidebar — desktop only */}
          <aside className="hidden lg:block">
            <ContactSidebar
              propertyTitle={property.titulo}
              propertyCode={property.codigo}
              precoVenda={property.precoVenda}
              precoAluguel={property.precoAluguel}
              finalidade={property.finalidade}
            />
          </aside>
        </div>
      </div>

      {/* Similar properties */}
      <div className="mt-12">
        <SimilarProperties properties={similarProperties} />
      </div>

      {/* Mobile fixed CTA bar */}
      <MobileContactBar
        propertyTitle={property.titulo}
        propertyCode={property.codigo}
        precoVenda={property.precoVenda}
        precoAluguel={property.precoAluguel}
      />
    </>
  )
}
