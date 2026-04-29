#!/usr/bin/env node
/**
 * Extração GA4 Data API — Comparativo Reserva Barigui (campanha) vs Site Principal
 *
 * Auth via Application Default Credentials (ADC):
 *   gcloud auth application-default login
 *   gcloud auth application-default set-quota-project fymoob-mcp
 *   gcloud services enable analyticsdata.googleapis.com --project=fymoob-mcp
 *
 * Output: docs/seo-reports/ga4-comparison-YYYY-MM-DD.md
 *
 * 6 relatórios por propriedade:
 *   1. Sessions/Users + Eventos totais (visão geral)
 *   2. Top fontes de tráfego (sessionSource/Medium)
 *   3. Top cidades (city)
 *   4. Mobile vs Desktop (deviceCategory)
 *   5. Top eventos (eventName)
 *   6. Top páginas (pagePath)
 *
 * Janela: últimos 30 dias.
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

// Lê env vars do .env.local manualmente (sem dotenv)
const env = readFileSync('c:/Users/Vine/fymoob/.env.local', 'utf8')
const getEnv = (key) => env.match(new RegExp(`^${key}=(\\S+)`, 'm'))?.[1]

const PROPERTIES = [
  {
    id: getEnv('GA4_RESERVA_BARIGUI_PROPERTY_ID'),
    name: 'Fymoob - Reserva Barigui (campanha original)',
    short: 'reserva-barigui',
  },
  {
    id: getEnv('GA4_PREMIUM_RESERVA_PROPERTY_ID'),
    name: 'premium.fymoob.com/reservabarigui',
    short: 'premium-reserva',
  },
  {
    id: getEnv('GA4_SITE_PRINCIPAL_PROPERTY_ID'),
    name: 'FYMOOB - Site Principal (fymoob.com.br)',
    short: 'site-principal',
  },
]

const client = new BetaAnalyticsDataClient()

const today = new Date().toISOString().slice(0, 10)
const dateRange = { startDate: '30daysAgo', endDate: 'today' }

async function runReport(propertyId, opts) {
  try {
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [dateRange],
      ...opts,
    })
    return response
  } catch (err) {
    return { error: err.message, code: err.code }
  }
}

function formatRows(response, dimNames, metricNames) {
  if (response.error) return `❌ Erro: ${response.error}`
  if (!response.rows || response.rows.length === 0) return '_Sem dados._'

  const headers = [...dimNames, ...metricNames]
  const lines = ['| ' + headers.join(' | ') + ' |']
  lines.push('|' + headers.map(() => '---').join('|') + '|')

  for (const row of response.rows.slice(0, 15)) {
    const dims = (row.dimensionValues || []).map((d) => d.value || '(not set)')
    const metrics = (row.metricValues || []).map((m) => {
      const num = parseFloat(m.value)
      return isNaN(num) ? m.value : num >= 1000 ? num.toLocaleString('pt-BR') : num
    })
    lines.push('| ' + [...dims, ...metrics].join(' | ') + ' |')
  }
  return lines.join('\n')
}

async function extractProperty(prop) {
  console.log(`\n→ Puxando dados de [${prop.name}] (${prop.id})...`)

  // 1. Visão geral — sessions, users, eventos, engagement time
  const overview = await runReport(prop.id, {
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'newUsers' },
      { name: 'eventCount' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
      { name: 'engagementRate' },
    ],
  })

  // 2. Fontes de tráfego
  const sources = await runReport(prop.id, {
    dimensions: [
      { name: 'sessionDefaultChannelGroup' },
      { name: 'sessionSourceMedium' },
    ],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagementRate' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  })

  // 3. Cidades
  const cities = await runReport(prop.id, {
    dimensions: [{ name: 'city' }, { name: 'region' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'engagementRate' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  })

  // 4. Dispositivo
  const devices = await runReport(prop.id, {
    dimensions: [{ name: 'deviceCategory' }],
    metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'averageSessionDuration' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  })

  // 5. Eventos
  const events = await runReport(prop.id, {
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit: 20,
  })

  // 6. Páginas
  const pages = await runReport(prop.id, {
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'totalUsers' },
      { name: 'averageSessionDuration' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 20,
  })

  return { prop, overview, sources, cities, devices, events, pages }
}

function buildOverviewSummary(overview, propName) {
  if (overview.error) {
    return `### ${propName}\n❌ **Erro ao puxar dados:** \`${overview.error}\`\n\nVerifique se a Service Account/usuário tem acesso à propriedade GA4 como Visualizador.\n`
  }
  if (!overview.rows || overview.rows.length === 0) {
    return `### ${propName}\n_Sem dados nos últimos 30 dias._\n`
  }
  const r = overview.rows[0].metricValues
  const sessions = parseFloat(r[0].value)
  const users = parseFloat(r[1].value)
  const newUsers = parseFloat(r[2].value)
  const events = parseFloat(r[3].value)
  const pageViews = parseFloat(r[4].value)
  const avgDuration = parseFloat(r[5].value)
  const bounceRate = parseFloat(r[6].value) * 100
  const engagementRate = parseFloat(r[7].value) * 100

  const minutes = Math.floor(avgDuration / 60)
  const seconds = Math.floor(avgDuration % 60)

  return `### ${propName}

| Métrica | Valor |
|---|---|
| Sessões (30d) | **${sessions.toLocaleString('pt-BR')}** |
| Usuários únicos | **${users.toLocaleString('pt-BR')}** |
| Novos usuários | ${newUsers.toLocaleString('pt-BR')} (${((newUsers / users) * 100).toFixed(1)}% do total) |
| Page views | ${pageViews.toLocaleString('pt-BR')} (${(pageViews / sessions).toFixed(1)} por sessão) |
| Eventos | ${events.toLocaleString('pt-BR')} |
| Tempo médio de sessão | ${minutes}min ${seconds}s |
| Taxa de rejeição | ${bounceRate.toFixed(1)}% |
| Taxa de engajamento | ${engagementRate.toFixed(1)}% |
`
}

function buildPropertySection(data) {
  const { prop, overview, sources, cities, devices, events, pages } = data
  const lines = []

  lines.push(`## ${prop.name}`)
  lines.push(`Property ID: \`${prop.id}\` | Janela: últimos 30 dias\n`)

  lines.push('### 📊 Visão geral')
  if (overview.error) {
    lines.push(`❌ Erro: \`${overview.error}\``)
    return lines.join('\n')
  }
  lines.push(buildOverviewSummary(overview, '_Métricas agregadas_').replace(/^### .*?\n/, ''))

  lines.push('\n### 🚦 Top fontes de tráfego')
  lines.push(formatRows(sources, ['Canal', 'Source/Medium'], ['Sessões', 'Usuários', 'Engaj. %']))

  lines.push('\n### 📍 Top cidades dos visitantes')
  lines.push(formatRows(cities, ['Cidade', 'Estado'], ['Sessões', 'Usuários', 'Engaj. %']))

  lines.push('\n### 📱 Dispositivos')
  lines.push(formatRows(devices, ['Dispositivo'], ['Sessões', 'Usuários', 'Tempo médio (s)']))

  lines.push('\n### ⚡ Top eventos')
  lines.push(formatRows(events, ['Evento'], ['Contagem', 'Usuários']))

  lines.push('\n### 📄 Top páginas')
  lines.push(formatRows(pages, ['Path', 'Título'], ['Views', 'Usuários', 'Tempo (s)']))

  return lines.join('\n')
}

async function main() {
  console.log('🔍 Extração GA4 — comparativo Reserva Barigui vs Site Principal')
  console.log(`📅 Janela: últimos 30 dias (até ${today})\n`)

  if (!PROPERTIES.every((p) => p.id)) {
    console.error('❌ Property IDs não encontrados no .env.local')
    process.exit(1)
  }

  const results = []
  for (const prop of PROPERTIES) {
    results.push(await extractProperty(prop))
  }

  // Build markdown report
  const reportLines = []
  reportLines.push(`# Relatório GA4 — Comparativo Reserva Barigui (campanha) vs Site Principal`)
  reportLines.push(`**Gerado em:** ${today}`)
  reportLines.push(`**Janela de análise:** últimos 30 dias`)
  reportLines.push(`**Auth:** Application Default Credentials (ADC) — usuário \`dev.viniciusdamas@gmail.com\``)
  reportLines.push(`**Quota project:** \`fymoob-mcp\``)
  reportLines.push('')
  reportLines.push('---')
  reportLines.push('')
  reportLines.push('## 🎯 Resumo executivo (visão geral por propriedade)')
  reportLines.push('')

  for (const { prop, overview } of results) {
    reportLines.push(buildOverviewSummary(overview, prop.name))
  }

  reportLines.push('---')
  reportLines.push('')
  reportLines.push('## 📂 Detalhamento por propriedade')
  reportLines.push('')

  for (const data of results) {
    reportLines.push(buildPropertySection(data))
    reportLines.push('\n---\n')
  }

  reportLines.push('## 🧠 Próximas análises sugeridas')
  reportLines.push('')
  reportLines.push('1. **Cruzar Top cidades das campanhas vs Site Principal** — se Mossunguê/Bigorrilho dominam na Reserva Barigui mas Site Principal recebe geral Curitiba, ajustar SEO local.')
  reportLines.push('2. **Comparar device split** — se campanha é 90% mobile mas site 60/40, otimizar mobile-first agressivo na página `/empreendimento/reserva-barigui`.')
  reportLines.push('3. **Top eventos da campanha** — replicar CTAs/comportamentos que funcionam pra mover do site novo.')
  reportLines.push('4. **Tempo médio de sessão** — campanha alta + site baixo = página do site precisa de mais conteúdo (descrição rica, vídeos, plantas).')
  reportLines.push('5. **Vincular Search Console e Google Ads** ao GA4 da Reserva Barigui pra trazer queries reais (palavras-chave que convertem).')

  // Save report
  mkdirSync('c:/Users/Vine/fymoob/docs/seo-reports', { recursive: true })
  const outputPath = `c:/Users/Vine/fymoob/docs/seo-reports/ga4-comparison-${today}.md`
  writeFileSync(outputPath, reportLines.join('\n'))

  console.log(`\n✅ Relatório salvo em: docs/seo-reports/ga4-comparison-${today}.md`)
}

main().catch((err) => {
  console.error('💥 Erro:', err.message)
  if (err.code === 7 || err.message?.includes('PERMISSION_DENIED')) {
    console.error('\n💡 Possíveis causas:')
    console.error('   - Service Account/usuário sem acesso à propriedade GA4')
    console.error('   - API Google Analytics Data não habilitada no projeto')
    console.error('   - Quota project não setado: gcloud auth application-default set-quota-project fymoob-mcp')
  }
  process.exit(1)
})
