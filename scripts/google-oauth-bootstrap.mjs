#!/usr/bin/env node
/**
 * scripts/google-oauth-bootstrap.mjs
 *
 * Generaliza o `ga4-oauth-bootstrap.mjs` pra cobrir GA4 + GSC num unico
 * authorization. Sprint 06/05/2026: criamos sistema de recomendacoes do
 * blog que precisa GSC API, e a organizacao Google Cloud bloqueia
 * Service Account JSON keys (`iam.disableServiceAccountKeyCreation`).
 * Solucao: reutilizar OAuth refresh_token (estrategia que ja funciona
 * pro GA4) com scope adicional pro Search Console.
 *
 * Le GA4_CLIENT_ID + GA4_CLIENT_SECRET do .env.local, abre o navegador,
 * captura o authorization code num servidor HTTP local, troca por tokens
 * e grava GA4_REFRESH_TOKEN com escopos pra GA4 + GSC.
 *
 * Pre-requisitos no Google Cloud Console:
 * 1. OAuth consent screen configurado (Branding + Audience com test
 *    user incluindo o email que vai autorizar)
 * 2. Em "Data Access" adicionar:
 *    - https://www.googleapis.com/auth/analytics.readonly  (GA4)
 *    - https://www.googleapis.com/auth/webmasters.readonly  (GSC)
 * 3. Search Console — adicionar o email da conta autorizadora como
 *    "Owner" ou "Full" na property `sc-domain:fymoob.com.br`
 *
 * Uso: node scripts/google-oauth-bootstrap.mjs
 *
 * Apos sucesso, GA4_REFRESH_TOKEN funciona pras 2 APIs (mesmo token,
 * scope conjunto). Adicionar tambem na Vercel:
 *   GA4_CLIENT_ID, GA4_CLIENT_SECRET, GA4_REFRESH_TOKEN.
 */

import { createServer } from "node:http"
import { exec } from "node:child_process"
import { readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { URL } from "node:url"
import { google } from "googleapis"

const ENV_PATH = join(process.cwd(), ".env.local")

// Scopes — GA4 + GSC num unico authorization.
// Importante: ambos precisam estar adicionados em "Data Access" do
// OAuth consent screen no Google Cloud, senao a tela de consentimento
// vai recusar o scope nao registrado.
const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
]

function parseEnv(content) {
  const out = {}
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "")
  }
  return out
}

function upsertEnvLine(content, key, value) {
  const lines = content.split(/\r?\n/)
  const re = new RegExp(`^${key}=`)
  let found = false
  const next = lines.map((l) => {
    if (re.test(l)) {
      found = true
      return `${key}=${value}`
    }
    return l
  })
  if (!found) next.push(`${key}=${value}`)
  return next.join("\n")
}

function openBrowser(url) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`
  exec(cmd, (err) => {
    if (err) console.warn("(falha ao abrir navegador — copie a URL acima manualmente)")
  })
}

if (!existsSync(ENV_PATH)) {
  console.error(`ERRO: .env.local nao encontrado em ${ENV_PATH}`)
  process.exit(1)
}

const envContent = readFileSync(ENV_PATH, "utf8")
const env = parseEnv(envContent)
const CLIENT_ID = env.GA4_CLIENT_ID
const CLIENT_SECRET = env.GA4_CLIENT_SECRET

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("ERRO: GA4_CLIENT_ID ou GA4_CLIENT_SECRET ausentes em .env.local")
  console.error("Crie um OAuth Client (tipo 'Desktop app') no Google Cloud")
  console.error("Console > APIs & Services > Credentials e adicione ao .env.local")
  process.exit(1)
}

const server = createServer()
server.listen(0, "127.0.0.1", () => {
  const { port } = server.address()
  const REDIRECT_URI = `http://127.0.0.1:${port}/oauth2callback`
  const oauth2 = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  })

  console.log("\n=== Google OAuth Bootstrap (GA4 + GSC) — FYMOOB ===")
  console.log(`Servidor loopback: ${REDIRECT_URI}`)
  console.log("\nScopes solicitados:")
  for (const s of SCOPES) console.log(`  - ${s}`)
  console.log("\nAbrindo navegador. Se nao abrir, copie a URL abaixo:\n")
  console.log(authUrl + "\n")
  openBrowser(authUrl)
  console.log("Aguardando autorizacao...\n")

  server.on("request", async (req, res) => {
    const reqUrl = new URL(req.url, REDIRECT_URI)
    if (reqUrl.pathname !== "/oauth2callback") {
      res.writeHead(404).end()
      return
    }
    const code = reqUrl.searchParams.get("code")
    const error = reqUrl.searchParams.get("error")

    if (error) {
      res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" })
      res.end(`<h1>Erro: ${error}</h1><p>Volte ao terminal pra ver detalhes.</p>`)
      console.error(`\nERRO OAuth: ${error}`)
      console.error('Causas comuns:')
      console.error('  - Email nao adicionado em "Test users"')
      console.error('  - Scopes nao adicionados em "Data Access" (precisa GA4 + GSC)')
      console.error('  - App em modo Production sem verificacao')
      server.close()
      process.exit(1)
    }

    if (!code) {
      res.writeHead(400).end()
      return
    }

    try {
      const { tokens } = await oauth2.getToken(code)
      const refresh = tokens.refresh_token

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
      res.end(
        `<!doctype html><html><body style="font-family:system-ui;padding:40px;background:#0a0a0a;color:#29ABE2;text-align:center"><h1>Autorizacao concluida</h1><p>Pode fechar esta aba e voltar ao terminal.</p></body></html>`,
      )

      if (!refresh) {
        console.error("\nAVISO: refresh_token NAO retornado.")
        console.error("Causa: ja existe consentimento anterior salvo na conta Google.")
        console.error("Solucao: revogue o app em https://myaccount.google.com/permissions")
        console.error("         (procure 'FYMOOB MCP Desktop' ou similar), e rode este script novamente.")
        server.close()
        process.exit(1)
      }

      const updated = upsertEnvLine(envContent, "GA4_REFRESH_TOKEN", refresh)
      writeFileSync(ENV_PATH, updated, "utf8")

      console.log("=== Sucesso ===")
      console.log(`refresh_token gravado em ${ENV_PATH}`)
      console.log(
        `\nGA4_REFRESH_TOKEN=${refresh.slice(0, 12)}...${refresh.slice(-8)} (${refresh.length} chars)`,
      )
      console.log("\nScopes habilitados:")
      console.log("  - analytics.readonly (GA4 Data API)")
      console.log("  - webmasters.readonly (GSC Search Analytics)")
      console.log("\nProximos passos:")
      console.log("  1. Adicione GA4_CLIENT_ID, GA4_CLIENT_SECRET, GA4_REFRESH_TOKEN tambem no Vercel")
      console.log("     (Project Settings -> Environment Variables)")
      console.log("  2. Em modo 'Testing' o refresh_token pode expirar em 7 dias — pra prod, publicar o app na aba Audience")
      console.log("  3. Validar GSC: rodar curl http://localhost:3001/api/cron/recommendations-refresh")
      console.log("     (com Authorization: Bearer ${CRON_SECRET})\n")

      setTimeout(() => {
        server.close()
        process.exit(0)
      }, 500)
    } catch (e) {
      console.error("ERRO ao trocar code por tokens:", e?.message ?? e)
      res.writeHead(500).end()
      server.close()
      process.exit(1)
    }
  })
})

setTimeout(() => {
  console.error("\nTimeout: ninguem autorizou em 5 min. Abortando.")
  server.close()
  process.exit(1)
}, 5 * 60 * 1000)
