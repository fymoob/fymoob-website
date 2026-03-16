import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  getPropertyBySlug,
  getSimilarProperties,
  getAllSlugs,
} from "@/services/loft"
import {
  generatePropertySchema,
  generatePropertyTitle,
  generatePropertyDescription,
} from "@/lib/seo"
import { generateImageAlt } from "@/lib/utils"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { PropertyGallery } from "@/components/property/PropertyGallery"
import { PropertyDetails } from "@/components/property/PropertyDetails"
import { PropertyDescription } from "@/components/property/PropertyDescription"
import { PropertyContact } from "@/components/property/PropertyContact"
import { PropertyCharacteristics } from "@/components/property/PropertyCharacteristics"
import { SimilarProperties } from "@/components/property/SimilarProperties"

export const revalidate = 3600

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

  const title = generatePropertyTitle(property)
  const description = generatePropertyDescription(property)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com"

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteUrl}/imovel/${property.slug}`,
      images: property.fotoDestaque
        ? [
            {
              url: property.fotoDestaque,
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

  const similarProperties = await getSimilarProperties(property, 4)
  const propertySchema = generatePropertySchema(property)
  const alt = generateImageAlt(property)

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Buscar imóvel", url: "/busca" },
    { name: property.titulo, url: `/imovel/${property.slug}` },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Property header */}
        <PropertyDetails property={property} />

        {/* Main content grid */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">
          {/* Left column */}
          <div className="space-y-8">
            <PropertyGallery fotos={property.fotos} alt={alt} />
            <PropertyDescription descricao={property.descricao} />
            <PropertyCharacteristics property={property} />
          </div>

          {/* Right sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <PropertyContact
                propertyTitle={property.titulo}
                propertyCode={property.codigo}
                precoVenda={property.precoVenda}
                precoAluguel={property.precoAluguel}
                finalidade={property.finalidade}
              />
            </div>
          </aside>
        </div>

        {/* Mobile contact section */}
        <div className="mt-8 lg:hidden">
          <PropertyContact
            propertyTitle={property.titulo}
            propertyCode={property.codigo}
            precoVenda={property.precoVenda}
            precoAluguel={property.precoAluguel}
            finalidade={property.finalidade}
          />
        </div>
      </div>

      {/* Similar properties */}
      <SimilarProperties properties={similarProperties} />
    </>
  )
}
