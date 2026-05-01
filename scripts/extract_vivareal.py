import re

filepath = r'C:\Users\Vine\.claude\projects\c--Users-Vine-fymoob\eb9e61b7-ba03-4a3b-bc7a-22a8cfa46c8c\tool-results\b6kj67jl1.txt'
with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

def clean(s):
    return re.sub(r'<[^>]+>', '', s).strip()

print('HTML length:', len(html))

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
for prop in ['og:title', 'og:description', 'og:type']:
    m = re.search(r'<meta\s[^>]*property=["\']' + re.escape(prop) + r'["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
    if not m:
        m = re.search(r'<meta\s[^>]*content="([^"]+)"[^>]*property=["\']' + re.escape(prop) + r'["\']', html, re.IGNORECASE)
    print(f'\n=== {prop.upper()} ===')
    print(m.group(1).strip() if m else 'NOT FOUND')

# twitter card
tw = re.search(r'<meta\s[^>]*name=["\']twitter:card["\'][^>]*content="([^"]+)"', html, re.IGNORECASE)
print('\n=== TWITTER:CARD ===')
print(tw.group(1).strip() if tw else 'NOT FOUND')

# H1
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H1s ===')
for h in h1s[:5]:
    c = clean(h)
    if c: print(repr(c))

# H2s
h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H2s (first 15) ===')
for h in h2s[:15]:
    c = clean(h)
    if c: print(repr(c))

# H3s
h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.DOTALL | re.IGNORECASE)
print('\n=== H3s (first 10) ===')
for h in h3s[:10]:
    c = clean(h)
    if c: print(repr(c))

# JSON-LD
jsonlds = re.findall(r'<script\s[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f'\n=== JSON-LD BLOCKS: {len(jsonlds)} ===')
for i, j in enumerate(jsonlds[:6]):
    print(f'--- Block #{i+1} (first 600 chars) ---')
    print(j.strip()[:600])

# BreadcrumbList schema
bc = re.search(r'BreadcrumbList', html, re.IGNORECASE)
print('\n=== BREADCRUMB SCHEMA ===', 'FOUND' if bc else 'NOT FOUND')

# FAQPage
faq = re.search(r'FAQPage', html, re.IGNORECASE)
print('=== FAQPage SCHEMA ===', 'FOUND' if faq else 'NOT FOUND')

# ItemList
il = re.search(r'ItemList', html, re.IGNORECASE)
print('=== ItemList SCHEMA ===', 'FOUND' if il else 'NOT FOUND')

# RealEstateListing
rel = re.search(r'RealEstateListing', html, re.IGNORECASE)
print('=== RealEstateListing SCHEMA ===', 'FOUND' if rel else 'NOT FOUND')

# Organization
org = re.search(r'Organization', html, re.IGNORECASE)
print('=== Organization SCHEMA ===', 'FOUND' if org else 'NOT FOUND')

# count claims
count_claims = re.findall(r'[\d.,]+\s*(?:im[oó]ve[il]s?|apartamentos?|resultados?|an[uú]ncios?)', html, re.IGNORECASE)
print('\n=== COUNT CLAIMS ===')
seen = set()
for c in count_claims[:10]:
    s = c.strip()
    if s not in seen:
        seen.add(s)
        print(repr(s))

# visible word count (rough)
body_text = re.sub(r'<script[^>]*>.*?</script>', ' ', html, flags=re.DOTALL|re.IGNORECASE)
body_text = re.sub(r'<style[^>]*>.*?</style>', ' ', body_text, flags=re.DOTALL|re.IGNORECASE)
body_text = re.sub(r'<[^>]+>', ' ', body_text)
words = [w for w in body_text.split() if len(w) > 2 and not w.startswith('__') and not w.startswith('http') and not w.startswith('{')]
print(f'\n=== APPROX VISIBLE WORD COUNT ===')
print(len(words))

# Filter / breadcrumb links
bairro_links = re.findall(r'href="[^"]*(?:bairro|bairros|neighborhood)[^"]*"', html, re.IGNORECASE)
print('\n=== BAIRRO-RELATED LINKS ===', len(bairro_links))
for l in bairro_links[:5]:
    print(l)

# Internal links structure (anchor texts)
nav_links = re.findall(r'<a\s[^>]*href="(/[^"]*)"[^>]*>(.*?)</a>', html, re.DOTALL|re.IGNORECASE)
print('\n=== INTERNAL LINK ANCHORS (first 20) ===')
seen2 = set()
count2 = 0
for href, text in nav_links:
    c = clean(text).strip()
    if c and len(c) > 2 and c not in seen2:
        seen2.add(c)
        print(repr(c), '->', repr(href[:80]))
        count2 += 1
        if count2 >= 20:
            break
