<script setup lang="ts">
// El techo del local en perspectiva: tiras LED que corren hacia el fondo, paneles de piedra en
// las paredes con tiras verticales y el suelo claro que refleja la luz. La geometría se calcula
// a partir de un punto de fuga; las tiras se "encienden" una a una al cargar.
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Punto de fuga en el lienzo de 1600×1000 */
    vx?: number
    vy?: number
    /** Sin animación de encendido (miniaturas) */
    still?: boolean
    idPrefix?: string
  }>(),
  { vx: 1060, vy: 470, still: false, idPrefix: 'room' },
)

const W = 1600
const H = 1000

interface Seg {
  x1: number
  y1: number
  x2: number
  y2: number
  d: number
}

/** Punto a escala `s` entre el punto de fuga (s=0) y el plano cercano (s=1). */
const at = (X: number, Y: number, s: number) => ({
  x: props.vx + (X - props.vx) * s,
  y: props.vy + (Y - props.vy) * s,
})

const r = (n: number) => Math.round(n * 10) / 10

// Tiras del techo: líneas paralelas en 3D → rayos desde el punto de fuga
const ceiling = computed<Seg[]>(() =>
  [-900, -300, 300, 900, 1500, 2100, 2700].map((X, i) => {
    const a = at(X, -380, 0.16)
    const b = at(X, -380, 1.25)
    return { x1: r(a.x), y1: r(a.y), x2: r(b.x), y2: r(b.y), d: i * 120 }
  }),
)

// Reflejo en el suelo, muy tenue
const floor = computed<Seg[]>(() =>
  [-300, 600, 1500, 2400].map((X, i) => {
    const a = at(X, 1500, 0.2)
    const b = at(X, 1500, 1.1)
    return { x1: r(a.x), y1: r(a.y), x2: r(b.x), y2: r(b.y), d: i }
  }),
)

// Paredes: juntas de los paneles de piedra y tiras verticales a distintas profundidades
const depths = [0.86, 0.62, 0.45, 0.33, 0.25, 0.19]
const wall = (X: number) =>
  depths.map((s, i) => {
    const top = at(X, -380, s)
    const bottom = at(X, 1500, s)
    return { x1: r(top.x), y1: r(top.y), x2: r(bottom.x), y2: r(bottom.y), d: 300 + i * 140 }
  })
const leftWall = computed(() => wall(-500))
const rightWall = computed(() => wall(2700))

// Pared del fondo, a la profundidad s = BACK
const BACK = 0.16
const corners = [
  [-500, -380],
  [2700, -380],
  [-500, 1500],
  [2700, 1500],
] as const
const back = computed(() => {
  const tl = at(-500, -380, BACK)
  const br = at(2700, 1500, BACK)
  return { x: r(tl.x), y: r(tl.y), w: r(br.x - tl.x), h: r(br.y - tl.y) }
})

const id = (name: string) => `${props.idPrefix}-${name}`
</script>

<template>
  <svg
    class="room"
    :class="{ 'is-still': still }"
    :viewBox="`0 0 ${W} ${H}`"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <radialGradient :id="id('haze')" :cx="vx / W" :cy="vy / H" r="0.75">
        <stop offset="0" stop-color="#2a2a2f" />
        <stop offset="0.45" stop-color="#151518" />
        <stop offset="1" stop-color="#0b0b0c" />
      </radialGradient>
      <linearGradient :id="id('floor')" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1d1d21" />
        <stop offset="1" stop-color="#3a3a40" />
      </linearGradient>
      <filter :id="id('glow')" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect :width="W" :height="H" :fill="`url(#${id('haze')})`" />

    <!-- Suelo -->
    <polygon
      :points="`${at(-500, 1500, 1.4).x},${at(-500, 1500, 1.4).y} ${vx},${vy} ${at(2700, 1500, 1.4).x},${at(2700, 1500, 1.4).y}`"
      :fill="`url(#${id('floor')})`"
      opacity="0.55"
    />
    <line
      v-for="(s, i) in floor"
      :key="`f${i}`"
      class="room__reflection"
      :x1="s.x1"
      :y1="s.y1"
      :x2="s.x2"
      :y2="s.y2"
    />

    <!-- Pared del fondo -->
    <rect
      :x="back.x"
      :y="back.y"
      :width="back.w"
      :height="back.h"
      fill="#141417"
      stroke="#2c2c31"
      stroke-width="1.5"
    />

    <!-- Juntas de los paneles -->
    <g class="room__joints">
      <line
        v-for="(s, i) in [...leftWall, ...rightWall]"
        :key="`j${i}`"
        :x1="s.x1"
        :y1="s.y1"
        :x2="s.x2"
        :y2="s.y2"
      />
      <!-- Aristas de la sala: de las esquinas de la pared del fondo hacia delante -->
      <line
        v-for="([X, Y], i) in corners"
        :key="`k${i}`"
        :x1="at(X, Y, BACK).x"
        :y1="at(X, Y, BACK).y"
        :x2="at(X, Y, 1.4).x"
        :y2="at(X, Y, 1.4).y"
      />
    </g>

    <!-- Luz -->
    <g :filter="`url(#${id('glow')})`">
      <line
        v-for="(s, i) in ceiling"
        :key="`c${i}`"
        class="room__led"
        :style="{ '--d': `${s.d}ms` }"
        :x1="s.x1"
        :y1="s.y1"
        :x2="s.x2"
        :y2="s.y2"
        pathLength="1"
      />
      <line
        v-for="(s, i) in [leftWall[1], leftWall[3], rightWall[2], rightWall[4]]"
        :key="`v${i}`"
        class="room__led room__led--wall"
        :style="{ '--d': `${s.d + 500}ms` }"
        :x1="s.x1"
        :y1="s.y1"
        :x2="s.x2"
        :y2="s.y2"
        pathLength="1"
      />
    </g>
  </svg>
</template>

<style scoped>
.room {
  width: 100%;
  height: 100%;
}

.room__joints line {
  stroke: #2a2a2f;
  stroke-width: 1.5;
}

.room__reflection {
  stroke: rgb(255 255 255 / 0.07);
  stroke-width: 10;
  stroke-linecap: round;
}

.room__led {
  stroke: #fff;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

.room__led--wall {
  stroke-width: 3;
  opacity: 0.85;
}

@media (prefers-reduced-motion: no-preference) {
  .room:not(.is-still) .room__led {
    animation:
      switch-on 1.4s var(--ease-in-out) var(--d) both,
      hum 7s ease-in-out calc(var(--d) + 1.6s) infinite;
  }
}

@keyframes switch-on {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  /* Parpadeo al arrancar, como un fluorescente */
  12% {
    opacity: 0.35;
  }
  16% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes hum {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.82;
  }
}
</style>
