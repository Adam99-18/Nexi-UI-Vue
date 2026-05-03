<script lang="ts" setup>
import { ref, watch, type PropType } from "vue";
import NexiIcon from "./icon.vue";
import TextHightlight from "./text-highlight.vue";
import { debounce } from "lodash-es";

const emits = defineEmits(["select", "change", "add", "refresh", "input", "remove"]);

const props = defineProps({
  editStatus: {
    type: Boolean,
    default: false,
  },
  container: {
    type: String,
    default: () => "",
  },
  /**
   * 组件宽度
   */
  width: {
    type: String,
    default: () => "388px",
  },
  /**
   * 组件高度
   */
  height: {
    type: String,
    default: () => "317px",
  },
  /**
   * 输入框样式，默认无边框
   */
  inputStyles: {
    type: Object as PropType<any>,
    default: () => ({
      width: "100%",
      border: "none",
      outline: "none",
    }),
  },
  /**
   * 输入框提示文字
   */
  placeholder: {
    type: String as PropType<string>,
    default: "请选择知识库",
  },
  /**
   * 弹出框里搜索框提示文字
   */
  placeholderInput: {
    type: String as PropType<string>,
    default: "搜索知识库名称",
  },
  /**
   * 选项列表，父组件传进来，必须有value和label属性
   */
  options: {
    type: Array as PropType<Array<any>>,
    default: () => [
      // {
      //   value: "1",
      //   label: "此为知识库名称",
      // },
      // {
      //   value: "start",
      //   label: "2232",
      // },
      // {
      //   value: "5",
      //   label: "end",
      // },
    ],
  },
  /**
   * 已选中的选项，父组件传进来，必须有value属性
   */
  ids: {
    type: Array as PropType<Array<any>>,
    default: () => [
      // {
      //   value: "1",
      // },
      // {
      //   value: "start",
      // },
    ],
  },
  items: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  /**
   * 是否是owner
   */
  isOwner: {
    type: Boolean,
    default: false,
  },
});

// const show = ref(false);
const searchValue = ref("");
const ajaxLoading = ref(false);
const currentIds = ref<Array<string | number>>([]);
const results = ref<any[]>([]);
const filteredItems = ref<any[]>([]);

// watch(
//   () => props.ids,
//   (val) => {
//     console.log(202, "--------------------->", val);
//     currentIds.value = val?.map((it: any) => String(it.value)) || [];
//   },
//   {
//     immediate: true,
//     deep: true,
//   },
// );

// 同时监听options和items的变化
// () => props.options,
// options,
watch(
  [() => props.items],
  ([items]) => {
    // !options ||
    if (!items) {
      filteredItems.value = [...(items || [])];
      return;
    }
    const optionsIds = items.map((option) => String(option.id || option.value));
    // 过滤当前选中的数组，只保留ID存在于原数组中的项
    filteredItems.value = items.filter((item) => {
      const itemId = String(item.id || item.value);
      return optionsIds.includes(itemId);
    });
    // 根据过滤后的数组生成结果
    results.value =
      filteredItems.value?.map((it: any) => {
        return {
          ...it,
          value: it.value || it.id,
          label: it.label || it.name,
        };
      }) || [];
    // 更新当前选中的ID列表
    currentIds.value = results.value?.map((it: any) => it.value) || [];
  },
  {
    immediate: true,
    deep: true,
  },
);

// const toggleShow = (type?: number) => {
//   console.log(116, type);

//   show.value = !!type;
// };

/**
 * 判断是否选中
 */
const computedCheck = (item: any) => {
  return currentIds.value?.some((it: string | number) => String(it) === String(item.value));
};

/**
 * 点击选择新增item
 */
const handleSelect = (item: any) => {
  // console.log('选择的项', item);
  // 判断是否已经有
  const flag = currentIds.value?.some((it: string | number) => String(it) === String(item.value));
  if (!flag) {
    currentIds.value.push(item.value);

    results.value.push(item);
    emits("select", currentIds.value);
    return;
  }
  currentIds.value?.splice(currentIds.value.indexOf(item.value), 1);
  results.value = results.value.filter((it: any) => String(it.value) !== String(item.value));
  emits("select", currentIds.value);
};

/**
 * 移除 emit change 事件到父组件
 */
