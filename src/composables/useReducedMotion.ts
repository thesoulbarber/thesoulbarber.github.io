import { onBeforeUnmount, onMounted, ref } from 'vue'

/** true cuando el sistema pide reducir el movimiento. Reactivo a cambios en vivo. */
export function useReducedMotion() {
  const reduced = ref(false)
  let mql: MediaQueryList | null = null
  const update = () => (reduced.value = mql?.matches ?? false)

  onMounted(() => {
    mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    update()
    mql.addEventListener('change', update)
  })
  onBeforeUnmount(() => mql?.removeEventListener('change', update))

  return reduced
}
