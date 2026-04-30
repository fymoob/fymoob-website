/**
 * BlockNote schema config — declara os blocos default + customs FYMOOB.
 *
 * Importado pelo ArticleEditor (cliente). Server-side, BlockRenderer.tsx
 * mapeia 1:1 cada `type` aqui pro componente publico em `lib/mdx-components.tsx`.
 *
 * Ordem dos custom blocks no slash menu segue a frequencia de uso real
 * (callout > metodologia > faq > cta > changelog > imovel destaque).
 */

import {
  BlockNoteSchema,
  defaultBlockSpecs,
} from "@blocknote/core"

import { calloutBlock } from "./blocks/callout-block"
import { methodologyBlock } from "./blocks/methodology-block"
import { ctaBlock } from "./blocks/cta-block"
import { changelogBlock } from "./blocks/changelog-block"
import { faqItemBlock } from "./blocks/faq-item-block"
import { imovelDestaqueBlock } from "./blocks/imovel-destaque-block"

// `createReactBlockSpec` devolve uma factory `(options?) => BlockSpec`. O
// schema espera o BlockSpec direto — entao chamamos cada factory com `()`.
export const fymoobSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    calloutBox: calloutBlock(),
    methodologyBox: methodologyBlock(),
    ctaBox: ctaBlock(),
    changelog: changelogBlock(),
    faqItem: faqItemBlock(),
    imovelDestaque: imovelDestaqueBlock(),
  },
})

export type FymoobBlock = typeof fymoobSchema.Block
export type FymoobEditor = typeof fymoobSchema.BlockNoteEditor
