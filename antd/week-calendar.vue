<!-- eslint-disable vue/html-indent -->
<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div class="week-schedule">
    <!-- 自定义周历表 -->
    <div class="week-calendar">
      <div class="flex items-center white-space-nowrap justify-between">
        <div class="flex items-center ml-1rem">
          <img
            class="w-[1.25rem] h-[1.25rem] mr-0.5rem"
            src="/static/middleground/images/portal/weekday/week-day.png"
            mode="scaleToFill"
          />
          <span class="week-day-title">日程安排</span>
          <span class="week-day-span">
            {{
              Number(currentDate.split("/")[1]) > 9
                ? currentDate.split("/")[1]
                : "0" + currentDate.split("/")[1]
            }}月
          </span>
          <span class="week-day-span1 w-2rem mb0.3rem">
            {{ currentDate.split("/")[0] }}
            <CaretDownOutlined class="mt--0.2rem" />
          </span>
          <div class="picker-box" style="opacity: 0">
            <a-date-picker
              v-model:value="value"
              :bordered="false"
              value-format="YYYY/M/D"
              @change="changeDate"
            />
          </div>
        </div>
        <div class="pr-1rem flex items-center">
          <span
            v-show="
              currentDate !=
              `${new Date().getFullYear()}/${
                new Date().getMonth() + 1
              }/${new Date().getDate()}`
            "
            class="the-day line-height-1"
            @click="backToday()"
            >回到今日</span
          >
          <!-- <a class="m-l-auto flex items-center">
            <span class="mr-4px color-var(--text-color-3)">编辑</span>
            <img
              src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-right.png"
              style="width: 1.3125rem; height: 1.3125rem"
              alt=""
            />
          </a> -->
          <CustomExtra title="编辑" @click="handleSchedule" />
        </div>
      </div>
      <div class="calendar-body">
        <a-button type="link" class="nav-button" @click="previousWeek">
          <img
            class="w0.94rem h0.88rem"
            src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/portal/icon-calendar-arrow-left.png"
            alt=""
          />
        </a-button>
        <div class="flex-1">
          <div class="flex w-100%">
            <div
              v-for="(item, index) in weeeks"
              :key="index"
              class="day-column font-size-1rem"
            >
              {{ item }}
            </div>
          </div>
          <div class="flex w-100%">
            <div
              v-for="(day, index) in weekDays"
              :key="index"
              class="day-column"
            >
              <div class="day-date" @click="currentDate = toDay(day.date)">
                <div
                  :class="{
                    'current-day': isActiveday(day.date),
                    'today-day': isToday(day.date),
                  }"
                  class="font-size-1rem"
                >
                  {{ day.date.getDate() }}
                </div>
                <div
                  :style="{ opacity: isHasNote(day.date).length ? 1 : 0 }"
                  class="w-6px h-6px border-rd-100% bg-#05CD8A m-t-5px"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <a-button type="link" class="nav-button" @click="nextWeek">
          <img
            class="w0.94rem h0.88rem"
            src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/portal/icon-calendar-arrow-right.png"
            alt=""
          />
        </a-button>
      </div>
    </div>
    <!-- 待办事项 -->
    <div class="week-schedule-note">
      <div v-if="isHasNote(currentDate).length === 0">
        <AntdNull
          text="暂无日程安排"
          :mt="false"
          style="margin-top: 1.0625rem"
        />
      </div>
      <div
        v-for="item in computedDataForNum(currentDate)"
        :key="item.id"
        class="note-item cursor-pointer"
        @click="handleDetail(item)"
      >
        <img
          class="note-item-iamge"
          src="/static/middleground/images/portal/weekday/week-rigth.png"
          alt=""
        />
        <div
          class="flex flex-col items-center p-t-0.625rem p-b-0.625rem p-l-1rem p-r-1rem bg-#f3f4ff border-rd-0.25rem"
        >
          <img
            class="w1.5rem h1.5rem"
            src="/static/middleground/images/portal/weekday/week-time.png"
            alt=""
          />
          <div class="note-date color-#4b67f4">
            {{ formatNoteTime(item.startTime) }}
          </div>
        </div>
        <div class="flex-1 note-center">
          <div class="note-date color-#262626">
            {{ item.title }}
          </div>

          <div class="w2.0625rem h2.0625rem">
            <img
              class="w100% h100%"
              src="/static/middleground/images/portal/weekday/week-topath.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 自定义添加日程 -->
    <div class="week-schedule-add" @click="handleSchedule">
      <div
        style="
          position: absolute;
          bottom: 2.1875rem;
          width: 1.3125rem;
          height: 1.3125rem;
        "
      >
        <img
          class="w100% h100%"
          src="/static/middleground/images/portal/weekday/week-more.png"
          alt=""
        />
      </div>
      <img
        class="w1.25rem h1.25rem m-r-0.5rem"
        src="/static/middleground/images/portal/weekday/week-add.png"
        alt=""
      />
      <div class="week-schedule-title">自定义添加日程，实现个人日程全安排</div>
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
import { moment } from "@/utils/dayjs";
import Api from "~/api";
const weeeks = ref(["日", "一", "二", "三", "四", "五", "六"]);
const currentDate = ref(
  `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`,
);
const value = ref(moment()); // 缓存表单值

// 选中日期当天的待办事项
const notes = ref<any>([]);

const showScheduleDetail = ref(false);
const scheduleDetail = ref<any>({});

const emits = defineEmits(["changeDate"]);

