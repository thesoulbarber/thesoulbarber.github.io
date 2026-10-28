import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import type { PageId } from '@/config/routes'
import type { Locale } from '@/config/site'
import { createSiteI18n } from '@/i18n'
import { PAGE_KEY } from '@/composables/usePage'
import { vReveal } from '@/composables/useReveal'

export interface CreateOptions {
  /** true → createSSRApp (prerender en el servidor o hidratación del HTML prerenderizado) */
  ssr: boolean
  locale: Locale
  page: PageId
}

/** Compartido por entry-server.ts (prerender) y main.ts (hidratación, o montaje en dev). */
export function createSiteApp({ ssr, locale, page }: CreateOptions) {
  const app = ssr ? createSSRApp(App) : createApp(App)
  const i18n = createSiteI18n(locale)
  app.use(i18n)
  app.provide(PAGE_KEY, page)
  app.directive('reveal', vReveal)
  return { app, i18n }
}
