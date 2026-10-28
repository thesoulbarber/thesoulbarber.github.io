<script setup lang="ts">
// Landing de un servicio para SEO local ("corte de pelo Santa Coloma"…): contenido propio arriba
// y las mismas secciones de confianza que la portada debajo.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LandingHero from '@/components/sections/LandingHero.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ReviewsSection from '@/components/sections/ReviewsSection.vue'
import VisitSection from '@/components/sections/VisitSection.vue'
import CtaBand from '@/components/sections/CtaBand.vue'
import Icon from '@/components/ui/Icon.vue'
import { PAGE_SERVICES } from '@/data/services'
import { PAGE_IDS, type PageId } from '@/config/routes'
import { usePage } from '@/composables/usePage'

const props = defineProps<{ page: Exclude<PageId, 'home'> }>()

const { t } = useI18n()
const { href } = usePage()

const related = computed(
  () => PAGE_IDS.filter((p) => p !== 'home' && p !== props.page) as Exclude<PageId, 'home'>[],
)
</script>

<template>
  <LandingHero :page="page" />
  <ServicesSection :ids="PAGE_SERVICES[page]" />
  <ExperienceSection />
  <ReviewsSection />
  <VisitSection />

  <nav class="related container" :aria-label="t('landing.related')">
    <h2 class="related__title">{{ t('landing.related') }}</h2>
    <ul>
      <li v-for="p in related" :key="p">
        <a :href="href(p)" class="text-link">
          {{ t(`footer.links.${p}`) }}
          <Icon name="arrow" :size="16" />
        </a>
      </li>
    </ul>
  </nav>

  <CtaBand />
</template>

<style scoped>
.related {
  display: grid;
  gap: var(--space-s);
  padding-top: var(--space-xl);
}

.related__title {
  font-size: var(--step--2);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--mist);
}

.related ul {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
