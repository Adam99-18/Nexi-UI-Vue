<script lang="ts" setup>
const emits = defineEmits(["change"]);
const props = defineProps({
  /**
   * 是否选中
   */
  checked: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
});
// 切换开关状态
const switchStatus = () => {
  emits("change", !props.checked);
};
</script>
<template>
  <div class="flex-h" @click="switchStatus">
    <a-switch :disabled="disabled" :checked="props.checked"></a-switch>
    <a v-if="props.checked" href="javascript:;" class="ml-[4px]">启用</a>
    <span v-else class="ml-[4px]">禁用</span>
  </div>
</template>
