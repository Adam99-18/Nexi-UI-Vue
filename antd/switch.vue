<script lang="ts" setup>
const emits = defineEmits(["change", "update:checked"]);
const props = defineProps({
  checked: {
    type: Boolean,
    default: () => false,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
});
const switchStatus = (val: boolean) => {
  if (props.disabled) return;
  emits("update:checked", val);
  emits("change", val);
};
</script>
<template>
  <div class="flex-h">
    <a-switch :disabled="disabled" :checked="props.checked" @change="switchStatus" />
    <a v-if="props.checked" href="javascript:;" class="ml-[4px]" @click="switchStatus(false)">启用</a>
    <span v-else class="ml-[4px]" @click="switchStatus(true)">禁用</span>
  </div>
</template>
