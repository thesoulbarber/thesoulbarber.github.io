import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/inter'
import './styles/tokens.css'
import './styles/base.css'

import { createSiteApp } from './createApp'
import { routeFromPath } from './config/routes'

// En producción cada página llega prerenderizada (/, /ca/, /corte-de-pelo-santa-coloma/…) y se
// hidrata; en dev #app está vacío, la página y el idioma salen de la ruta y se monta desde cero.
const root = document.getElementById('app')!
const prerendered = root.firstElementChild !== null
const { page, locale } = routeFromPath(location.pathname)

const { app, i18n } = createSiteApp({ ssr: prerendered, locale, page })

if (!prerendered) {
  // Lo que el prerender escribe en el <head> de cada página
  document.documentElement.lang = locale
  document.title = i18n.global.t(`meta.${page}.title`)
}

app.mount(root)

// Activa el desplazamiento suave (base.css) cuando el navegador ya ha llevado la página a su #ancla
window.addEventListener(
  'load',
  () => requestAnimationFrame(() => document.documentElement.classList.add('is-loaded')),
  { once: true },
)
