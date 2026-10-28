<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Icon, { type IconName } from '@/components/ui/Icon.vue'
import { SITE } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'

const { t } = useI18n()

const items: { id: string; icon: IconName }[] = [
  { id: 'wash', icon: 'drop' },
  { id: 'massage', icon: 'chair' },
  { id: 'detail', icon: 'razor' },
  { id: 'time', icon: 'clock' },
]
</script>

<template>
  <section :id="SECTION_IDS.experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <header class="section-head" v-reveal>
        <p class="eyebrow">{{ t('experience.eyebrow') }}</p>
        <h2 id="experience-title" class="section-title">
          {{ t('experience.title') }} <em>{{ t('experience.titleEm') }}</em>
        </h2>
        <p class="lead">{{ t('experience.lead') }}</p>
      </header>

      <ul class="perks">
        <li v-for="(item, i) in items" :key="item.id" class="perk" v-reveal="{ delay: i * 90 }">
          <span class="perk__icon"><Icon :name="item.icon" :size="30" :stroke="1.2" /></span>
          <h3 class="perk__title">{{ t(`experience.items.${item.id}.title`) }}</h3>
          <p class="perk__text">{{ t(`experience.items.${item.id}.text`) }}</p>
        </li>
      </ul>

      <p class="note" v-reveal>
        <Icon name="wallet" :size="20" />
        {{ t('experience.note', { hours: SITE.cancelHours }) }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.perks {
  display: grid;
  gap: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--line);
  border-radius: var(--r-m);
  background: var(--line);
  overflow: hidden;
}

.perk {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.7rem;
  padding: var(--space-l) var(--space-m);
  background: var(--coal);
  transition: background-color var(--dur-m) var(--ease);
}

/* Tira LED que se enciende en la parte superior al pasar por encima */
.perk::before {
  content: '';
  position: absolute;
  top: 0;
  left: var(--space-m);
  width: 2.4rem;
  height: 2px;
  border-radius: 2px;
  background: var(--led);
  box-shadow: var(--led-glow);
  transition: width var(--dur-m) var(--ease);
}

.perk:hover {
  background: var(--anthracite);
}

.perk:hover::before {
  width: calc(100% - 2 * var(--space-m));
}

.perk__icon {
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  filter: drop-shadow(0 0 5px rgb(236 242 255 / 0.25));
}

.perk__title {
  margin-top: 0.4rem;
  font-size: var(--step-1);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.perk__text {
  color: var(--mist);
}

.note {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: var(--space-m);
  font-size: var(--step--1);
  color: var(--mist);
}

@media (min-width: 640px) {
  .perks {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .perks {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
