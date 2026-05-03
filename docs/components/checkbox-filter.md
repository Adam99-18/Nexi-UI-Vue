# CheckboxFilter 复选筛选

基于 Popover 弹出的复选框多选筛选器，支持从 store 获取选项或通过 props 传入。

## 何时使用

- 表格列头的多选筛选
- 标签/分类等允许多选的筛选场景

## 代码演示

### 基础用法

:::demo 通过 `options` 传入可选项，`v-model:value` 绑定已选值。
```vue
<template>
  <NexiCheckboxFilter
    :options="[
      { label: '类型 A', value: 'a' },
      { label: '类型 B', value: 'b' },
      { label: '类型 C', value: 'c' },
    ]"
    @update:value="(vals) => console.log(vals)"
    @select="(item) => console.log(item)"
  />
</template>
```
:::

### 从 Store 获取选项

不传 `options` 时自动使用 `useDictionaryStore().dictionaryFilter` 数据。

```vue
<template>
  <NexiCheckboxFilter />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 已选值列表 | `Array<string \| number>` | `[]` | 否 |
| options | 选项列表 | `Array<{label, value}>` | `[]` | 否 |
| form | 外部表单对象 | `object` | `{}` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 已选值变化 | `(values: any[])` |
| select | 点击选项 | `(item: any)` |

## 注意事项

- 不传 `options` 时自动从 `useDictionaryStore().dictionaryFilter` 获取
- 选中项以逗号分隔显示，无选中项时显示"全部"
- 使用 `<a-popover>` + `<a-checkbox>` 实现弹出选择面板
