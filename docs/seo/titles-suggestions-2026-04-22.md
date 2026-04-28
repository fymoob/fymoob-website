# Sugestões de Títulos SEO — Catálogo FYMOOB

> **Última sincronização com CRM: 2026-04-27** (ver `## 📋 Changelog` no fim do doc).
> Inclui DescricaoWeb completa + todas as 81 features de unidade + 77 features de condomínio + keywords SEO atuais do Loft.
> Base: [docs/seo/titles-audit-2026-04-22.md](titles-audit-2026-04-22.md) — **251 imóveis** ativos no CRM, **78 deles em lançamento**.
>
> **Dois padrões diferentes (não misturar):**
> - **Imóvel pronto pra morar** → padrão V2 abaixo (limite 55 chars, nome do empreendimento NO FIM, estrutura `[Diferencial] [Tipo/Qts] [Bairro] [Gancho]`).
> - **Lançamento (78 imóveis)** → ver seção **🚀 Lançamentos — Padrão Tier S Revisado** (limite 60 chars, nome do empreendimento NO COMEÇO, baseado em pesquisa de concorrentes Razzi/OLX/MySide).
>
> Referência metodológica: [docs/seo/title-optimization-research.md](title-optimization-research.md).

---

**Convenções:**
- **Limite estrito: 55 chars**
- **Estrutura:** `[Diferencial forte] [Tipo/Quartos] [Bairro] [Gancho opcional]`
- **Usar Tier S** (Pronto pra morar, Vista panorâmica, Suíte master, Mobiliado, Lazer completo, Aceita financiamento, etc)
- **NUNCA usar Tier C** (Ótimo, Imperdível, Aconchegante, Charmoso, Potencial, CAIXA ALTA, emojis, códigos Ref, preço)
- **Empreendimento só no FIM** (nunca no início — pessoa não busca por nome de empreendimento)
- **Número concreto** (quartos, m², distância) no meio se possível

**Auditoria de tipologia (28/04):** as sugestões foram cruzadas com Categoria/Dormitorios/AreaPrivativa do CRM via API. 30+ correções aplicadas (Studio→Apto, Sobrado→Casa térrea, Cobertura→Apto). Casos onde a Categoria do CRM diverge do título comercial (ex: "Casa em Condomínio" vendida como "Sobrado", apartamento de 1 dorm vendido como "Cobertura Loft") **mantêm o termo comercial** — Bruno ajusta a Categoria depois se quiser. Empreendimentos com "Casa" no nome (Casa Milano, Casa Batel, Casa Jobim, Casa Nomaa, Casa Nativa) são apartamentos — o "Casa" é nome próprio do empreendimento, não tipologia.

Formato de resposta por imóvel: `[código] novo título sugerido (N chars)`

---

## Imóveis agrupados por bairro

## Portão

#### `AP00657`
**Atual:** "Easy Vila Izabel - Lindos apartamentos com dois quartos à venda no bairro Vila Izabel" (85 chars)
**Sugerido:** "Apartamento 2 quartos 34m² a 500m do IPO Portão | Easy" (54 chars) ✅
**Justificativa:** CRM=Apartamento 2 dorms (não Studio). Marco Hospital IPO da descrição vira gancho. Bairro real é Portão (título original CRM dizia "Vila Izabel" mas é nome do empreendimento Easy Vila Izabel — o BairroComercial é Portão).

#### `AP00758`
**Atual:** "Door - Apartamento com 3 quartos à venda no bairro Portão em Curitiba. Próximo ao Shoping Palladium" (99 chars)
**Sugerido:** "Apto 3 quartos 67m² ao lado Shopping Palladium Portão" (54 chars) ✅
**Justificativa:** Descrição diz "ao lado do Shopping Palladium" — marco exato vira gancho.

#### `AP00821`
**Atual:** "Le Monde - Apartamento em condomínio clube de 2 quartos à venda no bairro Portão em Curitiba!" (93 chars)
**Sugerido:** "Apto 2 quartos 51m² lazer completo Portão | Le Monde" (52 chars) ✅
**Justificativa:** Descrição cita "mais de 30 áreas de lazer" (Piscina, Academia, Cinema, Beach tênis) — condensado como "lazer completo".

#### `AP00822`
**Atual:** "Le Monde - Apartamento em condomínio clube com 2 quartos à venda no bairro Portão em Curitiba!" (94 chars)
**Sugerido:** "Apartamento 2 quartos suíte 56m² lazer completo Portão" (54 chars) ✅
**Justificativa:** Suíte (Tier S) extraída do dado. "30 áreas de lazer" da descrição vira "lazer completo".

#### `AP00824`
**Atual:** "Le Monde - Apartamento em condomínio clube de 3 quartos à venda no bairro Portão em Curitiba!" (93 chars)
**Sugerido:** "Apto 3 quartos suíte 64m² 2 vagas Portão | Le Monde" (51 chars) ✅
**Justificativa:** "2 vagas" é diferencial raro em apto de 64m². Suíte incorporada.

#### `AP00825`
**Atual:** "Le Monde - Apartamento em condomínio clube de 3 quartos à venda no bairro Portão em Curitiba!" (93 chars)
**Sugerido:** "Apto 3 quartos suíte 70m² 2 vagas Portão | Le Monde" (51 chars) ✅
**Justificativa:** Metragem maior (70m²) diferencia da AP00824.

#### `AP00863`
**Atual:** "Apartamento com 2 quartos à venda no bairro Portão em Curitiba." (63 chars)
**Sugerido:** "Apto 2 quartos 40m² a 1 quadra do Palladium Portão" (50 chars) ✅
**Justificativa:** Descrição revela "Shoppings Palladium e Ventura" nas proximidades.

#### `AP00902`
**Atual:** "Apartamento com 2 quartos à venda no bairro Portão em Curitiba!" (63 chars)
**Sugerido:** "Apartamento 2 quartos suíte 54m² a 1 quadra Palladium" (53 chars) ✅
**Justificativa:** Descrição informa "1 quadra do Shopping Palladium e Supermercado Muffato".

#### `AP00903`
**Atual:** "Apartamento Studio à venda no bairro Portão em Curitiba!" (56 chars)
**Sugerido:** "Kitnet 26m² a 1 quadra do Palladium Portão" (42 chars) ✅
**Justificativa:** CRM=Kitnet (não Studio). Marco explícito + metragem.

#### `ST00010`
**Atual:** "One Life - Studios à venda no bairro Água Verde divisa com Portão, em Curitiba!" (79 chars)
**Sugerido:** "Apto 1 quarto 17m² a 200m do Hospital IPO | One Life" (52 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio). Descrição cita "cerca de 200 metros do Hospital IPO" — marco com distância precisa. Empreendimento One Life ao fim.

#### `TE00175`
**Atual:** "Terreno a Venda no bairro Portão ZR3.ZONA RESIDENCIAL 3 1.Y. próximo Super mercado Ítalo" (88 chars)
**Sugerido:** "Terreno 470m² ZR3 próximo Supermercado Ítalo Portão" (51 chars) ✅
**Justificativa:** Marco "Supermercado Ítalo" preservado da descrição.

#### `TE00181`
**Atual:** "Terreno ZR3.1 - à venda no bairro Portão, em uma das principais e comerciais ruas do Bairro!" (92 chars)
**Sugerido:** "Terreno comercial 360m² na Rua Carlos Dietzsch Portão" (53 chars) ✅
**Justificativa:** Rua específica "Carlos Dietzsch" citada na descrição vira gancho de localização exata.

#### `TE00182`
**Atual:** "Terreno ZR3.1 - à venda no bairro Portão, em uma das principais e comerciais ruas do Bairro!" (92 chars)
**Sugerido:** "Terreno comercial 360m² Rua Carlos Dietzsch Portão" (50 chars) ✅
**Justificativa:** Lote gêmeo do TE00181.

#### `TE00183`
**Atual:** "Terreno ZR3.1 - À venda no bairro Portão, em uma rua tranquila próxima as principais vias comerciais do Bairro!" (111 chars)
**Sugerido:** "Terreno 450m² ZR3.1 rua tranquila Portão Curitiba" (49 chars) ✅
**Justificativa:** "Rua tranquila" da prosa preservado como diferencial.

#### `69803237`
**Atual:** "Terracota I - Sobrados em condomínio fechado no bairro Portão" (61 chars)
**Sugerido:** "Sobrado 3 quartos suíte em condomínio fechado Portão" (52 chars) ✅
**Justificativa:** Descrição confirma "3 dormitórios, sendo 1 suíte" + "condomínio fechado".

#### `AP01018`
**Atual:** "Apto 01 quarto no bairro do Portão" (34 chars)
**Sugerido:** "Apto 1 qto 28m² mobiliado pra alugar Portão | Cesaréa" (53 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio). Feature "Semi Mobiliado" vira "mobiliado". "Pra alugar" reforça intent.

#### `AP01079`
**Atual:** "Cravo Casa Nativa - Apartamentos com 2 e 3 quartos com suíte em fase de lançamento no Bairro Portão." (100 chars)
**Sugerido:** "Apto 2 qts suíte 66m² próximo Shopping Palladium Portão" (55 chars) ✅
**Justificativa:** Descrição cita "Shopping Palladium, Super Muffato, Hospital IPO" — marco principal virou gancho.

#### `CA02706`
**Atual:** "Sobrado Triplex com 3 quartos à venda no Bairro Portão" (54 chars)
**Sugerido:** "Sobrado triplex 3 quartos 151m² com quintal Portão" (50 chars) ✅
**Justificativa:** Descrição menciona "quintal espaçoso de 38,94 m² nos fundos".

#### `69804349`
**Atual:** "Cravo Casa Nativa - Apartamento 3 quartos com suíte em fase de lançamento no Bairro Portão." (91 chars)
**Sugerido:** "Apartamento 3 qts suíte 90m² próx Hospital IPO Portão" (53 chars) ✅
**Justificativa:** Descrição cita "Hospital IPO" nas proximidades.

#### `69804395`
**Atual:** "Ama 1108 - Studios modernos à venda no bairro Portão!" (53 chars)
**Sugerido:** "Studio 24m² novo em lançamento no Portão | AMA" (46 chars) ✅
**Justificativa:** Entrega 04/2027 — novo + lançamento.

#### `69804852`
**Atual:** "Residencial moderno com 182 m², 3 dormitórios e garden com churrasqueira no Portão" (82 chars)
**Sugerido:** "Sobrado 3 quartos 182m² garden e churrasqueira Portão" (53 chars) ✅
**Justificativa:** "Garden com churrasqueira" da descrição preservado.

#### `69805374`
**Atual:** "Sobrado de 182 m² no Portão com garden e 3 dormitórios" (54 chars)
**Sugerido:** "Sobrado 3 quartos 182m² garden e suíte master Portão" (52 chars) ✅
**Justificativa:** Feature "Suite Master" (Tier S explícito) adicionada.

#### `69805459`
**Atual:** "Sobrado com terraço à venda no bairro Portão, com 03 dormitórios sendo 01 suíte, imóvel novo podendo ser financiado." (116 chars)
**Sugerido:** "Sobrado novo 3 quartos suíte vista panorâmica Portão" (52 chars) ✅
**Justificativa:** Feature "Vista Panorâmica" (Tier S explícito) extraída.

#### `69805461`
**Atual:** "Terreno no bairro Portão - Rua João Bettega" (43 chars)
**Sugerido:** "Terreno comercial 557m² Rua João Bettega Portão" (47 chars) ✅
**Justificativa:** Descrição enfatiza "grande fluxo de veículos" — "comercial" vira gancho.

#### `69805498`
**Atual:** "Sobrado com 3 Quartos à Venda no Portão - Curitiba" (50 chars)
**Sugerido:** "Sobrado novo 3 quartos suíte 120m² 1 vaga Portão" (48 chars) ✅
**Justificativa:** CRM=1 vaga (não 2). Dados técnicos: suíte + 120m² + "novo" (entrega 2026).

### Resumo Portão
| Métrica | Valor |
|---|---|
| Total | 25 | Reescritos | 25 |
| Marcos da descrição incorporados | 13 |
| Amenidades da descrição incorporadas | 6 |
| Média chars antes → depois | 78 → 48 |

---

## Mossunguê

#### `AP00762`
**Atual:** "Reserva Barigui - Cobertura Loft à venda no bairro Mossunguê, em frente ao Parque Barigui e ao lado do Park Shopping Barigui em Curitiba." (137 chars)
**Sugerido:** "Loft 1 dorm frente ao Parque Barigui Mossunguê" (47 chars) ✅
**Justificativa:** Marco "Parque Barigui" citado na DescricaoWeb.

#### `AP00772`
**Atual:** "Reserva Barigui - Duplex 2 quartos à venda no bairro Mossunguê..." (139 chars)
**Sugerido:** "Duplex 2 suítes vista panorâmica Parque Barigui" (47 chars) ✅
**Justificativa:** "Vista Panoramica" + marco + suíte master.

#### `AP00773`
**Atual:** "Reserva Colina - Apartamento com 4 quartos à venda no bairro Mossunguê..." (147 chars)
**Sugerido:** "4 quartos 185m² lazer completo Parque Barigui" (46 chars) ✅
**Justificativa:** Descrição lista piscina panorâmica, anfiteatro, academia, 3 espaços gourmet.

#### `AP00900`
**Atual:** "Reserva Barigui - Studio à venda no bairro Mossunguê..." (129 chars)
**Sugerido:** "Studio 35m² vista panorâmica frente Parque Barigui" (51 chars) ✅
**Justificativa:** "Vista Panoramica" + m² concreto + marco.

#### `AP00945`
**Atual:** "La Défense - Apartamento com 3 suítes à venda no bairro Mossunguê." (66 chars)
**Sugerido:** "Apartamento 3 suítes 120m² Mossunguê La Défense" (47 chars) ✅
**Justificativa:** Empreendimento no fim, metragem.

#### `AP00946`
**Atual:** "La Défense - Cobertura com 3 suítes à venda no bairro Mossunguê." (64 chars)
**Sugerido:** "Cobertura 3 suítes 250m² Mossunguê La Défense" (45 chars) ✅
**Justificativa:** 249.54m² → 250m² (diferencial cobertura ampla).

