import type { PropertyVideo } from "@/types/property"
import { VideoLazyEmbed } from "@/components/empreendimento/VideoLazyEmbed"

interface PropertyVideosProps {
  videos: PropertyVideo[]
  propertyTitle: string
}

// Monta URL embed pro VideoLazyEmbed conforme Tipo do CRM.
// VideoLazyEmbed aceita youtube.com/embed/{id}, youtube.com/watch?v={id} e
// youtu.be/{id} — extrai o ID via regex e renderiza thumbnail lazy.
// Para mp4 ou URL bruta, devolvemos o videoId direto e o iframe carrega
// o que estiver no campo (geralmente uma URL completa).
function buildEmbedUrl(video: PropertyVideo): string {
  const id = video.videoId.trim()
  // Se ja for URL completa (mp4 hospedado, embed pre-pronto, etc), retorna bruto.
  if (id.startsWith("http://") || id.startsWith("https://") || id.startsWith("//")) {
    return id
  }
  switch (video.tipo) {
    case "youtube":
      return `https://www.youtube.com/embed/${id}`
    case "vimeo":
      return `https://player.vimeo.com/video/${id}`
    default:
      // Tipo desconhecido (mp4 sem URL completa, custom) — assume YouTube ID
      // como fallback mais comum no fluxo do Wagner. Se Vista expor mp4 com
      // path relativo no futuro, ajustar aqui.
      return `https://www.youtube.com/embed/${id}`
  }
}

export function PropertyVideos({ videos, propertyTitle }: PropertyVideosProps) {
  if (videos.length === 0) return null

  const heading = videos.length === 1 ? "Vídeo do imóvel" : `Vídeos do imóvel (${videos.length})`

  return (
    <section aria-labelledby="property-videos-heading" className="mt-8 md:mt-10">
      <h2
        id="property-videos-heading"
        className="font-display text-2xl font-bold tracking-tight text-neutral-950"
      >
        {heading}
      </h2>

      {videos.length === 1 ? (
        <div className="mt-6">
          <VideoLazyEmbed
            videoUrl={buildEmbedUrl(videos[0])}
            title={videos[0].descricao || propertyTitle}
          />
          {videos[0].descricao && (
            <p className="mt-3 text-sm text-neutral-600">{videos[0].descricao}</p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {videos.map((v, idx) => (
            <figure key={`${v.videoId}-${idx}`} className="flex flex-col">
              <VideoLazyEmbed
                videoUrl={buildEmbedUrl(v)}
                title={v.descricao || `${propertyTitle} — vídeo ${idx + 1}`}
              />
              {v.descricao && (
                <figcaption className="mt-3 text-sm text-neutral-600">
                  {v.descricao}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </section>
  )
}
