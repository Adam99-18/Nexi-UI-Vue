# CheckboxFilterSearch 复选搜索筛选

带有搜索功能的复选框筛选器，支持关键词搜索和高亮匹配。

## 何时使用

- 选项数量较多的多选筛选场景（如文件列表、标签列表）
- 需要在筛选项中快速搜索定位

## 代码演示

### 基础用法

:::demo 通过 `options` 传入可选项，输入关键字即时过滤。
```vue
<template>
  <div>
    <AntdCheckboxFilterSearch
      placeholder="请选择文件"
      placeholder-input="搜索文件名称"
      :options="[
        { label: '需求文档.docx', value: '1' },
        { label: '设计稿.fig', value: '2' },
        { label: '接口文档.md', value: '3' },
        { label: '测试用例.xlsx', value: '4' },
        { label: '发布说明.pdf', value: '5' },
      ]"
    />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | 选项列表 | `Array<{label, value}>` | `[]` | 否 |
| value | 已选值列表 | `Array` | `[]` | 否 |
| ids | 已选 ID 列表 | `Array` | `[]` | 否 |
| items | 已选项详情 | `Array` | `[]` | 否 |
| placeholder | 占位文本 | `string` | `请选择` | 否 |
| placeholderInput | 搜索占位文本 | `string` | `搜索文件名称` | 否 |
| width | 弹出层宽度 | `string` | `388px` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择变化 | `(results: Array<{label, value}>)` |
| input | 搜索输入（防抖 500ms） | `(keyword: string)` |
| add | 点击新增 | - |
| refresh | 点击刷新 | - |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| setData | 设置初始选中数据 | `(ids: (string\|number)[]) => Array` |

## 注意事项

- 搜索过滤为前端即时过滤，根据 label 匹配
- 匹配文字高亮显示
- 弹出层打开时添加透明遮罩阻止背景滚动
- 不传 `options` 时自动从 `useDictionaryStore().dictionaryFilter` 获取
