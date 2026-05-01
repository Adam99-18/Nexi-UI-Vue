# Loading 加载

加载中状态组件，自定义加载图标和文字提示。

## 何时使用

- 数据请求等待时显示加载中
- 组件/页面内容尚未准备好时

## 代码演示

### 基础用法

:::demo 通过 `loading` 属性控制显示状态。
```vue
<template>
  <AntdLoading :loading="true" />
</template>
```
:::

### 自定义文字

:::demo 通过 `text` 属性自定义加载提示文字。
```vue
<template>
  <div>
    <AntdLoading :loading="true" text="数据加载中，请稍候..." />
  </div>
</template>
```
:::

### 自定义样式

:::demo 通过 `fontSize`、`fontColor`、`width` 控制外观。
```vue
<template>
  <AntdLoading
    :loading="true"
    text="处理中"
    font-size="16px"
    font-color="#52c41a"
    width="32px"
  />
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| loading | 是否加载中 | `boolean` | `false` | 否 |
| text | 加载提示文字 | `string` | `加载中` | 否 |
| width | 加载图标宽度 | `string` | `24px` | 否 |
| fontSize | 文字字号 | `string` | `14px` | 否 |
| fontColor | 文字颜色 | `string` | `var(--theme-default-color)` | 否 |
