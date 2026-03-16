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
  const whatsMessage = `Olá! Tenho interesse no imóvel ${propertyTitle} (Cód: ${propertyCode}). Gostaria de mais informações.`

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex gap-3">
        <a
          href="tel:+554199978-0517"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-fymoob-blue px-6 py-3 font-medium text-white transition-colors hover:bg-fymoob-blue-dark"
        >
          <Phone size={18} />
          Ligar
        </a>
        <WhatsAppButton
          message={whatsMessage}
          className="flex-1"
        />
      </div>

      {/* Price */}
      <PriceDisplay
        precoVenda={precoVenda}
        precoAluguel={precoAluguel}
        finalidade={finalidade}
        size="lg"
      />

      {/* Contact Form */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold italic text-fymoob-blue">
          Proposta
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            // TODO: integrate with API
          }}
          className="space-y-3"
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Seu nome completo" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(41) 99999-9999"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Dúvidas</Label>
            <Textarea
              id="message"
              placeholder="Escreva sua mensagem ou dúvida..."
              rows={4}
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg bg-fymoob-blue py-3 text-white hover:bg-fymoob-blue-dark"
          >
            Enviar proposta
          </Button>
        </form>
      </div>
    </div>
  )
}
