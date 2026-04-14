/**
 * Cloudflare Turnstile — server-side token verification.
 *
 * The client widget produces a token; we send it to Cloudflare's siteverify
 * endpoint along with our secret to confirm it's valid. Bots that bypass the
 * widget client-side still fail this check.
 *
 * Gracefully allows requests if TURNSTILE_SECRET_KEY isn't set (dev/preview).
 */

export async function verifyTurnstileToken(
  token: string | null | undefined,
  ip?: string
): Promise<{ success: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    // No secret configured — treat as "skip" (dev/preview only; warn in prod).
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY not set — bot protection DISABLED."
      )
    }
    return { success: true }
  }

  if (!token) {
    return { success: false, reason: "Captcha não preenchido" }
  }

  const body = new URLSearchParams()
  body.append("secret", secret)
  body.append("response", token)
  if (ip) body.append("remoteip", ip)

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    )
    const data = (await response.json()) as {
      success: boolean
      "error-codes"?: string[]
    }
    if (!data.success) {
      return {
        success: false,
        reason: `Captcha inválido (${data["error-codes"]?.join(",") ?? "unknown"})`,
      }
    }
    return { success: true }
  } catch (error) {
    console.error("[turnstile] verification request failed:", error)
    return { success: false, reason: "Falha ao verificar captcha" }
  }
}
