<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/ui/Icon.vue'
import { OPENING_HOURS, SITE, type Locale } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'
import { service } from '@/data/services'
import { euros } from '@/utils/format'

const { t, locale } = useI18n()

// "09:00 a 13:00" (igual en castellano y en catalán)
const range = (day: number) => OPENING_HOURS[day].map((r) => `${r.open} a ${r.close}`).join(', ')

// Los datos (precios, horas) salen de la configuración: si cambian allí, cambian aquí
const items = computed(() => {
  const l = locale.value as Locale
  return [
    { id: 'book', params: {} },
    { id: 'cancel', params: { hours: SITE.cancelHours } },
    { id: 'pay', params: {} },
    { id: 'kids', params: { price: euros(l, service('kidsCut').price) } },
    { id: 'seniors', params: { price: euros(l, service('seniorCut').price) } },
    { id: 'saturday', params: { sat: range(6), mon: range(1), week: range(2) } },
  ]
})

/** FAQPage para Google, con las mismas respuestas que se ven. */
const jsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.value.map((item) => ({
      '@type': 'Question',
      name: t(`faq.items.${item.id}.q`),
      acceptedAnswer: { '@type': 'Answer', text: t(`faq.items.${item.id}.a`, item.params) },
    })),
  }).replace(/</g, '\\u003c'),
)
</script>

<template>
  <section :id="SECTION_IDS.faq" class="section" aria-labelledby="faq-title">
    <div class="container faq">
      <header class="section-head" v-reveal>
        <p class="eyebrow">{{ t('faq.eyebrow') }}</p>
        <h2 id="faq-title" class="section-title">
          {{ t('faq.title') }} <em>{{ t('faq.titleEm') }}</em>
        </h2>
      </header>

      <div class="faq__list" v-reveal="{ delay: 100 }">
        <details v-for="item in items" :key="item.id" class="qa">
          <summary>
            <span>{{ t(`faq.items.${item.id}.q`) }}</span>
            <Icon name="plus" :size="18" />
          </summary>
          <p>{{ t(`faq.items.${item.id}.a`, item.params) }}</p>
        </details>
      </div>
    </div>
    <component :is="'script'" type="application/ld+json" v-html="jsonLd" />
  </section>
</template>

<style scoped>
.faq {
  display: grid;
  gap: var(--space-l);
}

.faq .section-head {
  margin-bottom: 0;
}

.faq__list {
  border-top: 1px solid var(--line);
}

.qa {
  border-bottom: 1px solid var(--line);
}

.qa summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 0;
  font-size: var(--step-1);
  font-weight: 600;
  cursor: pointer;
  list-style: none;
}

.qa summary::-webkit-details-marker {
  display: none;
}

.qa summary .icon {
  color: var(--mist);
  transition: transform var(--dur-m) var(--ease);
}

.qa[open] summary .icon {
  transform: rotate(45deg);
  color: var(--chalk);
}

.qa summary:hover span {
  text-shadow: 0 0 14px rgb(236 242 255 / 0.4);
}

.qa p {
  max-width: 40rem;
  padding: 0 2rem 1.3rem 0;
  color: var(--mist);
}

@media (min-width: 1000px) {
  .faq {
    grid-template-columns: 1fr 1.6fr;
    align-items: start;
  }
}
</style>
