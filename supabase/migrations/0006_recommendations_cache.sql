-- Sprint design 06/05/2026 — Recommendations Cache
-- ───────────────────────────────────────────────────────────────────────
-- Cache de score por artigo do blog pra ranking de "Mais lidos" na home,
-- recomendados em /blog e related-posts em /blog/[slug]. Populado pelo
-- cron `/api/cron/recommendations-refresh` que chama GSC API daily.
--
-- Sinais (algoritmo aprovado em recommendations-algorithm-v2.md §1):
--   0.40 cliques GSC 30d (sinal mais robusto)
--   0.20 CTR ajustado por posicao (proxy de qualidade snippet)
--   0.15 recency (half-life 365d)
--   0.15 MMR diversidade (aplicada no rerank, nao no score)
--   0.10 boost evergreen (artigos itbi/financiamento intemporais)
--
-- Janela: 30 dias (compromise entre estabilidade 90d e responsividade 7d).
-- ───────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS recommendations_cache (
  slug              TEXT PRIMARY KEY,
  -- Sinais brutos do GSC
  clicks_30d        INTEGER     NOT NULL DEFAULT 0,
  impressions_30d   INTEGER     NOT NULL DEFAULT 0,
  ctr_pct           NUMERIC(6,4) NOT NULL DEFAULT 0,   -- 0.0 a 1.0 (raw GSC)
  position_avg      NUMERIC(5,2) NOT NULL DEFAULT 0,
  ctr_position_adj  NUMERIC(8,4) NOT NULL DEFAULT 0,   -- ctr / expected_ctr_at(position)
  -- Score final do algoritmo (pra ORDER BY direto)
  score             NUMERIC(8,4) NOT NULL DEFAULT 0,
  -- Cluster topical pra MMR diversidade no rerank
  cluster_id        TEXT NOT NULL DEFAULT 'uncategorized',
  -- Boost evergreen — manual ou via tag
  is_evergreen      BOOLEAN NOT NULL DEFAULT false,
  -- Auditoria (pra debug + stale fallback)
  computed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices pra queries esperadas:
-- - Top N posts ranking (home, /blog) = ORDER BY score DESC LIMIT N
-- - Filtro por cluster (related posts dentro do mesmo tema) = WHERE cluster_id = X
CREATE INDEX IF NOT EXISTS idx_reco_cache_score
  ON recommendations_cache(score DESC);
CREATE INDEX IF NOT EXISTS idx_reco_cache_cluster
  ON recommendations_cache(cluster_id);

-- RLS — leitura publica anon (Server Components SSR), escrita so service_role
ALTER TABLE recommendations_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_recommendations" ON recommendations_cache;
CREATE POLICY "anon_read_recommendations"
  ON recommendations_cache
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role tem acesso completo via key — nao precisa policy explicita
-- (bypass automatico do supabase-js admin client).

COMMENT ON TABLE recommendations_cache IS
  'Cache de score por artigo do blog. Populado pelo cron recommendations-refresh diario. Lido pelo service getRecommendedPosts em SSR.';

COMMENT ON COLUMN recommendations_cache.score IS
  'Score normalizado [0,1] do algoritmo hibrido v2. Sort key principal.';

COMMENT ON COLUMN recommendations_cache.ctr_position_adj IS
  'CTR observado dividido pelo CTR esperado pra posicao media. >1 = melhor que media, <1 = pior.';
