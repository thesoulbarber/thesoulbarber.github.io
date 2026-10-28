// Huecos de la galería. PENDIENTE: fotos reales (sesión profesional o material del local con
// permiso de los clientes). Para usar una foto: archivo en public/fotos/ y `src: '/fotos/x.jpg'`.
import type { SceneName } from '@/components/art/SceneArt.vue'

export interface GalleryItem {
  id: 'fade' | 'beard' | 'color' | 'interior' | 'wash' | 'facade'
  scene: SceneName
  src?: string
  /** Disposición en la cuadrícula de escritorio */
  size?: 'tall' | 'wide'
}

export const GALLERY: GalleryItem[] = [
  { id: 'interior', scene: 'interior', size: 'wide' },
  { id: 'fade', scene: 'fade', size: 'tall' },
  { id: 'beard', scene: 'beard' },
  { id: 'color', scene: 'color' },
  { id: 'wash', scene: 'wash', size: 'wide' },
  { id: 'facade', scene: 'facade' },
]
