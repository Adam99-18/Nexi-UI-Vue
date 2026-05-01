<script lang="ts" setup>
defineProps({
  content: { type: String, default: () => "" },
  heightValue: { type: String, default: () => "" },
  className: { type: String, default: () => "" },
});
</script>
<template>
  <span v-if="heightValue && content" :class="className">
    <template v-for="(part, i) in content.split(new RegExp(`(${heightValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))" :key="i">
      <span v-if="part.toLowerCase() === heightValue.toLowerCase()" style="color: #4b67f4">{{ part }}</span>
      <template v-else>{{ part }}</template>
    </template>
  </span>
  <span v-else :class="className">{{ content }}</span>
</template>
