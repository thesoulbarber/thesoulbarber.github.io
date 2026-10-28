<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BookLink from '@/components/ui/BookLink.vue'
import LedRule from '@/components/art/LedRule.vue'

const { t } = useI18n()
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <div class="container cta__inner" v-reveal>
      <LedRule />
      <h2 id="cta-title" class="cta__title">{{ t('cta.title') }}</h2>
      <p class="lead">{{ t('cta.text') }}</p>
      <BookLink :label="t('cta.button')" />
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  padding-block: var(--space-2xl);
  overflow: hidden;
  background: radial-gradient(60% 80% at 50% 0%, rgb(236 242 255 / 0.08), transparent 70%);
}

.cta__inner {
  display: grid;
  justify-items: center;
  gap: var(--space-m);
  text-align: center;
}

.cta__title {
  font-size: var(--step-5);
  font-weight: 250;
  text-transform: uppercase;
  text-shadow: 0 0 40px rgb(236 242 255 / 0.25);
}
</style>
