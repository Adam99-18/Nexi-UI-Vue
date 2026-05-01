# ModalTip 提示弹窗

确认型弹窗组件，通过 `ref.open()` 打开，用于操作前的二次确认。

## 何时使用

- 删除操作前的二次确认
- 敏感操作需要用户明确确认的场景

## 代码演示

### 基础用法

:::demo 通过 ref 调用 `open()` 打开弹窗，点击确认触发 `@ok` 事件。
```vue
<template>
  <div>
    <AntdButton type="primary" danger>删除数据</AntdButton>
  </div>
</template>
```
:::

### 完整示例

弹出确认弹窗并处理确认/取消：

```vue
<template>
  <div>
    <AntdButton type="primary" danger @click="modalTipRef.open({ id: 1 })">
      删除项目
    </AntdButton>

    <AntdModalTip
      ref="modalTipRef"
      title="确认删除"
      content="删除后将无法恢复，确定要继续吗？"
      @ok="handleDelete"
      @cancel="console.log('已取消')"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AntdButton from '@/components/antd/button.vue'
import AntdModalTip from '@/components/antd/modal-tip.vue'

const modalTipRef = ref()

const handleDelete = async (params: any) => {
  console.log('删除:', params.id)
  // await api.delete(params.id)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | `string` | `提示` | 否 |
| content | 提示内容 | `string` | `""` | 否 |
| layout | 挂载容器选择器 | `string` | `".layout-wrap"` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ok | 点击确认 | `(params: any)` — open 时传入的参数 |
| cancel | 点击取消/关闭 | - |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | `(params?: any)` |
| close | 关闭弹窗 | - |

## 注意事项

- 通过 `open()` 传入的 `params` 会在 `ok` 事件中回传
- 监听 `useGlobalStore().toggleGlobalModal`，退出登录时自动关闭
- `showFooterCloseBtn` 为 true 时会额外显示底部关闭按钮（区别于默认的底部按钮）
