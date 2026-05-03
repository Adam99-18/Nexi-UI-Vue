# Html 富文本

渲染 HTML 字符串的展示组件（`v-html` 封装）。

## 何时使用

- 后端返回富文本内容需要渲染时
- 需要动态插入 HTML 片段时

## 代码演示

### 基础用法

:::demo 通过 `html` 属性传入 HTML 字符串。
```vue
<template>
  <div>
    <NexiHtml html="<strong>加粗文字</strong>" />
    <NexiHtml html="<span style='color: #1677ff'>蓝色文字</span>" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| html | HTML 字符串 | `string` | `""` | 否 |

## 注意事项

- 组件内部直接使用 `v-html`，请确保内容已做 XSS 过滤
- 不要传入用户未经过滤的输入内容
