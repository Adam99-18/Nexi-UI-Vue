<script lang="tsx" setup>
  const props = defineProps({
    html: {
      type: String,
      default: () => '',
    },
  });
</script>
<template>
  <div>
    <div v-html="props.html"></div>
  </div>
</template>
