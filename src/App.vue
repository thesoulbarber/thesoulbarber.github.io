<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import MobileBar from '@/components/MobileBar.vue'
import WhatsAppButton from '@/components/WhatsAppButton.vue'
import HomePage from '@/components/pages/HomePage.vue'
import ServicePage from '@/components/pages/ServicePage.vue'
import { usePage } from '@/composables/usePage'

const { t } = useI18n()
const { page } = usePage()
</script>

<template>
  <a href="#main" class="skip-link">{{ t('a11y.skip') }}</a>
  <SiteHeader />
  <main id="main" tabindex="-1">
    <HomePage v-if="page === 'home'" />
    <ServicePage v-else :page="page" />
  </main>
  <SiteFooter />
  <MobileBar />
  <WhatsAppButton />
</template>

<style>
main:focus {
  outline: none;
}
</style>
