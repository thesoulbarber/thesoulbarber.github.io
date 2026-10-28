// Último paso de `npm run build-only`:
//
//   vite build                                            cliente → dist/
//   vite build --ssr src/entry-server.ts --outDir .ssr    bundle SSR → .ssr/entry-server.js
//   node scripts/prerender.mjs                            este script
//
// 1. Toma dist/index.html (la plantilla del build de cliente) y quita su <title> de desarrollo.
// 2. Renderiza cada página en cada idioma con render(page, locale) del bundle SSR.
// 3. Por página: pone <html lang>, rellena <!--head--> con sus etiquetas (title, description,
//    canonical, hreflang, og:*) y <!--app-html--> con el marcado de la app.
// 4. Comprueba cada página (un <title>, lang, canonical, un <h1>, sin claves i18n sin traducir)
//    y, solo si todas están bien, las escribe (dist/index.html, dist/ca/index.html, …).
// 5. Escribe dist/sitemap.xml (con las alternativas hreflang) y dist/robots.txt.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

// vue y vue-i18n quedan fuera del bundle SSR: que Node cargue sus builds de producción
process.env.NODE_ENV ??= 'production'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, '.ssr', 'entry-server.js')
const LOCALE_DIR = join(ROOT, 'src', 'i18n', 'locales')

class BuildError extends Error {}

const show = (p) => relative(ROOT, p).split(sep).join('/')

async function prerender() {
  // 1. Plantilla ----------------------------------------------------------------
  const templatePath = join(OUT, 'index.html')
  if (!existsSync(templatePath)) {
    throw new BuildError(`${show(templatePath)} not found — run \`vite build\` first`)
  }
  let template = readFileSync(templatePath, 'utf8')
  if (!template.includes('<!--head-->') || !template.includes('<!--app-html-->')) {
    throw new BuildError(
      `${show(templatePath)} is not the client build template (already prerendered?) — run \`npm run build-only\``,
    )
  }
  if (!/<script\b[^>]*\btype="module"[^>]*\bsrc="[^"]+\.js"/i.test(template)) {
    throw new BuildError(
      `${show(templatePath)} has no module script — the pages would never hydrate`,
    )
  }
  template = template.replace(/[ \t]*<title>[\s\S]*?<\/title>[ \t]*\r?\n?/i, '')

  // 2. Bundle SSR -----------------------------------------------------------------
  if (!existsSync(SSR_ENTRY)) {
    throw new BuildError(
      `${show(SSR_ENTRY)} not found — run \`vite build --ssr src/entry-server.ts --outDir .ssr\``,
    )
  }
  const { render, PAGE_IDS, SUPPORTED_LOCALES } = await import(pathToFileURL(SSR_ENTRY).href)
  const namespaces = Object.keys(JSON.parse(readFileSync(join(LOCALE_DIR, 'es.json'), 'utf8')))

  // 3. Una página por combinación página × idioma --------------------------------------
  const pages = []
  for (const pageId of PAGE_IDS) {
    for (const locale of SUPPORTED_LOCALES) {
      let rendered
      try {
        rendered = await render(pageId, locale)
      } catch (e) {
        throw new BuildError(`render('${pageId}', '${locale}') failed:\n${e?.stack ?? e}`)
      }
      const { html, head, headHtml } = rendered
      const path = new URL(head.canonical).pathname
      const page = template
        .replace(/(<html\b[^>]*?\blang=")[^"]*(")/i, (_, open, close) => `${open}${locale}${close}`)
        .replace('<!--head-->', () => headHtml)
        .replace('<!--app-html-->', () => html)

      // 4. Comprobaciones
      const problems = validatePage(page, { locale, head, html, namespaces })
      if (problems.length) {
        throw new BuildError(`${path} (${locale}) is broken:\n  - ${problems.join('\n  - ')}`)
      }
      if (pages.some((p) => p.path === path)) throw new BuildError(`duplicate path ${path}`)
      const file = join(OUT, ...path.split('/').filter(Boolean), 'index.html')
      pages.push({ locale, path, file, page, head })
    }
  }

  for (const { file, page } of pages) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, page)
  }

  // 5. sitemap.xml y robots.txt ---------------------------------------------------------
  writeFileSync(join(OUT, 'sitemap.xml'), sitemap(pages))
  const sitemapUrl = new URL('/sitemap.xml', pages[0].head.canonical).href
  writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`)

  for (const { file, locale, page } of pages) {
    const kb = (Buffer.byteLength(page) / 1024).toFixed(1)
    console.log(`prerender: ${show(file).padEnd(52)} ${locale}  ${kb} kB`)
  }
  console.log('prerender: wrote dist/sitemap.xml, dist/robots.txt')
}

function validatePage(page, { locale, head, html, namespaces }) {
  const problems = []
  const titles = page.match(/<title[\s>]/gi)?.length ?? 0
  if (titles !== 1) problems.push(`${titles} <title> elements (expected 1)`)
  if (!new RegExp(`<html\\b[^>]*\\blang="${locale}"`, 'i').test(page)) {
    problems.push(`<html lang="${locale}"> not set`)
  }
  if (page.includes('<!--head-->') || page.includes('<!--app-html-->')) {
    problems.push('a template marker was not replaced')
  }
  if (!page.includes(`<link rel="canonical" href="${head.canonical}" />`)) {
    problems.push(`no canonical link to ${head.canonical}`)
  }
  const h1s = html.match(/<h1[\s>]/gi)?.length ?? 0
  if (h1s !== 1) problems.push(`${h1s} <h1> elements (expected 1)`)
  if (!/<div id="app"><(?!\/div>)/.test(page)) {
    problems.push('<div id="app"> must start directly with the rendered markup')
  }

  // Un "hero.cta" visible es un mensaje que falta
  const visible = page
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
  const ns = namespaces.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const keyPath = new RegExp(`(?<![\\w./-])(?:${ns})(?:\\.[\\w-]+)+(?![\\w-]|\\.\\w)`, 'g')
  const leaked = [...new Set(visible.match(keyPath) ?? [])]
  if (leaked.length)
    problems.push(`rendered i18n key paths (missing messages?): ${leaked.join(', ')}`)

  const suspicious = visible.match(/\bundefined\b|\[object Object\]|\bNaN\b/g)
  if (suspicious) problems.push(`the markup contains ${[...new Set(suspicious)].join(', ')}`)
  return problems
}

function sitemap(pages) {
  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...pages.flatMap(({ head }) => [
      '  <url>',
      `    <loc>${esc(head.canonical)}</loc>`,
      ...head.alternates.map(
        (a) =>
          `    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}"/>`,
      ),
      '  </url>',
    ]),
    '</urlset>',
    '',
  ].join('\n')
}

try {
  await prerender()
} catch (e) {
  console.error(`prerender: ${e instanceof BuildError ? e.message : (e?.stack ?? e)}`)
  process.exitCode = 1
}
