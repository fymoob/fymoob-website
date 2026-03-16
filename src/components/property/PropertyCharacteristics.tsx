import type { Property } from "@/types/property"
import { formatArea } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    <Accordion defaultValue={[0]}>
      <AccordionItem value={0}>
        <AccordionTrigger className="text-base font-semibold">
          Características
        </AccordionTrigger>
        <AccordionContent>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {characteristics.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-fymoob-gray-mid">
                  {item.label}
                </dt>
                <dd className="text-sm font-medium text-fymoob-gray-dark">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value={1}>
        <AccordionTrigger className="text-base font-semibold">
          Mapa do imóvel
        </AccordionTrigger>
        <AccordionContent>
          {property.latitude && property.longitude ? (
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-fymoob-bg-alt">
              <iframe
                title={`Mapa - ${property.titulo}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.005},${property.latitude - 0.003},${property.longitude + 0.005},${property.latitude + 0.003}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
              />
            </div>
          ) : (
            <p className="py-4 text-center text-sm text-fymoob-gray-mid">
              Localização não disponível para este imóvel.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
