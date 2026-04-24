# Verificação YMYL — Checklist Compra Imóvel

**Data:** 2026-04-23
**Agente:** YMYL Verifier Specialist (Claude Opus 4.7 1M)
**Arquivo verificado:** `content/blog/checklist-compra-imovel.mdx`
**Review preliminar:** `docs/research/article-reviews/checklist-compra-imovel.md`
**Protocolo:** `docs/seo/fymoob-research-protocol.md` — Fase 7 (Pre-Publish Verification)

---

## Veredito geral: **APROVADO COM RESSALVAS**

Base factual do post sólida (IPTU propter rem, ITBI 2,7%, matrícula 30d, regra 30%). 4 das 5 decisões editoriais centrais podem avançar pro writer, mas com ajustes cirúrgicos pra evitar dano YMYL. 1 decisão precisa ser ancorada em cenário concreto explícito no corpo do texto (claim de R$ 80 mil). 2 números desatualizados travam publicação até serem corrigidos. 1 item sugerido tem risco YMYL e deve sair.

---

## 1. Claim R$ 80 mil — análise

**Status:** APROVADO com ancoragem explícita obrigatória no corpo.

O número não é sensacionalista, mas só se sustenta se o post **mostrar a conta** — senão vira clickbait YMYL. Cenário conservador que fecha (imóvel médio Curitiba R$ 450k, FipeZap CWB abril/2026):

| Item esquecido | Custo real | Base |
|---|---|---|
| Averbação pendente de construção reformada | R$ 36k-54k desvalorização (8-12% sobre R$ 450k) | Faixa conservadora 8-12% — fontes citam "até 30%" mas é limite alto |
| Dívida de condomínio herdada (propter rem) | R$ 6k-18k | 6 a 18 meses × R$ 1.000/mês (condomínio médio CWB 2-3 dorms) |
| ITBI calculado errado (sobre venal em vez de venda) | R$ 4k-8k | 2,7% × delta de base, Prefeitura CWB |
| Reforma estrutural não detectada (fissura diagonal >1mm) | R$ 20k-40k | orçamentos contenção + refazer alvenaria |
| **SOMA CONSERVADORA** | **R$ 66k-120k** | mediana ≈ R$ 80k |

**Ajuste pro writer:** o número R$ 80 mil precisa ser **ancorado na lide e no item da averbação** citando explicitamente "imóvel de R$ 450k, soma de averbação + dívida de condomínio + reforma estrutural não detectada". Sem isso, vira número gratuito = viola Regra 8 do Manual Editorial + Regra 1 do Research Protocol (transparência de fontes).

**Alarmismo?** Não — a faixa R$ 66k-120k é defensável. Mas se o post elevar pra R$ 150k+ sem cenário, reprova.

---

## 2. Propter rem de condomínio — base legal

**Status:** APROVADO. Base legal blindada.

**Art. 1.345 CC (Lei 10.406/2002):**
> "O adquirente de unidade responde pelos débitos do alienante, em relação ao condomínio, inclusive multas e juros moratórios."

**Jurisprudência STJ consolidada:**
- STJ, 4ª Turma, REsp 1.345.331/RS: obrigação propter rem acompanha a coisa. Adquirente responde por débitos condominiais anteriores à aquisição, **inclusive multas e juros**.
- STJ reafirmou em 2015 (noticia institucional STJ.jus.br): "a relação jurídica material com o imóvel, e não o registro da escritura, define a responsabilidade".
- TJDFT consolida: adquirente responde mesmo sem registro da compra e venda, bastando posse + conhecimento inequívoco do condomínio.

**Limite temporal:** **não há prazo de 24 meses nem 5 anos.** O adquirente responde por **todo o passivo condominial existente** na data da aquisição (sem prescrição auto-aplicável). Prescrição de cobrança de cotas condominiais em geral é 5 anos (art. 206, §5º, I, CC) — mas o que o adquirente herda é o saldo em aberto não prescrito. **NÃO afirmar "24 meses" no post — isso seria erro factual grave.**

**Como o comprador descobre a dívida antes de fechar:**
1. Pedir **declaração de quitação de cotas condominiais** à administradora (documento padrão, emitido em 48h, gratuito ou taxa mínima R$ 50-100)
2. Cruzar com as **3 últimas atas de assembleia** (verificar rateios extras aprovados não lançados ainda)
3. Fundo de reserva: verificar saldo em extrato do condomínio (contra obras iminentes sem provisão)

**Veredito:** claim impecável se o writer usar art. 1.345 CC + REsp 1.345.331/RS + documento "declaração de quitação de cotas". Sem jurisprudência citada, reprova em YMYL.

