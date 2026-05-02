import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data, error } = await sb
  .from("articles")
  .select("id, slug, title, status, published_at, updated_at")
  .eq("slug", "mercado-imobiliario-curitiba-2026")
  .single()

if (error) {
  console.error(error)
  process.exit(1)
}

console.log("Title:", JSON.stringify(data.title))
console.log("Status:", data.status)
console.log("Published at:", data.published_at)
console.log("Updated at:", data.updated_at)
