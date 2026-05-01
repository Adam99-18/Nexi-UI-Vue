<script lang="ts" setup>
defineProps({
  title: { type: String, default: () => "" },
});
defineEmits(["click"]);
</script>
<template>
  <a class="flex items-center" href="javascript:;" @click="$emit('click')">
    <span class="mr-4px color-[var(--text-color-3)]">{{ title }}</span>
    <img
      src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-right.png"
      style="width: 1.3125rem; height: 1.3125rem"
      alt=""
    />
  </a>
</template>
