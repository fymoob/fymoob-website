import type { LucideIcon } from "lucide-react"
import {
  Accessibility,
  AirVent,
  ArrowUpDown,
  Baby,
  Bath,
  BedDouble,
  BedSingle,
  BellRing,
  Bike,
  Building2,
  CarFront,
  Cctv,
  Check,
  ChefHat,
  CookingPot,
  Dog,
  DoorClosed,
  DoorOpen,
  Droplets,
  Dumbbell,
  Eye,
  Fence,
  Flame,
  FlameKindling,
  Flower,
  Gamepad2,
  Heater,
  Helicopter,
  House,
  KeyRound,
  Lamp,
  Layers,
  LaptopMinimal,
  Package,
  PaintRoller,
  PartyPopper,
  PawPrint,
  Phone,
  Shield,
  Sofa,
  SolarPanel,
  Sprout,
  Store,
  Thermometer,
  TreePine,
  Trophy,
  Tv,
  UserRound,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  Wine,
} from "lucide-react"

interface FeatureIconMapping {
  icon: LucideIcon
  keywords: string[]
}

const FEATURE_ICON_MAP: FeatureIconMapping[] = [
  // --- Specific matches first (avoid false positives from broader keywords) ---
  { icon: PawPrint, keywords: ["pet place"] },
  { icon: Dog, keywords: ["pet"] },
  { icon: Wine, keywords: ["adega", "bar"] },
  { icon: BellRing, keywords: ["alarme"] },
  { icon: Accessibility, keywords: ["deficientes"] },
  { icon: Cctv, keywords: ["circuito"] },
  { icon: ChefHat, keywords: ["gourmet"] },
  { icon: Flower, keywords: ["espaco zen", "jardim de inverno"] },
  { icon: Store, keywords: ["home market"] },
  { icon: FlameKindling, keywords: ["lareira"] },
  { icon: CookingPot, keywords: ["copa"] },
  { icon: UtensilsCrossed, keywords: ["sala de jantar"] },
  { icon: BedDouble, keywords: ["suite master", "dormitorio com armario"] },
  { icon: BedSingle, keywords: ["dependencia de empregada"] },
  { icon: LaptopMinimal, keywords: ["escritorio", "coworking"] },
  { icon: House, keywords: ["edicula"] },
  { icon: Package, keywords: ["despensa", "deposito"] },
  { icon: DoorClosed, keywords: ["armarios embutidos"] },
  { icon: PaintRoller, keywords: ["reformado"] },
  { icon: Layers, keywords: ["piso elevado"] },
  { icon: Sofa, keywords: ["mobiliado", "sala de estar", "sala com armarios"] },
  { icon: Eye, keywords: ["vista panoramica"] },
  { icon: SolarPanel, keywords: ["painel solar", "aquecedor solar"] },
  { icon: Helicopter, keywords: ["heliponto"] },
  { icon: Sprout, keywords: ["horta"] },
  { icon: Phone, keywords: ["interfone", "porteiro eletronico"] },
  { icon: Trophy, keywords: ["quadra"] },
  { icon: Thermometer, keywords: ["sauna"] },
  { icon: UserRound, keywords: ["zelador"] },
  { icon: Bath, keywords: ["hidro"] },

  // --- Broader categories ---
  { icon: Droplets, keywords: ["agua", "banheiro", "lavabo", "spa"] },
  { icon: WashingMachine, keywords: ["area de servico", "lavanderia"] },
  { icon: Flame, keywords: ["cozinha", "churrasqueira"] },
  { icon: Tv, keywords: ["tv", "home theater"] },
  { icon: Lamp, keywords: ["estar intimo"] },
  { icon: DoorOpen, keywords: ["sacada", "terraco", "deck"] },
  { icon: TreePine, keywords: ["quintal", "jardim", "parque"] },
  { icon: AirVent, keywords: ["ar condicionado", "split", "ar central", "espera para split"] },
  { icon: Waves, keywords: ["piscina", "frente mar", "vista para o mar"] },
  { icon: ArrowUpDown, keywords: ["elevador"] },
  { icon: CarFront, keywords: ["estacionamento"] },
  { icon: Bike, keywords: ["biciclet"] },
  { icon: Shield, keywords: ["portaria", "guarita", "monitoramento", "seguranca", "vigilancia"] },
  { icon: Fence, keywords: ["condominio fechado", "gradeado"] },
  { icon: KeyRound, keywords: ["portao eletronico"] },
  { icon: Dumbbell, keywords: ["fitness"] },
  { icon: Baby, keywords: ["playground", "brinquedoteca"] },
  { icon: Gamepad2, keywords: ["jogos"] },
  { icon: PartyPopper, keywords: ["quiosque", "salao de festas"] },
  { icon: Heater, keywords: ["aquec", "gas central"] },
  { icon: Wifi, keywords: ["internet"] },
  { icon: Building2, keywords: ["pilotis"] },
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
