<script setup lang="ts">
// Iconos de trazo fino (24×24), dibujados a mano para no cargar una librería.
export type IconName =
  | 'arrow'
  | 'external'
  | 'scissors'
  | 'razor'
  | 'comb'
  | 'drop'
  | 'chair'
  | 'clock'
  | 'pin'
  | 'calendar'
  | 'star'
  | 'sparkle'
  | 'wallet'
  | 'instagram'
  | 'phone'
  | 'whatsapp'
  | 'smile'
  | 'store'
  | 'plus'

withDefaults(defineProps<{ name: IconName; size?: number; stroke?: number }>(), {
  size: 20,
  stroke: 1.5,
})
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'arrow'">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </template>
    <template v-else-if="name === 'external'">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </template>
    <template v-else-if="name === 'scissors'">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88" />
      <path d="M14.47 14.48 20 20" />
      <path d="M8.12 8.12 12 12" />
    </template>
    <template v-else-if="name === 'razor'">
      <path d="M3.5 20.5 10 14" />
      <path d="M10 14 19.2 4.8a2.1 2.1 0 0 1 0 3L12.5 14.5c-.8.8-2 .8-2.5-.5Z" />
      <circle cx="10.6" cy="13.4" r=".6" />
    </template>
    <template v-else-if="name === 'comb'">
      <path d="M3 8.5h18v3H3z" />
      <path d="M5 11.5v6M8 11.5v6M11 11.5v6M14 11.5v6M17 11.5v6M20 11.5v4" />
    </template>
    <template v-else-if="name === 'drop'">
      <path
        d="M12 21.5a6.5 6.5 0 0 0 6.5-6.5c0-1.9-.9-3.6-2.8-5.1S12.5 6.2 12 3.5c-.5 2.7-1.9 4.9-3.7 6.4S5.5 13.1 5.5 15a6.5 6.5 0 0 0 6.5 6.5Z"
      />
    </template>
    <template v-else-if="name === 'chair'">
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path
        d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0Z"
      />
      <path d="M5 18v2M19 18v2" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.5V12l3.5 2" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M19.5 10c0 5.5-7.5 11.5-7.5 11.5S4.5 15.5 4.5 10a7.5 7.5 0 0 1 15 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </template>
    <template v-else-if="name === 'calendar'">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M16 2.5v4M8 2.5v4M3.5 10h17" />
    </template>
    <template v-else-if="name === 'star'">
      <path
        d="m12 2.8 2.85 5.77 6.37.93-4.61 4.49 1.09 6.34L12 17.33l-5.7 3 1.09-6.34L2.78 9.5l6.37-.93Z"
      />
    </template>
    <template v-else-if="name === 'sparkle'">
      <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9-5.7-1.8L10.2 9Z" />
      <path d="M19 3v3M17.5 4.5h3" />
    </template>
    <template v-else-if="name === 'wallet'">
      <path d="M19.5 12V8H6a2 2 0 0 1 0-4h12v4" />
      <path d="M4 6v12a2 2 0 0 0 2 2h13.5v-4" />
      <path d="M17.5 12a2 2 0 0 0 0 4h4v-4Z" />
    </template>
    <template v-else-if="name === 'instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </template>
    <template v-else-if="name === 'phone'">
      <path
        d="M21.5 16.9v2.8a1.9 1.9 0 0 1-2.1 1.9 18.8 18.8 0 0 1-8.2-2.9 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.6 4.7 1.9 1.9 0 0 1 4.5 2.6h2.8a1.9 1.9 0 0 1 1.9 1.6c.1.9.4 1.8.7 2.7a1.9 1.9 0 0 1-.4 2L8.3 10.1a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.7.7a1.9 1.9 0 0 1 1.6 1.9Z"
      />
    </template>
    <template v-else-if="name === 'whatsapp'">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-1.9Z" />
    </template>
    <template v-else-if="name === 'smile'">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </template>
    <template v-else-if="name === 'store'">
      <path d="M3 9.5 4.5 4h15L21 9.5" />
      <path d="M3 9.5h18v1a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0Z" />
      <path d="M5 13.5V20h14v-6.5" />
      <path d="M10 20v-4h4v4" />
    </template>
    <template v-else-if="name === 'plus'">
      <path d="M12 5v14M5 12h14" />
    </template>
  </svg>
</template>

<style scoped>
.icon {
  flex: none;
}
</style>
