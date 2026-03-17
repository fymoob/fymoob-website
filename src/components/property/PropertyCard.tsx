import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/types/property"
import { formatPrice, truncateText, generateImageAlt, getPropertyImage } from "@/lib/utils"
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
      className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={getPropertyImage(property)}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Bottom-left badge — Propero style */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-900 shadow-sm backdrop-blur">
            {property.tipo}
          </span>
          <span className="rounded-md bg-neutral-950/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
            Cód: {property.codigo}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 p-5 md:p-6">
        <h3 className="font-display text-lg font-semibold leading-tight text-neutral-950">
          {truncateText(property.titulo, 60)}
        </h3>
        <p className="text-sm text-neutral-500">
          {property.bairro}, {property.cidade}
        </p>

        <p className="text-xl font-bold text-brand-primary">
          {formatPrice(price)}
        </p>

        {property.descricao && (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
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
