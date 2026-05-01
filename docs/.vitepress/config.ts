import { defineConfig } from 'vitepress'
import { resolve } from 'path'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  title: 'Nexi-UI',
  description: 'Nexi-UI Vue 4.x — 企业级后台管理系统组件库',
  lang: 'zh-CN',
  base: '/',

  head: [['link', { rel: 'icon', href: '/Nexi-logo.png' }]],

  vite: {
    resolve: {
      alias: {
        '@/components/antd': r('../../antd'),
        '@/composables/useQueryForm': r('./mocks/composables'),
        '@/composables/useForm': r('./mocks/composables'),
        '@/types/antd/action': r('./mocks/types-action'),
        '@/utils/is': r('./mocks/utils-is'),
        '@/utils/dayjs': r('./mocks/dayjs'),
        '~/api': r('./mocks/api'),
        '@/composables': r('./mocks/composables'),
        '@/utils': r('./mocks/composables'),
      },
    },
    plugins: [demoPreTransform(), resolveStaticAssets(), ssrShimPlugin()],
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
  },

  themeConfig: {
    logo: '/Nexi-logo.png',

    nav: [
      { text: '指南', link: '/guide/install' },
      { text: '组件', link: '/components/button' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          collapsed: false,
          items: [
            { text: '安装说明', link: '/guide/install' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '主题定制', link: '/guide/theme' },
          ],
        },
      ],
      '/components/': [
        {
          text: '通用',
          collapsed: false,
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Loading 加载占位', link: '/components/loading' },
          ],
        },
        {
          text: '数据录入',
          collapsed: false,
          items: [
            { text: 'Form 动态表单', link: '/components/form' },
            { text: 'SearchForm 搜索表单', link: '/components/search-form' },
            { text: 'Input 文本输入', link: '/components/input' },
            { text: 'Textarea 多行文本', link: '/components/text-area' },
            { text: 'DropDownSearch 组合搜索', link: '/components/drop-down-search' },
            { text: 'DropDownFilter 筛选面板', link: '/components/drop-down-filter' },
            { text: 'CheckboxFilter 复选筛选', link: '/components/checkbox-filter' },
            { text: 'CheckboxFilterSearch 可搜索复选', link: '/components/checkbox-filter-search' },
            { text: 'TimeItem 时间范围', link: '/components/time-item' },
          ],
        },
        {
          text: '数据展示',
          collapsed: false,
          items: [
            { text: 'Table 通用表格', link: '/components/table' },
            { text: 'View 文本展示', link: '/components/view' },
            { text: 'InfoCell 信息卡片', link: '/components/info-cell' },
            { text: 'Image 图片', link: '/components/img' },
            { text: 'HtmlContent 富文本', link: '/components/html' },
            { text: 'Empty 空状态', link: '/components/null' },
            { text: 'WeekCalendar 周日历', link: '/components/week-calendar' },
          ],
        },
        {
          text: '反馈',
          collapsed: false,
          items: [
            { text: 'Modal 模态框', link: '/components/modal' },
            { text: 'ModalForm 表单模态框', link: '/components/modal-form' },
            { text: 'ModalTip 确认提示', link: '/components/modal-tip' },
          ],
        },
        {
          text: '导航',
          collapsed: false,
          items: [
            { text: 'DropDown 下拉菜单', link: '/components/drop-down' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
            { text: 'Action 操作列', link: '/components/action' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '重置',
                backButtonTitle: '返回',
                noResultsText: '无结果',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },

    footer: {
      message: '基于 Ant Design Vue 4.x 深度封装',
      copyright: 'Copyright © 2026 Nexi-UI Vue',
    },
  },
})

/**
 * Vite 插件：预处理 .md 文件，将 :::demo 块转换为 DemoBlock 组件
 * 使用 Shiki 预高亮源码，同时生成 TS 和 JS 两个高亮版本
 */
function demoPreTransform() {
  const DEMO_RE = /:::demo\s+(.*?)\n```vue\n([\s\S]*?)```\s*:::/g

  /** 安全的 TS → JS：仅转换 <script> 块内容，不动 <template> */
  function tsToJs(src: string): string {
    return src.replace(
      /(<script\s+)lang="ts"\s+(setup>)([\s\S]*?)<\/script>/g,
      (_full: string, pre: string, post: string, body: string) => {
        let out = body
        // import type
        out = out.replace(/import\s+type\s+[^;]+;?\n?/g, '')
        // x?: PropType<T> → x
        out = out.replace(/(\w+)\s*\?\s*:\s*PropType<[^>]+>/g, '$1')
        // as PropType<T>
        out = out.replace(/\s+as\s+PropType<[^>]+>/g, '')
        // type annotations on declarations: const x: Ref<T> = →
        out = out.replace(/:\s*(?:Ref|ComputedRef|MaybeRef|ShallowRef)<[^>]+>/g, '')
        // param types: (x: string, y: number) → (x, y)
        out = out.replace(/(\w+)\s*:\s*\w+(\[\])?(\s*[|&]\s*\w+(\[\])?)*(?=\s*[,)])/g, (m: string, name: string) => name)
        // return type: ): Type => {
        out = out.replace(/\):\s*[\w<>[\]|&\s]+\s*(?=\{)/g, ')')
        out = out.replace(/\):\s*[\w<>[\]|&\s]+\s*(?==>)/g, ')')
        return pre + post + out + '<\/script>'
      },
    )
  }

  return {
    name: 'demo-pre-transform',
    enforce: 'pre' as const,

    async transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      const placeholders: Array<{ placeholder: string; source: string; sourceJs: string; desc: string }> = []
      let idx = 0
      const withPlaceholders = code.replace(DEMO_RE, (_full: string, desc: string, source: string) => {
        const ph = `__DEMO_PH_${idx}__`
        const ts = source.trim()
        const js = tsToJs(ts)
        placeholders.push({ placeholder: ph, source: ts, sourceJs: js, desc })
        idx++
        return ph
      })

      if (placeholders.length === 0) return

      let transformed = withPlaceholders
      try {
        const { codeToHtml } = await import('shiki')
        for (const p of placeholders) {
          const [highlighted, highlightedJs] = await Promise.all([
            codeToHtml(p.source, { lang: 'vue', themes: { light: 'vitesse-light', dark: 'vitesse-dark' } }),
            codeToHtml(p.sourceJs, { lang: 'vue', themes: { light: 'vitesse-light', dark: 'vitesse-dark' } }),
          ])
          const sourceEncoded = Buffer.from(p.source, 'utf-8').toString('base64')
          const sourceJsEncoded = Buffer.from(p.sourceJs, 'utf-8').toString('base64')
          const highlightedEncoded = Buffer.from(highlighted, 'utf-8').toString('base64')
          const highlightedJsEncoded = Buffer.from(highlightedJs, 'utf-8').toString('base64')
          const safeDesc = p.desc
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          transformed = transformed.replace(
            p.placeholder,
            `<DemoBlock source="${sourceEncoded}" source-js="${sourceJsEncoded}" highlighted="${highlightedEncoded}" highlighted-js="${highlightedJsEncoded}" description="${safeDesc}"></DemoBlock>`,
          )
        }
      } catch {
        for (const p of placeholders) {
          const sourceEncoded = Buffer.from(p.source, 'utf-8').toString('base64')
          const sourceJsEncoded = Buffer.from(p.sourceJs, 'utf-8').toString('base64')
          const safeDesc = p.desc
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
          const escaped = p.source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          const fallbackHtml = Buffer.from(`<pre><code>${escaped}</code></pre>`, 'utf-8').toString('base64')
          transformed = transformed.replace(
            p.placeholder,
            `<DemoBlock source="${sourceEncoded}" source-js="${sourceJsEncoded}" highlighted="${fallbackHtml}" highlighted-js="${fallbackHtml}" description="${safeDesc}"></DemoBlock>`,
          )
        }
      }

      return { code: transformed, map: null }
    },
  }
}

