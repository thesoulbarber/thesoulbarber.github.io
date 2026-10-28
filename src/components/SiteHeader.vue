<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Wordmark from '@/components/art/Wordmark.vue'
import LangSwitch from '@/components/ui/LangSwitch.vue'
import BookLink from '@/components/ui/BookLink.vue'
import { useScrolled } from '@/composables/useScrolled'
import { useActiveSection } from '@/composables/useActiveSection'
import { usePage } from '@/composables/usePage'
import { SECTION_IDS } from '@/config/sections'

const { t } = useI18n()
const { page, sectionHref, href } = usePage()

const links = [
  { id: SECTION_IDS.services, key: 'nav.services' },
  { id: SECTION_IDS.visit, key: 'nav.visit' },
  { id: SECTION_IDS.team, key: 'nav.team' },
  { id: SECTION_IDS.reviews, key: 'nav.reviews' },
  { id: SECTION_IDS.gallery, key: 'nav.gallery' },
] as const

const scrolled = useScrolled(40)
const active = useActiveSection(page === 'home' ? links.map((l) => l.id) : [])

const open = ref(false)
const toggleBtn = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)

function close(restoreFocus = true) {
  open.value = false
  if (restoreFocus) nextTick(() => toggleBtn.value?.focus())
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  // Atrapa el foco dentro del panel mientras está abierto
  if (e.key === 'Tab' && panel.value) {
    const focusables = [
      toggleBtn.value,
      ...panel.value.querySelectorAll<HTMLElement>('a, button'),
    ].filter((el): el is HTMLElement => !!el)
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(open, (isOpen) => {
  document.documentElement.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    document.addEventListener('keydown', onKeydown)
    nextTick(() => panel.value?.querySelector<HTMLElement>('a')?.focus())
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="header__bar container">
      <a
        :href="page === 'home' ? '#inicio' : href('home')"
        class="header__brand"
        :aria-label="t('a11y.home')"
        @click="open && close(false)"
      >
        <Wordmark size="s" variant="mark" />
      </a>

      <nav class="header__nav" :aria-label="t('a11y.mainNav')">
        <ul>
          <li v-for="link in links" :key="link.id">
            <a
              :href="sectionHref(link.id)"
              :aria-current="active === link.id ? 'location' : undefined"
            >
              {{ t(link.key) }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <LangSwitch class="header__lang" />
        <BookLink class="header__cta" :label="t('nav.book')" small />
        <button
          ref="toggleBtn"
          type="button"
          class="header__toggle"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? t('a11y.closeMenu') : t('a11y.openMenu')"
          @click="open ? close(false) : (open = true)"
        >
          <span class="burger" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
    </div>

    <Transition name="panel">
      <div
        v-show="open"
        id="mobile-nav"
        ref="panel"
        class="panel"
        role="dialog"
        aria-modal="true"
        :aria-label="t('a11y.mainNav')"
      >
        <nav class="panel__nav" :aria-label="t('a11y.mainNav')">
          <ul>
            <li v-for="(link, i) in links" :key="link.id" :style="{ '--i': i }">
              <a :href="sectionHref(link.id)" @click="close(false)">{{ t(link.key) }}</a>
            </li>
          </ul>
        </nav>
        <div class="panel__footer">
          <BookLink :label="t('nav.bookLong')" block />
          <LangSwitch />
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
}

/* Fondo que aparece al hacer scroll, con la tira LED inferior */
.header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgb(11 11 12 / 0.82);
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  border-bottom: 1px solid var(--line);
  opacity: 0;
  transition: opacity var(--dur-m) var(--ease);
}

.header.is-scrolled::before {
  opacity: 1;
}

.header.is-open::before {
  opacity: 0;
}

.header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-s);
  min-height: var(--header-h);
  transition: min-height var(--dur-m) var(--ease);
}

.header:not(.is-scrolled) .header__bar {
  min-height: calc(var(--header-h) + 1rem);
}

.header__brand {
  position: relative;
  z-index: 2;
  padding: 0.3rem 0;
  text-decoration: none;
}

.header__nav {
  display: none;
}

.header__actions {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.header__lang,
.header__cta {
  display: none !important;
}

.header__toggle {
  display: grid;
  place-items: center;
  width: 2.9rem;
  height: 2.9rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-s);
  background: rgb(11 11 12 / 0.4);
}

.burger {
  display: grid;
  gap: 6px;
  width: 20px;
}

.burger span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--chalk);
  transition: transform var(--dur-m) var(--ease);
}

.is-open .burger span:nth-child(1) {
  transform: translateY(4px) rotate(45deg);
}

.is-open .burger span:nth-child(2) {
  transform: translateY(-4px) rotate(-45deg);
}

/* Panel móvil a pantalla completa */
.panel {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: calc(var(--header-h) + 2rem) var(--gutter) 2rem;
  /* Tira LED vertical en el borde derecho */
  background:
    linear-gradient(var(--led), var(--led)) right 6px top 0 / 2px 100% no-repeat,
    var(--night);
  overflow-y: auto;
}

.panel__nav ul {
  display: grid;
  gap: 0.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.panel__nav a {
  display: inline-block;
  padding: 0.4rem 0;
  font-family: var(--font-display);
  font-stretch: var(--wide);
  font-size: var(--step-3);
  font-weight: 300;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  text-decoration: none;
}

.panel__nav a:hover {
  text-shadow: 0 0 18px rgb(236 242 255 / 0.6);
}

.panel__footer {
  display: grid;
  gap: 1rem;
  justify-items: start;
  padding-top: 2rem;
}

.panel-enter-active,
.panel-leave-active {
  transition:
    clip-path 600ms var(--ease-in-out),
    opacity 300ms linear;
}

.panel-enter-from,
.panel-leave-to {
  clip-path: inset(0 0 100% 0);
  opacity: 0.4;
}

.panel-enter-to,
.panel-leave-from {
  clip-path: inset(0 0 0 0);
}

.panel-enter-active li {
  animation: rise 600ms var(--ease) both;
  animation-delay: calc(120ms + var(--i) * 60ms);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(0.8rem);
    filter: brightness(2);
  }
}

@media (min-width: 560px) {
  .header__cta {
    display: inline-flex !important;
  }
}

@media (min-width: 1060px) {
  .header__nav {
    display: block;
  }

  .header__nav ul {
    display: flex;
    gap: 0.25rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .header__nav a {
    position: relative;
    display: block;
    padding: 0.5rem 0.8rem;
    font-family: var(--font-display);
    font-stretch: var(--wide);
    font-size: 0.74rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--mist);
    transition: color var(--dur-s) linear;
  }

  /* Tira LED bajo el enlace activo */
  .header__nav a::after {
    content: '';
    position: absolute;
    left: 0.8rem;
    right: 0.8rem;
    bottom: 0.1rem;
    height: 2px;
    border-radius: 2px;
    background: var(--led);
    box-shadow: var(--led-glow);
    transform: scaleX(0);
    transition: transform var(--dur-m) var(--ease);
  }

  .header__nav a:hover,
  .header__nav a[aria-current] {
    color: var(--chalk);
  }

  .header__nav a:hover::after,
  .header__nav a[aria-current]::after {
    transform: scaleX(1);
  }

  .header__lang {
    display: inline-flex !important;
  }

  .header__toggle,
  .panel {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-enter-active,
  .panel-leave-active,
  .panel-enter-active li {
    transition: none;
    animation: none;
  }
}
</style>
