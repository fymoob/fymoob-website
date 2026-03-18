"use client"

import { MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formatPrice } from "@/lib/utils"
import type { Property } from "@/types/property"

interface ContactSidebarProps {
  propertyTitle: string
  propertyCode: string
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: Property["finalidade"]
}

const FYMOOB_PHONE = "554199978-0517".replace(/\D/g, "")

export function ContactSidebar({
  propertyTitle,
  propertyCode,
  precoVenda,
  precoAluguel,
  finalidade,
}: ContactSidebarProps) {
  const price = precoVenda ?? precoAluguel
  const priceLabel = finalidade === "Locação" ? "VALOR ALUGUEL" : "VALOR VENDA"
  const whatsMessage = `Ola! Tenho interesse no imovel ${propertyTitle} (Cod: ${propertyCode}).`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`

  return (
    <Card className="sticky top-24 z-10 border border-neutral-200 py-0 shadow-xl">
      <CardContent className="space-y-6 px-6 py-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {priceLabel}
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-[#0B1120]">
            {formatPrice(price)}
          </p>
          {finalidade === "Venda e Locação" && precoAluguel && (
            <p className="mt-1 text-sm text-neutral-500">
              Aluguel: {formatPrice(precoAluguel)}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          <a
            href={whatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href="tel:+554199978-0517"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-[#0B1120] transition-colors hover:border-brand-primary hover:text-brand-primary"
          >
            <Phone size={16} />
            Ligar
          </a>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-3 border-t border-neutral-100 pt-5"
        >
          <Input
            type="text"
            placeholder="Seu nome"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Input
            type="email"
            placeholder="Seu e-mail"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Input
            type="tel"
            placeholder="Seu telefone"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Textarea
            placeholder="Quero saber mais sobre este imovel..."
            className="min-h-24 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Enviar proposta
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
