import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Property, PropertyType } from "@/types/property"

/** Known logo / placeholder image hosted on Nhost */
const NHOST_LOGO_FRAGMENT = "e86f2797-7ca6-4eff-bfb2-3e54a981399e"

/**
 * Returns the best available photo for a property.
 * If fotoDestaque is the generic logo, fall back to the first real CDN photo.
 */
export function getPropertyImage(property: Property): string {
  const isLogo =
    !property.fotoDestaque || property.fotoDestaque.includes(NHOST_LOGO_FRAGMENT)

  if (!isLogo) return property.fotoDestaque

  // fotos[0] is usually the same logo; real photos start at index 1
  const realPhoto = property.fotos.find(
    (url) => url && !url.includes(NHOST_LOGO_FRAGMENT)
  )
  return realPhoto ?? property.fotoDestaque
}

/**
 * Filters out the generic logo/placeholder from a fotos array,
 * returning only real CDN photos.
 */
export function filterPropertyPhotos(fotos: string[]): string[] {
  const real = fotos.filter((url) => url && !url.includes(NHOST_LOGO_FRAGMENT))
  return real.length > 0 ? real : fotos
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: number | null): string {
  if (value === null || value === 0) return "Sob consulta"
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

/**
 * Formato compacto pra valores grandes — "R$ 1,2 mi", "R$ 350 mil".
 * Usado em sliders/filtros pra economizar espaco visual.
 * Fase 20.W1.2: consolidacao de duplicacao em PriceFilter + useSearchBarController.
 */
export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 1,
    })} mi`
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString("pt-BR", {
      maximumFractionDigits: 0,
    })} mil`
  }
  return formatPrice(value)
}

/**
 * Mascara BR para telefone — celular (9 digitos) ou fixo (8 digitos).
 * Aceita com ou sem DDD, formata incrementalmente enquanto o usuario digita.
 * Exemplos:
 *   "41" -> "(41)"
 *   "4199" -> "(41) 99"
 *   "4199978" -> "(41) 9 9978"
 *   "41999780517" -> "(41) 99978-0517"
 *   "4133221111" -> "(41) 3322-1111"
 */
export function formatPhoneBR(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11)
  if (digits.length === 0) return ""
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    // Fixo: (XX) XXXX-XXXX (ate 10 digitos)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  // Celular: (XX) XXXXX-XXXX (11 digitos)
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Retorna apenas o numero formatado. Callers adicionam "m²" quando necessario
// (evita "m² m²" em variantes de PropertyFeatures que concatenam unit).
export function formatArea(area: number | null): string {
  if (area === null) return ""
  return area.toLocaleString("pt-BR")
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}

/**
 * Generates a short, clean title for display when the CRM title is too long.
 * Format: "[Tipo] com [N] Quartos no [Bairro]"
 * Falls back to original titulo if already short enough.
 */
export function generateShortTitle(property: {
  tipo: string
  dormitorios: number | null
  bairro: string
  titulo: string
}): string {
  if (property.titulo.length <= 60) return property.titulo
  const quartos = property.dormitorios
    ? ` com ${property.dormitorios} ${property.dormitorios === 1 ? "Quarto" : "Quartos"}`
    : ""
  return `${property.tipo}${quartos} no ${property.bairro}`
}

export function generateImageAlt(property: {
  tipo: PropertyType
  dormitorios: number | null
  bairro: string
}): string {
  const quartos = property.dormitorios
    ? ` com ${property.dormitorios} quartos`
    : ""
  return `Foto do ${property.tipo}${quartos} no ${property.bairro}, Curitiba`
}

// Correcoes pontuais pra keys vindas da API Loft que tem separacoes
// erradas ou abreviacoes feias ("Sala T V" -> "Sala de TV"). Adicionar
// aqui casos novos conforme aparecerem em auditoria do CRM.
const CARAC_OVERRIDES: Record<string, string> = {
  "Sala T V": "Sala de TV",
  "T V Cabo": "TV a Cabo",
  "W C Empregada": "WC de Empregada",
  "Circuito Fechado T V": "Circuito Fechado de TV",
  "Portaria24 Hrs": "Portaria 24h",
  "Vigilancia24 Horas": "Vigilância 24h",
  "Dependenciade Empregada": "Dependência de Empregada",
  "Dependencia De Empregada": "Dependência de Empregada",
  "Copa Cozinha": "Copa/Cozinha",
  "Suite Master": "Suíte Master",
  "Area Servico": "Área de Serviço",
  "Cerca Eletrica": "Cerca Elétrica",
  "Ar Condicionado": "Ar-Condicionado",
  "Jardim Inverno": "Jardim de Inverno",
  "Estar Intimo": "Estar Íntimo",
  "Poco Artesiano": "Poço Artesiano",
  "Antena Parabolica": "Antena Parabólica",
  "Canaletas No Rodape": "Canaletas no Rodapé",
  "Construcao Alvenaria": "Construção em Alvenaria",
  "Construcao Mista": "Construção Mista",
  "Edificio Residencial": "Edifício Residencial",
  "Energia Trifasica": "Energia Trifásica",
  "Gerador Energia": "Gerador de Energia",
  "Pavimentacao": "Pavimentação",
  "Rede Esgoto": "Rede de Esgoto",
  "Sala De Recepcao": "Sala de Recepção",
  "Cabine De Forca": "Cabine de Força",
  "Entrada Servico Independente": "Entrada de Serviço Independente",
  "Portoes Com Eclusa": "Portões com Eclusa",
  "Pista Caminhada": "Pista de Caminhada",
  "Dormitorio Com Armario": "Dormitório com Armário",
  "Vigia Externo": "Vigia Externo",
  "Vigia Interno": "Vigia Interno",
  "Agua Quente": "Água Quente",
  "Ar Central": "Ar Central",
  "Espaco Gourmet": "Espaço Gourmet",
  "Espaco Zen": "Espaço Zen",
  "Salao Festas": "Salão de Festas",
  "Salao Jogos": "Salão de Jogos",
  "Vista Mar": "Vista para o Mar",
  "Vista Panoramica": "Vista Panorâmica",
  "Frente Mar": "Frente para o Mar",
  "Quadra Tenis": "Quadra de Tênis",
  "Quadra Esportes": "Quadra de Esportes",
  "Quadra Poli Esportiva": "Quadra Poliesportiva",
  "Home Theater": "Home Theater",
  "Home Market": "Home Market",
  "Seguranca Patrimonial": "Segurança Patrimonial",
  "Empresa De Monitoramento": "Monitoramento",
  "Aquecimento Central": "Aquecimento Central",
  "Aquecedor Solar": "Aquecedor Solar",
  "Porao": "Porão",
  "Sotao": "Sótão",
  "Patio": "Pátio",
  "Edicula": "Edícula",
  "Escritorio": "Escritório",
  "Onibus Proximo": "Próximo a Ônibus",
  "Aquecimento Eletrico": "Aquecimento Elétrico",
  "Porteiro Eletronico": "Porteiro Eletrônico",
  "Portao Eletronico": "Portão Eletrônico",
}

/**
 * Humaniza uma key vinda da API Loft pra label amigavel na UI.
 * A API ja retorna com espacos ("Agua Quente"), mas algumas tem
 * abreviacoes ou acentuacao faltando. Overrides acima cobrem os casos
 * conhecidos; demais passam direto (API ja formatou bem).
 */
export function humanizeCaracLabel(rawKey: string): string {
  return CARAC_OVERRIDES[rawKey] ?? rawKey
}
