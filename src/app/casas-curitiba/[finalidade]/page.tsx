import { createTipoFinalidadePage } from "@/app/_templates/tipo-finalidade-page"

export const { generateStaticParams, generateMetadata, default: default_ } =
  createTipoFinalidadePage({
    tipo: "Casa",
    tipoPlural: "Casas",
    tipoSlug: "casas",
  })

export default default_
