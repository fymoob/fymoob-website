import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "FYMOOB Imobiliaria - Imoveis em Curitiba"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadSatoshi() {
  const res = await fetch(
    new URL("../../public/fonts/Satoshi-Variable.woff2", import.meta.url)
  )
  return res.arrayBuffer()
}

export default async function OgImage() {
  const satoshiFont = await loadSatoshi()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1120 0%, #1F2937 100%)",
          fontFamily: "Satoshi",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "12px",
              background: "#29ABE2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 700,
              color: "white",
            }}
          >
            fy
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            FYMOOB
          </span>
        </div>
        <p
          style={{
            fontSize: "28px",
            color: "#D1D5DB",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Imoveis a Venda e Aluguel em Curitiba
        </p>
        <p
          style={{
            fontSize: "16px",
            color: "#6B7280",
            marginTop: "16px",
          }}
        >
          fymoob.com.br
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Satoshi",
          data: satoshiFont,
          style: "normal",
        },
      ],
    }
  )
}
