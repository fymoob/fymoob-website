import Link from "next/link"
import { ExternalLink, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/%F0%9F%9F%A2+Fymoob/@-25.4722847,-49.3053924,1414m/data=!3m1!1e3!4m8!3m7!1s0x94dcfbccb62e3229:0x6977db3f3145d493!8m2!3d-25.4722896!4d-49.3028175!9m1!1b1!16s%2Fg%2F11fd7g02qy?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D"

const avaliacoes = [
  {
    nome: "Christina Silva",
    texto: "Atendimento impecável, consegui realizar o sonho da casa própria, através do atendimento do Bruno e após uns anos foi a vez da minha filha realizar o sonho e sim o Bruno estava junto em mais uma conquista. Indico de olhos fechados, pois entrega um atendimento humanizado, procurando atender a necessidade de cada cliente.",
    foto: "https://lh3.googleusercontent.com/a/ACg8ocKYIzGQghB8Mi2GF_E4xplwtLq2_s2D29iYG-kN51Pkc73h4A=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Andgelica Schneider",
    texto: "O corretor Lisboa atende com dedicação, empatia e muita atenção! Sempre faz tudo o que é possível para resolver os impasses que possam dificultar a locação. Além de ser muito honesto e ético em relação as informações do imóvel. Super recomendo os serviços do Lisboa.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVgepoij330vmu_Y61uRQz1NSoRo7MC4ZTDF2ONkopmxhH0fAQ=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Dyego Pessoa",
    texto: "Muito profissionalismo nos atendimentos e sempre dispostos a auxiliar seus clientes encontrarem os lares ideais! Não buscam só atender, mas sim compreender a necessidade! Parabéns e muito obrigado por tudo!",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjUhf3r5N5uQVUrOn1qsSXxXBaIymiJhxabZLjtcyYlCsStp2V8=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Viviane Souza",
    texto: "Atendimento excelente, Bruno nos deixa sempre a par dos processos, tirando dúvidas e sempre com os prazos, vc nunca fica perdido. Tenta sempre ajustar os horarios para melhor te atender. Imobiliária de fácil localização.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVWCGOdxWsdiT5t4ZsLmyvbBv7DUmytlPVgCFDfhzhUBNds3AY=w128-h128-p-rp-mo-ba5-br100",
    estrelas: 5,
  },
  {
    nome: "Wagner Lima",
    texto: "Profissional Bruno é diferenciado, atencioso, paciente, conduziu todo o processo com muita competência. Certamente realizaremos muitos outros negócios, sempre é bom contar com profissionais que fazem a diferença.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVPlkj-Qq25ADuXh_1UfrjtCvnvyoqAdDWfh08W64oJGnBshhi4=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Josiane Cardoso",
    texto: "Foi incrível, atendimento excelente, simpatia, profissionalismo. Me ajudou em tudo que precisei, não deixou nenhuma dúvida. Esclarecimento perfeito. Eu super recomendo o trabalho deles.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjXWZfrGVCXvrLz6gd7kvL597LKAuBx-sOLlK__Xif6jt0PCMg7WJA=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
  {
    nome: "Luana Alves Pereira",
    texto: "Queria deixar meus agradecimento a Imobiliária FYMOOB e a Corretora Joziane. Muito atenciosos e prestativos. Venderam nosso apartamento em 2 meses. Meu parabéns!",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjVoa51pGCCWCE9zAJWMJex3-DSC05xXksouQu81NrmxkDaESpZe-w=w128-h128-p-rp-mo-ba2-br100",
    estrelas: 5,
  },
  {
    nome: "Maria Eduarda",
    texto: "Atenciosos, competentes, um serviço completo de qualidade e rapidez. Joziane é uma corretora excelente e muito simpática.",
    foto: "https://lh3.googleusercontent.com/a-/ALV-UjXzUN4VfBRN4yZGku13QZGhhAYspC45fg13NtB_8m5KCaB7sDW9=w128-h128-p-rp-mo-br100",
    estrelas: 5,
  },
]

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function ReviewCard({ av, compact }: { av: typeof avaliacoes[0]; compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border border-neutral-100 bg-white shadow-sm transition hover:shadow-md",
        compact ? "p-5" : "p-6"
      )}
    >
      <Stars count={av.estrelas} />
      <p className={cn(
        "mt-3 flex-1 leading-relaxed text-neutral-600",
        compact ? "line-clamp-3 text-[13px]" : "text-[13px]"
      )}>
        &ldquo;{av.texto}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-neutral-50 pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={av.foto}
          alt={av.nome}
          width={36}
          height={36}
          className="size-9 rounded-full bg-neutral-200"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div>
          <p className="text-sm font-medium text-neutral-900">{av.nome}</p>
          <p className="text-xs text-neutral-400">via Google</p>
        </div>
      </div>
    </div>
  )
}

interface GoogleReviewsProps {
  variant?: "full" | "compact"
}

export function GoogleReviews({ variant = "full" }: GoogleReviewsProps) {
  const isCompact = variant === "compact"
  const items = isCompact ? avaliacoes.slice(0, 4) : avaliacoes

  return (
    <div className={isCompact ? "" : "text-center"}>
      {/* Header badge */}
      <div className={cn("flex items-center gap-4", isCompact ? "" : "justify-center flex-col")}>
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-sm">
          <GoogleIcon />
          <span className="text-sm font-semibold text-neutral-900">4.9</span>
          <Stars count={5} />
          <span className="text-sm text-neutral-500">(56)</span>
        </div>

        {isCompact ? (
          <h2 className="font-display text-xl font-semibold tracking-tight text-neutral-950 md:text-3xl md:font-bold">
            O que nossos clientes dizem
          </h2>
        ) : (
          <>
            <h2 className="mt-6 font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              O que nossos clientes dizem
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
              Avaliações reais do Google de quem confiou na FYMOOB para encontrar o imóvel ideal.
            </p>
          </>
        )}
      </div>

      {/* Grid */}
      <div className={cn(
        "mt-8 grid gap-5",
        isCompact
          ? "sm:grid-cols-2 lg:grid-cols-4"
          : "mt-10 sm:grid-cols-2 lg:grid-cols-4"
      )}>
        {items.map((av) => (
          <ReviewCard key={av.nome} av={av} compact={isCompact} />
        ))}
      </div>

      {/* CTA */}
      <div className={cn("mt-6", isCompact ? "flex items-center justify-between" : "mt-8 text-center")}>
        {isCompact ? (
          <Link
            href="/sobre"
            className="text-sm font-medium text-brand-primary transition hover:underline"
          >
            Ver todas as avaliações
          </Link>
        ) : (
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition hover:underline"
          >
            Ver todas as 56 avaliações no Google
            <ExternalLink className="size-4" />
          </a>
        )}
      </div>
    </div>
  )
}
