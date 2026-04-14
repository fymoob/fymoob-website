import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"

/**
 * Admin whitelist — only emails in this list can authenticate via magic link.
 * Configured via env var ALLOWED_ADMIN_EMAILS (CSV format).
 *
 * Example: ALLOWED_ADMIN_EMAILS="bruno@fymoob.com,wagner@fymoob.com,vinicius@fymoob.com"
 *
 * When the user list grows beyond ~5, migrate to a `users` table in Postgres.
 */
function getAllowedAdmins(): Set<string> {
  const raw = process.env.ALLOWED_ADMIN_EMAILS ?? ""
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  )
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL ?? "noreply@fymoob.com",
      // Override default magic link email to match FYMOOB branding
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { Resend: ResendClient } = await import("resend")
        const resend = new ResendClient(process.env.RESEND_API_KEY!)

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? "noreply@fymoob.com",
          to: email,
          subject: "Acesso ao painel FYMOOB",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0f172a;">
              <h1 style="font-size: 24px; margin: 0 0 16px;">Acesso ao painel FYMOOB</h1>
              <p style="color: #475569; line-height: 1.6;">
                Clique no botão abaixo para entrar. Este link é válido por <strong>10 minutos</strong>
                e só pode ser usado uma vez.
              </p>
              <div style="margin: 28px 0;">
                <a href="${url}"
                   style="display: inline-block; background: #29ABE2; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 15px;">
                  Entrar no painel
                </a>
              </div>
              <p style="color: #94a3b8; font-size: 13px; line-height: 1.5;">
                Se você não solicitou este acesso, ignore este email.
                Nenhuma ação será tomada sem clicar no link.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0 16px;" />
              <p style="color: #94a3b8; font-size: 12px;">
                FYMOOB Administradora de Imóveis · Curitiba/PR
              </p>
            </div>
          `,
          text: `Acesso ao painel FYMOOB\n\nClique no link abaixo para entrar (válido por 10 minutos):\n\n${url}\n\nSe você não solicitou este acesso, ignore este email.`,
        })
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    verifyRequest: "/admin/login?check-email=1",
    error: "/admin/login?error=1",
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    // Reject sign-in attempts from non-whitelisted emails at the auth layer.
    // This runs BEFORE the magic link email is sent.
    async signIn({ user }) {
      const email = user.email?.toLowerCase()
      if (!email) return false
      const allowed = getAllowedAdmins()
      if (!allowed.has(email)) {
        console.warn(`[auth] rejected sign-in attempt from non-admin email: ${email}`)
        return false
      }
      return true
    },
    // Shape the JWT that's stored in the session cookie.
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email.toLowerCase()
        token.admin = true
      }
      return token
    },
    // Expose admin flag to the session object used in server components.
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email as string
      }
      return session
    },
  },
})
