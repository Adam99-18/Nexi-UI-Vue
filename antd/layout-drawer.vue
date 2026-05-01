<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  show: { type: Boolean, default: () => false },
  showFooter: { type: Boolean, default: () => true },
  width: { type: [String, Number], default: () => 584 },
});

const emits = defineEmits(["cancel"]);

const visible = ref(false);

const close = () => {
  emits("cancel");
};
</script>
<template>
  <a-drawer
    :open="show"
    :width="width"
    :footer="showFooter ? undefined : null"
    @close="close"
  >
    <slot />
  </a-drawer>
</template>
