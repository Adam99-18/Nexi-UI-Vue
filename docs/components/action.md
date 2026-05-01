# Action 操作列

表格操作列组件，支持 Popconfirm 确认、Tooltip 提示、异步加载、权限过滤。

## 何时使用

- 表格每行的操作按钮（编辑、删除、查看等）
- 需要统一管理操作按钮权限和交互的场景

## 代码演示

### 基础用法

:::demo 通过 `actions` 数组定义操作按钮。
```vue
<template>
  <AntdAction
    :actions="[
      { key: 'view', label: '查看', onClick: () => console.log('view') },
      { key: 'edit', label: '编辑', onClick: () => console.log('edit') },
      { key: 'delete', label: '删除', onClick: () => console.log('delete') },
    ]"
  />
</template>
```
:::

### 带确认弹窗

:::demo 设置 `confirm` 属性为操作添加确认提示。
```vue
<template>
  <AntdAction
    :divider="true"
    :actions="[
      { key: 'view', label: '查看' },
      { key: 'edit', label: '编辑' },
      {
        key: 'delete',
        label: '删除',
        danger: true,
        confirm: { title: '确定要删除吗？', okText: '确定', cancelText: '取消' },
      },
    ]"
  />
</template>
```
:::

### 带 Tooltip

:::demo 通过 `tooltip` 属性为操作添加悬浮提示。
```vue
<template>
  <AntdAction
    :divider="true"
    :actions="[
      { key: 'view', label: '查看', tooltip: { title: '查看详情' } },
      { key: 'edit', label: '编辑', tooltip: { title: '编辑此项' } },
      { key: 'delete', label: '删除', tooltip: { title: '删除此项' } },
    ]"
  />
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| actions | 操作项列表 | `ActionItem[]` | - | 是 |
| rowKey | 行标识字段名 | `string` | `""` | 否 |
| divider | 是否显示操作间分隔线 | `boolean` | `true` | 否 |
| columnParams | 传递给 onClick 的参数 | `object` | - | 否 |

### ActionItem 类型

| 属性 | 说明 | 类型 |
|------|------|------|
| key | 唯一标识 | `string` |
| label | 显示文本 | `string` |
| auth | 权限标识，为空不校验 | `string[]` |
| icon | 图标名称 | `string` |
| type | 按钮类型 | `link` \| `text` \| `default` \| `primary` \| `dashed` |
| danger | 是否为危险操作（红色） | `boolean` |
| disabled | 是否禁用 | `boolean` |
| visible | 是否可见 | `boolean` \| `((params) => boolean)` |
| confirm | 确认弹窗配置 | `string` \| `{ title, okText, cancelText, icon, color }` |
| tooltip | 提示配置 | `string` \| `{ title, placement, color }` |
| onClick | 点击回调，支持 async | `(params?: any) => any \| Promise<any>` |

## 注意事项

- `onClick` 为异步函数时，点击后按钮自动进入 loading 状态，Promise 完成后恢复
- 非异步函数会自动包裹 debounce 防抖
- `auth` 为空时不校验权限，所有用户可见
- 操作按钮默认渲染为 `type="link"` 样式
