import { NextRequest, NextResponse } from "next/server"
import { checkLeadRateLimit, getClientIp } from "@/lib/rate-limit"
import { verifyTurnstileToken } from "@/lib/turnstile"

const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"
const LOFT_API_KEY = process.env.LOFT_API_KEY || ""

// Validações de input
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// BR: aceita (xx) xxxxx-xxxx, xx xxxxx xxxx, +55xx..., 11-13 dígitos
const PHONE_REGEX = /^[+]?[\d\s()-]{10,20}$/

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limit por IP (5 req / 10min) — usa x-real-ip (nao forjavel)
    const ip = getClientIp(request.headers)
    const rate = await checkLeadRateLimit(ip)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: rate.reason ?? "Too many requests" },
        { status: 429, headers: rate.retryAfter ? { "Retry-After": String(rate.retryAfter) } : {} }
      )
    }

    const body = await request.json()

    const { nome, email, fone, mensagem, codigoImovel, interesse, consentLGPD, turnstileToken } =
      body as {
        nome?: string
        email?: string
        fone?: string
        mensagem?: string
        codigoImovel?: string
        interesse?: string
        consentLGPD?: boolean
        turnstileToken?: string
      }

    // 2. Consentimento LGPD obrigatório
    if (!consentLGPD) {
      return NextResponse.json(
        { error: "Aceite da Política de Privacidade é obrigatório (LGPD)." },
        { status: 400 }
      )
    }

    // 3. Turnstile anti-bot
    const turnstile = await verifyTurnstileToken(turnstileToken, ip)
    if (!turnstile.success) {
      return NextResponse.json(
        { error: turnstile.reason ?? "Falha na verificação anti-bot" },
        { status: 403 }
      )
    }

    // 4. Validação e sanitização de inputs
    const nomeClean = (nome ?? "").trim().slice(0, 120)
    const emailClean = (email ?? "").trim().toLowerCase().slice(0, 120)
    const foneClean = (fone ?? "").trim().slice(0, 25)
    const mensagemClean = (mensagem ?? "").trim().slice(0, 2000)
    const codigoClean = (codigoImovel ?? "").trim().slice(0, 20)
    const interesseClean = (interesse ?? "Venda").trim().slice(0, 30)

    if (nomeClean.length < 2) {
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 })
    }
    if (!emailClean && !foneClean) {
      return NextResponse.json(
        { error: "Informe ao menos email ou telefone" },
        { status: 400 }
      )
    }
    if (emailClean && !EMAIL_REGEX.test(emailClean)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }
    if (foneClean && !PHONE_REGEX.test(foneClean)) {
      return NextResponse.json({ error: "Telefone inválido" }, { status: 400 })
    }

    if (!LOFT_API_KEY) {
      console.error("[Lead API] LOFT_API_KEY not configured")
      return NextResponse.json(
        { error: "Configuração do servidor incompleta" },
        { status: 500 }
      )
    }

    // 5. Enviar lead pro CRM Loft
    const leadPayload = {
      lead: {
        nome: nomeClean,
        email: emailClean,
        fone: foneClean,
        interesse: interesseClean,
        anuncio: codigoClean,
        veiculo: "Site FYMOOB",
        mensagem: mensagemClean || "Contato via site FYMOOB",
      },
    }

    const res = await fetch(`${LOFT_BASE_URL}/lead?key=${LOFT_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadPayload),
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) {
      const errorText = await res.text().catch(() => "")
      console.error(`[Lead API] Loft returned ${res.status}: ${errorText.slice(0, 200)}`)
      return NextResponse.json(
        { error: "Erro ao enviar mensagem. Tente novamente." },
        { status: 502 }
      )
    }

    const result = await res.json().catch(() => ({}))

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error("[Lead API] Unexpected error:", error)
    return NextResponse.json(
      { error: "Erro interno. Tente novamente." },
      { status: 500 }
    )
  }
}
