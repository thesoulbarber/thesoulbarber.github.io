// Datos reales del local, verificados el 23-10-2026 en Instagram (@the_soulbarber), Yeasy y la
// ficha de Google Maps. Editar aquí y se actualiza toda la web. Lo que lleva PENDIENTE hay que
// confirmarlo con el dueño (ver README).

export type Locale = 'es' | 'ca'

export interface Rating {
  score: number
  count: number
  url: string
}

export const SITE = {
  name: 'The Soul Barber',
  /** PENDIENTE: dominio definitivo. Lo usan canonical, hreflang, og:url y el sitemap. */
  url: 'https://thesoulbarber.github.io/',
  /** Logo real en public/ (p. ej. '/logo.svg'). Vacío → se dibuja el nombre en texto.
   *  PNG con fondo transparente (marca blanca), pensado para las superficies oscuras. */
  logo: '/logo-soul-barber.png',
  /** Solo el monograma SB (recortado del logo). Se usa en la cabecera (variant="mark"). */
  logoMark: '/logo-monogram.png',
  /** Lockup recortado a su contenido (sin márgenes), para mostrarlo grande en el pie. */
  logoLockup: '/logo-lockup.png',
  address: {
    street: 'C/ dels Sagarra, 5',
    postalCode: '08921',
    city: 'Santa Coloma de Gramenet',
    region: 'Barcelona',
  },
  geo: { lat: 41.4517256, lng: 2.2113851 },
  /** Reserva online (Yeasy): sin tarjeta, pago en el local, cancelación gratis hasta 6 h antes. */
  bookingUrl: 'https://cut.yeasyapp.com/AWlivc',
  cancelHours: 6,
  instagram: { handle: 'the_soulbarber', url: 'https://www.instagram.com/the_soulbarber/' },
  /** Ficha de Google (reseñas). */
  googleUrl:
    'https://www.google.com/maps/place/The+Soul+Barber/@41.4517256,2.2113851,17z/data=!4m6!3m5!1s0x12a4bd68eba386af:0x8424e77aadb95201!8m2!3d41.4517256!4d2.2113851!16s%2Fg%2F11yw97mp9v',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=The%20Soul%20Barber%2C%20C%2F%20dels%20Sagarra%2C%205%2C%2008921%20Santa%20Coloma%20de%20Gramenet',
  mapsEmbed:
    'https://www.google.com/maps?q=The%20Soul%20Barber%2C%20C%2F%20dels%20Sagarra%2C%205%2C%2008921%20Santa%20Coloma%20de%20Gramenet&z=17&output=embed',
  /** PENDIENTE: no se publica en ninguna fuente. Con valor, aparece en contacto y pie. */
  phone: null as null | { display: string; href: string },
  /** PENDIENTE: con valor, aparece el botón flotante de WhatsApp (número con prefijo, sin +). */
  whatsapp: null as null | { display: string; number: string },
  /** Vídeo del hero en public/ (p. ej. '/video/hero.mp4'). Vacío → ilustración de las luces LED. */
  heroVideo: '',
} as const

/** Valoraciones públicas. Actualizar de vez en cuando (fecha en `RATINGS_CHECKED`). */
export const RATINGS = {
  google: { score: 5, count: 49, url: SITE.googleUrl },
  yeasy: { score: 5, count: 264, url: SITE.bookingUrl },
} satisfies Record<string, Rating>

export const RATINGS_CHECKED = '2026-10-23'

/** Franja horaria en formato "HH:MM" (24h). */
export interface TimeRange {
  open: string
  close: string
}

/** Horario por día de la semana: 0 = domingo … 6 = sábado (Yeasy, octubre de 2026). */
export const OPENING_HOURS: Record<number, TimeRange[]> = {
  0: [],
  1: [{ open: '13:00', close: '21:00' }],
  2: [{ open: '09:00', close: '21:00' }],
  3: [{ open: '09:00', close: '21:00' }],
  4: [{ open: '09:00', close: '21:00' }],
  5: [{ open: '09:00', close: '21:00' }],
  6: [{ open: '09:00', close: '13:00' }],
}
