<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Wordmark from '@/components/art/Wordmark.vue'
import Icon from '@/components/ui/Icon.vue'
import BookLink from '@/components/ui/BookLink.vue'
import { OPENING_HOURS, SITE } from '@/config/site'
import { usePage } from '@/composables/usePage'

const { t } = useI18n()
const { href } = usePage()

const year = __BUILD_YEAR__
const range = (day: number) => OPENING_HOURS[day].map((r) => `${r.open}–${r.close}`).join(', ')
const hours = [
  { key: 'footer.hoursMon', value: range(1) },
  { key: 'footer.hoursWeek', value: range(2) },
  { key: 'footer.hoursSat', value: range(6) },
  { key: 'footer.hoursSun', value: '' },
]

const serviceLinks = [
  { page: 'cuts', key: 'footer.links.cuts' },
  { page: 'beard', key: 'footer.links.beard' },
  { page: 'kids', key: 'footer.links.kids' },
] as const
</script>

<template>
  <footer class="footer">
    <div class="footer__led" aria-hidden="true" />
    <div class="container footer__grid">
      <div class="footer__brand">
        <Wordmark size="l" />
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
        <BookLink :label="t('nav.bookLong')" small />
      </div>

      <div>
        <h2 class="footer__title">{{ t('footer.visit') }}</h2>
        <address class="footer__address">
          {{ SITE.address.street }}<br />
          {{ SITE.address.postalCode }} {{ SITE.address.city }}
        </address>
        <a :href="SITE.directionsUrl" target="_blank" rel="noopener" class="footer__link">
          {{ t('visit.directions') }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
        </a>
        <a v-if="SITE.phone" :href="SITE.phone.href" class="footer__link">{{
          SITE.phone.display
        }}</a>
      </div>

      <div>
        <h2 class="footer__title">{{ t('footer.hours') }}</h2>
        <dl class="footer__hours">
          <div v-for="h in hours" :key="h.key">
            <dt>{{ t(h.key) }}</dt>
            <dd>{{ h.value || t('visit.closed') }}</dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 class="footer__title">{{ t('footer.services') }}</h2>
        <ul class="footer__list">
          <li v-for="l in serviceLinks" :key="l.page">
            <a :href="href(l.page)" class="footer__link">{{ t(l.key) }}</a>
          </li>
        </ul>
        <h2 class="footer__title footer__title--spaced">{{ t('footer.follow') }}</h2>
        <a :href="SITE.instagram.url" target="_blank" rel="noopener" class="footer__social">
          <Icon name="instagram" :size="18" />
          {{ SITE.instagram.handle }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
        </a>
      </div>
    </div>

    <div class="container footer__bottom">
      <p>{{ t('footer.rights', { year }) }}</p>
      <!-- PENDIENTE: páginas legales (aviso legal, privacidad, cookies) -->
      <ul class="footer__legal">
        <li>
          <a href="#">{{ t('footer.legal.notice') }}</a>
        </li>
        <li>
          <a href="#">{{ t('footer.legal.privacy') }}</a>
        </li>
        <li>
          <a href="#">{{ t('footer.legal.cookies') }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: var(--space-xl);
  padding-bottom: calc(var(--space-m) + var(--mobile-bar-h));
  background: var(--coal);
  border-top: 1px solid var(--line);
  font-size: var(--step--1);
  color: var(--mist);
}

.footer__led {
  position: absolute;
  top: -1px;
  left: 50%;
  width: min(30rem, 70%);
  height: 2px;
  border-radius: 2px;
  background: var(--led);
  box-shadow: var(--led-glow);
  transform: translateX(-50%);
}

.footer__grid {
  display: grid;
  gap: var(--space-l);
}

.footer__brand {
  display: grid;
  gap: var(--space-s);
  justify-items: start;
  color: var(--chalk);
}

/* El lockup, ya recortado a su contenido, lo mostramos lo más grande posible
   dentro de la columna de marca, manteniendo la proporción. */
.footer__brand :deep(.logo) {
  width: min(100%, 24rem);
  height: auto;
  margin-bottom: var(--space-2xs);
}

.footer__tagline {
  color: var(--mist);
}

.footer__title {
  margin-bottom: 0.8rem;
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--chalk);
}

.footer__title--spaced {
  margin-top: var(--space-m);
}

.footer__address {
  font-style: normal;
}

.footer__link {
  display: inline-block;
  margin-top: 0.4rem;
  text-decoration-color: var(--line-strong);
}

.footer__link:hover {
  color: var(--chalk);
}

.footer__hours {
  display: grid;
  gap: 0.3rem;
  margin: 0;
}

.footer__hours div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  max-width: 15rem;
}

.footer__hours dd {
  margin: 0;
  font-variant-numeric: tabular-nums;
  color: var(--chalk);
}

.footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__list .footer__link {
  margin-top: 0.2rem;
}

.footer__social {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--chalk);
}

.footer__social:hover {
  text-shadow: 0 0 12px rgb(236 242 255 / 0.6);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.6rem 1.5rem;
  margin-top: var(--space-xl);
  padding-top: var(--space-m);
  border-top: 1px solid var(--line);
  font-size: var(--step--2);
  color: var(--ash);
}

.footer__legal {
  display: flex;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__legal a:hover {
  color: var(--chalk);
}

@media (min-width: 720px) {
  .footer {
    padding-bottom: var(--space-m);
  }

  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .footer__grid {
    grid-template-columns: 1.3fr 1fr 1fr 1.1fr;
  }
}
</style>
