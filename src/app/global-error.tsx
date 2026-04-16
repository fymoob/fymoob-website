"use client"

import { useEffect } from "react"

// Fallback último recurso: quando o próprio layout raiz falha em renderizar,
// Next.js monta este componente standalone (precisa de <html> + <body> próprios,
// pois o root layout não é utilizável).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[app/global-error.tsx]", error)
  }, [error])

  return (
    <html lang="pt-BR">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif",
          background: "#ffffff",
          color: "#0f172a",
          margin: 0,
        }}
      >
        <div style={{ maxWidth: "440px", textAlign: "center" }}>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              width: "56px",
              height: "56px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              background: "#fef2f2",
              color: "#ef4444",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            !
          </div>
          <h1
            style={{
              marginTop: "24px",
              fontSize: "24px",
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            Erro crítico
          </h1>
          <p style={{ marginTop: "12px", color: "#64748b", lineHeight: 1.6 }}>
            Não conseguimos carregar o site agora. Tente recarregar ou volte em alguns
            minutos. Se o problema persistir, entre em contato pelo WhatsApp.
          </p>
          {error.digest && (
            <p
              style={{
                marginTop: "16px",
                padding: "8px 12px",
                background: "#f1f5f9",
                borderRadius: "8px",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Referência: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "32px",
              padding: "10px 24px",
              background: "#29ABE2",
              color: "#ffffff",
              border: "none",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Tentar novamente
          </button>
          <p style={{ marginTop: "24px", fontSize: "12px", color: "#94a3b8" }}>
            <a
              href="https://wa.me/5541999780517"
              style={{ color: "#29ABE2", textDecoration: "none", fontWeight: 500 }}
            >
              WhatsApp (41) 99978-0517
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
