<script setup lang="ts">
// Separador: una tira LED que se enciende al entrar en pantalla.
import { onBeforeUnmount, onMounted, ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const lit = ref(true)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce || !('IntersectionObserver' in window) || !el.value) return
  if (el.value.getBoundingClientRect().top < window.innerHeight) return
  lit.value = false
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      lit.value = true
      observer?.disconnect()
    },
    { threshold: 1 },
  )
  observer.observe(el.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="el" class="rule" :class="{ 'is-lit': lit }" aria-hidden="true">
    <span class="rule__line" />
  </div>
</template>

<style scoped>
.rule {
  display: flex;
  justify-content: center;
  padding-block: 0.5rem;
}

.rule__line {
  width: min(16rem, 50%);
  height: 2px;
  border-radius: 2px;
  background: var(--led);
  box-shadow: var(--led-glow);
  transform: scaleX(0.02);
  opacity: 0.2;
  transition:
    transform 900ms var(--ease-in-out),
    opacity 300ms linear;
}

.rule.is-lit .rule__line {
  transform: none;
  opacity: 1;
}
</style>
