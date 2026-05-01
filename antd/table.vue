<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import NexiIcon from "./icon.vue";
import NexiNull from "./null.vue";
import vuedraggable from "vuedraggable";
import Sortable from "sortablejs";
import { cloneDeep } from "lodash-es";

import type { TableProps } from "ant-design-vue";

enum TableSize {
  Small = "small",
  Default = "large",
  Middle = "middle",
}

const emits = defineEmits(["expandedRowsChange", "change:sort", "change:check-all", "change:check-current-page"]);

type CustomTableProps = {
  /**
   * 表格ID，默认使用当前时间戳
   */
  tableId?: number | string;
  /**
   * 表格是否需要拖拽
   */
  draggable?: boolean;
  columns: TableProps["columns"];
  dataSource: TableProps["dataSource"];
  rowKey?: TableProps["rowKey"];
  size?: TableProps["size"];
  /**
   * 是否显示边框
   */
  bordered?: TableProps["bordered"];
  loading?: TableProps["loading"];
  tableLayout?: TableProps["tableLayout"];
  expandRowByClick?: TableProps["expandRowByClick"];
  expandedRowKeys?: TableProps["expandedRowKeys"];
  pagination?: TableProps["pagination"] & {
    current: number;
    pages: number;
    pageSize: number;
    filters?: any;
    sorter?: any;
    total?: number;
    /**
     * 自定义分页器的onChange事件
     */
    onChange?: (current: number, pageSize: number, filters: any, sorter: any) => void;
    // onPageChange?: (
    //   current: number,
    //   pageSize: number,
    //   filters: any,
    //   sorter: any
    // ) => void;
  };
  /**
   * 是否显示表头
   */
  showHeader?: boolean;
  /**
   * 是否固定表头
   */
  sticky?: boolean;
  /**
   * 是否显示table上的操作栏
   */
  showToolBars?: boolean;
  /**
   * 指定滚动区域的宽、高
   */
  scrollX?: number;
  scrollY?: string | number;
  customRow?: any;
  useDefaultToolbar?: boolean;
  rowSelection?: TableProps["rowSelection"] & {
    checkAll: boolean;
    checkCurrentPage: boolean;
    selectedRowKeys: any[];
  };
  /**
   * 是否显示自定义empty
   */
  showEmpty?: boolean;
};

// TableProps &
let props = withDefaults(defineProps<CustomTableProps>(), {
  // 表格ID，默认使用当前时间戳
  tableId: new Date().getTime().toString(),
  draggable: false,
  columns: () => [],
  dataSource: () => [],
  expandedRowKeys: () => [],
  rowKey: "id",
  size: TableSize.Small,
  bordered: false,
  loading: false,
  tableLayout: "fixed",
  pagination: undefined,
  expandRowByClick: false,
  // 是否显示表头
  showHeader: true,
  // 是否显示table上的操作栏
  showToolBars: true,
  sticky: true,
  // 指定滚动区域的宽、高，默认800
  scrollX: 800,
  // 指定滚动区域的高，默认100vh
  // scrollY: '100vh',
  scrollY: undefined,
  customRow: undefined,
  useDefaultToolbar: false,
  rowSelection: undefined,
  showEmpty: false, // 默认不显示空数据
});

const currentPage = ref<number>();

// 监听table组件的onChange事件，用于切换分页，筛选等
const onChange = (pagination: any, filters: any, sorter: any) => {
  props.pagination?.onChange?.(pagination.current, pagination.pageSize, filters, sorter);
};

const tableSize = ref(props.size);
const changeTableSize = (size: TableSize.Small | TableSize.Default | TableSize.Middle) => {
  tableSize.value = size;
};
const getPopupContainer: () => any = () => {
  if (import.meta.client) {
    return document.querySelector(".components-table-wrap") as HTMLElement;
  }
};

const handleResizeColumn = (w: number, col: any) => {
  col.width = w;
};

const expandedRowsChange = (e: any) => {
  emits("expandedRowsChange", e);
};

