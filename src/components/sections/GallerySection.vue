<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PhotoSlot from '@/components/ui/PhotoSlot.vue'
import Icon from '@/components/ui/Icon.vue'
import { GALLERY } from '@/data/gallery'
import { SITE } from '@/config/site'
import { SECTION_IDS } from '@/config/sections'

const { t } = useI18n()
</script>

<template>
  <section :id="SECTION_IDS.gallery" class="section section--alt" aria-labelledby="gallery-title">
    <div class="container">
      <header class="section-head gallery__head" v-reveal>
        <p class="eyebrow">{{ t('gallery.eyebrow') }}</p>
        <h2 id="gallery-title" class="section-title">
          {{ t('gallery.title') }} <em>{{ t('gallery.titleEm') }}</em>
        </h2>
        <p class="lead">{{ t('gallery.lead') }}</p>
      </header>

      <ul class="grid">
        <li
          v-for="(item, i) in GALLERY"
          :key="item.id"
          class="tile"
          :class="item.size && `tile--${item.size}`"
          v-reveal="{ delay: (i % 3) * 90 }"
        >
          <figure>
            <PhotoSlot
              :scene="item.scene"
              :src="item.src"
              :alt="t(`gallery.items.${item.id}`)"
              sizes="(min-width: 900px) 33vw, (min-width: 560px) 50vw, 100vw"
            />
            <figcaption>{{ t(`gallery.items.${item.id}`) }}</figcaption>
          </figure>
        </li>
      </ul>

      <p class="follow" v-reveal>
        <a :href="SITE.instagram.url" target="_blank" rel="noopener" class="btn btn--ghost">
          <Icon name="instagram" :size="18" />
          {{ t('gallery.instagram')
          }}<span class="visually-hidden"> {{ t('a11y.newWindow') }}</span>
        </a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 10rem;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tile--wide {
  grid-column: span 2;
}

.tile--tall {
  grid-row: span 2;
}

/* Con dos columnas la última pieza quedaría sola: ocupa la fila entera */
@media (max-width: 899px) {
  .tile:last-child {
    grid-column: span 2;
  }
}

.tile figure {
  position: relative;
  height: 100%;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--r-m);
}

.tile :deep(.photo) {
  position: absolute;
  inset: 0;
  transition: transform 1.2s var(--ease);
}

.tile:hover :deep(.photo) {
  transform: scale(1.04);
}

.tile figcaption {
  position: absolute;
  inset: auto 0 0;
  padding: 2.5rem 1rem 0.9rem;
  background: linear-gradient(transparent, rgb(11 11 12 / 0.9));
  /* El rótulo va siempre sobre la foto oscura: color claro fijo aunque la
     sección sea de tema cálido. */
  color: #f2f2f0;
  font-size: var(--step--1);
  font-weight: 500;
}

.follow {
  display: flex;
  justify-content: center;
  margin-top: var(--space-l);
}

@media (min-width: 560px) {
  .grid {
    grid-auto-rows: 15rem;
    gap: 0.75rem;
  }
}

@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 16rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile :deep(.photo) {
    transition: none;
  }
}
</style>
