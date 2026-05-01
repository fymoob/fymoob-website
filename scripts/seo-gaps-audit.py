"""
Auditoria SEO completa — fetcha cada pagina publica do site e extrai:
- Title (length, has number/year/brackets/power words)
- Description (length, has number/credibility marker)
- H1 (visible, has number)
- Schemas presentes
- FAQ count
- Word count
- OG image
- Canonical
- Internal links count

Modos:
  python seo-gaps-audit.py            -> sample (70 paginas)
  python seo-gaps-audit.py --all      -> todas paginas do sitemap (588 URLs)

Sai como JSON pra eu compilar em report markdown.
"""
import os
import re
import json
import sys
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor

BASE = "https://fymoob.com.br"

# Modo "all": carrega URLs do arquivo all-urls-sitemap.txt
ALL_URLS_FILE = r"C:\Users\Vine\fymoob\docs\seo-reports\all-urls-sitemap.txt"


def load_all_urls():
    if not os.path.exists(ALL_URLS_FILE):
        return []
    with open(ALL_URLS_FILE, "r", encoding="utf-8") as f:
        return [
            line.strip().replace(BASE, "") for line in f if line.strip()
        ]


# Paginas pra auditar (URLs canonicas)
PAGES = [
    # Top level
    "/",
    # Institucional
    "/sobre", "/contato", "/anuncie", "/faq",
    # Search/Interactive (low priority)
    "/busca",
    # Tipo landings
    "/apartamentos-curitiba",
    "/apartamentos-curitiba/venda",
    "/apartamentos-curitiba/aluguel",
    "/casas-curitiba",
    "/casas-curitiba/venda",
    "/casas-curitiba/aluguel",
    "/sobrados-curitiba",
    "/sobrados-curitiba/venda",
    "/terrenos-curitiba",
    "/terrenos-curitiba/venda",
    "/terrenos-curitiba/aluguel",
    # Bairros (top 10)
    "/imoveis/portao",
    "/imoveis/batel",
    "/imoveis/agua-verde",
    "/imoveis/bigorrilho",
    "/imoveis/ecoville",
    "/imoveis/centro",
    "/imoveis/cabral",
    "/imoveis/juveve",
    "/imoveis/cristo-rei",
    "/imoveis/mossungue",
    # Bairro+tipo (top 5)
    "/imoveis/portao/apartamentos",
    "/imoveis/batel/apartamentos",
    "/imoveis/agua-verde/apartamentos",
    "/imoveis/portao/casas",
    "/imoveis/portao/sobrados",
    # Preco
    "/imoveis/preco/ate-300-mil",
    "/imoveis/preco/300-a-500-mil",
    "/imoveis/preco/500-mil-a-1-milhao",
    "/imoveis/preco/1-a-3-milhoes",
    "/imoveis/preco/acima-3-milhoes",
    # Imovel individual (sample 3)
    "/imovel/apartamento-cabral-curitiba-pr-3-quartos-106.2m2-AP00296",
    "/imovel/apartamento-bigorrilho-curitiba-pr-2-quartos-126m2-AP00539",
    # Empreendimento (sample 4)
    "/empreendimento/reserva-barigui",
    "/empreendimento/le-monde",
    "/empreendimento/orfeu",
    "/empreendimento/myta",
    # Listings
    "/lancamentos",
    "/empreendimentos",
    # Pillars
    "/comprar-imovel-curitiba",
    "/comprar-apartamento-curitiba",
    "/morar-em-curitiba",
    "/alugar-curitiba",
    # Blog
    "/blog",
    "/blog/checklist-compra-imovel",
    "/blog/financiamento-caixa-itau-bradesco-comparativo",
    "/blog/custo-de-vida-curitiba",
    "/blog/melhores-bairros-curitiba-2026",
    "/blog/itbi-curitiba-valor-como-pagar",
    "/blog/mercado-imobiliario-curitiba-2026",
    "/blog/quanto-custa-morar-batel-curitiba",
    "/blog/preco-metro-quadrado-curitiba-bairro",
    "/blog/melhores-bairros-familias-curitiba",
    "/blog/imovel-planta-vs-pronto-curitiba",
    "/blog/apartamento-ou-casa-curitiba",
    "/blog/batel-vs-agua-verde-curitiba",
    "/blog/ecoville-vs-bigorrilho-curitiba",
    "/blog/documentos-comprar-imovel-curitiba",
    "/blog/como-financiar-minha-casa-minha-vida",
    # Guias (top 5)
    "/guia/portao",
    "/guia/agua-verde",
    "/guia/batel",
    "/guia/centro",
    "/guia/bigorrilho",
    # Institucionais
    "/politica-de-privacidade",
    "/politica-editorial",
]

# Power words em PT-BR pra setor imobiliario
POWER_WORDS = [
    "definitivo", "completo", "atualizado", "guia", "tabela", "comparativo",
    "real", "quanto custa", "como funciona", "vale a pena", "melhor",
    "fipezap", "creci", "caixa", "bradesco", "itau",
]

CREDIBILITY_MARKERS = ["fymoob", "creci", "fipezap", "ibge", "caixa"]


