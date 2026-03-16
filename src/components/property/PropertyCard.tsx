import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, truncateText, generateImageAlt } from "@/lib/utils"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const alt = generateImageAlt(property)
  const price = property.precoVenda ?? property.precoAluguel

  return (
    <Link
      href={`/imovel/${property.slug}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.fotoDestaque}
          alt={alt}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <PropertyBadge variant="code" className="text-[10px]">
            Cód: {property.codigo}
          </PropertyBadge>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        <p className="text-xs text-fymoob-gray-mid">{property.tipo}</p>
        <h3 className="text-base font-bold leading-tight text-fymoob-gray-dark">
          {truncateText(property.titulo, 60)}
        </h3>
        <p className="text-sm text-fymoob-gray-mid">
          {property.bairro}, {property.cidade}
        </p>

        <p className="text-base font-bold text-fymoob-gray-dark">
          {formatPrice(price)}
        </p>

        {property.descricao && (
          <p className="line-clamp-2 text-sm text-fymoob-gray-mid">
            {truncateText(property.descricao, 100)}
          </p>
        )}

        <PropertyFeatures
          dormitorios={property.dormitorios}
          banheiros={property.banheiros}
          vagas={property.vagas}
          areaPrivativa={property.areaPrivativa}
          size="sm"
        />
      </div>
    </Link>
  )
}
