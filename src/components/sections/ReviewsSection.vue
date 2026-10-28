<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StarRow from '@/components/ui/StarRow.vue'
import Icon from '@/components/ui/Icon.vue'
import { RATINGS, RATINGS_CHECKED, SITE, type Locale } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'
import { TESTIMONIALS, TOPICS } from '@/data/reviews'
import { longDate, score } from '@/utils/format'

const { t, locale } = useI18n()
const loc = () => locale.value as Locale

const sources = [
  { id: 'google', rating: RATINGS.google },
  { id: 'yeasy', rating: RATINGS.yeasy },
] as const

const highlights = ['detail', 'wash', 'time', 'loyal'] as const
</script>

<template>
  <section :id="SECTION_IDS.reviews" class="section" aria-labelledby="reviews-title">
    <div class="container">
      <header class="section-head" v-reveal>
        <p class="eyebrow">{{ t('reviews.eyebrow') }}</p>
        <h2 id="reviews-title" class="section-title">
          {{ t('reviews.title', { score: score(loc(), RATINGS.google.score) }) }}
          <em>{{ t('reviews.titleEm') }}</em>
        </h2>
        <p class="lead">{{ t('reviews.lead') }}</p>
      </header>

      <div class="scores">
        <a
          v-for="(s, i) in sources"
          :key="s.id"
          :href="s.rating.url"
          target="_blank"
          rel="noopener"
          class="score"
          v-reveal="{ delay: i * 100 }"
        >
          <span class="score__value">{{ score(loc(), s.rating.score) }}</span>
          <span class="score__body">
            <StarRow :score="s.rating.score" :size="18" />
            <span class="score__source">{{ t(`reviews.sources.${s.id}`) }}</span>
            <span class="score__count">{{ t('reviews.count', { count: s.rating.count }) }}</span>
          </span>
          <Icon class="score__arrow" name="external" :size="18" />
          <span class="visually-hidden">{{ t('a11y.newWindow') }}</span>
        </a>
      </div>
      <p class="checked">{{ t('reviews.checked', { date: longDate(loc(), RATINGS_CHECKED) }) }}</p>

      <h3 class="subhead" v-reveal>{{ t('reviews.highlightsTitle') }}</h3>
      <ul class="highlights">
        <li v-for="(h, i) in highlights" :key="h" class="highlight" v-reveal="{ delay: i * 80 }">
          <h4 class="highlight__title">{{ t(`reviews.highlights.${h}.title`) }}</h4>
          <p class="highlight__text">{{ t(`reviews.highlights.${h}.text`) }}</p>
        </li>
      </ul>

      <template v-if="TESTIMONIALS.length">
        <h3 class="subhead">{{ t('reviews.quotesTitle') }}</h3>
        <ul class="quotes">
          <li v-for="q in TESTIMONIALS" :key="q.text" class="quote">
            <blockquote>
              <p>{{ q.text }}</p>
            </blockquote>
            <p class="quote__by">{{ q.author }} · {{ t(`reviews.sources.${q.source}`) }}</p>
          </li>
        </ul>
      </template>

      <div class="topics" v-reveal>
        <h3 class="topics__title">{{ t('reviews.topicsTitle') }}</h3>
        <ul class="topics__list">
          <li v-for="topic in TOPICS" :key="topic.id">
            <span class="topics__word">{{ t(`reviews.topics.${topic.id}`) }}</span>
            <span class="topics__n">{{ t('reviews.mentions', { n: topic.count }) }}</span>
          </li>
        </ul>
      </div>

      <div class="actions" v-reveal>
        <a :href="SITE.googleUrl" target="_blank" rel="noopener" class="btn btn--ghost">
          {{ t('reviews.readGoogle')
          }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
        </a>
        <a :href="SITE.googleUrl" target="_blank" rel="noopener" class="text-link">
          {{ t('reviews.write') }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
          <Icon name="star" :size="16" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scores {
  display: grid;
  gap: var(--space-s);
}

.score {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-m);
  padding: var(--space-m) var(--space-l) var(--space-m) var(--space-m);
  border: 1px solid var(--line);
  border-radius: var(--r-m);
  background: linear-gradient(180deg, var(--stone), var(--anthracite));
  text-decoration: none;
  transition: border-color var(--dur-m) var(--ease);
}

.score:hover {
  border-color: var(--line-strong);
}

.score__value {
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: clamp(3.2rem, 2.4rem + 3vw, 4.8rem);
  font-weight: 200;
  line-height: 1;
  text-shadow: 0 0 26px rgb(236 242 255 / 0.35);
}

.score__body {
  display: grid;
  gap: 0.35rem;
}

.score__source {
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step-0);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.score__count {
  font-size: var(--step--1);
  color: var(--mist);
}

.score__arrow {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--ash);
}

.checked {
  margin-top: 0.6rem;
  font-size: var(--step--2);
  color: var(--ash);
}

.subhead {
  margin: var(--space-xl) 0 var(--space-m);
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--mist);
}

.highlights,
.quotes {
  display: grid;
  gap: var(--space-s);
  margin: 0;
  padding: 0;
  list-style: none;
}

.highlight,
.quote {
  padding: var(--space-m);
  border-left: 2px solid var(--led);
  background: linear-gradient(90deg, var(--brass-soft), transparent 70%);
  box-shadow: -6px 0 14px -12px var(--brass);
}

.highlight__title {
  font-family: var(--font-body);
  font-stretch: 100%;
  font-size: var(--step-1);
  font-weight: 600;
  line-height: 1.3;
}

.highlight__text {
  margin-top: 0.35rem;
  color: var(--mist);
}

.quote blockquote {
  margin: 0;
  font-size: var(--step-1);
}

.quote__by {
  margin-top: 0.5rem;
  font-size: var(--step--1);
  color: var(--ash);
}

.topics {
  margin-top: var(--space-xl);
}

.topics__title {
  margin-bottom: var(--space-s);
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--mist);
}

.topics__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.topics__list li {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}

.topics__word {
  font-weight: 600;
}

.topics__n {
  font-size: var(--step--2);
  color: var(--ash);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 1.6rem;
  margin-top: var(--space-l);
}

@media (min-width: 720px) {
  .scores {
    grid-template-columns: repeat(2, 1fr);
  }

  .highlights,
  .quotes {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1100px) {
  .highlights {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