def fetch(url):
    """Fetch HTML with bot UA, return string or None on failure."""
    full_url = url if url.startswith("http") else BASE + url
    try:
        req = urllib.request.Request(
            full_url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; SEOAuditBot/1.0)"},
        )
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.read().decode("utf-8", errors="ignore")
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as e:
        return None


def analyze(url, html):
    """Extract SEO metrics from HTML."""
    if not html:
        return {"url": url, "error": "fetch_failed"}

    out = {"url": url, "size": len(html)}

    # Title
    m = re.search(r"<title[^>]*>([^<]+)</title>", html)
    title = m.group(1).strip() if m else ""
    out["title"] = title
    out["title_len"] = len(title)

    # Title quality flags
    out["title_has_number"] = bool(re.search(r"\d", title))
    out["title_has_year"] = "2026" in title or "2025" in title
    out["title_has_brackets"] = bool(re.search(r"[\[\(]", title))
    out["title_power_words"] = [w for w in POWER_WORDS if w.lower() in title.lower()]
    out["title_in_range"] = 40 <= len(title) <= 65

    # Description
    m = re.search(r'<meta[^>]*name="description"[^>]*content="([^"]+)"', html)
    if not m:
        m = re.search(r'<meta[^>]*content="([^"]+)"[^>]*name="description"', html)
    desc = m.group(1).strip() if m else ""
    out["description"] = desc[:200]
    out["description_len"] = len(desc)
    out["description_in_range"] = 130 <= len(desc) <= 165
    out["description_has_number"] = bool(re.search(r"\d", desc))
    out["description_has_credibility"] = any(c.lower() in desc.lower() for c in CREDIBILITY_MARKERS)

    # H1
    m = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S)
    h1_raw = m.group(1) if m else ""
    h1 = re.sub(r"<[^>]+>", "", h1_raw).strip()
    out["h1"] = h1[:150]
    out["h1_has_number"] = bool(re.search(r"\d", h1))
    out["h1_visible"] = "sr-only" not in (h1_raw or "")

    # Schemas
    schemas = sorted(set(re.findall(r'"@type":\s*"([A-Z][a-zA-Z]+)"', html)))
    out["schemas"] = schemas
    out["has_breadcrumb"] = "BreadcrumbList" in schemas
    out["has_organization"] = "Organization" in schemas
    out["has_realestate"] = any(s in schemas for s in ["RealEstateListing", "Apartment", "House", "Place"])
    out["has_faq_schema"] = "FAQPage" in schemas
    out["faq_questions"] = len(re.findall(r'"@type":"Question"', html))

    # Canonical
    m = re.search(r'<link[^>]*rel="canonical"[^>]*href="([^"]+)"', html)
    out["canonical"] = m.group(1) if m else ""
    out["canonical_correct"] = out["canonical"].startswith("https://fymoob.com.br")

    # OG image
    m = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', html)
    out["og_image"] = bool(m)

    # Word count (rough, only visible body text)
    body = re.sub(r"<script[^>]*>.*?</script>", "", html, flags=re.S)
    body = re.sub(r"<style[^>]*>.*?</style>", "", body, flags=re.S)
    text = re.sub(r"<[^>]+>", " ", body)
    text = re.sub(r"\s+", " ", text)
    out["word_count"] = len(text.split())

    # Internal links count (rough)
    internal_links = re.findall(r'href="(/[^"]*)"', html)
    out["internal_links_count"] = len(internal_links)
    # Distinct internal targets
    out["internal_links_distinct"] = len(set(internal_links))

    return out


def main():
    if "--all" in sys.argv:
        pages = load_all_urls()
        if not pages:
            print("ERROR: all-urls-sitemap.txt nao existe. Gere primeiro com fetch dos sitemap shards.", file=sys.stderr)
            sys.exit(1)
        print(f"Auditing ALL {len(pages)} pages from sitemap...", file=sys.stderr)
        out_path = r"C:\Users\Vine\fymoob\docs\seo-reports\page-audit-all.json"
        max_workers = 15
    else:
        pages = PAGES
        print(f"Auditing {len(pages)} sample pages...", file=sys.stderr)
        out_path = r"C:\Users\Vine\fymoob\docs\seo-reports\page-audit-raw.json"
        max_workers = 10

    results = []
    completed = 0
    with ThreadPoolExecutor(max_workers=max_workers) as ex:
        futures = {ex.submit(fetch, url): url for url in pages}
        for f in futures:
            url = futures[f]
            html = f.result()
            completed += 1
            if completed % 50 == 0:
                print(f"  {completed}/{len(pages)} done", file=sys.stderr)
            results.append(analyze(url, html))

    # Write JSON
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print(f"\nSaved JSON to {out_path}", file=sys.stderr)

    # Print summary apenas se sample mode (pra nao floodar terminal)
    if "--all" not in sys.argv:
        print(f"\n{'PAGE':50s} | T-len | T#?  | Desc-len | FAQ | Schemas | Words")
        print("-" * 130)
        for r in results:
            if "error" in r:
                print(f"{r['url']:50s} | ERROR")
                continue
            print(
                f"{r['url']:50s} | {r['title_len']:5d} | {'Y' if r.get('title_has_number') else 'N':4s} | "
                f"{r['description_len']:8d} | {r['faq_questions']:3d} | {len(r['schemas']):2d}      | "
                f"{r['word_count']:5d}"
            )


if __name__ == "__main__":
    main()
