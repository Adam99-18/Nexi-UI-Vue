<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div class="week-schedule">
    <div class="week-calendar">
      <div class="calendar-header">
        <div class="header-left">
          <NexiIcon icon="calendar" :size="20" class="header-icon" />
          <span class="week-day-title">日程安排</span>
          <span class="week-day-span">
            {{ monthText }}月
          </span>
          <span class="week-day-year" @click="togglePicker">
            {{ yearText }}
            <CaretDownOutlined class="caret-icon" />
          </span>
          <div class="picker-box" :style="{ opacity: showPicker ? 1 : 0 }">
            <a-date-picker
              v-model:value="pickerValue"
              :bordered="false"
              value-format="YYYY/M/D"
              @change="changeDate"
            />
          </div>
        </div>
        <div class="header-right">
          <span
            v-show="!isCurrentWeek"
            class="back-today"
            @click="backToday"
          >回到今日</span>
          <a-button type="link" class="edit-btn" @click="handleSchedule">
            <template #icon>
              <NexiIcon icon="edit" :size="14" />
            </template>
            编辑
          </a-button>
        </div>
      </div>
      <div class="calendar-body">
        <a-button type="link" class="nav-button" @click="previousWeek">
          <NexiIcon icon="left" :size="14" />
        </a-button>
        <div class="days-container">
          <div class="day-names">
            <div
              v-for="(name, index) in weekNames"
              :key="index"
              class="day-column day-name"
            >
              {{ name }}
            </div>
          </div>
          <div class="day-dates">
            <div
              v-for="(day, index) in weekDays"
              :key="index"
              class="day-column day-cell"
              @click="selectDate(day.date)"
            >
              <div
                :class="{
                  'date-circle': true,
                  'current-day': isActiveDay(day.date),
                  'today-day': isToday(day.date),
                }"
              >
                {{ day.date.getDate() }}
              </div>
              <div
                :class="{ 'has-note-dot': hasNotes(day.date) }"
                class="note-dot"
              ></div>
            </div>
          </div>
        </div>
        <a-button type="link" class="nav-button" @click="nextWeek">
          <NexiIcon icon="right" :size="14" />
        </a-button>
      </div>
    </div>

    <!-- 日程列表 -->
    <div class="week-schedule-note">
      <div v-if="currentNotes.length === 0" class="empty-notes">
        <NexiNull text="暂无日程安排" />
      </div>
      <div
        v-for="item in currentNotes"
        :key="item.id"
        class="note-item"
        @click="handleDetail(item)"
      >
        <div class="note-time-badge">
          <NexiIcon icon="clock-circle" :size="18" color="#4b67f4" />
          <div class="note-time-text">{{ formatNoteTime(item.startTime) }}</div>
        </div>
        <div class="note-content">
          <div class="note-title">{{ item.title }}</div>
          <NexiIcon icon="right" :size="16" color="#bfbfbf" />
        </div>
      </div>
    </div>

    <!-- 添加日程 -->
    <div class="week-schedule-add" @click="handleSchedule">
      <NexiIcon icon="plus" :size="20" color="#888" class="add-icon" />
      <span class="add-text">自定义添加日程，实现个人日程全安排</span>
    </div>

    <LayoutDrawer
      :show="showScheduleDetail"
      :show-footer="false"
      :width="584"
      @cancel="closeScheduleDetail"
    >
      <ModalScheduleDetail :form="scheduleDetail" />
    </LayoutDrawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { CaretDownOutlined } from "@ant-design/icons-vue";
import { moment } from "./dayjs";
import NexiIcon from "./icon.vue";
import NexiNull from "./null.vue";
import LayoutDrawer from "./layout-drawer.vue";
import ModalScheduleDetail from "./modal-schedule-detail.vue";

const props = withDefaults(
  defineProps<{
    value?: string;
    schedules?: any[];
    showEdit?: boolean;
  }>(),
  {
    value: "",
    schedules: () => [],
    showEdit: true,
  },
);

const emits = defineEmits(["update:value", "changeDate", "loadSchedules"]);

const weekNames = ref(["日", "一", "二", "三", "四", "五", "六"]);

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

const currentDate = ref(props.value || getTodayStr());
const pickerValue = ref(moment());
const showPicker = ref(false);
const showScheduleDetail = ref(false);
const scheduleDetail = ref<any>({});

watch(
  () => props.value,
  (val) => {
    if (val && val !== currentDate.value) {
      currentDate.value = val;
      pickerValue.value = moment(val, "YYYY/M/D");
    }
  },
);

watch(currentDate, (val) => {
  pickerValue.value = moment(val, "YYYY/M/D");
  emits("update:value", val);
  emits("changeDate", val);
});

const monthText = computed(() => {
  const parts = currentDate.value.split("/");
  const m = Number(parts[1]);
  return m > 9 ? parts[1] : "0" + parts[1];
});

const yearText = computed(() => {
  return currentDate.value.split("/")[0];
});

const isCurrentWeek = computed(() => {
  const today = getTodayStr();
  const d1 = new Date(currentDate.value);
  const d2 = new Date(today);
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return diff < 7 * 24 * 60 * 60 * 1000;
});

function togglePicker() {
  showPicker.value = !showPicker.value;
}

function backToday() {
  currentDate.value = getTodayStr();
}

const weekDays = computed(() => {
  const days = [];
  const cd = new Date(currentDate.value);
  const dayOfWeek = cd.getDay();
  const startOfWeek = new Date(cd);
  startOfWeek.setDate(cd.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    days.push({ date });
  }
  return days;
});

