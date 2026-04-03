"use client"

import { Phone, ShieldCheck } from "lucide-react"

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
    <Card className="sticky top-20 z-10 border border-neutral-200 py-0 shadow-xl">
      <CardContent className="px-6 py-7">
        {/* Price block */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {priceLabel}
          </p>
          <p className="mt-1.5 text-3xl font-bold tracking-tight text-brand-primary">
            {formatPrice(price)}
          </p>
          {finalidade === "Venda e Locação" && precoAluguel && (
            <p className="mt-1 text-sm text-neutral-500">
              Aluguel: {formatPrice(precoAluguel)}
            </p>
          )}
        </div>

        {/* Action buttons — side by side */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <a
            href={whatsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <svg viewBox="0 0 32 32" className="size-4 fill-white">
              <path d="M16.004 3.2C9.064 3.2 3.404 8.86 3.404 15.8c0 2.22.58 4.39 1.68 6.3L3.2 28.8l6.9-1.81a12.56 12.56 0 0 0 5.9 1.49h.004c6.94 0 12.6-5.66 12.6-12.6 0-3.37-1.31-6.53-3.69-8.91A12.52 12.52 0 0 0 16.004 3.2Zm0 23.04a10.41 10.41 0 0 1-5.31-1.45l-.38-.23-3.95 1.04 1.05-3.86-.25-.39a10.42 10.42 0 0 1-1.6-5.55c0-5.76 4.69-10.44 10.45-10.44 2.79 0 5.41 1.09 7.39 3.06a10.38 10.38 0 0 1 3.05 7.39c0 5.76-4.69 10.44-10.45 10.44Zm5.73-7.82c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.7.16-.21.31-.81 1.02-.99 1.23-.18.21-.37.23-.68.08-.31-.16-1.32-.49-2.52-1.56-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.6 0 1.53 1.12 3.01 1.27 3.22.16.21 2.2 3.35 5.32 4.7.74.32 1.32.51 1.77.66.75.24 1.43.2 1.96.12.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.35.18-1.49-.08-.13-.29-.21-.6-.37Z" />
            </svg>
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

        {/* Lead form */}
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
            placeholder="Quero saber mais sobre este imóvel..."
            className="min-h-24 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-brand-primary text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Enviar proposta
          </Button>
          <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-neutral-400">
            <ShieldCheck size={13} className="shrink-0" />
            Seus dados estão seguros. Resposta em até 2h.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
