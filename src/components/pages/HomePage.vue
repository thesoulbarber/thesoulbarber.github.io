<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
// import ExperienceSection from '@/components/sections/ExperienceSection.vue' // sección comentada (2026-10-28)
import ServicesSection from '@/components/sections/ServicesSection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import ReviewsSection from '@/components/sections/ReviewsSection.vue'
import VisitSection from '@/components/sections/VisitSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import CtaBand from '@/components/sections/CtaBand.vue'
</script>

<template>
  <HeroSection />
  <!-- "La experiencia": sección comentada a petición de Dani (2026-10-28). -->
  <!-- <ExperienceSection class="theme-warm" /> -->
  <ServicesSection class="theme-warm" />
  <VisitSection />
  <TeamSection class="theme-warm" />
  <ReviewsSection />
  <GallerySection class="theme-warm" />
  <FaqSection />
  <CtaBand />
</template>
