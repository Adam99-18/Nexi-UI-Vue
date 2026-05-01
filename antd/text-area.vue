<script lang="ts" setup>
const props = defineProps({
  field: { type: String, default: () => "" },
  field2: { type: String, default: () => "" },
  onChange: { type: Function, default: () => {} },
  form: { type: Object, default: () => {} },
  placeholder: { type: String, default: () => "" },
  min: { type: Number, default: () => 0 },
  max: { type: Number, default: () => 0 },
  maxlength: { type: Number, default: () => 0 },
  rows: { type: Number, default: () => 3 },
  autoSize: { type: Boolean, default: () => false },
  allowClear: { type: Boolean, default: () => true },
  showCount: { type: Boolean, default: () => false },
  maxHeight: { type: String, default: () => "auto" },
});
const changeValue = (value: any) => {
  props.onChange(value);
};
</script>
<template>
  <div class="component-textarea border-1px border-solid border-[var(--border-color)] rounded-4px">
    <a-textarea
      v-model:value="form[field]"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :maxlength="maxlength"
      :auto-size="autoSize"
      :rows="rows"
      :allow-clear="allowClear"
      class="text-left w-100% border-none"
      :class="{
        'pr-26px': allowClear,
        'resize-none shadow-none! min-h-92px pb-0': showCount,
        'overflow-y-auto resize-none scrollbar-thin': maxHeight !== 'auto',
      }"
      :style="{
        maxHeight: maxHeight,
      }"
      @change="changeValue($event)"
    />
    <a-flex v-if="showCount" justify="end" class="pr-16px pb-8px">
      <div class="text-[var(--text-color-6)]">{{ form[field]?.length || "0" }}/{{ maxlength }}</div>
    </a-flex>
  </div>
</template>
<style lang="scss" scope>
.component-textarea {
  .resize-none {
    resize: none;
    textarea {
      resize: none;
    }
  }

  .scrollbar-thin {
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b2bef7;
      border-radius: 467px;
    }
    textarea {
      height: inherit;
    }
  }
}
</style>