function resolveStaticAssets() {
  const STATIC_RE = /^\/static\//
  return {
    name: 'resolve-static-assets',
    enforce: 'pre' as const,

    resolveId(id: string) {
      if (STATIC_RE.test(id)) return '\0static-placeholder'
    },
    load(id: string) {
      if (id === '\0static-placeholder') return 'export default ""'
    },
  }
}

function ssrShimPlugin() {
  const SHIM_CODE = `
if (typeof document === 'undefined') {
  const elProxy = new Proxy({}, {
    get(_, prop) { if (typeof prop === 'string') return () => elProxy; return elProxy; }
  });
  globalThis.document = new Proxy({}, {
    get(_, prop) {
      if (prop === 'documentElement') { return new Proxy({}, { get(_, p) { if (p === 'style') return new Proxy({}, { get: () => '' }); return undefined; } }); }
      if (prop === 'createElement') return () => elProxy;
      if (prop === 'createElementNS') return () => elProxy;
      if (prop === 'createTextNode') return () => elProxy;
      if (prop === 'head') return { appendChild: () => {} };
      if (prop === 'body') return { appendChild: () => {} };
      if (prop === 'querySelector') return () => null;
      if (prop === 'querySelectorAll') return () => [];
      if (prop === 'getElementsByTagName') return () => [];
      if (prop === 'addEventListener') return () => {};
      return undefined;
    }
  });
  globalThis.window = globalThis.document;
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => '' });
}
if (typeof HTMLElement === 'undefined') {
  globalThis.HTMLElement = class {};
  globalThis.HTMLScriptElement = class {};
  globalThis.HTMLLinkElement = class {};
  globalThis.customElements = { define: () => {} };
}
if (typeof history === 'undefined') {
  Object.defineProperty(globalThis, 'history', { value: { state: null, pushState: () => {}, replaceState: () => {} }, writable: true });
}
if (typeof location === 'undefined') {
  Object.defineProperty(globalThis, 'location', { value: { href: '', pathname: '/', search: '', hash: '', origin: 'http://localhost' }, writable: true });
}
`

  return {
    name: 'ssr-shim',
    enforce: 'pre' as const,
    transform(code: string, id: string) {
      if (id.includes('type=style') || id.includes('lang.css')) return
      if (id.includes('antd/') && (id.includes('icon') || id.includes('Icon') || id.includes('icon-font'))) {
        return { code: `${SHIM_CODE}\n${code}`, map: null }
      }
    },
  }
}
