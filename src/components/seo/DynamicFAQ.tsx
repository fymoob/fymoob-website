import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
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
      <Accordion>
        {questions.map((item, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium text-neutral-800">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-neutral-600">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
