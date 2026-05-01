<script lang="ts" setup>
import { onBeforeMount, reactive, ref, unref, watch } from "vue";
import { useQueryForm, type QueryForm } from "./runtime";
import { Input, Select, TreeSelect, RadioGroup, Cascader, RangePicker } from "ant-design-vue";
import NexiDropDownSearch from "./drop-down-search.vue";
import NexiDropDown from "./drop-down.vue";
import NexiTimeItem from "./time-item.vue";
import NexiCheckboxFilter from "./checkbox-filter.vue";
import NexiCheckboxFilterSearch from "./checkbox-filter-search.vue";
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
  }>(),
  {
    value: () => ({}),
    columns: () => [],
    customRequestOptions: false,
  },
);

const defaultValue = reactive<any>({});
onBeforeMount(() => {
  Object.assign(defaultValue, props.value);
  console.log(defaultValue);
});

let formState = reactive(props.value);

const componentRef = ref<any>();
const onFinish = (values: any) => {
  emits("search", values);
};
const reset = async () => {
  console.log("reset：重置表单", defaultValue);
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
  console.log("Failed:", errorInfo);
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
  <div class="components-search-form pt-0">
    <a-form
      :model="formState"
      autocomplete="off"
      class="w-100% mt-16px mb-16px p-[16px_16px_0] rounded-[8px] bd-[1px_solid_#f0f0f0]"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <!-- <a-row :gutter="10"> -->

      <div class="flex-wrap">
        <template v-for="column in computedColumns" :key="column.field">
          <!-- <a-col
            v-show="showMoreSearch ? true : index < 6"
            :xs="{ span: 24, offset: 0 }"
            :sm="{ span: 24, offset: 0 }"
            :md="{ span: 12, offset: 0 }"
            :lg="{ span: 12, offset: 0 }"
            :xl="{ span: 6, offset: 0 }"
            :xxl="{ span: column?.colProps?.span || 6, offset: 0 }"
          > -->
          <a-form-item
            :label-align="column?.componentProps?.labelAlign || 'left'"
            :label="column.label"
            :name="column.field"
            :rules="column.rules"
            :colon="false"
            class="mr-8px mb-16px"
            style="border: 1px solid #d9d9d9; border-radius: 2px 0 0 2px"
          >
            <!-- <template #label>
                <span v-if="column.label" style="padding: 0 14px">
                  {{ column.label }}
                </span>
              </template> -->
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
          <!-- </a-col> -->
        </template>

        <!-- :xs="{ span: columns?.length >= 3 ? 24 : 24, offset: 0 }"
          :sm="{ span: columns?.length >= 3 ? 24 : 24, offset: 0 }"
          :md="{ span: columns?.length >= 3 ? 24 : 12, offset: 0 }"
          :lg="{ span: columns?.length >= 3 ? 24 : 12, offset: 0 }"
          :xl="{ span: columns?.length >= 3 ? 24 : 8, offset: 0 }"
          :xxl="{ span: columns?.length >= 6 ? 24 : 12, offset: 0 }" -->
        <!-- :class="{
              'text-right': columns?.length >= 6,
            }" -->
        <!-- <a-col :span="6"> -->
        <a-form-item class="mb-16px">
          <!-- <NexiButton type="primary" icon="search" html-type="submit">
              搜索
            </NexiButton>
            <NexiButton type="default" @click="reset()">重置</NexiButton>
            <NexiButton v-if="columns?.length > 6" type="default" @click="toggleShow()">
              {{ showMoreSearch ? "收起" : "展开" }}
            </NexiButton> -->
          <div class="inline-block">
            <a-flex class="ant-btn-search-box flex-center-center">
              <div class="pl-0 pr-0">
                <a-button class="ant-btn-search" html-type="submit">
                  <img
                    class="w-24px h-24px mr-6px"
                    src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-search.png"
                  />
                  <span class="inline-block">搜索</span>
                </a-button>
              </div>
              <div class="ant-btn-search-line"></div>
              <div class="pl-0 pr-6px">
                <a-button class="ant-btn-search" @click="reset()">
                  <img
                    class="w-24px h-24px mr-3px"
                    src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-reset.png"
                  />
                  <span class="inline-block">重置</span>
                </a-button>
              </div>
              <!-- <template v-if="columns?.length > 6">
                <div class="ant-btn-search-line"></div>
                <div class="pl-0 pr-3px ml-3px" @click="toggleShow()">
                  <a-button class="ant-btn-search min-w-77px">
                    <span class="inline-block">{{
                      showMoreSearch ? "收起" : "展开"
                    }}</span>
                  </a-button>
                </div>
              </template> -->
            </a-flex>
          </div>
        </a-form-item>
        <!-- </a-col> -->
        <!-- </a-row> -->
      </div>
    </a-form>
  </div>
</template>
<style lang="scss" scope>
.components-search-form {
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
