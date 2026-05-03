# DropDownSearch 下拉搜索

Select + Input 组合组件，左侧下拉选择条件类型，右侧输入关键字搜索。值直接写入 `form[field]`。

## 何时使用

- 搜索栏需要先选择搜索字段再输入关键字时
- 后台管理列表页的组合搜索场景

## 代码演示

### 基础用法

:::demo 左右两部分分别绑定表单的两个字段。
```vue
<template>
  <NexiDropDownSearch
    :options="[
      { label: '按名称', value: 'name' },
      { label: '按编码', value: 'code' },
      { label: '按类型', value: 'type' },
    ]"
    placeholder="请选择条件"
    placeholder-input="请输入关键字搜索"
    :form="searchForm"
    field="searchType"
    field2="searchKeyword"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const searchForm = reactive({
  searchType: 'name',
  searchKeyword: '',
})
</script>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | 左侧下拉选项 | `Array<{label, value}>` | — | 是 |
| field | 左侧下拉绑定字段（写入 form[field]） | `string` | — | 是 |
| field2 | 右侧输入框绑定字段（写入 form[field2]） | `string` | — | 是 |
| form | 表单数据对象 | `object` | `{}` | 否 |
| placeholder | 下拉占位文本 | `string` | `请选择` | 否 |
| placeholderInput | 输入框占位文本 | `string` | `请输入关键字搜索` | 否 |

## 注意事项

- 使用 `computed({ get, set })` 实现双向绑定，直接写入 `form[field]` / `form[field2]`
- 适合在 SearchForm 的 columns 配置中通过 `component: 'NexiNexiDropDownSearch'` 使用
- V1.1 重写：修复了 v-model 写回失败的问题（移除了 `<a-form-item>` 包裹）
