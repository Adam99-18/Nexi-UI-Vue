# Icon 图标

动态图标渲染组件，内置 250+ 图标映射，支持填充/线框样式切换。

## 何时使用

- 按钮、菜单等 UI 元素的图标装饰
- 需要根据名称动态切换图标的场景

## 代码演示

### 基础用法

:::demo 通过 `icon` 指定图标名称，`size` 控制尺寸。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="SearchOutlined" />
    <NexiIcon icon="PlusOutlined" />
    <NexiIcon icon="EditOutlined" />
    <NexiIcon icon="DeleteOutlined" :size="20" />
    <NexiIcon icon="CheckCircleOutlined" :size="24" />
  </div>
</template>
```
:::

### 自定义颜色

:::demo 通过 `color` 属性设置图标颜色。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="HeartOutlined" color="#ff4d4f" />
    <NexiIcon icon="StarOutlined" color="#faad14" />
    <NexiIcon icon="CheckCircleOutlined" color="#52c41a" />
    <NexiIcon icon="InfoCircleOutlined" color="#1677ff" />
  </div>
</template>
```
:::

### 填充样式

:::demo 设置 `fill` 为 `true` 使用实心图标。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="HeartOutlined" color="#ff4d4f" />
    <NexiIcon icon="HeartOutlined" color="#ff4d4f" :fill="true" />
    <NexiIcon icon="StarOutlined" color="#faad14" />
    <NexiIcon icon="StarOutlined" color="#faad14" :fill="true" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| icon | 图标名称（对应 @ant-design/icons-vue 导出名） | `string` | `""` | 否 |
| color | 图标颜色，支持 CSS 变量 | `string` | `""` | 否 |
| size | 图标尺寸 | `number \| string` | `.875rem` | 否 |
| fill | 是否使用填充样式（实心图标） | `boolean` | `false` | 否 |
| cursor | 鼠标悬浮时的指针样式 | `string` | `pointer` | 否 |

## 注意事项

- `fill` 为 `true` 时会自动匹配对应的 Filled 变体图标
- `color` 支持 `var(--css-variable)` 格式，组件会通过 `getComputedStyle` 解析
- 图标名称区分大小写，需与 `@ant-design/icons-vue` 的导出名一致
