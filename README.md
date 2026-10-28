# The Soul Barber · web

Web de [The Soul Barber](https://www.instagram.com/the_soulbarber/), barbería en C/ dels Sagarra 5,
Santa Coloma de Gramenet. Hecha a partir del brief de octubre de 2026.
Vue 3 + Vite + TypeScript + vue-i18n (castellano y catalán).

```bash
npm install
npm run dev      # http://localhost:5185 (y /ca/)
npm run build    # comprueba tipos y genera dist/ con el HTML prerenderizado de cada página
npm run preview  # sirve dist/ en http://localhost:4173
```

## Páginas

Cada página se prerenderiza en los dos idiomas, con su `<title>`, descripción, `og:*`, `canonical` y
`hreflang`, más `dist/sitemap.xml` y `dist/robots.txt`. Al cargar, Vue hidrata la página.

| Página | Castellano | Català |
| --- | --- | --- |
| Portada | `/` | `/ca/` |
| Corte de pelo y degradados | `/corte-de-pelo-santa-coloma/` | `/ca/tall-de-cabell-santa-coloma/` |
| Arreglo de barba | `/arreglo-de-barba-santa-coloma/` | `/ca/arranjament-de-barba-santa-coloma/` |
| Corte para niños | `/corte-de-pelo-nino-santa-coloma/` | `/ca/tall-de-cabell-nens-santa-coloma/` |

Las tres landings de servicio existen para SEO local ("corte de pelo Santa Coloma"…), como hace la
competencia. Las rutas están en `src/config/routes.ts`.

La portada sigue la estructura del brief: hero, la experiencia, servicios y precios, equipo, trabajos,
reseñas, visítanos (horario, mapa), preguntas frecuentes y llamada final. En móvil hay una barra fija con
"Cómo llegar" y "Reservar".

## Reservas

Todos los botones de reserva llevan a Yeasy (`SITE.bookingUrl` en `src/config/site.ts`), que es lo que
ya usa el local: sin tarjeta, pago en el local y cancelación gratis hasta 6 h antes. Si cambian de
plataforma, basta con cambiar esa URL.

## Qué es real y qué falta

Todo el contenido sale de fuentes verificadas el 23-10-2026 (Instagram, Yeasy y Google Maps): dirección,
horario, carta y precios, equipo, valoraciones y temas de las reseñas. No hay testimonios, fotos ni datos
inventados.

**Pendiente de confirmar con el local:**

- **Dominio** (`SITE.url` y la URL del JSON-LD de `index.html`): ahora es `thesoulbarber.es`, provisional.
- **Teléfono y WhatsApp** (`SITE.phone`, `SITE.whatsapp`): no se publican en ningún sitio. Con valor,
  aparecen en contacto y pie, y sale el botón flotante de WhatsApp.
- **Logo** (`SITE.logo`): puesto `public/logo-soul-barber.png` (lockup cuadrado, marca blanca con fondo
  transparente, derivado del logo original por luminancia). Se usa en cabecera, pie y en el JSON-LD.
  Mejora pendiente: una versión **SVG** y/o **horizontal** (monograma + texto en línea) luciría más nítida
  y con más presencia en la cabecera, donde el lockup cuadrado queda pequeño.
- **Fotos** (`src/data/gallery.ts`, `src/data/team.ts`): cada hueco muestra una ilustración con el mismo
  encuadre. Para usar una foto, ponla en `public/fotos/` y añade `src` (galería) o `photo` (equipo).
- **Vídeo del hero** (`SITE.heroVideo`): sin vídeo se ve la ilustración del techo con las tiras LED.
- **Equipo**: especialidades, años de experiencia y si "Michy" (destacado de Instagram) es Miguel Muñoz.
- **Color y diseños**: los hacen (reel "Blue Flames") pero no están en la carta de Yeasy; la web dice
  "pregúntanos". Si se añaden con precio, van en `src/data/services.ts` y en los textos.
- **Testimonios** (`src/data/reviews.ts`): vacío a propósito. Añadir solo textos originales con permiso
  de su autor; mientras tanto la sección muestra las notas y los temas que Google agrupa.
- **Valoraciones** (`RATINGS` en `src/config/site.ts`): 5,0 en Google (49) y Yeasy (264) a 23-10-2026.
  Actualizar de vez en cuando, junto con `RATINGS_CHECKED`.
- **Textos legales**: los enlaces del pie (aviso legal, privacidad, cookies) apuntan a `#`.
- **Significado de "Soul"**: la web no lo interpreta; si hay historia de marca, cabe una sección.

## Dónde está cada cosa

- `src/config/site.ts`: datos del local, reservas, valoraciones y horario.
- `src/config/routes.ts`: páginas y sus URL por idioma.
- `src/data/`: carta (`services.ts`), equipo, galería y reseñas.
- `src/i18n/locales/`: todos los textos en `es` y `ca`.
- `src/styles/tokens.css`: colores, tipografías y medidas como variables CSS.
- `src/components/art/LedRoom.vue`: la ilustración del techo con las tiras LED (motivo de la marca).
- `scripts/prerender.mjs`: genera el HTML de cada página y comprueba que no falte nada.
