#!/usr/bin/env node
/**
 * Análise FYMOOB CRM — Apartamento vs Casa em Curitiba
 * Lê snapshot diário (NÃO chama API live).
 * Output: estatísticas pra reescrita do post `apartamento-ou-casa-curitiba`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SNAPSHOT = process.argv[2] || 'docs/research/snapshots/2026-04-25.json';
const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '..', '..');
const file = path.resolve(repoRoot, SNAPSHOT);
const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
const all = raw.properties || [];

console.log(`Snapshot: ${raw.snapshot_date} (n=${all.length})`);
console.log(`Schema: ${raw.schema_version}`);
console.log('');

// ----- helpers -----
const median = (arr) => {
  const s = arr.filter((x) => Number.isFinite(x)).slice().sort((a, b) => a - b);
  if (!s.length) return null;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const minmax = (arr) => {
  const s = arr.filter((x) => Number.isFinite(x));
  if (!s.length) return [null, null];
  return [Math.min(...s), Math.max(...s)];
};
const fmtBRL = (n) => (n == null ? 'n/a' : n.toLocaleString('pt-BR', { maximumFractionDigits: 0 }));
const fmtR = (n) => (n == null ? 'n/a' : `R$ ${fmtBRL(n)}`);
const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)} %` : '0 %');

// Filtros: Curitiba apenas, com valor_venda
const cwb = all.filter((p) => p.cidade === 'Curitiba');
console.log(`Curitiba: ${cwb.length}`);

const venda = cwb.filter((p) => Number(p.valor_venda) > 0);
console.log(`Curitiba c/ valor_venda: ${venda.length}`);

// ----- 2. Distribuição por tipo (Curitiba inteiro, c/ valor_venda) -----
const byCat = {};
venda.forEach((p) => {
  const c = p.categoria || 'sem_categoria';
  byCat[c] = (byCat[c] || 0) + 1;
});
console.log('\n=== 2. Distribuição por categoria (Curitiba c/ venda) ===');
Object.entries(byCat)
  .sort(([, a], [, b]) => b - a)
  .forEach(([c, n]) => console.log(`  ${c}: ${n} (${pct(n, venda.length)})`));

// ----- Distinção studio vs apto -----
// Heurística: "Studio" como categoria já existe no CRM? Sim. Senão, apto 1Q ≤ 50m² ?
const studios = venda.filter((p) => p.categoria === 'Studio');
const aptosTodos = venda.filter((p) => p.categoria === 'Apartamento');
const aptosTipoStudio = aptosTodos.filter(
  (p) => Number(p.dormitorios) === 1 && Number(p.area_privativa) <= 50,
);
console.log(`\nStudios (categoria=Studio): ${studios.length}`);
console.log(`Apartamentos categoria=Apartamento: ${aptosTodos.length}`);
console.log(`  dos quais 1Q ≤ 50m² (perfil studio): ${aptosTipoStudio.length}`);

// ----- 3. Bairros por tipo -----
const groupByBairro = (arr) => {
  const g = {};
  arr.forEach((p) => {
    const b = p.bairro || '(sem)';
    g[b] = g[b] || [];
    g[b].push(p);
  });
  return g;
};

const bairrosApto = groupByBairro(aptosTodos);
const casas = venda.filter((p) => p.categoria === 'Casa');
const sobrados = venda.filter((p) => p.categoria === 'Sobrado');
const condoCasas = venda.filter((p) => p.categoria === 'Casa em Condomínio');
const bairrosCasa = groupByBairro(casas);
const bairrosSobrado = groupByBairro(sobrados);
const bairrosCondoCasa = groupByBairro(condoCasas);

console.log('\n=== 3. Top bairros — Apartamento (n) ===');
Object.entries(bairrosApto)
  .sort(([, a], [, b]) => b.length - a.length)
  .slice(0, 12)
  .forEach(([b, items]) => console.log(`  ${b}: n=${items.length}`));

console.log('\n=== 3. Top bairros — Casa (n) ===');
Object.entries(bairrosCasa)
  .sort(([, a], [, b]) => b.length - a.length)
  .slice(0, 12)
  .forEach(([b, items]) => console.log(`  ${b}: n=${items.length}`));

console.log('\n=== 3. Top bairros — Sobrado (n) ===');
Object.entries(bairrosSobrado)
  .sort(([, a], [, b]) => b.length - a.length)
  .slice(0, 8)
  .forEach(([b, items]) => console.log(`  ${b}: n=${items.length}`));

console.log('\n=== 3. Top bairros — Casa em Condomínio (n) ===');
Object.entries(bairrosCondoCasa)
  .sort(([, a], [, b]) => b.length - a.length)
  .slice(0, 8)
  .forEach(([b, items]) => console.log(`  ${b}: n=${items.length}`));

// ----- Bairros 100% apto / 100% casa / mistos -----
const bairrosTodos = groupByBairro(venda);
console.log('\n=== Cobertura por bairro: apto vs casa+sobrado+condo (top 25 bairros por volume total) ===');
const casaConcept = (p) => ['Casa', 'Sobrado', 'Casa em Condomínio'].includes(p.categoria);
const aptoConcept = (p) => ['Apartamento', 'Studio', 'Cobertura', 'Apt Duplex', 'Kitnet', 'Flat', 'Loft'].includes(p.categoria);
Object.entries(bairrosTodos)
  .sort(([, a], [, b]) => b.length - a.length)
  .slice(0, 25)
  .forEach(([b, items]) => {
    const apto = items.filter(aptoConcept).length;
    const casa = items.filter(casaConcept).length;
    const outro = items.length - apto - casa;
    console.log(`  ${b}: total=${items.length}, apto=${apto}, casa+sobrado+condo=${casa}, outro=${outro}`);
  });

// ----- 4. Faixa de preço por tipo (Curitiba) -----
const stats = (arr, label) => {
  const valores = arr.map((p) => Number(p.valor_venda)).filter((x) => x > 0);
  const areas = arr.map((p) => Number(p.area_privativa)).filter((x) => x > 0);
  const rm2 = arr
    .map((p) => {
      const v = Number(p.valor_venda);
      const a = Number(p.area_privativa);
      return v > 0 && a > 0 ? v / a : null;
    })
    .filter((x) => x != null);
  const [vmin, vmax] = minmax(valores);
  console.log(`\n  ${label}: n=${arr.length}`);
  console.log(`    Mediana valor: ${fmtR(median(valores))}`);
  console.log(`    Faixa valor: ${fmtR(vmin)} – ${fmtR(vmax)}`);
  console.log(`    Mediana área: ${median(areas)?.toFixed(1)} m²`);
  console.log(`    Mediana R$/m²: ${fmtR(Math.round(median(rm2) || 0))}`);
};

console.log('\n=== 4. Faixa de preço por tipo (Curitiba c/ venda) ===');
stats(aptosTodos, 'Apartamento');
stats(casas, 'Casa');
stats(sobrados, 'Sobrado');
stats(studios, 'Studio (categoria)');
stats(condoCasas, 'Casa em Condomínio');
stats([...casas, ...sobrados, ...condoCasas], 'Casa+Sobrado+CondoCasa (TUDO casa-conceito)');

// ----- 5. Faixas de orçamento -----
const buckets = [
  { lo: 0, hi: 300_000, label: '< R$ 300k' },
  { lo: 300_000, hi: 500_000, label: 'R$ 300-500k' },
  { lo: 500_000, hi: 800_000, label: 'R$ 500-800k' },
  { lo: 800_000, hi: 1_500_000, label: 'R$ 800k-1,5M' },
  { lo: 1_500_000, hi: 3_000_000, label: 'R$ 1,5-3M' },
  { lo: 3_000_000, hi: Infinity, label: 'R$ 3M+' },
];
console.log('\n=== 5. Comparativo por faixa de orçamento (Curitiba c/ venda) ===');
console.log('Faixa | n_apto | n_casa+sobrado+condo | n_studio | total faixa | %apto | %casa');
buckets.forEach((b) => {
  const inFaixa = venda.filter((p) => p.valor_venda >= b.lo && p.valor_venda < b.hi);
  const a = inFaixa.filter(aptoConcept).length;
  const c = inFaixa.filter(casaConcept).length;
  const s = inFaixa.filter((p) => p.categoria === 'Studio').length;
  const total = inFaixa.length;
  console.log(`  ${b.label}: apto=${a}, casa=${c}, studio=${s}, total=${total} | %apto=${pct(a, total)}, %casa=${pct(c, total)}`);
});

// ----- 6. Comparativo apto vs casa MESMO bairro (n≥3 em ambos lados) -----
console.log('\n=== 6. Spread apto vs casa MESMO bairro (n≥3 em cada lado) ===');
const todosBairros = new Set([...Object.keys(bairrosApto), ...Object.keys(bairrosCasa), ...Object.keys(bairrosSobrado), ...Object.keys(bairrosCondoCasa)]);
const linhas = [];
todosBairros.forEach((b) => {
  const aptos = bairrosApto[b] || [];
  const casaConj = [...(bairrosCasa[b] || []), ...(bairrosSobrado[b] || []), ...(bairrosCondoCasa[b] || [])];
  if (aptos.length >= 3 && casaConj.length >= 3) {
    const medA = median(aptos.map((p) => Number(p.valor_venda)).filter((x) => x > 0));
    const medC = median(casaConj.map((p) => Number(p.valor_venda)).filter((x) => x > 0));
    const m2A = median(
      aptos
        .map((p) => {
          const v = Number(p.valor_venda);
          const a = Number(p.area_privativa);
          return v > 0 && a > 0 ? v / a : null;
        })
        .filter((x) => x != null),
    );
    const m2C = median(
      casaConj
        .map((p) => {
          const v = Number(p.valor_venda);
          const a = Number(p.area_privativa);
          return v > 0 && a > 0 ? v / a : null;
        })
        .filter((x) => x != null),
    );
    linhas.push({
      bairro: b,
      nA: aptos.length,
      nC: casaConj.length,
      medA,
      medC,
      m2A,
      m2C,
      spread: medC && medA ? ((medC - medA) / medA) * 100 : null,
    });
  }
});
linhas
  .sort((x, y) => (y.medA || 0) - (x.medA || 0))
  .forEach((l) => {
    console.log(
      `  ${l.bairro} | apto n=${l.nA} med=${fmtR(l.medA)} R$/m²=${fmtR(Math.round(l.m2A || 0))} | casa n=${l.nC} med=${fmtR(l.medC)} R$/m²=${fmtR(Math.round(l.m2C || 0))} | casa-vs-apto: ${l.spread?.toFixed(1)}%`,
    );
  });

// ----- 7. Tickets de entrada por tipo -----
console.log('\n=== 7. Tickets de entrada (mais barato no estoque) ===');
const cheapest = (arr, label) => {
  if (!arr.length) {
    console.log(`  ${label}: (sem)`);
    return;
  }
  const sorted = arr
    .filter((p) => Number(p.valor_venda) > 0)
    .sort((a, b) => a.valor_venda - b.valor_venda);
  if (!sorted.length) {
    console.log(`  ${label}: (sem valor)`);
    return;
  }
  const top3 = sorted.slice(0, 3);
  console.log(`  ${label}:`);
  top3.forEach((p) =>
    console.log(
      `    ${p.codigo} | ${p.bairro} | ${fmtR(p.valor_venda)} | ${p.dormitorios}Q ${p.vagas}V ${p.area_privativa}m²`,
    ),
  );
};
cheapest(aptosTodos, 'Apartamento');
cheapest(casas, 'Casa');
cheapest(sobrados, 'Sobrado');
cheapest(condoCasas, 'Casa em Condomínio');
cheapest(studios, 'Studio (categoria)');

// ----- Tickets HIGH -----
console.log('\n=== 7b. Tetos por tipo (mais caro no estoque) ===');
const highest = (arr, label) => {
  if (!arr.length) return;
  const sorted = arr
    .filter((p) => Number(p.valor_venda) > 0)
    .sort((a, b) => b.valor_venda - a.valor_venda);
  if (!sorted.length) return;
  const top3 = sorted.slice(0, 3);
  console.log(`  ${label}:`);
  top3.forEach((p) =>
    console.log(
      `    ${p.codigo} | ${p.bairro} | ${fmtR(p.valor_venda)} | ${p.dormitorios}Q ${p.vagas}V ${p.area_privativa}m²`,
    ),
  );
};
highest(aptosTodos, 'Apartamento');
highest(casas, 'Casa');
highest(sobrados, 'Sobrado');
highest(condoCasas, 'Casa em Condomínio');

// ----- 8. Stats agregadas pra "tem condomínio?" e "tem vagas?" — área, dorms -----
console.log('\n=== 8. Distribuição de dormitórios e vagas por tipo ===');
const dist = (arr, field) => {
  const map = {};
  arr.forEach((p) => {
    const v = p[field] ?? '(null)';
    map[v] = (map[v] || 0) + 1;
  });
  return Object.entries(map)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([k, n]) => `${k}=${n}`)
    .join(', ');
};
console.log(`  Apto - dormitórios: ${dist(aptosTodos, 'dormitorios')}`);
console.log(`  Apto - vagas:       ${dist(aptosTodos, 'vagas')}`);
console.log(`  Casa - dormitórios: ${dist([...casas, ...sobrados, ...condoCasas], 'dormitorios')}`);
console.log(`  Casa - vagas:       ${dist([...casas, ...sobrados, ...condoCasas], 'vagas')}`);

// ----- Condomínio mediano apto -----
const condoApto = aptosTodos.map((p) => Number(p.valor_condominio)).filter((x) => x > 1);
console.log(`\nCondomínio mediano (apto, valor>1): ${fmtR(median(condoApto))} (n c/ dado=${condoApto.length})`);
const condoCasa = [...casas, ...sobrados, ...condoCasas].map((p) => Number(p.valor_condominio)).filter((x) => x > 1);
console.log(`Condomínio mediano (casa+sobrado+condo, valor>1): ${fmtR(median(condoCasa))} (n c/ dado=${condoCasa.length})`);

// ----- Áreas medianas -----
console.log('\n=== Áreas medianas (m² privativa) ===');
console.log(`  Apto: ${median(aptosTodos.map((p) => Number(p.area_privativa)).filter((x) => x > 0))?.toFixed(1)} m²`);
console.log(`  Casa: ${median(casas.map((p) => Number(p.area_privativa)).filter((x) => x > 0))?.toFixed(1)} m²`);
console.log(`  Sobrado: ${median(sobrados.map((p) => Number(p.area_privativa)).filter((x) => x > 0))?.toFixed(1)} m²`);
console.log(`  Casa em Condomínio: ${median(condoCasas.map((p) => Number(p.area_privativa)).filter((x) => x > 0))?.toFixed(1)} m²`);
