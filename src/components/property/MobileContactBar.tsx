"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, TrendingUp } from "lucide-react"

import { pushAnalyticsEvent } from "@/lib/analytics"
import { formatPrice } from "@/lib/utils"
import type { PropertyPageVariant } from "@/types/property"

interface MobileContactBarProps {
  propertyTitle: string
  propertyCode: string
  precoVenda?: number | null
  precoAluguel?: number | null
  finalidade?: string
  valorSobConsulta?: boolean
  variant: PropertyPageVariant
  dataCadastro?: string | null
  bairro?: string
  precoMedioBairro?: number | null
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

function getUrgencyMessage({
  dataCadastro,
  bairro,
  precoVenda,
  precoMedioBairro,
}: {
  dataCadastro?: string | null
  bairro?: string
  precoVenda?: number | null
  precoMedioBairro?: number | null
}) {
  if (dataCadastro) {
    const daysAgo = Math.floor(
      (Date.now() - new Date(dataCadastro).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysAgo <= 3) {
      return {
        icon: Sparkles,
        text: "Novo publicado recentemente",
        color: "text-amber-700 bg-amber-50",
      }
    }

    if (daysAgo <= 7) {
      return {
        icon: Sparkles,
        text: `Novo há ${daysAgo} dias`,
        color: "text-amber-700 bg-amber-50",
      }
    }
  }

  if (precoVenda && precoMedioBairro && precoVenda < precoMedioBairro * 0.9) {
    const pct = Math.round(((precoMedioBairro - precoVenda) / precoMedioBairro) * 100)
    return {
      icon: TrendingUp,
      text: `${pct}% abaixo da média${bairro ? ` - ${bairro}` : ""}`,
      color: "text-emerald-700 bg-emerald-50",
    }
  }

  return null
}

export function MobileContactBar({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
  finalidade,
  valorSobConsulta = false,
  variant,
  dataCadastro,
  bairro,
  precoMedioBairro,
}: MobileContactBarProps) {
  const isPremium = variant === "premium"
  const isDual = finalidade === "Venda e Locação" && precoVenda && precoAluguel
  const isRental = !isDual && finalidade !== "Venda"
  const shouldShowConsultPrice = valorSobConsulta && !isRental
  const price = isRental ? (precoAluguel ?? precoVenda ?? null) : (precoVenda ?? precoAluguel ?? null)
  const urgency = isPremium
    ? null
    : getUrgencyMessage({ dataCadastro, bairro, precoVenda, precoMedioBairro })

  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 100) {
        setNavHidden(true)
      } else {
        setNavHidden(false)
      }

      lastScrollY.current = currentY

      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => setNavHidden(false), 2000)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(idleTimer)
    }
  }, [])

  const whatsMessage = `Olá! Tenho interesse no imóvel ${propertyTitle} (Cód: ${propertyCode}). Gostaria de mais informações.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`
  const whatsLabel = shouldShowConsultPrice
    ? "Consultar valores"
    : isPremium
      ? "Falar com consultor"
      : "Quero visitar"

  const trackCTA = () => {
    pushAnalyticsEvent("property_contact_click", {
      property_code: propertyCode,
      page_variant: variant,
      is_consult_price: shouldShowConsultPrice,
      channel: "whatsapp",
      price: shouldShowConsultPrice ? null : price,
    })
  }

  return (
    <div
      className="fixed left-0 z-[100] w-full border-t border-neutral-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] transition-[bottom] duration-300 md:hidden"
      style={{ bottom: navHidden ? 0 : 64 }}
    >
      {urgency && (
        <div className={`flex items-center justify-center gap-1.5 px-4 py-2 ${urgency.color}`}>
          <urgency.icon size={14} className="shrink-0" />
          <p className="text-xs font-semibold">{urgency.text}</p>
        </div>
      )}

      <div className="border-t border-neutral-100 px-4 py-3">
        <div className="mx-auto flex w-full max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            {shouldShowConsultPrice ? (
              <>
                <p className="truncate text-lg font-extrabold text-slate-900">
                  Valor sob consulta
                </p>
                <p className="truncate text-xs text-neutral-400">
                  Atendimento consultivo e disponibilidade pelo WhatsApp
                </p>
              </>
            ) : isDual ? (
              <>
                <p className="truncate text-lg font-extrabold text-slate-900">
                  {formatPrice(price)}
                </p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  Aluguel {formatPrice(precoAluguel)} <span className="font-normal">/mês</span>
                </p>
              </>
            ) : (
              <>
                <p className="truncate text-lg font-extrabold text-slate-900">
                  {formatPrice(price)}
                  {isRental && <span className="text-sm font-normal text-neutral-500"> /mês</span>}
                </p>
                {isPremium && !isRental && (
                  <p className="truncate text-xs text-neutral-400">
                    Atendimento rápido com corretor especializado
                  </p>
                )}
              </>
            )}
          </div>

          <a
            href={whatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackCTA}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
          >
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            {whatsLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
