# SearchForm 搜索表单

列表页顶部搜索筛选区域，内置搜索和重置按钮，支持响应式布局和多种筛选控件。

## 何时使用

- 列表页顶部的搜索筛选区域
- 需要组合多种筛选条件（输入、下拉、日期、复选等）的场景

## 代码演示

### 基础用法

:::demo 通过 `columns` 配置搜索字段，自动生成搜索表单。
```vue
<template>
  <NexiSearchForm
    :columns="[
      { label: '关键词', field: 'keyword', component: 'NexiInput', placeholder: '请输入关键词' },
    ]"
    @search="(values) => console.log('搜索:', values)"
  />
</template>
```
:::

### 完整示例

包含多种筛选控件和自定义按钮文字：

```vue
<template>
  <NexiSearchForm
    ref="searchRef"
    :value="searchData"
    :columns="columns"
    :gutter="[10, 16]"
    search-text="搜索"
    reset-text="重置"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const searchData = reactive({
  keyword: '',
  status: undefined,
  dateRange: undefined,
})

const columns = [
  {
    label: '关键词',
    field: 'keyword',
    component: 'NexiInput',
    placeholder: '请输入名称/编码',
  },
  {
    label: '状态',
    field: 'status',
    component: 'NexiSelect',
    placeholder: '请选择状态',
    options: [
      { label: '全部', value: '' },
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
  {
    label: '日期范围',
    field: 'dateRange',
    component: 'NexiTimeItem',
    placeholder: '请选择日期',
  },
  {
    label: '类型',
    field: 'category',
    component: 'NexiCheckboxFilter',
    options: [
      { label: '类型 A', value: 'a' },
      { label: '类型 B', value: 'b' },
    ],
  },
]

const handleSearch = async (values: any) => {
  console.log('搜索条件:', values)
}

const handleReset = (values: any) => {
  console.log('已重置:', values)
}
</script>
```
:::

### 自定义样式

```vue
<template>
  <NexiSearchForm
    :columns="columns"
    :gutter="[16, 20]"
    wrapper-class="my-search-form"
    :wrapper-style="{ padding: '20px' }"
    search-text="查询"
    reset-text="清空"
    @search="handleSearch"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 表单数据对象 | `Record<string, any>` | `{}` | 否 |
| columns | 搜索字段配置 | `QueryForm[]` | `[]` | 是 |
| customRequestOptions | 是否自定义请求选项 | `boolean` | `false` | 否 |
| gutter | Row 栅格间距 | `number \| [number, number]` | `[10, 16]` | 否 |
| wrapperClass | 表单外层 CSS class | `string` | `""` | 否 |
| wrapperStyle | 表单外层内联样式 | `object` | `{}` | 否 |
| searchText | 搜索按钮文字 | `string` | `搜索` | 否 |
| resetText | 重置按钮文字 | `string` | `重置` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(value: any)` |
| search | 点击搜索按钮 | `(values: Record<string, any>)` |
| reset | 点击重置按钮（重置后自动触发 search） | `(values: Record<string, any>)` |

### 响应式断点

每个列的默认响应式布局：

| 断点 | 列 span |
|------|---------|
| xs (<576px) | 24 |
| sm (>=576px) | 24 |
| md (>=768px) | 12 |
| lg (>=992px) | 12 |
| xl (>=1200px) | 8 |
| xxl (>=1600px) | 6 |

可通过 `column.colProps` 自定义。

### 支持的 component 类型

`NexiInput`、`NexiSelect`、`TreeSelect`、`RadioGroup`、`NexiDropDownSearch`、`NexiTimeItem`、`NexiDropDown`、`Cascader`、`RangePicker`、`NexiCheckboxFilter`、`NexiCheckboxFilterSearch`

## 注意事项

- 重置按钮恢复到 `onBeforeMount` 记录的初始默认值，然后自动触发 `search`
- 搜索和重置按钮使用 `NexiIcon` 图标（非 CDN 图片）
- `customRequestOptions` 为 true 时，columns 中的 options 按需请求
- `NexiSelect` 组件自动启用搜索过滤（`show-search`、`filter-option`）
- 表单区域有 1px 边框和圆角样式包装
