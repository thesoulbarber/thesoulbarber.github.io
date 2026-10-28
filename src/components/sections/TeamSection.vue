<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BookLink from '@/components/ui/BookLink.vue'
import { TEAM, initials } from '@/data/team'
import { SECTION_IDS } from '@/config/sections'

const { t } = useI18n()
</script>

<template>
  <section :id="SECTION_IDS.team" class="section" aria-labelledby="team-title">
    <div class="container">
      <header class="section-head" v-reveal>
        <p class="eyebrow">{{ t('team.eyebrow') }}</p>
        <h2 id="team-title" class="section-title">
          {{ t('team.title') }} <em>{{ t('team.titleEm') }}</em>
        </h2>
        <p class="lead">{{ t('team.lead') }}</p>
      </header>

      <ul class="team">
        <li v-for="(b, i) in TEAM" :key="b.id" class="barber" v-reveal="{ delay: i * 90 }">
          <div class="barber__portrait">
            <img
              v-if="b.photo"
              :src="b.photo"
              :alt="t('team.photoAlt', { name: b.name })"
              loading="lazy"
              decoding="async"
            />
            <span v-else class="barber__initials" aria-hidden="true">{{ initials(b) }}</span>
            <span class="barber__strip" aria-hidden="true" />
          </div>
          <div class="barber__body">
            <p class="barber__role">{{ t(`team.roles.${b.role}`) }}</p>
            <h3 class="barber__name">
              <span>{{ b.name }}</span>
              <span v-if="b.surname" class="barber__surname">{{ b.surname }}</span>
            </h3>
            <BookLink variant="text" :label="t('team.book', { name: b.name })" />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.team {
  display: grid;
  gap: var(--space-m);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Móvil: ficha horizontal (iniciales a la izquierda); desde 560px, vertical */
.barber {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-m);
  background: var(--coal);
  transition:
    border-color var(--dur-m) var(--ease),
    transform var(--dur-m) var(--ease);
}

.barber:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
}

.barber__portrait {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 9rem;
  overflow: hidden;
  background:
    radial-gradient(120% 85% at 50% 12%, #fdfaf3, #ece4d4 82%);
}

.barber__portrait img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Medallón tipo chapa de barbería: doble aro (nácar + latón) y el monograma */
.barber__initials {
  display: grid;
  place-items: center;
  width: clamp(4.6rem, 3.4rem + 6vw, 6.6rem);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 32%, #fffdf7, #efe7d7);
  box-shadow:
    inset 0 0 0 1px rgb(196 154 90 / 0.55),
    inset 0 0 0 5px rgb(255 255 255 / 0.7),
    inset 0 0 0 6px rgb(196 154 90 / 0.4),
    0 16px 32px -20px rgb(80 58 24 / 0.6);
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: clamp(1.4rem, 1rem + 2vw, 2rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  text-indent: 0.1em;
  color: var(--chalk);
  text-shadow: none;
}

.barber__strip {
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background: var(--led);
  box-shadow: var(--led-glow);
  transform: scaleX(0.25);
  transition: transform var(--dur-l) var(--ease-in-out);
}

.barber:hover .barber__strip {
  transform: none;
}

.barber__body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.4rem;
  justify-items: start;
  padding: var(--space-m);
}

.barber__role {
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step--2);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--ash);
}

.barber__name {
  display: grid;
  align-content: start;
  gap: 0.2rem;
  margin-bottom: 0.6rem;
  font-size: var(--step-1);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.barber__surname {
  font-weight: 250;
  color: var(--mist);
}

@media (min-width: 560px) {
  .team {
    grid-template-columns: repeat(2, 1fr);
  }

  .barber {
    grid-template-columns: none;
    grid-template-rows: auto 1fr;
  }

  .barber__portrait {
    aspect-ratio: 4 / 4.4;
  }
}

@media (min-width: 1000px) {
  .team {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .barber,
  .barber__strip {
    transition: none;
  }
}
</style>
