"use client"

import { useActionState, useEffect, useRef } from "react"
import Script from "next/script"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { requestMagicLink, type LoginState } from "./actions"

const initialState: LoginState = { status: "idle" }

export function LoginForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [state, formAction, pending] = useActionState(requestMagicLink, initialState)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Reset Turnstile widget after each submission to get a fresh token
  useEffect(() => {
    if (state.status !== "idle" && typeof window !== "undefined") {
      const turnstile = (window as unknown as { turnstile?: { reset: () => void } }).turnstile
      turnstile?.reset()
    }
  }, [state])

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className="h-11 rounded-xl"
            disabled={pending}
          />
        </div>

        {turnstileSiteKey && (
          <div
            ref={widgetRef}
            className="cf-turnstile"
            data-sitekey={turnstileSiteKey}
            data-theme="light"
          />
        )}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {pending ? "Enviando..." : "Enviar link de acesso"}
        </Button>

        {state.status === "error" && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {state.message}
          </p>
        )}
        {state.status === "success" && (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {state.message}
          </p>
        )}
      </form>
    </>
  )
}
