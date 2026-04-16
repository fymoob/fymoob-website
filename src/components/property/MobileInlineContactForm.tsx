"use client"

import { type FormEvent, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Script from "next/script"
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: string | HTMLElement,
        opts: {
          sitekey: string
          callback: (token: string) => void
          "error-callback"?: () => void
          "expired-callback"?: () => void
          theme?: string
        }
      ) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

interface MobileInlineContactFormProps {
  propertyTitle: string
  propertyCode: string
  finalidade?: string
}

export function MobileInlineContactForm({
  propertyTitle,
  propertyCode,
  finalidade,
}: MobileInlineContactFormProps) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [submitError, setSubmitError] = useState("")
  const [turnstileToken, setTurnstileToken] = useState("")
  const formRef = useRef<HTMLFormElement>(null)
  const widgetContainer = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)

  const interesse = /loca/i.test(finalidade ?? "") ? "Aluguel" : "Venda"

  function handleTurnstileLoad() {
    if (!TURNSTILE_SITE_KEY || !widgetContainer.current || !window.turnstile) return
    if (widgetId.current) return

    widgetId.current = window.turnstile.render(widgetContainer.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      "error-callback": () => setTurnstileToken(""),
      "expired-callback": () => setTurnstileToken(""),
      theme: "light",
    })
  }

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return
    if (submitStatus !== "idle") return

    handleTurnstileLoad()
  }, [submitStatus])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitStatus("sending")
    setSubmitError("")

    const form = event.currentTarget
    const formData = new FormData(form)
    const consentLGPD = Boolean(formData.get("consentLGPD"))

    if (!consentLGPD) {
      setSubmitStatus("error")
      setSubmitError("E preciso aceitar a Politica de Privacidade para enviar.")
      return
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitStatus("error")
      setSubmitError("Aguarde a verificacao anti-bot.")
      return
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.get("nome"),
          email: formData.get("email"),
          fone: formData.get("fone"),
          mensagem: formData.get("mensagem"),
          codigoImovel: propertyCode,
          interesse,
          consentLGPD,
          turnstileToken,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({ error: "Erro ao enviar mensagem" }))
        throw new Error(payload.error || "Erro ao enviar mensagem")
      }

      setSubmitStatus("sent")
      formRef.current?.reset()
      if (widgetId.current && window.turnstile) {
        window.turnstile.reset(widgetId.current)
      }
      setTurnstileToken("")
    } catch (error) {
      setSubmitStatus("error")
      setSubmitError(error instanceof Error ? error.message : "Erro ao enviar mensagem")
    }
  }

  function handleNewMessage() {
    setSubmitStatus("idle")
    setSubmitError("")
    setTurnstileToken("")
    widgetId.current = undefined
  }

  return (
    <section
      id="enviar-mensagem"
      aria-labelledby="mobile-contact-form-title"
      className="scroll-mt-24 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:hidden"
    >
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={handleTurnstileLoad}
          onReady={handleTurnstileLoad}
        />
      )}

      <h2
        id="mobile-contact-form-title"
        className="text-xl font-bold tracking-tight text-slate-900"
      >
        Envie uma mensagem
      </h2>
      <p className="mt-1.5 text-sm text-slate-500">
        Preencha os campos e um dos nossos especialistas entra em contato.
      </p>

      {submitStatus === "sent" ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <p>Mensagem enviada com sucesso. Nosso time retorna em breve.</p>
          </div>
          <Button
            type="button"
            onClick={handleNewMessage}
            variant="outline"
            className="h-11 w-full rounded-xl border-slate-200 text-sm font-semibold"
          >
            Enviar nova mensagem
          </Button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input type="hidden" name="property_code" value={propertyCode} />
          <input type="hidden" name="property_title" value={propertyTitle} />

          <Input
            name="nome"
            type="text"
            placeholder="Seu nome"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Input
            name="email"
            type="email"
            placeholder="Seu e-mail"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Input
            name="fone"
            type="tel"
            placeholder="Seu telefone"
            required
            className="h-11 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />
          <Textarea
            name="mensagem"
            placeholder="Quero saber mais sobre este imovel..."
            className="min-h-28 rounded-xl border-neutral-200 bg-neutral-50/70 placeholder:text-neutral-400"
          />

          {TURNSTILE_SITE_KEY && <div ref={widgetContainer} className="flex justify-center" />}

          <label className="flex items-start gap-2 text-xs text-neutral-500">
            <input
              type="checkbox"
              name="consentLGPD"
              required
              className="mt-0.5 size-4 shrink-0 rounded border-neutral-300 text-brand-primary focus:ring-brand-primary"
            />
            <span>
              Autorizo o contato conforme a{" "}
              <Link
                href="/politica-de-privacidade"
                target="_blank"
                className="font-medium text-brand-primary underline hover:text-brand-primary-hover"
              >
                Politica de Privacidade
              </Link>
              .
            </span>
          </label>

          {submitStatus === "error" && submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}

          <Button
            type="submit"
            disabled={submitStatus === "sending"}
            className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {submitStatus === "sending" ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Enviando...
              </span>
            ) : (
              "Enviar mensagem"
            )}
          </Button>
          <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-neutral-400">
            <ShieldCheck size={13} className="shrink-0" />
            Seus dados estao seguros. Respondemos o mais rapido possivel.
          </p>
        </form>
      )}
    </section>
  )
}
