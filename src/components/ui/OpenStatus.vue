<script setup lang="ts">
// "Abierto ahora · hasta las 21:00" / "Cerrado ahora · abrimos mañana a las 09:00".
// Solo aparece en el cliente (depende de la hora de la visita); el hueco se reserva igualmente.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOpeningStatus } from '@/composables/useOpeningStatus'

const { t } = useI18n()
const status = useOpeningStatus()

const detail = computed(() => {
  const s = status.value
  if (!s) return ''
  if (s.open) return t('status.closesAt', { time: s.closesAt })
  if (!s.next) return ''
  const day =
    s.next.inDays === 0
      ? t('status.dayToday')
      : s.next.inDays === 1
        ? t('status.dayTomorrow')
        : t('status.dayOn', { day: t(`visit.days.${s.next.weekday}`).toLowerCase() })
  return t('status.opensAt', { day, time: s.next.time })
})
</script>

<template>
  <p class="status" :class="{ 'is-open': status?.open }" aria-live="polite">
    <template v-if="status">
      <span class="status__dot" aria-hidden="true" />
      <strong>{{ status.open ? t('status.openNow') : t('status.closedNow') }}</strong>
      <span v-if="detail" class="status__detail">{{ detail }}</span>
    </template>
  </p>
</template>

<style scoped>
.status {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem 0.45rem;
  min-height: 1.6em;
  font-size: var(--step--1);
  color: var(--mist);
}

.status strong {
  font-weight: 600;
  color: var(--chalk);
}

.status__detail {
  padding-left: 0.5rem;
  border-left: 1px solid var(--line-strong);
}

.status__dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--ash);
}

.is-open .status__dot {
  background: var(--open);
  box-shadow: 0 0 10px var(--open);
}
</style>
