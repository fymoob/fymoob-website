"use client"

/**
 * ArticleEditor — wrapper client do BlockNote pro corpo de artigos FYMOOB.
 *
 * Recebe `initialContent` (BlockNote JSON) + callback `onChange` que e
 * disparado com debounce (default 5s) pra autosave externo. O caller (rota
 * do admin) passa um onChange que chama server action `saveDraft`.
 *
 * Props:
 * - `initialContent`: Block[] inicial (pode ser undefined em "novo")
 * - `onChange(blocks)`: chamado apos debounce com snapshot serializavel
 * - `imagesEnabled`: liga/desliga upload de imagem inline (default true)
 *
 * Implementacao:
 * - `useCreateBlockNote` cria o editor com schema FYMOOB.
 * - `<BlockNoteView>` renderiza com tema light + dictionary PT-BR.
 * - `SuggestionMenuController` substitui slash menu default pra incluir
 *   os custom blocks FYMOOB.
 * - `uploadFile` config wireado pra `uploadInlineImageAction` (server action).
 */

import { useEffect, useMemo, useRef } from "react"
import { useCreateBlockNote, SuggestionMenuController } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import { pt as ptDictionary } from "@blocknote/core/locales"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"

import { fymoobSchema, type FymoobBlock } from "./article-editor-schema"
import { buildSlashMenuItems } from "./article-editor-slash-menu"
import { uploadInlineImageAction } from "@/app/admin/blog/_editor-actions"

interface ArticleEditorProps {
  /** Snapshot inicial (BlockNote JSON). Undefined cria editor vazio. */
  initialContent?: FymoobBlock[]
  /** Callback de autosave — disparado com debounce. */
  onChange?: (blocks: FymoobBlock[]) => void
  /** Debounce em ms (default 1500). */
  debounceMs?: number
  /** Permite upload de imagens inline (default true). */
  imagesEnabled?: boolean
  /** Editavel? false = read-only (preview). */
  editable?: boolean
}

/**
 * Wrap do upload action pra adaptar ao formato esperado pelo BlockNote
 * (`uploadFile: (file) => Promise<string>` — devolve URL ou throws).
 */
async function uploadFile(file: File): Promise<string> {
  const result = await uploadInlineImageAction(file)
  if ("error" in result) {
    throw new Error(result.error)
  }
  return result.url
}

export function ArticleEditor({
  initialContent,
  onChange,
  debounceMs = 1500,
  imagesEnabled = true,
  editable = true,
}: ArticleEditorProps) {
  // Cria o editor com schema FYMOOB. O hook re-cria se mudarem options
  // referenciais — usar useMemo nao da pq o editor tem identidade propria.
  // Em pratica, pra mesma rota o editor e estavel; trocar de artigo deveria
  // remontar o componente (key={id}).
  const editor = useCreateBlockNote({
    schema: fymoobSchema,
    initialContent: initialContent && initialContent.length > 0 ? initialContent : undefined,
    dictionary: ptDictionary,
    uploadFile: imagesEnabled ? uploadFile : undefined,
  })

  // Debounce do onChange — usa ref pra evitar stale closure. A ref e
  // atualizada dentro de useEffect (regra React: nao tocar refs durante render).
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        const cb = onChangeRef.current
        if (cb) cb(editor.document as FymoobBlock[])
      }, debounceMs)
    })
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      if (typeof unsubscribe === "function") unsubscribe()
    }
  }, [editor, debounceMs])

  // Slash menu custom — desliga o default pra ganhar controle total.
  const slashMenuConfig = useMemo(
    () => ({
      triggerCharacter: "/",
      getItems: async (query: string) => buildSlashMenuItems(editor, query),
    }),
    [editor]
  )

  return (
    <div className="article-editor">
      <BlockNoteView
        editor={editor}
        editable={editable}
        slashMenu={false}
        theme="light"
      >
        <SuggestionMenuController {...slashMenuConfig} />
      </BlockNoteView>
    </div>
  )
}
