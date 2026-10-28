<script setup lang="ts">
// Botón flotante de WhatsApp. Solo existe si SITE.whatsapp tiene número (PENDIENTE).
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/ui/Icon.vue'
import { SITE } from '@/config/site'

const { t } = useI18n()
const link = computed(() =>
  SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(t('whatsapp.message'))}`
    : '',
)
</script>

<template>
  <a v-if="link" :href="link" target="_blank" rel="noopener" class="wa">
    <Icon name="whatsapp" :size="26" />
    <span class="visually-hidden">{{ t('whatsapp.label') }} {{ t('a11y.newWindow') }}</span>
  </a>
</template>

<style scoped>
.wa {
  position: fixed;
  right: var(--gutter);
  bottom: calc(var(--mobile-bar-h) + 1rem);
  z-index: 39;
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: var(--chalk);
  color: var(--night);
  box-shadow:
    0 0 0 1px rgb(255 255 255 / 0.4),
    0 10px 30px -8px rgb(0 0 0 / 0.8);
}

.wa:hover {
  box-shadow:
    0 0 0 1px #fff,
    0 0 24px rgb(220 232 255 / 0.5);
}

@media (min-width: 720px) {
  .wa {
    bottom: 1.5rem;
  }
}
</style>
