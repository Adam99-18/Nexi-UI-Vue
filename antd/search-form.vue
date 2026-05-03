<script lang="ts" setup>
import { onBeforeMount, reactive, ref, unref, watch } from "vue";
import { useQueryForm, type QueryForm } from "./runtime";
import { Input, Select, TreeSelect, RadioGroup, Cascader, RangePicker } from "ant-design-vue";
import NexiDropDownSearch from "./drop-down-search.vue";
import NexiDropDown from "./drop-down.vue";
import NexiTimeItem from "./time-item.vue";
import NexiCheckboxFilter from "./checkbox-filter.vue";
import NexiCheckboxFilterSearch from "./checkbox-filter-search.vue";
import NexiIcon from "./icon.vue";
const Nexi: any = {
  Input,
  Select,
  NexiInput: Input,
  NexiSelect: Select,
  TreeSelect,
  RadioGroup,
  NexiDropDownSearch,
  NexiTimeItem,
  NexiDropDown,
  Cascader,
  RangePicker,
  NexiCheckboxFilter,
  NexiCheckboxFilterSearch,
};
const emits = defineEmits(["update:value", "search", "reset"]);
const props = withDefaults(
  defineProps<{
    value: { [key: string]: any };
    columns: QueryForm[];
    customRequestOptions?: boolean;
    /** Row gutter, per a-row gutter. Default [10, 16] (horizontal 10px, vertical 16px) */
    gutter?: number | [number, number];
    /** Extra CSS class on the form wrapper */
    wrapperClass?: string;
    /** Extra inline style on the form wrapper */
    wrapperStyle?: Record<string, any>;
    /** Search button text */
    searchText?: string;
    /** Reset button text */
    resetText?: string;
  }>(),
  {
    value: () => ({}),
    columns: () => [],
    customRequestOptions: false,
    gutter: () => [10, 16],
    wrapperClass: '',
    wrapperStyle: () => ({}),
    searchText: '搜索',
    resetText: '重置',
  },
);

const defaultValue = reactive<any>({});
onBeforeMount(() => {
  Object.assign(defaultValue, props.value);
});

const formState = reactive({ ...props.value });
watch(
  () => props.value,
  (val: any) => {
    Object.keys(formState).forEach((key) => delete formState[key]);
    Object.assign(formState, val);
  },
  { deep: true },
);

const componentRef = ref<any>();
const onFinish = (values: any) => {
  emits("search", values);
};
const reset = async () => {
  let value;
  for (const key in formState) {
    value = defaultValue[key];
    formState[key] = value;
  }
  await componentRef.value.map((item: any) => {
    item.reset && item.reset();
  });
  emits("reset", formState);
  emits("search", formState);
};
const onFinishFailed = (errorInfo: any) => {
  console.error("Form validation failed:", errorInfo);
};
const changeValue = (value: any, column: QueryForm) => {
  column.componentProps.onChange && column.componentProps.onChange(value, column);
};
const select = (value: any, column: QueryForm) => {
  column.componentProps.onSelect && column.componentProps.onSelect(value, column);
};
// let showMoreSearch = ref(false);
// const toggleShow = () => {
//   showMoreSearch.value = !showMoreSearch.value;
// };

