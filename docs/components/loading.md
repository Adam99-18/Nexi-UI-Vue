# Loading 加载

加载中状态组件，使用自定义 GIF 动画图标和可配置文字提示。

## 何时使用

- 数据请求等待时显示加载中
- 组件/页面内容尚未准备好时

## 代码演示

### 基础用法

:::demo 通过 `loading` 控制显示，默认文字"加载中"。
```vue
<template>
  <NexiLoading :loading="true" />
</template>
```
:::

### 自定义文字和样式

:::demo 通过 `text`、`fontSize`、`fontColor`、`width` 控制外观。
```vue
<template>
  <div>
    <NexiLoading :loading="true" text="数据加载中，请稍候..." />
    <NexiLoading :loading="true" text="处理中" font-size="16px" font-color="#52c41a" width="32px" />
  </div>
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

## 注意事项

- 加载图标使用 CDN GIF 动画（`loading.gif`），离线环境不会显示动画
- 组件使用 `<a-spin>` + 自定义 `indicator` 渲染
