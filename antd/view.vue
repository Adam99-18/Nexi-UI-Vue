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
});
</script>
<template>
  <div class="font-size-[var(--font-size)] text-[var(--text-color)] break-all">
    {{ props.text || "" }}
  </div>
</template>
