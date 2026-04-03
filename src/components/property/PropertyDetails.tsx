import type { Property } from "@/types/property"
import { MapPin } from "lucide-react"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"

interface PropertyDetailsProps {
  property: Property
  shortTitle?: string
}

export function PropertyDetails({ property, shortTitle }: PropertyDetailsProps) {
  return (
    <div className="mt-4 space-y-3 md:mt-0">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
        <PropertyBadge variant="sale">{property.finalidade}</PropertyBadge>
        <span className="text-xs text-neutral-400">{property.codigo}</span>
      </div>

      {/* Title */}
      <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
        {shortTitle || property.titulo}
      </h1>

      {/* Address */}
      {(property.endereco || property.bairro) && (
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          {property.endereco
            ? `${property.endereco}, ${property.bairro}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {/* Specs as pill badges */}
      <PropertyFeatures
        dormitorios={property.dormitorios}
        banheiros={property.banheiros}
        vagas={property.vagas}
        areaPrivativa={property.areaPrivativa}
        size="md"
        className="pt-1"
      />
    </div>
  )
}
