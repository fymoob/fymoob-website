# Acoes pendentes do Bruno (CRM + Conteudo)

> Itens que dependem de acao/conteudo do Bruno (CRM, fotos equipe, blog, links externos).
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


### Pendente — Dependencias do Bruno (SEO)

> Itens do Google Starter Guide que dependem de acao/conteudo do cliente:

- [ ] **Fotos da equipe no Sobre Nos** — verificar se `/images/team/` tem fotos de Wagner alem de Bruno. Ideal: foto profissional de cada socio + corretores. Impacto: E-E-A-T reforcado (Google confia mais em imobiliaria com equipe visivel).
- [ ] **Bio/autor do blog** — hoje todos os posts usam "Bruno Cesar de Almeida" como autor (RealEstateAgent com CRECI). Se Wagner ou outros escreverem, precisa schema Person extra + foto.
- [ ] **Cadencia editorial do blog** — site lancou com 5 artigos iniciais. Para ranquear em queries informacionais (ex: "como avaliar um imovel", "qual melhor bairro Curitiba"), publicar 2-4 artigos/mes. Responsavel: Bruno ou marketing.
- [ ] **Links externos validos pra autoridade** (gov.br/anpd, COFECI, prefeitura Curitiba) — comentar/citar fontes oficiais nos artigos do blog aumenta E-E-A-T. Faq pode citar COFECI em algumas perguntas.
- [ ] **Marcar mais imoveis como DestaqueWeb=Sim no CRM** — hoje 7 nao-lancamentos + 6 lancamentos. Para rotacao da home ter efeito visivel, idealmente 20-25 nao-lancamentos + 15 lancamentos. Curadoria do Bruno.

---


## Ações para o Bruno (CRM / Conteúdo)

> Tarefas que dependem do Bruno para melhorar a qualidade do site.

### Padronização de Títulos e Descrições no CRM

**Problema:** Os títulos e descrições dos imóveis no CRM estão inconsistentes — alguns com CAPS LOCK, outros cortados, outros genéricos demais. Isso aparece direto no site e prejudica a imagem profissional e o SEO.

**Ação:** Pedir ao Bruno que padronize os títulos e descrições dos imóveis ativos no CRM (Loft/Vista). Abaixo o padrão recomendado:

#### Formato recomendado para TÍTULO (max 70 caracteres)
```
{Tipo} {N} Quartos {Área}m² | {Bairro}, Curitiba — {Diferencial}
```

**Exemplos:**
- `Apartamento 3 Quartos 98m² | Batel, Curitiba — Vista Panorâmica`
- `Sobrado 4 Quartos 220m² | Ecoville — Lazer Completo e 3 Vagas`
- `Cobertura Duplex 180m² | Água Verde — Terraço Gourmet`
- `Casa 5 Quartos 350m² | Santa Felicidade — Piscina e Churrasqueira`

**Por que funciona:**
- Tipo + quartos + m² = palavras-chave que o Google indexa
- Bairro no título = 70%+ das buscas incluem bairro
- Diferencial no final = gera curiosidade e clique
- Listagens com m² no título recebem 15-20% mais cliques

**Palavras que convertem:** vista livre, pronto para morar, reformado, andar alto, sol da manhã, lazer completo, primeira locação, silencioso, segurança 24h

**Evitar:** "IMPERDÍVEL", "NÃO PERCA" (spam), ALL CAPS, exclamações (!!!), "lindo/maravilhoso" sem contexto, abreviações (dorm., gar.)

#### Formato recomendado para DESCRIÇÃO (150-250 palavras)
```
{Frase de estilo de vida com o diferencial principal.}

• {N} quartos ({N} suítes) · {N} vagas · {Área}m² privativos
• {Diferencial 1: acabamento/posição solar/vista}
• {Diferencial 2: lazer do condomínio/segurança}

Localização privilegiada no {Bairro}, a {X} min do {referência — parque, shopping, escola}.

Agende sua visita com a FYMOOB.
```

**Exemplo de descrição profissional:**
```
Viva com vista para o Parque Barigui neste apartamento de alto padrão no Ecoville.

• 3 quartos (1 suíte) · 2 vagas · 126m² privativos
• Acabamento premium, piso porcelanato e cozinha planejada
• Condomínio com piscina, academia, salão de festas e playground

Localização privilegiada no Ecoville, a 5 min do Parque Barigui e do Shopping Barigui.

Agende sua visita com a FYMOOB.
```

**Dados de pesquisa:**
- Descrições com bullet points têm ~30% mais engajamento que texto corrido
- Mencionar proximidade a referências (parques, shoppings) aumenta cliques
- Sempre incluir preço — imóveis sem preço recebem menos leads qualificados

- [ ] Falar com Bruno sobre padronização de títulos no CRM
- [ ] Falar com Bruno sobre padronização de descrições no CRM
- [ ] Criar documento/guia simplificado para o Bruno seguir

### Cadastro de IPTU e Condomínio (todos os imóveis)

**Problema:** Quando o imóvel não tem `valorIptu` ou `valorCondominio` preenchidos no CRM, o campo simplesmente não aparece no site (ContactSidebar desktop e MobilePriceCard). Para venda e locação, isso pode dar impressão equivocada de isenção.

**Comportamento atual:**
- Se `valorIptu` for `null`/`0` → linha "IPTU" some (não aparece nem "Sob consulta")
- Se `valorCondominio` for `null`/`0` → linha "Condomínio" some
- Se ambos forem nulos → o bloco inteiro de taxas não é renderizado

