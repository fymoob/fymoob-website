import type { Metadata } from "next"
import { generateFAQPageSchema } from "@/lib/seo"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"
import { faqData } from "@/data/faq-data"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Perguntas Frequentes | FAQ",
  description:
    "Tire suas dúvidas sobre compra, venda, aluguel e financiamento de imóveis em Curitiba. Perguntas frequentes respondidas pela FYMOOB Imobiliária.",
  alternates: {
    canonical: "/faq",
  },
}

export default function FAQPage() {
  const allQuestions = faqData.flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    }))
  )
  const schema = generateFAQPageSchema(allQuestions)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Home", url: "/" },
            { name: "FAQ", url: "/faq" },
          ]}
        />

        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-fymoob-gray-dark sm:text-4xl">
            Perguntas Frequentes
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-fymoob-gray-mid">
            Tire suas dúvidas sobre compra, venda, aluguel e financiamento de
            imóveis em Curitiba.
          </p>
        </div>

        <div className="space-y-10">
          {faqData.map((category) => (
            <section key={category.id}>
              <h2 className="mb-4 font-display text-xl font-bold text-fymoob-blue">
                {category.title}
              </h2>
              <Accordion>
                {category.items.map((item, index) => (
                  <AccordionItem key={index} value={`${category.id}-${index}`}>
                    <AccordionTrigger className="text-left text-base font-medium text-fymoob-gray-dark">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-fymoob-gray-mid">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-fymoob-blue/20 bg-fymoob-blue/5 p-6 text-center">
          <p className="font-display text-lg font-bold text-fymoob-blue">
            Não encontrou sua resposta?
          </p>
          <p className="mt-2 text-sm text-fymoob-gray-mid">
            Entre em contato conosco pelo WhatsApp ou visite nossa página de
            contato.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://wa.me/554199978-0517"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-fymoob-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fymoob-blue-dark"
            >
              WhatsApp
            </a>
            <a
              href="/contato"
              className="inline-flex items-center rounded-lg border border-fymoob-blue px-5 py-2.5 text-sm font-medium text-fymoob-blue transition-colors hover:bg-fymoob-blue/5"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
