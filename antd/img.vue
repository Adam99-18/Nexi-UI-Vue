<script lang="ts" setup>
  const props = defineProps({
    src: {
      type: String,
      // icon-setting
      default: () => '',
    },
    size: {
      type: [String, Number],
      default: () => 24,
    },
  });
</script>
<template>
  <img
    :src="props.src"
    :style="{
      display: 'inline-block',
      verticalAlign: 'middle',
      width: props.size + 'px',
      height: props.size + 'px',
    }"
  />
</template>