// const changeSelect = (value: any) => {
//   console.log(203, "--------------------->", value);
//   // 处理label-in-value格式的返回值
//   const newValues = value.map((item: any) =>
//     typeof item === "object" ? item.value : item,
//   );
//   const newIds = currentIds.value.filter((it: string | number) => {
//     return newValues.includes(String(it));
//   });
//   currentIds.value = newIds;
//   console.log(228, currentIds.value);

//   emits("remove", currentIds.value);
// };

const handleClose = (value: any) => {
  currentIds.value = currentIds.value.filter((it: string | number) => String(it) !== String(value));
  results.value = results.value.filter((it: any) => String(it.value) !== String(value));
  emits("remove", currentIds.value);
};
/**
 * emit add 事件到父组件
 */
const add = () => {
  emits("add");
};
/**
 * 刷新 emit refresh 事件到父组件
 */
const refresh = () => {
  emits("refresh");
};

/**
 * 导出组装ids数组数据结构方法
 */
const setData = (ids: Array<string | number>) => {
  return ids?.map((it: string | number) => {
    return {
      value: String(it),
    };
  });
};

const getPopupContainer: any = () => {
  if (!props.isOwner) return;
  if (typeof window !== "undefined") {
    return document.querySelector(props.container) || document.body;
  }
};

// const onSearch = () => {
//   console.log('onSearch', searchValue.value);
// };

// const onChange = () => {
//   emits('change', searchValue.value);
// };

// const onInput = (e: any) => {
//   debounce(function () {
//     console.log('onInput', e.target.value);
//     // emits('change', e.target.value);
//   }, 500)();
// };
const onInput = debounce(function () {
  emits("input", searchValue.value);
}, 500);

// // 新增处理labelInValue格式转换
// const labelInValueOptions = computed(() => {
//   return currentIds.value.map((value) => {
//     const item = props.options.find(
//       (opt) => String(opt.value) === String(value),
//     );
//     return {
//       value: String(value),
//       label: item ? item.label : value,
//     };
//   });
// });

const openStatus = ref(false);
const openChange = (status: boolean) => {
  if (!props.isOwner) return;
  openStatus.value = status;
};

