// Lo que dicen las reseñas, sin inventar nada.
//
// TOPICS: temas que Google agrupa en la ficha (número de reseñas que los mencionan, 23-10-2026).
// TESTIMONIALS: citas literales. Vacío a propósito: añadir solo textos originales con permiso
// de su autor. Mientras esté vacío, la sección muestra los temas y no hay bloque de citas.

export interface Topic {
  id: 'massage' | 'chair' | 'fade' | 'design' | 'wash' | 'trust'
  count: number
}

export const TOPICS: Topic[] = [
  { id: 'massage', count: 6 },
  { id: 'chair', count: 4 },
  { id: 'fade', count: 3 },
  { id: 'design', count: 2 },
  { id: 'wash', count: 2 },
  { id: 'trust', count: 2 },
]

export interface Testimonial {
  text: string
  /** Nombre de pila, con permiso */
  author: string
  source: 'google' | 'yeasy'
  /** YYYY-MM */
  date: string
}

export const TESTIMONIALS: Testimonial[] = []
