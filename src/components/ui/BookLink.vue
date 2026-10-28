<script setup lang="ts">
// Enlace a la reserva online (Yeasy). Todas las llamadas a la acción de la web pasan por aquí,
// así que si cambia la plataforma de reservas basta con cambiar SITE.bookingUrl.
import { useI18n } from 'vue-i18n'
import { SITE } from '@/config/site'
import Icon from './Icon.vue'

withDefaults(
  defineProps<{
    label: string
    /** Nombre accesible completo cuando el texto visible es corto ("Reservar" → "Reservar Barba") */
    ariaLabel?: string
    variant?: 'solid' | 'ghost' | 'text'
    small?: boolean
    block?: boolean
    icon?: boolean
  }>(),
  { variant: 'solid', icon: true },
)

const { t } = useI18n()
</script>

<template>
  <a
    :href="SITE.bookingUrl"
    target="_blank"
    rel="noopener"
    :class="
      variant === 'text'
        ? 'text-link'
        : ['btn', { 'btn--ghost': variant === 'ghost', 'btn--small': small, 'btn--block': block }]
    "
    :aria-label="ariaLabel ? `${ariaLabel} ${t('a11y.booking')}` : undefined"
  >
    <Icon v-if="icon && variant !== 'text'" name="calendar" :size="18" />
    {{ label }}<span v-if="!ariaLabel" class="visually-hidden"> {{ t('a11y.booking') }}</span>
    <Icon v-if="variant === 'text'" name="arrow" :size="16" />
  </a>
</template>
