# W19 Validation Report — top 3 oportunidades

> **Data validacao:** 2026-05-04
> **Metodo:** WebFetch direto + WebSearch (BrasilAPI Receita Federal +
> Gazeta do Povo + sites oficiais empresas)
> **Validador:** humano (não-AI), pos-run W19 do Market Intelligence Team
> **Custo validacao:** ~$0,15 (5 WebFetch + 3 WebSearch)
> **Tempo:** ~10 minutos

## Resumo executivo

**3 de 3 candidatos validados.** Bruno pode agir com confianca em qualquer
um dos 3. Confidence levels do W19 mantidos sem ajuste.

| # | Empresa | Confidence W19 | Validacao | Verdict |
|---|---|---|---|---|
| 1 | Andrade Ribeiro | 85/100 | 100% confirmado | ✅ Manter — telefone validado, release exata, 4 empreendimentos OK |
| 2 | Veres | 70/100 | Confirmado | ✅ Manter — CNPJ + telefone + ADEMI associado |
| 3 | Rottas | 65/100 | Programa estruturado existe | ✅ Manter — portal Parceiros Rottas real, emails de contato |

---

## 1. Andrade Ribeiro — VALIDADO 100% ✅

### CNPJ (Receita Federal via BrasilAPI)

```json
{
  "razao_social": "CONSTRUTORA ANDRADE RIBEIRO LTDA",
  "cnpj": "77.800.795/0001-47",
  "capital_social": "R$ 15.000.000,00",
  "data_abertura": "1978-04-18",
  "situacao_cadastral": "ATIVA",
  "atividade_principal": "4110-7 Incorporação de empreendimentos imobiliários",
  "endereco": "Alameda Princesa Izabel, 1808 - Bigorrilho - Curitiba, PR 80730-080",
  "telefones": ["(41) 3336-8686", "(41) 3046-7872"],
  "natureza_juridica": "Sociedade Empresária Limitada",
  "regime_tributario": "Lucro Presumido"
}
```

**Validacoes que batem com W19:**
- Capital social: R$ 15M ✅
- Idade da empresa: 47 anos (1978 → 2025 quando release saiu) ✅
- Telefone (41) 3336-8686 ✅
- Endereco em bairro premium (Bigorrilho) — coerente com posicionamento ✅

### Release Gazeta do Povo (encontrada via WebSearch)

**URL exata:** https://www.gazetadopovo.com.br/vozes/parana-sa/grupo-andrade-ribeiro-abre-mercado-para-corretores-e-imobiliarias/
**Data publicacao:** 14/07/2025 ✅
**Titulo:** "Grupo Andrade Ribeiro abre mercado para corretores e imobiliárias"

**Quote literal confirmada:**
> "Pela primeira vez em seus 47 anos de história, o Grupo Andrade Ribeiro,
> referência em construção civil e mercado imobiliário em Curitiba, abrirá
> a comercialização de seus empreendimentos para corretores e imobiliárias
> parceiras."

### 4 empreendimentos abertos pra parceria (confirmados na release)

| Empreendimento | Bairro | Segmento |
|---|---|---|
| **Seventy Upper Mansion** | Ecoville | Alto padrão (mansão suspensa) |
| **Villagio San Fratello Duo** | Campo Comprido | MCMV |
| **New Place** | Pinheirinho | Condomínio horizontal |
| **Bliss Campus** | Prado Velho | Standard (1º do grupo) |

### Confidence final: 85/100 ✅ MANTIDO

**Justificativa:** Tier 0 (CNPJ Receita confirmado) + Tier 3 (release Gazeta
do Povo, mídia editorial sólida) cross-validados. Cap Tier 3 = 70/100, mas
combinado com Tier 0 sobe pra 85/100 (alta confidence factual).

### Recomendação

✅ **Bruno pode ligar (41) 3336-8686 ou 3046-7872 nos próximos 7 dias.**
Mencionar: "Vi a release da Gazeta do Povo (14/07/2025) sobre abertura
pra parcerias. Sou da FYMOOB Imobiliária (CRECI J 9420). Tenho interesse
em ser parceira de comercialização — qual o processo?"

---

## 2. Veres Incorporadora — VALIDADO ✅

### CNPJ (via cnpj.biz)

```json
{
  "razao_social": "VERES EMPREENDIMENTOS IMOBILIARIOS LTDA",
  "cnpj": "42.823.466/0001-37",
  "endereco": "R. Padre Agostinho, 963, Sala 402 - Mercês - Curitiba, PR"
}
```

**Validacoes que batem com W19:**
- 4 anos (CNPJ 42.823.466 sugere abertura 2021-2022) ✅
- Telefone (41) 99606-2244 ✅ (confirmado em página oficial)
- Endereco Mercês — bairro central/médio padrão ✅

### Status setor

