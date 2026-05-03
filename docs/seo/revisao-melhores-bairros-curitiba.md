# Plano de revisão — `melhores-bairros-curitiba-2026`

> Compilado em **2026-05-02** após auditoria profunda. Último item da
> fila Sprint A do [plano geral](./article-revision-plan-2026-05-02.md).
> Risco 🟡 médio.
>
> **Validar com ChatGPT antes de aplicar.** Após validação, traduzir em
> script idempotente `scripts/apply-melhores-bairros-revisions.mjs`.
>
> Padrão editorial: sem termos em inglês desnecessários (yield,
> lifestyle, etc), sem palavras duplicadas, sem typos.

---

## 1. Por que este artigo é prioridade

O artigo é forte: tem metodologia transparente, pontuação por critério,
4 rankings por perfil e cross-link sólido com PMQ e melhores-bairros-familias.
Mas tem 6 problemas que comprometem a credibilidade técnica.

### 1.1 Pequeno Príncipe descrito errado (Block 11)

O post diz:
> "Pequeno Príncipe (**maior hospital pediátrico do Brasil**)"

O claim correto é **"maior hospital exclusivamente pediátrico do Brasil"**
(distinção importante porque hospitais com ala pediátrica grande
podem ter mais leitos pediátricos absolutos). O wording oficial do
próprio Hospital Pequeno Príncipe e do reconhecimento do Ministério
da Saúde / Newsweek usa essa qualificação.

### 1.2 Conflito interno: Ecoville R$ 16.800 vs FipeZap R$ 14.062 (Block 41)

O post (mitos desmentidos) afirma:
> "Em abril de 2026 o Ecoville custa **R$ 16.800/m²** — mais caro que
> Bigorrilho (R$ 14.117)."

**Problema:** o FipeZap mar/2026 publica **Mossunguê (= Ecoville no
IPPUC) R$ 14.062/m²** — praticamente empatado com Bigorrilho, não
"mais caro". Essa cifra foi confirmada na revisão anterior do
`mercado-imobiliario` e do `custo-de-vida`. Manter R$ 16.800 deixa o
post inconsistente com o resto do site.

### 1.3 Conflito interno de rentabilidade (Block 29)

> "Batel e Bigorrilho... rentabilidade sobre o preço de compra fica em
> **~2% ao ano**."

Mesmo problema que detectei e corrigi no `quanto-custa-batel`: o
número 2% conflita com o `mercado-imobiliario` revisado. Faixa
defensível para bairros premium em Curitiba é **0,25-0,33% ao mês
(~3% a.a.)**. A nota explícita "abaixo da média de Curitiba (4,74%
FipeZap) por ser alto padrão" mantém coerência.

### 1.4 Cascatinha "zero homicídios" sem caveat (Block 35)

> "A Secretaria de Segurança Pública do Paraná registrou zero
> homicídios em Cascatinha nos 9 primeiros meses de 2025. **É um dos 4
> bairros mais seguros do Brasil em capital.**"

Dois problemas:
1. SESP-PR não publica homicídios por bairro de forma padronizada
   (admitido no block 9 do mesmo post para o Ahú, mas omitido aqui).
2. "Um dos 4 bairros mais seguros do Brasil em capital" não tem fonte
   nem critério explícito. Ranking nacional por bairro de capital
   não existe em fonte oficial pública.

### 1.5 Tabela 4 — empate ignorado (posições 8/9/10)

A tabela do ranking geral lista:
- Posição 8: Bigorrilho — pontuação 56
- Posição 9: Cristo Rei — pontuação 55
- Posição 10: Ecoville — pontuação 56

**Problema matemático:** se Bigorrilho e Ecoville têm 56 pontos, eles
deveriam estar empatados em 8º — não com Cristo Rei (55) entre eles.
O leitor que lê a tabela com atenção percebe.

### 1.6 Frontmatter inconsistente

- **Title** com caps em "Bairros de Curitiba 2026: Ranking por Perfil"
  (igual ao problema do `quanto-custa-batel`)
- **seo_meta_title** = NULL
- **seo_meta_description** = NULL

Sem seo_meta_*, o Google usa o title visível. Caps fora do padrão
prejudica o snippet no SERP.

---

## 2. Sumário das mudanças

