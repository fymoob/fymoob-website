/**
 * One-shot — atualiza name/role de Bruno e Wagner no Supabase.
 *
 * Mudancas (02/05/2026, ajuste solicitado pelo Vinicius):
 *   Bruno: role "Corretor de Imóveis" → "Sócio e Responsável Técnico"
 *   Wagner: name "Wagner" → "Wagner Spessatto"
 *           role "Diretor" → "Sócio"
 *
 * Slugs MANTIDOS (mudar quebra URLs publicas /autor/<slug> + links em posts).
 *
 * Uso:
 *   node scripts/update-authors-roles.mjs --dry-run   # mostra mudanca sem aplicar
 *   node scripts/update-authors-roles.mjs             # aplica
 */
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"

config({ path: ".env.local" })

const DRY_RUN = process.argv.includes("--dry-run")

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

const updates = [
  {
    slug: "bruno-cesar-de-almeida",
    patch: { role: "Sócio e Responsável Técnico" },
  },
  {
    slug: "wagner-fymoob",
    patch: { name: "Wagner Spessatto", role: "Sócio" },
  },
]

for (const { slug, patch } of updates) {
  const { data: before, error: readErr } = await sb
    .from("authors")
    .select("id, name, role, slug")
    .eq("slug", slug)
    .maybeSingle()

  if (readErr || !before) {
    console.error(`❌ ${slug}: nao encontrado (${readErr?.message ?? "no row"})`)
    continue
  }

  console.log(`\n[${slug}]`)
  for (const [k, v] of Object.entries(patch)) {
    console.log(`  ${k}: "${before[k]}" → "${v}"`)
  }

  if (DRY_RUN) {
    console.log("  [DRY-RUN] sem write")
    continue
  }

  const { error: updErr } = await sb
    .from("authors")
    .update(patch)
    .eq("slug", slug)

  if (updErr) {
    console.error(`  ❌ erro: ${updErr.message}`)
  } else {
    console.log(`  ✓ atualizado`)
  }
}
