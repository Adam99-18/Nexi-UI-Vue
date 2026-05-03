# LayoutDrawer 抽屉

基于 ant-design-vue Drawer 封装的侧边抽屉组件，通过 slot 插入自定义内容。

## 何时使用

- 需要从屏幕边缘滑出面板展示内容时
- 表单详情、筛选面板等需要侧边展示的场景

## 代码演示

### 基础用法

:::demo 通过 `show` 控制显隐，内容通过默认 slot 传入。
```vue
<template>
  <div>
    <NexiButton type="primary" @click="drawerShow = !drawerShow">Toggle Drawer</NexiButton>
    <NexiLayoutDrawer :show="drawerShow" :width="400" @cancel="drawerShow = false">
      <div style="padding: 20px">
        <h3>Drawer Content</h3>
        <p>This is the drawer body content passed via slot.</p>
      </div>
    </NexiLayoutDrawer>
    <p>Drawer: {{ drawerShow ? 'Open' : 'Closed' }}</p>
  </div>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| show | 是否显示抽屉 | `boolean` | `false` | 否 |
| width | 抽屉宽度 | `string \| number` | `584` | 否 |
| showFooter | 是否显示底部 | `boolean` | `true` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| cancel | 点击关闭按钮 | — |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 抽屉主体内容 |

## 注意事项

- 组件内部使用 `<a-drawer>` 实现，`open` 绑定到 `show` prop
- `showFooter` 为 `false` 时传入 `null` 隐藏底部
- V1.1 新增组件，需配合 layout 系统使用
