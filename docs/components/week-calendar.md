# WeekCalendar 周日历

自定义周日历组件，支持日程查看和添加。

## 何时使用

- 需要按周查看排期/日程的场景
- 需要快速切换日期并查看对应日程列表

## 代码演示

### 基础用法

```vue
<template>
  <div>
    <NexiWeekCalendar @changeDate="handleDateChange" />
  </div>
</template>

<script lang="ts" setup>
import NexiWeekCalendar from '@/components/antd/week-calendar.vue'

const handleDateChange = (date: string) => {
  console.log('当前查看日期:', date) // 格式: YYYY/M/D
}
</script>
```

## API

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| changeDate | 日期切换 | `(date: string)` — 格式 `YYYY/M/D` |

## 注意事项

- 内部通过 `~/api` 调用 `Api.Portal.getScheduleList` 获取日程数据
- 使用 `moment`（从 `@/utils/dayjs` 导出）处理日期计算
- 有日期的格子显示绿色圆点指示器
- 包含"回到今日"快捷按钮
