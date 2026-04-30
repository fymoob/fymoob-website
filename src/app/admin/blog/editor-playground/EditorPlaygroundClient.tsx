"use client"

import { useState } from "react"
import { ArticleEditor } from "@/components/admin/ArticleEditor"
import type { FymoobBlock } from "@/components/admin/article-editor-schema"

export function EditorPlaygroundClient() {
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [blockCount, setBlockCount] = useState(0)

  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 text-xs text-slate-500">
        <span>
          {blockCount} bloco{blockCount === 1 ? "" : "s"} ·{" "}
          {savedAt ? `Snapshot em ${savedAt}` : "Aguardando primeira edição"}
        </span>
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
          Não persiste
        </span>
      </div>
      <div className="px-5 py-6">
        <ArticleEditor
          onChange={(blocks: FymoobBlock[]) => {
            setBlockCount(blocks.length)
            const ts = new Date().toLocaleTimeString("pt-BR")
            setSavedAt(ts)
            // Snapshot serializado pra console — Bruno pode copiar e colar
            // no Sprint 3 pra validar persistencia
            console.log("[playground] snapshot @", ts, blocks)
          }}
        />
      </div>
    </div>
  )
}
