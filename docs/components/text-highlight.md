# TextHighlight 文本高亮

根据关键字对文本中匹配的部分进行高亮标记。

## 何时使用

- 搜索结果中高亮显示匹配关键词
- 下拉筛选列表中高亮用户输入的搜索文本

## 代码演示

### 基础用法

:::demo 传入 `content` 全文和 `heightValue` 关键字，自动高亮匹配部分。
```vue
<template>
  <NexiTextHighlight content="This is a searchable text with keywords" height-value="search" />
</template>
```
:::

### 在列表中使用

```vue
<template>
  <div v-for="item in filteredList" :key="item.id">
    <NexiTextHighlight :content="item.label" :height-value="keyword" />
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| content | 要展示的完整文本 | `string` | `''` | 否 |
| heightValue | 需要高亮的关键字 | `string` | `''` | 否 |
| className | 自定义 CSS class | `string` | `''` | 否 |

## 注意事项

- 高亮匹配**不区分大小写**
- `heightValue` 中的正则特殊字符会自动转义
- 未传入 `heightValue` 或 `content` 时，按普通文本渲染
- 高亮色值为 `#4b67f4`（主题色）
- V1.1 新增组件，被 NexiDropDownFilter、NexiCheckboxFilterSearch 内部使用
