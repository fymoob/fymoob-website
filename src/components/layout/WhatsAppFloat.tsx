"use client"

import { MessageCircle } from "lucide-react"

const FYMOOB_PHONE = "5541999780517"

export function WhatsAppFloat() {
  const message = "Olá! Gostaria de mais informações sobre os imóveis da FYMOOB."
  const url = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  )
}
