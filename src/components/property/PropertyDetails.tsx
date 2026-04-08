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
    <div className="mt-2 space-y-2.5 md:mt-0">
      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <PropertyBadge variant="type">{property.tipo}</PropertyBadge>
        <PropertyBadge variant={property.finalidade === "Venda" ? "sale" : "rent"}>{property.finalidade}</PropertyBadge>
        <PropertyBadge variant="code">Cód: {property.codigo}</PropertyBadge>
      </div>

      {/* Title — 1-2 lines max */}
      <h1 className="line-clamp-2 font-display text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl">
        {shortTitle || property.titulo}
      </h1>

      {/* Address */}
      {(property.endereco || property.bairro) && (
        <p className="flex items-center gap-1.5 text-sm text-neutral-500">
          <MapPin size={14} className="shrink-0 text-neutral-400" />
          {property.endereco
            ? `${[property.endereco, property.numero, property.bairro].filter(Boolean).join(", ")}, ${property.cidade} - ${property.estado}`
            : `${property.bairro}, ${property.cidade} - ${property.estado}`}
        </p>
      )}

      {/* Specs — clean inline, no pill backgrounds */}
      <PropertyFeatures
        dormitorios={property.dormitorios}
        suites={property.suites}
        banheiros={property.banheiros}
        vagas={property.vagas}
        areaPrivativa={property.areaPrivativa}
        size="md"
      />
    </div>
  )
}
