/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/** Año del build (define de vite.config.ts). */
declare const __BUILD_YEAR__: number
