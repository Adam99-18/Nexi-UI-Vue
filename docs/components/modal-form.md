# ModalForm 表单弹窗

Modal + Form 组合组件，弹窗内嵌动态表单。通过 `columns` 配置生成表单字段，支持校验和提交。

## 何时使用

- 新增/编辑数据的弹窗场景
- 需要在弹窗内完成表单填写并提交

## 代码演示

### 基础用法

:::demo 通过 ref 打开弹窗，columns 驱动表单，提交时自动校验。
```vue
<template>
  <div>
    <NexiButton type="primary" @click="modalFormRef.open()">新增用户</NexiButton>
    <NexiButton style="margin-left: 8px" @click="modalFormRef.open({ id: 1, name: '张三', role: 'admin', status: 1 })">编辑用户</NexiButton>

    <NexiModalForm
      ref="modalFormRef"
      title="用户信息"
      :columns="columns"
      :rules="rules"
      @ok="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { NexiButton, NexiModalForm } from 'nexi-ui'

const modalFormRef = ref()

const columns = [
  {
    label: '用户名',
    field: 'name',
    component: 'NexiInput',
    placeholder: '请输入用户名',
  },
  {
    label: '角色',
    field: 'role',
    component: 'NexiSelect',
    placeholder: '请选择角色',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '编辑者', value: 'editor' },
      { label: '查看者', value: 'viewer' },
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

const rules = {
  name: [{ required: true, message: '请输入用户名' }],
  role: [{ required: true, message: '请选择角色' }],
}

const handleSubmit = async (values: any) => {
  console.log('提交数据:', values)
  // await api.save(values)
  modalFormRef.value.close()
}
</script>
```
:::

### 自定义插槽字段

```vue
<template>
  <div>
    <NexiButton type="primary" @click="customRef.open()">自定义字段</NexiButton>

    <NexiModalForm ref="customRef" title="自定义字段" :columns="customColumns" @ok="(v) => console.log(v)">
      <template #status>
        <NexiSwitch :checked="true" />
      </template>
    </NexiModalForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NexiButton, NexiSwitch, NexiModalForm } from 'nexi-ui'

const customRef = ref()
const customColumns = [
  { label: '名称', field: 'name', component: 'NexiInput', placeholder: '请输入' },
  { label: '启用状态', field: 'status', component: 'NexiSwitch', useSlot: true },
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| width | 弹窗宽度 | `number \| string` | `600` | 否 |
| title | 弹窗标题 | `string` | `""` | 否 |
| value | 表单初始值 | `Record<string, any>` | `{}` | 否 |
| columns | 表单字段配置 | `FormParams[]` | `[]` | 是 |
| rules | 表单校验规则 | `Record<string, any>` | `{}` | 否 |
| container | 挂载容器选择器 | `string` | `""` | 否 |
| zIndex | 层级 | `number` | `1000` | 否 |
| bg | 背景渐变色装饰 | `boolean` | `false` | 否 |
| cancelText | 取消按钮文字 | `string` | `返回` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 表单值变化 | `(value: any)` |
| ok | 提交（校验通过后） | `(values: any)` — 合并了 openParams + value + formResult |
| cancel | 取消操作 | — |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗并设置初始值 | `(params?: any)` |
| close | 关闭弹窗 | — |
| reset | 重置表单 | — |
| setLoading | 设置提交按钮 loading | `(loading: boolean)` |
| validateFields | 手动校验字段 | `(record?: any)` |

### Expose

| 属性名 | 说明 | 类型 |
|--------|------|------|
| value | 当前表单数据 | `object` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| title | 自定义标题 |
| extra | 表单上方额外内容 |
| `<fieldName>` | 自定义字段渲染（需 `useSlot: true`） |
| `label-<fieldName>` | 自定义字段标签（需 `useLabelSlot: true`） |

## 注意事项

- `open(params)` 传入的参数合并为表单初始值
- 提交时 `ok` 事件参数 = `{ ...params, ...value, ...formResult }`
- 弹窗 `destroy-on-close`，关闭后表单重置
- 支持与 Form 相同的 component 类型，额外支持 `NexiInputPassword`
- `getContainer` 默认查询 `props.container || ".layout-wrap"`，回退到 `document.body`
- 监听 `useGlobalStore().toggleGlobalModal`，退出登录时自动关闭
