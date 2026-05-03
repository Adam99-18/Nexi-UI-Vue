<script lang="ts" setup>
import { computed, ref, watch, type PropType } from "vue";
import NexiIcon from "./icon.vue";
import NexiNull from "./null.vue";
import TextHightlight from "./text-highlight.vue";
import { debounce } from "lodash-es";
import { useDictionaryStore } from "./runtime";

const emits = defineEmits([
  // 发送{label, value}对象数组
  "select",
  "change",
  "add",
  "refresh",
  "input",
  "remove",
]);

const props = defineProps({
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
    default: "请选择",
  },
  /**
   * 弹出框里搜索框提示文字
   */
  placeholderInput: {
    type: String as PropType<string>,
    default: "搜索文件名称",
  },
  /**
   * 选项列表，父组件传进来，必须有value和label属性
   */
  options: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  /**
   * 已选中的选项，父组件传进来，必须有value属性
   */
  ids: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  items: {
    type: Array as PropType<Array<any>>,
    default: () => [],
  },
  value: {
    type: Array,
    default: () => [],
  },
});

const searchValue = ref("");
const ajaxLoading = ref(false);
const currentIds = ref<Array<string | number>>([]);
const list = ref<any>([...useDictionaryStore().dictionaryFilter]);
const results = ref<any[]>([]);
const openStatus = ref(false);

// 计算限制文字，拼接
const valuePro = computed(() => {
  if (!results?.value?.length) return "全部";
  return results.value.map((item) => item.label).join(",");
});

// 监听props.options变化
watch(
  () => props.options,
  (options) => {
    if (options && options.length > 0) {
      list.value = options;
    } else {
      list.value = [...useDictionaryStore().dictionaryFilter];
    }

    // // 生成50条数据
    // list.value = Array.from({ length: 50 }, (_, index) => {
    //   return {
    //     label: `选项${index + 1}`,
    //     value: `value${index + 1}`,
    //     checked: false,
    //   };
    // });
  },
  {
    immediate: true,
    deep: true,
  },
);

// 监听props.value变化
watch(
  () => props.value,
  (value) => {
    if (!value || !value.length) {
      currentIds.value = [];
      results.value = [];
      return;
    }

    results.value = value;
    currentIds.value = value.map((it: any) => String(it.value));
  },
  {
    immediate: true,
    deep: true,
  },
);

/**
 * 判断是否选中
 */
const computedCheck = (item: any) => {
  return currentIds.value?.some(
    (it: string | number) => String(it) === String(item.value),
  );
};

/**
 * 点击选择item
 */
const handleSelect = (item: any) => {
  // 判断是否已经有
  const flag = currentIds.value?.some(
    (it: string | number) => String(it) === String(item.value),
  );
  if (!flag) {
    currentIds.value.push(item.value);

    results.value.push(item);
    // 发送{label, value}对象数组
    emits("select", results.value);
    return;
  }
  currentIds.value?.splice(currentIds.value.indexOf(item.value), 1);
  results.value = results.value.filter(
    (it: any) => String(it.value) !== String(item.value),
  );

  // 发送{label, value}对象数组
  emits("select", results.value);
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

// 搜索
const onInput = debounce(function () {
  emits("input", searchValue.value);
}, 500);

// 点击展示弹出框
const openChange = (status: boolean) => {
  openStatus.value = status;
};

// 根据搜索内容计算list
const computedList = computed(() => {
  if (!searchValue.value) {
    return list.value;
  }
  return list.value.filter((item: any) => {
    return (
      item.label.toLowerCase().indexOf(searchValue.value.toLowerCase()) !== -1
    );
  });
});

defineExpose({
  setData,
});
</script>
<template>
  <div>
    <a-tooltip
      placement="bottom"
      arrow-point-at-center
      trigger="click"
      overlay-class-name="components-antd-drop-down-filter-search-box"
      @open-change="openChange"
    >
      <template #title>
        <div
          class="components-antd-drop-down-filter-search"
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
                @input="onInput"
              />
            </div>
          </div>

          <div class="search-list-wrap" style="height: calc(100% - 64px)">
            <a-spin :spinning="ajaxLoading">
              <div
                v-for="(item, index) in computedList"
                :key="index"
                class="search-list flex-h"
                @click="handleSelect(item)"
              >
                <!-- {{ item.label || "" }} -->
                <div class="search-list-title text-overflow flex-1">
                  <TextHightlight
                    class-name="text-overflow"
                    :content="item.label"
                    :height-value="searchValue"
                  />
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
              <div v-if="computedList?.length" class="min-h-10px"></div>
              <NexiNull v-else height="6rem" />
            </a-spin>
          </div>
        </div>
      </template>
      <div class="input-box">
        <span class="text-overflow">{{ valuePro }}</span>
        <NexiIcon v-if="!openStatus" icon="down" />
        <NexiIcon v-else icon="up" />
      </div>
    </a-tooltip>

    <!-- TODO: wuxiaolin 展示tooltip，添加遮罩层禁止滚动 -->
    <div
      v-if="openStatus"
      class="fixed left-0 right-0 top-0 bottom-0 z-1 w-100% h-100% bg-[rgba(0,0,0,0)]"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.input-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 173px;
  cursor: pointer;
  padding: 0 10px;
}
</style>
<style lang="scss" scoped>
$bg: #fff;

.components-antd-drop-down-filter-search-box {
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
      // border-radius: 8px;
      box-shadow: none;
      background-color: transparent;
    }
  }
}
.components-antd-drop-down-filter-search {
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
}
</style>
