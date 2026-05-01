# Input 输入框

带一键清除和字数统计的输入框封装。

## 何时使用

- 表单中输入文本、数字等字段
- 搜索框、名称输入等场景

## 代码演示

### 基础用法

:::demo 使用 `v-model:value` 双向绑定输入值。
```vue
<template>
  <div>
    <AntdInput placeholder="请输入内容" />
  </div>
</template>
```
:::

### 限制长度

:::demo 通过 `maxLength` 限制最大输入长度，超出后不可继续输入。
```vue
<template>
  <div>
    <AntdInput placeholder="最多输入20个字符" :maxLength="20" />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 输入值 | `string \| number` | `""` | 否 |
| placeholder | 占位提示 | `string` | `""` | 否 |
| maxLength | 最大长度（-1 为不限制） | `number` | `-1` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(value: string)` |

## 注意事项

- 组件自动带 `allow-clear` 一键清除功能
- `@change` 和 `v-model:value` 均会触发更新
