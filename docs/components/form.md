# Form 表单

动态表单组件，通过 `columns` 配置自动生成表单字段。支持多种输入控件，内置校验和重置功能。

## 何时使用

- 数据编辑页面（非弹窗场景）
- 配置页面中字段较多的表单

## 代码演示

### 基础用法

:::demo 通过 `columns` 配置表单结构，组件自动渲染对应控件。
```vue
<template>
  <NexiForm
    :columns="[
      { label: '名称', field: 'name', component: 'NexiInput', placeholder: '请输入名称' },
      { label: '描述', field: 'desc', component: 'NexiTextArea', placeholder: '请输入描述', rows: 3 },
    ]"
  />
</template>
```
:::

### 完整示例

含多种控件类型的表单：

```vue
<template>
  <NexiForm
    ref="formRef"
    :value="formData"
    :columns="columns"
    @finish="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import NexiForm from '@/components/antd/form.vue'

const formRef = ref()
const formData = reactive({
  name: '',
  type: undefined,
  status: 1,
  remark: '',
})

const columns = [
  {
    label: '名称',
    field: 'name',
    component: 'NexiInput',
    placeholder: '请输入名称',
    rules: [{ required: true, message: '名称为必填' }],
  },
  {
    label: '类型',
    field: 'type',
    component: 'NexiSelect',
    placeholder: '请选择类型',
    options: [
      { label: '类型 A', value: 'a' },
      { label: '类型 B', value: 'b' },
    ],
  },
  {
    label: '状态',
    field: 'status',
    component: 'NexiRadioGroup',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
  {
    label: '备注',
    field: 'remark',
    component: 'NexiTextArea',
    placeholder: '请输入备注',
    rows: 3,
  },
]

const handleSubmit = (values: any) => {
  console.log('提交数据:', values)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 表单数据对象 | `Record<string, any>` | `{}` | 否 |
| columns | 表单字段配置 | `QueryForm[]` | `[]` | 是 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(value: Record<string, any>)` |
| finish | 表单提交（校验通过后） | `(values: Record<string, any>)` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| reset | 重置表单为初始值 | - | `void` |
| validate | 校验全部字段 | - | `Promise<any>` |
| validateField | 校验指定字段 | `(fields: string[])` | `Promise<any>` |
| clearValidate | 清除校验状态 | - | `Promise<void>` |

### QueryForm 列配置字段

| 属性 | 说明 | 类型 |
|------|------|------|
| label | 字段标签 | `string` |
| field | 绑定字段名 | `string` |
| component | 控件类型名 | `string` |
| placeholder | 占位文本 | `string` |
| options | 选项（Select/RadioGroup 等） | `Array<{label, value}>` |
| rules | 校验规则 | `Rule[]` |
| useSlot | 是否使用自定义插槽渲染 | `boolean` |
| useLabelSlot | 是否使用自定义标签插槽 | `boolean` |
| show | 是否显示该字段 | `boolean` |
| disabled | 是否禁用 | `boolean` |

## 注意事项

- 支持的 component 类型：`NexiInput`、`NexiTextArea`、`NexiInputNumber`、`NexiSelect`、`NexiTreeSelect`、`NexiRadioGroup`、`NexiCheckbox`、`NexiCheckboxGroup`、`NexiDatePicker`、`NexiNexiDropDownSearch`、`NexiView`
- `useSlot: true` 时需要通过具名插槽 `<fieldName>` 自定义渲染该字段
- `useLabelSlot: true` 时通过 `label-<fieldName>` 插槽自定义标签
