# Button 按钮

触发业务逻辑的操作按钮。内置权限控制，无权限时自动不渲染。

## 何时使用

- 需要触发一个操作时（如：提交表单、打开弹窗）
- 需要引导用户进行下一步操作时
- 需要按权限显示/隐藏操作入口时

## 代码演示

### 基础用法

最简单的按钮用法。

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

:::demo 通过 `size` 属性设置按钮尺寸，支持 `small`、`middle`、`large`。
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
    <NexiButton type="primary" icon="SearchOutlined">搜索</NexiButton>
    <NexiButton type="primary" icon="PlusOutlined">新增</NexiButton>
    <NexiButton icon="EditOutlined" iconColor="#1677ff">编辑</NexiButton>
  </div>
</template>
```
:::

### 幽灵按钮

:::demo 设置 `ghost` 属性使按钮背景透明，适合在深色背景上使用。
```vue
<template>
  <div>
    <NexiButton type="primary" :ghost="true">幽灵按钮</NexiButton>
  </div>
</template>
```
:::

### 权限控制

:::demo 设置 `permission` 属性，无权限时按钮完全不渲染。
```vue
<template>
  <div style="display: flex; gap: 8px;">
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
| icon | 图标名称 | `string` | - | 否 |
| iconColor | 图标颜色 | `string` | - | 否 |
| ghost | 幽灵模式（背景透明） | `boolean` | `false` | 否 |
| permission | 权限标识数组，为空数组时不校验权限 | `string[]` | `[]` | 否 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮文本内容 |
| icon | 自定义图标（默认根据 `icon` prop 自动渲染） |

## 注意事项

- `permission` 为空数组时默认不校验权限，所有用户可见
- 权限校验失败时按钮完全不渲染 DOM（`v-if`），而非 `display: none`
- 图标名称对应 `@ant-design/icons-vue` 的导出名，通过 `NexiIcon` 组件动态渲染
- 按钮内置 `[data-type="green"]` CSS 样式，可通过自定义 class 启用绿色变体
