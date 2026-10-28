<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/ui/Icon.vue'
import BookLink from '@/components/ui/BookLink.vue'
import OpenStatus from '@/components/ui/OpenStatus.vue'
import { OPENING_HOURS, SITE } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'
import { useOpeningStatus } from '@/composables/useOpeningStatus'

const { t } = useI18n()
const status = useOpeningStatus()

// La semana empieza en lunes
const week = [1, 2, 3, 4, 5, 6, 0]

// El mapa de Google solo se carga si la persona lo pide (sin cookies de terceros por defecto)
const mapLoaded = ref(false)
</script>

<template>
  <section :id="SECTION_IDS.visit" class="section section--alt" aria-labelledby="visit-title">
    <div class="container">
      <header class="section-head" v-reveal>
        <p class="eyebrow">{{ t('visit.eyebrow') }}</p>
        <h2 id="visit-title" class="section-title">
          {{ t('visit.title') }} <em>{{ t('visit.titleEm') }}</em>
        </h2>
      </header>

      <div class="visit">
        <div class="card info" v-reveal>
          <dl class="info__list">
            <div class="info__item">
              <dt><Icon name="pin" :size="18" />{{ t('visit.address') }}</dt>
              <dd>
                <address>
                  {{ SITE.address.street }}<br />
                  {{ SITE.address.postalCode }} {{ SITE.address.city }}
                </address>
                <p class="info__note">{{ t('visit.near') }}</p>
                <a :href="SITE.directionsUrl" target="_blank" rel="noopener" class="text-link">
                  {{ t('visit.directions')
                  }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
                  <Icon name="arrow" :size="16" />
                </a>
              </dd>
            </div>
            <div class="info__item">
              <dt><Icon name="calendar" :size="18" />{{ t('visit.booking') }}</dt>
              <dd>
                <p class="info__note">
                  {{ t('visit.bookingText', { hours: SITE.cancelHours }) }}
                </p>
                <BookLink :label="t('nav.bookLong')" small />
              </dd>
            </div>
            <div v-if="SITE.phone" class="info__item">
              <dt><Icon name="phone" :size="18" />{{ t('visit.phone') }}</dt>
              <dd>
                <a :href="SITE.phone.href">{{ SITE.phone.display }}</a>
              </dd>
            </div>
            <div v-if="SITE.whatsapp" class="info__item">
              <dt><Icon name="whatsapp" :size="18" />{{ t('visit.whatsapp') }}</dt>
              <dd>
                <a :href="`https://wa.me/${SITE.whatsapp.number}`" target="_blank" rel="noopener">
                  {{ SITE.whatsapp.display
                  }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
                </a>
              </dd>
            </div>
            <div class="info__item">
              <dt><Icon name="instagram" :size="18" />{{ t('visit.social') }}</dt>
              <dd>
                <a :href="SITE.instagram.url" target="_blank" rel="noopener">
                  {{ SITE.instagram.handle
                  }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div class="card hours" v-reveal="{ delay: 100 }">
          <h3 class="hours__title">
            <Icon name="clock" :size="20" />
            {{ t('visit.hours') }}
          </h3>
          <OpenStatus class="hours__status" />
          <table class="hours__table">
            <caption class="visually-hidden">
              {{
                t('visit.hours')
              }}
            </caption>
            <tbody>
              <tr v-for="day in week" :key="day" :class="{ 'is-today': status?.today === day }">
                <th scope="row">
                  {{ t(`visit.days.${day}`) }}
                  <span v-if="status?.today === day" class="hours__today">{{
                    t('visit.today')
                  }}</span>
                </th>
                <td>
                  <template v-if="OPENING_HOURS[day].length">
                    <span v-for="r in OPENING_HOURS[day]" :key="r.open">
                      {{ r.open }} – {{ r.close }}
                    </span>
                  </template>
                  <span v-else class="hours__closed">{{ t('visit.closed') }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="map" v-reveal="{ delay: 160 }">
          <iframe
            v-if="mapLoaded"
            :src="SITE.mapsEmbed"
            :title="t('visit.mapTitle')"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div v-else class="map__facade">
            <!-- Plano esquemático: calles en retícula y el local marcado con luz -->
            <svg
              class="map__art"
              viewBox="0 0 600 420"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <rect width="600" height="420" fill="#141417" />
              <g stroke="#26262b" stroke-width="16" stroke-linecap="square">
                <path d="M-20 90 L620 60" />
                <path d="M-20 220 L620 200" />
                <path d="M-20 350 L620 330" />
                <path d="M110 -20 L140 440" />
                <path d="M300 -20 L320 440" />
                <path d="M480 -20 L500 440" />
              </g>
              <path
                d="M-20 270 C 160 250 380 300 620 250"
                stroke="#2f2f35"
                stroke-width="26"
                fill="none"
              />
              <g stroke="#0f0f11" stroke-width="2" fill="none" opacity="0.8">
                <path d="M-20 90 L620 60" />
                <path d="M-20 220 L620 200" />
              </g>
              <circle cx="306" cy="150" r="46" fill="rgb(236 242 255 / 0.06)" />
              <circle cx="306" cy="150" r="22" fill="rgb(236 242 255 / 0.12)" />
              <circle cx="306" cy="150" r="7" fill="#fff" />
              <circle
                cx="306"
                cy="150"
                r="7"
                fill="none"
                stroke="#fff"
                stroke-width="2"
                class="map__ping"
              />
            </svg>
            <div class="map__overlay">
              <p class="map__label">{{ SITE.address.street }}</p>
              <button type="button" class="btn btn--small" @click="mapLoaded = true">
                <Icon name="pin" :size="16" />
                {{ t('visit.mapLoad') }}
              </button>
              <p class="map__consent">{{ t('visit.mapConsent') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.visit {
  display: grid;
  gap: var(--space-m);
}

.info__list {
  display: grid;
  gap: var(--space-m);
  margin: 0;
}

.info__item {
  display: grid;
  gap: 0.4rem;
}

.info__item dt {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--mist);
}

.info__item dd {
  display: grid;
  gap: 0.5rem;
  justify-items: start;
  margin: 0;
  font-size: var(--step-1);
}

.info__item dd a:not(.btn):not(.text-link) {
  text-decoration-color: var(--line-strong);
}

.info__item .text-link {
  font-size: var(--step--1);
}

address {
  font-style: normal;
}

.info__note {
  font-size: var(--step--1);
  color: var(--mist);
}

.hours__title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: var(--step-1);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hours__status {
  margin: 0.4rem 0 var(--space-s);
}

.hours__table {
  width: 100%;
  border-collapse: collapse;
}

.hours__table tr {
  border-bottom: 1px solid var(--line);
}

.hours__table th,
.hours__table td {
  padding: 0.6rem 0.5rem;
}

.hours__table th {
  font-weight: 500;
  text-align: left;
}

.hours__table td {
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.hours__table tr.is-today {
  background: rgb(255 255 255 / 0.06);
  box-shadow: inset 2px 0 0 var(--led);
}

.hours__today {
  display: inline-block;
  margin-left: 0.4rem;
  padding: 0.05rem 0.45rem;
  border-radius: 3px;
  background: var(--chalk);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--night);
  vertical-align: 0.15em;
}

.hours__closed {
  color: var(--ash);
}

.map {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-m);
}

.map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  filter: grayscale(1) invert(0.92) contrast(0.9);
}

.map__facade {
  position: absolute;
  inset: 0;
}

.map__art {
  width: 100%;
  height: 100%;
}

.map__ping {
  transform-origin: 306px 150px;
}

@media (prefers-reduced-motion: no-preference) {
  .map__ping {
    animation: ping 2.4s var(--ease) infinite;
  }
}

@keyframes ping {
  to {
    transform: scale(6);
    opacity: 0;
  }
}

.map__overlay {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  justify-items: center;
  gap: 0.6rem;
  padding: 3rem 1.2rem 1.4rem;
  background: linear-gradient(transparent, rgb(11 11 12 / 0.95) 45%);
  text-align: center;
}

.map__label {
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step-0);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.map__consent {
  max-width: 24rem;
  font-size: 0.78rem;
  color: var(--ash);
}

@media (min-width: 760px) {
  .visit {
    grid-template-columns: 1fr 1fr;
  }

  .map {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1100px) {
  .visit {
    grid-template-columns: 1fr 1fr 1.3fr;
  }

  .map {
    grid-column: auto;
  }
}
</style>
