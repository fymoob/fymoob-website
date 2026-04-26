# Sanity CMS — Disaster Recovery

> **Criado:** 2026-04-26
> **Próxima revisão:** 2026-10-26 (semestral) ou após primeiro incidente

Plano de recuperação caso o Sanity Cloud caia, sumir, ou a FYMOOB decidir migrar pra outro CMS.

---

## Resumo executivo

O blog FYMOOB tem **3 níveis de proteção contra falhas do Sanity**:

| Nível | O que protege | Recovery time | Como acionar |
|---|---|---|---|
| **N0 — Dual-read (live)** | Downtime curto (<24h) | Instantâneo | Já ativo: `src/services/blog.ts` cai pro MDX automaticamente em erro |
| **N1 — Backup tarball diário** | Perda do dataset Sanity | ~30min | Restaurar JSON em novo projeto Sanity |
| **N2 — MDX local sincronizado** | Sanity inacessível permanente | ~10min | Comentar dual-read, deletar deps Sanity, deploy direto MDX |
| **N3 — Migração pra outro CMS** | Decisão estratégica de mudar | ~8h dev | Usar tarball como fonte estruturada |

---

## Estado atual da proteção

### Onde os dados estão

1. **Sanity Cloud** (CDN deles) — fonte primária pós-Fase 4
   - 15 posts em `production` dataset
   - Imagens em `cdn.sanity.io/images/<projectId>/production/`
   - Project ID: `a7kjcurr`

2. **Repo Git** (este repositório) — backup completo
   - `content/blog/*.mdx` — versão MDX sincronizada (N2)
   - `public/blog/*.webp` — imagens originais
   - `docs/sanity-backups/<YYYY-MM-DD>.json` — tarball completo dataset (N1)

### Sincronização automatizada

GitHub Action `.github/workflows/sanity-backup.yml` roda **diariamente às 04:00 BRT** e executa:

```bash
node scripts/backup-sanity.mjs    # N1: tarball JSON
node scripts/sanity-to-mdx.mjs    # N2: MDX local + imagens
git commit && git push            # commit automático
```

Se Bruno publica algo no Studio, o backup completo cai no Git em até 24h.

---

## Cenários de incidente

### Cenário 1 — Sanity downtime curto (<24h, problema resolvido pelos eles)

**Sintoma:** Visitas em `/blog/[slug]` mostram página vazia ou erro 500.

**O que já acontece automaticamente:**
- `src/services/blog.ts` chama `sanityClient.fetch()` com `try/catch`
- Em erro/timeout, função `fetchSanityPostBySlug` retorna `null`
- Service cai no fallback MDX em `content/blog/<slug>.mdx`
- Site continua funcionando (com versão da última sincronização — máx 24h atrás)

**Ação manual:** nenhuma. Só monitorar.

---

### Cenário 2 — Sanity perde dataset (corrupção, conta hackeada, billing)

**Sintoma:** Studio carrega mas mostra "no documents found". Site cai pro MDX (N0 ativo).

**Recovery:**

```bash
# 1. Criar novo projeto Sanity
npx sanity init --create-project "FYMOOB Blog Recovery"

# 2. Pegar Project ID novo
# 3. Atualizar .env.local + Vercel com novo NEXT_PUBLIC_SANITY_PROJECT_ID

# 4. Restaurar dataset do tarball mais recente
LATEST_BACKUP=$(ls -t docs/sanity-backups/*.json | head -1)
node scripts/restore-sanity-from-backup.mjs $LATEST_BACKUP
# (script de restore — criar quando primeiro incidente acontecer)

# 5. Re-cadastrar autores
# 6. Validar /studio + /blog
```

**Recovery time:** 30min-1h.

---

### Cenário 3 — Sanity inacessível permanente (empresa fecha, conta deletada irrecuperável)

**Sintoma:** API Sanity retorna 401/404 permanentemente. Studio inacessível.

**Recovery cirúrgico (10min):**