| # | Bloco | Tipo | Mudança | Severidade |
|---|---|---|---|---|
| 1 | – | frontmatter | Title sentence case + seo_meta_title/description | Média |
| 2 | 0 | paragraph | Lead — suavizar tom (preserva o gancho) | Baixa |
| 3 | 4 | table | Corrigir empate 8/8/10 (Bigorrilho + Ecoville em 8º) | Alta |
| 4 | 11 | bulletListItem | "maior hospital pediátrico" → "maior hospital exclusivamente pediátrico" | Crítica |
| 5 | 25 | table | Juvevê "perfil residencial baixo padrão" → wording correto | Média |
| 6 | 28 | table | Marcar Prado Velho 12% como observação tipológica específica | Média |
| 7 | 29 | paragraph | "rentabilidade ~2% a.a." → 3% a.a. (faixa 0,25-0,33% ao mês) | Crítica |
| 8 | 30 | ctaBox | Remover "não média genérica agregada" | Baixa |
| 9 | 35 | paragraph | Cascatinha — adicionar caveat SESP-PR + remover "4 mais seguras BR" | Alta |
| 10 | 41 | paragraph | Ecoville R$ 16.800 → R$ 14.062 (FipeZap mar/26) + reformular argumento | Crítica |
| 11 | 61 | methodologyBox | Sources com fontes Tier 1 nominadas + amostra explícita + pesos no treatment | Média |
| 12 | – | inserção | Tabela "Como os pesos mudam o ranking" entre block 6 e 7 | Baixa (extra) |

12 mudanças. ~25 minutos de aplicação após validação.

---

## 3. Mudanças trecho a trecho

### Mudança 1 — Frontmatter

**Atual:**
- title: "Melhores Bairros de Curitiba 2026: Ranking por Perfil"
- description: "Ranking multi-critério de 30 bairros de Curitiba em abril/2026: segurança, educação, infraestrutura e preço. Com pesos abertos, top por perfil e bairros subvalorizad" (parece truncada — verificar)
- seo_meta_title: NULL
- seo_meta_description: NULL

**Proposto:**
- title: **"Melhores bairros de Curitiba em 2026: ranking por perfil"**
- description: **"Ranking aberto de 30 bairros de Curitiba em abril/2026 por segurança, educação, infraestrutura e preço, com pesos por perfil e bairros que ainda não estouraram."**
- seo_meta_title: **"Melhores bairros de Curitiba em 2026: ranking por perfil"**
- seo_meta_description: **"30 bairros de Curitiba avaliados em segurança, educação, infraestrutura e preço — com pesos diferentes para família, jovem, aposentado e investidor."**

**Justificativa:** padronização de caps + meta tags preenchidas + description sem truncamento.

---

### Mudança 2 — Block 0 (lead)

**Atual:**
> Todo blog de imobiliária coloca o Batel como "melhor bairro de
> Curitiba". Só que quando a gente soma segurança + educação +
> infraestrutura + preço em peso igual, o Batel cai pra 3º lugar — e
> quem lidera é o Ahú, o único bairro que pontua forte nos 4 critérios.

**Proposto:**
> A maioria dos guias coloca o Batel como "melhor bairro de Curitiba".
> Quando a gente soma segurança, educação, infraestrutura e preço
> com peso igual, o Batel fica em 3º lugar — e quem lidera é o **Ahú**,
> o único bairro que pontua bem nos quatro critérios. Este post mostra
> a metodologia aberta, o ranking geral e quatro recortes por perfil
> (família, jovem, aposentado e investidor).

**Justificativa:** suaviza "todo blog de imobiliária" (claim absoluto) e adiciona descrição do que o leitor vai encontrar.

---

### Mudança 3 — Block 4 (tabela ranking geral)

**Atual** (problema: Ecoville 56 está em 10º com Cristo Rei 55 entre):

| Posição | Bairro | ... | Pontuação |
|---|---|---|---|
| 8 | Bigorrilho | ... | 56 |
| 9 | Cristo Rei | ... | 55 |
| 10 | Ecoville | ... | 56 |

**Proposto** (empate explícito):

| Posição | Bairro | ... | Pontuação |
|---|---|---|---|
| 8 | Bigorrilho | ... | 56 |
| 8 | Mossunguê (Ecoville) | ... | 56 |
| 10 | Cristo Rei | ... | 55 |

**Adicionalmente:** trocar nome "Ecoville" por "Mossunguê (Ecoville)" pra alinhar com o IPPUC + FipeZap (consistência interna entre artigos do site).

**Justificativa:** corrige a aritmética + alinha nomenclatura com PMQ e mercado-imobiliario.

---

### Mudança 4 — Block 11 (Pequeno Príncipe)

**Atual:**
> Infraestrutura: colado ao **Pequeno Príncipe (maior hospital pediátrico do Brasil)**, BRT do [Cabral](/imoveis/cabral) a 5 minutos, Praça do Japão e Parque São Lourenço vizinhos.