watch(
  () => props.schedules,
  () => {
    // schedules provided via prop — no API call needed
  },
  { deep: true },
);

watch(weekDays, () => {
  if (weekDays.value.length) {
    const startDate = moment(weekDays.value[0].date).format("YYYY/MM/DD");
    const endDate = moment(weekDays.value[6].date).format("YYYY/MM/DD");
    emits("loadSchedules", {
      startTime: `${startDate} 00:00:00`,
      endTime: `${endDate} 23:59:59`,
    });
  }
}, { immediate: true });

function changeDate(date: any) {
  if (date) {
    currentDate.value = date;
  }
  showPicker.value = false;
}

function selectDate(date: Date) {
  currentDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function previousWeek() {
  const cd = new Date(currentDate.value);
  cd.setDate(cd.getDate() - 7);
  currentDate.value = `${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`;
}

function nextWeek() {
  const cd = new Date(currentDate.value);
  cd.setDate(cd.getDate() + 7);
  currentDate.value = `${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`;
}

function isActiveDay(date: Date) {
  const today = new Date(currentDate.value);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function hasNotes(date: Date) {
  if (!props.schedules || !props.schedules.length) return false;
  return props.schedules.some(
    (item: any) =>
      moment(item.startTime).format("YYYY/MM/DD") ===
      moment(date).format("YYYY/MM/DD"),
  );
}

function formatNoteTime(startTime: string) {
  return `${moment(startTime).format("MM-DD")} ${moment(startTime).format("HH:mm")}`;
}

const currentNotes = computed(() => {
  if (!props.schedules || !props.schedules.length) return [];
  const arr = props.schedules.filter(
    (item: any) =>
      moment(item.startTime).format("YYYY/MM/DD") ===
      moment(currentDate.value).format("YYYY/MM/DD"),
  );
  return arr.slice(0, 15);
});

function handleSchedule() {
  if (typeof window !== "undefined") {
    window.open("#");
  }
}

function handleDetail(item: any) {
  scheduleDetail.value = item;
  showScheduleDetail.value = true;
}

function closeScheduleDetail() {
  showScheduleDetail.value = false;
}
</script>

<style lang="scss" scoped>
.week-schedule {
  height: 28.13rem;
  display: flex;
  flex-direction: column;
  max-width: 39rem;
}

.week-calendar {
  padding: 0.75rem 0;

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
  }

  .header-left {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    position: relative;
  }

  .header-icon {
    margin-right: 0.5rem;
    color: #4b67f4;
  }

  .week-day-title {
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.375rem;
    color: #262626;
    margin-right: 1.5625rem;
  }

  .week-day-span {
    font-weight: 400;
    font-size: 1rem;
    color: #262626;
  }

  .week-day-year {
    margin-left: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 400;
    font-size: 0.75rem;
    color: var(--text-color-3, #8c8c8c);
    cursor: pointer;
  }

  .caret-icon {
    margin-top: -0.2rem;
    font-size: 0.75rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    padding-right: 1rem;
  }

  .back-today {
    margin-right: 0.5rem;
    cursor: pointer;
    font-weight: 400;
    font-size: 0.88rem;
    color: #4b67f4;
    line-height: 1;
  }

  .edit-btn {
    font-size: 0.875rem;
    color: var(--text-color-3, #8c8c8c);
  }
}

.picker-box {
  position: absolute;
  left: -4.6875rem;
}

.calendar-body {
  display: flex;
  line-height: 2.8125rem;
  align-items: center;
}

.nav-button {
  border: none;
  padding: 0.625rem 0.9375rem;
  font-size: 1rem;
  margin: 0.25rem 0.125rem;
}

.days-container {
  flex: 1;
}

.day-names {
  display: flex;
  width: 100%;
}

.day-dates {
  display: flex;
  width: 100%;
}

.day-column {
  flex: 1;
  text-align: center;
}

.day-name {
  font-weight: bold;
  font-size: 1rem;
}

.day-cell {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.875rem;
  height: 3rem;

  .date-circle {
    height: 1.75rem;
    width: 1.75rem;
    line-height: 1.75rem;
    border-radius: 50%;
    font-size: 1rem;
  }

  .current-day {
    background: rgba(75, 103, 244, 0.3);
  }

  .today-day {
    background: #4b67f4;
    color: #fff;
    font-weight: 600;
  }
}

.note-dot {
  width: 6px;
  height: 6px;
  border-radius: 100%;
  margin-top: 5px;

  &.has-note-dot {
    background: #05cd8a;
  }
}

.week-schedule-note {
  position: relative;
  padding: 0 1rem;
  height: 16.75rem;
  overflow-y: auto;
  overflow-x: hidden;

  .empty-notes {
    margin-top: 1.0625rem;
  }

  .note-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #e5edf5;
    cursor: pointer;
    overflow: hidden;

    .note-time-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.625rem 1rem;
      background: #f3f4ff;
      border-radius: 0.25rem;
      min-width: 4rem;
    }

    .note-time-text {
      color: #4b67f4;
      font-weight: 500;
      font-size: 0.8rem;
      margin-top: 4px;
    }

    .note-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      z-index: 1;
    }

    .note-title {
      font-weight: 500;
      font-size: 1rem;
      color: #262626;
    }
  }
}

.week-schedule-add {
  padding: 0.75rem 0;
  background: rgba(59, 158, 248, 0.15);
  color: #888888;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  .add-icon {
    margin-right: 0.5rem;
  }

  .add-text {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--text-color-3, #8c8c8c);
  }
}
</style>
