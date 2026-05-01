# Tabs 标签页

标签页切换组件。

## 何时使用

- 平级内容需要分组切换展示时
- 筛选条件按类别切换时

## 代码演示

### 基础用法

:::demo 通过 `list` 传入标签列表，使用 `v-model:value` 双向绑定当前激活项。
```vue
<template>
  <AntdTabs
    :list="[
      { label: '全部', value: 'all' },
      { label: '进行中', value: 'active' },
      { label: '已完成', value: 'done' },
    ]"
    value="all"
  />
</template>
```
:::

### 事件处理

:::demo 通过 `change` 事件监听标签切换，使用 `v-model:value` 双向绑定。
```vue
<template>
  <div>
    <AntdTabs
      :list="[
        { label: '全部', value: 'all' },
        { label: '进行中', value: 'active' },
        { label: '已完成', value: 'done' },
      ]"
      value="all"
    />
  </div>
</template>
```
:::

### 自定义标签

:::demo 通过 `tab` 插槽自定义标签内容，支持渲染图标等复杂结构。
```vue
<template>
  <AntdTabs
    :list="[
      { label: '表格视图', value: 'table' },
      { label: '卡片视图', value: 'card' },
      { label: '日历视图', value: 'calendar' },
    ]"
    value="table"
  />
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前激活 tab | `string` | `""` | 否 |
| list | tab 列表 | `Array<{label: string, value: any}>` | `[]` | 是 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 切换 tab | `(key: string)` |
| change | 切换 tab | `(key: string)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| tab | 自定义 tab 内容，slotProps: `{ item }` |
