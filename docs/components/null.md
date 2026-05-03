# Null 空状态

空状态占位组件，用于数据为空时的友好提示，基于 ant-design-vue Empty。

## 何时使用

- 列表/表格无数据时替代空白区域
- 搜索无结果时显示提示

## 代码演示

### 基础用法

:::demo 默认显示"暂无信息"和默认插图。
```vue
<template>
  <NexiNull />
</template>
```
:::

### 自定义文字

:::demo 通过 `text` 属性自定义提示文字。
```vue
<template>
  <NexiNull text="没有找到相关数据" />
</template>
```
:::

### 自定义图片和高度

:::demo 通过 `image` 和 `height` 自定义插图。
```vue
<template>
  <div>
    <NexiNull text="列表为空" height="6rem" />
    <NexiNull text="无数据" :mt="false" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 提示文字 | `string` | `暂无信息` | 否 |
| image | 自定义图片 URL | `string` | CDN 默认图 | 否 |
| height | 图片区域高度 | `string` | `8.125rem` | 否 |
| mt | 是否添加顶部间距（图片 margin-top） | `boolean` | `true` | 否 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 额外内容（插在提示文字下方） |

## 注意事项

- 默认图片来自 CDN，离线环境需自定义 `image` 属性
- `mt: false` 时移除图片顶部 3.0625rem 间距，适合在表格等紧凑场景使用
- 基于 `<a-empty>` 组件，`image` prop 设为 false 隐藏默认插图
