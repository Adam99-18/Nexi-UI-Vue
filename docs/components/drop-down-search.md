# DropDownSearch 下拉搜索

Select + Input 组合组件，左侧下拉选择条件类型，右侧输入关键字搜索。

## 何时使用

- 搜索栏需要先选择搜索字段再输入关键字时
- 后台管理列表页的组合搜索场景

## 代码演示

### 基础用法

:::demo 左右两部分分别绑定表单的两个字段。
```vue
<template>
  <div>
    <AntdDropDownSearch
      :options="[
        { label: '按名称', value: 'name' },
        { label: '按编码', value: 'code' },
        { label: '按类型', value: 'type' },
      ]"
      placeholder="请选择条件"
      placeholder-input="请输入关键字搜索"
    />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | 左侧下拉选项 | `Array<{label, value}>` | - | 是 |
| field | 左侧下拉绑定字段（写入 form[field]） | `string` | - | 是 |
| field2 | 右侧输入框绑定字段（写入 form[field2]） | `string` | - | 是 |
| form | 表单数据对象 | `object` | `{}` | 是 |
| placeholder | 下拉占位文本 | `string` | `请选择` | 否 |
| placeholderInput | 输入框占位文本 | `string` | `请输入关键字搜索` | 否 |

## 注意事项

- 组件直接将值写入 `form[field]` 和 `form[field2]`
- 适合在 SearchForm 的 columns 配置中通过 `component: 'AntdAntdDropDownSearch'` 使用
