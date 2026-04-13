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

  const hasCond = valorCondominio !== null && valorCondominio >= 1
  const hasIptu = valorIptu !== null && valorIptu >= 1
  const showTaxes = hasCond || hasIptu

  if (showConsult) return null

  const isSaleOnly = !isDual && !isRental

  const taxesGrid = (
    <div className="grid grid-cols-2 gap-4">
      {hasCond && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Condomínio
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {formatPrice(valorCondominio)}
          </p>
        </div>
      )}
      {hasIptu && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            IPTU
          </p>
          <p className="mt-1 text-base font-semibold text-slate-900">
            {formatPrice(valorIptu)}
          </p>
        </div>
      )}
    </div>
  )

  // Sale-only: price already in PropertyHeaderBlock. If there are taxes,
  // render a bare divider + grid (no bordered card).
  if (isSaleOnly) {
    if (!showTaxes) return null
    return (
      <div className="lg:hidden">
        <div className="h-px w-full bg-slate-200" />
        <div className="mt-4">{taxesGrid}</div>
      </div>
    )
  }

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
      ) : (
        <div className="flex items-baseline justify-between">
          <p className="text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoAluguel ?? precoVenda)}
            <span className="text-sm font-normal text-slate-500"> /mês</span>
          </p>
          <span className="text-sm font-medium text-slate-400">Aluguel</span>
        </div>
      )}

      {showTaxes && (
        <>
          <div className="mt-4 h-px w-full bg-slate-200" />
          <div className="mt-4">{taxesGrid}</div>
          {showTotal && (
            <p className="mt-3 text-sm font-semibold text-slate-700">
              Aluguel + Condomínio + IPTU = {formatPrice(totalPacote)}/mês
            </p>
          )}
        </>
      )}
    </div>
  )
}
