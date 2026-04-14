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
