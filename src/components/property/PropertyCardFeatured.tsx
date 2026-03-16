import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, truncateText, generateImageAlt } from "@/lib/utils"
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
      className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-1/2">
        <Image
          src={property.fotoDestaque}
          alt={alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col justify-center space-y-3 p-6 md:w-1/2">
        <div className="flex flex-wrap gap-2">
          <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>
          <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
        </div>

        <p className="text-sm text-fymoob-gray-mid">
          {property.bairro} - {property.cidade} / {property.estado}
        </p>

        <h3 className="text-lg font-bold text-fymoob-gray-dark">
          {truncateText(property.titulo, 80)}
        </h3>

        <p className="text-xl font-bold text-fymoob-blue">
          {formatPrice(price)}
        </p>

        {property.descricao && (
          <p className="line-clamp-2 text-sm text-fymoob-gray-mid">
            {truncateText(property.descricao, 120)}
          </p>
        )}

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
