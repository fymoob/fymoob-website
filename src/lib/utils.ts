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
    minimumFractionDigits: 2,
  })
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

export function generatePropertySlug(property: {
  tipo: string
  bairro: string
  cidade: string
  estado: string
  dormitorios?: number | null
  areaPrivativa?: number | null
  slug: string
}): string {
  // Use existing slug as the canonical slug
  return property.slug
}

export function formatArea(area: number | null): string {
  if (area === null) return ""
  return `${area.toLocaleString("pt-BR")} m²`
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
