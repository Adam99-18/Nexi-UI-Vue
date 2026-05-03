# Action 操作列

动态操作按钮组，支持权限控制、tooltip、popConfirm 二次确认、异步操作 loading。常用于表格操作列。

## 何时使用

- 表格行操作列（查看、编辑、删除等）
- 需要权限控制的操作入口
- 需要二次确认的危险操作（popConfirm）
- 需要异步 loading 的操作

## 代码演示

### 基础用法

:::demo 通过 `actions` 配置操作项，自动渲染按钮组。
```vue
<template>
  <NexiAction
    :actions="[
      { key: 'view', label: '查看', icon: 'search', onClick: () => console.log('View') },
      { key: 'edit', label: '编辑', icon: 'edit', onClick: () => console.log('Edit') },
      { key: 'delete', label: '删除', icon: 'delete',
        onClick: () => console.log('Delete'),
        popConfirm: { title: '确认删除？' },
      },
    ]"
    :column-params="{ id: 1 }"
  />
</template>
```
:::

### 异步操作 + Loading

:::demo 异步 onClick 自动管理 loading 状态，操作期间按钮显示加载动画。
```vue
<template>
  <NexiAction
    :actions="[
      { key: 'sync', label: '同步', icon: 'refresh',
        onClick: async (params) => {
          await fetch('/api/sync', { method: 'POST', body: JSON.stringify(params) })
        },
      },
    ]"
    :column-params="{ id: record.id }"
  />
</template>
```

### 权限控制

:::demo 通过 `auth` 配置权限码，无权限时按钮完全不渲染。通过 `isShow` 控制可见性。
```vue
<template>
  <NexiAction
    :actions="[
      { key: 'view', label: '查看', auth: [] },
      { key: 'admin', label: '管理', auth: ['admin'] },
      { key: 'hidden', label: '隐藏项', isShow: false },
    ]"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| actions | 操作项列表 | `ActionItem[]` | `[]` | 是 |
| columnParams | 传给 onClick 的列参数 | `object` | `undefined` | 否 |
| divider | 按钮间是否显示分隔线 | `boolean` | `true` | 否 |
| rowKey | 行主键 | `string` | `''` | 否 |

### ActionItem 配置

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| key | 唯一标识 | `string` | 是 |
| label | 按钮文字 | `string` | 否 |
| icon | 图标名称（NexiIcon 图标名） | `string` | 否 |
| auth | 权限码数组，空数组或无此字段表示无权限限制 | `string[]` | 否 |
| isShow | 是否显示（默认 true） | `boolean` | 否 |
| onClick | 点击回调，支持同步/异步函数，自动 debounce | `(params?: any) => void \| Promise<void>` | 否 |
| popConfirm | 气泡确认框配置（ant-design-vue Popconfirm props） | `object` | 否 |
| tooltip | 提示文字或完整 Tooltip 配置 | `string \| TooltipProps` | 否 |

## 注意事项

- **popConfirm + onClick：** 配置 popConfirm 后，点击先弹出确认框，确认后才执行 onClick，不会被绕过
- **异步操作：** onClick 返回 Promise 时自动显示 loading 动画
- **同步操作：** 自动 debounce（lodash-es，trailing 模式）
- **权限控制：** 使用 `setPermissionResolver` 全局设置权限解析函数
- **不可变数据：** 内部使用 `{ ...item }` 扩展，不会修改原始 actions 数组
- **按钮样式：** 操作按钮默认渲染为 `type="link" size="small"` 样式
- V1.1 完整重写，解决了 TDZ / v-bind 冲突 / VNode 渲染 / popConfirm 绕过 4 个 P0 问题
