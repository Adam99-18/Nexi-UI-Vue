# Modal 弹窗

可编程式控制的模态框组件，通过 `ref.open(params)` 打开，支持自定义挂载容器、背景渐变、插槽自定义。

## 何时使用

- 需要弹窗展示详情、表单等内容
- 需要在弹窗中确认用户操作

## 代码演示

### 基础用法

:::demo 通过 ref 调用 `open()` 打开，`ok` 事件获取传入参数。
```vue
<template>
  <div>
    <NexiButton type="primary" @click="modalRef.open({ id: 1, name: '示例' })">打开弹窗</NexiButton>

    <NexiModal
      ref="modalRef"
      title="编辑信息"
      @ok="(params) => console.log('确认:', params)"
      @cancel="() => console.log('已取消')"
    >
      <p>弹窗内容区域</p>
    </NexiModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NexiButton, NexiModal } from 'nexi-ui'
const modalRef = ref()
</script>
```
:::

### 自定义底部

:::demo 设置 `showFooter` 为 false 后通过 `footer` 插槽自定义底部。
```vue
<template>
  <div>
    <NexiButton type="primary" @click="modalRef.open()">自定义底部</NexiButton>

    <NexiModal ref="modalRef" title="自定义底部" :show-footer="false">
      <p>弹窗内容</p>
      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <NexiButton @click="modalRef.close()">取消</NexiButton>
          <NexiButton type="primary" @click="modalRef.close()">提交</NexiButton>
        </div>
      </template>
    </NexiModal>
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | `string` | `""` | 否 |
| layout | 挂载容器选择器 | `string` | `".layout-wrap"` | 否 |
| showFooter | 是否显示默认底部 | `boolean` | `true` | 否 |
| showFooterCloseBtn | 底部额外关闭按钮（showFooter=true 时展示更多按钮） | `boolean` | `false` | 否 |
| zIndex | 弹窗层级 | `number` | `1000` | 否 |
| bg | 背景渐变色装饰 | `boolean` | `false` | 否 |
| destroyOnClose | 关闭时销毁内容 | `boolean` | `true` | 否 |
| top | 距离顶部的距离 | `string` | `""` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ok | 点击确定按钮 | `(params: any)` — open 时传入的参数 |
| cancel | 点击取消/关闭 | — |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | `(params?: any)` |
| close | 关闭弹窗 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 弹窗主体内容 |
| title | 自定义标题区域 |
| footer | 自定义底部（showFooter=false 时通过此插槽自定义） |

## 注意事项

- 弹窗通过 `getContainer` 挂载到 `layout` 选择器指定的 DOM 元素，回退到 `document.body`
- `open(params)` 传入的参数在 `ok` 事件中回传
- 监听 `useGlobalStore().toggleGlobalModal`，退出登录时自动关闭
- `showFooterCloseBtn` 在 showFooter=true 时生效，用于显示额外关闭按钮
- `destroyOnClose` 默认 true，关闭后销毁 DOM 内容