defineExpose({
  setData,
});
</script>
<template>
  <div>
    <a-tooltip
      :get-popup-container="getPopupContainer"
      auto-adjust-overflow
      arrow-point-at-center
      trigger="click"
      overlay-class-name="components-antd-drop-down-filter-box"
      :disabled="!isOwner"
      @open-change="openChange"
    >
      <template #title>
        <div
          class="components-antd-drop-down-filter"
          :style="{
            width: props.width,
            height: props.height,
          }"
        >
          <div class="search-box-wrap">
            <div class="search-box flex-h">
              <img
                class="w-16px h-16px mr-4px"
                src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/components/icon-search.png"
                alt=""
              />
              <!-- @search="onSearch" -->
              <a-input
                v-model:value.trim="searchValue"
                :placeholder="props.placeholderInput"
                allow-clear
                :bordered="false"
                class="components-search-input"
                :disabled="!editStatus"
                @input="onInput"
              />
            </div>
          </div>

          <div class="search-list-wrap" style="height: calc(100% - 64px)">
            <a-spin :spinning="ajaxLoading" :disabled="!editStatus">
              <div v-for="(item, index) in props.options" :key="index" class="search-list flex-h" @click="handleSelect(item)">
                <!-- {{ item.label || "" }} -->
                <div class="search-list-title text-overflow flex-1">
                  <TextHightlight class-name="text-overflow" :content="item.label" :height-value="searchValue" />
                </div>
                <div class="w-24px h-24px">
                  <img
                    v-show="computedCheck(item)"
                    class="w-24px h-24px"
                    src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/ai/indicators/icon-check-active.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="min-h-10px"></div>
            </a-spin>
          </div>

          <div class="components-antd-drop-down-bottom flex-h">
            <div class="btn-box flex-h" @click="add()">
              <img
                class="w-24px h-24px mr-4px"
                src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/ai/indicators/icon-add-active.png"
                alt=""
              />
              <div class="text-[var(--theme-default-color)] font-size-16px">新建知识库</div>
            </div>
            <div class="btn-box flex-h ml-8px" @click="refresh()">
              <img
                class="w-24px h-24px mr-4px"
                src="https://bsy-sdl-web-1308012692.cos.ap-guangzhou.myqcloud.com/middleground/images/ai/indicators/icon-sync-active.png"
                alt=""
              />
              <div class="text-[var(--theme-default-color)] font-size-16px">刷新</div>
            </div>
          </div>
        </div>
      </template>

      <!-- <a-select
      :value="labelInValueOptions"
      :options="props.options"
      :label-in-value="true"
      mode="multiple"
      :open="false"
      :placeholder="props.placeholder"
      :style="props.inputStyles"
      option-label-prop="label"
      :disabled="!editStatus"
      @change="changeSelect"
      @focus="toggleShow(1)"
    >
      <template #option="{ label }">
        <div>{{ label }}</div>
      </template>
      <template #tagRender="{ label, closable, onClose }">
        <a-tag
          :closable="closable"
          class="whitespace-normal mr-3px"
          @close="onClose"
        >
          {{ label }}
        </a-tag>
      </template>
    </a-select> -->
      <div
        :class="{
          'cursor-pointer': isOwner,
          'cursor-not-allowed': !isOwner,
          'opacity-80': !isOwner,
        }"
      >
        <div
          v-if="!results.length || !isOwner"
          class="font-size-14px bd-[1px_solid_var(--border-color)] p-[4px_10px] rounded-6px text-[var(--text-color-9)]"
          :style="{
            'background-color': isOwner ? '#fff' : 'rgba(38, 38, 38, 0.04)',
          }"
        >
          {{ props.placeholder }}
        </div>
        <div v-else class="font-size-14px bd-[1px_solid_var(--border-color)] p-[4px_10px] bg-#fff rounded-6px text-[var(--text-color-9)]">
          <a-tag v-for="(item, index) in results" :key="index" :closable="false" class="whitespace-normal">
            <span>
              {{ item.label }}
            </span>
            <span class="p-[3px_3px_3px_5px]" @click.stop="handleClose(item.value)">
              <NexiIcon icon="close" class="w14px h14px p-[3px_3px_3px_3px] bg-#9999 rounded-full" :size="9" />
            </span>
          </a-tag>
        </div>
      </div>
    </a-tooltip>

    <!-- TODO: wuxiaolin 展示tooltip，添加遮罩层禁止滚动 -->
    <div v-if="openStatus" class="fixed left-0 right-0 top-0 bottom-0 z-1 w-100% h-100% bg-[rgba(0,0,0,0)]"></div>
  </div>
</template>
<style lang="scss" scoped>
$bg: #fff;

.components-antd-drop-down-filter-box {
  &.ant-tooltip {
    min-height: 400px;
    max-width: 100%;
    .ant-tooltip-arrow {
      display: none;
    }
    .ant-tooltip-arrow:before {
      background: $bg;
    }
    .ant-tooltip-inner {
      // right: -203px;
      // top: 44px;
      // position: absolute;
      border-radius: 8px;
      box-shadow: none;
      background-color: transparent;
      // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      // background-color: $bg;
    }
  }
}
.components-antd-drop-down-filter {
  position: relative;
  background-color: $bg;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);

  .search-list-wrap {
    padding: 0 0 0 16px;
    margin-right: 8px;
    overflow-y: auto;
    height: 100%;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b2bef7;
      border-radius: 467px;
    }

    .search-list {
      padding: 8px;
      margin-right: 7px;
      transition: all 0.2s ease;
      &:active {
        // opacity: 0.8;
        background-color: #eff4fd;
      }
      &:hover {
        background: #eff4fd;
      }
    }
    .search-list-title {
      color: var(--text-color);
      cursor: pointer;
    }
  }

  .search-box-wrap {
    padding: 12px 16px;

    .search-box {
      border: 1px solid #d7dce4;
      border-radius: 8px;
      padding: 8px 12px;
      .components-search-input {
        &::-webkit-input-placeholder {
          color: #bfbfbf;
        }
        padding: 0;
      }
    }
  }

  .components-antd-drop-down-bottom {
    background-color: $bg;
    box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.1);
    padding: 0 8px;
    border-radius: 0 0 8px 8px;

    .btn-box {
      padding: 16px 8px;
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