```bash
# 1. Confirma que content/blog/*.mdx está atualizado
# (deve estar — sync diário N2)
ls -la content/blog/*.mdx

# 2. Comenta o dual-read em src/services/blog.ts
#    (remove tentativa de buscar Sanity, sempre usa MDX)
# Editar src/services/blog.ts:
#   - Comentar import { sanityClient } from "@/sanity/lib/client"
#   - Em getPostBySlug, remover branch Sanity
#   - getAllPosts: retornar só listMdxSlugs().map(getPostFromMdxFile)

# 3. Remove deps Sanity (opcional, só pra reduzir bundle)
npm uninstall sanity next-sanity @sanity/client @sanity/image-url @sanity/vision @portabletext/react @portabletext/types

# 4. Remove rota /studio
rm -rf src/app/studio sanity sanity.config.ts src/sanity

# 5. Build + deploy
npm run build
git add -A && git commit -m "fix: fallback MDX-only após Sanity offline permanente"
git push
```

**Recovery time:** 10min até deploy completo.

---

### Cenário 4 — Decisão estratégica de migrar pra outro CMS

Se em algum momento a FYMOOB quiser sair do Sanity (lock-in, custo após crescer, preferência por self-host), o tarball N1 funciona como **fonte estruturada** pra qualquer destino:

**Strapi / Payload / Directus:**
- Mapear schema Portable Text → blocos do CMS destino
- Importar via API REST/GraphQL deles
- Migrar imagens (re-upload do `public/blog/*.webp`)
- Esforço: ~8h dev

**Supabase + Novel editor (custom):**
- JSON do tarball vai pra Postgres (tabela `posts`)
- Body Portable Text → JSON column ou markdown convertido
- Esforço: ~12h dev (já existe Supabase planejado pra Fase 15.A)

**Voltar pra MDX puro (sem CMS):**
- Já temos os MDX sincronizados em `content/blog/`
- Deletar setup Sanity (Cenário 3)
- Esforço: 10min

---

## Validação manual (recomendada a cada 90 dias)

Pra garantir que disaster recovery funcionará quando precisar:

### Checklist trimestral

```bash
# 1. Verificar que backups estão sendo gerados
ls -la docs/sanity-backups/ | tail -5
# Deve haver 1 backup por dia nos últimos 30

# 2. Verificar que MDX está sincronizado
diff -r content/blog/ <(node scripts/sanity-to-mdx.mjs --dry-run 2>&1)
# Deve ser silencioso (sem diff)

# 3. Simular Sanity offline localmente
# Edita src/services/blog.ts temporariamente e força isSanityConfigured=false
# Verifica que /blog/<slug> renderiza igual (via MDX fallback)

# 4. Verifica que tarball é restaurável
node scripts/validate-backup.mjs docs/sanity-backups/<latest>.json
# (script a criar quando primeiro incidente forçar)
```

Se algum item falha, abrir issue em `docs/sanity-disaster-recovery.md` com tag `dr-test-failed`.

---

## Custos de cada nível

| Nível | Recovery time | Custo dev (já pago) | Mantém edições recentes? |
|---|---|---|---|
| N0 dual-read | <1s | ✅ | Não — usa MDX da última sync (até 24h atrás) |
| N1 tarball | 30min | ✅ | Sim — tarball é da última sync diária |
| N2 MDX sync | 10min | ✅ | Sim — MDX é regenerado diariamente |
| N3 migrar CMS | ~8h dev | A calcular se necessário | Sim |

Observação: edições feitas DEPOIS da última sync diária (até 24h) **não estão protegidas**. Se isso virar problema, possível upgrade: trocar cron diário por **webhook on-publish** do Sanity (Fase 3 do plano original).

---

## Referências internas

- `scripts/backup-sanity.mjs` — script N1 (tarball)
- `scripts/sanity-to-mdx.mjs` — script N2 (sync reverso)
- `.github/workflows/sanity-backup.yml` — cron diário
- `src/services/blog.ts` — dual-read N0
- `docs/architecture/blog-cms-decision.md` — decisão original Sanity
- `docs/architecture/sanity-cms-validation-2026-04-25.md` — validação técnica

---

## Histórico de incidentes

> Quando ocorrer primeiro incidente, registrar aqui (data, sintoma, cenário aplicado, lições).

Nenhum até 2026-04-26.
