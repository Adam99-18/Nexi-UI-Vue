<script lang="ts" setup>
import { reactive, ref, watch, type Ref } from "vue";
import { useQueryForm, useTool, type QueryForm } from "./runtime";
import {
  Input,
  Select,
  TreeSelect,
  RadioGroup,
  // Textarea,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  DatePicker,
} from "ant-design-vue";
import NexiDropDownSearch from "./drop-down-search.vue";
import NexiTextArea from "./text-area.vue";
import NexiView from "./view.vue";
import { cloneDeep } from "lodash-es";

const { resetObj } = useTool();
const Nexi: any = {
  NexiInput: Input,
  // NexiTextArea: Textarea,
  NexiTextArea,
  NexiInputNumber: InputNumber,
  NexiSelect: Select,
  NexiTreeSelect: TreeSelect,
  NexiRadioGroup: RadioGroup,
  NexiNexiDropDownSearch: NexiDropDownSearch,
  NexiCheckbox: Checkbox,
  NexiCheckboxGroup: CheckboxGroup,
  NexiDatePicker: DatePicker,
  NexiView,
};
const emits = defineEmits(["update:value", "search"]);
const props = withDefaults(
  defineProps<{
    value?: { [key: string]: any };
    columns: QueryForm[];
  }>(),
  {
    value: () => ({}),
    columns: () => [],
  },
);

// TODO: wuxiaolin 修复form表单的value值校验失败问题
let formState = reactive(props.value);
// let formState = ref<any>(props.value);
watch(
  () => props.value,
  (val: any) => {
    // formState.value = val;
    formState = val;
  },
);

const onFinish = (values: any) => {
  console.log("Success:", values);
  emits("search", values);
};
const reset = () => {
  console.log("reset：重置表单");

  // emits('reset', values)
  // formState.value = resetObj(cloneDeep(props.value));
  formState = resetObj(cloneDeep(props.value));
};
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const changeValue = (value: any, column: QueryForm) => {
  column.componentProps.onChange && column.componentProps.onChange(value, column);
};

const formRef = ref();
// 表单验证
const validate = () => {
  return new Promise((resolve) => {
    formRef.value.validate().then((res: any) => {
      resolve(res);
    });
  });
};
// 验证字段
const validateField = (fields: string[]) => {
  return new Promise((resolve) => {
    formRef.value.validateFields(fields).then((res: any) => {
      resolve(res);
    });
  });
};
const validateFields = (fields: string[]) => {
  return new Promise((resolve) => {
    formRef.value.validateFields(fields).then((res: any) => {
      resolve(res);
    });
  });
};
// 清除校验
const clearValidate = () => {
  console.log("clearValidate：清除校验");

  return new Promise(async (resolve) => {
    const res = await formRef.value.resetFields();
    resolve(res);
  });
};
const columns: Ref<QueryForm[]> = useQueryForm(props.columns);

defineExpose({
  reset,
  validate,
  validateField,
  validateFields,
  clearValidate,
  value: formState,
});
</script>
<template>
  <a-form ref="formRef" :model="formState" autocomplete="off" class="w-100%" @finish="onFinish" @finish-failed="onFinishFailed">
    <a-row :gutter="24" class="text-left w-100%">
      <template v-for="column in columns" :key="column.field">
        <a-col v-if="!column.useSlot && !column.useLabelSlot" :span="column.colProps?.span || 24">
          <a-form-item
            :label-align="column.componentProps?.labelAlign || 'right'"
            :label="column.label"
            :name="column.field"
            :rules="column.rules"
            :label-col="{ span: column.colProps?.labelSpan || 5 }"
            :wrapper-col="{ span: column.colProps?.wrapperSpan || 24 }"
            class="w-100% mb-0"
            :style="{
              marginBottom: column.componentProps?.marginBottom || '24px',
            }"
          >
            <component
              :is="Nexi[`${column.component}`]"
              v-model:value="formState[column.field]"
              v-trim
              :placeholder="column.componentProps.placeholder"
              :options="column.componentProps.options"
              :tree-data="column.componentProps.options"
              :field="column.field"
              :field2="column.field2"
              :form="formState"
              :show-count="column.componentProps.showCount"
              :maxlength="column.componentProps.maxLength"
              :min="column.componentProps.min"
              :max="column.componentProps.max"
              :precision="column.componentProps.precision"
              :rows="column.componentProps.rows"
              show-search
              allow-clear
              class="text-left w-100%"
              @change="changeValue($event, column)"
            />
          </a-form-item>
        </a-col>
        <a-col v-if="column.useSlot || column.useLabelSlot" :span="column.colProps?.span || 24">
          <a-form-item
            :label-align="column.componentProps?.labelAlign || 'right'"
            :label="column.useLabelSlot ? null : column.label"
            :name="column.field"
            :rules="column.rules"
            :label-col="{ span: column.colProps?.labelSpan || 5 }"
            :wrapper-col="{ span: column.colProps?.wrapperSpan || 24 }"
            class="w-100%"
          >
            <template #label>
              <slot :name="'label-' + column.field" />
            </template>
            <slot v-if="column.useSlot" :name="column.field" />
            <component
              :is="Nexi[`${column.component}`]"
              v-else
              v-model:value="formState[column.field]"
              v-trim
              :placeholder="column.componentProps.placeholder"
              :options="column.componentProps.options"
              :tree-data="column.componentProps.options"
              :field="column.field"
              :field2="column.field2"
              :form="formState"
              :show-count="column.componentProps.showCount"
              :maxlength="column.componentProps.maxLength"
              :rows="column.componentProps.rows"
              :disabled="column.componentProps.disabled"
              show-search
              allow-clear
              class="text-left w-100%"
              @change="changeValue($event, column)"
            />
          </a-form-item>
        </a-col>
      </template>
    </a-row>
  </a-form>
</template>
