# WeekCalendar 周日历

自定义周日历组件，支持按周查看日期、日程列表展示和详情查看，支持 `v-model:value` 双向绑定日期。

## 何时使用

- 需要按周查看排期/日程的场景
- 需要快速切换日期并查看对应日程列表

## 代码演示

### 基础用法

:::demo 传入 `schedules` 日程数据，使用 `v-model:value` 绑定当前日期。
```vue
<template>
  <NexiWeekCalendar
    v-model:value="currentDate"
    :schedules="scheduleList"
    :show-edit="true"
    @change-date="(date) => console.log('日期切换:', date)"
    @load-schedules="(range) => console.log('加载范围:', range)"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NexiWeekCalendar } from 'nexi-ui'

const currentDate = ref('2025/1/15')
const scheduleList = ref([
  { id: 1, title: '周会', startTime: '2025/01/15 09:00:00' },
  { id: 2, title: '代码评审', startTime: '2025/01/15 14:00:00' },
  { id: 3, title: '项目同步', startTime: '2025/01/16 10:00:00' },
])
</script>
```
:::

### 无编辑按钮

```vue
<template>
  <NexiWeekCalendar
    v-model:value="date"
    :schedules="schedules"
    :show-edit="false"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前选中日期 | `string` | `""` | 否 |
| schedules | 日程列表 | `Array<{id, title, startTime, ...}>` | `[]` | 否 |
| showEdit | 是否显示编辑按钮 | `boolean` | `true` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 日期变化 | `(date: string)` — 格式 `YYYY/M/D` |
| changeDate | 日期变化（同 update:value） | `(date: string)` |
| loadSchedules | 周范围变化时触发（用于按需加载日程） | `({ startTime: string, endTime: string })` |

## 注意事项

- 日期格式统一为 `YYYY/M/D`（如 `2025/1/15`）
- 日程列表根据当前选中日期过滤（匹配 `YYYY/MM/DD`），最多显示 15 条
- 有日程的日期格子显示绿色圆点指示器
- 包含"回到今日"快捷按钮和左右周切换按钮
- 点击日期格子切换选中日期，点击日程项通过 `LayoutDrawer` 查看详情
- 周范围变化时自动触发 `loadSchedules` 事件，传递周的起止日期
- "编辑"按钮和"自定义添加日程"行目前跳转到 `#`
- 使用 `moment` 进行日期计算（从 `dayjs` 模块重新导出）
