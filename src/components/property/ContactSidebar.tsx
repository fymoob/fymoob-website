"use client"

import { useEffect, useState } from "react"
import { Heart, Phone, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { pushAnalyticsEvent } from "@/lib/analytics"
import { cn, formatPrice } from "@/lib/utils"
import type { Property } from "@/types/property"

const WISHLIST_STORAGE_KEY = "fymoob:wishlist"
const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

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

interface ContactSidebarProps {
  propertyTitle: string
  propertyCode: string
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: Property["finalidade"]
  valorCondominio: number | null
  valorIptu: number | null
  valorSobConsulta: boolean
  variant: "standard" | "premium"
}

export function ContactSidebar({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
  finalidade,
  valorCondominio,
  valorIptu,
  valorSobConsulta,
  variant,
}: ContactSidebarProps) {
  const isPremium = variant === "premium"
  const isDual = finalidade === "Venda e Locação" && precoVenda && precoAluguel
  const isRental = !isDual && finalidade !== "Venda"
  const price = isRental ? (precoAluguel ?? precoVenda) : (precoVenda ?? precoAluguel)
  const shouldShowConsultPrice = valorSobConsulta && !isRental
  const priceLabel = shouldShowConsultPrice
    ? "VALOR DO IMÓVEL"
    : isDual
      ? "VALOR VENDA"
      : isRental
        ? "VALOR ALUGUEL"
        : "VALOR VENDA"

  const rentalBase = isDual ? precoAluguel : isRental ? price : null
  const totalPacote = rentalBase
    ? rentalBase + (valorCondominio ?? 0) + (valorIptu ?? 0)
    : null

  const whatsMessage = `Olá! Tenho interesse no imóvel ${propertyTitle} (Cód: ${propertyCode}).`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`
  const whatsLabel = shouldShowConsultPrice
    ? "Consultar valores e disponibilidade"
    : isPremium
      ? "Falar com consultor especializado"
      : "WhatsApp"

  const [isFavorite, setIsFavorite] = useState(false)
  const [showPremiumForm, setShowPremiumForm] = useState(false)

  useEffect(() => {
    setIsFavorite(getWishlistCodes().has(propertyCode))
  }, [propertyCode])

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const next = !prev
      const wishlist = getWishlistCodes()
      if (next) wishlist.add(propertyCode)
      else wishlist.delete(propertyCode)
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(Array.from(wishlist)))
      return next
    })
  }

  const trackCTA = (channel: "whatsapp" | "phone") => {
    pushAnalyticsEvent("property_contact_click", {
      property_code: propertyCode,
      page_variant: variant,
      is_consult_price: shouldShowConsultPrice,
      channel,
      price: shouldShowConsultPrice ? null : price,
    })
  }

  const form = (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={cn(
        "space-y-3 border-t border-neutral-100",
        isPremium ? "border-0 pt-0" : "pt-5"
      )}
    >
      {isPremium && (
        <p className="text-sm leading-relaxed text-slate-500">
          Se preferir, deixe seus dados que nosso time entra em contato.
        </p>
      )}
      <Input
        type="text"
        placeholder="Seu nome"
        required
        className={cn(
          "h-11 rounded-xl border-neutral-200 placeholder:text-neutral-400",
          isPremium ? "bg-white" : "bg-neutral-50/70"
        )}
      />
      <Input
        type="email"
        placeholder="Seu e-mail"
        required
        className={cn(
          "h-11 rounded-xl border-neutral-200 placeholder:text-neutral-400",
          isPremium ? "bg-white" : "bg-neutral-50/70"
        )}
      />
      <Input
        type="tel"
        placeholder="Seu telefone"
        required
        className={cn(
          "h-11 rounded-xl border-neutral-200 placeholder:text-neutral-400",
          isPremium ? "bg-white" : "bg-neutral-50/70"
        )}
      />
      <Textarea
        placeholder="Quero saber mais sobre este imóvel..."
        className={cn(
          "min-h-24 rounded-xl border-neutral-200 placeholder:text-neutral-400",
          isPremium ? "bg-white" : "bg-neutral-50/70"
        )}
      />
      <Button
        type="submit"
        className={cn(
          "h-11 w-full rounded-xl text-sm font-semibold text-white",
          isPremium
            ? "bg-slate-900 hover:bg-slate-800"
            : "bg-brand-primary hover:bg-brand-primary-hover"
        )}
      >
        {isPremium ? "Solicitar contato" : "Enviar dúvida"}
      </Button>
      <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-neutral-400">
        <ShieldCheck size={13} className="shrink-0" />
        Seus dados estão seguros. Respondemos o mais rápido possível.
      </p>
    </form>
  )

  return (
    <Card
      className={cn(
        "relative z-40 border py-0 shadow-xl backdrop-blur-xl",
        isPremium
          ? "rounded-[30px] border-slate-200/80 bg-white/95 shadow-[0_30px_80px_rgba(15,23,42,0.14)]"
          : "border-white/50 bg-white/95"
      )}
    >
      <CardContent className={cn("px-6", isPremium ? "py-7" : "py-7")}>
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase text-white",
              isPremium ? "bg-slate-900 tracking-[0.22em]" : "bg-sky-900 tracking-wider"
            )}
          >
            Ref. {propertyCode}
          </span>
          <button
            type="button"
            onClick={toggleFavorite}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
          >
            <Heart
              className={cn(
                "size-4 transition-all",
                isFavorite
                  ? "fill-brand-primary stroke-brand-primary text-brand-primary"
                  : "fill-transparent"
              )}
            />
            Favoritar
          </button>
        </div>

        <div className={cn("mb-5", isPremium && "mb-7")}>
          <p
            className={cn(
              "text-xs font-semibold uppercase text-neutral-400",
              isPremium ? "tracking-[0.22em]" : "tracking-wider"
            )}
          >
            {priceLabel}
          </p>

          <div className={cn("mt-1.5 flex items-baseline gap-1.5", isPremium && "mt-3")}>
            <p
              className={cn(
                "tracking-tight text-slate-900",
                isPremium ? "text-[2.2rem] font-semibold leading-none" : "text-3xl font-bold"
              )}
            >
              {shouldShowConsultPrice ? "Valor sob consulta" : formatPrice(price)}
            </p>
            {isRental && <span className="text-sm text-neutral-500">/mês</span>}
          </div>

          {isDual && !shouldShowConsultPrice && (
            <div className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                VALOR ALUGUEL
              </p>
              <p className="text-xl font-bold tracking-tight text-slate-900">
                {formatPrice(precoAluguel)} <span className="text-sm font-normal text-neutral-500">/mês</span>
              </p>
            </div>
          )}

          {(valorCondominio || valorIptu) && (
            <div className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3">
              {valorCondominio && valorCondominio > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Condomínio</span>
                  <span className="text-slate-700">{formatPrice(valorCondominio)}</span>
                </div>
              )}
              {valorIptu && valorIptu > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">IPTU</span>
                  <span className="text-slate-700">{formatPrice(valorIptu)}</span>
                </div>
              )}
              {totalPacote && rentalBase && totalPacote > rentalBase && (
                <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                  <span className="text-sm font-semibold text-slate-700">Aluguel + Cond. + IPTU</span>
                  <span className="text-lg font-bold text-slate-900">{formatPrice(totalPacote)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {isPremium ? (
          <>
            <div className="space-y-3 border-t border-slate-200/80 pt-6">
              <p className="text-sm leading-7 text-slate-500">
                Conversa direta com atendimento consultivo para visita, disponibilidade e negociação.
              </p>

              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA("whatsapp")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#1fa856]"
              >
                <svg viewBox="0 0 32 32" className="size-4 fill-white">
                  <path d="M16.004 3.2C9.064 3.2 3.404 8.86 3.404 15.8c0 2.22.58 4.39 1.68 6.3L3.2 28.8l6.9-1.81a12.56 12.56 0 0 0 5.9 1.49h.004c6.94 0 12.6-5.66 12.6-12.6 0-3.37-1.31-6.53-3.69-8.91A12.52 12.52 0 0 0 16.004 3.2Zm0 23.04a10.41 10.41 0 0 1-5.31-1.45l-.38-.23-3.95 1.04 1.05-3.86-.25-.39a10.42 10.42 0 0 1-1.6-5.55c0-5.76 4.69-10.44 10.45-10.44 2.79 0 5.41 1.09 7.39 3.06a10.38 10.38 0 0 1 3.05 7.39c0 5.76-4.69 10.44-10.45 10.44Zm5.73-7.82c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.6 0 1.53 1.12 3.01 1.27 3.22.16.21 2.2 3.35 5.32 4.7.74.32 1.32.51 1.77.66.75.24 1.43.2 1.96.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.35.18-1.49-.08-.13-.29-.21-.6-.37Z" />
                </svg>
                {whatsLabel}
              </a>

              <a
                href="tel:+554199978-0517"
                onClick={() => trackCTA("phone")}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-[#0B1120] transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Phone size={16} />
                Ligar
              </a>
            </div>

            <div className="mt-5 border-t border-slate-200/80 pt-5">
              {!showPremiumForm ? (
                <button
                  type="button"
                  onClick={() => setShowPremiumForm(true)}
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                  Prefiro preencher um formulário
                </button>
              ) : (
                form
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3">
              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTA("whatsapp")}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                <svg viewBox="0 0 32 32" className="size-4 fill-white">
                  <path d="M16.004 3.2C9.064 3.2 3.404 8.86 3.404 15.8c0 2.22.58 4.39 1.68 6.3L3.2 28.8l6.9-1.81a12.56 12.56 0 0 0 5.9 1.49h.004c6.94 0 12.6-5.66 12.6-12.6 0-3.37-1.31-6.53-3.69-8.91A12.52 12.52 0 0 0 16.004 3.2Zm0 23.04a10.41 10.41 0 0 1-5.31-1.45l-.38-.23-3.95 1.04 1.05-3.86-.25-.39a10.42 10.42 0 0 1-1.6-5.55c0-5.76 4.69-10.44 10.45-10.44 2.79 0 5.41 1.09 7.39 3.06a10.38 10.38 0 0 1 3.05 7.39c0 5.76-4.69 10.44-10.45 10.44Zm5.73-7.82c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.6 0 1.53 1.12 3.01 1.27 3.22.16.21 2.2 3.35 5.32 4.7.74.32 1.32.51 1.77.66.75.24 1.43.2 1.96.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.35.18-1.49-.08-.13-.29-.21-.6-.37Z" />
                </svg>
                {whatsLabel}
              </a>
              <a
                href="tel:+554199978-0517"
                onClick={() => trackCTA("phone")}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-[#0B1120] transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                <Phone size={16} />
                Ligar
              </a>
            </div>

            {form}
          </>
        )}
      </CardContent>
    </Card>
  )
}
