<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import type { Locale } from '@/config/site'

const { t } = useI18n()
const { locale, locales, hrefFor, rememberLocale } = useLocale()

const names: Record<Locale, string> = { es: 'Castellano', ca: 'Català' }

// Cada idioma es otra página: se navega a la misma página en el otro idioma, conservando el #hash
function onSelect(e: MouseEvent, code: Locale) {
  if (code === locale.value) {
    e.preventDefault()
    return
  }
  rememberLocale(code)
  ;(e.currentTarget as HTMLAnchorElement).hash = window.location.hash
}
</script>

<template>
  <div class="lang" role="group" :aria-label="t('a11y.language')">
    <a
      v-for="code in locales"
      :key="code"
      :href="hrefFor(code)"
      class="lang__btn"
      :lang="code"
      :hreflang="code"
      :aria-current="locale === code ? 'page' : undefined"
      :aria-label="names[code]"
      @click="onSelect($event, code)"
    >
      {{ code.toUpperCase() }}
    </a>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: var(--r-s);
}

.lang__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  min-height: 2.3rem;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: var(--mist);
  transition:
    background-color var(--dur-s) linear,
    color var(--dur-s) linear;
}

.lang__btn:hover {
  color: var(--chalk);
}

.lang__btn[aria-current='page'] {
  background: var(--chalk);
  color: var(--night);
}
</style>
