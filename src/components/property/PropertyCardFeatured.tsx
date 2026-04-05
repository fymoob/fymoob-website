import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, truncateText, generateImageAlt, getPropertyImage } from "@/lib/utils"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"

interface PropertyCardFeaturedProps {
  property: Property
}

export function PropertyCardFeatured({ property }: PropertyCardFeaturedProps) {
  const alt = generateImageAlt(property)
  const price = property.precoVenda ?? property.precoAluguel

  return (
    <Link
      href={`/imovel/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary-muted hover:shadow-xl md:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-1/2">
        <Image
          src={getPropertyImage(property)}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col justify-center space-y-3 p-6 md:w-1/2 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
          <span className="hidden text-xs text-neutral-400 sm:inline">Cód: {property.codigo}</span>
        </div>

        <p className="text-sm text-neutral-500">
          {property.bairro} - {property.cidade} / {property.estado}
        </p>

        <p className="text-2xl font-extrabold tracking-tight text-brand-primary md:text-3xl">
          {formatPrice(price)}
        </p>

        <h3 className="line-clamp-2 font-display text-lg font-bold tracking-tight text-neutral-950 md:text-xl">
          {property.titulo}
        </h3>

        <PropertyFeatures
          dormitorios={property.dormitorios}
          banheiros={property.banheiros}
          vagas={property.vagas}
          areaPrivativa={property.areaPrivativa}
          size="md"
        />
      </div>
    </Link>
  )
}
