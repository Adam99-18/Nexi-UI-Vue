# Img 图片

简单图片展示组件，支持自定义尺寸。

## 何时使用

- 需要展示图片的列表/详情场景
- 头像、缩略图等小尺寸图片

## 代码演示

### 基础用法

:::demo 通过 `src` 传入图片地址，`size` 控制尺寸。
```vue
<template>
  <div>
    <AntdImg src="https://via.placeholder.com/100" :size="48" />
    <AntdImg src="https://via.placeholder.com/100" :size="64" />
    <AntdImg src="https://via.placeholder.com/100" :size="80" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| src | 图片地址 | `string` | `""` | 否 |
| size | 图片尺寸（同时控制宽高） | `string \| number` | `24` | 否 |