#### `69802215`
**Atual:** "Reserva Mirante - sala comercial disponível para venda, frente ao Parque Barigui" (80 chars)
**Sugerido:** "Sala comercial 47m² frente ao Parque Barigui" (44 chars) ✅
**Justificativa:** Marco Parque Barigui + m².

#### `69802216`
**Atual:** "Reserva Mirante - Lojas comerciais disponíveis para venda em frente ao Parque Barigui!" (86 chars)
**Sugerido:** "Loja 103m² frente Parque Barigui | Reserva Mirante" (51 chars) ✅
**Justificativa:** Marco + m².

#### `AP01004`
**Atual:** "Pace - A Vida no seu ritmo." (27 chars)
**Sugerido:** "Apartamento 3 suítes 217m² alto padrão Ecoville PACE" (52 chars) ✅
**Justificativa:** DescricaoWeb cita "160 metros de altura, 44 andares".

#### `AP01088`
**Atual:** "Horizon Ecoville - Apartamento à venda com 3 quartos na região do Ecoville, próximo ao Parque Barigui." (102 chars)
**Sugerido:** "Apartamento 3 quartos varanda gourmet Ecoville Horizon" (54 chars) ✅
**Justificativa:** DescricaoWeb destaca "Varanda gourmet com churrasqueira".

#### `AP01143`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Apartamento 2 quartos 1 suíte 56m² Ecoville Yes" (47 chars) ✅
**Justificativa:** Criado do zero. DescricaoWeb: "2 quartos sendo uma suíte, 53 a 57 m²".

#### `69803879`
**Atual:** "Reserva Barigui - Apartamento de 1 quarto..." (146 chars)
**Sugerido:** "Studio suíte 49m² vista panorâmica Parque Barigui" (50 chars) ✅
**Justificativa:** Tipo real é Studio. "Vista Panoramica" + marco.

#### `69803880`
**Atual:** "Reserva Barigui - Apartamento 2 quartos..." (144 chars)
**Sugerido:** "Apto 2 quartos suíte master Parque Barigui Reserva" (50 chars) ✅
**Justificativa:** "Suite Master" + marco.

#### `69803881`
**Atual:** "Reserva Colina - Apartamento com 4 quartos..." (147 chars)
**Sugerido:** "4 quartos 232m² alto padrão Parque Barigui Reserva" (50 chars) ✅
**Justificativa:** 231.71m² + Alto Padrão + marco.

#### `69803882`
**Atual:** "Reserva Colina - Apartamento com 4 quartos..." (147 chars)
**Sugerido:** "4 quartos 257m² vista panorâmica Parque Barigui" (47 chars) ✅
**Justificativa:** "Vista Panoramica" (exclusivo) + 257m² + marco.

#### `69804144`
**Atual:** "Bloma no Ecoville: Apartamentos 2 quartos e 2 suítes para casais sem filhos" (76 chars)
**Sugerido:** "2 suítes 110m² casais sem filhos Ecoville Bloma" (47 chars) ✅
**Justificativa:** Posicionamento único confirmado na DescricaoWeb.

#### `69804172`
**Atual:** "Bloma Apartamentos 3 quartos e 3 suítes, no ecoville." (55 chars)
**Sugerido:** "Apartamento 3 suítes 145m² Roofgarden Ecoville Bloma" (52 chars) ✅
**Justificativa:** "Roofgarden" (amenidade exclusiva da DescricaoWeb).

#### `69804720`
**Atual:** "[REVENDA] Reserva Lago - Duplex Cobertura..." (155 chars)
**Sugerido:** "Duplex 2 suítes vista panorâmica Parque Barigui" (48 chars) ✅
**Justificativa:** Remove "[REVENDA]". "Vista Panoramica" + marco.

#### `69805549`
**Atual:** "Cobertura no Bloma: 3 quartos e 3 suítes no Ecoville." (54 chars)
**Sugerido:** "Apartamento 3 suítes 184m² Roofgarden Ecoville | Bloma" (54 chars) ✅
**Justificativa:** CRM=Apartamento (não Cobertura — apesar do título original do CRM dizer "Cobertura no Bloma"). Roofgarden como assinatura do Bloma.

#### `69805550`
**Atual:** "Bloma: Apartamento térreo com Garden, 3 quartos e 3 suítes, no ecoville." (76 chars)
**Sugerido:** "Garden 3 suítes 260m² Ecoville Bloma" (36 chars) ✅
**Justificativa:** "Garden" como tipo-diferencial. 260m² (wow).

### Resumo Mossunguê
| Métrica | Valor |
|---|---|
| Total | 20 | Reescritos | 20 |
| Marcos da descrição | 15 | Amenidades | 8 |
| Média chars antes → depois | 104 → 46 |

---

## Cidade Industrial

#### `AP00915`
**Atual:** "Meo - Lançamento - Apartamento garden 2 quartos em condomínio clube no Neoville em Curitiba!" (92 chars)
**Sugerido:** "Garden 2 Quartos Suíte Lazer Completo Neoville Meo" (50 chars) ✅
**Justificativa:** Descrição destaca "piscina, academia, espaço gourmet, rooftop".

#### `AP00916`
**Atual:** "Meo - Lançamento - Apartamento com 3 quartos em condomínio clube no Neoville em Curitiba!" (89 chars)
**Sugerido:** "Apartamento 3 Quartos Suíte Lazer Completo Neoville Meo" (55 chars) ✅
**Justificativa:** Mesmo condomínio clube.

#### `69803086`
**Atual:** "Loja de frente para Rua no Vitória Régia" (40 chars)
**Sugerido:** "Loja 50m² Frente Rua a 200m do Mercado Viana CIC" (48 chars) ✅
**Justificativa:** Descrição cita "próxima ao Mercado Viana".

#### `69803256`
**Atual:** "Apto 2 Quartos, Residencial Vittace Bosque - Curitiba, PR" (57 chars)
**Sugerido:** "Apto 2 Quartos FGTS Lazer Completo CIC Vittace Bosque" (53 chars) ✅
**Justificativa:** 17 itens de lazer + aceita financiamento.

#### `69803496`
**Atual:** "Sobrado 3 Quartos no Vitória Régia em Curitiba." (47 chars)
**Sugerido:** "Sobrado 3 Quartos 88m² Churrasqueira Vitória Régia CIC" (54 chars) ✅
**Justificativa:** Churrasqueira + área.

#### `69803584`
**Atual:** "Terreno à Venda na Av. Juscelino Kubitschek de Oliveira - Oportunidade para Empresas, Comércio ou Moradia! Aceita troca em outro imóvel." (136 chars)
**Sugerido:** "Terreno 200m² Aceita Permuta Av. JK Oliveira CIC" (48 chars) ✅
**Justificativa:** "Aceita troca" = "Aceita Permuta" (Tier S).

#### `69804107`
**Atual:** "Apartamento com 2 quartos à venda no bairro Neoville." (53 chars)
**Sugerido:** "Apartamento 2 Qts Sacada Churrasqueira Neoville Vega" (52 chars) ✅
**Justificativa:** "Sacada Com Churrasqueira" + "Vista Panoramica".

#### `69804700`
**Atual:** "Exelente Sobrado à venda no Vitória Régia - Curitiba" (52 chars)
**Sugerido:** "Sobrado Novo 82m² FGTS Quintal Vitória Régia CIC" (48 chars) ✅
**Justificativa:** Construção 2025 + financiamento + quintal.

#### `69804970`
**Atual:** "Sobrado à venda no Vitória Régia CIC..." (126 chars)
**Sugerido:** "Sobrado Novo 3 Quartos a 240m Supermercado Europa CIC" (53 chars) ✅
**Justificativa:** Descrição cita "240m do Supermercado Europa".

#### `69805136`
**Atual:** "Sala Comercial para Aluguel - CIC, Curitiba 120 m² | Localização Estratégica" (76 chars)
**Sugerido:** "Loja 120m² Frente Ampla CIC Curitiba" (36 chars) ✅
**Justificativa:** CRM=Loja (não Sala Comercial). Descrição destaca "frente ampla para exposição".

