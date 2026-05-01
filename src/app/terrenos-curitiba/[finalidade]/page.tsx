import { createTipoFinalidadePage } from "@/app/_templates/tipo-finalidade-page"

export const { generateStaticParams, generateMetadata, default: default_ } =
  createTipoFinalidadePage({
    tipo: "Terreno",
    tipoPlural: "Terrenos",
    tipoSlug: "terrenos",
  })

export default default_
