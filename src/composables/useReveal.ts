// Directiva v-reveal: los elementos se "encienden" al entrar en pantalla, como una tira LED.
// Uso: v-reveal  ·  v-reveal="{ delay: 120 }"
// Se anima con la Web Animations API para no pisar las transiciones CSS propias de cada componente.
import type { Directive } from 'vue'

interface RevealOptions {
  delay?: number
}

const options = new WeakMap<Element, RevealOptions | undefined>()
let observer: IntersectionObserver | null = null

function reveal(el: HTMLElement) {
  const { delay = 0 } = options.get(el) ?? {}
  el.dataset.reveal = 'shown'
  el.animate(
    [
      { opacity: 0, transform: 'translate3d(0, 1.6rem, 0)', filter: 'brightness(2.2) blur(3px)' },
      { opacity: 1, transform: 'none', filter: 'none' },
    ],
    { duration: 900, delay, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'backwards' },
  )
}

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        obs.unobserve(entry.target)
        reveal(entry.target as HTMLElement)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  // Solo en el cliente: en el prerender no hay mounted y el contenido sale visible
  mounted(el, { value }) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window) || !el.animate) return
    // Lo que ya está en pantalla (o por encima) al hidratar ya se ha visto: no se oculta
    if (el.getBoundingClientRect().top < window.innerHeight) return
    options.set(el, value)
    el.dataset.reveal = 'hidden'
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
    options.delete(el)
  },
}
