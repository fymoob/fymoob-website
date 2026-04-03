"use client"

import { useState } from "react"
import { Send, Loader2, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.get("nome"),
          email: data.get("email"),
          fone: data.get("fone"),
          mensagem: data.get("mensagem"),
          interesse: data.get("interesse") || "Contato pelo site",
          veiculo: "Site FYMOOB - Pagina Contato",
        }),
      })

      if (res.ok) {
        setStatus("sent")
        form.reset()
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-500" />
        <p className="mt-3 font-display text-lg font-bold text-emerald-800">
          Mensagem enviada!
        </p>
        <p className="mt-1 text-sm text-emerald-600">
          Recebemos sua mensagem e retornaremos em breve. Obrigado pelo contato!
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-emerald-700 underline hover:text-emerald-900"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
          Nome completo *
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          placeholder="Seu nome"
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="fone" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
            Telefone *
          </label>
          <input
            id="fone"
            name="fone"
            type="tel"
            required
            placeholder="(41) 99999-9999"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="interesse" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
          Assunto
        </label>
        <select
          id="interesse"
          name="interesse"
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        >
          <option value="Comprar imovel">Quero comprar um imovel</option>
          <option value="Alugar imovel">Quero alugar um imovel</option>
          <option value="Vender imovel">Quero vender meu imovel</option>
          <option value="Anunciar imovel">Quero anunciar meu imovel</option>
          <option value="Duvida geral">Duvida geral</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={4}
          placeholder="Descreva como podemos ajudar..."
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensagem
          </>
        )}
      </button>
    </form>
  )
}
