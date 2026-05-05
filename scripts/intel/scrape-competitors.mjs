#!/usr/bin/env node
/**
 * Scraper Playwright reusavel pros 4 concorrentes regionais Curitiba.
 * Sprint 1.5 (W21+) — substitui parsing de HTML curl que falhou no W19
 * por causa de pagination JS-rendered nos 4 sites.
 *
 * Uso:
 *   node scripts/intel/scrape-competitors.mjs --site razzi --pages 5
 *   node scripts/intel/scrape-competitors.mjs --site apolar --pages 10 --output tmp/intel/scrape/apolar.json
 *   node scripts/intel/scrape-competitors.mjs --site all --pages 5
 *   node scripts/intel/scrape-competitors.mjs --search "andrade ribeiro" --site razzi
 *
 * Modes:
 *   default: paginate listagem geral, extrai todas listings ate N paginas
 *   --search "<query>": busca por palavra-chave em cada concorrente
 *
 * Output schema (JSON array, 1 obj por listing):
 *   {
 *     site: "razzi|jba|apolar|gonzaga",
 *     url: "https://...",
 *     title: "...",
 *     price: 750000,             // numero ou null
 *     priceText: "R$ 750.000",   // raw
 *     bairro: "Mossunguê",       // ou null
 *     area: 87,                  // m2 numero ou null
 *     rooms: 3,                  // ou null
 *     type: "Apartamento",       // ou null
 *     code: "AP00945",           // codigo do imovel se exposed
 *     scrapedAt: ISO-8601
 *   }
 *
 * Comportamento:
 *   - User-Agent: FYMOOB-MarketIntel/1.0
 *   - Throttle: 2s entre requests
 *   - Captcha detection: aborta gracefully + flag no output
 *   - Cache: tmp/intel/scrape-cache/{site}-{hash}.json (ignored em git)
 *   - robots.txt: validado em pesquisa (todos com Disallow: vazio em 04/05/2026)
 *
 * Reuse:
 *   Pode ser importado como modulo:
 *     import { scrapeSite } from "./scrape-competitors.mjs"
 *     const listings = await scrapeSite("razzi", { pages: 5 })
 */

import { chromium } from "playwright"
import fs from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"
import process from "node:process"

const args = process.argv.slice(2)
const getArg = (flag) => {
  const idx = args.indexOf(flag)
  return idx >= 0 ? args[idx + 1] : null
}

const siteArg = getArg("--site") || "razzi"
const pagesArg = parseInt(getArg("--pages") || "3", 10)
const searchArg = getArg("--search")
const outputPath = getArg("--output")
const dryRun = args.includes("--dry-run")
const debugMode = args.includes("--debug") // dump HTML + screenshot pra inspecionar selectors

const USER_AGENT = "FYMOOB-MarketIntel/1.0 (+https://fymoob.com.br)"
const THROTTLE_MS = 2000
const NAV_TIMEOUT_MS = 30000
const CACHE_DIR = "tmp/intel/scrape-cache"

// ─────────────────────────────────────────────────────────────────────────
// Site configs
// ─────────────────────────────────────────────────────────────────────────

