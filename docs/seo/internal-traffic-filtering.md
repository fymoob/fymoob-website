# Separando Tráfego Interno vs Orgânico Real

> **Fonte:** Research consolidado 2026-04-20 (2 agentes paralelos + fontes oficiais Google Analytics, Simo Ahava, Analytics Mania).
> **Contexto:** GSC em D+3 pós-cutover mostrou 61 impressões em 2-3 dias — suspeita forte que maioria é da própria equipe FYMOOB testando. Precisamos diferenciar tráfego interno de orgânico real antes de tirar conclusões.

---

## TL;DR — Decisão

1. **Implementar cookie self-ID** (melhor estratégia pra equipe distribuída com IPs dinâmicos)
2. **Adicionar filtro de IP do escritório** no GA4 (complementar)
3. **Política escrita pro time**: "não pesquisar o próprio site no Google — usar GSC URL Inspection"
4. **Não tirar conclusões sobre tráfego** até ter > 1000 impressões/mês (D+14-21 projetado)

---

## Por que estratégias baseadas em IP não bastam

Equipe FYMOOB (2-5 corretores + Bruno + Wagner) pesquisa o site em vários contextos:
- **Escritório** (IP fixo da imobiliária)
- **Home office** (IPs residenciais dinâmicos, mudam semanalmente)
- **Celular/4G** (IPs diferentes por torre, mudam o tempo todo)
- **Viagem** (IPs aleatórios)

Filtro de IP cobre só o escritório. Resto passa despercebido.

**Solução:** cookie self-ID — funciona em qualquer rede, qualquer dispositivo.

---

## Estratégia #1 (RECOMENDADA) — Cookie self-ID + GA4 traffic_type

### Como funciona

1. Cria uma rota secreta (ex: `/internal-optout`)
2. Quando alguém da equipe abre essa URL uma vez por dispositivo, um cookie `fymoob_internal=1` é setado (expira em 400 dias)
3. DeferredGA lê esse cookie e envia `traffic_type: 'internal'` pro GA4
4. No GA4, filtro "Internal Traffic" descarta esses eventos permanentemente

### Onboarding da equipe

Mensagem no grupo WhatsApp:

> Pessoal, antes de qualquer coisa, abram **https://fymoob.com.br/internal-optout** em todos os dispositivos que vocês usam pra visitar o site (celular pessoal, celular do trabalho, laptop, PC do escritório).
>
> Isso marca o dispositivo como interno — suas visitas não contam mais nas métricas, mas continua tudo funcionando normal. É pra gente ter estatísticas reais de cliente, não de equipe testando.

### Vantagens

- ✅ Funciona com IP dinâmico (home office, celular 4G, viagem)
- ✅ Por dispositivo (celular + desktop do mesmo corretor = 2 setups, simples)
- ✅ Cookie dura 400 dias (limite máximo Chrome/Safari)
- ✅ Zero custo, 1h de implementação

### Limitações

- Equipe precisa abrir manualmente em cada dispositivo (onboarding)
- Se limpar cookies do navegador, volta a contar como externo (precisa reabrir)
- Navegador anônimo não preserva cookie (mas também não é comportamento típico)

---

## Estratégia #2 (COMPLEMENTAR) — GA4 IP Filter no Data Stream

### Quando usar

Só pro **IP fixo do escritório FYMOOB** (se tiver link dedicado ou IP reservado).

### Como configurar

1. Admin → Data Streams → (stream do site) → Configure tag settings → Define internal traffic
2. Create rule: IP address equals `<IP do escritório>` → set `traffic_type=internal`
3. Admin → Data Settings → Data Filters → Internal Traffic → state **Testing** por 7 dias
4. Validar no DebugView, depois mudar pra **Active**

### Limitações

- **10 filtros de dados máximo** por propriedade GA4
- Ativação demora **24-48h** pra passar a afetar dados
- Dados filtrados são **permanentemente descartados** (não voltam no BigQuery export)
- Só funciona pra IP fixo — inútil pra residencial/4G

---

## Estratégia #3 — Política + educação (soft control)

### Regra escrita pra equipe

> **Política FYMOOB — Não pesquise o próprio site no Google normal.**
>
> Por quê: cada pesquisa nossa conta como "impressão" nas métricas do Google, inflando dados e dificultando saber se o SEO está atraindo cliente real.
>
> **Como verificar se uma página apareceu:**
>
> - Quer saber se o imóvel X está indexado? → **Google Search Console** → Inspeção de URL → cola o link do imóvel
> - Quer ver como a página aparece no Google? → use o **Modo Incógnito** do navegador (não conta como impressão personalizada)
> - Quer ver ranking? → use ferramentas SEO (SEMrush, Ahrefs, ou pede pra quem tem)
>
> **Quando pode pesquisar:** quando for user real (cliente ligou perguntando de um imóvel específico, aí você pesquisa junto dele).

### Eficácia

