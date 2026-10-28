<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/config/site'
import { score as fmtScore } from '@/utils/format'

const props = withDefaults(defineProps<{ score: number; size?: number }>(), { size: 16 })
const { t, locale } = useI18n()

// Cada estrella se rellena según la nota (5,0 → cinco llenas)
const fill = (i: number) => Math.max(0, Math.min(1, props.score - i))
</script>

<template>
  <span
    class="stars"
    role="img"
    :aria-label="t('a11y.stars', { score: fmtScore(locale as Locale, score) })"
  >
    <svg
      v-for="i in 5"
      :key="i"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="`star-${i}-${Math.round(score * 10)}`">
          <stop :offset="fill(i - 1)" stop-color="currentColor" />
          <stop :offset="fill(i - 1)" stop-color="transparent" />
        </linearGradient>
      </defs>
      <path
        d="m12 2.8 2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.33l-5.7 3 1.09-6.34L2.78 9.5l6.37-.93Z"
        :fill="`url(#star-${i}-${Math.round(score * 10)})`"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </svg>
  </span>
</template>

<style scoped>
.stars {
  display: inline-flex;
  gap: 0.2rem;
  color: var(--chalk);
  filter: drop-shadow(0 0 4px rgb(236 242 255 / 0.45));
}
</style>
