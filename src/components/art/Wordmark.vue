<script setup lang="ts">
// Nombre del local como en su rótulo: mayúsculas finas, ensanchadas y muy espaciadas.
// Si hay logo real (SITE.logo) se usa la imagen.
import { SITE } from '@/config/site'

withDefaults(defineProps<{ size?: 's' | 'm' | 'l'; variant?: 'full' | 'mark' }>(), {
  size: 'm',
  variant: 'full',
})
</script>

<template>
  <img
    v-if="variant === 'mark' && SITE.logoMark"
    class="logo logo--mark"
    :class="`logo--${size}`"
    :src="SITE.logoMark"
    :alt="SITE.name"
  />
  <img
    v-else-if="SITE.logoLockup || SITE.logo"
    class="logo"
    :class="`logo--${size}`"
    :src="SITE.logoLockup || SITE.logo"
    :alt="SITE.name"
  />
  <span v-else class="wordmark" :class="`wordmark--${size}`">
    <span class="wordmark__the">The</span>
    <span class="wordmark__name">Soul Barber</span>
  </span>
</template>

<style scoped>
.wordmark {
  display: inline-grid;
  justify-items: start;
  font-family: var(--font-display);
  font-stretch: var(--wide);
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.wordmark__the {
  font-size: 0.5em;
  font-weight: 400;
  letter-spacing: 0.5em;
  color: var(--mist);
}

.wordmark__name {
  margin-top: 0.3em;
  font-weight: 300;
  letter-spacing: 0.26em;
}

.wordmark--s {
  font-size: 0.82rem;
}

.wordmark--m {
  font-size: 1rem;
}

.wordmark--l {
  font-size: clamp(1.1rem, 0.9rem + 1vw, 1.5rem);
}

.logo {
  width: auto;
  object-fit: contain;
}

.logo--s {
  height: 3.4rem;
}

/* El monograma, al no llevar texto, luce mejor algo mayor y cuadrado */
.logo--mark.logo--s {
  height: 3rem;
}

.logo--mark.logo--l {
  height: 3.4rem;
}

.logo--m {
  height: 3.6rem;
}

.logo--l {
  height: 5.2rem;
}
</style>
