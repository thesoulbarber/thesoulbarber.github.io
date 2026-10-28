// Páginas de la web. Cada página existe en cada idioma con su propia URL, y el prerender
// genera un HTML por combinación. Las de servicio son landings para SEO local.
import type { Locale } from './site'

export type PageId = 'home' | 'cuts' | 'beard' | 'kids'

export const PAGE_IDS: readonly PageId[] = ['home', 'cuts', 'beard', 'kids']

export const PAGE_PATHS: Record<PageId, Record<Locale, string>> = {
  home: { es: '/', ca: '/ca/' },
  cuts: { es: '/corte-de-pelo-santa-coloma/', ca: '/ca/tall-de-cabell-santa-coloma/' },
  beard: { es: '/arreglo-de-barba-santa-coloma/', ca: '/ca/arranjament-de-barba-santa-coloma/' },
  kids: { es: '/corte-de-pelo-nino-santa-coloma/', ca: '/ca/tall-de-cabell-nens-santa-coloma/' },
}

export const pagePath = (page: PageId, locale: Locale) => PAGE_PATHS[page][locale]

/** La página y el idioma de una ruta; cualquier ruta desconocida es la portada en castellano. */
export function routeFromPath(pathname: string): { page: PageId; locale: Locale } {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  for (const page of PAGE_IDS) {
    for (const [locale, p] of Object.entries(PAGE_PATHS[page]) as [Locale, string][]) {
      if (p === path) return { page, locale }
    }
  }
  return { page: 'home', locale: path.startsWith('/ca/') ? 'ca' : 'es' }
}
