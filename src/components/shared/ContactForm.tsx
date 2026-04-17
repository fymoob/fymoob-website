"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { Send, Loader2, CheckCircle2, ShieldCheck } from "lucide-react"
import { formatPhoneBR } from "@/lib/utils"

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: { sitekey: string; callback: (token: string) => void; "error-callback"?: () => void; "expired-callback"?: () => void; theme?: string }) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

interface InteresseOption {
  value: string
  label: string
}

// Opcoes padrao (pagina /contato e generico). Acentos corretos.
const DEFAULT_INTERESSE_OPTIONS: InteresseOption[] = [
  { value: "Comprar imóvel", label: "Quero comprar um imóvel" },
  { value: "Alugar imóvel", label: "Quero alugar um imóvel" },
  { value: "Vender imóvel", label: "Quero vender meu imóvel" },
  { value: "Anunciar imóvel", label: "Quero anunciar meu imóvel" },
  { value: "Dúvida geral", label: "Dúvida geral" },
  { value: "Outro", label: "Outro" },
]

export interface ContactFormProps {
  /** Lista customizada de opcoes do dropdown "Assunto". Se nao passar, usa padrao. */
  interesseOptions?: InteresseOption[]
  /** Titulo/label do dropdown. Default: "Assunto". */
  interesseLabel?: string
}

export function ContactForm({ interesseOptions, interesseLabel = "Assunto" }: ContactFormProps = {}) {
  const options = interesseOptions ?? DEFAULT_INTERESSE_OPTIONS
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [tsToken, setTsToken] = useState<string>("")
  const [consentChecked, setConsentChecked] = useState(false)
  const [phoneValue, setPhoneValue] = useState("")
  const widgetContainer = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)

  // Render Turnstile widget once script loads
  function handleTurnstileLoad() {
    if (!TURNSTILE_SITE_KEY || !widgetContainer.current || !window.turnstile) return
    if (widgetId.current) return // already rendered
    widgetId.current = window.turnstile.render(widgetContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTsToken(token),
      "error-callback": () => setTsToken(""),
      "expired-callback": () => setTsToken(""),
      theme: "light",
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg("")

    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get("consentLGPD")) {
      setErrorMsg("É preciso aceitar a Política de Privacidade para enviar.")
      setStatus("error")
      return
    }

    if (TURNSTILE_SITE_KEY && !tsToken) {
      setErrorMsg("Aguarde a verificação anti-bot terminar.")
      setStatus("error")
      return
    }

    setStatus("sending")

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
          consentLGPD: true,
          turnstileToken: tsToken,
        }),
      })

      if (res.ok) {
        setStatus("sent")
        form.reset()
        // Reset turnstile to allow another submission
        if (widgetId.current && window.turnstile) {
          window.turnstile.reset(widgetId.current)
          setTsToken("")
        }
      } else {
        const data = await res.json().catch(() => ({ error: "Erro ao enviar mensagem" }))
        setErrorMsg(data.error || "Erro ao enviar mensagem")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
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
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={handleTurnstileLoad}
          onReady={handleTurnstileLoad}
        />
      )}
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
            autoComplete="name"
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
              autoComplete="email"
              inputMode="email"
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
              autoComplete="tel"
              inputMode="tel"
              value={phoneValue}
              onChange={(e) => setPhoneValue(formatPhoneBR(e.target.value))}
              placeholder="(41) 99999-9999"
              className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark placeholder:text-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>

        <div>
          <label htmlFor="interesse" className="mb-1 block text-sm font-medium text-fymoob-gray-dark">
            {interesseLabel}
          </label>
          <select
            id="interesse"
            name="interesse"
            className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-fymoob-gray-dark focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
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

        {/* Turnstile widget — com placeholder de loading pra UX */}
        {TURNSTILE_SITE_KEY && (
          <div className="relative flex min-h-[65px] items-center justify-center">
            {!tsToken && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="size-3.5 animate-pulse" />
                Verificando segurança...
              </div>
            )}
            <div ref={widgetContainer} className="relative z-10" />
          </div>
        )}

        {/* LGPD consent */}
        <label className="flex items-start gap-2 text-xs text-neutral-600">
          <input
            type="checkbox"
            name="consentLGPD"
            required
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
          />
          <span>
            Autorizo a FYMOOB Imobiliária a entrar em contato e tratar meus dados conforme a{" "}
            <Link
              href="/politica-de-privacidade"
              target="_blank"
              className="font-medium text-brand-primary underline hover:text-brand-primary-hover"
            >
              Política de Privacidade
            </Link>
            . (LGPD — Lei 13.709/2018)
          </span>
        </label>

        {status === "error" && errorMsg && (
          <p className="text-sm text-red-600">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={
            status === "sending" ||
            !consentChecked ||
            (!!TURNSTILE_SITE_KEY && !tsToken)
          }
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
    </>
  )
}
