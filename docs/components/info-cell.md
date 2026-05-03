# InfoCell 信息单元

Logo + 名称 + 描述的复合展示组件，文本超长时自动省略并显示 Tooltip。

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
      logo-url="https://via.placeholder.com/60"
      name="设计团队"
      description="负责产品 UI/UX 设计工作"
      @click-logo="() => console.log('logo clicked')"
    />
  </div>
</template>
```
:::

### 仅名称

不传 description 时仅展示名称。

```vue
<template>
  <div style="width: 320px;">
    <NexiInfoCell logo-url="https://via.placeholder.com/60" name="张三" />
  </div>
</template>
```

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
| click-logo | 点击 Logo 区域 | — |

## 注意事项

- 名称和描述超长时自动省略并通过 `CustomOverflowSuspension` 显示 Tooltip
- `logoUrl` 为空时使用 CDN 默认占位图
- Logo 默认 60x60 圆角展示，点击触发 `click-logo` 事件
