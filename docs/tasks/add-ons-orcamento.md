# Add-Ons Fora do Escopo Contratual

> Pacotes 1+2 de servicos fora do contrato. Status, valores, aprovacoes pendentes.
> Migrado de `docs/TASKS.md` em 2026-05-04 — ver `docs/TASKS.md` para indice mestre.


## 💰 Add-Ons Fora do Escopo Contratual (Orçamento Complementar)

> **Seção dedicada** — consolida TODAS as demandas do Bruno que não estão
> no contrato de 04/04/2026. Atualizar sempre que surgir pedido novo.
>
> **Base legal:** Cláusula 2, §2º do contrato — *"Quaisquer funcionalidades,
> páginas ou serviços não listados nesta cláusula estão fora do escopo deste
> contrato e, se solicitados, serão objeto de orçamento complementar aprovado
> por ambas as partes antes da execução."*
>
> **Como aprovar:** WhatsApp com confirmação por escrito (cf. §5º Cláusula 13ª).
>
> **Referência visual:** `docs/configurador-servicos.html` tem formulário que
> já foi apresentado ao Bruno com itens 1-7.

### Status dos orçamentos

| Status | Quantidade |
|---|---|
| Pendente aprovação | 13 itens |
| Aprovados | 0 |
| Em execução | 0 |
| Concluídos | 0 |

### Pacote 1 — Serviços ao Cliente (apresentados no configurador)

| # | Item | Valor | Aprovado? |
|---|------|---|---|
| 1 | **Página de Serviços** — hub + menu "Serviços" substituindo "Anunciar" | R$ 800 | ⬜ |
| 2a | **Pack Certidões** — pagamento Pix manual | R$ 1.800 | ⬜ |
| 2b | **Pack Certidões** — pagamento online automático (Pagar.me/Mercado Pago) | R$ 3.500 | ⬜ (alternativa ao 2a) |
| 3a | **Calculadora Avaliação** — estimativa por tabela de preços do catálogo | R$ 2.500 | ⬜ |
| 3b | **Calculadora Avaliação** — estimativa com IA (OpenAI/Anthropic + base FYMOOB) | R$ 5.000 | ⬜ (alternativa ao 3a) |
| 4 | **Laudo Avaliação Presencial** — página + formulário | R$ 1.000 | ⬜ |
| 5 | **Ficha Análise de Crédito** — form completo + envio email | R$ 1.500 | ⬜ |
| 6 | **Captação Imóveis para Locação** — landing dedicada | R$ 800 | ⬜ |
| 7 | **Captura Contato WhatsApp** — form rápido antes do wa.me + cadastro auto no CRM | R$ 800 | ⬜ |

**Totais possíveis do Pacote 1:**
- Completo com pagamentos manuais: 1+2a+3a+4+5+6+7 = **R$ 9.200**
- Completo com pagamentos online: 1+2b+3b+4+5+6+7 = **R$ 13.400**
- ROI focado (captação de lead): 3a+4+5+7 = **R$ 5.600**

### Pacote 2 — Demandas Adicionais (mapeadas 18-19/04)

| # | Item | Valor | Aprovado? |
|---|------|---|---|
| 8 | **Multi-CRM (parceiros)** — API Loft de outra imobiliária, prefix de códigos, CRECI, lead routing | R$ 1.200 setup + R$ 400/CRM adicional | ⬜ (parceiro ainda não definido) |
| 9 | **Loft Share Button** — ferramenta `/admin/compartilhar` gerando link fymoob.com.br + WhatsApp com msg pronta, substituindo imo.bi do Loft | R$ 1.000 | ⬜ (tentar custom domain Loft grátis primeiro) |
| 10 | **Padronização Títulos SEO** — planilha de sugestões (features + copywriting pesquisado 19/04) + auto-aplicação em 200 imóveis menores; top 30 revisados por Bruno no CRM | R$ 800 | ⬜ (aguarda decisão Bruno) |
| 11 | **Proposta de Compra (PDF)** — corretor preenche form, site gera PDF FYMOOB, envia por email | R$ 1.200 (estimativa) | ⬜ |
| 12 | **Proposta de Locação (PDF)** — igual ao 11 com campos específicos (garantia, prazo) | R$ 1.000 (estimativa — reusa código do 11) | ⬜ |
| 13 | **Empreendimentos Personalizáveis** — página custom por empreendimento (editorial, galeria estendida, plantas, mapa detalhado) | Escopo pendente | ⬜ (Bruno precisa definir nível de custom) |

**Total Pacote 2 (itens 8+9+10+11+12, sem 13):** R$ 5.200

### Pacote Full — tudo aprovado (1+2a+3a+4+5+6+7+8+9+10+11+12)

**R$ 14.400** (exceto item 13 que precisa escopo) — negociável em parcelas similar ao contrato original (6x R$ 2.400).

### Itens descartados / shelved

| Item | Motivo |
|---|---|
| Browser extension para share button | Muito custo de manutenção; substituído pelo item 9 |
| Integração Supabase pro lead (Fase 15.A) | Dentro de 15.A do plano atual, não vira add-on extra |

### Política de novos add-ons

Quando o Bruno pedir algo novo que **não está** no contrato nem nesta lista:

1. Avaliar se é trivial (< 2h dev) — nesse caso posso fazer sem cobrar extra como cortesia
2. Se > 2h: estimar e **adicionar aqui** com valor sugerido
3. Enviar orçamento por WhatsApp antes de executar
4. Só iniciar após confirmação escrita do Bruno (print ou msg explícita)
