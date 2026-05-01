import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoBlock from './DemoBlock.vue'
import './style.css'

const logoUrl = '/Nexi-logo.png'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock)

    if (!import.meta.env.SSR) {
      const modules = import.meta.glob('../../../antd/*.vue', { eager: true })
      for (const path in modules) {
        const mod = modules[path] as any
        const comp = mod.default || mod
        if (!comp) continue
        const filename = path.split('/').pop()!.replace('.vue', '')
        const name = 'Nexi' + filename
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join('')
        app.component(name, comp)
        app.component(`nexi-${filename}`, comp)
      }
    }
  },
} satisfies Theme
