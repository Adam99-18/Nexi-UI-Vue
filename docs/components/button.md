# Button 按钮

触发业务逻辑的操作按钮。内置权限控制，无权限时自动不渲染。

## 何时使用

- 需要触发一个操作时（如：提交表单、打开弹窗）
- 需要引导用户进行下一步操作时
- 需要按权限显示/隐藏操作入口时

## 代码演示

### 基础用法

:::demo 通过 `type` 属性控制按钮类型，支持 `primary`、`default`、`dashed`、`link`、`text`。
```vue
<template>
  <div>
    <NexiButton type="primary">主按钮</NexiButton>
    <NexiButton type="default">默认按钮</NexiButton>
    <NexiButton type="dashed">虚线按钮</NexiButton>
    <NexiButton type="link">链接按钮</NexiButton>
    <NexiButton type="text">文本按钮</NexiButton>
  </div>
</template>
```
:::

### 不同尺寸

:::demo 通过 `size` 属性设置按钮尺寸。
```vue
<template>
  <div>
    <NexiButton type="primary" size="small">小按钮</NexiButton>
    <NexiButton type="primary" size="middle">中按钮</NexiButton>
    <NexiButton type="primary" size="large">大按钮</NexiButton>
  </div>
</template>
```
:::

### 带图标

:::demo 通过 `icon` 属性设置图标名称，使用 `iconColor` 设置图标颜色。
```vue
<template>
  <div>
    <NexiButton type="primary" icon="search">搜索</NexiButton>
    <NexiButton icon="edit" iconColor="#1677ff">编辑</NexiButton>
    <NexiButton icon="delete">删除</NexiButton>
  </div>
</template>
```
:::

### 权限控制

:::demo 设置 `permission` 属性，无权限时按钮完全不渲染。
```vue
<template>
  <div>
    <NexiButton type="primary" :permission="['admin']">管理员可见</NexiButton>
    <NexiButton :permission="[]">全员可见</NexiButton>
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | `primary` \| `default` \| `dashed` \| `link` \| `text` | `primary` | 否 |
| size | 按钮尺寸 | `small` \| `middle` \| `large` | `middle` | 否 |
| icon | 图标名称 (NexiIcon 图标名) | `string` | `''` | 否 |
| iconColor | 图标颜色 | `string` | `''` | 否 |
| ghost | 幽灵模式（背景透明） | `boolean` | `false` | 否 |
| permission | 权限标识数组，空数组时不校验 | `string[]` | `[]` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮文本内容 |
| icon | 自定义图标（默认根据 `icon` prop 自动渲染） |

## 注意事项

- `permission` 为空数组时默认不校验权限，所有用户可见
- 权限校验失败时按钮完全不渲染（`v-if`），而非 `display: none`
- 图标名称对应 NexiIcon 组件支持的 200+ 图标名（search, edit, delete, setting, user, plus, close, check, refresh, loading 等）
- 按钮内置 `[data-type="green"]` CSS 样式，可通过自定义 class 启用绿色变体
- 支持 ant-design-vue Button 的原生属性透传（disabled, loading, block, href, htmlType 等）
