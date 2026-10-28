<script setup lang="ts">
// Hueco preparado para una foto real. Mientras no haya `src`, muestra la ilustración del mismo
// motivo, con el mismo texto alternativo.
import SceneArt, { type SceneName } from '@/components/art/SceneArt.vue'

defineProps<{
  scene: SceneName
  alt: string
  /** Ruta de la foto real, p. ej. '/fotos/degradado.jpg' (carpeta public/). */
  src?: string
  sizes?: string
}>()
</script>

<template>
  <img
    v-if="src"
    class="photo"
    :src="src"
    :alt="alt"
    :sizes="sizes"
    loading="lazy"
    decoding="async"
  />
  <div v-else class="photo" role="img" :aria-label="alt">
    <SceneArt :scene="scene" />
  </div>
</template>

<style scoped>
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
