<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
// import { throttle } from "lodash-es";
const emits = defineEmits(["scroll", "scroll-end"]);
const props = defineProps({
  id: {
    type: String,
    default: () => "1",
  },
  left: {
    type: Number,
    default: () => 0,
  },
});

const currentLeft = ref(0);
const isDragging = ref(false);
const startX = ref(0);
const startLeft = ref(0);

// 父容器宽度（table-scroll-bar）
const containerWidth = ref(314);
// bar宽度
const barWidth = ref(95);

// watch(
//   () => props.left,
//   (val: number) => {
//     if (currentLeft.value === val) return;
//     currentLeft.value = val;
//   },
// );
const updateLeft = (val: number) => {
  currentLeft.value = val;
};
// 计算可拖动的最大左边界
const maxLeft = () => containerWidth.value - barWidth.value;

// 拖拽开始事件
const handleDragStart = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  startLeft.value = currentLeft.value;
};

const emitScroll = () => {
  emits("scroll", {
    left: currentLeft.value,
    id: props.id,
  });
};
// 拖动事件
const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value) return;

  const dx = e.clientX - startX.value;
  // 计算新位置，确保不会超出边界
  const newLeft = Math.max(0, Math.min(startLeft.value + dx, maxLeft()));
  currentLeft.value = newLeft;
  emitScroll();
};

// 拖拽结束事件
const handleDragEnd = () => {
  isDragging.value = false;
  emits("scroll-end");
};

// 点击事件
const handleClick = (e: MouseEvent) => {
  const container = e.currentTarget as HTMLElement;
  const rect = container.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  // 确保不会超出边界
  const newLeft = Math.max(0, Math.min(clickX - barWidth.value / 2, maxLeft()));

  currentLeft.value = newLeft;
  emitScroll();
};

onMounted(() => {
  if (typeof window !== "undefined") {
    // 添加全局事件监听器
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
    // throttle(() => emitScroll, 300);
  }
});

// 组件卸载时移除事件监听器
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleDragEnd);
  }
});

defineExpose({
  updateLeft,
});
</script>

<template>
  <div class="components-ant-table-scroll-bar flex-h">
    <img
      class="icon-arrow ml-8px"
      src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-table-scroll-bar-left.png"
      alt=""
    />
    <div class="flex-1 flex-center-center">
      <div class="table-scroll-bar" @click="handleClick">
        <div
          class="bar"
          :style="{
            left: `${currentLeft}px`,
          }"
          @mousedown="handleDragStart"
        ></div>
      </div>
    </div>
    <img
      class="icon-arrow mr-8px"
      src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-table-scroll-bar-right.png"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.components-ant-table-scroll-bar {
  width: 360px;
  height: 16px;
  border-radius: 204px;
  background-color: #edeff3;
  margin: auto;
  overflow: hidden; // 添加溢出隐藏，防止点击事件穿透

  .icon-arrow {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .table-scroll-bar {
    position: relative;
    width: 314px;
    height: 16px;

    .bar {
      position: absolute;
      left: 0px; // 默认位置
      top: 4px;
      bottom: 0;
      width: 95px;
      height: 8px;
      background-color: #d8d8d8;
      border-radius: 467px;
      // 动画
      cursor: pointer;
    }
  }
}
</style>
