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
  const showTaxes = (isRental || isDual) && (valorCondominio || valorIptu)

  if (showConsult) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:hidden">
      {isDual ? (
        <>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Valor venda
            </p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
              {formatPrice(precoVenda)}
            </p>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Valor aluguel
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {formatPrice(precoAluguel)}
              <span className="text-sm font-normal text-slate-500"> /mês</span>
            </p>
          </div>
        </>
      ) : isRental ? (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Valor aluguel
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoAluguel ?? precoVenda)}
            <span className="text-sm font-normal text-slate-500"> /mês</span>
          </p>
        </div>
      ) : (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Valor venda
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
            {formatPrice(precoVenda ?? precoAluguel)}
          </p>
        </div>
      )}

      {showTaxes && (
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          {valorCondominio && valorCondominio > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Condomínio</span>
              <span className="font-medium text-slate-700">{formatPrice(valorCondominio)}</span>
            </div>
          )}
          {valorIptu && valorIptu > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">IPTU</span>
              <span className="font-medium text-slate-700">{formatPrice(valorIptu)}</span>
            </div>
          )}
          {showTotal && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-2">
              <span className="text-sm font-semibold text-slate-700">Valor total</span>
              <span className="text-lg font-bold text-slate-900">{formatPrice(totalPacote)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