watch(
  () => currentDate.value,
  () => {
    value.value = moment(currentDate.value, "YYYY/M/D");
    emits("changeDate", currentDate.value);
  },
  { immediate: true, deep: true },
);
// 回到今日
const backToday = () => {
  currentDate.value = `${new Date().getFullYear()}/${
    new Date().getMonth() + 1
  }/${new Date().getDate()}`;
};

// 周历格数据
const weekDays = computed(() => {
  const days = [];
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(
    new Date(currentDate.value).getDate() -
      new Date(currentDate.value).getDay(),
  );

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    days.push({
      date: date,
    });
  }
  return days;
});

watchEffect(() => {
  const startDate = moment(weekDays.value[0].date).format("YYYY/MM/DD");
  const endDate = moment(weekDays.value[6].date).format("YYYY/MM/DD");
  getSchedules(`${startDate} 00:00:00`, `${endDate} 23:59:59`);
});

const changeDate = (date: any) => {
  currentDate.value = date ? date : currentDate.value;
};

// const formattedDateRange = computed(() => {
//   const startDate = weekDays.value[0].date;
//   console.log('startDate', startDate);
//   // const endDate = weekDays.value[6].date
//   return `${formatDate(startDate)}`;
// });

// function formatDate(date: number | Date | undefined) {
//   console.log(date);
//   return `${new Date(date as Date).getFullYear()}-${new Date(date as Date).getMonth() + 1}-${new Date(date as Date).getDate()}`;
// }

function previousWeek() {
  const date = new Date(
    new Date(currentDate.value).setDate(
      new Date(currentDate.value).getDate() - 7,
    ),
  );
  // 后期是否需要判断自动选中当周存在事项的日期
  currentDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function nextWeek() {
  const date = new Date(
    new Date(currentDate.value).setDate(
      new Date(currentDate.value).getDate() + 7,
    ),
  );
  currentDate.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

function isActiveday(date: {
  getDate: () => number;
  getMonth: () => number;
  getFullYear: () => number;
}) {
  const today = new Date(currentDate.value);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isToday(date: {
  getDate: () => number;
  getMonth: () => number;
  getFullYear: () => number;
}) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function toDay(date: any) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// 获取本周日程列表

async function getSchedules(startTime: string, endTime: string) {
  if (!useCustomCookie().getToken()) return;
  const res = await Api.Portal.getScheduleList({
    body: {
      startTime: new Date(startTime).getTime(),
      endTime: new Date(endTime).getTime(),
    },
  });
  if (res.code === 200) {
    notes.value = res.data;
  }
}

// 判断当天是否有事项
function isHasNote(date: any) {
  const arr = notes.value.filter(
    (item: { startTime: string }) =>
      moment(item.startTime).format("YYYY/MM/DD") ===
      moment(date).format("YYYY/MM/DD"),
  );
  // console.log('arr', arr.length, moment(date).format('YYYY-MM-DD'));
  return arr;
}

function formatNoteTime(startTime: string) {
  return `${moment(startTime).format("MM-DD")} ${moment(startTime).format("HH:mm")}`;
}

// 跳转到日程管理页面
const handleSchedule = () => {
  if (import.meta.client) {
    const res = useRouter().resolve({
      name: "PortalScheduleIndex",
    });
    window.open(res.href);
  }
};

// 弹出日程详情
const handleDetail = (item: any) => {
  scheduleDetail.value = item;
  showScheduleDetail.value = true;
};
const closeScheduleDetail = () => {
  showScheduleDetail.value = false;
};

// 最多展示15条数据
const computedDataForNum = (currentDate: any) => {
  const arr = isHasNote(currentDate);
  return arr.slice(0, 15);
};
</script>

<style lang="scss" scoped>
.week-schedule {
  // width: 100%;
  // height: 100%;
  // width: 39rem;
  height: 28.13rem;
  display: flex;
  flex-direction: column;
}
.week-calendar {
  padding: 0.75rem 0;
  // font-family: Arial, sans-serif;
  // margin: 0 auto;
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
  .week-day-span1 {
    margin-left: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 400;
    font-size: 0.75rem;
    color: var(--text-color-3);
  }
}
.picker-box {
  position: relative;
  left: -4.6875rem;
}
.the-day {
  margin-right: 0.5rem;
  cursor: pointer;
  font-weight: 400;
  font-size: 0.88rem;
  color: #4b67f4;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.nav-button {
  border: none;
  padding: 0.625rem 0.9375rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 0.25rem 0.125rem;
}

.calendar-body {
  display: flex;
  // min-width: 432px;
  line-height: 2.8125rem;
  align-items: center;
}

.day-column {
  flex: 1;
  text-align: center;
}

.day-name {
  font-weight: bold;
  margin-bottom: 0.3125rem;
}

.day-date {
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.875rem;
  cursor: pointer;
  div {
    &:first-child {
      height: 1.75rem;
      width: 1.75rem;
      line-height: 1.75rem;
      border-radius: 50%;
    }
  }
}
.current-day {
  background: rgba(75, 103, 244, 0.3);
}

.today-day {
  background: #4b67f4;
  color: #fff;
  font-weight: 600;
}

.week-schedule-note {
  position: relative;
  padding: 0 1rem;
  height: 16.75rem;
  overflow-y: scroll;
  overflow-x: hidden;
  .note-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    border-radius: 0.25rem 0.25rem 0.25rem 0.25rem;
    border: 1px solid #e5edf5;
    .note-item-iamge {
      position: absolute;
      right: -0.0625rem;
      top: -0.0625rem;
    }
    .note-date {
      font-weight: 500;
      font-size: 1rem;
    }
    .note-center {
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
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
  .week-schedule-title {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--text-color-3);
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
