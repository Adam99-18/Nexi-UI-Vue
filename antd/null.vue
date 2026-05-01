<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: () => '暂无信息',
  },
  image: {
    type: String,
    default: () =>
      'https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/layout/bg-empty.png',
  },
  height: {
    type: String,
    default: () => '8.125rem',
  },
  mt: {
    type: Boolean,
    default: () => true,
  },
});
</script>
<template>
  <a-empty
    class="components-null"
    :class="{
      'mt-0': !props.mt,
    }"
    :image="false"
    :image-style="{ height: 0, margin: 0 }"
  >
    <template #description>
      <img
        v-if="props.image"
        :src="props.image"
        :style="{
          width: 'auto',
          height: props.height,
          marginTop: props.mt ? '3.0625rem' : '0',
        }"
        alt=""
      />
      <div class="font-size-[.875rem] mt-[1.25rem] text-[var(--text-color-6)]">
        {{ props.text }}
      </div>
      <slot></slot>
    </template>
  </a-empty>
</template>
<style lang="scss" scoped>
.components-null {
  .mt-0 {
    margin-top: 0 !important;
  }
}
</style>