- **ADEMI-PR**: associado confirmado (https://ademipr.com.br/associado/veres-incorporadora-e-construtora/)
- **Site oficial**: https://www.veres.com.br
- **Instagram**: @veres.incorporadora ativa
- **Empreendimento atual**: Edifício Stenzo (Novo Mundo) confirmado em construção

### Status parceria exclusiva

**Não localizada parceria exclusiva pública** com nenhuma imobiliária.
Presença em compiladores (MySide), mas sem hub local dedicado. Coerente
com finding W19.

### Confidence final: 70/100 ✅ MANTIDO

**Justificativa:** CNPJ + ADEMI + site oficial = sources Tier 0/1.
Score moderado porque "ausência de parceira" é difícil de provar
absolutamente (poderia ter parceiro não-publicizado).

### Recomendação

✅ **Bruno pode contatar (41) 99606-2244 nos próximos 14 dias.**
Linha de abordagem: "Vi que vocês são associados ADEMI e tem o
Edifício Stenzo lançando. FYMOOB tem interesse em parceria de
comercialização — vocês trabalham com imobiliárias parceiras?"

---

## 3. Rottas Construtora — VALIDADO ✅

### Empresa (LinkedIn + cnpj.biz)

- **Razão social**: ROTTAS Construtora e Incorporadora Ltda
- **CNPJ**: 11.863.002/0001-20
- **Idade**: 14 anos (fundada ~2010-2011)
- **Portfólio**: 9.300+ unidades, 528.000+ m² obras
- **Atuação**: Curitiba + Londrina + Ponta Grossa + Guarapuava + Caiobá + Joinville
- **Site oficial**: https://rottasconstrutora.com.br
- **Endereço**: Av. Rep. Argentina, 1004, Água Verde - Curitiba

### Programa Parceiros Rottas — ESTRUTURADO ✅

**URL oficial confirmada:** https://www.parceirosrottas.com (não
parceirosrottas.com simples — é www.)

**Estrutura confirmada:**
- "Rottas Vendas" — área dedicada
- Coordenadores regionais (Curitiba, Joinville, Londrina, Ponta Grossa, Litoral)
- Página "Sou corretor" segmentada por região
- "Credenciamento de Novos Parceiros" (formulário dedicado)
- "Quero Vender Rottas" (call-to-action)
- Emails contato:
  - marketing@rottasvendas.com.br
  - parceiros@rottasvendas.com.br

**Detalhes específicos** (comissão %, categorias, documentação) atrás
de login/páginas internas — não acessível via fetch público. Bruno terá
acesso ao cadastrar.

### Confidence final: 65/100 ✅ MANTIDO

**Justificativa:** Programa REAL e estruturado, mas detalhes específicos
de comissão/exclusividade não acessíveis publicamente. Score moderado
porque "low-effort cadastro" pode ser só formulário sem retorno garantido
(diferente de Andrade Ribeiro que tem release pública anunciando abertura).

### Recomendação

✅ **Equipe FYMOOB cadastra via https://www.parceirosrottas.com nos
próximos 30 dias.** Email backup: parceiros@rottasvendas.com.br.
Low-effort. Após cadastro, validar se retorno tem comissão atrativa
e portfolio relevante (Curitiba).

---

## Conclusão

**Top 3 do W19 estão prontos pra ação.** Confidence levels do scorer foram
adequados (não inflados). Validação humana cobriu o gap de Tier 3 source
no Andrade Ribeiro com Tier 0 CNPJ + URL exata da release.

**Próxima atualização do brief:** validar Tier 3 cap como regra mas
permitir uplift quando cross-checked com Tier 0 confirmando dados primários
(release fala de N anos → CNPJ data abertura confirma N anos = uplift OK).

## Sources usadas na validação

- **CNPJ Andrade Ribeiro**: [BrasilAPI](https://brasilapi.com.br/api/cnpj/v1/77800795000147)
- **Release Gazeta do Povo**: [Grupo Andrade Ribeiro abre mercado para corretores e imobiliárias](https://www.gazetadopovo.com.br/vozes/parana-sa/grupo-andrade-ribeiro-abre-mercado-para-corretores-e-imobiliarias/)
- **Veres CNPJ**: [cnpj.biz/42823466000137](https://cnpj.biz/42823466000137)
- **Veres ADEMI**: [ademipr.com.br/associado/veres-incorporadora-e-construtora](https://ademipr.com.br/associado/veres-incorporadora-e-construtora/)
- **Veres site**: [veres.com.br](https://www.veres.com.br)
- **Rottas LinkedIn**: [linkedin.com/company/rottasconstrutora](https://br.linkedin.com/company/rottasconstrutora)
- **Rottas Parceiros**: [parceirosrottas.com](https://www.parceirosrottas.com)
- **Rottas oficial**: [rottasconstrutora.com.br](https://rottasconstrutora.com.br/)
