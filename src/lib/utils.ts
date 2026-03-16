import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PropertyType } from "@/types/property"

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
  // Use existing slug from mock data as the canonical slug
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
