import { formatPrice } from "@/lib/utils"

interface MobilePriceCardProps {
  precoVenda: number | null
  precoAluguel: number | null
  finalidade: string
  valorCondominio: number | null
  valorIptu: number | null
  valorSobConsulta: boolean
}

export function MobilePriceCard({
  precoVenda,
  precoAluguel,
  finalidade,
  valorCondominio,
  valorIptu,
  valorSobConsulta,
}: MobilePriceCardProps) {
  const isDual = finalidade === "Venda e Locação" && precoVenda && precoAluguel
  const isRental = !isDual && finalidade !== "Venda"
  const showConsult = valorSobConsulta && !isRental

  const rentalBase = isDual ? precoAluguel : isRental ? (precoAluguel ?? precoVenda) : null
  const totalPacote = rentalBase
    ? rentalBase + (valorCondominio ?? 0) + (valorIptu ?? 0)
    : null
  const showTotal = totalPacote && rentalBase && totalPacote > rentalBase

  const hasCond = valorCondominio && valorCondominio > 0
  const hasIptu = valorIptu && valorIptu > 0
  const showTaxes = hasCond || hasIptu

  if (showConsult) return null

  // Sale-only: if there's no Cond/IPTU to show, the price is already in
  // PropertyHeaderBlock — no card needed. Otherwise we render the taxes here.
  const isSaleOnly = !isDual && !isRental
  if (isSaleOnly && !showTaxes) return null

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
      ) : isRental ? (
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoAluguel ?? precoVenda)}
            <span className="text-sm font-normal text-slate-500"> /mês</span>
          </p>
          <span className="text-sm font-medium text-slate-400">Aluguel</span>
        </div>
      ) : null}

      {showTaxes && (
        <div className={(isDual || isRental) ? "mt-3 border-t border-slate-100 pt-3" : ""}>
          <p className="text-sm text-slate-500">
            {hasCond && <>Cond. {formatPrice(valorCondominio)}</>}
            {hasCond && hasIptu && <span className="mx-1.5">·</span>}
            {hasIptu && <>IPTU {formatPrice(valorIptu)}</>}
          </p>
          {showTotal && (
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Aluguel + Condomínio + IPTU = {formatPrice(totalPacote)}/mês
            </p>
          )}
        </div>
      )}
    </div>
  )
}