const computedColumns = ref<QueryForm[]>([]);
watch(
  () => props.columns,
  () => {
    computedColumns.value = unref(useQueryForm(props.columns, props.customRequestOptions));
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
<template>
  <div
    class="components-search-form pt-0"
    :class="props.wrapperClass"
    :style="props.wrapperStyle"
  >
    <a-form
      :model="formState"
      autocomplete="off"
      class="w-100% mt-16px mb-16px p-[16px_16px_0] rounded-[8px] bd-[1px_solid_#f0f0f0]"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <a-row :gutter="props.gutter">
        <template v-for="(column, index) in computedColumns" :key="column.field">
          <a-col
            v-show="column.isShow !== false"
            v-bind="{
              xs: column?.colProps?.xs || { span: 24 },
              sm: column?.colProps?.sm || { span: 24 },
              md: column?.colProps?.md || { span: 12 },
              lg: column?.colProps?.lg || { span: 12 },
              xl: column?.colProps?.xl || { span: 8 },
              xxl: column?.colProps?.xxl || { span: column?.colProps?.span || 6 },
            }"
          >
            <a-form-item
              :label-align="column?.componentProps?.labelAlign || 'left'"
              :label="column.label"
              :name="column.field"
              :rules="column.rules"
              :colon="false"
              class="search-form-item mr-0 mb-16px"
            >
              <component
                :is="Nexi[`${column.component}`]"
                ref="componentRef"
                v-model:value="formState[column.field]"
                v-trim
                :placeholder="column?.componentProps?.placeholder"
                :options="column?.componentProps?.options"
                :tree-data="column?.componentProps?.options"
                :field="column.field"
                :field2="column.field2"
                :label-name="column?.componentProps?.labelName"
                :form="formState"
                :is-show="column?.componentProps?.isShow"
                :show-time="column?.componentProps?.showTime"
                :mode="column?.componentProps?.mode"
                :bordered="false"
                :show-search="
                  typeof column.componentProps?.showSearch === 'boolean'
                    ? column.componentProps?.showSearch
                    : column.component === 'NexiSelect'
                      ? true
                      : false
                "
                :filter-option="
                  column.component === 'NexiSelect'
                    ? (input: any, option: any) => {
                        return option.label && typeof option.label === 'string'
                          ? option.label.toLowerCase().includes(input.toLowerCase())
                          : false;
                      }
                    : undefined
                "
                allow-clear
                class="text-left"
                :width="column.width || '200px'"
                :style="{
                  width: column.width || '200px',
                  maxWidth: column.maxWidth || 'auto',
                  minWidth: column.minWidth || 'auto',
                }"
                @select="
                  ['NexiSelect', 'NexiCheckboxFilterSearch', 'NexiCheckboxFilter'].includes(String(column.component))
                    ? select($event, column)
                    : undefined
                "
                @change="changeValue($event, column)"
              />
            </a-form-item>
          </a-col>
        </template>

        <a-col
          v-bind="{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 12 },
            lg: { span: 12 },
            xl: { span: 8 },
            xxl: { span: 6 },
          }"
        >
          <a-form-item class="mb-16px">
            <div class="inline-block">
              <a-flex class="ant-btn-search-box flex-center-center">
                <div class="pl-0 pr-0">
                  <a-button class="ant-btn-search" html-type="submit">
                    <NexiIcon icon="search" :size="16" color="var(--text-color)" class="mr-6px" />
                    <span class="inline-block">{{ props.searchText }}</span>
                  </a-button>
                </div>
                <div class="ant-btn-search-line"></div>
                <div class="pl-0 pr-6px">
                  <a-button class="ant-btn-search" @click="reset()">
                    <NexiIcon icon="refresh" :size="16" color="var(--text-color)" class="mr-3px" />
                    <span class="inline-block">{{ props.resetText }}</span>
                  </a-button>
                </div>
              </a-flex>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<style lang="scss" scoped>
.components-search-form {
  .search-form-item {
    border: 1px solid #d9d9d9;
    border-radius: 2px 0 0 2px;
  }

  .ant-form-item .ant-form-item-label {
    color: var(--text-color);
    border-right: 1px solid #d9d9d9;
    padding: 0 0 0 14px;
  }

  .ant-form-item .ant-form-item-label > label {
    color: var(--text-color);
  }

  .ant-form-item .ant-form-item-label > label::after {
    margin-inline-start: 0;
    margin-inline-end: 14px;
  }

  .ant-btn-search-box {
    // width: 154px;
    border: 1px solid #d9d9d9;

    .ant-btn-search-line {
      height: 32px;
      width: 1px;
      margin-right: 3px;
      margin-left: 5px;
      background: #d9d9d9;
    }

    .ant-btn-search {
      color: var(--text-color);
      padding: 3px 4px;
      border-radius: 0;
      border: none;
    }
  }
}
</style>
