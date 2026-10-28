// Carta de servicios tal como está en Yeasy (octubre de 2026). Nombres y descripciones en
// src/i18n/locales/*.json → services.items.<id>.
import type { PageId } from '@/config/routes'

export type ServiceId =
  'cutBrowsWash' | 'cutBeardBrowsWash' | 'kidsCut' | 'seniorCut' | 'beard' | 'washMassage' | 'brows'

export interface Service {
  id: ServiceId
  minutes: number
  /** Euros, IVA incluido */
  price: number
  /** Etiqueta "Los más pedidos" de Yeasy */
  popular?: boolean
}

export const SERVICES: Service[] = [
  { id: 'cutBrowsWash', minutes: 40, price: 16, popular: true },
  { id: 'cutBeardBrowsWash', minutes: 60, price: 25, popular: true },
  { id: 'kidsCut', minutes: 30, price: 14, popular: true },
  { id: 'seniorCut', minutes: 30, price: 13 },
  { id: 'beard', minutes: 30, price: 13 },
  { id: 'washMassage', minutes: 15, price: 10 },
  { id: 'brows', minutes: 15, price: 3 },
]

export const service = (id: ServiceId) => SERVICES.find((s) => s.id === id)!

/** Servicios que muestra cada landing, en orden. */
export const PAGE_SERVICES: Record<Exclude<PageId, 'home'>, ServiceId[]> = {
  cuts: ['cutBrowsWash', 'cutBeardBrowsWash', 'seniorCut', 'washMassage', 'brows'],
  beard: ['beard', 'cutBeardBrowsWash', 'brows'],
  kids: ['kidsCut', 'cutBrowsWash', 'seniorCut'],
}
