import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { OPENING_HOURS } from '@/config/site'

const TIME_ZONE = 'Europe/Madrid'

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Día de la semana (0 = domingo) y minutos desde medianoche en hora de Barcelona. */
function madridNow(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { weekday, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export interface OpeningStatus {
  open: boolean
  /** Hora de cierre de la franja actual (si está abierto). */
  closesAt?: string
  /** Próxima apertura (si está cerrado): día relativo y hora. */
  next?: { weekday: number; inDays: number; time: string }
  today: number
}

/**
 * Estado de apertura según la hora de Barcelona. Es null hasta montar: el HTML prerenderizado no
 * sabe a qué hora se visitará, así que el texto que depende de la hora solo aparece en el cliente.
 */
export function useOpeningStatus() {
  const now = ref<Date | null>(null)
  let timer = 0

  onMounted(() => {
    now.value = new Date()
    timer = window.setInterval(() => (now.value = new Date()), 60_000)
  })
  onBeforeUnmount(() => window.clearInterval(timer))

  const status = computed<OpeningStatus | null>(() => {
    if (!now.value) return null
    const { weekday, minutes } = madridNow(now.value)

    for (const range of OPENING_HOURS[weekday]) {
      if (minutes >= toMinutes(range.open) && minutes < toMinutes(range.close)) {
        return { open: true, closesAt: range.close, today: weekday }
      }
    }

    for (let inDays = 0; inDays < 8; inDays++) {
      const day = (weekday + inDays) % 7
      const range = OPENING_HOURS[day].find((r) => inDays > 0 || toMinutes(r.open) > minutes)
      if (range)
        return { open: false, next: { weekday: day, inDays, time: range.open }, today: weekday }
    }
    return { open: false, today: weekday }
  })

  return status
}
