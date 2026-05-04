# Table 表格

增强型数据表格，支持拖拽排序、列显隐控制、自定义分页器、自定义滚动条，基于 ant-design-vue Table。

## 何时使用

- 需要展示结构化数据列表时
- 需要对列进行排序、显隐控制时
- 需要拖拽排序行数据时
- 需要自定义分页样式和交互时

## 代码演示

### 基础用法

:::demo 最简单的表格，传入 `columns` 和 `dataSource` 即可。
```vue
<template>
  <NexiTable
    :columns="[
      { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
      { title: '负责人', dataIndex: 'owner', key: 'owner', width: 120 },
      { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
    ]"
    :data-source="[
      { id: 1, name: '项目 Alpha', owner: '张三', status: '进行中' },
      { id: 2, name: '项目 Beta', owner: '李四', status: '已完成' },
    ]"
    :pagination="{ current: 1, pageSize: 10, total: 2 }"
  />
</template>
```
:::

### 完整示例

含分页、自定义操作列、插槽：

```vue
<template>
  <NexiTable
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
      <NexiButton type="primary" size="small">新增</NexiButton>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <NexiAction
          :actions="[
            { key: 'edit', label: '编辑', onClick: () => editRecord(record) },
            { key: 'delete', label: '删除', popConfirm: { title: '确认删除？' } },
          ]"
          :column-params="record"
        />
      </template>
    </template>
  </NexiTable>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const loading = ref(false)
const tableData = ref([
  { id: 1, name: '项 A', status: '启用' },
  { id: 2, name: '项 B', status: '禁用' },
])

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: '名称', dataIndex: 'name', key: 'name', width: 150 },
  { title: '状态', dataIndex: 'status', key: 'status', width: 100 },
  { title: '操作', key: 'action', width: 150, fixed: 'right' },
]

const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 2,
  pageSizeOptions: ['10', '20', '50'],
  onChange: (page: number, size: number) => {
    pagination.current = page
    pagination.pageSize = size
    // 重新请求数据
  },
})
</script>
```
:::

### 拖拽排序

设置 `draggable` 或在列配置中指定 `rowDrag: true` 启用行拖拽。

```vue
<template>
  <NexiTable
    :draggable="true"
    :columns="columns"
    :data-source="data"
    @change:sort="(sortedData) => console.log('排序后:', sortedData)"
  />
</template>
```

### 行选择（全选/当前页全选）

```vue
<template>
  <NexiTable
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    :row-selection="{
      type: 'checkbox',
      checkAll: false,
      checkCurrentPage: false,
      selectedRowKeys: [],
    }"
    @change:check-all="({ rowKey }) => console.log('全选:', rowKey)"
    @change:check-current-page="({ rowKey }) => console.log('当前页全选:', rowKey)"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tableId | 表格唯一 ID | `number \| string` | `Date.now()` | 否 |
| columns | 列配置 | `TableColumn[]` | `[]` | 是 |
| dataSource | 数据源 | `any[]` | `[]` | 是 |
| rowKey | 行 key 字段名 | `string` | `id` | 否 |
| size | 表格尺寸 | `small \| middle \| large` | `small` | 否 |
| bordered | 是否显示边框 | `boolean` | `false` | 否 |
| loading | 加载状态 | `boolean` | `false` | 否 |
| tableLayout | 表格布局模式 | `string` | `fixed` | 否 |
| draggable | 是否可拖拽排序行 | `boolean` | `false` | 否 |
| pagination | 分页配置（含 onChange 回调） | `PaginationConfig` | — | 否 |
| showHeader | 是否显示表头 | `boolean` | `true` | 否 |
| sticky | 是否固定表头 | `boolean` | `true` | 否 |
| showToolBars | 是否显示工具栏区域 | `boolean` | `true` | 否 |
| useDefaultToolbar | 是否使用默认工具栏（密度+列显隐） | `boolean` | `false` | 否 |
| scrollX | 水平滚动宽度 | `number` | `800` | 否 |
| scrollY | 垂直滚动高度 | `string \| number` | — | 否 |
| showEmpty | 是否显示自定义空状态 | `boolean` | `false` | 否 |
| expandRowByClick | 点击行展开 | `boolean` | `false` | 否 |
| expandedRowKeys | 展开的行 keys | `string[]` | `[]` | 否 |
| rowSelection | 行选择配置 | `TableRowSelection` | — | 否 |
| customRow | 自定义行属性函数 | `Function` | — | 否 |

### PaginationConfig 扩展

除了 ant-design-vue Pagination 的标准属性，额外支持：

| 属性 | 说明 | 类型 |
|------|------|------|
| onChange | 分页变化回调 | `(current, pageSize, filters, sorter) => void` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| expandedRowsChange | 展开行变化 | `(expandedRows: any)` |
| change:sort | 拖拽排序完成 | `(sortedData: any[])` |
| change:check-all | 全选变化 | `{ rowKey: string }` |
| change:check-current-page | 当前页全选变化 | `{ rowKey: string }` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| action | 工具栏左侧操作区域 |
| toolbars | 工具栏右侧区域 |
| bodyCell | 自定义单元格渲染 `{ column, record, index, text }` |
| empty | 自定义空状态 |
| headerCell | 自定义表头渲染 |
| expandedRowRender | 展开行内容 |
| 任意列 dataIndex | 通过动态插槽渲染指定列 |

## 注意事项

- 使用自定义分页器（非 ant-design-vue 默认分页），支持页码跳转和每页条数切换
- 拖拽排序依赖 `sortablejs`，需在列配置中 `rowDrag: true` 或设置 `draggable`
- 列显隐控制通过 `useDefaultToolbar` 启用，支持拖拽排序列顺序
- 自定义水平滚动条 `NexiTableScrollBar`（上下各一个）同步滚动
- 有数据时才显示分页器（`dataSource.length > 0`）
- 响应式列过滤：`newColumns.filter(item => item.checked)`
- `pagination.onChange` 签名：`(current, pageSize, filters, sorter) => void`
- 表头固定使用 `sticky` 属性，通过 `ant-table-sticky-holder` 实现
