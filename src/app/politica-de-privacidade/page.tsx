import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/seo/Breadcrumbs"

export const metadata: Metadata = {
  title: "Política de Privacidade | FYMOOB Imobiliária",
  description:
    "Política de Privacidade da FYMOOB Administradora de Imóveis LTDA. Conheça como tratamos seus dados pessoais conforme a LGPD (Lei 13.709/2018).",
  alternates: { canonical: "/politica-de-privacidade" },
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidadePage() {
  return (
    <main className="bg-white">
      <section className="border-b border-neutral-100 bg-neutral-50">
        <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", url: "/" },
              { name: "Política de Privacidade", url: "/politica-de-privacidade" },
            ]}
          />
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          Última atualização: 15 de abril de 2026
        </p>

        <div className="prose prose-neutral mt-10 max-w-none text-neutral-700">
          <h2 className="font-display text-xl font-semibold text-neutral-950">1. Quem somos</h2>
          <p>
            <strong>FYMOOB Administradora de Imóveis LTDA</strong>, inscrita no CNPJ nº{" "}
            <strong>54.209.379/0001-73</strong>, CRECI J 9420, com sede na Rua Engenheiro Heitor
            Soares Gomes, 778, Portão, Curitiba/PR, CEP 80330-350 (&quot;FYMOOB&quot;, &quot;nós&quot;),
            é a controladora dos dados pessoais coletados através deste site.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            2. Quais dados coletamos
          </h2>
          <p>Coletamos apenas os dados necessários para atender sua solicitação:</p>
          <ul>
            <li>
              <strong>Dados de identificação e contato</strong>: nome completo, email, telefone
            </li>
            <li>
              <strong>Conteúdo da mensagem</strong>: texto que você escreve nos formulários
            </li>
            <li>
              <strong>Dados de navegação</strong>: endereço IP, navegador, páginas visitadas
              (via Google Analytics — anonimizado)
            </li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            3. Como usamos seus dados
          </h2>
          <p>Seus dados são usados exclusivamente para:</p>
          <ul>
            <li>Responder seu contato e apresentar imóveis relevantes</li>
            <li>Cadastrar seu interesse no nosso sistema de gestão (CRM Loft/Vista)</li>
            <li>Enviar atualizações sobre imóveis compatíveis com seu perfil</li>
            <li>Cumprir obrigações legais e regulatórias (CRECI, COFECI)</li>
            <li>Analisar o desempenho do site para melhorias (estatísticas agregadas)</li>
          </ul>
          <p>
            <strong>Nunca vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros
            para fins comerciais.</strong>
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            4. Base legal (LGPD)
          </h2>
          <p>Tratamos seus dados com base em:</p>
          <ul>
            <li>
              <strong>Consentimento</strong> (Art. 7º, I): ao marcar a caixa de aceite no formulário
            </li>
            <li>
              <strong>Execução de contrato ou procedimentos preliminares</strong> (Art. 7º, V):
              quando você solicita informações sobre um imóvel
            </li>
            <li>
              <strong>Legítimo interesse</strong> (Art. 7º, IX): análises agregadas de uso do site
              para melhoria de experiência
            </li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            5. Com quem compartilhamos
          </h2>
          <p>Compartilhamos dados apenas com:</p>
          <ul>
            <li>
              <strong>Loft/Vista CRM</strong>: nosso sistema de gestão imobiliária (hospedagem no
              Brasil)
            </li>
            <li>
              <strong>Provedores de infraestrutura</strong>: Vercel (hospedagem), Upstash (cache),
              Cloudflare (proteção anti-bot), Resend (envio de email transacional) — todos em
              conformidade com LGPD e GDPR
            </li>
            <li>
              <strong>Google Analytics</strong>: estatísticas de navegação, com anonimização de IP
            </li>
            <li>
              <strong>Autoridades competentes</strong>: quando exigido por lei ou ordem judicial
            </li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            6. Por quanto tempo guardamos
          </h2>
          <ul>
            <li>
              <strong>Dados de contato ativo</strong>: enquanto houver relacionamento (mínimo 5 anos
              conforme legislação imobiliária)
            </li>
            <li>
              <strong>Cookies e dados de navegação</strong>: até 26 meses (Google Analytics)
            </li>
            <li>
              Após esse período, os dados são anonimizados ou excluídos, salvo obrigação legal de
              retenção mais longa
            </li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            7. Seus direitos (LGPD Art. 18)
          </h2>
          <p>Você pode, a qualquer momento, solicitar:</p>
          <ul>
            <li>Confirmação de que tratamos seus dados</li>
            <li>Acesso aos dados tratados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados a outro fornecedor</li>
            <li>Revogação do consentimento</li>
          </ul>
          <p>
            Para exercer qualquer direito, envie email para{" "}
            <a
              href="mailto:fymoob@gmail.com"
              className="font-medium text-brand-primary hover:underline"
            >
              fymoob@gmail.com
            </a>{" "}
            com a solicitação. Responderemos em até 15 dias úteis.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            8. Segurança dos dados
          </h2>
          <p>
            Aplicamos medidas técnicas e organizacionais adequadas: conexão HTTPS em todo o site,
            acesso restrito e autenticado ao CRM, proteção anti-bot em formulários (Cloudflare
            Turnstile), rate limiting em APIs, e monitoramento de acesso. Em caso de incidente
            grave, comunicaremos você e a ANPD conforme a LGPD (Art. 48).
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">9. Cookies</h2>
          <p>
            Usamos cookies essenciais (para funcionamento do site) e de análise (Google Analytics,
            com IP anonimizado). Você pode bloquear cookies nas configurações do seu navegador —
            isso pode limitar funcionalidades como favoritos e comparação de imóveis.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            10. Transferência internacional
          </h2>
          <p>
            Alguns provedores de infraestrutura (Vercel, Resend, Cloudflare, Google) podem processar
            dados fora do Brasil, em países com níveis de proteção adequados conforme reconhecidos
            pela ANPD. Aplicamos cláusulas contratuais padrão e garantias adicionais quando
            necessário.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            11. Menores de idade
          </h2>
          <p>
            Nosso site não é direcionado a menores de 18 anos. Não coletamos conscientemente dados
            de menores. Se identificar dados de menor, entre em contato e removeremos.
          </p>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            12. Contato (Encarregado de Dados — DPO)
          </h2>
          <p>
            Dúvidas sobre esta Política ou sobre o tratamento dos seus dados:
          </p>
          <ul>
            <li>
              <strong>Email</strong>:{" "}
              <a
                href="mailto:fymoob@gmail.com"
                className="font-medium text-brand-primary hover:underline"
              >
                fymoob@gmail.com
              </a>
            </li>
            <li>
              <strong>Telefone</strong>: (41) 99978-0517
            </li>
            <li>
              <strong>Endereço</strong>: Rua Engenheiro Heitor Soares Gomes, 778, Portão, Curitiba/PR
            </li>
            <li>
              <strong>Autoridade Nacional (ANPD)</strong>:{" "}
              <a
                href="https://www.gov.br/anpd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary underline"
              >
                gov.br/anpd
              </a>
            </li>
          </ul>

          <h2 className="mt-8 font-display text-xl font-semibold text-neutral-950">
            13. Alterações nesta Política
          </h2>
          <p>
            Podemos atualizar esta política. Mudanças relevantes serão comunicadas no site e, quando
            aplicável, por email. A data da última atualização está no topo desta página.
          </p>

          <hr className="my-10 border-neutral-200" />

          <p className="text-sm text-neutral-500">
            Esta política é complementar à{" "}
            <Link
              href="/politica-editorial"
              className="font-medium text-brand-primary hover:underline"
            >
              Política Editorial
            </Link>{" "}
            do site.
          </p>
        </div>
      </article>
    </main>
  )
}
