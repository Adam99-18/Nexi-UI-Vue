<script lang="ts" setup>
/**
 * 自定义加载组件
 */
const props = withDefaults(
  defineProps<{
    width?: string;
    text?: string;
    fontSize?: string;
    fontColor?: string;
    loading?: boolean;
  }>(),
  {
    text: '加载中',
    fontSize: '14px',
    fontColor: 'var(--theme-default-color)',
    width: '24px',
    loading: false,
  },
);

const indicator = h('img', {
  src: 'https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/loading.gif',
  style: {
    width: props.width,
    height: props.width,
  },
  spin: props.loading,
});
</script>
<template>
  <div>
    <div class="flex-h">
      <a-spin :indicator="indicator"></a-spin>
      <div
        v-if="props.text"
        :style="{
          color: props.fontColor,
          fontSize: props.fontSize,
        }"
      >
        {{ props.text || '' }}
      </div>
    </div>
  </div>
</template>
