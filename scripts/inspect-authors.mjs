/**
 * Read-only — lista autores no Supabase com role, slug, photo_url.
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const { data, error } = await sb.from("authors").select("*").order("created_at")
if (error) {
  console.error(error)
  process.exit(1)
}

for (const a of data) {
  console.log(`\nID:        ${a.id}`)
  console.log(`Name:      ${a.name}`)
  console.log(`Slug:      ${a.slug}`)
  console.log(`Role:      ${a.role}`)
  console.log(`Photo URL: ${a.photo_url}`)
  console.log(`Photo alt: ${a.photo_alt}`)
  console.log(`Bio (excerpt):`, (a.bio_short ?? "").slice(0, 120))
}
console.log(`\n${data.length} autores no banco.`)