**Ação:** Pedir ao Bruno para preencher `ValorIptu` e `ValorCondominio` em TODOS os imóveis ativos (venda e locação) — mesmo quando o valor for estimativa ou faixa, manter um número cadastrado evita a omissão silenciosa no site.

**Alternativa (dev):** Se o Bruno não puder cadastrar todos, avaliar exibir rótulo "IPTU sob consulta" / "Condomínio sob consulta" quando o campo estiver ausente, para reforçar transparência.

- [ ] Falar com Bruno sobre preenchimento de IPTU/Condomínio em todos os imóveis
- [ ] Decidir se implementamos fallback "Sob consulta" no site enquanto o CRM não for 100% preenchido

### Seguro Incêndio e FCI nos imóveis de locação [DESBLOQUEADO + IMPLEMENTADO — 14/04/2026]

**Resolvido 14/04/2026:** Loft expôs os campos na API pública. Nomes oficiais:
- `SeguroIncendio` (já disponível em `/imoveis/detalhes`)
- `Fci` (já disponível em `/imoveis/detalhes`)
- Endpoint novo descoberto: `/imoveis/listarcampos` — lista todos os 271 campos disponíveis

Integração ao site feita em 14/04/2026:
- [x] Campos `valorSeguroIncendio` e `valorFci` adicionados ao tipo `Property`
- [x] Parse em `services/loft.ts` (DETAIL_FIELDS)
- [x] Render em `ContactSidebar` (desktop) — só aparece pra Locação/Venda+Locação
- [x] Render em `MobilePriceCard` (mobile) — grid 2x2 com Cond/IPTU/Seguro/FCI pra rental
- [x] Cálculo do "Total mensal" agora inclui Seguro Incêndio + FCI (estimativa realista)
- [x] Fallback "Não informado" em italic pra campos vazios no CRM (mesmo padrão de IPTU/Cond)

**Nova task pro Bruno (prioridade alta):**
- [ ] Preencher `Seguro Incêndio` e `FCI` em TODOS os imóveis de locação ativos no CRM. Até ele cadastrar, o site mostra "Não informado" nesses campos nas páginas de aluguel.

---

### (histórico — mantido como referência de debugging)

**Seguro Incêndio e FCI nos imóveis de locação [BLOQUEADO — aguardando Loft/Vista]** — pré 14/04/2026

**Pedido do Bruno (13/04/2026):** incluir os campos **Seguro Incêndio** e **FCI (Fundo de Conservação do Imóvel)** nos imóveis de locação, com fallback "Não informado" quando vazio (mesma regra do IPTU/Condomínio).

**Status:** BLOQUEADO. Esses campos **não existem na API REST** que o site consome (`brunoces-rest.vistahost.com.br`). Confirmado por:

1. **Teste direto na API:** todas as variações testadas (~50) retornam `"Campo X não está disponível"`. Exemplos testados: `ValorSeguroIncendio`, `SeguroIncendio`, `ValorFci`, `FCI`, `FundoConservacao`, `ValorFundoConservacao`, `OutrasTaxas`, `TaxasDiversas`, `Rateio`, etc.
2. **Documentação oficial da Vista** ([vistasoft.com.br/api/](https://www.vistasoft.com.br/api/)): lista todos os campos financeiros disponíveis — nenhum relacionado a seguro ou FCI.
3. **Form de busca do CRM (crmx.novovista.com.br)** decodificado: não tem campos de Seguro Incêndio ou FCI na pesquisa. Só `VLR_VENDA` e `VLR_ALUGUEL`.
4. **Dois sistemas diferentes identificados:** `crmx.novovista.com.br` (NovoVista, onde Bruno edita) ≠ `brunoces-rest.vistahost.com.br` (Vista clássico, que alimenta o site).

**Hipóteses prováveis:**
- Os valores são **calculados automaticamente** por regra (ex: FCI = X% do condomínio) — nesse caso, basta saber a fórmula.
- Os valores ficam **no contrato de locação** (módulo separado), não no cadastro do imóvel.
- Existe uma **API nova do NovoVista** que expõe esses campos, mas não está sendo usada.

**Perguntas para o Bruno abrir com o suporte Loft/Vista:**

1. Os valores de Seguro Incêndio e FCI são **calculados automaticamente** (% do condomínio/aluguel/m²) ou cadastrados manualmente?
   - Se calculados: **qual a fórmula?** A gente replica no site.
   - Se manuais: **qual o nome exato do campo na API REST** e quando estará disponível?
2. Existe uma **API REST do NovoVista** (ex: `api.novovista.com.br`) com schema atualizado? Se sim, **credenciais + documentação**.

**Implementação (quando desbloqueado):**
- Adicionar `valorSeguroIncendio` e `valorFci` em `Property` type
- Adicionar extração em `services/loft.ts` (fields + parse)
- Adicionar renderização em `MobilePriceCard.tsx` e `ContactSidebar.tsx` — só para finalidade "Locação" ou "Venda e Locação"
- Regra de exibição: valor real se cadastrado, "Não informado" se null/0 (mesma lógica já implementada para IPTU/Cond)
- Atualizar `totalPacote` (Aluguel + Cond + IPTU + Seguro + FCI) quando todos os componentes estiverem disponíveis

- [ ] Bruno: perguntar à Loft se valores são calculados ou manuais + nome do campo na API
- [ ] Bruno: verificar se existe API REST do NovoVista com schema atualizado
- [ ] Dev: implementar extração + renderização assim que soubermos o nome do campo / fórmula

---
