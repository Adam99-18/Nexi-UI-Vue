<script lang="ts" setup>
const props = defineProps({
  value: {
    type: [String, Number],
    default: () => '',
  },
  placeholder: {
    type: String,
    default: () => '',
  },
  maxLength: {
    type: Number,
    default: () => -1,
  },
});

const emits = defineEmits(['update:value']);
const valuePro = computed(() => props.value);
const change = (e: any) => {
  emits('update:value', e.target.value);
};
</script>
<template>
  <a-input
    v-model:value="valuePro"
    :placeholder="props.placeholder"
    :maxlength="props.maxLength"
    allow-clear
    show-count
    @change="change"
  ></a-input>
</template>
