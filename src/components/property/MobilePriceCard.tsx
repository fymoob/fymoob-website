import { formatPrice } from "@/lib/utils"

interface MobilePriceCardProps {
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: string
  valorCondominio: number | null
  valorIptu: number | null
  valorSeguroIncendio: number | null
  valorFci: number | null
  valorSobConsulta: boolean
}

export function MobilePriceCard({
  precoVenda,
  precoAluguel,
  finalidade,
  valorCondominio,
  valorIptu,
  valorSeguroIncendio,
  valorFci,
  valorSobConsulta,
}: MobilePriceCardProps) {
  const isDual = finalidade === "Venda e Locação" && precoVenda && precoAluguel
  const isRental = !isDual && finalidade !== "Venda"
  const showConsult = valorSobConsulta && !isRental
  const hasRental = Boolean(isDual || isRental)

  const rentalBase = isDual ? precoAluguel : isRental ? (precoAluguel ?? precoVenda) : null
  const totalPacote = rentalBase
    ? rentalBase +
      (valorCondominio ?? 0) +
      (valorIptu ?? 0) +
      (hasRental ? (valorSeguroIncendio ?? 0) + (valorFci ?? 0) : 0)
    : null
  const showTotal = totalPacote && rentalBase && totalPacote > rentalBase

  const hasCond = valorCondominio !== null && valorCondominio >= 1
  const hasIptu = valorIptu !== null && valorIptu >= 1
  const hasSeguro = valorSeguroIncendio !== null && valorSeguroIncendio >= 1
  const hasFci = valorFci !== null && valorFci >= 1

  if (showConsult) return null

  const isSaleOnly = !isDual && !isRental

  const taxCell = (label: string, value: number | null, has: boolean) => (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      {has ? (
        <p className="mt-1 text-base font-semibold text-slate-900">
          {formatPrice(value)}
        </p>
      ) : (
        <p className="mt-1 text-sm italic text-slate-400">Não informado</p>
      )}
    </div>
  )

  const taxesGrid = (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {taxCell("Condomínio", valorCondominio, hasCond)}
      {taxCell("IPTU", valorIptu, hasIptu)}
      {hasRental && taxCell("Seguro Incêndio", valorSeguroIncendio, hasSeguro)}
      {hasRental && taxCell("FCI", valorFci, hasFci)}
    </div>
  )

  // Monthly costs (Cond + IPTU) — shown on sale-only as "Custos mensais estimados"
  // since summing with sale price would mix time scales (total vs monthly).
  const custoMensal = (valorCondominio ?? 0) + (valorIptu ?? 0)
  const showCustoMensal = custoMensal > 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 lg:hidden">
      {isDual ? (
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-extrabold tracking-tight text-slate-900">
              {formatPrice(precoVenda)}
            </p>
            <span className="text-sm font-medium text-slate-400">Venda</span>
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-xl font-bold tracking-tight text-slate-900">
              {formatPrice(precoAluguel)}
              <span className="text-sm font-normal text-slate-500"> /mês</span>
            </p>
            <span className="text-sm font-medium text-slate-400">Aluguel</span>
          </div>
        </div>
      ) : isSaleOnly ? (
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoVenda)}
          </p>
          <span className="text-sm font-medium text-slate-400">Venda</span>
        </div>
      ) : (
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoAluguel ?? precoVenda)}
            <span className="text-sm font-normal text-slate-500"> /mês</span>
          </p>
          <span className="text-sm font-medium text-slate-400">Aluguel</span>
        </div>
      )}

      {/* All variants: always render taxes grid for consistency */}
      <div className="mt-4 h-px w-full bg-slate-200" />
      <div className="mt-4">{taxesGrid}</div>

      {/* Rental/dual: total includes Aluguel + Cond + IPTU + Seguro + FCI */}
      {hasRental && showTotal && (
        <p className="mt-3 text-sm font-semibold text-slate-700">
          Total mensal estimado: {formatPrice(totalPacote)}/mês
        </p>
      )}

      {/* Sale-only: monthly carry cost (Cond + IPTU only — sale price is not monthly) */}
      {isSaleOnly && showCustoMensal && (
        <p className="mt-3 text-sm font-semibold text-slate-700">
          Custos mensais estimados: {formatPrice(custoMensal)}/mês
        </p>
      )}
    </div>
  )
}