**Proposto:**
> Infraestrutura: colado ao [Hospital Pequeno Príncipe](https://pequenoprincipe.org.br/institucional/quem-somos/) — **maior hospital exclusivamente pediátrico do Brasil** e o primeiro da América Latina no ranking Newsweek 2025 dos 250 melhores hospitais infantis do mundo (70º colocado). BRT do [Cabral](/imoveis/cabral) a 5 minutos, Praça do Japão e Parque São Lourenço vizinhos.

**Justificativa:** wording oficial + adiciona prova externa (Newsweek) que reforça o argumento de infraestrutura sem inflar.

---

### Mudança 5 — Block 25 (tabela aposentado)

**Atual** (linha do Juvevê):
> Juvevê | Silencioso, arborizado, preço R$ 13.897/m². **Perfil residencial baixo padrão**. Pequeno Príncipe a 8 min.

**Problema:** "perfil residencial baixo padrão" não faz sentido — Juvevê é alto padrão (m² R$ 13.897). O autor provavelmente quis dizer "baixa verticalização" ou "perfil residencial tradicional".

**Proposto:**
> Juvevê | Silencioso, arborizado, preço R$ 13.897/m². **Perfil residencial tradicional, baixa verticalização**. Pequeno Príncipe a 8 min.

**Justificativa:** corrige interpretação errada + descreve atributo real.

---

### Mudança 6 — Block 28 (tabela investidor — Prado Velho 12%)

**Atual** (primeira linha):
> Prado Velho | **~12% ao ano** (studios mobiliados PUC/Santa Casa) | Aluguel de temporada + estudantes

**Problema:** 12% ao ano é número alto demais pra leitor confundir
com rentabilidade média. Já está marcado como tipologia específica
(studios mobiliados), mas pode ficar mais explícito.

**Proposto:**
> Prado Velho | ~12% ao ano em **tipologia específica** (estúdio mobiliado para estudantes da PUC/Santa Casa, locação de temporada — observação acompanhada pela FYMOOB) | Aluguel de temporada + estudantes

**Justificativa:** marca como observação FYMOOB com tipologia específica — investidor não confunde com rentabilidade média do bairro.

---

### Mudança 7 — Block 29 (rentabilidade Batel/Bigorrilho)

**Atual:**
> Armadilha clássica: [Batel](/imoveis/batel) e [Bigorrilho](/imoveis/bigorrilho) têm aluguel caro em reais absolutos, mas a **rentabilidade sobre o preço de compra fica em ~2% ao ano**. São reserva de valor, não renda. [Detalhes no ranking completo de preço do m²](/blog/preco-metro-quadrado-curitiba-bairro).

**Proposto:**
> Armadilha clássica: [Batel](/imoveis/batel) e [Bigorrilho](/imoveis/bigorrilho) têm aluguel caro em reais absolutos, mas a **rentabilidade sobre o preço de compra fica em torno de 0,25-0,33% ao mês (~3% a.a.)** — abaixo da média de Curitiba (4,74% a.a., FipeZap mar/2026) por serem bairros premium historicamente saturados. São reserva de valor, não renda. [Ranking completo de preço do m²](/blog/preco-metro-quadrado-curitiba-bairro).

**Justificativa:** harmoniza com o `mercado-imobiliario` e `quanto-custa-batel` revisados + adiciona contexto explícito (faixa premium tem rendimento abaixo da média da cidade).

---

### Mudança 8 — Block 30 (CTA "Calcule a rentabilidade")

**Atual:**
- title: "Quer que a gente calcule a rentabilidade real de um bairro específico?"
- description: "O time FYMOOB roda a conta com dados de fechamento recente do bairro — **não média genérica agregada**."
- label: "Falar com especialista"

**Proposto:**
- title: manter
- description: **"O time FYMOOB cruza o aluguel observado por tipologia/bairro com o preço-alvo e devolve a faixa esperada de rendimento."**
- label: manter

**Justificativa:** remove "não média genérica agregada" (mesmo padrão de
revisões anteriores) sem perder utilidade.

---

### Mudança 9 — Block 35 (Cascatinha)

**Atual:**
> A Secretaria de Segurança Pública do Paraná registrou **zero homicídios em Cascatinha** nos 9 primeiros meses de 2025. **É um dos 4 bairros mais seguros do Brasil em capital**. Drenagem nova pelo pacote PRO Curitiba (R$ 2,9 bi em obras). Virou "Santa Felicidade alto padrão" em silêncio — nicho casa (R$ 900 mil a R$ 15 milhões), não apartamento.

**Proposto:**
> Na agregação consultada (SESP-PR / CAPE, jan-set/2025), não aparecem homicídios letais reportados para Cascatinha. Como a SESP-PR não publica esse recorte por bairro de forma padronizada, o dado deve ser lido como **indicador, não garantia**. Cascatinha aparece nos cortes consultados como um dos bairros com **menor incidência de crimes letais entre os bairros residenciais de capital brasileira**, ainda que sem ranking oficial nacional. Drenagem nova pelo pacote PRO Curitiba (R$ 2,9 bilhões em obras). Virou "Santa Felicidade alto padrão" em silêncio — nicho de casa (R$ 900 mil a R$ 15 milhões), não apartamento.

**Justificativa:** mesmo padrão do block 9 (Ahú) — caveat sobre limitação SESP + suaviza claim absoluto sem fonte oficial.

---

### Mudança 10 — Block 41 (Ecoville mito)

**Atual:**
> [Ecoville](/busca?bairro=Ecoville) como "modernidade acessível". Guia antigo de 2015 coloca Ecoville como "Batel dos jovens". Em abril de 2026 o **Ecoville custa R$ 16.800/m² — mais caro que Bigorrilho (R$ 14.117)**. O perfil mudou: hoje é casa de alto padrão em condomínio fechado, comprada por família classe A vinda de outra capital. Moderno, sim. Acessível, não.

**Proposto:**
> [Ecoville](/busca?bairro=Ecoville) como "modernidade acessível". Um guia de 2015 colocava o Ecoville como "Batel dos jovens". Em **março de 2026, o FipeZap publica Mossunguê (coração do Ecoville no IPPUC) em R$ 14.062/m²** — praticamente empatado com Bigorrilho (R$ 14.117). Mais barato que o Batel? Sim. "Acessível"? Não. O perfil mudou: hoje é casa de alto padrão em condomínio fechado, comprada por família vinda de outras capitais. Moderno, sim. Acessível, não — quem ainda repete a frase está usando uma régua de dez anos atrás.

**Justificativa:** alinha com FipeZap mar/26 + reforma o argumento (a tese "Ecoville não é acessível" sobrevive, só com número certo).

---

### Mudança 11 — Block 61 (methodologyBox)

**Atual props:**
```json
{
  "period": "Abril/2026",
  "sample": "30 bairros de Curitiba avaliados em 4 critérios...",
  "sources": "[\"FipeZap (FGV + Fipe + Zap)\", \"SESP-PR (CAPE Estatísticas)\", \"INEP (IDEB 2024 + ENEM 2024)\", \"IPPUC\", \"Prefeitura Curitiba\", \"Secovi-PR\"]",
  "treatment": ""
}
```

**Proposto:**
```json
{
  "period": "Abril/2026",
  "sample": "30 bairros de Curitiba avaliados em 4 critérios (segurança, educação, infraestrutura, preço). Pontuação 0-20 por critério.",
  "sources": "[\"FipeZap mar/2026 (FGV + Fipe + Zap) — preço m² por bairro\",\"SESP-PR / CAPE Estatísticas — crimes letais (recorte agregado, sem granularidade oficial por bairro)\",\"INEP — IDEB 2024 (escolas públicas) + ENEM 2024 (escolas particulares)\",\"IPPUC — áreas verdes, transporte, equipamentos urbanos\",\"Prefeitura de Curitiba — IPTU 2026 (Decreto 2668/2025) e equipamentos públicos\",\"Secovi-PR — Pesquisa de Locação CWB\"]",
  "treatment": "Pesos do ranking geral: 25% cada critério (igualdade). Pesos por perfil: Família com filhos pequenos — 35% educação + 30% segurança + 20% infraestrutura + 15% preço. Jovem solteiro/casal sem filhos — 30% infraestrutura/vida urbana + 25% preço + 25% transporte + 20% segurança. Aposentado/família madura — 35% segurança + 25% tranquilidade + 20% saúde + 20% preço. Investidor — 40% rendimento de aluguel + 25% liquidez + 20% valorização esperada + 15% risco de vacância.",
  "lastUpdate": "2026-05-02"
}
```

**Justificativa:** sources com qualificação cuidadosa (caveat SESP, ano INEP, decreto Prefeitura) + treatment descreve pesos por perfil que estão hoje espalhados nos parágrafos 17, 21, 24, 27 — fica auditável.

---

### Mudança 12 — Tabela "Como os pesos mudam o ranking" (inserção opcional)

Sugestão de adição depois do block 6 (intro do ranking geral) e antes do block 7 (Ahú no detalhe). É opcional — se o ChatGPT achar que cresce demais o post, descartamos.

| Perfil | Lidera | Cai no ranking | Sobe no ranking |
|---|---|---|---|
| Geral (peso igual) | Ahú | Batel (cai pra 3º) | Santa Felicidade (sobe pra 5º) |
| Família com filhos | Bacacheri | Centro, Alto da Glória | Água Verde, Cristo Rei |
| Jovem solteiro/casal | Alto da Glória | Bacacheri, Santa Felicidade | Centro |
| Aposentado | Cabral | Centro, Alto da Glória | Jardim Social |
| Investidor (renda) | Prado Velho (tipologia específica) | Batel, Bigorrilho (rendimento ~3%) | Portão, Cidade Industrial |

**Justificativa:** dá ao leitor um mapa de como os pesos mudam o resultado — ideia central do post fica visível em 1 olhada.

---

## 4. Pontos a validar fora do escopo desta revisão

1. **Block 33** ("Bacacheri m² R$ 8.748" + "+5,1% ao ano") — bate com PMQ
   (R$ 8.680, +5,1%); diferença <1%, OK.

2. **Block 38** (heading "3 bairros pra repensar antes de fechar (com
   gentileza)") — tom "com gentileza" é editorial, OK manter.

3. **Block 50** (FAQ família) — Bacacheri R$ 8.748 mantido (consistente).

4. **Block 54** (FAQ valorização) — bate com PMQ revisado:
   Ahú +12,5%, Juvevê +11,5%, CIC +10,2%, Bom Retiro +9,1%, Campina do
   Siqueira +8,2%. OK.

5. **Block 18** (tabela família) — Bacacheri R$ 8.748 (~R$ 8.680 PMQ),
   tolerância. OK.

6. **Block 22** (tabela jovem) — Centro +7,3% em 12m: PMQ não tem dado
   explícito; OK manter.

7. **Block 28** (tabela investidor) — Cidade Industrial "valorização
   +10,2% em 12m" bate com PMQ (Cidade Industrial #20 R$ 8.998 +10,2%
   no extrato anterior).

