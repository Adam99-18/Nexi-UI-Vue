# DropDown 下拉菜单

带权限过滤的下拉菜单组件。菜单项可通过 `auth` 字段控制可见性。

## 何时使用

- 表格操作列"更多"菜单
- 触发区域需要自定义的下拉选择场景
- 需要按权限显示不同菜单项的场景

## 代码演示

### 基础用法

:::demo 通过 `options` 定义菜单项，默认 slot 传入触发器。
```vue
<template>
  <NexiDropDown
    :options="[
      { label: '编辑', key: 'edit', action: 'edit' },
      { label: '删除', key: 'delete', action: 'delete' },
      { label: '导出', key: 'export', action: 'export' },
    ]"
  >
    <NexiButton>操作</NexiButton>
  </NexiDropDown>
</template>
```
:::

### 带分隔线

:::demo 设置 `divider: true` 的项会渲染为分隔线。
```vue
<template>
  <NexiDropDown
    :options="[
      { label: '查看详情', key: 'view' },
      { label: '编辑', key: 'edit' },
      { divider: true },
      { label: '删除', key: 'delete', action: 'delete' },
    ]"
  >
    <NexiButton type="link">更多</NexiButton>
  </NexiDropDown>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | 菜单项列表 | `Array<{label, key, auth?, action?, divider?}>` | - | 是 |
| item | 当前行数据（传递给事件回调） | `object` | `{}` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击菜单项 | `({ item, key, action })` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 下拉触发器内容 |

## 注意事项

- 菜单项设置 `auth` 后会自动调用 `usePermission(auth)` 校验权限，无权限的项不渲染
- `divider` 为 `true` 时该项渲染为分隔线，不会触发 click 事件
- 触发器自动包裹 `<a>` 标签并阻止事件冒泡
