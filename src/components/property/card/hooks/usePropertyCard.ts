"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { getTopViewedCodes } from "@/lib/view-tracker"
import {
  filterPropertyPhotos,
  formatPrice,
  generateImageAlt,
  getPropertyImage,
} from "@/lib/utils"
import type { Property } from "@/types/property"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"
const MAX_CARD_PHOTOS = 5

/**
 * Sistema de badges unificado (glass morphism) — Fase 13.12.
 *
 * Tiers semanticos:
 * - BADGE = status estatico (nao interativo). Aqui.
 * - PILL = info contextual (venda/aluguel). Ja esta bom no codigo.
 * - CHIP = filtro interativo. Nos filtros da busca.
 *
 * Base visual: glass com accent color (texto + dot). Sobrepoe bem fotos.
 *
 * Threshold "RECEM PUBLICADO" = 30 dias (Bruno, 16/04/2026):
 * negociacao imobiliaria e lenta, 30d ainda e "recente" para o publico.
 */
export type BadgeType = "recemPublicado" | "lancamento" | "maisVisto" | "destaque"

export interface CardBadge {
  type: BadgeType
  text: string
  iconName: "Sparkles" | "Rocket" | "Flame" | "Star"
  textColor: string // text-{color}-700
  dotColor: string // bg-{color}-500
  pulse?: boolean // animate-ping dot (somente status temporais)
}

export function getBadge(
  property: Property,
  topViewed?: Set<string>
): CardBadge | null {
  // Destaque premium (superDestaqueWeb) — prioridade maxima
  if (property.superDestaqueWeb) {
    return {
      type: "destaque",
      text: "DESTAQUE",
      iconName: "Star",
      textColor: "text-amber-700",
      dotColor: "bg-amber-500",
    }
  }

  // Lançamento — antes do recem publicado pq é categoria mais forte
  if (property.lancamento) {
    return {
      type: "lancamento",
      text: "LANÇAMENTO",
      iconName: "Rocket",
      textColor: "text-brand-primary",
      dotColor: "bg-brand-primary",
    }
  }

  // Recem publicado — usa dataAtualizacao (fallback dataCadastro) pra capturar
  // imoveis REATIVADOS (ex: alugado 1 ano, desocupou, status voltou). Threshold
  // 30d porque negociacao imobiliaria e mais lenta que e-commerce.
  const dateStr = property.dataAtualizacao ?? property.dataCadastro
  if (dateStr) {
    const days = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (days <= 30) {
      return {
        type: "recemPublicado",
        text: "RECÉM PUBLICADO",
        iconName: "Sparkles",
        textColor: "text-emerald-700",
        dotColor: "bg-emerald-500",
        pulse: days <= 7, // pulse vivo pra primeiros 7 dias, estatico depois
      }
    }
  }

  // Mais visto (top 15%) — por ultimo pq e derivado de comportamento
  if (topViewed?.has(property.codigo)) {
    return {
      type: "maisVisto",
      text: "MAIS VISTO",
      iconName: "Flame",
      textColor: "text-rose-700",
      dotColor: "bg-rose-500",
    }
  }

  return null
}

function getWishlistCodes(): Set<string> {
  if (typeof window === "undefined") return new Set<string>()

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (!raw) return new Set<string>()

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? new Set(parsed.filter((item): item is string => typeof item === "string"))
      : new Set<string>()
  } catch {
    return new Set<string>()
  }
}

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)]
    .filter(Boolean)
  const uniquePhotos = Array.from(new Set(merged))
  const photos = uniquePhotos.length > 0 ? uniquePhotos : ["/logo.png"]

  return photos.slice(0, MAX_CARD_PHOTOS)
}

export type PriceContext = "venda" | "locacao" | null

function resolvePrice(property: Property, ctx: PriceContext) {
  const venda = property.precoVenda && property.precoVenda > 0 ? property.precoVenda : null
  const aluguel = property.precoAluguel && property.precoAluguel > 0 ? property.precoAluguel : null
  const isDual = property.finalidade === "Venda e Locação" && venda && aluguel

  if (isDual && ctx === "locacao") {
    return { price: aluguel, secondaryPrice: venda, isRental: true, secondaryIsRental: false }
  }
  if (isDual) {
    return { price: venda, secondaryPrice: aluguel, isRental: false, secondaryIsRental: true }
  }

  const price = venda ?? aluguel
  const isRental = !venda && !!aluguel
  return { price, secondaryPrice: null, isRental, secondaryIsRental: false }
}

export function usePropertyCard(property: Property, priceContext: PriceContext = null) {
  const alt = generateImageAlt(property)
  const { price, secondaryPrice, isRental, secondaryIsRental } = resolvePrice(property, priceContext)
  const photos = useMemo(() => getPropertyPhotos(property), [property])
  const [topViewed, setTopViewed] = useState<Set<string>>(new Set())

  useEffect(() => {
    const load = () => setTopViewed(getTopViewedCodes())
    if ("requestIdleCallback" in window) {
      requestIdleCallback(load)
    } else {
      load()
    }
  }, [])

  const badge = useMemo(() => getBadge(property, topViewed), [property, topViewed])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [dynamicPhotos, setDynamicPhotos] = useState<string[] | null>(null)
  const fetchedRef = useRef(false)

  const loadPhotosOnHover = useCallback(() => {
    if (fetchedRef.current || photos.length > 1) return

    fetchedRef.current = true
    fetch(`/api/photos/${property.codigo}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((apiPhotos: string[]) => {
        if (apiPhotos.length > 1) {
          setDynamicPhotos(apiPhotos)
          setCurrentSlide(0)
        }
      })
      .catch(() => {})
  }, [property.codigo, photos.length])

  const displayPhotos = dynamicPhotos ?? photos

  useEffect(() => {
    const check = () => setIsFavorite(getWishlistCodes().has(property.codigo))
    if ("requestIdleCallback" in window) {
      requestIdleCallback(check)
    } else {
      check()
    }
  }, [property.codigo])

  const hasPrice = price !== null && price > 0
  const propertyHref = `/imovel/${property.slug}`

  const toggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()

    setIsFavorite((previous) => {
      const next = !previous
      const wishlist = getWishlistCodes()

      if (next) {
        wishlist.add(property.codigo)
      } else {
        wishlist.delete(property.codigo)
      }

      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(Array.from(wishlist))
      )

      return next
    })
  }

  const goPrev = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide((previous) =>
      previous <= 0 ? displayPhotos.length - 1 : previous - 1
    )
  }

  const goNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide((previous) => (previous + 1) % displayPhotos.length)
  }

  const goToSlide = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setCurrentSlide(index)
  }

  const hasSecondaryPrice = secondaryPrice !== null && secondaryPrice > 0

  return {
    alt,
    price,
    hasPrice,
    displayPrice: hasPrice ? formatPrice(price) : "Consultar valor",
    isRental,
    secondaryPrice,
    hasSecondaryPrice,
    secondaryIsRental,
    displaySecondaryPrice: hasSecondaryPrice ? formatPrice(secondaryPrice) : null,
    photos,
    displayPhotos,
    badge,
    currentSlide,
    isFavorite,
    propertyHref,
    loadPhotosOnHover,
    toggleFavorite,
    goPrev,
    goNext,
    goToSlide,
  }
}
