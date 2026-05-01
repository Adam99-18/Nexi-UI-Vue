# InfoCell 信息单元

Logo + 名称 + 描述的复合展示组件，文本超长时自动显示 Tooltip。

## 何时使用

- 列表项展示带缩略图的名称和描述信息
- 用户/组织/项目等信息卡片场景

## 代码演示

### 基础用法

:::demo 基本的 Logo + 名称 + 描述组合。
```vue
<template>
  <div style="width: 320px;">
    <NexiInfoCell
      logo-url="https://via.placeholder.com/40"
      name="设计团队"
      description="负责产品 UI/UX 设计工作，包含视觉设计、交互设计、用户研究"
    />
  </div>
</template>
```
:::

### 仅名称

:::demo 不传描述信息时仅展示名称。
```vue
<template>
  <div style="width: 320px;">
    <NexiInfoCell
      logo-url="https://via.placeholder.com/40"
      name="张三"
    />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| logoUrl | Logo 图片地址 | `string` | CDN 默认图 | 否 |
| name | 名称 | `string` | `""` | 否 |
| description | 描述文字 | `string` | `""` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click-logo | 点击 Logo | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| customTitle | 自定义标题内容 |

## 注意事项

- 名称和描述超长时自动省略并显示 Tooltip（通过 CustomOverflowSuspension 实现）
- `logoUrl` 为空时会使用默认占位图
