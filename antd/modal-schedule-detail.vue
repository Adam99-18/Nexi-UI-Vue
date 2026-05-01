<script lang="ts" setup>
defineProps({
  form: { type: Object, default: () => ({}) },
});
</script>
<template>
  <div class="p-16px">
    <div class="font-size-16px font-bold mb-16px">{{ form.title || '日程详情' }}</div>
    <div class="font-size-14px color-[var(--text-color-6)]">{{ form.description || '暂无详情' }}</div>
  </div>
</template>
