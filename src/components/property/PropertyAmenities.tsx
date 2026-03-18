"use client"

import * as React from "react"
import {
  Waves,
  Flame,
  Shield,
  ArrowUpDown,
  Car,
  Baby,
  PartyPopper,
  Dumbbell,
  WashingMachine,
  AirVent,
  TreePine,
  DoorOpen,
  Wifi,
  Bike,
  Dog,
  Droplets,
  Fence,
  Gamepad2,
  Heater,
  Key,
  Lamp,
  type LucideIcon,
} from "lucide-react"

interface PropertyAmenitiesProps {
  descricao: string
}

interface AmenityMapping {
  keywords: string[]
  label: string
  icon: LucideIcon
}

const AMENITY_MAP: AmenityMapping[] = [
  { keywords: ["piscina"], label: "Piscina", icon: Waves },
  { keywords: ["churrasqueira", "churrasq"], label: "Churrasqueira", icon: Flame },
  { keywords: ["portaria 24", "portaria"], label: "Portaria 24h", icon: Shield },
  { keywords: ["elevador"], label: "Elevador", icon: ArrowUpDown },
  { keywords: ["garagem", "vaga de garagem", "vagas"], label: "Garagem", icon: Car },
  { keywords: ["playground"], label: "Playground", icon: Baby },
  { keywords: ["salão de festas", "salao de festas", "salão de festa"], label: "Salão de festas", icon: PartyPopper },
  { keywords: ["academia", "fitness"], label: "Academia", icon: Dumbbell },
  { keywords: ["lavanderia"], label: "Lavanderia", icon: WashingMachine },
  { keywords: ["ar condicionado", "ar-condicionado", "split"], label: "Ar condicionado", icon: AirVent },
  { keywords: ["jardim"], label: "Jardim", icon: TreePine },
  { keywords: ["sacada", "varanda", "terraço", "terraco", "balcão"], label: "Sacada/Varanda", icon: DoorOpen },
  { keywords: ["wi-fi", "wifi", "internet"], label: "Wi-Fi", icon: Wifi },
  { keywords: ["bicicletário", "bicicletario"], label: "Bicicletário", icon: Bike },
  { keywords: ["pet", "animal", "pets"], label: "Aceita pets", icon: Dog },
  { keywords: ["sauna"], label: "Sauna", icon: Droplets },
  { keywords: ["quadra", "esportiva"], label: "Quadra esportiva", icon: Gamepad2 },
  { keywords: ["cerca elétrica", "cerca eletrica", "segurança", "câmera"], label: "Segurança", icon: Fence },
  { keywords: ["aquecimento", "aquecedor", "água quente"], label: "Aquecimento", icon: Heater },
  { keywords: ["condomínio fechado", "condominio fechado"], label: "Condomínio fechado", icon: Key },
  { keywords: ["iluminação", "iluminacao", "luminária"], label: "Iluminação", icon: Lamp },
]

function extractAmenities(descricao: string): { label: string; icon: LucideIcon }[] {
  const text = descricao.toLowerCase()
  const found: { label: string; icon: LucideIcon }[] = []

  for (const amenity of AMENITY_MAP) {
    if (amenity.keywords.some((kw) => text.includes(kw))) {
      found.push({ label: amenity.label, icon: amenity.icon })
    }
  }

  return found
}

export function PropertyAmenities({ descricao }: PropertyAmenitiesProps) {
  const [showAll, setShowAll] = React.useState(false)

  const amenities = extractAmenities(descricao)

  if (amenities.length === 0) return null

  const VISIBLE_COUNT = 10
  const displayedAmenities = showAll ? amenities : amenities.slice(0, VISIBLE_COUNT)
  const hasMore = amenities.length > VISIBLE_COUNT

  return (
    <section className="border-t border-neutral-100 pt-10">
      <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950">
        O que este imóvel oferece
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
        {displayedAmenities.map((amenity) => {
          const Icon = amenity.icon
          return (
            <div key={amenity.label} className="flex items-center gap-3">
              <Icon className="h-6 w-6 shrink-0 text-neutral-600" />
              <span className="text-sm text-neutral-700">{amenity.label}</span>
            </div>
          )
        })}
      </div>
      {hasMore && !showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-6 rounded-lg border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
        >
          Mostrar todas as {amenities.length} comodidades
        </button>
      )}
    </section>
  )
}
