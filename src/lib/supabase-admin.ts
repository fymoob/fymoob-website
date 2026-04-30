/**
 * Supabase admin client — server-side only.
 *
 * Usa SERVICE ROLE KEY que bypassa RLS. NUNCA expor pro client bundle.
 * Garantia em runtime: throw se chamado fora do server (process.browser etc.).
 *
 * Toda escrita em articles/authors/media passa por aqui. Auth real e o
 * `auth()` check do NextAuth nas server actions ANTES de chamar este client.
 */

import "server-only"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

let cached: SupabaseClient | null = null

/**
 * Cliente Supabase admin (service role). Singleton por processo.
 * Lanca em runtime se as env vars nao estiverem configuradas.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!SUPABASE_URL) {
    throw new Error(
      "[supabase-admin] NEXT_PUBLIC_SUPABASE_URL nao configurada — ver supabase/README.md"
    )
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "[supabase-admin] SUPABASE_SERVICE_ROLE_KEY nao configurada — ver supabase/README.md"
    )
  }

  if (cached) return cached

  cached = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  return cached
}

/**
 * True quando as env vars do Supabase estao definidas. Usado pra branch
 * BLOG_SOURCE=supabase vs sanity (durante a janela de cutover) sem quebrar
 * builds em dev sem credenciais.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY)
}
