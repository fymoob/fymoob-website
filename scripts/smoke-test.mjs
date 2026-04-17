#!/usr/bin/env node
// Smoke test: verifica que rotas criticas retornam status esperado.
//
// Uso:
//   node scripts/smoke-test.mjs                       (default: fymoob.com.br)
//   node scripts/smoke-test.mjs https://preview.xxx.vercel.app
//   npm run smoke [url]
//
// Exit codes:
//   0 = tudo OK
//   1 = pelo menos 1 check falhou
//
// Smart: extrai slugs REAIS do sitemap em vez de hardcoded. Se o gerador
// de slug mudar de formato, o teste pega sem precisar atualizar constantes.

const BASE = process.argv[2] || process.env.SMOKE_URL || "https://fymoob.com.br"
const baseUrl = BASE.startsWith("http") ? BASE : `https://${BASE}`

// Cores pra output (funciona em terminal + CI)
const C = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
}

const results = []
let failed = 0

async function fetchWithTimeout(url, options = {}, ms = 15000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

function record(name, ok, detail = "") {
  results.push({ name, ok, detail })
  if (!ok) failed++
  const tag = ok ? `${C.green}✓${C.reset}` : `${C.red}✗${C.reset}`
  const line = `${tag} ${name}${detail ? `  ${C.gray}${detail}${C.reset}` : ""}`
  console.log(line)
}

async function check(name, path, {
  expectStatus = 200,
  expectBody = null,
  method = "GET",
  headers,
  body,
} = {}) {
  const url = `${baseUrl}${path}`
  try {
    const res = await fetchWithTimeout(url, {
      method,
      headers: headers ?? { "User-Agent": "FYMOOB-Smoke-Test/1.0" },
      body,
      redirect: "manual",
    })

    if (res.status !== expectStatus) {
      record(name, false, `got ${res.status}, expected ${expectStatus} | ${url}`)
      return null
    }

    if (expectBody) {
      const text = await res.text()
      const regex = expectBody instanceof RegExp ? expectBody : new RegExp(expectBody)
      if (!regex.test(text)) {
        record(name, false, `body nao contem padrao ${regex} | ${url}`)
        return null
      }
      record(name, true, `${res.status}`)
      return text
    }

    record(name, true, `${res.status}`)
    return res
  } catch (err) {
    record(name, false, `${err.message} | ${url}`)
    return null
  }
}

async function run() {
  console.log(`\n${C.cyan}Smoke test — ${baseUrl}${C.reset}\n`)

  // 1. Paginas estaticas criticas
  await check("home", "/", { expectBody: /FYMOOB/ })
  await check("busca", "/busca")
  await check("empreendimentos", "/empreendimentos")
  await check("faq", "/faq")
  await check("contato", "/contato")
  await check("sobre", "/sobre")

  // 2. Sitemaps (validar que sao XML com URLs)
  for (const shard of [0, 1, 2, 3]) {
    const text = await check(`sitemap/${shard}.xml`, `/sitemap/${shard}.xml`, {
      expectBody: /<url>/,
    })
    if (shard === 0 && text) {
      // Extrai primeiro slug de imovel real do sitemap pra testar rota dinamica
      const match = text.match(/<loc>[^<]*\/imovel\/([^<]+)<\/loc>/)
      if (match) {
        const slug = match[1]
        await check(`imovel real (${slug.slice(0, 40)}...)`, `/imovel/${slug}`, {
          expectBody: /FYMOOB/,
        })
      } else {
        record("imovel real", false, "nao encontrou /imovel/ no sitemap/0.xml")
      }
    }
    if (shard === 3 && text) {
      // Extrai primeiro empreendimento do sitemap
      const match = text.match(/<loc>[^<]*\/empreendimento\/([^<]+)<\/loc>/)
      if (match) {
        const slug = match[1]
        await check(`empreendimento real (${slug})`, `/empreendimento/${slug}`, {
          expectBody: /FYMOOB/,
        })
      }
    }
  }

  // 3. Landing pages programaticas (bairro)
  await check("bairro portao", "/imoveis/portao")
  await check("bairro + tipo", "/imoveis/portao/apartamentos")
  await check("apartamentos-curitiba", "/apartamentos-curitiba")

  // 4. Blog e guias
  await check("blog listing", "/blog")
  await check("guia batel", "/guia/batel")
  await check("pillar morar", "/morar-em-curitiba")

  // 5. Metadata files
  await check("robots.txt", "/robots.txt", { expectBody: /Sitemap:/ })
  await check("llms.txt", "/llms.txt", { expectBody: /FYMOOB/i })
  await check("opengraph-image", "/opengraph-image")

  // 6. Admin deve ser 307 redirect pra login
  await check("admin protegido", "/admin", { expectStatus: 307 })

  // 7. API endpoints — verificar protecoes
  await check("api/revalidate sem secret", "/api/revalidate", {
    method: "POST",
    expectStatus: 401,
  })
  await check("api/lead GET (nao permitido)", "/api/lead", { expectStatus: 405 })
  await check("api/photos com codigo invalido", "/api/photos/INVALID%2Epath", {
    expectStatus: 400,
  })

  // Resumo
  console.log(`\n${C.cyan}Resumo:${C.reset} ${results.length - failed}/${results.length} passou`)
  if (failed > 0) {
    console.log(`${C.red}${failed} FALHARAM:${C.reset}`)
    for (const r of results) {
      if (!r.ok) console.log(`  - ${r.name}: ${r.detail}`)
    }
    process.exit(1)
  }
  console.log(`${C.green}Tudo OK.${C.reset}\n`)
  process.exit(0)
}

run().catch((err) => {
  console.error(`${C.red}Erro inesperado:${C.reset}`, err)
  process.exit(1)
})
