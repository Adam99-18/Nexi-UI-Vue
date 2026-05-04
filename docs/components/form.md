# Form 表单

动态表单组件，通过 `columns` 配置自动生成表单字段。支持多种输入控件，内置校验、重置、暴露表单值。

## 何时使用

- 数据编辑页面（非弹窗场景）
- 配置页面中字段较多的表单

## 代码演示

### 基础用法

:::demo 通过 `columns` 配置表单结构，使用 `v-model:value` 绑定。
```vue
<template>
  <NexiForm
    :value="formData"
    :columns="[
      { label: '名称', field: 'name', component: 'NexiInput', placeholder: '请输入名称' },
      { label: '描述', field: 'desc', component: 'NexiTextArea', placeholder: '请输入描述', rows: 3 },
    ]"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const formData = reactive({ name: '', desc: '' })
</script>
```
:::

### 完整示例

含多种控件类型和表单校验：

```vue
<template>
  <NexiForm
    ref="formRef"
    :value="formData"
    :columns="columns"
    @search="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

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
:::

### 自定义插槽字段

```vue
<template>
  <NexiForm
    :value="formData"
    :columns="columns"
  >
    <template #status>
      <NexiSwitch :checked="formData.status === 1" @update:checked="(v) => formData.status = v ? 1 : 0" />
    </template>
  </NexiForm>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const formData = reactive({ name: '', status: 1 })
const columns = [
  { label: '名称', field: 'name', component: 'NexiInput' },
  { label: '状态', field: 'status', component: 'NexiSwitch', useSlot: true },
]
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
| search | 表单提交（校验通过后触发） | `(values: Record<string, any>)` |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| reset | 重置表单为初始值（深拷贝恢复） | — | `void` |
| validate | 校验全部字段 | — | `Promise<any>` |
| validateField | 校验指定字段 | `(fields: string[])` | `Promise<any>` |
| validateFields | 校验指定字段（同 validateField） | `(fields: string[])` | `Promise<any>` |
| clearValidate | 清除校验状态 | — | `Promise<void>` |

### Expose 属性

| 属性名 | 说明 | 类型 |
|--------|------|------|
| value | 当前表单数据（formState） | `object` |

### QueryForm 列配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 字段标签 | `string` | — |
| field | 绑定字段名 | `string` | — |
| component | 控件类型名（如 `NexiInput`） | `string` | — |
| componentProps | 控件属性（placeholder、options 等） | `object` | `{}` |
| rules | 校验规则 | `Rule[]` | — |
| colProps | 列布局配置（span、labelSpan、wrapperSpan） | `object` | `{ span: 24 }` |
| useSlot | 是否使用自定义插槽 | `boolean` | `false` |
| useLabelSlot | 是否使用自定义标签插槽 | `boolean` | `false` |

### 支持的 component 类型

`NexiInput`、`NexiTextArea`、`NexiInputNumber`、`NexiSelect`、`NexiTreeSelect`、`NexiRadioGroup`、`NexiCheckbox`、`NexiCheckboxGroup`、`NexiDatePicker`、`NexiNexiDropDownSearch`、`NexiView`

## 注意事项

- `value` 变化时通过 watch + delete + Object.assign 模式更新 formState
- `reset()` 使用 `lodash-es/cloneDeep` 深拷贝初始值后恢复
- `useSlot: true` 时通过具名插槽 `<fieldName>` 自定义渲染
- `useLabelSlot: true` 时通过 `label-<fieldName>` 插槽自定义标签
- `@search` 事件通过 `<a-form @finish>` 触发
- 表单验证依赖 `<a-form-item>` 的 `rules` 配置
