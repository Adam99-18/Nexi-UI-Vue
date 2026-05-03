<script lang="ts" setup>
/**
 * 查看详情value值，用在modal弹出框、详情页字段值展示
 */
const props = defineProps({
  /**
   * 需要展示的文本
   */
  text: {
    type: [String, Number],
    default: () => "",
  },
  /**
   * 是否显示内容，用于条件渲染
   */
  isShow: {
    type: Boolean,
    default: () => true,
  },
});
</script>
<template>
  <div v-if="props.isShow" class="font-size-[var(--font-size)] text-[var(--text-color)] break-all">
    <slot>{{ props.text || "" }}</slot>
  </div>
</template>
