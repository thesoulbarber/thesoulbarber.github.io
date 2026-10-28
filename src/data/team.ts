// Equipo según Yeasy (octubre de 2026). PENDIENTE: fotos, especialidades y años de experiencia.
// `photo` → archivo en public/ (p. ej. '/fotos/equipo/jorge.jpg'); sin foto se ven las iniciales.

export interface Barber {
  id: string
  name: string
  surname?: string
  role: 'manager' | 'barber'
  photo?: string
}

export const TEAM: Barber[] = [
  { id: 'antonio', name: 'Antonio José', surname: 'Rosa', role: 'manager' },
  { id: 'miguel', name: 'Miguel', surname: 'Muñoz', role: 'manager' },
  { id: 'jorge', name: 'Jorge', surname: 'Lezama', role: 'barber' },
  { id: 'alejandro', name: 'Alejandro', role: 'barber' },
]

export const initials = (b: Barber) =>
  [b.name, b.surname]
    .filter(Boolean)
    .map((w) => w!.charAt(0))
    .join('')