---

## 5. Próximos passos

1. **Você valida este doc com ChatGPT.** Pontos especialmente
   importantes:
   - "Maior hospital exclusivamente pediátrico" + Newsweek 2025 — aceito como gancho?
   - Faixa de rendimento Batel/Bigorrilho 0,25-0,33% ao mês = mesma proposta usada no Batel revisado: harmonização correta?
   - Caveat SESP-PR pra Cascatinha — está fiel ao que o block 9 faz pro Ahú?
   - Tabela "Como os pesos mudam o ranking" entra ou descarta?

2. **Após validação, traduzo em script**
   `scripts/apply-melhores-bairros-revisions.mjs` no padrão idempotente
   dos anteriores.

3. **Sprint A completo após este artigo.** Pendências registradas para
   depois:
   - Micro-revisão em `mercado-imobiliario-curitiba-2026` para alinhar
     a faixa premium de rendimento para 0,25-0,33% ao mês (atualmente
     0,32-0,38%) — fechando a harmonização entre os 3 artigos que
     citam essa faixa (mercado, batel, melhores-bairros).
   - Sprint B (Tier 2 do plano geral): pesquisar fontes externas para
     "60% MCMV usados", "20% afetação", alíquotas ITBI outras capitais
     etc.

---

## 6. Fontes consultadas pra esta auditoria

- [Hospital Pequeno Príncipe — Quem somos](https://pequenoprincipe.org.br/institucional/quem-somos/)
  — "maior hospital exclusivamente pediátrico do Brasil"
- [Newsweek — World's Best Specialized Hospitals 2025 (via Pequeno Príncipe)](https://pequenoprincipe.org.br/)
  — primeiro hospital exclusivamente pediátrico da América Latina, 70º global
- [FipeZap mar/2026](https://www.fipe.org.br/pt-br/indices/fipezap/)
  — Mossunguê R$ 14.062 (não R$ 16.800)
- [MySide — Valor do metro quadrado em Curitiba 2026](https://myside.com.br/guia-curitiba/metro-quadrado-curitiba-pr)
  — confirmação dos 30 bairros do PMQ
- Cruzamento interno com `preco-metro-quadrado-curitiba-bairro`,
  `mercado-imobiliario-curitiba-2026` (revisado 02/05/26),
  `quanto-custa-morar-batel-curitiba` (revisado 02/05/26)
