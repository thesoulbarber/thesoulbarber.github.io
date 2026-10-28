<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BookLink from '@/components/ui/BookLink.vue'
import Icon from '@/components/ui/Icon.vue'
import { SERVICES, service, type Service, type ServiceId } from '@/data/services'
import { SITE, type Locale } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'
import { duration, euros } from '@/utils/format'

const props = defineProps<{
  /** Solo estos servicios, en este orden y sin agrupar (landings). Sin valor: toda la carta. */
  ids?: ServiceId[]
}>()

const { t, locale } = useI18n()
const price = (s: Service) => euros(locale.value as Locale, s.price)

const groups = computed(() =>
  props.ids
    ? [{ key: 'landing.pricesTitle', items: props.ids.map(service) }]
    : [
        { key: 'services.popular', items: SERVICES.filter((s) => s.popular) },
        { key: 'services.more', items: SERVICES.filter((s) => !s.popular) },
      ],
)
</script>

<template>
  <section
    :id="ids ? undefined : SECTION_IDS.services"
    class="section section--alt"
    :aria-labelledby="ids ? 'prices-title' : 'services-title'"
  >
    <div class="container">
      <header v-if="!ids" class="section-head" v-reveal>
        <p class="eyebrow">{{ t('services.eyebrow') }}</p>
        <h2 id="services-title" class="section-title">
          {{ t('services.title') }} <em>{{ t('services.titleEm') }}</em>
        </h2>
        <p class="lead">{{ t('services.lead') }}</p>
      </header>

      <div class="menu">
        <div
          v-for="(group, gi) in groups"
          :key="group.key"
          class="menu__group"
          v-reveal="{ delay: gi * 100 }"
        >
          <component
            :is="ids ? 'h2' : 'h3'"
            :id="ids ? 'prices-title' : undefined"
            class="menu__title"
          >
            {{ t(group.key) }}
          </component>
          <ul class="menu__list">
            <li v-for="s in group.items" :key="s.id" class="item">
              <div class="item__main">
                <component :is="ids ? 'h3' : 'h4'" class="item__name">
                  {{ t(`services.items.${s.id}.name`) }}
                </component>
                <p class="item__desc">{{ t(`services.items.${s.id}.desc`) }}</p>
              </div>
              <div class="item__side">
                <p class="item__price">{{ price(s) }}</p>
                <p class="item__time">
                  <Icon name="clock" :size="14" />
                  {{ duration(s.minutes) }}
                </p>
              </div>
              <BookLink
                class="item__book"
                variant="ghost"
                small
                :icon="false"
                :label="t('services.book')"
                :aria-label="t('services.bookAria', { service: t(`services.items.${s.id}.name`) })"
              />
            </li>
          </ul>
        </div>
      </div>

      <aside v-if="!ids" class="color" v-reveal>
        <Icon name="drop" :size="26" :stroke="1.2" />
        <div>
          <h3 class="color__title">{{ t('services.colorTitle') }}</h3>
          <p class="color__text">{{ t('services.colorText') }}</p>
        </div>
        <a :href="SITE.instagram.url" target="_blank" rel="noopener" class="text-link">
          Instagram<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
          <Icon name="external" :size="16" />
        </a>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.menu {
  display: grid;
  gap: var(--space-l);
}

.menu__title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: var(--space-s);
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--mist);
}

.menu__title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}

.menu__list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem 1rem;
  align-items: start;
  padding-block: var(--space-s);
  border-bottom: 1px solid var(--line);
}

.item__name {
  font-family: var(--font-body);
  font-stretch: 100%;
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.25;
}

.item__desc {
  margin-top: 0.2rem;
  font-size: var(--step--1);
  color: var(--mist);
}

.item__side {
  display: grid;
  justify-items: end;
  gap: 0.15rem;
}

.item__price {
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step-2);
  font-weight: 400;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.item__time {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--step--2);
  color: var(--ash);
  white-space: nowrap;
}

.item__book {
  grid-column: 1 / -1;
  justify-self: start;
}

.color {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.8rem 1.2rem;
  align-items: center;
  margin-top: var(--space-xl);
  padding: var(--space-m);
  border: 1px solid var(--line);
  border-left: 2px solid var(--flame);
  border-radius: var(--r-m);
  background: linear-gradient(90deg, var(--flame-soft), transparent 60%);
}

.color > .icon {
  color: var(--flame);
}

.color__title {
  font-family: var(--font-body);
  font-stretch: 100%;
  font-size: var(--step-1);
  font-weight: 600;
}

.color__text {
  color: var(--mist);
}

.color .text-link {
  grid-column: 2;
  justify-self: start;
}

@media (min-width: 640px) {
  .item {
    grid-template-columns: 1fr auto auto;
    align-items: center;
  }

  .item__book {
    grid-column: auto;
    justify-self: end;
  }
}

@media (min-width: 1000px) {
  .menu {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-xl);
  }

  .menu__group:only-child {
    grid-column: 1 / -1;
    max-width: 52rem;
  }

  .color {
    grid-template-columns: auto 1fr auto;
  }

  .color .text-link {
    grid-column: auto;
  }
}
</style>
