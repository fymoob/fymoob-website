import { NextRequest, NextResponse } from "next/server"

const LOFT_BASE_URL = "https://brunoces-rest.vistahost.com.br"
const LOFT_API_KEY = process.env.LOFT_API_KEY || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nome, email, fone, mensagem, codigoImovel, interesse } = body as {
      nome?: string
      email?: string
      fone?: string
      mensagem?: string
      codigoImovel?: string
      interesse?: string
    }

    // Validação básica
    if (!nome || (!email && !fone)) {
      return NextResponse.json(
        { error: "Nome e email ou telefone são obrigatórios" },
        { status: 400 }
      )
    }

    if (!LOFT_API_KEY) {
      console.error("[Lead API] LOFT_API_KEY not configured")
      return NextResponse.json(
        { error: "Configuração do servidor incompleta" },
        { status: 500 }
      )
    }

    // Enviar lead pro CRM Loft
    const leadPayload = {
      lead: {
        nome,
        email: email || "",
        fone: fone || "",
        interesse: interesse || "Venda",
        anuncio: codigoImovel || "",
        veiculo: "Site FYMOOB",
        mensagem: mensagem || "Contato via site FYMOOB",
      },
    }

    const res = await fetch(`${LOFT_BASE_URL}/lead?key=${LOFT_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(leadPayload),
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
