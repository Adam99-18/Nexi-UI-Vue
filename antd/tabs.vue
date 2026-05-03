<script lang="tsx" setup>
import { computed, type PropType } from "vue";
const props = defineProps({
  /* 当前激活的 tab，字符串 */
  value: {
    type: String as PropType<string>,
    default: () => "",
  },
  /* tabs内容，数组 */
  list: {
    type: Array as PropType<{ label: string; value: any; [key: string]: any }[]>,
    default: () => [],
  },
});
const emits = defineEmits(["update:value", "change"]);
const changeTab = (key: number | string) => {
  emits("update:value", key + "");
  emits("change", key + "");
};
const currentKey = computed({
  get: () => props.value,
  set: (val) => {
    emits("update:value", val + "");
    emits("change", val + "");
  },
});
</script>
<template>
  <a-tabs :active-key="currentKey" class="components-antd-tabs" @change="changeTab">
    <a-tab-pane v-for="item in props.list" :key="item.value + ''">
      <template #tab>
        <slot v-if="$slots.tab" name="tab" v-bind="item" />
        <span v-else>{{ item.label }}</span>
      </template>
    </a-tab-pane>
  </a-tabs>
</template>
<style lang="scss" scoped>
.components-antd-tabs {
  background-color: #fff;

  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
}
</style>
