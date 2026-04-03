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
      className={`fixed bottom-[57px] left-0 z-[100] w-full border-t border-neutral-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex w-full max-w-lg items-center gap-2">
        {/* Price */}
        <div className="flex-1 min-w-0">
          <p className="truncate text-lg font-bold text-neutral-900">
            {formatPrice(price)}
          </p>
        </div>

        {/* Buttons */}
        <a
          href={whatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle size={16} />
          Quero visitar
        </a>
        <a
          href="tel:+554199978-0517"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          <Phone size={16} />
        </a>
      </div>
    </div>
  )
}
