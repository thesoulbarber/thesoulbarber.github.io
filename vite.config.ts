import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: [resolve(__dirname, './src/i18n/locales/**')],
      runtimeOnly: true,
      compositionOnly: true,
      // Build SSR del prerender: vue-i18n en su versión para Node
      ssr: isSsrBuild,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    // Año del © en el pie: el mismo en el HTML prerenderizado y al hidratar
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    __VUE_I18N_LEGACY_API__: false,
    __VUE_I18N_FULL_INSTALL__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  // 5173–5175 y 5180 los usan otros proyectos de esta máquina
  server: {
    port: 5185,
    strictPort: true,
  },
}))
