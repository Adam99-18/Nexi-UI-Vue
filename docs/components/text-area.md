# TextArea 文本域

多行文本输入组件，支持字数统计、自适应高度和自定义行数限制。

## 何时使用

- 需要输入较长的描述、备注等内容
- 评论、反馈等自由文本输入场景

## 代码演示

### 基础用法

:::demo 绑定表单对象和字段名，通过 `field` 和 `form` 关联数据。
```vue
<template>
  <div>
    <AntdTextArea placeholder="请输入描述信息" :rows="4" />
  </div>
</template>
```
:::

### 字数统计

:::demo 通过 `showCount` 和 `maxlength` 显示字数统计。
```vue
<template>
  <div>
    <AntdTextArea
      placeholder="请输入内容"
      :rows="3"
      :showCount="true"
      :maxlength="200"
    />
  </div>
</template>
```
:::

### 限制行数

:::demo 通过 `min` 和 `max` 限制行数范围。
```vue
<template>
  <div>
    <AntdTextArea
      placeholder="最少2行，最多6行"
      :min="2"
      :max="6"
    />
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| field | 绑定字段名 | `string` | `""` | 是 |
| form | 表单数据对象 | `object` | `{}` | 是 |
| placeholder | 占位文本 | `string` | `""` | 否 |
| min | 最小行数 | `number` | `0` | 否 |
| max | 最大行数（超出滚动） | `number` | `0` | 否 |
| maxlength | 最大字符数 | `number` | `0` | 否 |
| rows | 默认行数 | `number` | `3` | 否 |
| autoSize | 自动调整高度 | `boolean` | `false` | 否 |
| allowClear | 是否可清除 | `boolean` | `true` | 否 |
| showCount | 显示字数统计 | `boolean` | `false` | 否 |
| onChange | 值变化回调 | `(value: string) => void` | - | 否 |

## 注意事项

- 字数统计使用自定义实现，与 ant-design-vue 原生 count 不同
- `max` 限制的是 CSS 最大高度，超出后内部滚动
- `field` 和 `form` 是必填的，组件通过 `form[field]` 读写数据
