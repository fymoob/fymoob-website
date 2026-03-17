"use client"

import { Phone, MessageCircle } from "lucide-react"

interface MobileContactBarProps {
  propertyTitle: string
  propertyCode: string
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

export function MobileContactBar({ propertyTitle, propertyCode }: MobileContactBarProps) {
  const whatsMessage = `Ola! Tenho interesse no imovel ${propertyTitle} (Cod: ${propertyCode}). Gostaria de mais informacoes.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <a
          href="tel:+554199978-0517"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover active:scale-[0.98]"
        >
          <Phone size={16} />
          Ligar
        </a>
        <a
          href={whatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#20bd5a] active:scale-[0.98]"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
