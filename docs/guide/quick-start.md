# 快速开始

## 全局注册

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Nexi from 'ant-design-vue'
import NexiUI from 'Nexi-ui'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(Nexi)
app.use(NexiUI) // 组件前缀 <antd-xxx>
app.mount('#app')
```

## 按需引入

```vue
<template>
  <NexiButton type="primary" @click="handleClick">点击我</NexiButton>
</template>

<script lang="ts" setup>
import { Button as NexiButton } from 'Nexi-ui'

const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

## 配置动态表单

Form 组件通过 `columns` 配置即可生成完整表单：

```vue
<template>
  <NexiForm
    ref="formRef"
    :value="formValue"
    :columns="columns"
    @search="handleSearch"
  />
</template>

<script lang="ts" setup>
import { Form as NexiForm } from 'Nexi-ui'
import { ref, reactive } from 'vue'

const formRef = ref()
const formValue = reactive({ name: '', status: '' })

const columns = [
  {
    label: '名称',
    field: 'name',
    component: 'NexiInput',
    placeholder: '请输入名称',
  },
  {
    label: '状态',
    field: 'status',
    component: 'NexiSelect',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
  },
]

const handleSearch = (values: any) => {
  console.log('search:', values)
}
</script>
```

## 配置表格

```vue
<template>
  <NexiTable
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
  />
</template>

<script lang="ts" setup>
import { Table as NexiTable } from 'Nexi-ui'
import { ref, reactive } from 'vue'

const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '状态', dataIndex: 'status', key: 'status' },
]

const data = ref([
  { id: 1, name: '项目 A', status: '进行中' },
  { id: 2, name: '项目 B', status: '已完成' },
])

const pagination = reactive({ current: 1, pageSize: 10, total: 2 })
</script>
```

## 弹窗使用

```vue
<template>
  <NexiButton type="primary" @click="modalRef.open()">打开弹窗</NexiButton>

  <NexiModal ref="modalRef" title="编辑信息" @ok="handleOk">
    <p>弹窗内容</p>
  </NexiModal>
</template>

<script lang="ts" setup>
import { Button as NexiButton, Modal as NexiModal } from 'Nexi-ui'
import { ref } from 'vue'

const modalRef = ref()

const handleOk = (params: any) => {
  console.log('ok clicked', params)
}
</script>
```

## 权限控制

Button、Action、DropDown 内置 `auth` 属性，无权限时自动隐藏：

```vue
<template>
  <NexiButton type="primary" auth="user:create">新建用户</NexiButton>
  <NexiButton type="primary" auth="user:delete" danger>删除用户</NexiButton>
</template>
```

> 需要宿主项目实现 `usePermission(auth: string): boolean`。
