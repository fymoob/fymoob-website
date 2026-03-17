"use client"

import * as React from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PriceDisplay } from "@/components/shared/PriceDisplay"
import { WhatsAppButton } from "@/components/shared/WhatsAppButton"

interface PropertyContactProps {
  propertyTitle: string
  propertyCode: string
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: string
}

export function PropertyContact({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
  finalidade,
}: PropertyContactProps) {
  const whatsMessage = `Ola! Tenho interesse no imovel ${propertyTitle} (Cod: ${propertyCode}). Gostaria de mais informacoes.`

  return (
    <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-6">
      {/* Price */}
      <PriceDisplay
        precoVenda={precoVenda}
        precoAluguel={precoAluguel}
        finalidade={finalidade}
        size="lg"
      />

      {/* Action buttons */}
      <div className="flex gap-3">
        <a
          href="tel:+554199978-0517"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg active:scale-[0.98]"
        >
          <Phone size={18} />
          Ligar
        </a>
        <WhatsAppButton
          message={whatsMessage}
          className="flex-1 rounded-xl"
        />
      </div>

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-neutral-950">
          Enviar proposta
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: integrate with API
          }}
          className="space-y-3"
        >
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-neutral-700">Nome</Label>
            <Input id="name" placeholder="Seu nome completo" required className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-neutral-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(41) 99999-9999"
              required
              className="rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-sm font-medium text-neutral-700">Duvidas</Label>
            <Textarea
              id="message"
              placeholder="Escreva sua mensagem ou duvida..."
              rows={4}
              className="rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-xl bg-brand-primary py-3 text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg active:scale-[0.98]"
          >
            Enviar proposta
          </Button>
        </form>
      </div>
    </div>
  )
}
