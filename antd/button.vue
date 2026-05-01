<script lang="tsx" setup>
import { computed, type PropType } from "vue";
import { usePermission } from "./runtime";
import NexiIcon from "./icon.vue";
import type { ButtonType } from "ant-design-vue/es/button";

// const emits = defineEmits(["click"]);
const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: () => "primary",
  },
  size: {
    type: String as PropType<"small" | "middle" | "large">,
    default: () => "middle",
  },
  icon: {
    type: String,
    default: () => "",
  },
  iconColor: {
    type: String,
    default: () => "",
  },
  permission: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  ghost: {
    type: Boolean,
    default: () => false,
  },
});

/** 判断是否有权限 */
const isPermission = computed(() => {
  const { permission } = props;
  if (!permission || !permission.length) return true;
  return usePermission(permission);
});

// const emitsClick = () => {
//   emits("click");
// };
//  @click="emitsClick"
</script>
<template>
  <a-button
    v-if="isPermission"
    :type="props.type"
    :size="size"
    :ghost="props.ghost"
  >
    <template #icon>
      <NexiIcon :icon="props.icon" :color="props.iconColor" />
    </template>
    <slot />
  </a-button>
</template>
<style lang="scss" scoped>
.ant-btn {
  &[data-type="green"] {
    color: #f6ffed;
    background-color: #389e0c;

    &:hover {
      background-color: #58ad33;
    }
  }
  // &[data-type="green"] {
  //   color: #389e0c;
  //   background-color: #f6ffed;

  //   &:hover {
  //     background-color: #f5f8f1;
  //   }
  // }
}
</style>
