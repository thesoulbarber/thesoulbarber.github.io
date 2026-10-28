// Entrada SSR, la usa scripts/prerender.mjs tras `vite build --ssr src/entry-server.ts --outDir .ssr`.
import { renderToString } from 'vue/server-renderer'
import { createSiteApp } from './createApp'
import { PAGE_IDS, pagePath, type PageId } from '@/config/routes'
import { SITE, type Locale } from '@/config/site'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n'

const OG_LOCALE: Record<Locale, string> = { es: 'es_ES', ca: 'ca_ES' }

export interface HeadData {
  lang: Locale
  title: string
  description: string
  canonical: string
  /** hreflang de cada idioma más x-default (la versión en castellano). */
  alternates: { hreflang: Locale | 'x-default'; href: string }[]
  ogTitle: string
  ogDescription: string
  ogLocale: string
  ogLocaleAlternates: string[]
}

const pageUrl = (page: PageId, locale: Locale) => new URL(pagePath(page, locale), SITE.url).href

const escAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Etiquetas del <head> que cambian con la página y el idioma. El prerender las coloca en
 * <!--head-->, quita el <title> de desarrollo de la plantilla y deja el resto (favicon, JSON-LD).
 */
export function headToHtml(head: HeadData): string {
  const tags = [
    `<title>${escText(head.title)}</title>`,
    `<meta name="description" content="${escAttr(head.description)}" />`,
    `<link rel="canonical" href="${escAttr(head.canonical)}" />`,
    ...head.alternates.map(
      (a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${escAttr(a.href)}" />`,
    ),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escAttr(SITE.name)}" />`,
    `<meta property="og:url" content="${escAttr(head.canonical)}" />`,
    `<meta property="og:title" content="${escAttr(head.ogTitle)}" />`,
    `<meta property="og:description" content="${escAttr(head.ogDescription)}" />`,
    `<meta property="og:locale" content="${head.ogLocale}" />`,
    ...head.ogLocaleAlternates.map((l) => `<meta property="og:locale:alternate" content="${l}" />`),
  ]
  return tags.join('\n    ')
}

export async function render(
  page: PageId,
  locale: Locale,
): Promise<{ html: string; head: HeadData; headHtml: string }> {
  const { app, i18n } = createSiteApp({ ssr: true, locale, page })
  const html = await renderToString(app)
  const { t, te } = i18n.global

  const title = t(`meta.${page}.title`)
  const description = t(`meta.${page}.description`)
  const head: HeadData = {
    lang: locale,
    title,
    description,
    canonical: pageUrl(page, locale),
    alternates: [
      ...SUPPORTED_LOCALES.map((l) => ({ hreflang: l, href: pageUrl(page, l) })),
      { hreflang: 'x-default' as const, href: pageUrl(page, DEFAULT_LOCALE) },
    ],
    ogTitle: te(`meta.${page}.ogTitle`) ? t(`meta.${page}.ogTitle`) : title,
    ogDescription: te(`meta.${page}.ogDescription`) ? t(`meta.${page}.ogDescription`) : description,
    ogLocale: OG_LOCALE[locale],
    ogLocaleAlternates: SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
  }

  return { html, head, headHtml: headToHtml(head) }
}

export { PAGE_IDS, SUPPORTED_LOCALES }