const SITES = {
  razzi: {
    // Site integrado ao CRM Vista/RocketImob (WordPress + custom theme)
    baseUrl: "https://razziimoveis.com.br",
    listingsPath: "/venda/residencial",
    searchPath: (q) => `/busca/?busca=${encodeURIComponent(q)}`,
    selectors: {
      list: ".imovel-box-single",
      title: ".titulo-grid",
      price: ".thumb-price",
      bairro: "[itemprop='streetAddress']",
      area: ".property-amenities .fa-compress-arrows-alt + span",
      rooms: ".property-amenities .fa-bed + span",
      url: ".titulo-anuncio a, a.button-info-panel",
    },
    nextPageSelector: "a[rel='next'], .pagination a.next, .pagination li.next a",
  },
  jba: {
    // Tambem CRM Vista/RocketImob (mesma estrutura HTML do Razzi)
    baseUrl: "https://jbaimoveis.com.br",
    listingsPath: "/venda/",
    searchPath: (q) => `/busca/?busca=${encodeURIComponent(q)}`,
    selectors: {
      list: ".imovel-box-single",
      title: ".titulo-grid",
      price: ".thumb-price",
      bairro: "[itemprop='streetAddress']",
      area: ".property-amenities .fa-compress-arrows-alt + span",
      rooms: ".property-amenities .fa-bed + span",
      url: ".titulo-anuncio a, a.button-info-panel",
    },
    nextPageSelector: "a[rel='next'], .pagination a.next, .pagination li.next a",
  },
  apolar: {
    // SPA Vue/Nuxt — DOM popula via JS apos hydration
    // .property-component eh uma DIV com atributo href (Vue link wrapper, nao <a>)
    baseUrl: "https://www.apolar.com.br",
    listingsPath: "/comprar",
    searchPath: (q) => `/comprar?q=${encodeURIComponent(q)}`,
    waitForSelector: ".property-component",
    selectors: {
      list: ".property-component",
      title: ".property-type",
      price: ".property-current-price",
      bairro: ".property-street",
      area: ".feature.ruler",
      rooms: ".feature.bed",
      url: "self-href", // sentinel: usa el.getAttribute('href') do proprio card
    },
    nextPageSelector: ".pagination li:last-child a, [class*='next-page']",
  },
  gonzaga: {
    // Nuxt.js SSR (Vue) — listings inline no HTML
    // Area/rooms estao em divs irmaos sem classe distintiva. Selectors abaixo
    // capturam o primeiro valor (area) e o segundo (dormitorios) via :nth-of-type.
    baseUrl: "https://www.gonzagaimoveis.com.br",
    listingsPath: "/imoveis",
    searchPath: (q) => `/imoveis?busca=${encodeURIComponent(q)}`,
    selectors: {
      list: ".card-real-estate",
      title: "h3.ui-title",
      price: ".cl-primary-80",
      bairro: "h2.ui-title--w-d",
      area: ".v-flex.--w-d.py-4 > .v-flex:nth-child(1) .ui-text--md.ui-text--weight-600",
      rooms: ".v-flex.--w-d.py-4 > .v-flex:nth-child(2) .ui-text--md.ui-text--weight-600",
      url: "a[href*='/imovel/']",
    },
    nextPageSelector: "a[rel='next'], [class*='pagination'] a",
  },
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function parsePrice(text) {
  if (!text) return null
  const cleaned = text.replace(/[^\d,]/g, "").replace(",", ".")
  const num = parseFloat(cleaned)
  return Number.isFinite(num) ? Math.round(num) : null
}

function parseInt2(text) {
  if (!text) return null
  const m = text.match(/(\d+)/)
  return m ? parseInt(m[1], 10) : null
}

function normalizeBairro(text) {
  if (!text) return null
  return text.trim().replace(/\s+/g, " ").slice(0, 80)
}

async function ensureCache() {
  await fs.mkdir(CACHE_DIR, { recursive: true })
}

function cacheKey(site, query) {
  const h = crypto.createHash("md5").update(`${site}|${query || "list"}`).digest("hex").slice(0, 12)
  return path.join(CACHE_DIR, `${site}-${h}.json`)
}

async function readCache(key, maxAgeSec = 86400) {
  try {
    const stat = await fs.stat(key)
    const ageSec = (Date.now() - stat.mtimeMs) / 1000
    if (ageSec > maxAgeSec) return null
    const raw = await fs.readFile(key, "utf-8")
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function writeCache(key, data) {
  await ensureCache()
  await fs.writeFile(key, JSON.stringify(data, null, 2), "utf-8")
}

function detectCaptcha(html) {
  // Refinado pos-W21: distingue captcha BLOQUEANTE de captcha em form de contato.
  // Razzi/JBA/Apolar tem captcha widget no form de lead — isso NAO bloqueia
  // scraping de listagens. So importa challenge real (Cloudflare/hCaptcha
  // page-level) que aparece com markers especificos.
  const blockingSignals = [
    /<title>[^<]*just a moment[^<]*<\/title>/i,
    /<title>[^<]*attention required[^<]*<\/title>/i,
    /class="[^"]*\bchallenge-form\b/i,
    /id="cf-challenge-running"/i,
    /__cf_chl_/i, // Cloudflare challenge cookie/token
    /<meta[^>]*name="captcha-bypass"/i,
    /window\.__hcaptcha\s*=\s*\{/i, // hCaptcha bootstrap (page-level)
  ]
  return blockingSignals.some((re) => re.test(html || ""))
}

// ─────────────────────────────────────────────────────────────────────────
// Core scraping
// ─────────────────────────────────────────────────────────────────────────

async function extractListings(page, config) {
  const items = await page.$$eval(
    config.selectors.list,
    (cards, sel) => {
      const findText = (el, selector) => {
        if (!selector) return null
        const node = el.querySelector(selector)
        return node ? node.textContent.trim() : null
      }
      const findHref = (el, selector) => {
        if (selector === "self-href") {
          // Card eh uma div com atributo href direto (Vue/Nuxt link wrapper)
          return el.getAttribute("href") || null
        }
        const node = el.querySelector(selector)
        if (!node) return null
        return node.href || node.getAttribute("href") || null
      }
      return cards.map((card) => ({
        rawTitle: findText(card, sel.title),
        rawPrice: findText(card, sel.price),
        rawBairro: findText(card, sel.bairro),
        rawArea: findText(card, sel.area),
        rawRooms: findText(card, sel.rooms),
        rawUrl: findHref(card, sel.url),
      }))
    },
    config.selectors,
  )
  return items
}

async function scrapeSite(site, opts = {}) {
  const config = SITES[site]
  if (!config) throw new Error(`Site desconhecido: ${site}. Use: ${Object.keys(SITES).join(", ")}`)

  const pages = opts.pages || pagesArg || 3
  const search = opts.search || searchArg
  const useCache = opts.cache !== false

  // Cache
  const ck = cacheKey(site, search)
  if (useCache) {
    const cached = await readCache(ck)
    if (cached) {
      console.error(`✓ Cache hit: ${site} (${cached.length} listings)`)
      return cached
    }
  }

  const startUrl = search
    ? `${config.baseUrl}${config.searchPath(search)}`
    : `${config.baseUrl}${config.listingsPath}`

  console.error(`▸ Scraping ${site} | start: ${startUrl} | max ${pages} pages`)

  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  })
  const ctx = await browser.newContext({
    userAgent: USER_AGENT,
    viewport: { width: 1280, height: 900 },
    locale: "pt-BR",
  })

  const page = await ctx.newPage()
  page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS)

  const allListings = []
  let url = startUrl
  let pageNum = 0
  let captchaFlag = false

  try {
    while (pageNum < pages && url) {
      pageNum++
      console.error(`  Page ${pageNum}/${pages}: ${url}`)

      await page.goto(url, { waitUntil: "domcontentloaded" })
      await page.waitForTimeout(1500) // espera JS render
      // Site SPA: aguarda selector chave aparecer (Apolar etc)
      if (config.waitForSelector) {
        await page.waitForSelector(config.waitForSelector, { timeout: 15000 }).catch(() => {
          console.error(`    ⚠ waitForSelector timeout pra "${config.waitForSelector}" (segue mesmo assim)`)
        })
      }

      // Captcha check
      const html = await page.content()
      if (detectCaptcha(html)) {
        captchaFlag = true
        console.error(`  ⚠ Captcha detectado em ${url} — abortando ${site}`)
        break
      }

      // Debug mode: dump HTML + screenshot pra teammate iterar selectors
      if (debugMode) {
        const debugDir = `tmp/intel/scrape-debug/${site}`
        await fs.mkdir(debugDir, { recursive: true })
        await fs.writeFile(`${debugDir}/page-${pageNum}.html`, html, "utf-8")
        await page.screenshot({ path: `${debugDir}/page-${pageNum}.png`, fullPage: true })
        console.error(`    [DEBUG] HTML + screenshot em ${debugDir}/page-${pageNum}.{html,png}`)
      }

      const items = await extractListings(page, config)
      console.error(`    +${items.length} listings extraidos`)

      for (const it of items) {
        if (!it.rawTitle && !it.rawPrice && !it.rawUrl) continue
        allListings.push({
          site,
          url: it.rawUrl,
          title: it.rawTitle,
          price: parsePrice(it.rawPrice),
          priceText: it.rawPrice,
          bairro: normalizeBairro(it.rawBairro),
          area: parseInt2(it.rawArea),
          rooms: parseInt2(it.rawRooms),
          scrapedAt: new Date().toISOString(),
        })
      }

      // Next page
      const nextHref = await page
        .$eval(config.nextPageSelector, (el) => el.href)
        .catch(() => null)
      if (!nextHref || nextHref === url) {
        console.error(`    Sem next page detectado, parando.`)
        break
      }
      url = nextHref
      await page.waitForTimeout(THROTTLE_MS)
    }
  } catch (err) {
    console.error(`  ✗ Erro durante scrape ${site}: ${err.message}`)
  } finally {
    await browser.close()
  }

  if (captchaFlag) {
    allListings.push({ site, captchaDetected: true, scrapedAt: new Date().toISOString() })
  }

  if (useCache) await writeCache(ck, allListings)

  console.error(`✓ ${site}: ${allListings.length} listings finalizados`)
  return allListings
}

// ─────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  if (dryRun) {
    console.error("DRY-RUN: nao executa scraping real, mostra config so.")
    console.error(JSON.stringify({ site: siteArg, pages: pagesArg, search: searchArg }, null, 2))
    return
  }

  const targets = siteArg === "all" ? Object.keys(SITES) : [siteArg]
  const results = {}

  for (const site of targets) {
    try {
      results[site] = await scrapeSite(site, { pages: pagesArg, search: searchArg })
    } catch (err) {
      console.error(`✗ ${site} falhou: ${err.message}`)
      results[site] = []
    }
  }

  const flat = Object.values(results).flat()
  const json = JSON.stringify(flat, null, 2)

  if (outputPath) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, json, "utf-8")
    console.error(`✓ Salvo em ${outputPath} (${flat.length} listings totais)`)
  } else {
    console.log(json)
  }
}

// Export pra uso programatico
export { scrapeSite, SITES }

// Run if invoked directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith("scrape-competitors.mjs")) {
  main().catch((err) => {
    console.error("✗ Erro fatal:", err.message)
    process.exit(1)
  })
}
