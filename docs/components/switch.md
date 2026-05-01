# Switch 开关

带启用/禁用文本标签的开关组件。

## 何时使用

- 需要快速切换某个功能/状态的开关场景
- 表格行内启用/禁用操作

## 代码演示

### 基础用法

:::demo 通过 `checked` 属性控制开关状态。
```vue
<template>
  <div>
    <AntdSwitch :checked="true" />
  </div>
</template>
```
:::

### 关闭状态

:::demo 设置 `checked` 为 false 显示关闭状态。
```vue
<template>
  <div>
    <AntdSwitch :checked="false" />
  </div>
</template>
```
:::

### 禁用状态

:::demo 设置 `disabled` 属性禁用开关。
```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <AntdSwitch :checked="true" :disabled="true" />
    <AntdSwitch :checked="false" :disabled="true" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 开关状态 | `boolean` | `false` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 状态切换 | `(checked: boolean)` |

## 注意事项

- 组件不通过 `v-model` 双向绑定，而是通过 `change` 事件通知父组件更新 `checked` prop
- 开启状态显示"启用"，关闭状态显示"禁用"
