# View 文本展示

只读文本展示组件，支持条件渲染和 slot 自定义内容。

## 何时使用

- 表单详情页的只读字段展示
- 列表中需要纯文本展示的场景

## 代码演示

### 基础用法

:::demo 通过 `text` 属性展示只读文本。
```vue
<template>
  <div>
    <NexiView text="这是一段只读展示文本" />
    <NexiView :text="12800" />
  </div>
</template>
```
:::

### 条件显示

:::demo `isShow` 为 false 时组件不渲染（`v-if`）。
```vue
<template>
  <div>
    <NexiView text="可见内容" :is-show="true" />
    <NexiView text="不可见内容" :is-show="false" />
  </div>
</template>
```
:::

### 使用 Slot

:::demo 默认 slot 可以覆盖 text prop 的内容。
```vue
<template>
  <NexiView>
    <span style="color: #4b67f4;">通过 slot 自定义内容</span>
  </NexiView>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 展示文本 | `string \| number` | `""` | 否 |
| isShow | 是否显示（false 时不渲染） | `boolean` | `true` | 否 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义展示内容（覆盖 text prop） |

## 注意事项

- `isShow: false` 时使用 `v-if` 不渲染，非 `display: none`
- 字体大小和颜色通过 CSS 变量（`--font-size`、`--text-color`）控制，支持主题适配
- slot 内容会覆盖 `text` prop 的显示
