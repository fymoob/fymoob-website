"use client"

import { useEffect, useState } from "react"
import { Phone } from "lucide-react"
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
          <svg viewBox="0 0 24 24" className="size-4 fill-white shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
          </svg>
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
