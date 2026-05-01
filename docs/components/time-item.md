# TimeItem 时间选择器

带快捷选项的时间范围选择器，支持"今天""昨天""最近7天""最近30天"快速切换。

## 何时使用

- 列表页的日期范围筛选
- 数据统计的日期区间选择

## 代码演示

### 基础用法

:::demo 绑定表单字段，底部显示快捷选项。
```vue
<template>
  <div>
    <NexiTimeItem placeholder="请选择日期范围" />
  </div>
</template>
```
:::

### 完整示例

使用 ref 调用时间快捷操作：

```vue
<template>
  <div>
    <NexiTimeItem
      ref="timeRef"
      placeholder="选择时间范围"
      @update:value="(val) => console.log('时间戳:', val)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NexiTimeItem } from 'nexi-ui'

const timeRef = ref()

// 快捷选择"最近7天"
// timeRef.value.handleItem('week')
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| field | 绑定字段名（支持函数动态返回字段名） | `string \| Function` | - | 是 |
| form | 表单数据对象 | `object` | `{}` | 是 |
| showTime | 是否显示时间选择 | `boolean` | `true` | 否 |
| placeholder | 占位文本 | `string` | `请选择` | 否 |
| isShow | 是否显示组件 | `boolean` | `true` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值变化 | `(timestamps: [number, number] \| null)` |

### Methods

| 方法名 | 说明 |
|--------|------|
| reset | 重置时间选择 |
| handleItem | 快速选择时间段 `(key: 'today'\|'yesterday'\|'week'\|'month')` |

## 注意事项

- `update:value` 返回 Unix 时间戳数组（秒级）
- 快捷选项为单选模式，再次点击同一选项可取消选择
- 使用 `moment` 进行日期计算（开始/结束时间对齐到天边界）
