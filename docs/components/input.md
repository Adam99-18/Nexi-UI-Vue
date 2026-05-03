# Input 输入框

带一键清除和字数统计的输入框封装，基于 ant-design-vue Input。

## 何时使用

- 表单中输入文本、数字等字段
- 搜索框、名称输入等场景

## 代码演示

### 基础用法

:::demo 使用 `v-model:value` 双向绑定输入值。
```vue
<template>
  <NexiInput v-model:value="keyword" placeholder="请输入内容" />
  <p>Value: {{ keyword }}</p>
</template>
```
:::

### 限制长度

:::demo 通过 `maxLength` 限制最大输入长度。
```vue
<template>
  <NexiInput placeholder="最多输入20个字符" :maxLength="20" />
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 输入值 | `string \| number` | `''` | 否 |
| placeholder | 占位提示 | `string` | `''` | 否 |
| maxLength | 最大长度（-1 为不限制） | `number` | `-1` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(value: string \| number)` |
| change | 值变化（原生 change 事件） | `(event: Event)` |

### v-model

`v-model:value="val"`

## 注意事项

- 组件自动带 `allow-clear` 一键清除功能和 `show-count` 字数统计
- `@change` 和 `v-model:value` 均会触发更新
- V1.1 修复了 computed 无 setter 导致 v-model 不工作的问题
