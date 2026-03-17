"use client"

import * as React from "react"
import { Phone, MessageCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface PropertyContactProps {
  propertyTitle: string
  propertyCode: string
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: string
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

export function PropertyContact({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
  finalidade,
}: PropertyContactProps) {
  const price = precoVenda ?? precoAluguel
  const priceLabel = finalidade === "Locação" ? "VALOR ALUGUEL" : "VALOR VENDA"
  const whatsMessage = `Ola! Tenho interesse no imovel ${propertyTitle} (Cod: ${propertyCode}). Gostaria de mais informacoes.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
      {/* Price */}
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {priceLabel}
        </p>
        <p className="mt-1 text-3xl font-bold text-neutral-900">
          {formatPrice(price)}
        </p>
        {finalidade === "Venda e Locação" && precoAluguel && (
          <p className="mt-1 text-sm text-neutral-500">
            Aluguel: {formatPrice(precoAluguel)}
          </p>
        )}
      </div>

      {/* Stacked action buttons */}
      <div className="space-y-3">
        <a
          href="tel:+554199978-0517"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <Phone size={16} />
          Ligar
        </a>
        <a
          href={whatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-neutral-100" />

      {/* Contact Form */}
      <h3 className="text-base font-semibold text-neutral-900">
        Enviar proposta
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="mt-4 space-y-5"
      >
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-neutral-700">
            Nome
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Seu nome completo"
            required
            className="mt-1 w-full border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-neutral-700">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="seu@email.com"
            required
            className="mt-1 w-full border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-neutral-700">
            Telefone
          </label>
          <input
            id="contact-phone"
            type="tel"
            placeholder="(41) 99999-9999"
            required
            className="mt-1 w-full border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm font-medium text-neutral-700">
            Dúvidas
          </label>
          <textarea
            id="contact-message"
            placeholder="Escreva sua mensagem..."
            rows={3}
            className="mt-1 w-full resize-none border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-0"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
        >
          Enviar proposta
        </button>
      </form>
    </div>
  )
}
