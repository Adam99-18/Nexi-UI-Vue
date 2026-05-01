# DropDownFilter 下拉筛选

带有搜索、新增、删除、刷新功能的复杂下拉筛选器。

## 何时使用

- 知识库/文件夹/标签等多选场景
- 需要在下拉列表中搜索、管理选项的复杂筛选

## 代码演示

### 基础用法

:::demo 通过 `options` 传入可选列表，`ids` 绑定已选值。
```vue
<template>
  <div>
    <AntdDropDownFilter
      placeholder="请选择知识库"
      placeholder-input="搜索知识库名称"
      :options="[
        { label: '知识库 A', value: '1' },
        { label: '知识库 B', value: '2' },
        { label: '知识库 C', value: '3' },
      ]"
      :isOwner="true"
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
| ids | 已选 ID 列表 | `Array<string\|number>` | `[]` | 否 |
| items | 已选项详情（含 label 和 value） | `Array` | `[]` | 否 |
| placeholder | 占位文本 | `string` | `请选择知识库` | 否 |
| placeholderInput | 搜索占位文本 | `string` | `搜索知识库名称` | 否 |
| isOwner | 是否为拥有者（false 时组件禁用） | `boolean` | `false` | 否 |
| editStatus | 编辑状态 | `boolean` | `false` | 否 |
| container | 弹出层容器选择器 | `string` | `""` | 否 |
| width | 弹出层宽度 | `string` | `388px` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择变化 | `(ids: any[])` |
| input | 搜索输入（防抖 500ms） | `(keyword: string)` |
| add | 点击新增按钮 | - |
| remove | 移除标签 | `(ids: any[])` |
| refresh | 点击刷新按钮 | - |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| setData | 设置初始选中数据 | `(ids: (string\|number)[]) => Array` |

## 注意事项

- `isOwner` 为 false 时组件视觉上灰显且不可操作（cursor-not-allowed）
- 弹出层打开时会在 body 上添加透明遮罩，阻止背景滚动
- 搜索功能使用 `lodash-es/debounce` 做 500ms 防抖
- 搜索结果高亮匹配文字
