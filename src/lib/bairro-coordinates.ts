/**
 * Coordenadas centrais aproximadas dos bairros de Curitiba.
 * Usadas como fallback quando o imóvel não tem lat/lng próprios.
 */
export const bairroCoordinates: Record<string, { lat: number; lng: number }> = {
  "Alto Boqueirão": { lat: -25.5217, lng: -49.2350 },
  "Alto da Glória": { lat: -25.4100, lng: -49.2590 },
  "Alto da Rua XV": { lat: -25.4370, lng: -49.2640 },
  "Atuba": { lat: -25.3720, lng: -49.2430 },
  "Bairro Alto": { lat: -25.3780, lng: -49.2280 },
  "Barreirinha": { lat: -25.3530, lng: -49.2700 },
  "Batel": { lat: -25.4400, lng: -49.2900 },
  "Bigorrilho": { lat: -25.4350, lng: -49.2960 },
  "Boa Vista": { lat: -25.3880, lng: -49.2470 },
  "Boqueirão": { lat: -25.5020, lng: -49.2480 },
  "Cabral": { lat: -25.4010, lng: -49.2680 },
  "Cachoeira": { lat: -25.3580, lng: -49.2140 },
  "Cajuru": { lat: -25.4580, lng: -49.2260 },
  "Campina do Siqueira": { lat: -25.4460, lng: -49.3020 },
  "Campo Comprido": { lat: -25.4530, lng: -49.3190 },
  "Campo de Santana": { lat: -25.5600, lng: -49.3060 },
  "Capão Raso": { lat: -25.5080, lng: -49.2970 },
  "Capão da Imbuia": { lat: -25.4400, lng: -49.2290 },
  "Centro": { lat: -25.4284, lng: -49.2733 },
  "Cidade Industrial": { lat: -25.4950, lng: -49.3480 },
  "Cristo Rei": { lat: -25.4360, lng: -49.2500 },
  "Ecoville": { lat: -25.4500, lng: -49.3350 },
  "Fazendinha": { lat: -25.4870, lng: -49.3180 },
  "Guaíra": { lat: -25.4700, lng: -49.2700 },
  "Hauer": { lat: -25.4880, lng: -49.2620 },
  "Juvevê": { lat: -25.4110, lng: -49.2680 },
  "Lindóia": { lat: -25.4690, lng: -49.2370 },
  "Mossunguê": { lat: -25.4470, lng: -49.3260 },
  "Mêrces": { lat: -25.4300, lng: -49.2940 },
  "Novo Mundo": { lat: -25.4930, lng: -49.2770 },
  "Orleans": { lat: -25.4580, lng: -49.3420 },
  "Pilarzinho": { lat: -25.3880, lng: -49.2900 },
  "Pinheirinho": { lat: -25.5200, lng: -49.3060 },
  "Portão": { lat: -25.4760, lng: -49.2910 },
  "Prado Velho": { lat: -25.4530, lng: -49.2550 },
  "Rebouças": { lat: -25.4490, lng: -49.2640 },
  "Santa Cândida": { lat: -25.3570, lng: -49.2560 },
  "Santa Quitéria": { lat: -25.4680, lng: -49.3070 },
  "Seminário": { lat: -25.4410, lng: -49.2980 },
  "São Brás": { lat: -25.3590, lng: -49.2360 },
  "São Miguel": { lat: -25.3540, lng: -49.2150 },
  "Sítio Cercado": { lat: -25.5380, lng: -49.2870 },
  "Tatuquara": { lat: -25.5510, lng: -49.3100 },
  "Tingui": { lat: -25.3730, lng: -49.2760 },
  "Uberaba": { lat: -25.4720, lng: -49.2270 },
  "Umbará": { lat: -25.5730, lng: -49.2770 },
  "Vila Izabel": { lat: -25.4560, lng: -49.2900 },
  "Xaxim": { lat: -25.5100, lng: -49.2680 },
  "Água Verde": { lat: -25.4530, lng: -49.2830 },
}

/** Curitiba centro — fallback final */
export const CURITIBA_CENTER = { lat: -25.4284, lng: -49.2733 }

export function getPropertyCoordinates(
  latitude: number | null,
  longitude: number | null,
  bairro: string
): { lat: number; lng: number } | null {
  if (latitude && longitude) {
    return { lat: latitude, lng: longitude }
  }
  return bairroCoordinates[bairro] ?? CURITIBA_CENTER
}
