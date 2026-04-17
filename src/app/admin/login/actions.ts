"use server"

import { headers } from "next/headers"
import { signIn } from "@/auth"
import { checkLoginRateLimit, getClientIp } from "@/lib/rate-limit"
import { verifyTurnstileToken } from "@/lib/turnstile"

export type LoginState = {
  status: "idle" | "success" | "error"
  message?: string
}

export async function requestMagicLink(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "")

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Informe um email válido." }
  }

  const headerList = await headers()
  // x-real-ip (Vercel peer TCP) — nao forjavel pelo client
  const ip = getClientIp(headerList)

  // Layer 3: bot filter
  const turnstile = await verifyTurnstileToken(turnstileToken, ip)
  if (!turnstile.success) {
    return { status: "error", message: turnstile.reason ?? "Captcha inválido." }
  }

  // Layer 4: rate limit
  const rate = await checkLoginRateLimit(email, ip)
  if (!rate.allowed) {
    return { status: "error", message: rate.reason ?? "Muitas tentativas." }
  }

  // Layer 2: auth.js sends magic link (only if email is whitelisted via signIn callback)
  try {
    await signIn("resend", {
      email,
      redirect: false,
      redirectTo: "/admin",
    })
    // Always reply success — even for non-whitelisted emails —
    // to avoid email enumeration (attacker can't tell if email is admin or not).
    return {
      status: "success",
      message: "Se este email tiver acesso, enviamos um link em instantes.",
    }
  } catch (error) {
    console.error("[login] signIn error:", error)
    // Same generic response — don't leak configuration failures to the client.
    return {
      status: "success",
      message: "Se este email tiver acesso, enviamos um link em instantes.",
    }
  }
}
