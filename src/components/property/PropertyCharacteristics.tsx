import type { Property } from "@/types/property"

interface PropertyCharacteristicsProps {
  property: Property
}

export function PropertyCharacteristics({ property }: PropertyCharacteristicsProps) {
  // Only complementary data — tipo, finalidade, área privativa, quartos, banheiros, vagas
  // are already visible in badges and Quick Glance icons
  const items: { label: string; value: string }[] = []

  if (property.face) {
    items.push({ label: "Face", value: property.face })
  }
  if (property.aceitaPermuta) {
    items.push({ label: "Permuta", value: "Aceita" })
  }

  if (items.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 md:grid-cols-3">
      {items.map((item) => (
        <p key={item.label} className="text-sm">
          <span className="text-slate-400">{item.label}: </span>
          <span className="font-medium text-slate-800">{item.value}</span>
        </p>
      ))}
    </div>
  )
}
