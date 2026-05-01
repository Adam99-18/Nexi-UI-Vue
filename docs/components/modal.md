# Modal 弹窗

可编程式控制的模态框组件，通过 `ref.open()` 打开，支持自定义挂载容器、背景渐变。

## 何时使用

- 需要弹窗展示详情、表单等内容
- 需要在弹窗中确认用户操作

## 代码演示

### 基础用法

:::demo 通过 `ref.open()` 编程式打开弹窗。
```vue
<template>
  <div>
    <AntdButton type="primary">打开弹窗</AntdButton>
  </div>
</template>
```
:::

### 完整示例

带打开/关闭控制和事件处理：

```vue
<template>
  <div>
    <AntdButton type="primary" @click="modalRef.open({ id: 1, name: '示例' })">
      打开弹窗
    </AntdButton>

    <AntdModal
      ref="modalRef"
      title="编辑信息"
      @ok="handleOk"
      @cancel="console.log('弹窗关闭')"
    >
      <p>弹窗内容区域</p>
      <p>你可以在这里放表单、详情或其他内容</p>
    </AntdModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AntdButton from '@/components/antd/button.vue'
import AntdModal from '@/components/antd/modal.vue'

const modalRef = ref()

const handleOk = (params: any) => {
  console.log('确认操作，参数:', params) // { id: 1, name: '示例' }
  modalRef.value.close()
}
</script>
```

### 自定义底部

:::demo 设置 `showFooter` 为 false 后通过插槽自定义底部按钮。
```vue
<template>
  <div>
    <AntdButton type="primary">自定义底部</AntdButton>
  </div>
</template>
```
:::

### 完整底部自定义示例

```vue
<template>
  <div>
    <AntdButton type="primary" @click="modal2Ref.open()">
      自定义底部弹窗
    </AntdButton>

    <AntdModal
      ref="modal2Ref"
      title="自定义底部"
      :showFooter="false"
    >
      <p>弹窗内容</p>

      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <AntdButton @click="modal2Ref.close()">取消</AntdButton>
          <AntdButton type="primary" @click="modal2Ref.close()">提交</AntdButton>
        </div>
      </template>
    </AntdModal>
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | `string` | `""` | 否 |
| layout | 挂载容器选择器 | `string` | `".layout-wrap"` | 否 |
| showFooter | 是否显示默认底部按钮 | `boolean` | `true` | 否 |
| showFooterCloseBtn | 底部额外关闭按钮 | `boolean` | `false` | 否 |
| zIndex | 弹窗层级 | `number` | `1000` | 否 |
| bg | 是否显示背景渐变色装饰 | `boolean` | `false` | 否 |
| destroyOnClose | 关闭时销毁内容 | `boolean` | `true` | 否 |
| top | 距离顶部的距离 | `string` | `""` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| ok | 点击确定按钮 | `(params: any)` — open 时传入的参数 |
| cancel | 点击取消/关闭 | - |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| open | 打开弹窗 | `(params?: any)` | `void` |
| close | 关闭弹窗 | - | `void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 弹窗主体内容 |
| title | 自定义标题区域 |
| footer | 自定义底部（showFooter=false 时生效） |

## 注意事项

- 弹窗通过 `getContainer` 挂载到 `layout` 选择器指定的 DOM 元素
- `open()` 时传入的 `params` 保存在内部，在 `ok` 事件中回传
- 监听 `useGlobalStore().toggleGlobalModal`，退出登录时自动关闭
- `bg` 为 true 时在弹窗背景上渲染渐变装饰