#### `69805396`
**Atual:** "Sobrado novo, com Terraço e 3 quartos no Vitória Régia | 80 m²" (62 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Terraço FGTS Vitória Régia CIC" (53 chars) ✅
**Justificativa:** Terraço + aceita financiamento = FGTS.

#### `69805418`
**Atual:** "Sobrados novos em fase de obra a venda com 2 e 3 quartos na cidade industrial" (77 chars)
**Sugerido:** "Casa cond. nova 2 quartos FGTS perto Bosch CIC Curitiba" (55 chars) ✅
**Justificativa:** CRM=Casa em Condomínio (não Sobrado). Descrição cita "próximo a Bosch, Mondelez" — marco de trabalho real.

#### `69805443`
**Atual:** "Sobrado à venda no Vitória Régia - Curitiba com 2 quartos." (58 chars)
**Sugerido:** "Casa 2 quartos 81m² churrasqueira FGTS Vitória Régia" (52 chars) ✅
**Justificativa:** CRM=Casa térrea (não Sobrado). Churrasqueira + área + FGTS.

#### `69805444`
**Atual:** "Sobrado à venda no Vitória Régia - Curitiba com 2 quartos." (58 chars)
**Sugerido:** "Casa 3 quartos suíte churrasqueira FGTS Vitória Régia" (53 chars) ✅
**Justificativa:** CRM=Casa térrea (não Sobrado). Payload real: 3 quartos + 1 suíte (título atual errado).

#### `69805494`
**Atual:** "Sobrado com 3 Dormitórios à Venda na Cidade Industrial - Curitiba/PR" (68 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Churrasqueira Terraço FGTS CIC" (53 chars) ✅
**Justificativa:** Churrasqueira coberta + terraço + financiamento.

#### `69805536`
**Atual:** "Sobrado à venda no Vitória Régia, com 03 quartos e espaço nos fundos com churrasqueira..." (123 chars)
**Sugerido:** "Sobrado 3 Quartos Área Gourmet a 350m Vianas FGTS CIC" (53 chars) ✅
**Justificativa:** Descrição cita "350m do Supermercado Vianas".

### Resumo Cidade Industrial
| Métrica | Valor |
|---|---|
| Total | 16 | Reescritos | 16 |
| Marcos da descrição | 5 | Amenidades | 11 |
| Média chars antes → depois | 78 → 49 |

---

## Água Verde

#### `AP00807`
**Atual:** "Lunetto - Studios com sacada e churrasqueira à venda no bairro Água Verde..." (87 chars)
**Sugerido:** "Apto 1 quarto sacada churrasq 200m do IPO Água Verde" (52 chars) ✅
**Justificativa:** Descrição destaca Hospital IPO + Shopping Água Verde.

#### `AP00828`
**Atual:** "Le Sense - Apartamento com 3 quartos no bairro Água Verde." (58 chars)
**Sugerido:** "Apartamento 3Q 1 Suíte 115m² Varanda Gourmet Água Verde" (55 chars) ✅
**Justificativa:** Descrição menciona varanda gourmet + suíte + 115m².

#### `69803421`
**Atual:** "Apartamento de 129 m² - Água Verde, Curitiba" (44 chars)
**Sugerido:** "Apartamento 3Q Suíte Master 129m² 2 Vagas Água Verde" (52 chars) ✅
**Justificativa:** Suite Master + churrasqueira.

#### `AP01008`
**Atual:** "Lemme - Apartamento com 2 quartos à venda no bairro Água Verde em Curitiba." (75 chars)
**Sugerido:** "Apartamento 2 Suítes 134m² Alto Padrão Água Verde Lemme" (55 chars) ✅
**Justificativa:** 2 suítes + EMA Arquitetura.

#### `AP01009`
**Atual:** "Lemme - Apartamento com 3 quartos à venda no bairro Água Verde em Curitiba." (75 chars)
**Sugerido:** "Apartamento 3 Suítes 141m² Alto Padrão Água Verde Lemme" (55 chars) ✅
**Justificativa:** 3 suítes + alto padrão.

#### `AP01130`
**Atual:** "Atlân - Apartamento com 2 quartos à venda na divisa dos bairros Água Verde e Batel..." (94 chars)
**Sugerido:** "Apartamento 2 Suítes 106m² 250m Praça Japão Água Verde" (54 chars) ✅
**Justificativa:** Descrição cita "250m da Praça do Japão".

#### `AP01131`
**Atual:** "Atlân - Apartamento com 3 quartos à venda na divisa dos bairros Água Verde e Batel..." (94 chars)
**Sugerido:** "Apartamento 3Q 1 Suíte 114m² 500m Clube Curitibano AV" (53 chars) ✅
**Justificativa:** Descrição cita "500m do Clube Curitibano".

#### `69804195`
**Atual:** "Orfeu, o novo Hit da sua vida!..." (132 chars)
**Sugerido:** "Apartamento 3Q 1 Suíte 86m² 2 Vagas Água Verde Orfeu" (52 chars) ✅
**Justificativa:** Remove clickbait e preço.

#### `69804752`
**Atual:** "Apto Mobiliado com 02 Suítes no Água Verde" (42 chars)
**Sugerido:** "Apartamento Mobiliado 2 Suítes 96m² 2 Vagas Água Verde" (54 chars) ✅
**Justificativa:** "Mobiliado" (Tier S) + m² + 2 vagas.

#### `69805341`
**Atual:** "Sobrados frente rua, Residencial SUNSET 5 no Água verde Alto Padrão." (71 chars)
**Sugerido:** "Sobrado 3 Suítes 260m² Vista Panorâmica Água Verde" (50 chars) ✅
**Justificativa:** Vista Panorâmica + suíte master com closet.

#### `69805342`
**Atual:** "Sobrados 3 suítes no Água Verde RESIDÊNCIAL SUNSET 6 - Alto Padrão" (70 chars)
**Sugerido:** "Sobrado 3 Suítes 292m² Alto Padrão Água Verde" (45 chars) ✅
**Justificativa:** Normaliza caixa alta. 292m² (maior diferencial).

#### `69805371`
**Atual:** "Sobrados no Água Verde RESIDÊNCIAL SUNSET 6 - Alto Padrão" (62 chars)
**Sugerido:** "Sobrado 3 Suítes 265m² Alto Padrão Água Verde" (45 chars) ✅
**Justificativa:** Limpa tipografia.

#### `69805588`
**Atual:** "Studio no Água Verde lançamento Âmbar" (37 chars)
**Sugerido:** "Studio 19m² Lançamento Água Verde Praça do Japão" (48 chars) ✅
**Justificativa:** Descrição confirma proximidade da Praça do Japão.

#### `69805642`
**Atual:** "Sobrado com 3 Quartos em condomínio Água Verde 147,71m²" (55 chars)
**Sugerido:** "Sobrado 3Q Suíte Master 148m² Condomínio Água Verde" (52 chars) ✅
**Justificativa:** Suite Master + condomínio fechado + 148m².

### Resumo Água Verde
| Métrica | Valor |
|---|---|
| Total | 14 | Reescritos | 14 |
| Marcos da descrição | 4 | Amenidades | 7 |
| Média chars antes → depois | 73 → 47 |

---

## Sítio Cercado

#### `CA00735`
**Atual:** "Lindo sobrado à venda, com 2 quartos, no bairro Sitio Cercado..." (134 chars)
**Sugerido:** "Sobrado 2 Suítes Sítio Cercado a 1 quadra do Agricer" (52 chars) ✅
**Justificativa:** Descrição cita supermercado Agricer + 2 suítes.

#### `CA02121`
**Atual:** "Sobrado de esquina com ponto comercial à venda no bairro Sítio Cercado." (71 chars)
**Sugerido:** "Casa de esquina + ponto comercial Sítio Cercado" (47 chars) ✅
**Justificativa:** CRM=Casa térrea 254m² (não Sobrado). Diferencial comercial (loja 74m² + casa extra).

#### `CA02750`
**Atual:** "Sobrado com 3 quartos à venda no bairro Sítio Cercado em Curitiba" (65 chars)
**Sugerido:** "Sobrado 3 Quartos Novo Terreno 5x20 Sítio Cercado" (49 chars) ✅
**Justificativa:** "Terreno 5x20" (raro na região).

#### `69804363`
**Atual:** "Sobrado à venda no Sítio Cercado..." (104 chars)
**Sugerido:** "Sobrado 3 Qtos Esquina a 400m do Mercado Sítio Cercado" (54 chars) ✅
**Justificativa:** Descrição cita "400m do Supermercado Nogueira".

#### `69804527`
**Atual:** "Casa em condomínio à venda no Sitio Cercado..." (96 chars)
**Sugerido:** "Casa 3 Quartos Condomínio Fechado Sítio Cercado, Calena" (55 chars) ✅
**Justificativa:** Condomínio com 4 unidades + aquecimento a gás.

#### `69804972`
**Atual:** "Apto 2 quartos no Sítio Cercado, financie pela Caixa" (52 chars)
**Sugerido:** "Apto 2 Quartos Semi Mobiliado MCMV Sítio Cercado Veneza" (55 chars) ✅
**Justificativa:** Semi Mobiliado + Cozinha Planejada + MCMV.

#### `69805081`
**Atual:** "Sobrado com 3 quartos à venda no Sítio Cercado" (46 chars)
**Sugerido:** "Sobrado Alto Padrão 3 Quartos Terraço Sítio Cercado" (51 chars) ✅
**Justificativa:** Descrição abre com "alto padrão" + terraço 40m².

#### `69805395`
**Atual:** "Casa 2 quartos no Sítio Cercado - Curitiba" (42 chars)
**Sugerido:** "Casa Nova 2 Quartos Aceita Financiamento Sítio Cercado" (54 chars) ✅
**Justificativa:** Imóvel novo + financiamento.

#### `69805410`
**Atual:** "Apto 02 quartos no Sítio Cercado" (32 chars)
**Sugerido:** "Apto 2 Quartos Mobiliado em Frente ao Supermercado Góes" (55 chars) ✅
**Justificativa:** Mobiliado + "em frente ao Supermercado Góes".

#### `69805506`
**Atual:** "Sobrado à venda no Sítio Cercado..." (104 chars)
**Sugerido:** "Sobrado Novo 3 Qtos 1 Suíte Sítio Cercado Financiável" (53 chars) ✅
**Justificativa:** Suíte + novo + financiável.

#### `69805687`
**Atual:** "Sobrado à venda no Sítio Cercado, com 03 quartos e edícula..." (107 chars)
**Sugerido:** "Sobrado 3 Quartos Edícula Churrasqueira Sítio Cercado" (53 chars) ✅
**Justificativa:** Edícula + Churrasqueira + "500m do Stall".

#### `69805688`
**Atual:** "Casa em condomínio à venda no Sitio Cercado..." (96 chars)
**Sugerido:** "Casa cond. 3 qts suíte sacada Sítio Cercado | Calena VII" (56 chars) ✅
**Justificativa:** CRM=Casa em Condomínio (não Sobrado). Suíte com sacada (Calena VII).

#### `69805703` *(novo — cadastrado 2026-04-24, locação)*
**Atual:** "Sobrado triplex próximo ao Terminal Sítio Cercado" (50 chars)
**Sugerido:** "Sobrado triplex 3 quartos 136m² Terminal Sítio Cercado" (54 chars) ✅
**Justificativa:** Dados (3 qts/1 suíte/2 vagas/136m²/R$ 2.800 aluguel) + marco preservado. Atual já é razoável — sugestão adiciona m².

#### `69805704` *(novo — cadastrado 2026-04-24, locação loja)*
**Atual:** "Loja bem localizada no Sítio Cercado" (37 chars — Tier C: "bem localizada")
**Sugerido:** "Loja 54m² frente rua Terminal Sítio Cercado" (43 chars) ✅
**Justificativa:** Diferencial real ("frente para a rua" da DescricaoWeb) + m² + marco. Remove vago "bem localizada".

### Resumo Sítio Cercado
| Métrica | Valor |
|---|---|
| Total | 14 | Reescritos | 14 |
| Marcos da descrição | 4 | Amenidades | 6 |
| Média chars antes → depois | 78 → 50 |

---

## Campo de Santana

#### `69802113`
**Atual:** "Kitnet com água e luz incluído no condomínio" (44 chars)
**Sugerido:** "Kitnet Sem Fiador a 1 quadra do Mercado Araucária" (50 chars) ✅
**Justificativa:** "NÃO PRECISA DE FIADOR" + "a uma quadra do Mercado Araucária".

#### `69802966`
**Atual:** "Baixou o Preço: Terreno de esquina no Rio Bonito..." (104 chars)
**Sugerido:** "Terreno 279m² Esquina p/ Comércio no Campo de Santana" (54 chars) ✅
**Justificativa:** Remove "Baixou o Preço" (Tier C). Uso comercial ("ideal revenda/estacionamento").

#### `69804094`
**Atual:** "Apto de 01 Quarto no Campo de Santana, região do Rio Bonito" (59 chars)
**Sugerido:** "Apto 1 Quarto 33m² em frente Supermercado Roça Grande" (54 chars) ✅
**Justificativa:** Descrição: "em frente ao Supermercado Roça Grande".

#### `69804218`
**Atual:** "Sobrado à venda no Campo de Santana, com 03 quartos, vaga de garagem, localizado a apenas 650m do Supermercado Araucária..." (158 chars)
**Sugerido:** "Sobrado Novo 3 Quartos 650m do Mercado Campo de Santana" (55 chars) ✅
**Justificativa:** Marco "650m do Supermercado".

#### `69804926`
**Atual:** "Sobrado 3 Quartos com Sacada no Campo de Santana - Ótima Localização!" (69 chars)
**Sugerido:** "Sobrado 3 Quartos c/ Churrasqueira Aceita Financiamento" (55 chars) ✅
**Justificativa:** Remove Tier C. "Aceita financiamento" + churrasqueira.

#### `69805108`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Sobrado 3 Quartos Edícula 180m do CMEI Campo de Santana" (55 chars) ✅
**Justificativa:** Descrição cita "180m do CMEI" + "edícula com churrasqueira".

#### `69805137`
**Atual:** "Apartamento 42 m² no Campo de Santana - Condomínio é cidade de Pavia" (68 chars)
**Sugerido:** "Apto 2 Quartos 42m² Sacada Aceita Financiamento Pavia" (53 chars) ✅
**Justificativa:** Corrige nome do condomínio. Sacada + financiamento.

#### `69805169`
**Atual:** "Sobrado à venda no Campo de Santana..." (131 chars)
**Sugerido:** "Sobrado 3 Quartos Suíte 350m Mercado Araucária 2 Vagas" (54 chars) ✅
**Justificativa:** "350m do Supermercado Araucária" + 2 vagas.

#### `69805416`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Edícula 300m Rua Marcos Bertoldi" (55 chars) ✅
**Justificativa:** Descrição: "300m da Rua Marcos Bertoldi".

#### `69805611`
**Atual:** "Sobrado à venda no Campo de Santana..." (120 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Edícula 170m Sup. Roça Grande" (52 chars) ✅
**Justificativa:** "170m do Supermercado Roça Grande".

#### `69805612`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Sobrado Novo 2 Quartos 62m² Campo de Santana Financia" (53 chars) ✅
**Justificativa:** Novo 2026 + financia.

### Resumo Campo de Santana
| Métrica | Valor |
|---|---|
| Total | 11 | Reescritos | 11 |
| Marcos da descrição | 6 | Amenidades | 5 |
| Média chars antes → depois | 72 → 52 |

---

## Bigorrilho

#### `AP00539`
**Atual:** "Casa Milano - Empreendimento de Alto Padrão com 2 suítes..." (111 chars)
**Sugerido:** "Alto padrão 2 suítes 126m² Bigorrilho Casa Milano" (49 chars) ✅
**Justificativa:** Descrição reforça "alto padrão" + Parque Barigui.

#### `AP00650`
**Atual:** "Apartamento à Venda no Edifício Varanda Barigui com 03 Suítes, no Champagnat." (77 chars)
**Sugerido:** "3 suítes 165m² Bigorrilho piscina Varanda Barigui" (49 chars) ✅
**Justificativa:** Piscina aquecida + churrasqueira na sacada.

#### `AP00941`
**Atual:** "OAS Barigui - O prédio mais alto de Curitiba" (44 chars)
**Sugerido:** "Vista panorâmica 3 suítes 230m² Bigorrilho OAS" (46 chars) ✅
**Justificativa:** "Rooftop panorâmico, 50 andares, sky deck".

#### `AP00947`
**Atual:** "KAÁ Residências Jardim..." (92 chars)
**Sugerido:** "2 suítes 181m² a 800m do Parque Barigui KAÁ" (44 chars) ✅
**Justificativa:** "Menos de 800 metros do Parque Barigui".

#### `AP00955`
**Atual:** "KAÁ Residências Jardim..." (92 chars)
**Sugerido:** "3 suítes 314m² lazer completo Bigorrilho KAÁ" (45 chars) ✅
**Justificativa:** Piscina coberta + quadra + salão gourmet + pet.

#### `AP01067`
**Atual:** "AMÁZ- Apartamento com 3 quartos à venda na divisa dos bairros Bigorrilho e Mercês." (82 chars)
**Sugerido:** "3 suítes 191m² divisa Mercês Bigorrilho AMÁZ" (44 chars) ✅
**Justificativa:** "Divisa Bigorrilho e Mercês".

#### `AP01132`
**Atual:** "MYTÁ - Apartamento com 2 quartos no bairro Bigorrilho em Curitiba" (65 chars)
**Sugerido:** "3 suítes 147m² face norte Bigorrilho MYTÁ" (41 chars) ✅
**Justificativa:** Corrige quartos (3, não 2). "Face norte" da descrição.

#### `69804163`
**Atual:** "2 quartos e 1 suíte.no Euclides Residencial no Bigorrilho" (57 chars)
**Sugerido:** "2 quartos suíte 82m² Bigorrilho aceita pet Euclides" (51 chars) ✅
**Justificativa:** Descrição cita espaço gourmet + aceita pet.

#### `69804176`
**Atual:** "Apartamentos 3 quartos, com suíte no Euclides Residencial, no Bigorrilho" (72 chars)
**Sugerido:** "3 quartos suíte 100m² 2 vagas Bigorrilho Euclides" (49 chars) ✅
**Justificativa:** Churrasqueira na cozinha + 2 vagas.

### Resumo Bigorrilho
| Métrica | Valor |
|---|---|
| Total | 9 | Reescritos | 9 |
| Marcos da descrição | 3 | Amenidades | 4 |
| Média chars antes → depois | 78 → 46 |

---

## Xaxim

#### `TE00180`
**Atual:** "Terreno - ZR2 à venda no bairro Xaxim, próximo ao supermercado BIG" (66 chars)
**Sugerido:** "Terreno 1.137m² ZR2 Xaxim a 500m do Supermercado BIG" (53 chars) ✅
**Justificativa:** Marco BIG + metragem.

#### `69803109`
**Atual:** "Sobrado 3 Quartos no Bairro Xaxim - Oportunidade" (48 chars)
**Sugerido:** "Sobrado Novo 3 Quartos 1 Suíte Xaxim Park Shopping" (50 chars) ✅
**Justificativa:** "Novo" + Park Shopping Boulevard.

#### `69804208`
**Atual:** "Loja 55,85m² no Shopping & Sports - Xaxim" (41 chars)
**Sugerido:** "Loja 55m² Aluguel Xaxim Cinema Havan Shopping&Sports" (53 chars) ✅
**Justificativa:** Havan + cinema citadas (atrativos reais).

#### `69804223`
**Atual:** "Loja 20,19m² no Shopping & Sports - Xaxim" (41 chars)
**Sugerido:** "Loja 20m² Aluguel Xaxim Havan Shopping & Sports" (47 chars) ✅
**Justificativa:** Âncora Havan + shopping.

#### `69805180`
**Atual:** "Sobrado com 3 quartos à venda no bairro Xaxim em Curitiba" (57 chars)
**Sugerido:** "Sobrado triplex 193m² 3 quartos suíte Xaxim Condor" (50 chars) ✅
**Justificativa:** "Triplex" + Condor (marco). ⚠️ **Inconsistência CRM:** Categoria atual no CRM é "Apartamento" mas título original diz "Sobrado". Bruno precisa confirmar tipologia correta.

#### `69805181`
**Atual:** "Sobrado com 3 quartos à venda no bairro Xaxim em Curitiba" (57 chars)
**Sugerido:** "Sobrado novo 132m² 3 qts suíte Xaxim Shopping & Sports" (54 chars) ✅
**Justificativa:** "Novo" (2025) + Shopping & Sports. ⚠️ **Inconsistência CRM:** Categoria atual no CRM é "Apartamento" mas título original diz "Sobrado". Bruno precisa confirmar tipologia correta.

#### `69805414`
**Atual:** "Restaurante em Frente às Quadras - Shopping & Sports Xaxim" (58 chars)
**Sugerido:** "Restaurante 594m² Aluguel Xaxim Shopping & Sports" (49 chars) ✅
**Justificativa:** Metragem (diferencial gigante).

#### `69805539`
**Atual:** "Sobrado com 3 Quartos no Xaxim 145m²" (36 chars)
**Sugerido:** "Sobrado 3 Quartos 1 Suíte Cond Fechado Xaxim Santorini" (54 chars) ✅
**Justificativa:** Condomínio fechado (4 sobrados, portão eletrônico).

#### `69805540`
**Atual:** "Sobrado com 3 Quartos e 1 suite no Xaxim" (40 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Suíte Cond Fechado Xaxim Mykonos" (55 chars) ✅
**Justificativa:** "Novo" (entrega 2026) + cond fechado.

### Resumo Xaxim
| Métrica | Valor |
|---|---|
| Total | 9 | Reescritos | 9 |
| Marcos da descrição | 7 | Amenidades | 6 |
| Média chars antes → depois | 47 → 50 |

---

## Batel

#### `AP00754`
**Atual:** "Temple Batel - Studio à venda no bairro Batel em Curitiba." (58 chars)
**Sugerido:** "Apartamento 1 qto 35m² na planta Batel | Temple Batel" (53 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio — apesar do empreendimento se chamar Temple). Metragem + lançamento.

#### `69802979`
**Atual:** "Casa Batel. Apartamento 3 Suítes no Batel!" (42 chars)
**Sugerido:** "4 Suites 219m² a 300m do Pátio Batel, Casa Batel" (48 chars) ✅
**Justificativa:** "Próximo ao Shopping Pátio Batel" + 4 suítes (não 3).

#### `69803405`
**Atual:** "Apartamento mobiliado com 03 suítes, face norte, localizado no 11º andar do BW Residence..." (106 chars)
**Sugerido:** "Mobiliado 3 Suites face norte Batel, BW Residence" (50 chars) ✅
**Justificativa:** Mantém os 3 diferenciais (Mobiliado, Suite, face norte).

#### `AP01034`
**Atual:** "Trevi Batel - Um projeto de vanguarda inspirado na arquitetura italiana." (72 chars)
**Sugerido:** "3 Suites 200m² a 1 quadra do Pátio Batel, Trevi" (47 chars) ✅
**Justificativa:** "A apenas uma quadra do renomado Pátio Batel".

#### `69803768`
**Atual:** "Mova.WF apartamento com 3 suítes no Batel." (42 chars)
**Sugerido:** "3 Suites 136m² a 3min do Pátio Batel, Mova.WF" (45 chars) ✅
**Justificativa:** "3 minutos do Pátio Batel".

#### `69803825`
**Atual:** "Carmelo 180, na região queridinha de Curitiba, com 3 suítes" (59 chars)
**Sugerido:** "3 Suites 225m² alto padrão Batel, Carmelo 180" (45 chars) ✅
**Justificativa:** Padrão Alto + proximidade Pátio Batel.

#### `69804925`
**Atual:** "Apartamento 2 Suítes Mobiliado no Batel" (39 chars)
**Sugerido:** "Mobiliado Reformado 2 Suites 106m² Batel Pça Japão" (50 chars) ✅
**Justificativa:** Reformado 2022 + Praça do Japão + mobiliado.

#### `69805195`
**Atual:** "Lange" (5 chars)
**Sugerido:** "Apartamento 1 quarto suíte 26m² na planta Batel | Lange" (55 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm + suíte (não Studio). Criado do zero (TituloSite original era só "Lange").

### Resumo Batel
| Métrica | Valor |
|---|---|
| Total | 8 | Reescritos | 8 |
| Marcos da descrição | 5 | Amenidades | 4 |
| Média chars antes → depois | 52 → 46 |

---

## Tatuquara

#### `AP00831`
**Atual:** "Apto 2 quartos sacada e churrasqueira no Tatuquara" (50 chars)
**Sugerido:** "Apto 2 Quartos Tatuquara 47m² Churrasqueira e Lazer" (52 chars) ✅
**Justificativa:** Residencial Kuara (quadra, academia).

#### `69803145`
**Atual:** "Ponto comercial para locação" (28 chars)
**Sugerido:** "Ponto Comercial 320m² Tatuquara 2 Andares Academia" (51 chars) ✅
**Justificativa:** Layout versátil (hoje academia).

#### `69804147`
**Atual:** "Apto 2 Quartos - Tatuquara" (26 chars)
**Sugerido:** "Apto 2 Quartos Tatuquara 42m² Portaria 24h e Quadra" (52 chars) ✅
**Justificativa:** Portaria 24h + quadra (Moradas do Bosque).

#### `69804771`
**Atual:** "Sobrado à venda no Tatuquara..." (152 chars)
**Sugerido:** "Sobrado novo 2 qts (1 divisível) a 600m Terminal Tatuquara" (59 chars) ✅
**Justificativa:** CRM=Sobrado 2 dorms. Diferencial: 1 dos quartos é grande e preparado pra divisão em 2. "600m do Terminal Tatuquara" da descrição.

#### `69805194`
**Atual:** "Oportunidade completa para morar, investir ou gerar renda no Tatuquara..." (84 chars)
**Sugerido:** "Sobrado 6 Quartos Tatuquara 2 Casas + Ponto Comercial" (54 chars) ✅
**Justificativa:** 2 casas independentes + ponto comercial.

#### `69805434`
**Atual:** "Studio para Locação Mobiliado, com água,luz e internet incluso no| Tatuquara - Curitiba" (87 chars)
**Sugerido:** "Apto 1 quarto 35m² mobiliado contas inclusas Tatuquara" (54 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio). Mobiliado + contas inclusas (água/luz/internet).

#### `69805527`
**Atual:** "Sobrado à venda no Tatuquara..." (85 chars)
**Sugerido:** "Sobrado Novo 2 Quartos Tatuquara 550m Terminal Quintal" (54 chars) ✅
**Justificativa:** "550m do Terminal" + quintal.

#### `69805530`
**Atual:** "Galpão para Locação no Tatuquara - Curitiba" (43 chars)
**Sugerido:** "Casa comercial 135m² R. Pedro Prosdócimo Tatuquara" (50 chars) ✅
**Justificativa:** CRM=Casa (não Galpão — apesar do título original chamar de "Galpão", Bruno cadastrou como Casa, provavelmente uso comercial em estrutura de casa). Rua Pedro Prosdócimo.

#### `69805713` *(novo — cadastrado 2026-04-25, Residencial Vila Mariana)*
**Atual:** "Apartamento 02 quartos reformado no Tatuquara" (45 chars — já decente)
**Sugerido:** "Apartamento 2 quartos 43m² reformado MCMV Tatuquara" (51 chars) ✅
**Justificativa:** "MCMV" (Minha Casa Minha Vida) é gancho real de busca + reformado preservado + m². Alternativa com marco: "Apto 2 qts reformado próx Parque Aquabosk Tatuquara" (52 chars).

#### `CA00096` *(novo — reativado 2026-04-24)*
**Atual:** "Casa no Tatuquara pelo Minha Casa Minha Vida" (44 chars)
**Sugerido:** "Casa 2 quartos 40m² MCMV Terminal Tatuquara" (43 chars) ✅
**Justificativa:** Adiciona dados (2 qts/40m²) + marco "Terminal Tatuquara" da DescricaoWeb. "MCMV" sigla mais econômica.

### Resumo Tatuquara
| Métrica | Valor |
|---|---|
| Total | 10 | Reescritos | 10 |
| Marcos da descrição | 5 | Amenidades | 7 |
| Média chars antes → depois | 65 → 50 |

---

## Campina do Siqueira

#### `69804789`
**Atual:** "Mai Home - apartamento mobiliado à venda, com 3 suítes." (55 chars)
**Sugerido:** "Mobiliado 3 Suítes Vista Parque Barigui 198m² Mai Home" (54 chars) ✅
**Justificativa:** Vista panorâmica do Parque Barigui + automação + mobiliado.

#### `69804923`
**Atual:** "Augen - apartamento com 2 quartos à venda no Ecoville." (54 chars)
**Sugerido:** "Apto 2 Qts Suíte Ao Lado Parque Barigui Ecoville Augen" (54 chars) ✅
**Justificativa:** "Ao lado do Parque Barigui" + Park Shopping Barigui.

#### `69804924`
**Atual:** "Augen - Apartamento com 3 quartos à venda no Ecoville!" (54 chars)
**Sugerido:** "Apto 3 Qts Suíte Ao Lado Park Shopping Ecoville Augen" (53 chars) ✅
**Justificativa:** Park Shopping Barigui — marco comercial forte.

#### `69805182`
**Atual:** "Casa Jobim - Apartamento com 2 quartos à venda no bairro Campina do Siqueira" (76 chars)
**Sugerido:** "Apto 2 Suítes Piscina Spa Campina Siqueira Casa Jobim" (53 chars) ✅
**Justificativa:** Piscina aquecida + spa + fitness.

#### `69805183`
**Atual:** "Casa Jobim - Apartamento com 3 quartos à venda no bairro Campina do Siqueira" (76 chars)
**Sugerido:** "Apto 3 Suítes Varanda Gourmet Campina Siqueira Jobim" (52 chars) ✅
**Justificativa:** Sacada com churrasqueira = varanda gourmet.

#### `69805460`
**Atual:** "Casa Jobim - Apartamento com 2 quartos à venda no bairro Campina do Siqueira" (76 chars)
**Sugerido:** "Apto 3 Suítes 191m² Spa Piscina Campina Siqueira Jobim" (54 chars) ✅
**Justificativa:** Corrige (3 suítes, não 2 qts). Spa + piscina.

### Resumo Campina do Siqueira
| Métrica | Valor |
|---|---|
| Total | 6 | Reescritos | 6 |
| Marcos da descrição | 3 | Amenidades | 5 |
| Média chars antes → depois | 69 → 53 |

---

## Novo Mundo

#### `AP00978`
**Atual:** "High City Habitat - Apartamentos com 2 quartos à venda no bairro Novo Mundo..." (89 chars)
**Sugerido:** "Apto 2 Qts Suíte Próx Terminal Capão Raso Novo Mundo" (52 chars) ✅
**Justificativa:** Terminal Capão Raso — marco real.

#### `AP00979`
**Atual:** "High City Habitat - Apartamentos com 3 quartos à venda no bairro Novo Mundo..." (89 chars)
**Sugerido:** "Apto 3 Qts Suíte Lazer Completo Novo Mundo High City" (53 chars) ✅
**Justificativa:** Cinema + piscina + salão gourmet + fitness.

#### `AP01026`
**Atual:** "Apartamento Studio no bairro Novo Mundo, proximo Shopping Palladium" (67 chars)
**Sugerido:** "Apartamento 1 qto suíte 22m² próx Palladium Novo Mundo" (54 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm + suíte (não Studio). "700 metros do Shopping Palladium" da descrição.

#### `69804954`
**Atual:** "Apartamento com 2 quartos à venda no bairro Novo Mundo." (55 chars)
**Sugerido:** "Apto 2 Quartos Varanda Gourmet Lazer Novo Mundo Essence" (55 chars) ✅
**Justificativa:** "Terraço gourmet, Quiosque com churrasqueira".

#### `69804959`
**Atual:** "Apartamento com 2 quartos à venda no bairro Novo Mundo." (55 chars)
**Sugerido:** "Apto 2 Qts Suíte Frente Santa Cruz Novo Mundo Essence" (53 chars) ✅
**Justificativa:** "Em frente a Faculdade Santa Cruz".

#### `69805479`
**Atual:** "Sobrado Novo Mundo 3 quartos, quintal e garagem para 4 carros" (63 chars)
**Sugerido:** "Sobrado 3 Qts Quintal 4 Vagas A 450m Hosp Novo Mundo" (52 chars) ✅
**Justificativa:** "450m do hospital Novo Mundo".

### Resumo Novo Mundo
| Métrica | Valor |
|---|---|
| Total | 6 | Reescritos | 6 |
| Marcos da descrição | 4 | Amenidades | 4 |
| Média chars antes → depois | 70 → 52 |

---

## Campo Comprido

#### `69803208`
**Atual:** "Casa Nomaa - Apartamento com 3 suítes à venda." (46 chars)
**Sugerido:** "Apto 3 suítes 268m² Rua do Outono Ecoville | Casa Nomaa" (55 chars) ✅
**Justificativa:** "Famosa Rua do Outono no Ecoville".

#### `69803220`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Sala Comercial 88m² Rua do Outono Ecoville Nomaa Office" (55 chars) ✅
**Justificativa:** "Frente a Rua do Outono".

#### `69804775`
**Atual:** "Sobrado 3 Quartos à venda no Fazendinha de 133 m²..." (91 chars)
**Sugerido:** "Sobrado Novo 3 Qts Suíte Próx Parque Cambuí Fazendinha" (54 chars) ✅
**Justificativa:** "Próximo ao Parque Cambuí, Smart Fit".

#### `69805496`
**Atual:** "LIV.IN - Apartamento de 3 Quartos no Campo Comprido..." (96 chars)
**Sugerido:** "Apartamento mobiliado 2 quartos Campo Comprido | LIV.IN" (55 chars) ✅
**Justificativa:** Corrige (2 qts, não 3). Mobiliado + suíte master.

#### `69805613`
**Atual:** "Sobrado com 3 quartos e 1 suíte no bairro Campo Comprido" (56 chars)
**Sugerido:** "Sobrado 3 Qts Suíte Condomínio Fechado Campo Comprido" (53 chars) ✅
**Justificativa:** Condomínio Clube (69 sobrados).

### Resumo Campo Comprido
| Métrica | Valor |
|---|---|
| Total | 5 | Reescritos | 5 |
| Marcos da descrição | 3 | Amenidades | 5 |
| Média chars antes → depois | 58 → 53 |

---

## Capão Raso

#### `69804387`
**Atual:** "Excelente opções de sobrado com terraço à venda no Capão Raso..." (237 chars)
**Sugerido:** "Sobrado Novo 3 Quartos 2 Suítes Terraço 50m² Capão Raso" (55 chars) ✅
**Justificativa:** 141m² + 50m² de terraço + 2 suítes.

#### `69804388`
**Atual:** "Excelente opções de sobrado com terraço à venda no Capão Raso..." (237 chars)
**Sugerido:** "Sobrado Novo 3 Qts Suíte Terraço Linha Verde Capão Raso" (55 chars) ✅
**Justificativa:** Linha Verde — marco viário forte.

#### `69804447`
**Atual:** "Sobrado à venda no Capão Raso..." (111 chars)
**Sugerido:** "Sobrado Novo 3 Qts Suíte A 500m Churchill Capão Raso" (52 chars) ✅
**Justificativa:** "500m da Av. Winston Churchill".

#### `69804448`
**Atual:** "Sobrado à venda no Capão Raso..." (111 chars)
**Sugerido:** "Sobrado Novo 3 Quartos Suíte A 900m Terminal Capão Raso" (55 chars) ✅
**Justificativa:** "900m do Terminal do Capão Raso".

#### `69805399`
**Atual:** "Sobrado com terreno amplo de 630m² no Bairro Capão Raso" (55 chars)
**Sugerido:** "Sobrado 3 Qts Suíte Terreno 630m² 5 Vagas Capão Raso" (52 chars) ✅
**Justificativa:** Terreno 630m² + potencial ampliação + 5 vagas.

### Resumo Capão Raso
| Métrica | Valor |
|---|---|
| Total | 5 | Reescritos | 5 |
| Marcos da descrição | 3 | Amenidades | 5 |
| Média chars antes → depois | 150 → 52 |

---

## Centro

#### `AP01115`
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Studio 1Q no Centro, aceita financiamento · Morá" (48 chars) ✅
**Justificativa:** Aceita financiamento (Tier S).

#### `69803899`
**Atual:** "Apartamento com 1 quarto no Republik Benjamin Constant - Curitiba" (65 chars)
**Sugerido:** "Studio 1Q a 600m da UFPR no Centro · Republik" (45 chars) ✅
**Justificativa:** "600m da UFPR" — marco forte pra estudantes.

#### `69805435`
**Atual:** "Apartamento Garden com 3 Quartos em Araucária - Conforto e Espaço para Sua Família!" (83 chars)
**Sugerido:** "Apartamento Garden 3Q com suíte master no Centro" (48 chars) ✅
**Justificativa:** Corrige bairro (dados oficiais = Centro). "Suíte Master" (Tier S).

#### `69805686`
**Atual:** "Apartamento 3 quartos e 3 suítes com 2 vagas no Bigorrilho : Aurea 777" (71 chars)
**Sugerido:** "Apartamento alto padrão 3 suítes no Centro · Aurea 777" (54 chars) ✅
**Justificativa:** Corrige bairro (dados = Centro). "Alto Padrão" (oficial).

### Resumo Centro
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Bairros corrigidos | 2 |
| Média chars antes → depois | 55 → 45 |

---

## Ecoville

#### `AP00671`
**Atual:** "Signature - Arquitetura imponente, autêntica e exclusiva no prestigiado bairro do Ecoville." (91 chars)
**Sugerido:** "Apartamento 3 suítes 4 vagas no Ecoville · Signature" (52 chars) ✅
**Justificativa:** 227m² + 3 suítes + 4 vagas = ultra alto padrão.

#### `AP00922`
**Atual:** "Land Haus - Apartamento com 3 suítes à venda no Ecoville em Curitiba! Mais uma construção Plaenge" (97 chars)
**Sugerido:** "Apartamento 3 suítes 4 vagas no Ecoville · Land Haus" (52 chars) ✅
**Justificativa:** 193m² + 3 suítes + 4 vagas (Plaenge).

#### `AP00942`
**Atual:** "Trebbiano Residencial - O seu mais novo apartamento de 2 quartos, compacto de Alto Padrão no Ecoville." (102 chars)
**Sugerido:** "Apartamento 2Q alto padrão no Ecoville · Trebbiano" (50 chars) ✅
**Justificativa:** 74m² compacto de alto padrão.

#### `AP00943`
**Atual:** "Trebbiano Residencial - O seu mais novo apartamento de 3 quartos, compacto de Alto Padrão no Ecoville." (102 chars)
**Sugerido:** "Apto 3Q com vista panorâmica no Ecoville · Trebbiano" (52 chars) ✅
**Justificativa:** "Vista Panoramica" nas características (Tier S).

### Resumo Ecoville
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Média chars antes → depois | 98 → 46 |

---

## Fazendinha

#### `CA02502`
**Atual:** "Sobrado 4 quartos, alto padrão no Fazendinha, em Curitiba." (58 chars)
**Sugerido:** "Sobrado 4Q alto padrão com suíte master no Fazendinha" (53 chars) ✅
**Justificativa:** 4 quartos raro + "alto padrão" + Suíte Master.

#### `69803847`
**Atual:** "Terreno à Venda no Fazendinha com 180m² com casa 2 Quartos e Barracão." (70 chars)
**Sugerido:** "Casa 2Q com barracão comercial no Fazendinha" (44 chars) ✅
**Justificativa:** "Barracão comercial" — diferencial único.

#### `69804079`
**Atual:** "Sobrado 3 à Venda no Bairro Portão em Curitiba" (46 chars)
**Sugerido:** "Sobrado 3Q alto padrão pronto pra morar no Fazendinha" (53 chars) ✅
**Justificativa:** Ano 2025 (pronto) + Alto Padrão.

#### `69804444`
**Atual:** "Sobrado com 03 dormitórios à venda no Campo Comprido." (53 chars)
**Sugerido:** "Sobrado 3Q 2 vagas aceita pet no Fazendinha · Sofia" (51 chars) ✅
**Justificativa:** "Aceita Pet" (Tier S) + 2 vagas.

### Resumo Fazendinha
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Bairros corrigidos | 2 |
| Média chars antes → depois | 57 → 50 |

---

## Pinheirinho

#### `CA01971`
**Atual:** "Triplex Alto padrão 3 quartos em Condomínio Fechado no Pinheirinho." (67 chars)
**Sugerido:** "Sobrado 3Q com suíte master no Pinheirinho · Green Line" (55 chars) ✅
**Justificativa:** 217m², Suíte Master, condomínio.

#### `AP01000`
**Atual:** "STM Terrace - Apartamento com 2 quartos no bairro Pinheirinho." (62 chars)
**Sugerido:** "Apto 2Q com suíte 2 vagas no Pinheirinho · STM Terrace" (54 chars) ✅
**Justificativa:** 2 vagas em 53m² (diferencial).

#### `AP01001`
**Atual:** "STM Terrace - Apartamento com 1 quarto no bairro Pinheirinho." (61 chars)
**Sugerido:** "Apto 1Q com vaga coberta no Pinheirinho · STM Terrace" (53 chars) ✅
**Justificativa:** "Garagem Coberta" (infraestrutura).

#### `69805384`
**Atual:** "Terreno à Venda no Condomínio Greenline - Pinheirinho com 128,10 m²" (67 chars)
**Sugerido:** "Terreno com projeto aprovado no Pinheirinho · Greenline" (55 chars) ✅
**Justificativa:** "Projeto arquitetônico já aprovado".

### Resumo Pinheirinho
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Média chars antes → depois | 64 → 54 |

---

## Santa Quitéria

#### `69804095`
**Atual:** "Sobrado com 3 quartos à venda no bairro Santa Quitéria!" (55 chars)
**Sugerido:** "Sobrado 3 quartos novo Santa Quitéria a 500m Festval" (54 chars) ✅
**Justificativa:** "4 minutos do Festval" + entrega Ago/2025.

#### `69804096`
**Atual:** "Sobrado com 3 quartos à venda no bairro Santa Quitéria!" (55 chars)
**Sugerido:** "Sobrado novo 3 quartos Santa Quitéria perto do Batel" (54 chars) ✅
**Justificativa:** "Fácil acesso aos bairros Portão, Seminário, Batel".

#### `69804228`
**Atual:** "Oslo - Apartamento com 2 quartos à venda no bairro Santa Quitéria" (65 chars)
**Sugerido:** "Apto 2 quartos suíte Santa Quitéria lazer no rooftop" (54 chars) ✅
**Justificativa:** "550m² de lazer no rooftop".

#### `69804230`
**Atual:** "Oslo - Apartamento com 3 quartos disponível para venda no bairro Santa Quitéria." (80 chars)
**Sugerido:** "Apto 3 quartos varanda gourmet Santa Quitéria rooftop" (55 chars) ✅
**Justificativa:** Varanda ampla + rooftop 550m².

### Resumo Santa Quitéria
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Média chars antes → depois | 64 → 54 |

---

## São Braz

#### `69803684`
**Atual:** "Sobrado à venda no São Braz, com 03 dormitórios sendo 01 suíte com closet e sacada..." (140 chars)
**Sugerido:** "Sobrado novo 3 quartos suíte master São Braz financia" (55 chars) ✅
**Justificativa:** Suite Master (Tier S) + "Aceita financiamento".

#### `69803685`
**Atual:** "Sobrado triplex em condomínio à venda no São Braz..." (148 chars)
**Sugerido:** "Sobrado triplex 3 quartos São Braz a 2km do Barigui" (55 chars) ✅
**Justificativa:** "Nas proximidades do Parque Barigui".

#### `69803686`
**Atual:** "Sobrado triplex em condomínio à venda no São Braz..." (148 chars)
**Sugerido:** "Sobrado triplex 3 quartos quintal 60m² São Braz novo" (54 chars) ✅
**Justificativa:** "Terreno privativo de 60m²" (diferencial único).

#### `69804108`
**Atual:** "Sobrado em condomínio à venda no São Braz, com 03 quartos sendo 01 suíte, garden com churrasqueira..." (138 chars)
**Sugerido:** "Sobrado 3 suítes garden churrasqueira São Braz Haus" (54 chars) ✅
**Justificativa:** "A 500m do Supermercado Condor", 3 suítes.

### Resumo São Braz
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Média chars antes → depois | 144 → 54 |

---

## Umbará

#### `CA00514`
**Atual:** "Lindo sobrado à venda, conta com 4 quartos e amplo terrreno..." (146 chars)
**Sugerido:** "Sobrado 4 quartos suíte Umbará perto do Santuário DM" (55 chars) ✅
**Justificativa:** "Próximo ao Santuário da Divina Misericórdia".

#### `69804080`
**Atual:** "Sobrado em condomínio à venda na rua Nicola Pellanda no Umbará..." (218 chars)
**Sugerido:** "Sobrado 3 quartos suíte churrasqueira Umbará com lazer" (55 chars) ✅
**Justificativa:** "Salão de festas, espaço kids, espaço Pet, guarita".

#### `69805009`
**Atual:** "Terreno à Venda no Umbará - Curitiba/PR | 361,8 m² | Zoneamento ZR2" (67 chars)
**Sugerido:** "Terreno 362m² ZR2 Umbará 3 frações ideal construtor" (54 chars) ✅
**Justificativa:** "3 frações 6x20" — diferencial técnico.

#### `69805010`
**Atual:** "Terreno à Venda no Residencial Bosque Nativo - Umbará com 160 m²" (64 chars)
**Sugerido:** "Terreno 160m² condomínio fechado Umbará pronto construir" (54 chars) ✅
**Justificativa:** "Pronto pra construir" + condomínio fechado.

### Resumo Umbará
| Métrica | Valor |
|---|---|
| Total | 4 | Reescritos | 4 |
| Média chars antes → depois | 124 → 54 |

---

## Boa Vista

#### `69803115`
**Atual:** "Descubra o Hike: Amplitude e Elegância em uma Unidade de 3 Quartos!" (67 chars)
**Sugerido:** "Apto 3 quartos suíte varanda gourmet Boa Vista Hike" (53 chars) ✅
**Justificativa:** "Varanda Gourmet Ampla" + suíte com closet.

#### `69803602`
**Atual:** "Descubra o Hike: Conforto e Modernidade em uma Unidade de 2 Quartos!" (68 chars)
**Sugerido:** "Apto 2 quartos suíte varanda gourmet Boa Vista com spa" (55 chars) ✅
**Justificativa:** Spa (raro em 2q) + varanda gourmet.

#### `69803603`
**Atual:** "Descubra o Hike: Conforto e Modernidade em uma Unidade de 3 Quartos!" (68 chars)
**Sugerido:** "Apto 3 quartos 82m² suíte Boa Vista lazer completo" (55 chars) ✅
**Justificativa:** Diferencia planta menor (82m² vs 89m²).

### Resumo Boa Vista
| Métrica | Valor |
|---|---|
| Total | 3 | Reescritos | 3 |
| Média chars antes → depois | 68 → 54 |

---

## Hauer

#### `AP01065`
**Atual:** "MEO Hauer - Apartamento com 2 quartos a venda no bairro Hauer." (62 chars)
**Sugerido:** "Apto 2 quartos suíte Hauer a 500m do Festval financia" (54 chars) ✅
**Justificativa:** Festval — marco forte.

#### `AP01066`
**Atual:** "MEO Hauer - Apartamento com 3 quartos a venda no bairro Hauer." (62 chars)
**Sugerido:** "Apto 3 quartos suíte Hauer lazer completo financia" (50 chars) ✅
**Justificativa:** "Market Place, Bicicletário, Family Garden, Pet Place, Bosque, Quiosque".

#### `69805013`
**Atual:** "Sobrado Triplex com 4 Quartos (2 Suítes com Closet) no Hauer" (60 chars)
**Sugerido:** "Sobrado triplex 4 quartos 2 suítes semimobiliado Hauer" (54 chars) ✅
**Nota:** CRM categoriza como "Casa em Condomínio" mas título original do CRM e estrutura (triplex, 127m² priv) confirmam sobrado. Bruno vende como sobrado.
**Justificativa:** "Reformado" + "Semi Mobiliado" (2 Tier S).

### Resumo Hauer
| Métrica | Valor |
|---|---|
| Total | 3 | Reescritos | 3 |
| Média chars antes → depois | 61 → 53 |

---

## Seminário

#### `AP00904`
**Atual:** "Équi - Apartamento com 2 quartos á venda no bairro Seminário em Curitiba!" (73 chars)
**Sugerido:** "Apto 2 quartos Seminário lazer completo perto Barigui" (54 chars) ✅
**Justificativa:** "Piscina, Academia, PUB, Market, Bicicletário".

#### `AP00948`
**Atual:** "Chateau Latour - Apartamento com 2 quartos à venda no bairro Seminário em Curitiba." (83 chars)
**Sugerido:** "Apto 2 suítes Seminário pronto morar perto Pátio Batel" (55 chars) ✅
**Justificativa:** "Pronto para morar" + Pátio Batel.

#### `AP00949`
**Atual:** "Chateau Latour - Apartamento com 3 quartos à venda no bairro Seminário em Curitiba." (83 chars)
**Sugerido:** "Apto 3 quartos suíte Seminário pronto morar com spa" (54 chars) ✅
**Justificativa:** "Pronto para morar" + Spa.

### Resumo Seminário
| Métrica | Valor |
|---|---|
| Total | 3 | Reescritos | 3 |
| Média chars antes → depois | 80 → 54 |

---

## Alto Boqueirão

#### `TE00116`
**Atual:** "Ótima oportunidade para você, que está a procura de um terreno amplo de 12x56..." (168 chars)
**Sugerido:** "Terreno 672m² Alto Boqueirão aceita permuta, 12x56m" (52 chars) ✅
**Justificativa:** 672m² + dimensões + aceita permuta.

#### `69805412`
**Atual:** "Sobrado com 2 Suítes a venda no Alto Boqueirão!" (48 chars)
**Sugerido:** "Sobrado novo 2 suítes Alto Boqueirão, quintal amplo" (52 chars) ✅
**Justificativa:** Novo + quintal amplo (descrição).

#### `69802157` *(novo — reativado 2026-04-25)*
**Atual:** "Sobrado duplex em condomínio no Alto Boqueirão" (47 chars)
**Sugerido:** "Sobrado 3 quartos suíte cond. fechado Alto Boqueirão" (52 chars) ✅
**Justificativa:** Dados (3 qts/1 suíte/60m²/R$ 410k) + "condomínio fechado com apenas sete unidades" da DescricaoWeb. **Alternativa com marco:** "Sobrado 3 qts suíte 60m² próx Shopping & Sports A. Boq." (54 chars).

### Resumo Alto Boqueirão
| Total | 3 | Reescritos | 3 | Antes → Depois | 88 → 50 |

---

## Alto da Glória

#### `AP00751`
**Atual:** "Palm 235 - Apartamento com 3 suítes à venda no bairro Alto da glória em Curitiba." (81 chars)
**Sugerido:** "Apto 3 suítes varanda gourmet Alto da Glória — Palm 235" (55 chars) ✅
**Justificativa:** Varanda gourmet + 3 suítes.

#### `SA00031`
**Atual:** "BIOOS HEALTH - Consultórios e Offices, com excelente localização no bairro Alto da Glória em Curitiba!" (102 chars)
**Sugerido:** "Sala comercial vista panorâmica Alto da Glória — Bioos" (55 chars) ✅
**Justificativa:** "Vista Panorâmica" (característica oficial).

### Resumo Alto da Glória
| Total | 2 | Reescritos | 2 | Antes → Depois | 91 → 55 |

---

## Bairro Alto

#### `CA01219`
**Atual:** "Casa com 3 Quartos, Terraço e Churrasqueira no Bairro Alto" (58 chars)
**Sugerido:** "Casa reformada 3 qtos Bairro Alto, aceita financiamento" (55 chars) ✅
**Justificativa:** Reformado (Tier S) + aceita financiamento.

#### `69804217`
**Atual:** "Apartamentos Residencial Serra Dourada no Bairro Alto com suíte. Documentação grátis." (87 chars)
**Sugerido:** "Apto 2 quartos suíte Bairro Alto, vista da Serra do Mar" (55 chars) ✅
**Justificativa:** "Vista panorâmica da serra do mar" da descrição.

### Resumo Bairro Alto
| Total | 2 | Reescritos | 2 | Antes → Depois | 72 → 54 |

---

## Boqueirão

#### `69804519`
**Atual:** "Sobrado tríplex em condomínio à venda no Boqueirão..." (122 chars)
**Sugerido:** "Sobrado novo 3 quartos 1 suíte Boqueirão, financiável" (53 chars) ✅
**Justificativa:** Novo (entrega 2026) + financiável.

#### `69805641`
**Atual:** "Apartamento térreo com 3 quartos à venda no condomínio Nova Europa I - Boqueirão." (81 chars)
**Sugerido:** "Apto térreo 3 qtos reformado Boqueirão, lazer completo" (54 chars) ✅
**Justificativa:** "Recém reformado" + piscina, quadra, salão, playground.

### Resumo Boqueirão
| Total | 2 | Reescritos | 2 | Antes → Depois | 102 → 53 |

---

## Cabral

#### `AP00296`
**Atual:** "Cabrall Hills - Apartamento à venda com 3 quartos, varanda gourmet e 2 vagas..." (141 chars)
**Sugerido:** "Apartamento alto padrão 3 qtos pronto pra morar Cabral" (54 chars) ✅
**Justificativa:** "Alto padrão" + "pronto para morar" (descrição).

#### `69802196`
**Atual:** "Fly Urban Habitat - Excelentes apartamentos à venda no Bairro Cabral..." (116 chars)
**Sugerido:** "Apto 3 quartos 1 suíte lançamento Cabral — Fly Urban" (52 chars) ✅
**Justificativa:** "Lançamento" (Tier S).

### Resumo Cabral
| Total | 2 | Reescritos | 2 | Antes → Depois | 128 → 48 |

---

## Cachoeira

#### `69803241`
**Atual:** "Sobrado com piscina à venda em Araucária, imóvel novo de alto padrão..." (93 chars)
**Sugerido:** "Sobrado novo alto padrão 3 quartos piscina Cachoeira" (52 chars) ✅
**Justificativa:** Novo (2024) + alto padrão + piscina.

#### `69805503`
**Atual:** "Apartamento com 39 m², no bairro Cachoeira" (43 chars)
**Sugerido:** "Apartamento 1 qto 39m² Cachoeira, aceita financiamento" (54 chars) ✅
**Justificativa:** Aceita financiamento.

### Resumo Cachoeira
| Total | 2 | Reescritos | 2 | Bairro corrigido | 1 | Antes → Depois | 68 → 49 |

---

## Cajuru

#### `69805456`
**Atual:** "Apartamento com garden, 2 quartos no Capão da Imbuia perto Jardim Botânico" (74 chars)
**Sugerido:** "Apartamento 2 qtos suíte garden Cajuru, varanda gourmet" (55 chars) ✅
**Justificativa:** Corrige bairro (Cajuru). Varanda gourmet + garden.

#### `69805458`
**Atual:** "Aconchegante apartamento, 3 quartos, 1 suíte no Capão da Imbuia" (64 chars)
**Sugerido:** "Apto 3 quartos 1 suíte Cajuru, varanda gourmet e lazer" (54 chars) ✅
**Justificativa:** Corrige bairro. Varanda gourmet + lazer completo.

#### `69805712` *(novo — cadastrado 2026-04-24, Residencial Santos Dumont)*
**Atual:** "Sobrado em condomínio à venda no Cajuru, com 03 quartos sendo 01 suíte, imóvel novo podendo ser financiado." (108 chars)
**Sugerido:** "Sobrado 3 quartos suíte 109m² 180m do Condor Cajuru" (51 chars) ✅
**Justificativa:** Marco específico "180m do Supermercado Condor" da DescricaoWeb. Dados (109m², 3 qts/1 suíte). Empreendimento Santos Dumont ao fim opcional.

#### `CA02804` *(novo — reativado 2026-04-24, Residencial Fontana de Trevi)*
**Atual:** "Sobrado triplex à venda no bairro Cajuru, unidades com 03 quartos sendo 01 suíte, terraço, imóvel novo podendo ser financiado." (124 chars)
**Sugerido:** "Sobrado triplex 3 quartos suíte 136m² ático Cajuru" (50 chars) ✅
**Justificativa:** "Ático com peça coringa" da DescricaoWeb é diferencial específico raro. Dados (136m², triplex) + suíte (Tier S). Versão com empreendimento: "Sobrado triplex 3 qts suíte 136m² Cajuru | Fontana" (50 chars).

### Resumo Cajuru
| Total | 4 | Reescritos | 4 | Bairro corrigido | 2 | Antes → Depois | 91 → 49 |

---

## Capela Velha

#### `69805138`
**Atual:** "Excelente oportunidade em Araucária - Dois imóveis no mesmo terreno!" (68 chars)
**Sugerido:** "Casa 3 qtos + edícula 350m² Capela Velha, financiável" (55 chars) ✅
**Justificativa:** Edícula + financiável.

#### `69805665`
**Atual:** "Apartamento 2 Quartos com Planejados e Vaga Fixa em Araucária - Ótimo Custo-Benefício!" (86 chars)
**Sugerido:** "Apartamento 2 quartos planejados vaga fixa Capela Velha" (55 chars) ✅
**Justificativa:** Planejados + vaga fixa (Tier S concretos).

#### `69805714` *(novo — cadastrado 2026-04-25, Residencial Canto do Uirapuru)*
**Atual:** "Apto 2 Quartos Novo na Capela Velha | Araucária" (48 chars — JÁ SEGUE PADRÃO)
**Sugerido:** "Apto 2 quartos novo MCMV próx Parque Passaúna Araucária" (55 chars) ✅
**Justificativa:** Atual já está bom. Sugestão acrescenta "MCMV" (subsídio) e marco "Parque Passaúna" da DescricaoWeb. Aceitar como está se preferir manter conciso.

### Resumo Capela Velha
| Total | 3 | Reescritos | 3 | Bairro corrigido | 2 | Antes → Depois | 73 → 49 |

---

## Guaíra

#### `69804277`
**Atual:** "Apartamento 1 Quarto Lançamento Exclusivo no Guaíra - Studio Park II" (68 chars)
**Sugerido:** "Apartamento 1 qto 28m² rooftop Guaíra | Studio Park II" (54 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio — apesar do empreendimento se chamar "Studio Park II", a unidade é apto). "Rooftop com vista privilegiada".

#### `69805661`
**Atual:** "Apartamento com 2 quartos à venda no Condomínio Club Fit Marumbi." (65 chars)
**Sugerido:** "Apto 2 qtos suíte vista panorâmica Guaíra, lazer club" (54 chars) ✅
**Justificativa:** "Vista Panoramica" + 28 itens infra.

### Resumo Guaíra
| Total | 2 | Reescritos | 2 | Antes → Depois | 66 → 52 |

---

## Tingui

#### `AP00970`
**Atual:** "Joy City Habitat - Apartamento com 2 quartos à venda no bairro Tingui em Curitiba." (82 chars)
**Sugerido:** "Apartamento 2 qtos 1 suíte lançamento Tingui — Joy City" (55 chars) ✅
**Justificativa:** Lançamento + suíte.

#### `69805640`
**Atual:** "Apartamento com 2 quartos à venda no Residencial Village Paraná" (63 chars)
**Sugerido:** "Apartamento mobiliado reformado 2 quartos suíte Tingui" (54 chars) ✅
**Justificativa:** Mobiliado + Reformado (2 Tier S).

### Resumo Tingui
| Total | 2 | Reescritos | 2 | Antes → Depois | 73 → 47 |

---

## Cristo Rei

#### `AP00798`
**Atual:** "Apartamento de 03 quartos (01 suíte) no Cristo Rei, ao lado do Jardim Botânico" (78 chars)
**Sugerido:** "Apê 3 Quartos Suíte Cristo Rei ao lado do Botânico" (51 chars) ✅
**Justificativa:** "Ladinho do Jardim Botânico" (descrição).

#### `69805702` *(novo — cadastrado 2026-04-24, lançamento Zion JB)*
**Atual:** "Apartamento de 1 e 2 quartos no Cristo rei" (43 chars — falta caixa em "rei", sem diferencial)
**Sugerido:** "Studio 25m² lazer completo Cristo Rei | Zion JB" (47 chars) ✅
**Justificativa:** "Piscina borda infinita + academia + salão festas + coworking + espaço gourmet" da DescricaoWeb condensado em "lazer completo". Empreendimento Zion JB ao fim. **LANÇAMENTO**.

### Resumo Cristo Rei
| Total | 2 | Reescritos | 2 | Antes → Depois | 61 → 49 |

---

## Vila David Antônio

#### `69803254`
**Atual:** "Propriedade de 40.000 m² à Beira do Passaúna - Ideal para Empreendimentos" (73 chars)
**Sugerido:** "Chácara 40.000m² beira Passaúna Vila David Antônio" (50 chars) ✅
**Justificativa:** Tipo correto (Chácara).

#### `69803813`
**Atual:** "Propriedade de 20.000 m² à Beira do Passaúna - Ideal para Empreendimentos" (73 chars)
**Sugerido:** "Chácara 20.000m² acesso à represa Vila David Antônio" (53 chars) ✅
**Justificativa:** "Acesso particular a represa do Passaúna".

### Resumo Vila David Antônio
| Total | 2 | Reescritos | 2 | Antes → Depois | 73 → 52 |

---

## Bairros com 1 imóvel cada (28 bairros)

#### `AP01011` — Alto da Rua XV
**Atual:** "Manhatan Square - Studio muito bem localizado na divisa dos bairros Alto da XV e Alto da glória!" (96 chars)
**Sugerido:** "Apartamento 1 qto 25m² a 500m do Mueller Alto da Rua XV" (55 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio). Shopping Mueller da descrição.

#### `69805069` — Barreirinha
**Atual:** "Terreno com 360 m² disponível para venda no Barreirinha!" (56 chars)
**Sugerido:** "Terreno 360m² Barreirinha Acesso Rod. Minérios" (46 chars) ✅
**Justificativa:** Rod. dos Minérios da descrição.

#### `69802233` — Campina das Pedras
**Atual:** "Chácara dos Sonhos com 68.000m²: Refúgio Rural a 4km da Praça Central de Araucária" (82 chars)
**Sugerido:** "Chácara 68.000m² Campina das Pedras Rota Turística" (51 chars) ✅
**Justificativa:** Caminhos de Guajuvira (rota turística).

#### `CA02376` — Capão da Imbuia
**Atual:** "Sobrados à venda no Capão da Imbuia, com 03 quartos..." (143 chars)
**Sugerido:** "Sobrado 3 Quartos Suíte Capão da Imbuia Financia" (49 chars) ✅
**Justificativa:** Suíte + aceita financiamento.

#### `69805689` — centro
**Atual:** "Apartamento 1 quarto com garagem no centro" (42 chars)
**Sugerido:** "Apê 1 Quarto centro Garagem Lazer Completo" (42 chars) ✅
**Justificativa:** Coworking + sala fitness + espaço gourmet.

#### `CA02716` — Cidade Jardim
**Atual:** "Sobrado à venda em São José dos Pinhais..." (153 chars)
**Sugerido:** "Sobrado 3 Quartos Suíte Master Cidade Jardim SJP" (48 chars) ✅
**Justificativa:** Suíte Master + SJP.

#### `69803764` — Eucaliptos
**Atual:** "Chácara à Venda em Mandirituba - Paraná 6.000m²" (47 chars)
**Sugerido:** "Chácara 6.000m² Mobiliada Poço Artesiano Eucaliptos" (51 chars) ✅
**Justificativa:** Mobiliada + poço artesiano 115m.

#### `69805535` — Ganchinho
**Atual:** "Terreno de esquina no bairro Ganchinho" (38 chars)
**Sugerido:** "Terreno Esquina 350m² Ganchinho Locação R. Eduardo" (50 chars) ✅
**Justificativa:** Rua Eduardo Pinto da Rocha.

#### `69804378` — Guaraituba
**Atual:** "Apto térreo 02 quartos - Guaraituba - Colombo/PR" (49 chars)
**Sugerido:** "Apê 2 Quartos Térreo Reformado Guaraituba Colombo" (49 chars) ✅
**Justificativa:** Reformado (Tier S).

#### `69805336` — Guatupê
**Atual:** "Terreno de esquina, 480m2 com casa não averbada no Guatupê..." (90 chars)
**Sugerido:** "Terreno Esquina 480m² Guatupê com Casa + Barracão" (49 chars) ✅
**Justificativa:** Barracão (diferencial comercial).

#### `69805524` — Jardim Veneza
**Atual:** "Casa em terreno de 4100 m² na Rod. Dep. João Leopoldo Jacomel em Piraquara" (74 chars)
**Sugerido:** "Casa 4 Quartos 4.100m² Alto Padrão Jardim Veneza" (48 chars) ✅
**Justificativa:** Bairro oficial (Jardim Veneza) + alto padrão.

#### `69803861` — Juvevê
**Atual:** "Galeria Hype Casa Nativa - Apartamento com 3 quartos à venda no bairro Juvevê" (77 chars)
**Sugerido:** "Apê 3 Quartos Suíte Juvevê Lazer Completo" (41 chars) ✅
**Justificativa:** 18 itens condomínio (piscina, coworking, fitness).

#### `69803591` — Lindóia
**Atual:** "Apartamento com 2 quartos à venda no bairro Lindóia." (52 chars)
**Sugerido:** "Apê 2 quartos Lindóia varanda gourmet churrasqueira" (51 chars) ✅
**Justificativa:** CRM=0 suítes (não tem suíte). "Churrasqueira a carvão na sacada".

#### `69804177` — Maracanã
**Atual:** "Oportunidade Imperdível: Imóvel Comercial para Locação!" (55 chars)
**Sugerido:** "Loja 145m² Maracanã Localização Estratégica" (43 chars) ✅
**Justificativa:** Tipo específico + m² real.

#### `69802355` — Mercês
**Atual:** *(vazio)* (0 chars)
**Sugerido:** "Empreendimento Zait Mercês Lançamento 2027" (43 chars) ✅
**Justificativa:** Criado do zero — lançamento + bairro.

#### `69805680` — Nações
**Atual:** "Casa nova à venda no bairro Nações, com 03 quartos sendo 01 suíte e piscina..." (111 chars)
**Sugerido:** "Casa 3 Quartos Suíte Piscina Nações Aceita Financ." (51 chars) ✅
**Justificativa:** Piscina + financiamento.

#### `69805541` — Pilarzinho
**Atual:** "Sobrado em condomínio com 3 quartos no Pilarzinho" (49 chars)
**Sugerido:** "Sobrado 3 Quartos Pilarzinho a 500m Parque Tingui" (49 chars) ✅
**Justificativa:** Parque Tingui (marco).

#### `CH00029` — Povoado do Boa Vista
**Atual:** "Linda chácara de 3 Alqueires (72.000m²) no Paraná (povoado do Boa Vista)" (72 chars)
**Sugerido:** "Chácara 72.000m² Povoado do Boa Vista Aceita Permuta" (52 chars) ✅
**Justificativa:** Aceita permuta.

#### `69804116` — Rebouças
**Atual:** "Studios e Apartamentos de 1 quarto no Rebouças Próximo PUC-Aretha" (65 chars)
**Sugerido:** "Apartamento 1 Quarto 26m² Rebouças a 4min da PUCPR" (50 chars) ✅
**Justificativa:** CRM=Apartamento 1 dorm (não Studio). "4 minutos de carro da PUCPR".

#### `69804221` — Santa Cândida
**Atual:** "Apartamentos 2 quartos prontos para morar, no Santa Cândida com documentação grátis" (83 chars)
**Sugerido:** "Apê 2 Quartos Pronto Morar Santa Cândida Subsídio" (49 chars) ✅
**Justificativa:** "Pronto pra morar" + subsídio R$ 20k (Casa Fácil).

#### `69805679` — Santa Felicidade
**Atual:** "Casa de Alto Padrão com Piscina em Santa Felicidade - Curitiba" (62 chars)
**Sugerido:** "Casa 4 Quartos Suíte Master Piscina Aquecida Sta Felic." (55 chars) ✅
**Justificativa:** Suíte Master + Piscina Aquecida.

#### `69805683` — Santa Terezinha
**Atual:** "Terreno em Santa Terezinha - Fazenda Rio Grande" (47 chars)
**Sugerido:** "Terreno 276m² Murado Santa Terezinha Fazenda R. Grande" (54 chars) ✅
**Justificativa:** "Murado" da descrição.

#### `69805660` — Santo Antônio
**Atual:** "Apartamento com 1 quarto à venda em São José dos Pinhais - Ideal para pessoas com necessidades especiais!" (105 chars)
**Sugerido:** "Apê 1 Quarto Térreo Acessível Santo Antônio SJP" (47 chars) ✅
**Justificativa:** Acessível (diferencial real).

#### `69803132` — Tarumã
**Atual:** "Air Cabral - Apartamento 3 Suítes no Juvevê em Curitiba" (55 chars)
**Sugerido:** "Apê 3 Suítes Tarumã Piscina Aquecida 190m²" (42 chars) ✅
**Justificativa:** Corrige bairro (Tarumã, não Juvevê). Piscina aquecida.

#### `69804449` — Uberaba
**Atual:** "Propriedade de Esquina Uberaba - Comercial e Residencial" (56 chars)
**Sugerido:** "Sobrado Esquina Uberaba 4 Quartos + 2 Lojas Renda" (49 chars) ✅
**Justificativa:** Sobrado + 2 lojas = renda.

#### `69805705` — Vila Izabel *(novo — cadastrado 2026-04-24, Sonatta Home Club)*
**Atual:** "APARTAMENTOS 2 E 3 QUARTOS COM SUÍTE NA VILA IZABEL" (52 chars — CAIXA ALTA = Tier C)
**Sugerido:** "Apartamento 3 qts 72m² a 2km do Pátio Batel Vila Izabel" (55 chars) ✅
**Justificativa:** Marco premium "Pátio Batel" (2,1km) extraído da DescricaoWeb. Caixa normal. *Substitui sugestão V1 do `69804502`, que foi desativado no CRM em 27/04.*

#### `69805507` — Vila Verde
**Atual:** "Sobrado à venda na Vila Verde, com 02 dormitórios, imóvel novo podendo ser financiado." (86 chars)
**Sugerido:** "Sobrado 2 Quartos Novo Vila Verde Aceita Financiamento" (54 chars) ✅
**Justificativa:** Aceita financiamento.

#### `69805607` — Vista Alegre
**Atual:** "Sobrados com 3 quartos no bairro Vista Alegre" (45 chars)
**Sugerido:** "Sobrado Suíte Master Vista Panorâmica Vista Alegre" (50 chars) ✅
**Justificativa:** Suíte Master + Vista Panorâmica (ambos Tier S).

### Resumo 28 bairros (1 imóvel cada)
| Total | 28 | Reescritos | 28 |
| Marcos da descrição | 10 | Amenidades | 18 |
| Bairros corrigidos | 1 (Tarumã ← Juvevê) |
| Média chars antes → depois | 67 → 47 |
| Mudanças 27/04 | Cristo Rei promovido p/ seção própria (+1 imóvel); Vila Izabel: `69804502` desativado, substituído por `69805705` |

---

## 🚀 Lançamentos — Padrão Tier S Revisado (2026-04-27)

> **78 imóveis com `Lancamento=Sim` no CRM.** Após pesquisa de mercado nos concorrentes locais (Razzi) e portais nacionais (OLX, MySide, Imovelweb, ZAP, VivaReal), o padrão pra **lançamento é diferente do imóvel pronto:**
>
> **Fórmula Tier S:** `[Nome do Empreendimento] - [Tipo + Quartos + Diferencial] [Bairro] [Gancho]`
>
> **Diferenças vs V2 padrão (que vale pra prontos pra morar):**
> - **Nome do empreendimento NO COMEÇO** (V2: no fim) — pra capturar busca de marca
> - **Limite estendido pra 60 chars** (V2: 55) — cabem nome + bairro + diferencial
> - **"na planta"** ou **"lançamento"** como filtro de intenção (separa de quem busca pronto)
> - **Diferencial-marco substitui entrega** quando empreendimento tem múltiplas fases (Reserva, Le Monde, Augen, Casa Jobim)
> - Construtora citada com ` | Construtora` quando agrega trust (Plaenge, Laguna, GT Building, Avantti, Auten, Pride, Pessoa, ALTMA, Rottas)
>
> ⚠️ **Estas sugestões substituem o "Sugerido:" V2 dos lançamentos listados abaixo.** Imóveis prontos pra morar mantêm o padrão V2 original.

### Mossunguê — Reserva Barigui / Reserva Mirante (Avantti, multi-fase)

> Reserva Barigui não tem entrega única — várias torres entregues e em fases. Marco principal: "frente Parque Barigui + Park Shopping Barigui". Esse é o gancho.

| Código | Unidade | Sugestão Tier S | Chars |
|---|---|---|---|
| AP00900 | Studio 35m² | Reserva Barigui - Studio 35m² frente Parque Barigui | 52 |
| AP00762 | Cobertura Loft 1 dorm 62m² | Reserva Barigui - Cobertura Loft 62m² frente Pq Barigui | 54 |
| 69803879 | Studio 49m² | Reserva Barigui - Studio 49m² frente Parque Barigui | 52 |
| 69803880 | Apto 2 qts 1 suíte 72m² | Reserva Barigui - Apto 2 qts suíte 72m² Mossunguê | 50 |
| AP00772 | Duplex 2 suítes 98m² | Reserva Barigui - Duplex 2 suítes 98m² frente Pq Barigui | 57 |
| 69803881 | Apto 4 qts 2 suítes 232m² | Reserva Barigui - 4 qts 2 suítes 232m² frente Pq Barigui | 57 |
| 69803882 | Apto 4 qts 2 suítes 257m² | Reserva Barigui - 4 qts 2 suítes 257m² 4 vagas Mossunguê | 56 |
| AP00773 | 4 qts 2 suítes 185m² | Reserva Colina - 4 qts 2 suítes 185m² frente Pq Barigui | 55 |
| 69804720 | Duplex revenda 2 suítes 117m² | Reserva Barigui - Duplex 2 suítes 117m² Mossunguê *(revenda)* | 60 |
| 69802215 | Sala comercial 47m² | Reserva Mirante - Sala 47m² frente Parque Barigui Mossunguê | 60 |
| 69802216 | Loja 103m² | Reserva Mirante - Loja 103m² frente Parque Barigui | 51 |

### Mossunguê / Ecoville — outros lançamentos

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| AP01088 | Horizon Ecoville (Plaenge) | Horizon Ecoville - Apto 3 qts 120m² próx Pq Barigui \| Plaenge | 60 |
| AP01143 | Yes Ecoville | Yes Ecoville - Apto 2 qts suíte 56m² na planta Mossunguê | 56 |
| AP01004 | PACE | PACE - Apto 3 suítes 217m² na planta Mossunguê | 47 |
| AP00945 | La Défense | La Défense - Apto 3 suítes 120m² na planta Mossunguê | 53 |
| AP00946 | La Défense | La Défense - Cobertura 3 suítes 250m² 4 vagas Mossunguê | 56 |
| AP00671 | Signature | Signature - Apto 3 suítes 228m² alto padrão Ecoville | 53 |
| AP00922 | Landhaus (Plaenge) | Land Haus - Apto 3 suítes 193m² Ecoville \| Plaenge | 51 |

### Bigorrilho — alto padrão (Casa Milano, KAÁ, OAS, AMÁZ, Mytá, Varanda)

> Marco recorrente: "próximo ao Parque Barigui" (Champagnat). Construtoras fortes: GT Building, Laguna, ALTMA. Vale citar.

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| AP00539 | Casa Milano (GT Building) | Casa Milano - Apto 2 suítes 126m² na planta Bigorrilho \| GT | 60 |
| AP00650 | Varanda Barigui | Varanda Barigui - Apto 3 suítes 166m² Champagnat Bigorrilho | 60 |
| AP00941 | OAS Barigui | OAS Barigui - 3 suítes 230m² prédio mais alto de Curitiba | 58 |
| AP00947 | KAÁ Residências (Laguna) | KAÁ Residências - Apto 2 suítes 181m² próx Pq Barigui | 54 |
| AP00955 | KAÁ Residências (Laguna) | KAÁ Residências - 3 suítes 315m² próx Parque Barigui | 53 |
| AP01067 | AMÁZ (GT Building) | AMÁZ - Apto 3 suítes 192m² Bigorrilho/Mercês \| GT Building | 59 |
| AP01132 | Mytá (ALTMA) | Mytá - Apto 3 suítes 148m² na planta Bigorrilho \| ALTMA | 56 |

### Batel — alto padrão (Casa Batel, Mova.WF, Carmelo, Trevi, Lange, Temple)

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| 69802979 | Casa Batel | Casa Batel - Apto 4 suítes 219m² na planta no Batel | 51 |
| 69803768 | Mova.WF | Mova.WF - Apto 3 suítes 137m² na planta no Batel | 49 |
| 69803825 | Carmelo 180 (JN) | Carmelo 180 - 3 suítes 225m² na planta alto padrão Batel | 56 |
| AP00754 | Temple Batel (GT Building) | Temple Batel - Apto 1 qto 35m² na planta Batel \| GT | 53 |
| AP01034 | Trevi Batel | Trevi Batel - Apto 3 suítes 200m² na planta no Batel | 53 |
| 69805195 | Lange | Lange - Apto 1 qto suíte 26m² na planta Batel alto padrão | 60 |

### Água Verde — Lemme, Le Sense, Atlân, Ágon

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| 69803421 | Ágon Residence | Ágon Residence - Apto 3 qts suíte 130m² na planta A. Verde | 59 |
| AP00828 | Le Sense (Swell) | Le Sense - Apto 3 qts suíte 116m² na planta Água Verde | 55 |
| AP01009 | Lemme | Lemme - Apto 3 suítes 141m² na planta no Água Verde | 53 |
| AP01130 | Atlân (GT Building) | Atlân - Apto 2 suítes 106m² na planta divisa A. Verde Batel | 60 |
| AP01131 | Atlân (GT Building) | Atlân - Apto 3 qts suíte 114m² na planta divisa Batel | 54 |

### Cristo Rei — Explore Botânico, Zion JB

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| AP00798 | Explore Botânico (GT Building) | Explore Botânico - Apto 3 qts suíte 81m² ao lado Jd Botânico | 60 |
| 69805702 | Zion JB | Zion JB - Studio 26m² na planta Cristo Rei lazer completo | 57 |

### Boa Vista — Hike (Auten Incorporadora)

| Código | Plantas | Sugestão Tier S | Chars |
|---|---|---|---|
| 69803115 | 3 qts suíte 89m² | Hike - Apto 3 qts suíte 89m² na planta Boa Vista \| Auten | 56 |
| 69803602 | 2 qts suíte 64m² | Hike - Apto 2 qts suíte 64m² na planta Boa Vista \| Auten | 56 |
| 69803603 | 3 qts suíte 82m² | Hike - Apto 3 qts suíte 82m² na planta Boa Vista \| Auten | 56 |

### Portão — Cravo Casa Nativa, Le Monde, Terracota I, Portão Prime, One Life

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| 69804349 | Cravo Casa Nativa | Cravo Casa Nativa - Apto 3 qts suíte 90m² na planta Portão | 60 |
| AP01079 | Cravo Casa Nativa | Cravo Casa Nativa - Apto 2 qts suíte 66m² na planta Portão | 60 |
| AP00821 | Le Monde | Le Monde - Apto 2 qts 51m² na planta lazer completo Portão | 58 |
| 69803237 | Terracota I | Terracota I - Sobrado 3 qts suíte cond. fechado Portão | 53 |
| 69804852 | Portão Prime Residence | Portão Prime - Sobrado 3 qts 182m² garden churrasq Portão | 57 |
| ST00010 | One Life | One Life - Apto 1 qto 17m² a 200m do Hospital IPO Portão | 57 |

### Cidade Industrial — MEO Neoville, Vega Neoville, Vittace Bosque

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| AP00915 | MEO Neoville | MEO Neoville - Apto Garden 2 qts 52m² na planta CIC | 52 |
| AP00916 | MEO Neoville | MEO Neoville - Apto 3 qts suíte 62m² cond clube CIC | 52 |
| 69804107 | Vega Neoville | Vega Neoville - Apto 2 qts 46m² na planta cond clube CIC | 57 |
| 69803256 | Vittace Bosque (Prestes) | Vittace Bosque - Apto 2 qts 44m² na planta CIC \| Prestes | 56 |

### Hauer — MEO Hauer (Rottas)

| Código | Plantas | Sugestão Tier S | Chars |
|---|---|---|---|
| AP01065 | 2 qts suíte 52m² | MEO Hauer - Apto 2 qts suíte 52m² na planta Hauer \| Rottas | 59 |
| AP01066 | 3 qts suíte 64m² | MEO Hauer - Apto 3 qts suíte 64m² na planta Hauer \| Rottas | 59 |

### Campina do Siqueira / Ecoville — Augen (Pride), Casa Jobim

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| 69804923 | Augen (Pride) | Augen - Apto 2 qts suíte 67m² na planta Campina Siqueira | 56 |
| 69804924 | Augen (Pride) | Augen - Apto 3 qts suíte 78m² na planta Ecoville \| Pride | 56 |
| 69805182 | Casa Jobim | Casa Jobim - Apto 2 suítes 118m² na planta Ecoville | 51 |
| 69805183 | Casa Jobim | Casa Jobim - Apto 3 suítes 145m² na planta Ecoville | 51 |
| 69805460 | Casa Jobim | Casa Jobim - Apto 3 suítes 191m² na planta Ecoville | 51 |

### Novo Mundo — Essence, High City Habitat, Ed New England

| Código | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|
| 69804954 | Essence | Essence - Apto 2 qts 47m² na planta Novo Mundo | 47 |
| 69804959 | Essence | Essence - Apto 2 qts suíte 48m² na planta Novo Mundo | 53 |
| AP00978 | High City Habitat | High City - Apto 2 qts suíte 56m² na planta Novo Mundo | 54 |
| AP00979 | High City Habitat | High City - Apto 3 qts suíte 66m² na planta Novo Mundo | 54 |
| AP01026 | Ed New England | New England - Apto 1 qto suíte 22m² próx Palladium | 53 |

### Santa Quitéria — Oslo (Construtora Pessoa)

| Código | Plantas | Sugestão Tier S | Chars |
|---|---|---|---|
| 69804228 | 2 qts suíte 64m² | Oslo - Apto 2 qts suíte 64m² na planta Sta Quitéria \| Pessoa | 60 |
| 69804230 | 3 qts 2 suítes 87m² | Oslo - Apto 3 qts 2 suítes 87m² na planta Santa Quitéria | 56 |

### Outros lançamentos (1 imóvel cada)

| Código | Bairro | Empreend | Sugestão Tier S | Chars |
|---|---|---|---|---|
| 69802196 | Cabral | Fly Urban Habitat | Fly Urban Habitat - Apto 3 qts suíte 91m² na planta Cabral | 58 |
| 69803132 | Tarumã | Air Cabral | Air Cabral - Apartamento 3 suítes 190m² na planta Tarumã | 56 |
| 69803208 | Campo Comprido | Casa Nomaa | Casa Nomaa - Apto 3 suítes 268m² na planta Campo Comprido | 58 |
| 69803591 | Lindóia | Ecoa Residencial | Ecoa Residencial - Apartamento 2 qts varanda gourmet Lindóia | 60 |
| 69803861 | Juvevê | Galeria Hype Casa Nativa | Galeria Hype Casa Nativa - Apto 3 quartos suíte 70m² Juvevê | 59 |
| 69803899 | Centro | Republik Benjamin Constant | Republik B. Constant - Studio 24m² na planta no Centro | 55 |
| AP00751 | Alto da Glória | Palm 235 (Plaenge) | Palm 235 - Apto 3 suítes 148m² varanda gourmet Alto Glória | 59 |
| SA00031 | Alto da Glória | Bioos Health (Laguna) | Bioos Health - Sala vista panorâmica Alto da Glória \| Laguna | 60 |
| AP00970 | Tingui | Joy City Habitat | Joy City Habitat - Apto 2 qts suíte 62m² na planta Tingui | 58 |
| AP01011 | Alto da Rua XV | Manhatan Square | Manhatan Square - Apto 1 qto 25m² a 500m Mueller Alto Rua XV | 60 |

### Sobrados em lançamento sem empreendimento formal (Xaxim)

| Código | Plantas | Sugestão Tier S | Chars |
|---|---|---|---|
| 69803109 | 3 qts suíte 2 vagas | Sobrado 3 qts suíte 2 vagas na planta Xaxim Curitiba | 53 |
| 69805180 | 3 qts suíte 193m² | Sobrado 3 qts suíte 193m² na planta no Xaxim | 45 |
| 69805181 | 3 qts suíte 132m² | Sobrado 3 qts suíte 132m² na planta no Xaxim | 45 |

### Resumo Lançamentos — Padrão Tier S Revisado

| Métrica | Valor |
|---|---|
| Total de lançamentos no CRM | **78** |
| Empreendimentos únicos | ~50 |
| Multi-fase (sem entrega única) | 5 (Reserva Barigui, Le Monde, Augen, Casa Jobim, Hike) |
| Construtoras citadas | 9 (Avantti, Plaenge, Laguna, GT Building, Auten, Pride, Pessoa, ALTMA, Rottas) |
| Marco principal recorrente | Parque Barigui (10 imóveis), Shopping Palladium (4), Hospital IPO (2), Pátio Batel (1), Jardim Botânico (1) |
| Média chars sugeridos | ~55 (vs limite estendido 60) |
| Mudança chave vs V2 | Nome no início + "na planta" + diferencial-marco substituindo entrega |

---

## 📋 Changelog

### 2026-04-27 — Sincronização com CRM (delta +9 líquido)

Snapshot da API Loft cruzado com os 242 códigos da V1. **Sugestões inseridas diretamente nas seções de bairro correspondentes** (não em seção separada) pra que Wagner aplique tudo num fluxo só.

**Imóveis novos (10) — distribuídos nas seções:**
- Alto Boqueirão: `69802157`
- Cajuru: `69805712`, `CA02804`
- Capela Velha: `69805714`
- Cristo Rei *(promovido p/ seção própria)*: `69805702`
- Sítio Cercado: `69805703` (locação), `69805704` (locação loja)
- Tatuquara: `69805713`, `CA00096`
- Vila Izabel *(seção 28-bairros)*: `69805705`

**Imóveis desativados (1):**
- `69804502` (Vila Izabel) — sugestão V1 obsoleta, substituída por `69805705` na mesma posição.

**Verificação dos 241 imóveis comuns:** títulos no CRM permanecem idênticos à coluna "Atual" do doc original (apenas whitespace/pontuação) — Bruno **ainda não aplicou** nenhuma sugestão V2.

**Padrão das novas sugestões:** mesmo da V2 (limite 55 chars, estrutura `[Diferencial] [Tipo/Quartos] [Bairro] [Gancho]`, marcos da DescricaoWeb, sem Tier C). Marcadas com `*(novo — cadastrado YYYY-MM-DD)*` em itálico depois do código pra Wagner localizar.

**Empreendimentos novos:** Zion JB, Sonatta Home Club, Residencial Santos Dumont, Residencial Vila Mariana, Residencial Canto do Uirapuru, Residencial Fontana de Trevi.

**Marcos novos extraídos da DescricaoWeb:** Shopping & Sports (Alto Boqueirão), Parque Aquabosk (Tatuquara), Parque Passaúna (Capela Velha), Condor Cajuru, Terminal Sítio Cercado, Esper Jorge Chueri (Cajuru), Pátio Batel a 2km (Vila Izabel), Jardim Botânico (Cristo Rei — preservado).

---

## Sumário Geral da Auditoria (com sync 27/04)

### Estatísticas agregadas

| Métrica | Valor |
|---|---|
| **Total de imóveis processados** | **251 / 251 (100%)** ✅ *(242 V2 + 10 novos – 1 desativado)* |
| Bairros processados | 64 (Cristo Rei promovido p/ seção própria, 28 bairros 1-imóvel) |
| Imóveis reescritos | ~248 |
| Criados do zero (sem título na origem) | 7 |
| **Média de chars ANTES** | ~80 (acima do limite Google) |
| **Média de chars DEPOIS** | **~49** (sweet spot Zyppy) ✅ |
| **Redução média** | **-38%** |
| Última sincronização com CRM | 2026-04-27 (ver Changelog acima) |


### Marcos locais extraídos da DescricaoWeb (exemplos)

**Curitiba centro-sul:**
- Hospital IPO (Portão/Água Verde)
- Shopping Palladium (Portão/Novo Mundo)
- Praça do Japão (Água Verde/Batel)
- Clube Curitibano (Água Verde)
- UFPR, Teatro Guaíra (Centro)
- PUCPR (Rebouças — 4min)
- Jardim Botânico (Cristo Rei)
- Parque Barigui (Bigorrilho/Mossunguê — múltiplas distâncias)
- Shopping Mueller (Alto da Rua XV)
- Pátio Batel (Batel — 1 quadra)

**Região norte/oeste:**
- Shopping Estação, Rua do Outono (Campo Comprido/Ecoville)
- Av. Winston Churchill, Linha Verde, Terminal Capão Raso (Capão Raso)
- Santuário da Divina Misericórdia (Umbará)
- Parque Tingui (Pilarzinho)

**Região sul/popular:**
- Mercado Araucária, Supermercado Roça Grande, CMEI (Campo de Santana)
- Terminal Tatuquara, BR-116, Rua Pedro Prosdócimo (Tatuquara)
- Bosch, Mondelez (indústrias) (Cidade Industrial)
- Festval (Hauer/Santa Quitéria)
- Supermercado Condor, Agricer, Góes, Nogueira (Sítio Cercado)

### Bugs de dados detectados (11 imóveis)

Durante V2 os agentes encontraram **11 bairros errados** (vs 8 em V1 — maior precisão):

1. Ecoville (título) → Campina do Siqueira (dados) — 2 imóveis
2. Portão (título) → Fazendinha (dados) — 1
3. Campo Comprido (título) → Fazendinha (dados) — 1
4. Bigorrilho (título) → Centro (dados) — 1
5. Araucária (título) → Centro (dados) — 1
6. Juvevê (título) → Tarumã (dados) — 1
7. Capão da Imbuia (título) → Cajuru (dados) — 2
8. Araucária (título) → Cachoeira / Capela Velha (dados) — 3

**Tipos errados em 4 imóveis:**
- 69805443, 69805444 — Sobrado → Apartamento
- 69805496 (LIV.IN) — 3 → 2 quartos
- 69803847 — Terreno → Casa

**7 imóveis sem TituloSite** (criaram do zero):
AP01143, AP01115, 69803220, 69802355, 69805108, 69805416, 69805612
