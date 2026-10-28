// vue-i18n v10, solo Composition API; mensajes precompilados por @intlify/unplugin-vue-i18n.
import { createI18n } from 'vue-i18n'
import type { Locale } from '@/config/site'
import es from './locales/es.json'
import ca from './locales/ca.json'

export const SUPPORTED_LOCALES: readonly Locale[] = ['es', 'ca']
export const DEFAULT_LOCALE: Locale = 'es'
/** Idioma elegido por la persona. El script de index.html también lo lee (redirige la raíz). */
export const STORAGE_KEY = 'tsb-locale'

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export type MessageSchema = typeof es

export function createSiteI18n(locale: Locale) {
  return createI18n<[MessageSchema], Locale>({
    legacy: false,
    globalInjection: true,
    locale,
    fallbackLocale: DEFAULT_LOCALE,
    missingWarn: import.meta.env.DEV,
    fallbackWarn: false,
    messages: { es, ca },
  })
}
