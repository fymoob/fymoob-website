// Sprint B.W (03/05/2026) — Dispara IndexNow ping pras URLs novas/atualizadas
// do Reserva Barigui apos deploy. IndexNow notifica Bing/Yandex (Google ignora,
// mas atualiza via crawl normal). Sub-rotas /lago, /colina, /mirante sao
// novas — Bing precisa saber que existem.
//
// Uso: node scripts/indexnow-reserva-barigui.mjs
//      (sem env var INDEXNOW_DRY=1 = dispara ping real)
//      (INDEXNOW_DRY=1 = so imprime payload, nao envia)
//
// Quando rodar: apos cada deploy de produção que alterar paginas listadas
// abaixo. Idempotente — Bing aceita pings repetidos sem penalidade.
//
// Reusavel: este script e especifico do Reserva Barigui pra documentar o
// caso. Pra ping geral pos-deploy, criar batch separado em
// scripts/indexnow-batch.mjs (futuro Fase 19.P2.RX.4).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fymoob.com.br"
const INDEXNOW_KEY =
  "d7ce36f0730ca0d491f787e07907b113b89651d7f297a09a2bec64e2cd09e43f"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

const URLS_TO_PING = [
  // Hub (Sprint A — schema enriquecido + bloco textual)
  `${SITE_URL}/empreendimento/reserva-barigui`,
  // Sub-rotas torres (Sprint B.7 — paginas novas)
  `${SITE_URL}/empreendimento/reserva-barigui/lago`,
  `${SITE_URL}/empreendimento/reserva-barigui/colina`,
  `${SITE_URL}/empreendimento/reserva-barigui/mirante`,
  // Typo bairgui (Sprint B.X — canonical adicionado)
  `${SITE_URL}/empreendimento/reserva-bairgui`,
  // /imoveis/mossungue (Sprint B.T — bloco de empreendimentos no bairro)
  `${SITE_URL}/imoveis/mossungue`,
]

const host = new URL(SITE_URL).host
const payload = {
  host,
  key: INDEXNOW_KEY,
  keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
  urlList: URLS_TO_PING,
}

if (process.env.INDEXNOW_DRY === "1") {
  console.log("[DRY-RUN] Payload que seria enviado:")
  console.log(JSON.stringify(payload, null, 2))
  process.exit(0)
}

console.log(`Submetendo ${URLS_TO_PING.length} URLs ao IndexNow (host=${host})...`)
URLS_TO_PING.forEach((u) => console.log(`  - ${u}`))

const res = await fetch(INDEXNOW_ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
})

console.log(`\nResposta: HTTP ${res.status} ${res.statusText}`)
if (res.status === 200 || res.status === 202) {
  console.log("✓ IndexNow aceitou as URLs. Bing/Yandex farao crawl em horas.")
} else if (res.status === 422) {
  console.log("✗ HTTP 422: verifique se a chave em /public/<key>.txt corresponde a INDEXNOW_KEY no script.")
} else if (res.status === 429) {
  console.log("✗ HTTP 429: rate-limit. Aguarde alguns minutos e re-rode.")
} else {
  const body = await res.text().catch(() => "")
  console.log("✗ Resposta inesperada:", body.slice(0, 500))
}
