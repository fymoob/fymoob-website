import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

/**
 * Rate limiting for the admin login flow.
 *
 * Two independent limits applied to every magic link request:
 *   1. Per email: 5 requests per 15 minutes  — stops spam targeting one inbox.
 *   2. Per IP:    20 requests per 1 hour    — stops distributed scraping.
 *
 * Both backed by Upstash Redis (free tier: 10k commands/day — plenty for admin auth).
 *
 * Gracefully degrades to "allow" if env vars are missing, so dev/preview doesn't break.
 */

const hasRedisConfig =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN)

const redis = hasRedisConfig
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null

export const loginEmailLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "fymoob:admin:login:email",
    })
  : null

export const loginIpLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 h"),
      prefix: "fymoob:admin:login:ip",
    })
  : null

// Lead form (contato/anuncie): 5 requests per 10 min per IP.
// Intencionalmente mais restritivo que login para frear spam rápido.
export const leadIpLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "fymoob:lead:ip",
    })
  : null

export async function checkLeadRateLimit(
  ip: string
): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
  if (!leadIpLimiter) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[rate-limit] Upstash not configured — /api/lead NOT rate limited.")
    }
    return { allowed: true }
  }

  const result = await leadIpLimiter.limit(ip)
  if (!result.success) {
    return {
      allowed: false,
      reason: "Muitas tentativas deste IP. Aguarde 10 minutos e tente novamente.",
      retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
    }
  }
  return { allowed: true }
}

// APIs públicas de dados da Loft (property, photos, batch): 60 req/min/IP.
// Previne amplificação de ataques contra o CRM sem bloquear uso legítimo.
export const apiLoftLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      prefix: "fymoob:api:loft",
    })
  : null

export async function checkApiLoftRateLimit(
  ip: string
): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
  if (!apiLoftLimiter) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[rate-limit] Upstash not configured — Loft API routes NOT rate limited.")
    }
    return { allowed: true }
  }

  const result = await apiLoftLimiter.limit(ip)
  if (!result.success) {
    return {
      allowed: false,
      reason: "Too many requests. Please slow down.",
      retryAfter: Math.ceil((result.reset - Date.now()) / 1000),
    }
  }
  return { allowed: true }
}

export type RateLimitResult = {
  success: boolean
  remaining: number
  reset: number
}

export async function checkLoginRateLimit(
  email: string,
  ip: string
): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
  // When Redis isn't configured, allow but log a warning once.
  if (!loginEmailLimiter || !loginIpLimiter) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[rate-limit] Upstash not configured — login is NOT rate limited. " +
          "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in production."
      )
    }
    return { allowed: true }
  }

  const [emailResult, ipResult] = await Promise.all([
    loginEmailLimiter.limit(email.toLowerCase()),
    loginIpLimiter.limit(ip),
  ])

  if (!emailResult.success) {
    return {
      allowed: false,
      reason: "Muitas tentativas para este email. Aguarde 15 minutos.",
      retryAfter: Math.ceil((emailResult.reset - Date.now()) / 1000),
    }
  }
  if (!ipResult.success) {
    return {
      allowed: false,
      reason: "Muitas tentativas deste IP. Aguarde 1 hora.",
      retryAfter: Math.ceil((ipResult.reset - Date.now()) / 1000),
    }
  }

  return { allowed: true }
}
