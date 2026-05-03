# Icon 图标

动态图标渲染组件，内置 200+ 图标名称映射，支持填充/线框样式切换和 CSS 变量颜色。

## 何时使用

- 按钮、菜单等 UI 元素的图标装饰
- 需要根据名称动态切换图标的场景

## 代码演示

### 基础用法

:::demo 通过 `icon` 指定简短图标名（如 `search`、`edit`、`delete`）。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="search" />
    <NexiIcon icon="edit" />
    <NexiIcon icon="delete" :size="20" />
    <NexiIcon icon="setting" :size="24" />
    <NexiIcon icon="user" />
  </div>
</template>
```
:::

### 自定义颜色和尺寸

:::demo 支持直接颜色值和 CSS 变量。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="heart" color="#ff4d4f" />
    <NexiIcon icon="star" color="#faad14" />
    <NexiIcon icon="check-circle" color="#52c41a" />
    <NexiIcon icon="info" color="var(--theme-default-color)" />
  </div>
</template>
```
:::

### 填充/线框切换

:::demo 设置 `fill` 为 `true` 使用实心图标变体。
```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <NexiIcon icon="check-circle" color="#52c41a" />
    <NexiIcon icon="check-circle" color="#52c41a" :fill="true" />
    <NexiIcon icon="close-circle" color="#ff4d4f" />
    <NexiIcon icon="close-circle" color="#ff4d4f" :fill="true" />
    <NexiIcon icon="question" />
    <NexiIcon icon="question" :fill="true" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| icon | 图标名称（短名，见下方常用图标） | `string` | `""` | 否 |
| color | 图标颜色，支持 `var(--xxx)` CSS 变量 | `string` | `""` | 否 |
| size | 图标尺寸 | `number \| string` | `.875rem` | 否 |
| fill | 是否使用填充样式（实心） | `boolean` | `false` | 否 |
| cursor | 鼠标悬浮指针样式 | `string` | `pointer` | 否 |

### 常用图标名

`search`, `edit`, `delete`/`del`, `add`/`plus`, `close`, `check`, `setting`, `user`, `lock`, `more`, `refresh`/`sync`, `down`/`caret-down`, `up`/`caret-up`, `left`, `right`, `info`, `question`, `warning`, `exclamation-circle`, `check-circle`, `close-circle`, `plus-circle`, `minus-circle`, `clock-circle`, `calendar`, `upload`, `download`, `fullscreen`, `fullscreen-exit`, `swap`, `column-height`, `menu`, `copy`, `eye`, `star`, `heart`, `filter`, `link`, `play-circle`, `double-left`, `double-right`, `to-top`, `arrows-alt`, `thunder`, `login`, `logout`...

完整 200+ 图标映射见 `antd/icon.vue` switch 语句。

## 注意事项

- 使用简短名称（如 `search`、`edit`），非 `@ant-design/icons-vue` 原始导出名
- `color` 支持 `var(--xxx)` 格式，组件通过 `getComputedStyle` 解析为实际色值
- `fill: true` 时自动匹配对应的 Filled 变体（如 `check-circle` → `CheckCircleFilled`）
- `delete` 和 `del` 映射同一个图标；`refresh` 和 `sync` 映射同一个图标
- 未匹配的 icon 名返回 `null`（不渲染）
