/**
 * MDX → BlockNote JSON converter.
 *
 * Estrategia:
 * 1. Extrai componentes MDX customizados (`<MethodologyBox>`, `<CalloutBox>`,
 *    `<CTABox>`, `<Changelog>`) com regex, substituindo cada um por placeholder
 *    serial (`__FYMOOB_BLOCK_0__`, `__FYMOOB_BLOCK_1__`, ...).
 * 2. Pre-processa MDX → markdown puro (mantem placeholders como paragrafos).
 * 3. Parse markdown com `unified + remark-parse + remark-gfm` (tabelas).
 * 4. Walk MDAST, emite BlockNote blocks.
 * 5. Resolve placeholders pra blocos custom no array final.
 *
 * Escopo: cobre os 15 MDX existentes da FYMOOB (Bruno autoral, sem MDX
 * complexo). NAO e parser markdown completo — defensivo o suficiente pra
 * batch one-shot, nao pra entrada arbitraria de usuario.
 */

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import { randomUUID } from "node:crypto"

// ───────────────────────────────────────────────────────────
// Custom MDX block extraction (regex)
// ───────────────────────────────────────────────────────────

/**
 * Captura `<TagName attrs>...</TagName>` ou `<TagName attrs />` (self-closing).
 * Regex permissivo — assume autoria controlada (FYMOOB MDX).
 */
