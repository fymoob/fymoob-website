import type { Property } from "@/types/property"
import { formatArea } from "@/lib/utils"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({
  property,
}: PropertyCharacteristicsProps) {
  const characteristics = [
    { label: "Tipo", value: property.tipo },
    { label: "Finalidade", value: property.finalidade },
    {
      label: "Dormitórios",
      value: property.dormitorios?.toString() ?? null,
    },
    { label: "Suítes", value: property.suites?.toString() ?? null },
    {
      label: "Banheiros",
      value: property.banheiros?.toString() ?? null,
    },
    { label: "Vagas", value: property.vagas?.toString() ?? null },
    {
      label: "Área total",
      value: property.areaTotal ? formatArea(property.areaTotal) : null,
    },
    {
      label: "Área privativa",
      value: property.areaPrivativa
        ? formatArea(property.areaPrivativa)
        : null,
    },
    { label: "Cidade", value: property.cidade },
    { label: "Bairro", value: property.bairro },
    { label: "Estado", value: property.estado },
  ].filter((c) => c.value !== null)

  return (
    <section>
      <h2 className="text-xl font-semibold text-neutral-900">
        Características
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {characteristics.map((item) => (
          <div key={item.label}>
            <dt className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              {item.label}
            </dt>
            <dd className="mt-0.5 text-sm font-semibold text-neutral-950">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
