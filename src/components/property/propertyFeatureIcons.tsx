import type { LucideIcon } from "lucide-react"
import {
  AirVent,
  ArrowUpDown,
  Baby,
  Bike,
  Building2,
  CarFront,
  Check,
  Dog,
  DoorOpen,
  Droplets,
  Dumbbell,
  Fence,
  Flame,
  Gamepad2,
  Heater,
  KeyRound,
  Lamp,
  PartyPopper,
  Shield,
  TreePine,
  Tv,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react"

interface FeatureIconMapping {
  icon: LucideIcon
  keywords: string[]
}

const FEATURE_ICON_MAP: FeatureIconMapping[] = [
  { icon: Dog, keywords: ["pet", "dog"] },
  { icon: Droplets, keywords: ["agua", "hidro", "banheiro", "lavabo", "sauna", "spa"] },
  { icon: WashingMachine, keywords: ["area de servico", "lavanderia"] },
  { icon: Flame, keywords: ["cozinha", "churrasqueira", "gourmet", "adega"] },
  { icon: Tv, keywords: ["tv", "home theater"] },
  { icon: Lamp, keywords: ["sala de jantar", "sala de estar", "estar intimo", "suite master"] },
  { icon: DoorOpen, keywords: ["sacada", "terraco", "deck"] },
  { icon: TreePine, keywords: ["quintal", "jardim", "horta", "parque", "pet place"] },
  { icon: AirVent, keywords: ["ar condicionado", "split", "ar central", "espera para split"] },
  { icon: Waves, keywords: ["piscina"] },
  { icon: ArrowUpDown, keywords: ["elevador"] },
  { icon: CarFront, keywords: ["vaga", "estacionamento", "garagem"] },
  { icon: Bike, keywords: ["biciclet"] },
  { icon: Shield, keywords: ["portaria", "guarita", "monitoramento", "seguranca", "circuito", "porteiro"] },
  { icon: Fence, keywords: ["condominio fechado", "gradeado"] },
  { icon: KeyRound, keywords: ["portao eletronico", "acesso"] },
  { icon: Dumbbell, keywords: ["fitness"] },
  { icon: Baby, keywords: ["playground", "brinquedoteca"] },
  { icon: Gamepad2, keywords: ["quadra", "jogos"] },
  { icon: PartyPopper, keywords: ["quiosque", "salao de festas", "coworking", "home market"] },
  { icon: Heater, keywords: ["aquec", "solar", "painel solar", "gas central"] },
  { icon: Wifi, keywords: ["internet", "interfone"] },
  { icon: Building2, keywords: ["heliponto", "pilotis", "deposito", "zelador"] },
]

function normalizeFeatureLabel(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

export function getPropertyFeatureIcon(label: string): LucideIcon {
  const normalizedLabel = normalizeFeatureLabel(label)

  const mapping = FEATURE_ICON_MAP.find(({ keywords }) =>
    keywords.some((keyword) => normalizedLabel.includes(keyword))
  )

  return mapping?.icon ?? Check
}
