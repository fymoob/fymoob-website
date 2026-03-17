"use client"

import { useEffect, useState } from "react"
import { Phone, MessageCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface MobileContactBarProps {
  propertyTitle: string
  propertyCode: string
  precoVenda?: number | null
  precoAluguel?: number | null
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

export function MobileContactBar({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
}: MobileContactBarProps) {
  const [visible, setVisible] = useState(false)
  const price = precoVenda ?? precoAluguel ?? null

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const whatsMessage = `Ola! Tenho interesse no imovel ${propertyTitle} (Cod: ${propertyCode}). Gostaria de mais informacoes.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white p-3 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        {/* Price */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-lg font-bold text-neutral-900">
            {formatPrice(price)}
          </p>
        </div>

        {/* Buttons */}
        <a
          href="tel:+554199978-0517"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Phone size={14} />
          Ligar
        </a>
        <a
          href={whatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
