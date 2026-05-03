# Switch 开关

带启用/禁用文本标签的开关组件，基于 ant-design-vue Switch。

## 何时使用

- 需要快速切换某个功能/状态的开关场景
- 表格行内启用/禁用操作

## 代码演示

### 基础用法

:::demo 通过 `checked` 控制状态，使用 `v-model:checked` 双向绑定。
```vue
<template>
  <div>
    <NexiSwitch :checked="true" @update:checked="(val) => console.log('切换:', val)" @change="(val) => console.log('change:', val)" />
  </div>
</template>
```
:::

### 禁用状态

:::demo 设置 `disabled` 禁止操作。
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <NexiSwitch :checked="true" :disabled="true" />
    <NexiSwitch :checked="false" :disabled="true" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 开关状态 | `boolean` | `false` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:checked | 状态切换（v-model:checked） | `(checked: boolean)` |
| change | 状态切换 | `(checked: boolean)` |

## 注意事项

- 支持 `v-model:checked="val"` 双向绑定
- 开启时显示文字"启用"，关闭时显示"禁用"
- `disabled` 为 true 时点击不触发任何事件
