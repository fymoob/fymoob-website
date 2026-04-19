"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { getTopViewedCodes } from "@/lib/view-tracker"
import {
  filterPropertyPhotos,
  formatPrice,
  generateImageAlt,
  getPropertyImage,
} from "@/lib/utils"
import { getPropertyPriceDisplay, type PriceContext as SharedPriceContext } from "@/lib/property-price"
import type { Property } from "@/types/property"

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
 * Threshold "RECEM PUBLICADO" = 7 dias (Bruno, 19/04/2026, revisao):
 * 30d diluia o badge apos cutover (muitos imoveis reativados com
 * dataAtualizacao fresca). 7d mantem o badge selectivo e real.
 * Pulse (animacao) so nos primeiros 3 dias — hierarquia visual:
 * super-novo (pulse) > novo (estatico) > sem badge.
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
  // Destaque — prioridade maxima. Cobre tanto DestaqueWeb quanto
  // SuperDestaqueWeb do CRM pra evitar inconsistencia visual: a secao
  // "Imoveis em destaque" da home puxa do endpoint /imoveis/destaques
  // (retorna DestaqueWeb=Sim), entao todo imovel na secao precisa ter
  // o badge (Bruno 19/04). SuperDestaque pode virar variante premium
  // no futuro se quisermos hierarquia visual (ex: estrela dourada).
  if (property.superDestaqueWeb || property.destaqueWeb) {
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
  // imoveis REATIVADOS (ex: alugado 1 ano, desocupou, status voltou).
  // Threshold 7d mantem o badge selectivo; pulse primeiros 3d diferencia
  // "super-novo" de "novo".
  const dateStr = property.dataAtualizacao ?? property.dataCadastro
  if (dateStr) {
    const days = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (days <= 7) {
      return {
        type: "recemPublicado",
        text: "RECÉM PUBLICADO",
        iconName: "Sparkles",
        textColor: "text-emerald-700",
        dotColor: "bg-emerald-500",
        pulse: days <= 3, // pulse vivo nos primeiros 3 dias, estatico dias 4-7
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

function getPropertyPhotos(property: Property): string[] {
  const merged = [getPropertyImage(property), ...filterPropertyPhotos(property.fotos)]
    .filter(Boolean)
  const uniquePhotos = Array.from(new Set(merged))
  const photos = uniquePhotos.length > 0 ? uniquePhotos : ["/logo.png"]

  return photos.slice(0, MAX_CARD_PHOTOS)
}

export type PriceContext = SharedPriceContext

function resolvePrice(property: Property, ctx: PriceContext) {
  const { price, secondaryPrice, isRental, isDual, pillLabel } = getPropertyPriceDisplay(property, ctx)
  // secondaryIsRental eh o oposto de isRental quando dual
  const secondaryIsRental = isDual ? !isRental : false
  return { price, secondaryPrice, isRental, secondaryIsRental, isDual, pillLabel }
}

export function usePropertyCard(property: Property, priceContext: PriceContext = null) {
  const alt = generateImageAlt(property)
  const { price, secondaryPrice, isRental, secondaryIsRental, isDual, pillLabel } = resolvePrice(property, priceContext)
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
        }
      })
      .catch(() => {})
  }, [property.codigo, photos.length])

  const displayPhotos = dynamicPhotos ?? photos

  const hasPrice = price !== null && price > 0
  const propertyHref = `/imovel/${property.slug}`

  const hasSecondaryPrice = secondaryPrice !== null && secondaryPrice > 0

  return {
    alt,
    price,
    hasPrice,
    displayPrice: hasPrice ? formatPrice(price) : "Consultar valor",
    isRental,
    isDual,
    pillLabel,
    secondaryPrice,
    hasSecondaryPrice,
    secondaryIsRental,
    displaySecondaryPrice: hasSecondaryPrice ? formatPrice(secondaryPrice) : null,
    photos,
    displayPhotos,
    badge,
    propertyHref,
    loadPhotosOnHover,
  }
}
