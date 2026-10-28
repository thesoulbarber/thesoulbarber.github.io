import { onBeforeUnmount, onMounted, ref } from 'vue'

/** true en cuanto la página se ha desplazado más de `threshold` píxeles. */
export function useScrolled(threshold = 24) {
  const scrolled = ref(false)
  let frame = 0
  const update = () => {
    frame = 0
    scrolled.value = window.scrollY > threshold
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    cancelAnimationFrame(frame)
  })

  return scrolled
}