const COMPONENT_RE =
  /<(MethodologyBox|CalloutBox|CTABox|Changelog)([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g

/**
 * Parser simples de atributos JSX: `key="value"` ou `key={...}`. Retorna
 * objeto { key: stringValue }. Tira aspas. Pra `entries={[{date,change}]}`
 * captura o JSON cru entre {} e devolve como string.
 */
function parseJsxAttrs(raw) {
  const attrs = {}
  if (!raw) return attrs
  const re = /(\w+)\s*=\s*(?:"([^"]*)"|\{([^}]*(?:\{[^}]*\}[^}]*)*)\})/g
  let m
  while ((m = re.exec(raw)) !== null) {
    const [, key, strVal, exprVal] = m
    attrs[key] = strVal !== undefined ? strVal : exprVal
  }
  return attrs
}

/**
 * Substitui componentes MDX por placeholders + retorna {markdown, blocks[]}.
 */
function extractCustomBlocks(mdxRaw) {
  const blocks = []
  const markdown = mdxRaw.replace(COMPONENT_RE, (_match, tag, attrsRaw, inner) => {
    const placeholder = `__FYMOOB_BLOCK_${blocks.length}__`
    const attrs = parseJsxAttrs(attrsRaw)
    blocks.push({
      tag,
      attrs,
      inner: inner ? inner.trim() : "",
    })
    return `\n\n${placeholder}\n\n`
  })
  return { markdown, blocks }
}

// ───────────────────────────────────────────────────────────
// Custom block → BlockNote spec
// ───────────────────────────────────────────────────────────

function customBlockToNote(custom) {
  const { tag, attrs, inner } = custom
  switch (tag) {
    case "MethodologyBox":
      return {
        id: randomUUID(),
        type: "methodologyBox",
        props: {
          period: attrs.period ?? "",
          sample: attrs.sample ?? "",
          treatment: attrs.treatment ?? "",
          sources: Array.isArray(attrs.sources)
            ? attrs.sources.join(", ")
            : (attrs.sources ?? ""),
          lastUpdate: attrs.lastUpdate ?? "",
          nextReview: attrs.nextReview ?? "",
        },
        children: [],
      }
    case "CalloutBox": {
      // Inner pode ter markdown inline (negrito, link). Convertemos pra texto
      // simples (sem styles) — se quiser rich, edita no editor depois.
      const text = inner.trim()
      const variant = attrs.variant === "warning" || attrs.variant === "alert"
        ? attrs.variant
        : "info"
      return {
        id: randomUUID(),
        type: "calloutBox",
        props: { variant },
        content: [
          { type: "text", text, styles: {} },
        ],
        children: [],
      }
    }
    case "CTABox":
      return {
        id: randomUUID(),
        type: "ctaBox",
        props: {
          title: attrs.title ?? "",
          description: attrs.description ?? "",
          href: attrs.href ?? "",
          label: attrs.label ?? "",
        },
        children: [],
      }
    case "Changelog": {
      // attrs.entries vem como string crua de `{[{date:'...',change:'...'},...]}`.
      // Tentamos parsear via Function eval (controlado, autoria FYMOOB).
      let entries = []
      if (attrs.entries) {
        try {
          // eslint-disable-next-line no-new-func
          entries = Function(`"use strict"; return (${attrs.entries})`)()
        } catch {
          entries = []
        }
      }
      return {
        id: randomUUID(),
        type: "changelog",
        props: { entries: JSON.stringify(entries) },
        children: [],
      }
    }
    default:
      return null
  }
}

// ───────────────────────────────────────────────────────────
// Markdown AST (mdast) → BlockNote inline content
// ───────────────────────────────────────────────────────────

/**
 * Converte filhos inline de um MDAST node (text, emphasis, strong, inlineCode,
 * link) pra array de InlineContent do BlockNote.
 */
function inlineFromMdast(children = [], baseStyles = {}) {
  const out = []
  for (const node of children) {
    switch (node.type) {
      case "text":
        if (node.value)
          out.push({ type: "text", text: node.value, styles: { ...baseStyles } })
        break
      case "strong":
        out.push(...inlineFromMdast(node.children, { ...baseStyles, bold: true }))
        break
      case "emphasis":
        out.push(...inlineFromMdast(node.children, { ...baseStyles, italic: true }))
        break
      case "delete":
        out.push(...inlineFromMdast(node.children, { ...baseStyles, strike: true }))
        break
      case "inlineCode":
        out.push({
          type: "text",
          text: node.value,
          styles: { ...baseStyles, code: true },
        })
        break
      case "link": {
        // Link pode ter children mistos. Resolvemos pra InlineText[] sem aninhar.
        const linkContent = inlineFromMdast(node.children, baseStyles).filter(
          (n) => n.type === "text"
        )
        out.push({ type: "link", href: node.url, content: linkContent })
        break
      }
      case "break":
        out.push({ type: "text", text: "\n", styles: { ...baseStyles } })
        break
      case "html":
        // Tag HTML solta no markdown — ignora silenciosamente (Bruno usa <br/> as vezes).
        break
      default:
        // Recursao defensiva pra qualquer node com children inline
        if (node.children) out.push(...inlineFromMdast(node.children, baseStyles))
    }
  }
  return out
}

// ───────────────────────────────────────────────────────────
// MDAST → BlockNote blocks
// ───────────────────────────────────────────────────────────

function mdastToBlocks(root, customBlocks) {
  const blocks = []

  for (const node of root.children) {
    blocks.push(...nodeToBlocks(node, customBlocks))
  }

  return blocks
}

function nodeToBlocks(node, customBlocks) {
  switch (node.type) {
    case "heading": {
      const level = Math.min(Math.max(node.depth, 2), 4)
      return [
        {
          id: randomUUID(),
          type: "heading",
          props: { level },
          content: inlineFromMdast(node.children),
          children: [],
        },
      ]
    }

    case "paragraph": {
      // Detecta placeholder de bloco custom — paragrafo com unico text
      // batendo o regex de placeholder.
      const flat = node.children
      if (
        flat.length === 1 &&
        flat[0].type === "text" &&
        /^__FYMOOB_BLOCK_(\d+)__$/.test(flat[0].value.trim())
      ) {
        const m = /^__FYMOOB_BLOCK_(\d+)__$/.exec(flat[0].value.trim())
        const idx = parseInt(m[1], 10)
        const custom = customBlocks[idx]
        if (custom) {
          const block = customBlockToNote(custom)
          return block ? [block] : []
        }
      }

      // Detecta imagem standalone num paragrafo (markdown inline image
      // como unico filho)
      if (flat.length === 1 && flat[0].type === "image") {
        return [
          {
            id: randomUUID(),
            type: "image",
            props: {
              url: flat[0].url,
              caption: flat[0].alt || "",
              previewWidth: 1200,
              name: flat[0].alt || "",
            },
            children: [],
          },
        ]
      }

      return [
        {
          id: randomUUID(),
          type: "paragraph",
          props: {},
          content: inlineFromMdast(node.children),
          children: [],
        },
      ]
    }

    case "list": {
      const blockType = node.ordered ? "numberedListItem" : "bulletListItem"
      const items = []
      for (const item of node.children) {
        // item.children = [paragraph, ...] — pegamos primeiro paragraph como
        // conteudo inline. Sub-listas nao sao suportadas por enquanto.
        const para = item.children.find((c) => c.type === "paragraph")
        items.push({
          id: randomUUID(),
          type: blockType,
          props: {},
          content: para ? inlineFromMdast(para.children) : [],
          children: [],
        })
      }
      return items
    }

    case "blockquote": {
      // Pega primeiro paragraph dentro do blockquote (98% dos casos)
      const inlineNodes = node.children.flatMap((c) =>
        c.type === "paragraph" ? c.children : []
      )
      return [
        {
          id: randomUUID(),
          type: "quote",
          props: {},
          content: inlineFromMdast(inlineNodes),
          children: [],
        },
      ]
    }

    case "code":
      return [
        {
          id: randomUUID(),
          type: "codeBlock",
          props: { language: node.lang || "text" },
          content: [{ type: "text", text: node.value, styles: {} }],
          children: [],
        },
      ]

    case "table": {
      // node.children = [tableRow, ...] — primeira row e header
      const rows = node.children.map((row) => {
        const cells = row.children.map((cell) => inlineFromMdast(cell.children))
        return { cells }
      })
      return [
        {
          id: randomUUID(),
          type: "table",
          props: {},
          content: { type: "tableContent", rows },
          children: [],
        },
      ]
    }

    case "thematicBreak":
      // BlockNote nao tem hr nativo no schema FYMOOB. Vira paragrafo vazio.
      return [
        {
          id: randomUUID(),
          type: "paragraph",
          props: {},
          content: [],
          children: [],
        },
      ]

    case "html": {
      // Tags HTML soltas (ex: <details>, <br/>) — ignoramos. Bruno raramente
      // usa, e quando usa, o conteudo geralmente e duplicado em paragraph.
      return []
    }

    default:
      // Tipo desconhecido — ignora pra nao quebrar conversao
      return []
  }
}

// ───────────────────────────────────────────────────────────
// API publica
// ───────────────────────────────────────────────────────────

/**
 * Converte MDX raw (string completa, com frontmatter ja removido) pra
 * array de BlockNote blocks pronto pra `articles.body`.
 */
export function mdxToBlockNote(mdxBody) {
  const { markdown, blocks: customBlocks } = extractCustomBlocks(mdxBody)
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  return mdastToBlocks(tree, customBlocks)
}
