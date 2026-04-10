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
import {
  getPropertyPriceBucket,
  isConsultPriceProperty,
  resolvePropertyPageVariant,
} from "@/lib/property-page-variant"
import {
  filterPropertyPhotos,
  generateImageAlt,
  generateShortTitle,
  getPropertyImage,
} from "@/lib/utils"
import { PropertyPageAnalytics } from "@/components/analytics/PropertyPageAnalytics"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyHeaderBlock } from "@/components/property/PropertyHeaderBlock"
import { PropertyHeroWithGallery } from "@/components/property/PropertyHeroWithGallery"
import { PropertyDescription } from "@/components/property/PropertyDescription"
import { LazyContactSidebar } from "@/components/property/LazyContactSidebar"
import { PropertyCharacteristics } from "@/components/property/PropertyCharacteristics"
import { PropertyAmenities } from "@/components/property/PropertyAmenities"
import { LazySimilarProperties } from "@/components/property/LazySimilarProperties"
import { PropertyMap } from "@/components/property/PropertyMap"
import { MobileContactBar } from "@/components/property/MobileContactBar"
import { MobilePriceCard } from "@/components/property/MobilePriceCard"
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
  const isDual =
    property.finalidade === "Venda e Locação" && property.precoVenda && property.precoAluguel
  const isRental = !isDual && property.finalidade !== "Venda"
  const price = isRental
    ? (property.precoAluguel ?? property.precoVenda)
    : (property.precoVenda ?? property.precoAluguel)
  const variant = resolvePropertyPageVariant(property)
  const isConsultPrice = isConsultPriceProperty(property)
  const priceBucket = getPropertyPriceBucket(property)

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
      <PropertyPageAnalytics
        propertyCode={property.codigo}
        variant={variant}
        isConsultPrice={isConsultPrice}
        priceBucket={priceBucket}
        price={isConsultPrice ? null : price}
      />

      <RecentlyViewedTracker property={property} />

      <div className="mx-auto w-full max-w-7xl px-4 pt-4 md:px-8 md:pt-6">
        <div className="mb-3 flex items-center justify-between md:hidden">
          <BackButton />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} size="sm" />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} variant="overlay" />
            <WishlistButton codigo={property.codigo} size="sm" />
          </div>
        </div>

        <div className="mb-4 hidden items-center justify-between md:flex">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-2">
            <CompareButton codigo={property.codigo} />
            <WishlistButton codigo={property.codigo} />
            <ShareButton title={shortTitle} url={`/imovel/${property.slug}`} />
          </div>
        </div>
      </div>

      <PropertyHeroWithGallery
        fotos={allPhotos}
        mainImage={mainImage}
        alt={alt}
        variant={variant}
      />

      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 pb-40 md:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:gap-10">
          <div>
            <PropertyHeaderBlock
              property={property}
              shortTitle={shortTitle}
              variant={variant}
            />

            <div className="mt-5 lg:hidden">
              <MobilePriceCard
                precoVenda={property.precoVenda}
                precoAluguel={property.precoAluguel}
                finalidade={property.finalidade}
                valorCondominio={property.valorCondominio}
                valorIptu={property.valorIptu}
                valorSobConsulta={property.valorSobConsulta}
              />
            </div>

            <div className="mt-5">
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                bairro={property.bairro}
                titulo={property.titulo}
                endereco={property.endereco}
                numero={property.numero}
                cidade={property.cidade}
                estado={property.estado}
              />
            </div>

            <div className={variant === "premium" ? "mt-14 border-t border-slate-200 pt-12" : "mt-8 border-t border-slate-200 pt-8"}>
              <PropertyDescription descricao={descricaoWithTitle} />
            </div>

            <div className={variant === "premium" ? "mt-14 border-t border-slate-200 pt-12" : "mt-8 border-t border-slate-200 pt-8"}>
              <PropertyCharacteristics property={property} />
            </div>

            {property.infraestrutura.length > 0 && (
              <div className={variant === "premium" ? "mt-14 border-t border-slate-200 pt-12" : "mt-8 border-t border-slate-200 pt-8"}>
                <PropertyAmenities infraestrutura={property.infraestrutura} />
              </div>
            )}
          </div>

          <aside className="relative z-40 hidden lg:block">
            <div className={variant === "premium" ? "sticky top-24 -mt-20" : "sticky top-24 -mt-10"}>
              <LazyContactSidebar
                propertyTitle={property.titulo}
                propertyCode={property.codigo}
                precoVenda={property.precoVenda}
                precoAluguel={property.precoAluguel}
                finalidade={property.finalidade}
                valorCondominio={property.valorCondominio}
                valorIptu={property.valorIptu}
                valorSobConsulta={property.valorSobConsulta}
                variant={variant}
              />
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-2">
        <LazySimilarProperties properties={similarProperties} />
      </div>

      <MobileContactBar
        propertyTitle={property.titulo}
        propertyCode={property.codigo}
        precoVenda={property.precoVenda}
        precoAluguel={property.precoAluguel}
        finalidade={property.finalidade}
        valorSobConsulta={property.valorSobConsulta}
        variant={variant}
        dataCadastro={property.dataCadastro}
        bairro={property.bairro}
      />
    </div>
  )
}
