import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, generateImageAlt, getPropertyImage } from "@/lib/utils"
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
      <div className="flex w-full flex-col justify-center space-y-1.5 p-4 md:w-1/2 md:space-y-2.5 md:p-8">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-500">{property.tipo}</span>
          <span className="text-neutral-300">·</span>
          <span className="text-xs text-neutral-400">{property.bairro}, {property.cidade}</span>
        </div>

        <h3 className="line-clamp-1 font-display text-base font-bold tracking-tight text-neutral-950 md:text-xl">
          {property.titulo}
        </h3>

        <p className="text-xl font-extrabold tracking-tight text-brand-primary md:text-2xl">
          {formatPrice(price)}
        </p>

        <PropertyFeatures
          dormitorios={property.dormitorios}
          banheiros={property.banheiros}
          vagas={property.vagas}
          areaPrivativa={property.areaPrivativa}
          size="sm"
          compact
        />
      </div>
    </Link>
  )
}
