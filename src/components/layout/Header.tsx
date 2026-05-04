// Server Component shell — dynamic imports the client-side Header
// This ensures the Header's JS (Sheet, DropdownMenu, scroll listeners)
// is code-split and doesn't block initial page render
import dynamic from "next/dynamic"

// Sem loading skeleton (04/05/2026): o skeleton anterior ("fixed top-0
// h-16 border-b") era renderizado no HTML estatico ate o HeaderClient
// hidratar. Em paginas como /empreendimento/* onde o HeaderClient retorna
// null (a pagina tem nav editorial proprio), o skeleton aparecia como
// faixa fina sobre o hero. Sem skeleton, a hidratacao e tao rapida que
// o flash visual e imperceptivel; e em paginas com Header proprio nao
// tem CLS porque o HeaderClient aplica seu proprio spacer (<div h-16/>)
// imediatamente na primeira renderizacao client.
const HeaderClient = dynamic(
  () => import("./HeaderClient").then((m) => ({ default: m.HeaderClient })),
  { loading: () => null }
)

export function Header() {
  return <HeaderClient />
}
