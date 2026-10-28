<script setup lang="ts">
// Cabecera de las landings de servicio (SEO local): migas, H1 con la búsqueda que se quiere
// posicionar, entrada y las dos acciones principales.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LedRoom from '@/components/art/LedRoom.vue'
import BookLink from '@/components/ui/BookLink.vue'
import OpenStatus from '@/components/ui/OpenStatus.vue'
import Icon from '@/components/ui/Icon.vue'
import { SITE, type Locale } from '@/config/site'
import type { PageId } from '@/config/routes'
import { service } from '@/data/services'
import { usePage } from '@/composables/usePage'
import { euros } from '@/utils/format'

const props = defineProps<{ page: Exclude<PageId, 'home'> }>()

const { t, locale } = useI18n()
const { href } = usePage()

const leadParams = computed(() => {
  const l = locale.value as Locale
  const main = { cuts: 'cutBrowsWash', beard: 'beard', kids: 'kidsCut' } as const
  return {
    price: euros(l, service(main[props.page]).price),
    fullPrice: euros(l, service('cutBeardBrowsWash').price),
  }
})
</script>

<template>
  <section id="inicio" class="lhero" aria-labelledby="lhero-title">
    <div class="lhero__media" aria-hidden="true">
      <LedRoom :vx="1250" :vy="420" id-prefix="lhero-room" />
    </div>
    <div class="lhero__shade" aria-hidden="true" />

    <div class="container lhero__inner">
      <nav class="crumbs" :aria-label="t('a11y.breadcrumb')">
        <ol>
          <li>
            <a :href="href('home')">{{ t('landing.home') }}</a>
          </li>
          <li aria-current="page">{{ t(`landing.${page}.crumb`) }}</li>
        </ol>
      </nav>

      <h1 id="lhero-title" class="lhero__title">
        <span>{{ t(`landing.${page}.title`) }}</span>
        <span class="lhero__light">{{ t(`landing.${page}.titleEm`) }}</span>
      </h1>
      <p class="lhero__lead">{{ t(`landing.${page}.lead`, leadParams) }}</p>

      <div class="lhero__actions">
        <BookLink :label="t('nav.bookLong')" />
        <a :href="SITE.directionsUrl" target="_blank" rel="noopener" class="btn btn--ghost">
          <Icon name="pin" :size="18" />
          {{ t('visit.directions') }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
        </a>
      </div>
      <OpenStatus />
    </div>
  </section>

  <div class="intro">
    <div class="container">
      <div class="intro__inner" v-reveal>
        <p>{{ t(`landing.${page}.p1`) }}</p>
        <p>{{ t(`landing.${page}.p2`, { hours: SITE.cancelHours }) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lhero {
  position: relative;
  padding-top: calc(var(--header-h) + var(--space-xl));
  padding-bottom: var(--space-xl);
  overflow: hidden;
  isolation: isolate;
}

.lhero__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.8;
}

.lhero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgb(11 11 12 / 0.85) 0, transparent 9rem),
    linear-gradient(90deg, rgb(11 11 12 / 0.95) 0%, rgb(11 11 12 / 0.7) 55%, rgb(11 11 12 / 0.2)),
    linear-gradient(0deg, var(--night) 0%, transparent 40%);
}

.lhero__inner {
  display: grid;
  gap: var(--space-m);
  justify-items: start;
}

.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--step--1);
  color: var(--ash);
}

.crumbs li + li::before {
  content: '/';
  margin-right: 0.5rem;
  color: var(--stone-3);
}

.crumbs a {
  color: var(--mist);
}

.lhero__title {
  display: grid;
  gap: 0.3rem;
  max-width: 20ch;
  font-size: var(--step-4);
  text-transform: uppercase;
}

.lhero__light {
  font-weight: 220;
  color: var(--mist);
}

.lhero__lead {
  max-width: 38rem;
  font-size: var(--step-1);
  line-height: 1.55;
  color: var(--mist);
}

.lhero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.intro {
  padding-block: var(--space-l) var(--space-xl);
}

.intro__inner {
  display: grid;
  gap: var(--space-s);
  max-width: 46rem;
  font-size: var(--step-1);
  line-height: 1.6;
}

.intro__inner p + p {
  color: var(--mist);
}
</style>
