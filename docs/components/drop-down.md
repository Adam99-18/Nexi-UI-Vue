# DropDown 下拉菜单

带权限过滤的下拉菜单组件，基于 ant-design-vue Dropdown 封装。

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
      { label: '编辑', action: 'edit' },
      { label: '删除', action: 'delete' },
      { label: '导出', action: 'export' },
    ]"
    @click="(e) => console.log(e.key, e.action)"
  >
    <NexiButton>操作</NexiButton>
  </NexiDropDown>
</template>
```
:::

### 带分隔线和权限

:::demo 设置 `divider: true` 渲染分隔线，设置 `auth` 控制可见性。
```vue
<template>
  <NexiDropDown
    :options="[
      { label: '查看详情' },
      { label: '编辑' },
      { divider: true },
      { label: '删除', action: 'delete' },
      { label: '管理', auth: ['admin'] },
    ]"
    @click="(e) => console.log(e)"
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
| options | 菜单项列表 | `Array<{label, action?, auth?, divider?}>` | — | 是 |
| item | 当前行数据（合并到事件回调中） | `object` | `{}` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击菜单项 | `({ ...item, key: string, action: any })` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 下拉触发器内容 |

## 注意事项

- 菜单项设置 `auth` 后自动调用 `usePermission(auth)` 校验权限，无权限项不渲染
- `divider: true` 的项渲染为 `<a-menu-divider>`，不触发 click 事件
- 触发器自动包裹 `<a>` 标签并阻止事件冒泡
- 点击回调中 `key` 为 `String(index)`，`action` 为菜单项配置的 action 值
