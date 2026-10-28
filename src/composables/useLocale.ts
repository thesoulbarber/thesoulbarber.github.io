import { useI18n } from 'vue-i18n'
import { pagePath } from '@/config/routes'
import type { Locale } from '@/config/site'
import { STORAGE_KEY, SUPPORTED_LOCALES, type MessageSchema } from '@/i18n'
import { usePage } from './usePage'

/**
 * Idioma de la página. Cada idioma tiene su URL (/, /ca/…), así que cambiar de idioma es navegar
 * a la misma página en el otro idioma; la elección se recuerda para que la raíz lleve a ella.
 */
export function useLocale() {
  const { locale } = useI18n<{ message: MessageSchema }, Locale>()
  const { page } = usePage()

  function rememberLocale(value: Locale) {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* sin almacenamiento: el cambio sigue valiendo para esta visita */
    }
  }

  return {
    locale,
    locales: SUPPORTED_LOCALES,
    hrefFor: (l: Locale) => pagePath(page, l),
    rememberLocale,
  }
}
