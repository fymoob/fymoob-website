# Typewriter Animation Snippet

> Animação de placeholder que digita, pausa, apaga e cicla por frases.
> Inspirado em realtor.com. Revertido do QuickSearch mobile em 15/04/2026.
> **Status:** arquivado. Reutilizável em outros projetos.

## Demonstração

```
"Onde você quer morar?"    ← digita char por char (55ms + jitter)
[pausa 1.6s]
"Onde você quer morar"     ← apaga (30ms por char)
"Onde você quer mor"
"Onde você quer m"
...
""                         ← pausa 400ms
"A"
"Ap"                       ← próxima frase começa
...
```

## Hook (React + TypeScript)

```tsx
import { useState, useEffect } from "react"

const TYPEWRITER_PHRASES = [
  "Onde você quer morar?",
  "Apartamento no Batel?",
  "Casa com 3 quartos?",
  "Imóvel até R$ 500 mil?",
  "Alugar no Água Verde?",
] as const

export function useTypewriter() {
  const [text, setText] = useState<string>(TYPEWRITER_PHRASES[0])
  const [phaseIdx, setPhaseIdx] = useState(0)

  useEffect(() => {
    // Acessibilidade: usuários que pediram menos movimento veem texto estático
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let phraseIdx = 0
    let charIdx = TYPEWRITER_PHRASES[0].length
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const phrase = TYPEWRITER_PHRASES[phraseIdx]
      if (!deleting) {
        // Typing: avança 1 char
        charIdx++
        setText(phrase.slice(0, charIdx))
        if (charIdx === phrase.length) {
          // Chegou ao fim: pausa antes de começar a apagar
          timer = setTimeout(() => { deleting = true; tick() }, 1600)
          return
        }
        // Jitter 30ms para parecer humano, não robótico
        timer = setTimeout(tick, 55 + Math.random() * 30)
      } else {
        // Deleting: volta 1 char
        charIdx--
        setText(phrase.slice(0, charIdx))
        if (charIdx === 0) {
          // Vazio: passa para próxima frase
          deleting = false
          phraseIdx = (phraseIdx + 1) % TYPEWRITER_PHRASES.length
          setPhaseIdx(phraseIdx)
          timer = setTimeout(tick, 400)
          return
        }
        // Apagar é 2x mais rápido que digitar (sensação natural)
        timer = setTimeout(tick, 28 + Math.random() * 15)
      }
    }

    // Primeira frase começa "cheia" — espera 2s para começar a apagar
    timer = setTimeout(() => { deleting = true; tick() }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return { text, key: phaseIdx }
}
```

## Uso no componente

```tsx
export function SearchPill() {
  const typewriter = useTypewriter()

  return (
    <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5">
      <Search className="size-4 text-brand-primary" />
      <p className="flex min-w-0 flex-1 items-center text-sm font-medium text-neutral-800">
        <span className="truncate">{typewriter.text}</span>
        <span
          aria-hidden
          className="ml-0.5 inline-block h-4 w-[2px] shrink-0 animate-[blink_1s_steps(1)_infinite] bg-neutral-800"
        />
      </p>
    </button>
  )
}
```

## Keyframe do cursor piscante

Adicionar ao `globals.css`:

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

## Timings (ajustáveis)

| Parâmetro | Valor | Função |
|---|---|---|
| Type speed | 55ms + 0-30ms jitter | Velocidade de digitação |
| Delete speed | 28ms + 0-15ms jitter | Deletar 2x mais rápido (natural) |
| Pausa ao chegar na frase | 1600ms | Tempo de leitura da frase completa |
| Pausa entre frases | 400ms | Respiro antes da próxima |
| Pausa inicial | 2000ms | Primeira frase renderiza estática |

## Por que foi revertido no FYMOOB

- Distrai do conteúdo principal (hero já tem h1, subtitle, image)
- Layout single-line exigia remover o hint "Bairro · Tipo · Preço"
- Hint era útil para primeiro contato do usuário mobile
- Cliente preferiu layout estático com informação estrutural

## Quando usar em outro projeto

**Bom fit:**
- Landing de SaaS com campo de busca/email como CTA único
- Campo de input em hero vazio (sem outros elementos competindo)
- Produtos onde "variedade de uso" é a mensagem (ex: "escreva um email...", "resuma um pdf...", "analise um csv...")

**Mau fit:**
- Hero já denso com imagem + título + subtítulo
- Usuário precisa agir rápido (B2B)
- Targeting de usuários seniors ou com questões cognitivas
- Dispositivos low-end (embora o custo seja mínimo)

## Performance

- Custo: 1 setTimeout ativo, limpo no unmount
- Sem impacto em Core Web Vitals (roda pós-hydration, só em mobile)
- Sem dependências externas
- Bundle impact: ~300 bytes minified

## Fonte

- Inspiração visual: [realtor.com](https://www.realtor.com/)
- Implementação original: `src/components/search/QuickSearch.tsx` (commit f4d07be, revertido em 2f15983)
