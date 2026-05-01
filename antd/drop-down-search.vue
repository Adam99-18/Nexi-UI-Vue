<script lang="tsx" setup>
import type { PropType } from "vue";
  const props = defineProps({
    placeholder: {
      type: String as PropType<string>,
      default: '请选择',
    },
    placeholderInput: {
      type: String as PropType<string>,
      default: '请输入关键字搜索',
    },
    options: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    field2: {
      type: String,
      required: true,
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  });
</script>
<template>
  <div class="flex-h w-100%">
    <a-select
      v-model:value="form[field]"
      :placeholder="props.placeholder"
      class="form-select w-auto max-w-40% min-w-115px"
    >
      <a-select-option
        v-for="(option, index) in props.options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </a-select-option>
    </a-select>
    <a-form-item class="w-100% mb-0">
      <a-input
        v-model:value="form[field2]"
        allow-clear
        style="
          width: 100%;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: 0;
        "
        :placeholder="props.placeholderInput"
      />
    </a-form-item>
  </div>
</template>
<style lang="scss" scoped>
  .ant-form-item-control-input {
    .form-select {
      :deep(.ant-select-selector) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
</style>
