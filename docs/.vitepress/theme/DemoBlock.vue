<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  source: string
  sourceJs?: string
  description: string
  highlighted?: string
  highlightedJs?: string
}>()

type Lang = 'ts' | 'js'

const activeLang = ref<Lang>('js')
const showTsTab = false
const copyLabel = ref('复制代码')

function decodeB64(str: string): string {
  try {
    const bin = atob(str)
    const bytes = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
    return new TextDecoder().decode(bytes)
  } catch {
    return str
  }
}

/** 服务端预生成的 TS / JS 源码（已 base64） */
const tsSource = computed(() => decodeB64(props.source))
const jsSource = computed(() => {
  if (props.sourceJs) return decodeB64(props.sourceJs)
  return tsSource.value // fallback
})

const displaySource = computed(() =>
  activeLang.value === 'ts' ? tsSource.value : jsSource.value
)

/** 服务端 Shiki 高亮后的 HTML */
const displayHtml = computed(() => {
  if (activeLang.value === 'js' && props.highlightedJs) {
    return decodeB64(props.highlightedJs)
  }
  if (props.highlighted) return decodeB64(props.highlighted)
  return ''
})

function switchLang(lang: Lang) {
  activeLang.value = lang
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(displaySource.value)
    copyLabel.value = '已复制'
    setTimeout(() => { copyLabel.value = '复制代码' }, 2000)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = displaySource.value
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    copyLabel.value = '已复制'
    setTimeout(() => { copyLabel.value = '复制代码' }, 2000)
  }
}
</script>

<template>
  <div class="demo-block">
    <!-- 描述区 -->
    <div class="demo-block-desc" v-if="description">
      <svg class="demo-block-desc-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
      <span>{{ description }}</span>
    </div>

    <!-- 源码区：服务端 Shiki 高亮，按语言切换 -->
    <div class="demo-block-code-source">
      <div class="demo-block-code-wrapper" v-html="displayHtml" />
    </div>

    <!-- 底部操作栏 -->
    <div class="demo-block-bar">
      <div class="demo-block-bar-left">
        <button
          v-if="showTsTab"
          class="demo-block-bar-btn"
          :class="{ active: activeLang === 'ts' }"
          @click="switchLang('ts')"
        >
          TypeScript
        </button>
        <button class="demo-block-bar-btn active">
          JavaScript
        </button>
      </div>
      <button class="demo-block-bar-btn copy-btn" @click="copyCode">
        <svg v-if="copyLabel === '复制代码'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        {{ copyLabel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.3s;
}

.demo-block:hover {
  border-color: var(--vp-c-brand-1);
}

.demo-block-desc {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.demo-block-desc-icon {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.demo-block-code-wrapper :deep(pre.shiki) {
  margin: 0 !important;
  border-radius: 0 !important;
  padding: 16px 20px;
  background: var(--vp-code-block-bg) !important;
}

.demo-block-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 10px 16px;
  border-top: 1px dashed var(--vp-c-divider);
}

.demo-block-bar-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.demo-block-bar-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-block-bar-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.demo-block-bar-btn.active {
  color: #fff;
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.copy-btn {
  min-width: 90px;
  justify-content: center;
}
</style>
