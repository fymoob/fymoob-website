"use client"

import { ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface MobileInlineContactFormProps {
  propertyTitle: string
  propertyCode: string
}

export function MobileInlineContactForm({
  propertyTitle,
  propertyCode,
}: MobileInlineContactFormProps) {
  return (
    <section
      id="enviar-mensagem"
      aria-labelledby="mobile-contact-form-title"
      className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:hidden"
    >
      <h2
        id="mobile-contact-form-title"
        className="text-xl font-bold tracking-tight text-slate-900"
      >
        Envie uma mensagem
      </h2>
      <p className="mt-1.5 text-sm text-slate-500">
        Preencha os campos e um dos nossos especialistas entra em contato.
      </p>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="mt-5 space-y-3"
      >
        <input type="hidden" name="property_code" value={propertyCode} />
        <input type="hidden" name="property_title" value={propertyTitle} />

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
          className="min-h-28 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
        />
        <Button
          type="submit"
          className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Enviar mensagem
        </Button>
        <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-neutral-400">
          <ShieldCheck size={13} className="shrink-0" />
          Seus dados estão seguros. Respondemos o mais rápido possível.
        </p>
      </form>
    </section>
  )
}
