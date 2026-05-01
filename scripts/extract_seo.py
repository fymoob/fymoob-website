import re
import sys

filepath = r'C:\Users\Vine\.claude\projects\c--Users-Vine-fymoob\eb9e61b7-ba03-4a3b-bc7a-22a8cfa46c8c\tool-results\bcim6v7ju.txt'
with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

def clean(s):
    return re.sub(r'<[^>]+>', '', s).strip()

# title
title = re.search(r'<title[^>]*>(.*?)</title>', html, re.DOTALL)
print('=== TITLE ===')
t = title.group(1).strip() if title else 'NOT FOUND'
print(t, f'[{len(t)} chars]')

# meta description
desc = re.search(r'<meta\s[^>]*name=["\']description["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
if not desc:
    desc = re.search(r'<meta\s[^>]*content="([^"]+)"[^>]*name=["\']description["\']', html, re.IGNORECASE)
print('\n=== META DESCRIPTION ===')
d = desc.group(1).strip() if desc else 'NOT FOUND'
print(d, f'[{len(d)} chars]')

# canonical
canon = re.search(r'<link\s[^>]*rel=["\']canonical["\'][^>]*href="([^"]+)"', html, re.IGNORECASE)
if not canon:
    canon = re.search(r'<link\s[^>]*href="([^"]+)"[^>]*rel=["\']canonical["\']', html, re.IGNORECASE)
print('\n=== CANONICAL ===')
print(canon.group(1).strip() if canon else 'NOT FOUND')

# og tags
for prop in ['og:title', 'og:description', 'og:image', 'og:type']:
    m = re.search(r'<meta\s[^>]*property=["\']' + re.escape(prop) + r'["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
    if not m:
        m = re.search(r'<meta\s[^>]*content="([^"]+)"[^>]*property=["\']' + re.escape(prop) + r'["\']', html, re.IGNORECASE)
    print(f'\n=== {prop.upper()} ===')
    print(m.group(1).strip() if m else 'NOT FOUND')

# twitter card
tw = re.search(r'<meta\s[^>]*name=["\']twitter:card["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
print('\n=== TWITTER:CARD ===')
print(tw.group(1).strip() if tw else 'NOT FOUND')

# robots meta
robots = re.search(r'<meta\s[^>]*name=["\']robots["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
print('\n=== META ROBOTS ===')
print(robots.group(1).strip() if robots else 'NOT FOUND')

# H1
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H1s ===')
for h in h1s[:5]:
    c = clean(h)
    if c: print(repr(c))

# H2s
h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H2s ===')
for h in h2s[:12]:
    c = clean(h)
    if c: print(repr(c))

# H3s
h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H3s ===')
for h in h3s[:12]:
    c = clean(h)
    if c: print(repr(c))

# Breadcrumbs (nav/ol with aria-label breadcrumb, or itemtype BreadcrumbList)
bc = re.search(r'BreadcrumbList', html, re.IGNORECASE)
print('\n=== BREADCRUMB SCHEMA ===')
print('FOUND' if bc else 'NOT FOUND')

# JSON-LD blocks
jsonlds = re.findall(r'<script\s[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f'\n=== JSON-LD BLOCKS: {len(jsonlds)} ===')
for i, j in enumerate(jsonlds[:5]):
    print(f'--- Block #{i+1} (first 400 chars) ---')
    print(j.strip()[:400])

# Count visible text words (rough)
body_text = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.DOTALL|re.IGNORECASE)
body_text = re.sub(r'<style[^>]*>.*?</style>', ' ', body_text, flags=re.DOTALL|re.IGNORECASE)
body_text = re.sub(r'<[^>]+>', ' ', body_text)
words = [w for w in body_text.split() if len(w) > 2 and not w.startswith('__') and not w.startswith('http')]
print(f'\n=== APPROX VISIBLE WORD COUNT ===')
print(len(words))

# FAQPage schema
faq = re.search(r'FAQPage', html, re.IGNORECASE)
print('\n=== FAQPage SCHEMA ===')
print('FOUND' if faq else 'NOT FOUND')

# ItemList schema
il = re.search(r'ItemList', html, re.IGNORECASE)
print('\n=== ItemList SCHEMA ===')
print('FOUND' if il else 'NOT FOUND')

# Product schema
prod = re.search(r'"@type":\s*"Product"', html, re.IGNORECASE)
print('\n=== Product SCHEMA ===')
print('FOUND' if prod else 'NOT FOUND')

# Organization schema
org = re.search(r'Organization', html, re.IGNORECASE)
print('\n=== Organization SCHEMA ===')
print('FOUND' if org else 'NOT FOUND')

# filter hints from HTML (aria labels, select names, filter chips)
filters = re.findall(r'(?:aria-label|placeholder|name)="([^"]*(?:quartos?|banheiros?|vaga|preco|valor|tipo|bairro|filter|filtro)[^"]*)"', html, re.IGNORECASE)
print('\n=== FILTER HINTS ===')
for f in filters[:15]:
    print(repr(f))

# imoveis count claim
count_claims = re.findall(r'[\d.,]+\s*(?:im[oó]ve[il]s?|apartamentos?|resultados?)', html, re.IGNORECASE)
print('\n=== COUNT CLAIMS ===')
for c in count_claims[:5]:
    print(repr(c.strip()))