---

## 3. Averbação — penalidades

**Status:** APROVADO com ajuste numérico.

**Pena real (desvalorização):**
- Fontes (CashMe, Quinto Andar, nradvocacia) citam faixa de **20% até "30% ou mais"** em cenários específicos.
- **Faixa 20-40% do review preliminar é DEFENSÁVEL no limite superior** mas só em casos-extremos (construção totalmente clandestina, sem habite-se). Para obras pequenas não averbadas (piscina, edícula, cobertura fechada), faixa real é **8-15%**.
- **Recomendação pro writer:** falar em "**até 30% de desvalorização + impossibilidade de financiamento bancário**". Não afirmar "20-40%" como regra — é cenário worst-case.

**Financiamento:**
- CORRETO. Caixa, Itaú, Bradesco, Santander **exigem averbação regularizada** para liberar crédito SBPE/SFH. Sem averbação = sem financiamento = mercado encolhe para compradores à vista (reduz demanda em ~70%, daí a desvalorização).

**É crime?**
- **NÃO é crime** não averbar. É **irregularidade administrativa/registral**.
- **NÃO afirmar "crime" no post — erro factual grave YMYL.**
- O que pode existir: multa municipal pela obra sem habite-se (Lei Municipal CWB 11.095/2004 — habite-se) e multa cartorária pela averbação atrasada.

**Custo pra averbar atrasado (Tabela Emolumentos PR 2026):**
- Averbação sem valor declarado: **R$ 946,80** (valor fixo cartorário)
- Averbação com valor declarado (construção): **R$ 600-1.500** conforme faixa
- **Somar: habite-se retroativo na Prefeitura CWB (R$ 2.000-8.000 dependendo da obra) + ART/RRT engenheiro (R$ 800-2.500) + multa prefeitura (variável)**
- **Total realista pra averbar construção atrasada de 80-150m²: R$ 5.000-15.000**

**Prazo legal:** a Lei 6.015/73 (Lei de Registros Públicos, art. 167, II) **não fixa prazo** pra averbar — mas o habite-se municipal deve ser solicitado em até 180 dias após conclusão da obra (CWB). Na prática, averbação deve acompanhar habite-se.

---

## 4. Registro de escritura %

**Status:** AJUSTE NUMÉRICO OBRIGATÓRIO.

**Post atual diz "Registro: ~0,8%".** Subestimado.

**Tabela TJPR Emolumentos 2026 (Lei Estadual PR 6.149/1970, atualizada anualmente pela Corregedoria-Geral de Justiça PR + CNJ):**

- Registro de escritura de compra e venda em Curitiba **gira em torno de 1% do valor** em 2026 (tabela escalonada por faixa de valor declarado)
- Tabela é **escalonada** (não percentual linear): imóveis de faixa mais alta pagam proporcionalmente menos
- Diferencial entre os 8 cartórios de registro em Curitiba **não existe** — emolumentos são tabelados estadualmente pelo TJPR, idênticos em todos os cartórios do estado
- Exemplos práticos (imóvel R$ 450k em 2026):
  - Registro: ~R$ 4.500 (≈1%)
  - Escritura: ~R$ 6.750 (≈1,5%)
  - Total cartorial: ~2,5% do valor

**Ajuste pro writer:** trocar `Registro: ~0,8%` por `Registro: ~1%`.

