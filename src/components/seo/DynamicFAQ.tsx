// Server Component — zero JS, uses native <details>/<summary>
import { ChevronDown } from "lucide-react"
import { generateFAQPageSchema } from "@/lib/seo"

interface DynamicFAQProps {
  questions: { question: string; answer: string }[]
  title?: string
}

export function DynamicFAQ({ questions, title = "Perguntas frequentes" }: DynamicFAQProps) {
  if (questions.length === 0) return null

  const schema = generateFAQPageSchema(questions)

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 className="mb-4 font-display text-xl font-bold text-neutral-900">
        {title}
      </h2>
      <div className="space-y-2">
        {questions.map((item, index) => (
          <details
            key={index}
            className="group rounded-lg border border-neutral-200 bg-white transition-colors hover:border-neutral-300"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-neutral-800 [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown className="size-4 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="border-t border-neutral-100 px-4 py-3">
              <p className="text-sm leading-relaxed text-neutral-600">{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
