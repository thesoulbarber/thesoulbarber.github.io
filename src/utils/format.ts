import type { Locale } from '@/config/site'

const intlLocale: Record<Locale, string> = { es: 'es-ES', ca: 'ca-ES' }
const numbers = new Map<string, Intl.NumberFormat>()
const dates = new Map<Locale, Intl.DateTimeFormat>()

function numberFormat(key: string, locale: Locale, options: Intl.NumberFormatOptions) {
  let f = numbers.get(key)
  if (!f) numbers.set(key, (f = new Intl.NumberFormat(intlLocale[locale], options)))
  return f
}

/** 16 € · con decimales solo si el precio no es redondo. */
export function euros(locale: Locale, value: number): string {
  const decimals = Number.isInteger(value) ? 0 : 2
  return numberFormat(`eur-${locale}-${decimals}`, locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/** 5,0 */
export function score(locale: Locale, value: number): string {
  return numberFormat(`score-${locale}`, locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value)
}

/** 40 min · 1 h · 1 h 30 min */
export function duration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ')
}

/** 23 de octubre de 2026 */
export function longDate(locale: Locale, iso: string): string {
  let f = dates.get(locale)
  if (!f) {
    f = new Intl.DateTimeFormat(intlLocale[locale], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
    dates.set(locale, f)
  }
  return f.format(new Date(`${iso}T00:00:00Z`))
}