const showSortColumnPanel = ref(false);
const defaultColumns = ref<any[]>([]);
const newColumns = ref<any[]>([]);
const resetSortColumn = () => {
  newColumns.value = cloneDeep(defaultColumns.value);
};
const checkMove = (evt: any) => {
  return evt?.draggedContext?.element?.key !== "action";
};
const isCheckedAll = computed(() => {
  return props.columns.length === newColumns.value.filter((item) => item.checked).length;
});
const handleColumnCheckAll = () => {
  const checked = isCheckedAll.value;
  newColumns.value.forEach((item) => {
    item.checked = !checked;
  });
};
const handleColumnCheck = (index: number) => {
  const flag = newColumns.value[index]?.checked;
  newColumns.value[index].checked = !flag;
};
const toggleSortColumnPanel = (flag: boolean) => {
  showSortColumnPanel.value = flag;
};

const isInitSortable = ref(false);
// 拖拽排序 -------------- start
const initSortable = () => {
  if (!isInitSortable.value) return;
  if (import.meta.client) {
    const el = document.querySelector(`.components-table-${props.tableId} tbody`) as HTMLElement;
    Sortable.create(el, {
      handle: `.components-table-${props.tableId} .ant-table-row .draggable`,
      animation: 150,
      // removeCloneOnHide: true,
      group: {
        name: String(props.tableId),
        pull: true,
        put: true,
      },
      //这里千万不要用onEnd 方法
      // onUpdate: function (evt) {},
      onEnd: function (evt) {
        console.log(evt, evt.oldIndex, evt.newIndex);
        // TODO: wuxiaolin 这里需要-1
        const o = (evt?.oldIndex || 0) - 1 || 0;
        const n = (evt?.newIndex || 0) - 1 || 0;
        if (o === n) {
          return;
        }
        sortListAndUpdate(props.dataSource, o, n);
      },
    });
  }
};
// 对数据进行排序，要求 o（oldIndex） 和 n（newIndex） 从 0开始
const sortList = (list: any[], o: any, n: any) => {
  const newTableData = cloneDeep(list);
  const data = newTableData.splice(o, 1, null);
  newTableData.splice(o < n ? n + 1 : n, 0, data[0]);
  newTableData.splice(o > n ? o + 1 : o, 1);
  return newTableData;
};
// 对数据排序并更新 table， 要求 o（oldIndex） 和 n（newIndex） 从 0开始
const sortListAndUpdate = (list: any[], o: any, n: any) => {
  const newTableData = sortList(list, o, n);
  newTableData.forEach((item, index) => {
    item.customIndex = index + 1;
  });
  // 更新排序
  emits("change:sort", newTableData);
};

const changePage = (page: number) => {
  console.log("%c [  ]-212", "font-size:13px; background:pink; color:#bf2c9f;", page);
  if (page < 1) return;
  if (page > (props.pagination as any).pages) {
    return;
  }
  props?.pagination?.onChange?.(page, props.pagination.pageSize, props.pagination.filters, props.pagination.sorter);
};
const enterChangePage = (e: any) => {
  console.log("%c [  ]-234", "font-size:13px; background:pink; color:#bf2c9f;", e.target.value);
  changePage(Number(e.target.value));
  currentPage.value = undefined;
};

const handleCheckAll = () => {
  emits("change:check-all", {
    rowKey: props.rowKey,
  });
};
const handleCheckCurrentPage = () => {
  emits("change:check-current-page", {
    rowKey: props.rowKey,
  });
};

const changePageOption = (pageSize: any) => {
  props?.pagination?.onChange?.(props.pagination.current, Number(pageSize), props.pagination.filters, props.pagination.sorter);
};

const width = ref(0);
const scrollBarLeft = ref(0);
const scrollbar1 = ref<any>();
const scrollbar2 = ref<any>();
const isDragScrollBar = ref(false);
const handleScroll = (args: { left: number; id: string }) => {
  isDragScrollBar.value = true;
  // scrollBarLeft.value = left;
  const leftValue = (args.left / (314 - 95)) * width.value;
  if (args.id === "1") {
    scrollbar2.value.updateLeft(args.left);
  } else {
    scrollbar1.value.updateLeft(args.left);
  }
  setScollPos(leftValue);
};
const setScollPos = (left: number) => {
  if (left < 0) left = 0;
  if (import.meta.client) {
    const dom = document.querySelector(".ant-table-sticky-holder") as HTMLElement;
    const dom1 = document.querySelector(".ant-table-body") as HTMLElement;
    if (dom) {
      dom.scrollLeft = left;
    }
    if (dom1) {
      dom1.scrollLeft = left;
    }
  }
};
const handleScrollEnd = () => {
  isDragScrollBar.value = false;
};

