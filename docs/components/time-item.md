# TimeItem 时间选择器

带快捷选项的时间范围选择器，支持"今天""昨天""最近7天""最近30天"快速切换，基于 ant-design-vue RangePicker。

## 何时使用

- 列表页的日期范围筛选
- 数据统计的日期区间选择

## 代码演示

### 基础用法

:::demo 通过 `field` 和 `form` 绑定数据，内置快捷按钮。
```vue
<template>
  <NexiTimeItem
    :form="searchForm"
    field="dateRange"
    placeholder="请选择日期范围"
    @update:value="(ts) => console.log('时间戳:', ts)"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const searchForm = reactive({ dateRange: undefined })
</script>
```
:::

### 隐藏日期选择器

:::demo `isShow` 为 false 时仅显示快捷按钮，隐藏 RangePicker。
```vue
<template>
  <NexiTimeItem
    :form="searchForm"
    field="dateRange"
    :is-show="false"
  />
</template>
```
:::

### 通过 ref 调用快捷操作

```vue
<template>
  <div>
    <NexiButton @click="timeRef.handleItem(3)">最近7天</NexiButton>
    <NexiButton @click="timeRef.handleItem(4)">最近30天</NexiButton>
    <NexiButton @click="timeRef.reset()">重置</NexiButton>

    <NexiTimeItem
      ref="timeRef"
      :form="searchForm"
      field="dateRange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
const timeRef = ref()
const searchForm = reactive({ dateRange: undefined })
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| field | 绑定字段名（支持 Function 动态返回） | `string \| Function` | — | 是 |
| form | 表单数据对象 | `object` | `{}` | 否 |
| showTime | 是否显示时分秒选择 | `boolean` | `true` | 否 |
| placeholder | 占位文本 | `string` | `请选择` | 否 |
| isShow | 是否显示日期选择器部分 | `boolean` | `true` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `([startTimestamp, endTimestamp] \| null)` |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| reset | 重置时间选择 | — |
| handleItem | 快捷选择时间段 | `(key: 1\|2\|3\|4)` 对应 今天\|昨天\|最近7天\|最近30天 |

## 注意事项

- `update:value` 返回 Unix 时间戳数组（秒级，通过 `moment().format("x")` 生成）
- 快捷选项为单选模式，再次点击同一选项可取消（reset）
- 使用 `moment` 进行日期计算，开始时间对齐到 `startOf("day")`，结束时间对齐到 `endOf("day")`
- `field` 为 Function 类型时执行后返回字段名数组；为字符串时从 `form[field]` 读取
- V1.1 修复：空值保护（null/非数组/长度不足时安全处理），移除 `<a-form-item>` 包裹避免日历弹出问题
