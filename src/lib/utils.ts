type ClassValue = string | number | null | undefined | false | Record<string, boolean>

/**
 * Combina nombres de clase estilo clsx, ignorando valores falsy y
 * expandiendo objetos { clase: condicion }.
 */
export function cn(...classes: ClassValue[]): string {
  const out: string[] = []

  for (const entry of classes) {
    if (!entry) continue

    if (typeof entry === 'string' || typeof entry === 'number') {
      out.push(String(entry))
      continue
    }

    for (const [key, value] of Object.entries(entry)) {
      if (value) out.push(key)
    }
  }

  return out.join(' ')
}

/**
 * Scroll suave hacia una sección por id, compensando el navbar fijo.
 */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - 8

  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * Extrae el ID de video de una URL de YouTube (watch, youtu.be, shorts).
 * Devuelve null si no reconoce el formato.
 */
export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url)
    let videoId = ''

    if (parsed.hostname.includes('youtu.be')) {
      videoId = parsed.pathname.slice(1)
    } else if (parsed.pathname.startsWith('/shorts/')) {
      videoId = parsed.pathname.replace('/shorts/', '')
    } else {
      videoId = parsed.searchParams.get('v') ?? ''
    }

    return videoId || null
  } catch {
    return null
  }
}

/**
 * Convierte una URL normal de YouTube (watch, youtu.be, shorts) a su
 * versión embebible. Devuelve la URL original si no reconoce el formato.
 */
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

/**
 * Devuelve la URL de la miniatura oficial de un video de YouTube.
 * Devuelve null si la URL no es de YouTube.
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

/**
 * Convierte una URL normal de Vimeo a su versión embebible.
 * Devuelve la URL original si no reconoce el formato.
 */
export function getVimeoEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url)
    const videoId = parsed.pathname.split('/').filter(Boolean).pop()

    if (!videoId) return url

    return `https://player.vimeo.com/video/${videoId}`
  } catch {
    return url
  }
}