Resolve ~80% do ruído com ~5% do esforço. Mesmo com self-ID implementado, a política ajuda em dispositivos não marcados.

---

## GSC — o que é possível

GSC **não permite filtrar por IP** — não há workaround legítimo.

### Novembro/2025 — Branded Queries Filter (AI-assisted)

Google lançou filtro que separa queries contendo **nome da marca e variações** (typos, nomes de produtos únicos).

**Aplicação FYMOOB:** filtro detectaria "fymoob", "residencial canto do uirapuru" (nome único), "liv in" (nome de empreendimento).

**Requisito:** volume mínimo de impressões (~500-1000/mês). FYMOOB com 61 impressões ainda **não qualifica**. Em 30-60 dias deve aparecer.

### Workaround manual enquanto não qualifica

No GSC Performance:
1. Filtrar por **Query** → contains regex: `fymoob|canto do uirapuru|liv in|kuara|pavia|serra dourada|vitoria regia|nova europa`
2. Comparar com "todas as queries" pra estimar % de tráfego brand vs não-brand

### Alternativa pra verificar SEO sem poluir métricas

- **GSC URL Inspection** — não gera impressão/click
- **Screaming Frog** — crawl local, zero impacto no GSC
- **Ahrefs/SEMrush** — ferramentas externas, impacto zero

---

## Ferramentas alternativas de analytics

### Comparativo focado

| Ferramenta | Filtro IP | LGPD | Next.js 16 | Free | Custo |
|---|---|---|---|---|---|
| **GA4** | Manual setup | OK com banner | Script | Sim | Grátis |
| **Plausible** | Lista manual | ✅ Cookieless | `next-plausible` | 30d trial | $9/mês |
| **Fathom** | Lista manual | ✅ | `@fathom/next` | 30d trial | $15/mês |
| **Umami** | Config self-host | ✅ self-host | Script | Grátis self-host | $0 self |
| **PostHog** | CIDR sim | ✅ opcional | SDK robusto | 1M events/mês | Grátis até 1M |
| **Cloudflare Web Analytics** | ❌ | ✅ | Script | Grátis ilimitado | Grátis |
| **Vercel Web Analytics** | ❌ | ✅ | Nativo | 2.5k eventos/mês | Grátis |

### Recomendação

**Fase atual (D+0 a D+90):** manter GA4 com filtro IP do escritório + cookie self-ID. Zero ferramentas novas.

**Fase 2 (D+90 quando tráfego crescer):** adicionar Plausible complementar ($9/mês) — Bruno tem dashboard próprio sem precisar login Google, métricas limpas.

**Evitar:** PostHog (overkill pra imobiliária SEO-first), Fathom (preço similar Plausible sem vantagem BR), Matomo self-host (operacional alto).

---

## Quando estatisticamente confiar nos dados

| Volume mensal | Ruído interno | Confiabilidade | FYMOOB em |
|---|---|---|---|
| < 1.000 impressões | > 10% | Só tendência | Hoje (D+3) |
| 1.000 - 10.000 | 1-5% | Tendências OK | D+30 estimado |
| > 10.000 | < 1% | Decisões OK | D+90 estimado |

**Coorte "new vs returning"** no GA4 ajuda:
- Equipe = 100% returning após a primeira semana
- Monitorar % de "new users" por landing
- Se landing de bairro tem > 70% new → sinal de tráfego orgânico real

---

## Padrões que distinguem interno vs externo

### Volume por horário

- **Equipe:** picos 9h-12h e 14h-18h dias úteis (horário de expediente)
- **Público:** picos 19h-22h dia útil + fim de semana inteiro

### Diversidade de queries

- **Interno:** queries específicas (nomes de empreendimento, "fymoob")
- **Externo:** queries variadas, long-tail genérica ("apartamento 2 quartos batel financiamento", "casa com piscina curitiba")

### Taxa de rejeição

- **Interno:** exploratório — clica e navega várias páginas (bounce baixo)
- **Externo:** varia — landing → contato ou landing → exit

### Páginas visitadas

- **Interno:** admin + catálogo técnico
- **Externo:** landing + busca + imóvel individual + contato

### Tempo na página

- **Interno:** scan rápido (2-10s)
- **Externo:** leitura real (30s-3min)

### Operadores de busca

- **Interno:** `"pavia" -site:reddit.com -site:twitter.com` (dev/SEO testando)
- **Externo:** queries naturais sem operadores

---

## Implementação FYMOOB — passos

### 1. Criar rota `/internal-optout` (10 min)

