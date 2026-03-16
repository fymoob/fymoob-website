import type { Property } from "@/types/property"
import { MapPin } from "lucide-react"
import { PropertyBadge } from "@/components/shared/PropertyBadge"
import { PropertyFeatures } from "@/components/shared/PropertyFeatures"
import { PriceDisplay } from "@/components/shared/PriceDisplay"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-4">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
        <PropertyBadge variant="sale">{property.finalidade}</PropertyBadge>
        <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-fymoob-gray-dark">
        {property.titulo}
      </h1>

      {/* Address */}
      {(property.endereco || property.bairro) && (
        <p className="flex items-center gap-1.5 text-sm text-fymoob-gray-mid">
          <MapPin size={14} className="shrink-0" />
          {property.endereco
            ? `${property.endereco}, ${property.bairro}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {/* Price (mobile) */}
      <div className="lg:hidden">
        <PriceDisplay
          precoVenda={property.precoVenda}
          precoAluguel={property.precoAluguel}
          finalidade={property.finalidade}
          size="lg"
        />
      </div>

      {/* Features */}
      <PropertyFeatures
        dormitorios={property.dormitorios}
        banheiros={property.banheiros}
        vagas={property.vagas}
        areaPrivativa={property.areaPrivativa}
        size="md"
      />
    </div>
  )
}
