"use client"

import * as React from "react"
import { Phone, MessageCircle, Loader2, CheckCircle2 } from "lucide-react"
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
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = React.useState("")
  const formRef = React.useRef<HTMLFormElement>(null)

  const price = precoVenda ?? precoAluguel
  const priceLabel = finalidade === "Locação" || finalidade === "Venda e Locação" ? "VALOR ALUGUEL" : "VALOR VENDA"
  const whatsMessage = `Olá! Tenho interesse no imóvel ${propertyTitle} (Cód: ${propertyCode}). Gostaria de mais informações.`
  const whatsUrl = `https://wa.me/${FYMOOB_PHONE}?text=${encodeURIComponent(whatsMessage)}`

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome"),
          email: formData.get("email"),
          fone: formData.get("fone"),
          mensagem: formData.get("mensagem"),
          codigoImovel: propertyCode,
          interesse: finalidade === "Locação" || finalidade === "Venda e Locação" ? "Aluguel" : "Venda",
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Erro ao enviar")
      }

      setStatus("success")
      formRef.current?.reset()
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.")
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
      {price && (
        <div className="mb-6">
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {priceLabel}
          </span>
          <p className="mt-1 text-2xl font-bold text-brand-primary">
            {formatPrice(price)}
          </p>
        </div>
      )}

      <div className="mb-6 flex gap-3">
        <a
          href={whatsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition hover:bg-[#1da851]"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:+${FYMOOB_PHONE}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
        >
          <Phone className="h-4 w-4" />
          Ligar
        </a>
      </div>

      <h3 className="text-base font-semibold text-neutral-900">
        Enviar proposta
      </h3>

      {status === "success" ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div>
            <label htmlFor="contact-name" className="text-sm font-medium text-neutral-700">
              Nome
            </label>
            <input
              id="contact-name"
              name="nome"
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
              name="email"
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
              name="fone"
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
              name="mensagem"
              placeholder="Escreva sua mensagem..."
              rows={3}
              className="mt-1 w-full resize-none border-0 border-b border-neutral-200 bg-transparent px-0 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-brand-primary focus:outline-none focus:ring-0"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar proposta"
            )}
          </button>
        </form>
      )}
    </div>
  )
}
