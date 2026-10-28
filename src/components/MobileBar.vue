<script setup lang="ts">
// Barra fija inferior en móvil: las dos acciones que más importan, siempre a mano.
import { useI18n } from 'vue-i18n'
import BookLink from '@/components/ui/BookLink.vue'
import Icon from '@/components/ui/Icon.vue'
import { SITE } from '@/config/site'

const { t } = useI18n()
</script>

<template>
  <div class="bar">
    <a :href="SITE.directionsUrl" target="_blank" rel="noopener" class="btn btn--ghost bar__dir">
      <Icon name="pin" :size="18" />
      {{ t('mobileBar.directions') }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
    </a>
    <BookLink class="bar__book" :label="t('mobileBar.book')" />
  </div>
</template>

<style scoped>
.bar {
  position: fixed;
  inset: auto 0 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 0.6rem;
  min-height: var(--mobile-bar-h);
  padding: 0.6rem var(--gutter) calc(0.6rem + env(safe-area-inset-bottom));
  background: rgb(11 11 12 / 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
}

.bar .btn {
  min-height: 2.9rem;
  padding-inline: 0.8rem;
}

@media (min-width: 720px) {
  .bar {
    display: none;
  }
}
</style>
