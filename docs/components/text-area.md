# TextArea 文本域

多行文本输入组件，支持字数统计、自适应高度和自定义行数限制，通过 `form[field]` 读写数据。

## 何时使用

- 需要输入较长的描述、备注等内容
- 评论、反馈等自由文本输入场景

## 代码演示

### 基础用法

:::demo 绑定表单对象和字段名，通过 `field` 和 `form` 关联数据。
```vue
<template>
  <NexiTextArea
    :form="myForm"
    field="remark"
    placeholder="请输入描述信息"
    :rows="4"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const myForm = reactive({ remark: '' })
</script>
```
:::

### 字数统计

:::demo 通过 `showCount` 和 `maxlength` 显示字数统计。
```vue
<template>
  <NexiTextArea
    :form="form"
    field="bio"
    placeholder="请输入内容"
    :rows="3"
    :show-count="true"
    :maxlength="200"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({ bio: '' })
</script>
```
:::

### 限制滚动高度

:::demo `maxHeight` 限制最大高度，超出后内部滚动。
```vue
<template>
  <NexiTextArea
    :form="form"
    field="content"
    placeholder="请输入长文本..."
    max-height="200px"
  />
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
| maxHeight | 最大高度（超出内部滚动） | `string` | `auto` | 否 |
| onChange | 值变化回调 | `(value: any) => void` | — | 否 |

## 注意事项

- 组件通过 `form[field]` 直接读写数据（`v-model:value="form[field]"`）
- `showCount` 和 `maxlength` 同时使用时会渲染自定义字数统计
- `maxHeight` 不是 `auto` 时启用内部滚动条
- 字数统计使用自定义实现，底部显示"当前/最大"格式
