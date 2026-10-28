<script setup lang="ts">
// Ilustraciones que ocupan el hueco de cada foto mientras no haya fotos reales: el panel de
// piedra con sus tiras LED y el motivo dibujado en línea de luz.
import LedRoom from './LedRoom.vue'
import Icon, { type IconName } from '@/components/ui/Icon.vue'

export type SceneName = 'interior' | 'fade' | 'beard' | 'color' | 'wash' | 'facade'

const props = defineProps<{ scene: SceneName }>()

const icons: Record<Exclude<SceneName, 'interior'>, IconName> = {
  fade: 'scissors',
  beard: 'razor',
  color: 'drop',
  wash: 'chair',
  facade: 'store',
}
</script>

<template>
  <div class="scene" :class="`scene--${props.scene}`">
    <LedRoom v-if="scene === 'interior'" still :vx="980" :vy="520" id-prefix="scene-room" />
    <template v-else>
      <span class="scene__strip scene__strip--a" />
      <span class="scene__strip scene__strip--b" />
      <span class="scene__icon">
        <Icon :name="icons[scene]" :size="88" :stroke="0.9" />
      </span>
    </template>
  </div>
</template>

<style scoped>
.scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    linear-gradient(90deg, transparent 49.6%, rgb(255 255 255 / 0.05) 50%, transparent 50.4%),
    radial-gradient(120% 90% at 30% 20%, #2b2b30, #141417 70%);
}

.scene__strip {
  position: absolute;
  top: -10%;
  bottom: -10%;
  width: 3px;
  border-radius: 3px;
  background: var(--led);
  box-shadow: var(--led-glow);
  opacity: 0.85;
}

.scene__strip--a {
  left: 14%;
}

.scene__strip--b {
  right: 18%;
  opacity: 0.45;
}

.scene__icon {
  position: absolute;
  /* Deja sitio al pie de foto */
  inset: 0 0 2rem;
  display: grid;
  place-items: center;
  color: var(--chalk);
  filter: drop-shadow(0 0 6px rgb(236 242 255 / 0.55));
}

.scene--color .scene__icon {
  color: var(--flame);
  filter: drop-shadow(0 0 10px rgb(90 169 255 / 0.7));
}
</style>