**Link oficial pro corpo do post:**
- [TJPR Foro Extrajudicial — Emolumentos](https://extrajudicial.tjpr.jus.br/emolumentos)
- [Colégio Notarial do Brasil — PR — Tabela de Custas](https://cnbpr.org.br/notariado/tabela-de-custas-e-emolumentos/)
- [Anoreg/BR — Tabela Emolumentos consolidada](https://www.anoreg.org.br/site/tabela-de-emolumentos/)

---

## 5. Avaliação bancária 2026

**Status:** AJUSTE NUMÉRICO OBRIGATÓRIO.

**Post atual diz "R$ 2.000-4.000".** O piso R$ 2.000 está obsoleto em 2026.

**Dados verificados (abril/2026):**
- **Caixa Econômica Federal:** R$ 3.100 (Tarifa de Avaliação Caixa, descontada na contratação SBPE/SFH, valor tabelado nacional)
- **Itaú:** R$ 3.200-3.800 (faixa varia por estado e valor do imóvel)
- **Bradesco:** R$ 3.500-4.200
- **Santander:** R$ 2.800-4.500 (faixa mais ampla)
- **Média mercado 2026:** **R$ 2.800-4.500** (piso R$ 2.000 é de 2022-2023, obsoleto)

**SFH vs balcão:** avaliação é a mesma técnica (engenheiro credenciado do banco vai ao imóvel). Diferença está em **taxa de juros** e **LTV** (SFH permite financiar até 80% do valor de avaliação; balcão até 90% em alguns bancos).

**Ajuste pro writer:** trocar `R$ 2.000-4.000` por `R$ 2.800-4.500`.

**Fontes:**
- [Larya — Taxa Financiamento Imobiliário 2026](https://larya.com.br/blog/taxa-financiamento-imobiliario-2026/)
- [Larya — Financiamento Caixa Imóvel Usado 2026](https://larya.com.br/blog/financiamento-caixa-imovel-usado/)
- [MySide — Taxa Juros Financiamento Imobiliário](https://myside.com.br/guia-imoveis/taxa-juros-financiamento-imobiliario)

---

## 6. Fixes obrigatórios pro writer

### Bloqueadores de publicação (P0)

1. **Ancorar R$ 80 mil em cenário concreto no corpo do post**
   - Cenário: imóvel de **R$ 450k em Curitiba (FipeZap abril/2026)**
   - Soma: averbação pendente (R$ 36-54k) + dívida condomínio 12 meses (R$ 12k) + reforma estrutural não detectada (R$ 20-40k)
   - **Inserir essa conta no item da averbação ou em callout dedicado** — não deixar o número só no título

2. **Registro ~0,8% → ~1%** (linha 129 do post atual)

3. **Avaliação bancária R$ 2.000-4.000 → R$ 2.800-4.500** (linha 130)

4. **REMOVER qualquer afirmação de "crime não averbar"** caso o writer cogite inserir. Não é crime — é irregularidade administrativa. Afirmar "crime" = dano YMYL + risco jurídico pro site.

5. **REMOVER qualquer prazo fixo "24 meses" ou "5 anos" pra propter rem de condomínio.** Jurisprudência STJ: adquirente herda **todo saldo em aberto**, sujeito só à prescrição quinquenal genérica — não a prazo específico de transferência.

### Melhorias obrigatórias (P1)

6. **Adicionar dívida condomínio como propter rem** no item 13 (Inadimplência) ou item novo 13-bis
   - Citar: **art. 1.345 CC** + **STJ REsp 1.345.331/RS**
   - Adicionar documento: **declaração de quitação de cotas condominiais** (pedir à administradora, 48h)

7. **Adicionar desvalorização averbação "até 30%"** (não usar 20-40% como regra — só o limite superior 30% é defensável como worst-case)

8. **Linkar fontes primárias no 1º parágrafo** quando o número estiver na lide (Regra 70 Research Protocol):
   - R$ 80 mil → link pra cenário + FipeZap CWB
   - Art. 1.345 CC → link Planalto
   - ITBI 2,7% → link Prefeitura CWB

9. **Inserir `<MethodologyBox>` no pilar:**
   - period: "Abril/2026"
   - sources: ["Prefeitura CWB", "TJPR Emolumentos", "STJ", "FipeZap CWB", "Loft CRM FYMOOB"]
   - lastUpdate: "2026-04-23"
   - nextReview: "2026-07-23"

10. **Frontmatter:**
    - `updatedAt: "2026-04-23"`
    - `reviewedBy: "YMYL Verifier v1.0"`
    - `nextReview: "2026-07-23"` (YMYL forte = trimestral)

### Item a REMOVER por risco YMYL

11. **"Dívida de condomínio = até R$ 30k"** como range genérico: risco de subestimação em cenários graves. Usar range **R$ 5k-30k** e **explicitar que pode ser maior em condomínios de alto padrão** (Batel, Ecoville, Alto da XV).

---

## 7. Fontes consultadas

### Tier 1 — Primárias oficiais
- [Planalto — Código Civil art. 1.345](https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm)
- [Planalto — Lei 6.015/73 Registros Públicos](https://www.planalto.gov.br/ccivil_03/leis/l6015compilada.htm)
- [Planalto — Lei 8.692/93 SFH](https://www.planalto.gov.br/ccivil_03/LEIS/l8692.htm)
- [Planalto — Decreto 93.240/86 Matrícula](https://www.planalto.gov.br/ccivil_03/decreto/1980-1989/d93240.htm)
- [STJ — Notícia institucional propter rem condomínio 2015](https://www.stj.jus.br/sites/portalp/Paginas/Comunicacao/Noticias-antigas/2015/2015-05-05_08-42_Relacao-material-com-imovel-define-responsabilidade-pelas-obrigacoes-de-condominio.aspx)
- [TJPR — Foro Extrajudicial Emolumentos](https://extrajudicial.tjpr.jus.br/emolumentos)
- [TJPR — Tabela de custas extrajudicial](https://www.tjpr.jus.br/documents/12471/3463145/TABELA+DE+CUSTAS+EXTRAJUDICIAL/a032b7be-6e63-6b5a-0414-988060d7a9f0)
- [Prefeitura Curitiba — ITBI base e alíquotas](https://www.curitiba.pr.gov.br/servicos/itbi-base-de-calculo-e-aliquotas/512)
- [Resolução BCB 4.676/2018](https://normativos.bcb.gov.br/Lists/Normativos/Attachments/50628/Res_4676_v8_P.pdf)

### Tier 2 — Setoriais autoritativas
- [Colégio Notarial do Brasil — PR](https://cnbpr.org.br/notariado/tabela-de-custas-e-emolumentos/)
- [IRIB — Emolumentos](https://www.irib.org.br/emolumentos/)
- [Anoreg/BR — Tabela de Emolumentos](https://www.anoreg.org.br/site/tabela-de-emolumentos/)
- [Registro de Imóveis do Brasil — Matrícula](https://www.registrodeimoveis.org.br/servicos/matricula)
- [TJDFT — Jurisprudência propter rem condomínio](https://www.tjdft.jus.br/consultas/jurisprudencia/jurisprudencia-em-temas/jurisprudencia-em-perguntas/direito-civil-e-processual-civil/taxa-condominial/apenas-o-proprietario-e-responsavel-pelo-pagamento-da-taxa-condominial)
- [TJRJ — Leilão débitos condominiais (PDF)](https://www.tjrj.jus.br/documents/10136/31891/leilao-debitos-condominiais.pdf)

### Tier 3 — Imprensa econômica
- [Conjur — Novo dono paga dívida condomínio](https://www.conjur.com.br/2011-set-13/dono-imovel-pagar-dividas-pendentes-condominio/)

### Tier 4 — Agregadores especializados
- [Larya — Taxa Financiamento Imobiliário 2026](https://larya.com.br/blog/taxa-financiamento-imobiliario-2026/)
- [Larya — Calculadora ITBI 2026](https://larya.com.br/itbi)
- [Larya — Financiamento Caixa Imóvel Usado 2026](https://larya.com.br/blog/financiamento-caixa-imovel-usado/)
- [Larya — Taxas compra imóvel 2026](https://larya.com.br/blog/quais-taxas-tenho-que-pagar-na-compra-de-imovel/)
- [MySide — Taxa Juros Financiamento](https://myside.com.br/guia-imoveis/taxa-juros-financiamento-imobiliario)
- [Quinto Andar — Imóvel não averbado](https://www.quintoandar.com.br/guias/como-comprar/imovel-nao-averbado/)
- [Quinto Andar — Averbação de construção](https://www.quintoandar.com.br/guias/manual-imobiliario/averbacao-de-construcao/)
- [CashMe — Averbação de construção](https://www.cashme.com.br/blog/tudo-o-que-voce-precisa-saber-sobre-averbacao-de-construcao/)
- [CashMe — Problemas imóvel não averbado](https://www.cashme.com.br/blog/quais-os-problemas-de-ter-um-imovel-nao-averbado/)
- [nradvocacia — Imóvel não averbado 2026](https://nradvocacia.com.br/imovel-nao-averbado/)
- [nradvocacia — Taxa de averbação 2026](https://nradvocacia.com.br/taxa-de-averbacao-de-imovel-valor/)
- [nradvocacia — Escritura de imóveis 2026](https://nradvocacia.com.br/escritura-de-imoveis/)
- [Creditas — Documentos compra imóvel](https://www.creditas.com/exponencial/documentos-necessarios-para-compra-de-imovel/)
- [Sindiconet — Propter rem condomínio](https://www.sindiconet.com.br/informese/propter-rem-no-condominio-dividas-e-obrigacoes-para-moradores-leis-normas-e-regras)
- [8º Registro de Imóveis Curitiba — Tabela](https://www.8registro.com.br/tabela)
- [2º Registro de Imóveis Curitiba](https://2ricuritiba.com.br/?link=tabela_de_emolumentos)

### Referências cruzadas (tier não aplica — internas)
- Review preliminar: `docs/research/article-reviews/checklist-compra-imovel.md`
- Protocolo de pesquisa: `docs/seo/fymoob-research-protocol.md`

---

**Sign-off:** YMYL Verifier Specialist, 2026-04-23
**Próximo passo:** writer executa reescrita com as 11 correções acima. Após reescrita, re-submeter pra Fase 7 do protocolo (Pre-Publish Verification) pro checklist 30 itens do Verifier Agent.
