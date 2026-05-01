import { createTipoFinalidadePage } from "@/app/_templates/tipo-finalidade-page"

export const { generateStaticParams, generateMetadata, default: default_ } =
  createTipoFinalidadePage({
    tipo: "Sobrado",
    tipoPlural: "Sobrados",
    tipoSlug: "sobrados",
  })

export default default_