/**
 * 获取表格的实际宽度和容器宽度，并计算可滑动的距离
 */
const getTableWidth = () => {
  setTimeout(() => {
    if (import.meta.client) {
      const container = document.querySelector(".ant-table-sticky-holder") as HTMLElement;
      if (!container) return;
      // 获取表格的实际宽度和容器宽度
      const tableWidth = container?.scrollWidth || 0;
      const containerWidth = container?.offsetWidth || 0;
      // 计算可滑动的距离
      width.value = Math.max(0, tableWidth - containerWidth);
    }
  }, 100);
};

watch(
  () => props.columns,
  (newValueColumns) => {
    defaultColumns.value = newValueColumns.map((item: any) => {
      item.checked = true;
      return item;
    });
    newColumns.value = cloneDeep(defaultColumns.value);

    // 判断是否
    const rowDrag = newValueColumns.findIndex((item: any) => item.rowDrag) !== -1;
    if ((rowDrag || props.draggable) && !isInitSortable.value) {
      isInitSortable.value = true;

      nextTick(() => {
        initSortable();
      });
    }

    getTableWidth();
  },
  { immediate: true },
);

onMounted(() => {
  // 获取table的实际宽度和容器宽度
  getTableWidth();

  if (import.meta.client) {
    window.addEventListener("resize", getTableWidth);

    // 监听dom 左右滑动 .ant-table-sticky-holder，更新滚动条位置
    try {
      const container = document.querySelector(".ant-table-sticky-holder") as HTMLElement;
      if (container) {
        container.addEventListener("scroll", () => {
          if (isDragScrollBar.value) return;
          const left = container.scrollLeft;
          const leftValue = (left / width.value) * (314 - 95);
          scrollbar2.value.updateLeft(leftValue);
          scrollbar1.value.updateLeft(leftValue);
        });
      }
    } catch (e) {}
  }
});
onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener("resize", getTableWidth);
  }
});
</script>
<template>
  <div class="components-table-wrap pb-10px" :class="[`components-table-${props.tableId}`]">
    <div v-if="props.showToolBars" class="flex-h justify-between">
      <!-- 操作按钮 -->
      <div>
        <div v-if="$slots.action" class="pb-10px">
          <a-space>
            <slot name="action" v-bind="props"></slot>
          </a-space>
        </div>
      </div>
      <!-- 工具栏和操作按钮，向右对齐 -->
      <div class="p-10px pr-0">
        <a-space :size="10">
          <!-- 工具栏 -->
          <a-space :size="10">
            <slot name="toolbars" v-bind="props"></slot>
          </a-space>
        </a-space>
        <a-space v-if="props.useDefaultToolbar" :size="10">
          <!-- 工具栏 -->
          <a-space :size="10">
            <a-dropdown :trigger="['click']" :get-popup-container="getPopupContainer">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Default)"> 较大 </a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Middle)"> 正常 </a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Small)"> 较小 </a>
                  </a-menu-item>
                </a-menu>
              </template>
              <NexiIcon icon="column-height" :size="20" class="inline-block" @click.prevent />
            </a-dropdown>
            <a-dropdown
              class="components-dropdown"
              :get-popup-container="getPopupContainer"
              :open="showSortColumnPanel"
              :trigger="['click']"
              :style="{ padding: 0 }"
              :overlay-style="{ padding: 0 }"
            >
              <template #overlay>
                <a-card :body-style="{ padding: '5px 15px' }" :style="{ padding: 0, width: '170px' }">
                  <template #title>
                    <a-checkbox :checked="isCheckedAll" style="line-height: 1" @click="handleColumnCheckAll"> 列展示 </a-checkbox>
                  </template>
                  <template #extra>
                    <a href="javascript:;" class="inline-block" @click="resetSortColumn"> 重置 </a>
                  </template>

                  <div style="max-height: 300px; overflow: auto">
                    <div class="list-wrap">
                      <vuedraggable v-model="newColumns" item-key="dataIndex" :move="checkMove">
                        <template #item="{ element, index }">
                          <div class="flex-h p-3px">
                            <div class="draggable w-24px text-center">
                              <NexiIcon v-if="element.key === 'action'" icon="lock" cursor="not-allowed" :size="14" />
                              <NexiIcon v-else icon="more" cursor="move" :size="14" />
                            </div>
                            <a-checkbox :checked="element.checked" @click="handleColumnCheck(index)">
                              <span>{{ element.title }}</span>
                            </a-checkbox>
                          </div>
                        </template>
                      </vuedraggable>
                    </div>
                  </div>
                </a-card>
              </template>
              <NexiIcon icon="setting" :size="20" class="inline-block" @click="toggleSortColumnPanel(true)" />
            </a-dropdown>
          </a-space>
        </a-space>
      </div>
    </div>

    <!-- props.pagination
    ? {
        ...props.pagination,
        // 把分页器的 onChange 事件取消，使用table组件onChange事件
        onChange: () => {},
      }
    : " -->
    <div class="relative custom-scroll-bar">
      <div v-if="width > 10" class="absolute top-[-8px] left-0 right-0 z-10">
        <NexiTableScrollBar id="1" ref="scrollbar1" :left="scrollBarLeft" @scroll="handleScroll" @scroll-end="handleScrollEnd" />
      </div>

      <!-- , y: props.scrollY -->
      <a-table
        v-bind="props"
        :columns="newColumns.filter((item) => item.checked)"
        :scroll="{ x: props.scrollX, y: props.scrollY }"
        :size="tableSize"
        :pagination="false"
        :custom-row="props.customRow"
        class="components-sort-table"
        :class="`components-table-${props.tableId}`"
        :sticky="props.sticky"
        @change="onChange"
        @expanded-rows-change="expandedRowsChange"
        @resize-column="handleResizeColumn"
      >
        <!-- 自定义表头-->
        <template #headerCell="{ column }">
          <span v-if="typeof column.title === 'string'" style="font-weight: bold">
            {{ column.title }}
          </span>
        </template>
        <!-- Table slots -->
        <template v-for="(_, slotName) of $slots" :key="slotName" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData"></slot>
        </template>

        <!-- TableColumn slots -->
        <template #bodyCell="slotData">
          <slot name="bodyCell" v-bind="slotData"></slot>
        </template>
        <template #emptyText>
          <slot v-if="showEmpty" name="empty"></slot>
          <div v-else class="pt-10% pb-10%">
            <NexiNull :mt="false" text="暂无数据" />
          </div>
        </template>
      </a-table>
      <!-- TODO: wuxiaolin 05-08 没有数据时显示空数据组件，不显示分页器 -->
      <div v-if="props.pagination && props.dataSource?.length" class="bg-#fafafa pt-19px pb-19px pr-24px h-72px">
        <div class="flex-h justify-between">
          <template v-if="props.rowSelection?.type === 'checkbox'">
            <div class="pl-8px">
              <a-checkbox :checked="props.rowSelection?.checkAll" @change="handleCheckAll"> 全选 </a-checkbox>
              <span class="ml-12px">
                <!-- :disabled="props.rowSelection?.checkAll" -->
                <a-checkbox :checked="props.rowSelection?.checkCurrentPage" @change="handleCheckCurrentPage"> 当前页全选 </a-checkbox>
              </span>
              <span class="ml-12px mr-12px">
                <span>选中</span>
                <span class="text-active">{{
                  props.rowSelection?.checkAll ? props.pagination.total : props.rowSelection?.selectedRowKeys.length
                }}</span>
                <span>条</span>
              </span>
            </div>
          </template>
          <template v-else>
            <div></div>
          </template>
          <div class="flex-h justify-between">
            <span style="font-weight: 600"> 共 {{ props.pagination.total || "0" }} 条记录， </span>
            <a
              class="ant-pagination-btn"
              :class="{
                disabled: Number(props.pagination.current) === 1,
              }"
              @click="changePage(Number(props.pagination.current) - 1)"
            >
              <NexiIcon icon="left" />
            </a>
            <span style="margin: 0 15px; font-weight: 600">
              {{ Number(props.pagination.current) || "1" }}
              {{ Number(props.pagination.pages) ? "/" : "" }}
              {{ Number(props.pagination.pages) || "" }}页
            </span>
            <a
              class="ant-pagination-btn"
              :class="{
                disabled: Number(props.pagination.current) === Number(props.pagination.pages),
              }"
              @click="changePage(Number(props.pagination.current) + 1)"
            >
              <NexiIcon icon="right" />
            </a>
            <!-- <a-pagination
              class="custom-pagination"
              v-bind="props.pagination"
              show-quick-jumper
              :show-total="() => ''"
            /> -->
            <a-select
              :value="Number(props.pagination.pageSize)"
              :options="
                props.pagination.pageSizeOptions?.map((item: any) => {
                  return {
                    label: `${item}条/页`,
                    value: Number(item),
                  };
                })
              "
              class="min-w-82px ml-12px"
              @change="changePageOption"
            >
            </a-select>
            <span class="text-[var(--text-color)] ml-4px mr-4px">跳至</span>
            <a-input v-model:value="currentPage" class="min-w-58px w-58px" @keydown.enter="enterChangePage" />
            <span class="text-[var(--text-color)] ml-4px">页</span>
          </div>
        </div>
      </div>
      <div
        v-if="width > 10"
        class="absolute left-0 right-0 z-10"
        :style="{
          bottom: props.pagination ? '65px' : '-8px',
        }"
      >
        <NexiTableScrollBar id="2" ref="scrollbar2" :left="scrollBarLeft" @scroll="handleScroll" @scroll-end="handleScrollEnd" />
      </div>
    </div>

    <div v-if="showSortColumnPanel" class="components-table-frame" @click="toggleSortColumnPanel(false)"></div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.ant-table-container tr:first-child) {
  height: 72px;
}

