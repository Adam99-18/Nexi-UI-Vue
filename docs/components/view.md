# View 文本展示

只读文本展示组件，用于详情页数据展示。

## 何时使用

- 表单详情页的只读字段展示
- 列表中需要纯文本展示的场景

## 代码演示

### 基础用法

:::demo 通过 `text` 属性展示只读文本。
```vue
<template>
  <div>
    <AntdView text="这是一段只读展示文本" />
  </div>
</template>
```
:::

### 数字类型

:::demo 支持 number 类型，用于金额、统计等数值展示。
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <AntdView :text="12800" />
    <AntdView :text="99.5" />
    <AntdView :text="0" />
  </div>
</template>
```
:::

### 详情页场景

:::demo 常见的详情页字段只读展示。
```vue
<template>
  <div style="max-width: 400px; background: var(--vp-c-bg-soft); padding: 16px; border-radius: 8px;">
    <div style="display: flex; margin-bottom: 8px;">
      <span style="width: 80px; color: var(--vp-c-text-2);">名称：</span>
      <AntdView text="Nexi-UI 组件库" />
    </div>
    <div style="display: flex; margin-bottom: 8px;">
      <span style="width: 80px; color: var(--vp-c-text-2);">版本：</span>
      <AntdView text="1.0.0" />
    </div>
    <div style="display: flex;">
      <span style="width: 80px; color: var(--vp-c-text-2);">描述：</span>
      <AntdView text="企业级中后台 Vue 3 组件库" />
    </div>
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 展示文本 | `string \| number` | `""` | 否 |

## 注意事项

- 字体大小和颜色通过 CSS 变量控制，主题变化时自动适配
