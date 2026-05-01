import { createTipoFinalidadePage } from "@/app/_templates/tipo-finalidade-page"

export const { generateStaticParams, generateMetadata, default: default_ } =
  createTipoFinalidadePage({
    tipo: "Apartamento",
    tipoPlural: "Apartamentos",
    tipoSlug: "apartamentos",
  })

export default default_