.components-table-wrap {
  //
  :deep(.ant-table-body) {
    &::-webkit-scrollbar {
      width: 8px !important;
    }
  }

  .custom-scroll-bar {
    :deep(.ant-table-body) {
      scrollbar-width: none;

      &::-moz-scrollbar,
      &::-webkit-scrollbar {
        height: 0 !important;
      }
    }
  }

  // 遮罩层
  .components-table-frame {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0);
  }

  :deep(.ant-dropdown-menu-head) {
    min-height: 0;
    padding: 7px 14px;
  }

  :deep(.ant-dropdown-menu-body) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  // 重新定义分页器样式
  :deep(.ant-pagination) {
    .ant-pagination-item {
      display: none !important;
    }
  }

  .ant-pagination-btn {
    min-width: 34px;
    height: 34px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    background-color: transparent;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 0 9px;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    user-select: none;

    &.disabled {
      background-color: #f2f2f2;
      border: 1px solid #f2f2f2;
    }
  }

  .custom-pagination {
    :deep(.ant-pagination-prev),
    :deep(.ant-pagination-jump-prev),
    :deep(.ant-pagination-jump-next),
    :deep(.ant-pagination-next) {
      display: none !important;
    }

    :deep(.ant-select-selection-item) {
      color: #595959 !important;
    }

    :deep(.ant-pagination-options-quick-jumper input) {
      color: #4b67f4 !important;
    }
  }

  :deep(.ant-table-sticky-scroll) {
    display: none;
  }

  :deep(.ant-table-wrapper .ant-table-column-sorters) {
    justify-content: unset;
    align-items: unset;

    .ant-table-column-sorter {
      margin-inline-start: 8px;
    }
  }

  :deep(.ant-table-wrapper .ant-table-column-title) {
    flex: none;
  }
}

:deep(.ant-table-wrapper .ant-table-thead th.ant-table-column-sort) {
  background: #fbfbfb;
}

:deep(.ant-table-wrapper td.ant-table-column-sort) {
  background: none;
}
</style>
