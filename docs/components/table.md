# Table 表格

增强型数据表格，支持拖拽排序、列显隐控制、自定义分页器、自定义滚动条。

## 何时使用

- 需要展示结构化数据列表时
- 需要对列进行排序、显隐控制时
- 需要自定义分页样式和交互时
- 需要拖拽排序行数据时

## 代码演示

### 基础用法

:::demo 最简单的表格，传入 `columns` 和 `dataSource` 即可。
```vue
<template>
  <AntdTable
    :columns="[
      { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
      { title: '负责人', dataIndex: 'owner', key: 'owner', width: 120 },
      { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
      { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
    ]"
    :dataSource="[
      { id: 1, name: '项目 Alpha', owner: '张三', status: '进行中', createdAt: '2025-01-15' },
      { id: 2, name: '项目 Beta', owner: '李四', status: '已完成', createdAt: '2025-02-20' },
      { id: 3, name: '项目 Gamma', owner: '王五', status: '计划中', createdAt: '2025-03-10' },
    ]"
    :pagination="{ current: 1, pageSize: 10, total: 3 }"
  />
</template>
```
:::

### 带边框和加载

:::demo 设置 `bordered` 显示边框，`loading` 显示加载状态。
```vue
<template>
  <AntdTable
    :bordered="true"
    :columns="[
      { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
      { title: '任务', dataIndex: 'task', key: 'task', width: 200 },
      { title: '进度', dataIndex: 'progress', key: 'progress', width: 120 },
    ]"
    :dataSource="[
      { id: 1, task: '需求评审', progress: '80%' },
      { id: 2, task: 'UI 设计', progress: '100%' },
      { id: 3, task: '接口开发', progress: '45%' },
    ]"
    :pagination="{ current: 1, pageSize: 10, total: 3 }"
  />
</template>
```
:::

### 不同尺寸

:::demo 通过 `size` 属性控制表格密度，支持 `small`、`middle`、`large`。
```vue
<template>
  <div>
    <AntdTable
      size="small"
      :columns="[
        { title: '名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'desc', key: 'desc' },
      ]"
      :dataSource="[
        { id: 1, name: 'Small 模式', desc: '紧凑型表格' },
      ]"
      :showHeader="true"
    />
  </div>
</template>
```
:::

## 完整示例

含分页、排序、自定义操作列的完整表格：

```vue
<template>
  <AntdTable
    ref="tableRef"
    :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    :loading="loading"
    :bordered="true"
    :scroll-x="1200"
    size="small"
  >
    <template #action>
      <AntdButton type="primary" size="small">新增</AntdButton>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <AntdAction
          :actions="[
            { key: 'edit', label: '编辑' },
            { key: 'delete', label: '删除', confirm: { title: '确认删除？' } },
          ]"
        />
      </template>
    </template>
  </AntdTable>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import AntdTable from '@/components/antd/table.vue'
import AntdButton from '@/components/antd/button.vue'
import AntdAction from '@/components/antd/action.vue'

const loading = ref(false)
const tableData = ref([
  { id: 1, name: '项 A', status: '启用', date: '2025-01-01' },
  { id: 2, name: '项 B', status: '禁用', date: '2025-02-01' },
])

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '日期', dataIndex: 'date', key: 'date', width: 150 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
]

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 2,
  onChange: (page: number, size: number) => {
    pagination.current = page
    pagination.pageSize = size
    // 重新请求数据
  },
})
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tableId | 表格唯一 ID | `number \| string` | 时间戳 | 否 |
| columns | 列配置 | `TableColumn[]` | `[]` | 是 |
| dataSource | 数据源 | `any[]` | `[]` | 是 |
| rowKey | 行 key 字段名 | `string` | `id` | 否 |
| size | 表格尺寸 | `small \| middle \| large` | `small` | 否 |
| bordered | 是否显示边框 | `boolean` | `false` | 否 |
| loading | 加载状态 | `boolean` | `false` | 否 |
| tableLayout | 表格布局模式 | `string` | `fixed` | 否 |
| draggable | 是否可拖拽排序 | `boolean` | `false` | 否 |
| pagination | 分页配置 | `PaginationConfig` | - | 否 |
| showHeader | 是否显示表头 | `boolean` | `true` | 否 |
| sticky | 是否固定表头 | `boolean` | `true` | 否 |
| showToolBars | 是否显示工具栏区域 | `boolean` | `true` | 否 |
| useDefaultToolbar | 是否使用默认工具栏 | `boolean` | `false` | 否 |
| scrollX | X 轴滚动宽度 | `number` | `800` | 否 |
| scrollY | Y 轴滚动高度 | `string \| number` | - | 否 |
| showEmpty | 是否显示自定义空状态 | `boolean` | `false` | 否 |
| expandRowByClick | 点击行展开 | `boolean` | `false` | 否 |
| expandedRowKeys | 展开的行 keys | `string[]` | `[]` | 否 |
| rowSelection | 行选择配置 | `TableRowSelection` | - | 否 |
| customRow | 自定义行属性 | `Function` | - | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| expandedRowsChange | 展开行变化 | `(expandedRows: any)` |
| change:sort | 拖拽排序变化 | `(sortedData: any[])` |
| change:check-all | 全选变化 | `{ rowKey: string }` |
| change:check-current-page | 当前页选择变化 | `{ rowKey: string }` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| action | 操作栏左侧区域 |
| toolbars | 工具栏右侧区域 |
| bodyCell | 自定义单元格渲染 |
| empty | 自定义空状态 |
| headerCell | 自定义表头渲染 |
| expandedRowRender | 展开行内容 |

## 注意事项

- 默认使用自定义分页器（非 ant-design-vue 内置分页），UI 更简洁
- 拖拽排序需要设置 `draggable="true"` 或在列配置中指定 `rowDrag: true`
- 自定义水平滚动条组件 `AntdTableScrollBar` 自动适配
- 列显隐控制通过工具栏中的 popover 实现，支持拖拽排序列顺序
- `pagination.onChange` 签名：`(current, pageSize, filters, sorter) => void`
