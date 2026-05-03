<script lang="ts" setup>
import { computed, type PropType } from "vue";

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

const selectValue = computed({
  get: () => props.form[props.field],
  set: (val) => { props.form[props.field] = val; },
});

const inputValue = computed({
  get: () => props.form[props.field2],
  set: (val) => { props.form[props.field2] = val; },
});
</script>
<template>
  <div class="flex-h w-100%">
    <a-select
      v-model:value="selectValue"
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
    <a-input
      v-model:value="inputValue"
      allow-clear
      class="search-input"
      :placeholder="props.placeholderInput"
    />
  </div>
</template>
<style lang="scss" scoped>
  .flex-h {
    display: flex;
    width: 100%;
  }
  .form-select {
    width: auto;
    max-width: 40%;
    min-width: 115px;
  }
  .search-input {
    width: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }
  .form-select :deep(.ant-select-selector) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
