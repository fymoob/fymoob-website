/**
 * Slash menu PT-BR — mescla items default do BlockNote com customs FYMOOB.
 *
 * Cada item custom insere o bloco vazio na posicao do cursor; o usuario
 * preenche os props inline depois (via inputs do React block spec).
 */

import { filterSuggestionItems } from "@blocknote/core"
import {
  getDefaultReactSlashMenuItems,
  type DefaultReactSuggestionItem,
} from "@blocknote/react"
import {
  Lightbulb,
  Megaphone,
  HelpCircle,
  Send,
  History,
  Building,
} from "lucide-react"
import type { FymoobEditor } from "./article-editor-schema"

function getCustomSlashMenuItems(
  editor: FymoobEditor
): DefaultReactSuggestionItem[] {
  return [
    {
      title: "Aviso (Callout)",
      subtext: "Caixa colorida pra destacar info, alerta ou aviso",
      aliases: ["aviso", "callout", "info", "alerta", "destaque"],
      group: "FYMOOB",
      icon: <Lightbulb size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "calloutBox" as const }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
    {
      title: "Metodologia",
      subtext: "Bloco YMYL: período, amostra, fontes, próxima revisão",
      aliases: ["metodologia", "methodology", "ymyl", "fontes"],
      group: "FYMOOB",
      icon: <Megaphone size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "methodologyBox" }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
    {
      title: "Pergunta FAQ",
      subtext: "Pergunta + resposta. 2+ no post viram schema FAQPage",
      aliases: ["faq", "pergunta", "duvida"],
      group: "FYMOOB",
      icon: <HelpCircle size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "faqItem" }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
    {
      title: "Chamada (CTA)",
      subtext: "Caixa de ação com botão pra fale-com-corretor",
      aliases: ["cta", "chamada", "botao", "lead"],
      group: "FYMOOB",
      icon: <Send size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "ctaBox" }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
    {
      title: "Histórico de atualizações",
      subtext: "Lista de correções/edições do artigo (E-E-A-T)",
      aliases: ["changelog", "historico", "atualizacoes", "correcao"],
      group: "FYMOOB",
      icon: <History size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "changelog" }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
    {
      title: "Imóvel em destaque",
      subtext: "Card linkado pra um imóvel real do CRM Loft",
      aliases: ["imovel", "destaque", "loft", "card"],
      group: "FYMOOB",
      icon: <Building size={16} />,
      onItemClick: () => {
        editor.insertBlocks(
          [{ type: "imovelDestaque" }],
          editor.getTextCursorPosition().block,
          "after"
        )
      },
    },
  ]
}

/**
 * Builder usado pelo `SuggestionMenuController.getItems` no ArticleEditor.
 * Mescla default (block manipulation) + custom (FYMOOB).
 */
export async function buildSlashMenuItems(
  editor: FymoobEditor,
  query: string
): Promise<DefaultReactSuggestionItem[]> {
  const items = [
    ...getDefaultReactSlashMenuItems(editor),
    ...getCustomSlashMenuItems(editor),
  ]
  return filterSuggestionItems(items, query)
}