```tsx
// src/app/internal-optout/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function InternalOptOut() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.cookie = 'fymoob_internal=1; max-age=34560000; path=/; SameSite=Lax'
    setDone(true)
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">
          {done ? '✓ Dispositivo marcado como interno' : 'Marcando dispositivo...'}
        </h1>
        <p className="text-neutral-600">
          Suas visitas neste dispositivo não contam mais nas métricas.
          Continua tudo funcionando normal — isso é só pra gente ter estatísticas reais de cliente.
        </p>
        <p className="mt-6 text-sm text-neutral-400">
          Cookie dura 400 dias. Se limpar cookies do navegador, abre essa página de novo.
        </p>
      </div>
    </main>
  )
}

export const metadata = {
  robots: { index: false, follow: false },
}
```

### 2. Atualizar DeferredGA (20 min)

```tsx
// src/components/analytics/DeferredGA.tsx
// Ler cookie antes de enviar evento
const isInternal = typeof document !== 'undefined' &&
  document.cookie.includes('fymoob_internal=1')

gtag('config', 'G-XXXX', {
  ...(isInternal ? { traffic_type: 'internal' } : {})
})
```

### 3. GA4 Admin → Internal Traffic (10 min — Bruno faz)

1. Admin → Data Streams → Configure tag → Define internal traffic
2. Create rule: `traffic_type = internal`
3. Data Settings → Data Filters → Internal Traffic → **Testing** por 7 dias
4. Validar no DebugView
5. Mudar pra **Active**

### 4. Onboarding da equipe (1 mensagem WhatsApp)

> Pessoal, 2 coisas rápidas pra nossa métrica do site funcionar direito:
>
> 1. Abram esse link em todos dispositivos que usam pra ver o site (celular + computador): https://fymoob.com.br/internal-optout
> 2. Daqui pra frente: se quiser ver se um imóvel tá aparecendo no Google, usa o **Google Search Console → Inspeção de URL**, não pesquisa direto no Google. Cada pesquisa nossa conta como "impressão" e polui o dado.
>
> É pra gente saber se o SEO tá trazendo cliente real, não equipe testando. Qualquer dúvida me chama.

### 5. Documentar política (já feita neste doc)

---

## Quando NÃO investir nisso

- **Primeiros 30 dias pós-cutover:** volume tão baixo (61 impressões) que filtrar 40 não muda análise. Gaste tempo em conteúdo/backlinks, não em setup.
- **Se tráfego vier 80%+ de landings programáticas:** interno não pesquisa essas queries, filtro é redundante.
- **Se volume estabilizar > 10k impressões/mês:** ruído interno < 1%, filtro é ineficiente relativo ao ganho.

**No nosso caso específico:** o esforço vale a pena **agora** porque D+3 com 61 impressões é exatamente o pior cenário — volume baixo + suspeita de contaminação. Melhor começar o filtro antes de acumular dados contaminados.

---

## Fontes principais

- [GA4 Internal Traffic — Google Analytics Help](https://support.google.com/analytics/answer/10104470)
- [Filtering Internal Traffic by Self-ID — Simo Ahava / Basrak](https://www.linkedin.com/pulse/filtering-internal-traffic-ga4-self-id-without-ip-addresses-basrak)
- [Exclude Internal Traffic GA4 — Analytics Mania](https://www.analyticsmania.com/post/how-to-exclude-internal-traffic-in-google-analytics-4/)
- [Filter Dynamic IPs — Carlos Espinoza](https://carloseo.com/exclude-dynamic-ip-google-analytics/)
- [Branded Queries Filter — Google Search Central Blog](https://developers.google.com/search/blog/2025/11/search-console-branded-filter)
- [GSC Branded Queries — Search Engine Land](https://searchengineland.com/google-search-console-branded-queries-filter-expands-471387)
- [Plausible Analytics docs](https://plausible.io/docs/excluding)
- [Override GA4 Fields — Simo Ahava](https://www.simoahava.com/gtm-tips/override-ga4-fields-in-server-side-gtm/)
- [Search Engine Journal — How to filter internal traffic](https://www.searchenginejournal.com/how-to-filter-internal-traffic-in-google-analytics/485913/)

---

## Conclusão — como tratar métricas daqui pra frente

**Até D+21 (~08/05):**
- Métricas servem só pra confirmar: Google está indexando e começando a ranquear
- **NÃO** tirar conclusões sobre CTR, comportamento, ROI, conversão
- Setup do filtro interno acontecendo em paralelo

**D+21 a D+60 (~08/05 a ~16/06):**
- Se filtro interno + política ativos, dados começam a ficar confiáveis
- Volume estimado 1000-5000 impressões/mês
- Pode identificar tendências mas não tomar decisão estratégica ainda

**D+60+ (~16/06):**
- Volume estimado 5000-10000+ impressões/mês
- Ruído interno < 5%
- Base confiável pra decisões: quais bairros ranqueiam melhor, quais tipos convertem, onde investir em conteúdo

**Métricas complementares que importam já (não dependem de filtro):**
- Páginas indexadas no GSC (dado estrutural, não comportamental)
- Core Web Vitals no Speed Insights (dado técnico)
- Erros de crawling (404, robots, etc.)
- Volume de pages descobertas vs sitemap
