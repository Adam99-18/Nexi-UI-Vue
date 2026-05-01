<script lang="ts" setup>
defineProps({
  context: { type: String, default: () => "" },
  customTitle: { type: Boolean, default: () => false },
  tooltipStyle: { type: Object, default: () => ({}) },
  showValueStyle: { type: Object, default: () => ({}) },
});
</script>
<template>
  <a-tooltip :overlay-style="tooltipStyle">
    <template #title>
      <slot v-if="customTitle" name="customTitle" />
      <span v-else>{{ context }}</span>
    </template>
    <div
      :style="{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', ...showValueStyle }"
    >
      <slot />
      <template v-if="!$slots.default">{{ context }}</template>
    </div>
  </a-tooltip>
</template>
