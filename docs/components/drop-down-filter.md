# DropDownFilter 下拉筛选

带搜索、新增、删除、刷新功能的复杂下拉筛选器，用于多选场景。

## 何时使用

- 知识库/文件夹/标签等多选场景
- 需要在下拉列表中搜索、管理选项的筛选

## 代码演示

### 基础用法

:::demo 通过 `options` 传入可选列表，使用 `@select` 和 `@remove` 处理选择。
```vue
<template>
  <NexiDropDownFilter
    placeholder="请选择知识库"
    placeholder-input="搜索知识库名称"
    :options="[
      { label: '知识库 A', value: '1' },
      { label: '知识库 B', value: '2' },
      { label: '知识库 C', value: '3' },
    ]"
    :is-owner="true"
    :edit-status="true"
    @select="(ids) => console.log('选中:', ids)"
    @remove="(ids) => console.log('移除后:', ids)"
    @add="() => console.log('新增')"
    @refresh="() => console.log('刷新')"
    @input="(keyword) => console.log('搜索:', keyword)"
  />
</template>
```
:::

### 禁用状态

`isOwner` 为 false 时组件灰显不可操作。

```vue
<template>
  <NexiDropDownFilter
    placeholder="请选择知识库"
    :options="[{ label: '知识库 A', value: '1' }]"
    :is-owner="false"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | 选项列表 | `Array<{label, value}>` | `[]` | 否 |
| items | 已选项详情（含 label、value/id） | `Array` | `[]` | 否 |
| placeholder | 占位文本 | `string` | `请选择知识库` | 否 |
| placeholderInput | 搜索框占位文本 | `string` | `搜索知识库名称` | 否 |
| isOwner | 是否为拥有者（false 时禁用） | `boolean` | `false` | 否 |
| editStatus | 编辑状态（控制搜索框可编辑） | `boolean` | `false` | 否 |
| container | 弹出层容器选择器 | `string` | `""` | 否 |
| width | 弹出层宽度 | `string` | `388px` | 否 |
| height | 弹出层高度 | `string` | `317px` | 否 |
| inputStyles | 输入框样式 | `object` | `{ width: '100%', border: 'none', outline: 'none' }` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| select | 选择变化 | `(ids: any[])` |
| input | 搜索输入（防抖 500ms） | `(keyword: string)` |
| add | 点击新建按钮 | — |
| remove | 移除标签 | `(ids: any[])` |
| refresh | 点击刷新按钮 | — |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| setData | 组装 ids 数组数据结构 | `(ids: (string\|number)[])` | `Array<{value: string}>` |

## 注意事项

- `isOwner` 为 false 时组件灰显不可操作（cursor-not-allowed、opacity-80）
- `editStatus` 为 false 时搜索输入框禁用
- 弹出层打开时添加透明遮罩阻止背景滚动
- 搜索使用 `lodash-es/debounce` 500ms 防抖
- `getPopupContainer` 容器回退到 `document.body`
- 底部固定展示"新建知识库"和"刷新"按钮
