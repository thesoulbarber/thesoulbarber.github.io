<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LedRoom from '@/components/art/LedRoom.vue'
import BookLink from '@/components/ui/BookLink.vue'
import OpenStatus from '@/components/ui/OpenStatus.vue'
import StarRow from '@/components/ui/StarRow.vue'
import Icon from '@/components/ui/Icon.vue'
import { RATINGS, SITE, type Locale } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'
import { useReducedMotion } from '@/composables/useReducedMotion'
import { score } from '@/utils/format'

const { t, locale } = useI18n()
const reducedMotion = useReducedMotion()

const total = RATINGS.google.count + RATINGS.yeasy.count
const rating = computed(() =>
  t('hero.rating', { score: score(locale.value as Locale, RATINGS.google.score), count: total }),
)
</script>

<template>
  <section :id="SECTION_IDS.top" class="hero" aria-labelledby="hero-title">
    <div class="hero__media" aria-hidden="true">
      <video
        v-if="SITE.heroVideo && !reducedMotion"
        class="hero__video"
        :src="SITE.heroVideo"
        autoplay
        muted
        loop
        playsinline
      />
      <LedRoom v-else />
    </div>
    <div class="hero__shade" aria-hidden="true" />

    <div class="hero__inner container">
      <h1 id="hero-title" class="hero__title">
        <span class="hero__kicker">{{ t('hero.kicker') }}</span>
        <span class="hero__line">{{ t('hero.title') }}</span>
        <span class="hero__line hero__line--light">{{ t('hero.titleEm') }}</span>
      </h1>
      <p class="hero__lead">{{ t('hero.lead') }}</p>

      <div class="hero__actions">
        <BookLink :label="t('hero.cta')" />
        <a :href="`#${SECTION_IDS.services}`" class="btn btn--ghost">{{
          t('hero.ctaSecondary')
        }}</a>
      </div>

      <div class="hero__meta">
        <p class="hero__rating">
          <StarRow :score="RATINGS.google.score" :size="15" />
          <span>
            <strong>{{ rating }}</strong>
            <span class="hero__sources"> · {{ t('hero.ratingSources') }}</span>
          </span>
        </p>
        <OpenStatus />
      </div>
    </div>

    <a :href="`#${SECTION_IDS.services}`" class="hero__scroll">
      <span class="visually-hidden">{{ t('hero.scroll') }}</span>
      <Icon name="arrow" :size="18" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: end;
  min-height: 100svh;
  padding-top: calc(var(--header-h) + var(--space-xl));
  /* En móvil, que la barra fija de reserva no tape la valoración */
  padding-bottom: calc(var(--space-l) + var(--mobile-bar-h));
  overflow: hidden;
  isolation: isolate;
}

@media (min-width: 720px) {
  .hero {
    padding-bottom: var(--space-xl);
  }
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Oscurece la izquierda y abajo para que el texto se lea siempre */
.hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgb(11 11 12 / 0.85) 0, transparent 9rem),
    linear-gradient(90deg, rgb(11 11 12 / 0.92) 0%, rgb(11 11 12 / 0.6) 45%, transparent 75%),
    linear-gradient(0deg, var(--night) 0%, transparent 35%);
}

.hero__inner {
  display: grid;
  gap: var(--space-m);
  justify-items: start;
}

.hero__title {
  display: grid;
  gap: 0.4rem;
  max-width: 15ch;
  font-size: var(--step-5);
  text-transform: uppercase;
  line-height: 0.98;
}

.hero__kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.9rem;
  font-size: var(--step--2);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  color: var(--mist);
  line-height: 1.4;
}

.hero__kicker::before {
  content: '';
  flex: none;
  width: 2.2rem;
  height: 2px;
  border-radius: 2px;
  background: var(--led);
  box-shadow: var(--led-glow);
}

.hero__line {
  font-weight: 620;
}

.hero__line--light {
  font-weight: 220;
  color: var(--mist);
}

.hero__lead {
  max-width: 34rem;
  font-size: var(--step-1);
  line-height: 1.55;
  color: var(--mist);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.4rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.6rem;
  margin-top: 0.6rem;
  padding-top: var(--space-s);
  border-top: 1px solid var(--line);
}

.hero__rating {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  font-size: var(--step--1);
}

.hero__rating strong {
  font-weight: 600;
}

.hero__sources {
  color: var(--mist);
}

.hero__scroll {
  position: absolute;
  right: var(--gutter);
  bottom: var(--space-xl);
  display: none;
  place-items: center;
  width: 2.8rem;
  height: 4.2rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--chalk);
}

.hero__scroll .icon {
  transform: rotate(90deg);
}

@media (min-width: 900px) {
  .hero__scroll {
    display: grid;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .hero__inner > * {
    animation: rise 900ms var(--ease) both;
  }
  .hero__inner > :nth-child(2) {
    animation-delay: 120ms;
  }
  .hero__inner > :nth-child(3) {
    animation-delay: 220ms;
  }
  .hero__inner > :nth-child(4) {
    animation-delay: 320ms;
  }
  .hero__scroll .icon {
    animation: nudge 2.4s var(--ease-in-out) 2s infinite;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(1.2rem);
  }
}

@keyframes nudge {
  50% {
    transform: rotate(90deg) translateX(6px);
  }
}
</style>
