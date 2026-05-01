<script lang="ts" setup>
/**
 * @description: 自定义icon组件
 * https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4458987
 */
import { createFromIconfontCN } from '@ant-design/icons-vue';

const props = defineProps({
  icon: {
    type: String,
    default: () => '',
  },
  color: {
    type: String,
    default: () => '',
  },
  size: {
    type: [String, Number],
    default: () => 18,
  },
  scriptUrl: {
    type: String,
    default: () => '',
  },
});

const IconFont = createFromIconfontCN({
  scriptUrl: props.scriptUrl || '',
});
</script>
<template>
  <icon-font
    :type="props.icon"
    :style="{
      fontSize: props.size + 'px',
      color: props.color || '',
    }"
  />
  <!-- <span
    class="iconfont"
    :style="{
      fontSize: props.size + 'px',
      color: props.color || '',
    }"
    :class="props.icon"
  ></span> -->
</template>
<style>
/* @import 'https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/font/iconfont.css'; */
</style>
