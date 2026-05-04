# ModalTip 提示弹窗

确认型弹窗组件，带警告图标和确认/取消按钮，支持 `v-model:visible` 和编程式调用。

## 何时使用

- 删除操作前的二次确认
- 敏感操作需要用户明确确认的场景

## 代码演示

### 基础用法

:::demo 通过 ref 调用 `open()` 打开，点击确认触发 `@ok` 事件。
```vue
<template>
  <div>
    <NexiButton type="primary" danger @click="modalTipRef.open({ id: 1 })">删除项目</NexiButton>

    <NexiModalTip
      ref="modalTipRef"
      title="确认删除"
      content="删除后将无法恢复，确定要继续吗？"
      @ok="(params) => console.log('删除 id:', params.id)"
      @cancel="() => console.log('已取消')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const modalTipRef = ref()
</script>
```
:::

### 通过 v-model:visible 控制

:::demo 支持外部通过 `v-model:visible` 控制显隐。
```vue
<template>
  <div>
    <NexiButton type="primary" danger @click="visible = true">确认操作</NexiButton>

    <NexiModalTip
      v-model:visible="visible"
      title="操作确认"
      content="确定要执行此操作吗？"
      @ok="() => visible = false"
      @cancel="() => visible = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | `string` | `提示` | 否 |
| content | 提示内容 | `string` | `""` | 否 |
| layout | 挂载容器选择器 | `string` | `".layout-wrap"` | 否 |
| visible | 是否显示（支持 v-model:visible） | `boolean` | `undefined` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ok | 点击确认 | `(params: any)` — open 时传入的参数 |
| cancel | 点击取消/关闭 | — |
| update:visible | 可见性变化（v-model:visible） | `(visible: boolean)` |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | `(params?: any)` |
| close | 关闭弹窗 | — |

## 注意事项

- 弹窗固定宽度 400px，内置警告图标（`exclamation-circle`，橙色 `#F4AB62`）
- 支持两种控制方式：`ref.open()` 编程式 或 `v-model:visible` 外部控制
- `open(params)` 传入的参数在 `ok` 事件中回传
- 监听 `useGlobalStore().toggleGlobalModal`，退出登录时自动关闭
- 底部默认显示"取消"和"确定"按钮
