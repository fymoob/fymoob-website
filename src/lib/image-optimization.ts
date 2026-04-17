/**
 * Helpers pra controlar otimizacao de imagens via Next/Image.
 *
 * Contexto: Vercel Hobby plan limita a 1000 source images/mes. FYMOOB tem
 * 2300+ fotos vindas do CDN Vistahost (234 imoveis × ~10 fotos). Otimizar
 * tudo estoura a quota em horas.
 *
 * Solucao: passar `unoptimized={isVistaImage(src)}` em todos <Image> que
 * possam receber URLs do CDN Vistahost. Bypassa /_next/image, serve direto
 * da origem. CDN Vistahost ja entrega JPG comprimido razoavel + existe
 * FotoDestaquePequena pras versoes mobile.
 *
 * Trade-off aceito:
 * - Perde conversao automatica JPG -> WebP/AVIF do Next (~20-30% smaller)
 * - Perde srcset responsivo (1 tamanho serve pra todos os viewports)
 * - Ganha: imagens voltam a funcionar 100%, zero custo, ISR OK, Pro ($20/mes)
 *   pode ser reavaliado no futuro com dados reais de LCP/Speed Insights
 *
 * Revisar em ~60 dias (pos consolidacao de trafego): se Speed Insights
 * mostrar LCP degradado na faixa de 3s+, vale upgrade Pro. Caso contrario,
 * manter como esta.
 */
export function isVistaImage(src: string | undefined | null): boolean {
  if (typeof src !== "string") return false
  // Qualquer URL do CDN Vistahost. Cobre cdn.vistahost, cdn1.vistahost, etc.
  return src.includes("vistahost.com.br")
}
