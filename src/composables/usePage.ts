import { inject, type InjectionKey } from 'vue'
import { useI18n } from 'vue-i18n'
import { pagePath, type PageId } from '@/config/routes'
import type { Locale } from '@/config/site'

export const PAGE_KEY: InjectionKey<PageId> = Symbol('page')

/**
 * Página actual y enlaces que dependen de ella: en la portada las secciones son anclas (#equipo);
 * desde una landing, enlaces a la portada del mismo idioma (/ca/#equip…).
 */
export function usePage() {
  const page = inject(PAGE_KEY, 'home')
  const { locale } = useI18n()

  const sectionHref = (id: string) =>
    page === 'home' ? `#${id}` : `${pagePath('home', locale.value as Locale)}#${id}`
  const href = (target: PageId) => pagePath(target, locale.value as Locale)

  return { page, sectionHref, href }
}
