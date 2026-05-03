# Tabs 标签页

标签页切换组件，基于 ant-design-vue Tabs，支持 `v-model:value` 双向绑定。

## 何时使用

- 平级内容需要分组切换展示时
- 筛选条件按类别切换时

## 代码演示

### 基础用法

:::demo 通过 `list` 传入标签列表，使用 `v-model:value` 双向绑定。
```vue
<template>
  <NexiTabs
    :list="[
      { label: '全部', value: 'all' },
      { label: '进行中', value: 'active' },
      { label: '已完成', value: 'done' },
    ]"
    value="all"
    @change="(key) => console.log('切换到:', key)"
  />
</template>
```
:::

### 自定义标签

:::demo 通过 `tab` 插槽自定义标签渲染。
```vue
<template>
  <NexiTabs
    :list="[
      { label: '表格视图', value: 'table', icon: 'table' },
      { label: '卡片视图', value: 'card', icon: 'appstore' },
    ]"
    value="table"
  >
    <template #tab="{ label, icon }">
      <NexiIcon :icon="icon" :size="14" />
      <span style="margin-left: 4px">{{ label }}</span>
    </template>
  </NexiTabs>
</template>
```
:::

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前激活 tab 的 value | `string` | `""` | 否 |
| list | tab 列表 | `Array<{label: string, value: any, [key: string]: any}>` | `[]` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 切换 tab | `(key: string)` |
| change | 切换 tab | `(key: string)` |

### Slots

| 插槽名 | 作用域 | 说明 |
|--------|--------|------|
| tab | `item` (list 中当前项) | 自定义 tab 标题内容 |

## 注意事项

- `value` 始终转换为字符串进行比较和回调
- 同时触发 `update:value` 和 `change` 事件，值均转为 `string`
- list 项的 `value` 可以是任意类型，组件内部统一转为字符串作为 key
