# SearchForm 搜索表单

列表页顶部搜索筛选区域，内置搜索和重置按钮，支持多控件动态表单。

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
  />
</template>
```
:::

### 完整示例

包含多种筛选控件的搜索栏：

```vue
<template>
  <div>
    <NexiSearchForm
      ref="searchRef"
      :value="searchData"
      :columns="columns"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- 表格区域 -->
    <NexiTable
      :columns="tableColumns"
      :data-source="list"
      :pagination="pagination"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import NexiSearchForm from '@/components/antd/search-form.vue'
import NexiTable from '@/components/antd/table.vue'

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
]

const tableColumns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const list = ref([
  { id: 1, name: '项目 1', status: '启用' },
])

const pagination = reactive({ current: 1, pageSize: 10, total: 1 })

const handleSearch = async (values: any) => {
  console.log('搜索条件:', values)
  // 重新请求列表数据
}

const handleReset = (values: any) => {
  console.log('已重置:', values)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 表单数据对象 | `Record<string, any>` | `{}` | 否 |
| columns | 搜索字段配置 | `QueryForm[]` | `[]` | 是 |
| customRequestOptions | 是否自定义请求选项（如远程搜索的 options） | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(value: any)` |
| search | 点击搜索按钮 | `(values: Record<string, any>)` |
| reset | 点击重置按钮 | `(values: Record<string, any>)` |

## 注意事项

- 搜索按钮使用自定义图标（非 ant-design-vue 默认样式）
- 支持额外控件类型：`NexiDropDownSearch`、`NexiDropDown`、`NexiTimeItem`、`NexiCheckboxFilter`、`NexiCheckboxFilterSearch`、`RangePicker`
- `customRequestOptions` 为 true 时，columns 中的 options 按需请求
- 重置时恢复到初始默认值，并触发 `search` 事件
