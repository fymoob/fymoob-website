/**
 * Dispara revalidate manual chamando /api/revalidate via curl.
 * Uso: node scripts/force-revalidate-blog.mjs
 *
 * Pre-req: REVALIDATE_SECRET configurado em .env.local + Vercel.
 */
import { config } from "dotenv"
config({ path: ".env.local" })

const SECRET = process.env.REVALIDATE_SECRET
if (!SECRET) {
  console.error("REVALIDATE_SECRET nao configurado em .env.local")
  console.error("Vou usar Vercel deploy hook como alternativa.")
  process.exit(1)
}

const SITE = "https://fymoob.com.br"

const tags = ["blog", "blog:mercado-imobiliario-curitiba-2026"]
for (const tag of tags) {
  const res = await fetch(`${SITE}/api/revalidate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-revalidate-secret": SECRET,
    },
    body: JSON.stringify({ tag }),
  })
  console.log(tag, "->", res.status, await res.text())
}
