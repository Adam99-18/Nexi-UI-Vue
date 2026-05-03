<script lang="ts" setup>
import { reactive, ref, unref, watch } from "vue";
import { useGlobalStore, type FormParams } from "./runtime";
import {
  Input,
  InputNumber,
  Select,
  TreeSelect,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  InputPassword,
} from "ant-design-vue";
import NexiDropDownSearch from "./drop-down-search.vue";
import NexiTextArea from "./text-area.vue";
import NexiView from "./view.vue";

const Nexi: any = {
  NexiInput: Input,
  NexiTextArea,
  NexiInputNumber: InputNumber,
  NexiSelect: Select,
  NexiTreeSelect: TreeSelect,
  NexiRadioGroup: RadioGroup,
  NexiNexiDropDownSearch: NexiDropDownSearch,
  NexiCheckbox: Checkbox,
  NexiCheckboxGroup: CheckboxGroup,
  NexiDatePicker: DatePicker,
  NexiInputPassword: InputPassword,
  NexiView,
};

/** 定义 props */
const props = withDefaults(
  defineProps<{
    width?: number | string;
    title?: string;
    value?: { [key: string]: any };
    columns?: FormParams[];
    container?: string;
    rules?: { [key: string]: any };
    zIndex?: number;
    // 是否需要背景渐变色
    bg?: boolean;
    cancelText?: string;
  }>(),
  {
    title: "",
    container: "",
    width: 600,
    zIndex: 1000,
    bg: false,
    cancelText: "返回",
    value: () => ({}),
    columns: () => [],
    rules: () => ({}),
  },
);

/** 定义 emits */
const emits = defineEmits(["update:value", "ok", "cancel"]);

/** 表单状态 */
const loading = ref(false);
const visible = ref(false);
const params = ref<{
  [key: string]: any;
}>({});
const formRef = ref<any>();
const formState = reactive<any>({ ...props.value });
const formColumns = reactive<FormParams[]>([...props.columns]);

watch(
  () => props.value,
  (value) => {
    Object.keys(formState).forEach((key) => delete formState[key]);
    Object.assign(formState, value);
  },
  {
    deep: true,
    immediate: true,
  },
);
watch(
  () => props.columns,
  (val) => {
    formColumns.length = 0;
    formColumns.push(...val);
  },
  {
    immediate: true,
  },
);

/** 监听退出登录，关闭全局Modal */
watch(
  () => useGlobalStore().toggleGlobalModal,
  () => {
    if (useGlobalStore().toggleGlobalModal) {
      reset();
      close();
    }
  },
);

/** 打开弹窗 */
const open = (p: any) => {
  params.value = p;
  visible.value = true;
};
/** 关闭弹窗 */
const close = () => {
  if (!visible.value) return;

  reset();
  visible.value = false;
  loading.value = false;
};
/** 重置表单 */
const reset = () => {
  formRef?.value?.resetFields();
};
/** 修改表单值 */
const changeValue = (value: any, column: FormParams) => {
  column.componentProps.onChange &&
    column.componentProps.onChange(value, column);
};
/** 提交表单 */
const handleOk = async () => {
  const res = await formRef.value.validate();
  emits("ok", {
    ...params.value,
    ...props.value,
    ...res,
  });
};
/** 点击取消 */
const handleCancel = () => {
  close();
  emits("cancel");
};
/** 设置加载中状态 */
const setLoading = (status: boolean) => {
  loading.value = status;
};

/** 校验表单某项 */
const validateFields = (record?: any) => {
  formRef?.value?.validateFields(record);
};

const getContainer = () => {
  if (typeof window !== "undefined") {
    return document.querySelector(props.container || ".layout-wrap") || document.body;
  }
  return document.body;
};

/** 暴露出去的接口 */
defineExpose({
  reset,
  value: formState,
  open,
  close,
  setLoading,
  validateFields,
});
</script>
<template>
  <a-modal
    v-model:open="visible"
    :title="props.title || undefined"
    :after-close="reset"
    :width="props.width"
    :z-index="props.zIndex"
    :get-container="getContainer"
    destroy-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div v-if="props.bg" class="ant-modal-custom-bg"></div>
    <template #title>
      <div class="ant-modal-title">
        <slot name="title" />
      </div>
    </template>
    <div style="min-height: 30px; margin-top: 20px">
      <slot name="extra" />

      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        autocomplete="off"
        class="w-100%"
      >
        <a-row :gutter="24" class="text-left w-100%">
          <template v-for="column in formColumns" :key="column.field">
            <a-col
              v-if="!column.useSlot && !column.useLabelSlot"
              :span="column.colProps?.span || 24"
            >
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
                  :min="column.componentProps.min"
                  :max="column.componentProps.max"
                  :maxlength="column.componentProps.maxLength"
                  :field="column.field"
                  :field2="column.field2"
                  :form="formState"
                  :formatter="column.componentProps.formatter"
                  :precision="column.componentProps.precision"
                  :auto-size="column.componentProps.autoSize"
                  :show-count="column.componentProps.showCount"
                  :rows="column.componentProps.rows"
                  show-search
                  allow-clear
                  class="text-left w-100%"
                  @change="changeValue($event, column)"
                />
              </a-form-item>
            </a-col>
            <!-- 使用插槽制作自定义表单栏目 -->
            <a-col
              v-if="column.useSlot || column.useLabelSlot"
              :span="column.colProps?.span || 24"
            >
              <a-form-item
                :label-align="column.componentProps?.labelAlign || 'right'"
                :label="column.useLabelSlot ? null : column.label"
                :name="column.field"
                :rules="column.rules"
                class="w-100%"
                :label-col="{ span: column.colProps?.labelSpan || 5 }"
                :wrapper-col="{ span: column.colProps?.wrapperSpan || 24 }"
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
                  :min="column.componentProps.min"
                  :max="column.componentProps.max"
                  :maxlength="column.componentProps.maxLength"
                  :field="column.field"
                  :field2="column.field2"
                  :form="formState"
                  :formatter="column.componentProps.formatter"
                  :precision="column.componentProps.precision"
                  :auto-size="column.componentProps.autoSize"
                  :show-count="column.componentProps.showCount"
                  :rows="column.componentProps.rows"
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
    </div>

    <template #footer>
      <a-button key="back" @click="handleCancel">{{ cancelText }}</a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="loading"
        @click="handleOk"
      >
        确定
      </a-button>
    </template>
  </a-modal>
</template>
<style lang="scss" scoped>
// 重置标题样式
.ant-modal-title {
  :deep(*) {
    font-weight: bold;
  }
}
</style>
