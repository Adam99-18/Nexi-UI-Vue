<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import NexiIcon from "./icon.vue";
import draggable from "vuedraggable";
import Sortable from "sortablejs";

import { cloneDeep } from "lodash-es";

import type { TableProps } from "ant-design-vue";

enum TableSize {
  Small = "small",
  Default = "large",
  Middle = "middle",
}

const emits = defineEmits(["expandedRowsChange", "change:sort"]);

// TableProps &
let props = withDefaults(
  defineProps<{
    // 表格ID，默认使用当前时间戳
    tableId?: number | string;
    columns: TableProps["columns"];
    dataSource: TableProps["dataSource"];
    rowKey?: TableProps["rowKey"];
    size?: TableProps["size"];
    bordered?: TableProps["bordered"];
    loading?: TableProps["loading"];
    tableLayout?: TableProps["tableLayout"];
    expandRowByClick?: TableProps["expandRowByClick"];
    expandedRowKeys?: TableProps["expandedRowKeys"];
    pagination?: TableProps["pagination"] & {
      total?: number;
      // 自定义分页器的onChange事件
      onChange?: (current: number, pageSize: number, filters: any, sorter: any) => void;
      // onPageChange?: (
      //   current: number,
      //   pageSize: number,
      //   filters: any,
      //   sorter: any
      // ) => void;
    };
    // 是否显示表头
    showHeader?: boolean;
    // 指定滚动区域的宽、高
    scrollX?: number;
    scrollY?: string;
    customRow?: TableProps["customRow"];
  }>(),
  {
    // 表格ID，默认使用当前时间戳
    tableId: new Date().getTime() + "",
    columns: <any>[],
    dataSource: <any>[],
    expandedRowKeys: <any>[],
    rowKey: "id",
    size: TableSize.Small,
    bordered: true,
    loading: false,
    tableLayout: "fixed",
    pagination: undefined,
    expandRowByClick: false,
    // 是否显示表头
    showHeader: true,
    // 指定滚动区域的宽、高，默认800
    scrollX: 800,
    // 指定滚动区域的高，默认100vh
    scrollY: "70vh",
    customRow: undefined,
  }
);

// 监听table组件的onChange事件，用于切换分页，筛选等
const onChange = (pagination: any, filters: any, sorter: any) => {
  props.pagination?.onChange?.(pagination.current, pagination.pageSize, filters, sorter);
};
// 组装Table组件的scroll属性
const scroll = { x: props.scrollX, y: props.scrollY };

const tableSize = ref(props.size);
const changeTableSize = (
  size: TableSize.Small | TableSize.Default | TableSize.Middle
) => {
  tableSize.value = size;
};
const getPopupContainer: () => any = () => {
  if (typeof window !== "undefined") {
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
const handleCheckAll = () => {
  const checked = isCheckedAll.value;
  newColumns.value.forEach((item) => {
    item.checked = !checked;
  });
};
const handleCheck = (index: number) => {
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
  if (typeof window !== "undefined") {
    const el = document.querySelector(".components-sort-table tbody");
    Sortable.create(el, {
      handle: `.components-table-${props.tableId} .ant-table-row`,
      animation: 150,
      // removeCloneOnHide: true,
      group: {
        name: props.tableId,
        pull: true,
        put: true,
        clone: false,
      },
      //这里千万不要用onEnd 方法
      // onUpdate: function (evt) {},
      onEnd: function (evt) {
        console.log(evt, evt.oldIndex, evt.newIndex);

        if (evt.newIndex >= props.dataSource.length) return;

        // TODO: wuxiaolin 这里需要-1
        const o = evt.oldIndex || 0;
        const n = evt.newIndex || 0;
        if (o === n) {
          return;
        }
        sortListAndUpdate(props.dataSource, o, n);
      },
    });
  }
};
// 对数据进行排序，要求 o（oldIndex） 和 n（newIndex） 从 0开始
const sortList = (list, o, n) => {
  const newTableData = cloneDeep(list);
  const data = newTableData.splice(o, 1, null);
  newTableData.splice(o < n ? n + 1 : n, 0, data[0]);
  newTableData.splice(o > n ? o + 1 : o, 1);
  return newTableData;
};
// 对数据排序并更新 table， 要求 o（oldIndex） 和 n（newIndex） 从 0开始
const sortListAndUpdate = (list, o, n) => {
  const newTableData = sortList(list, o, n);
  emits("change:sort", newTableData);
};
watch(
  () => props.columns,
  (newValueColumns) => {
    defaultColumns.value = newValueColumns.map((item: any) => {
      item.checked = true;
      return item;
    });
    newColumns.value = cloneDeep(defaultColumns.value);

    const rowDrag = newValueColumns.findIndex((item) => item.rowDrag) !== -1;
    if (rowDrag && !isInitSortable.value) {
      isInitSortable.value = true;

      nextTick(() => {
        initSortable();
      });
    }
  },
  { immediate: true }
);
</script>
<template>
  <div
    class="components-table-wrap pb-10px"
    :class="[`components-table-${props.tableId}`]"
  >
    <div class="flex-h justify-between">
      <!-- 操作按钮 -->
      <div>
        <div v-if="$slots.action" class="pb-10px">
          <a-space><slot name="action" v-bind="props"></slot></a-space>
        </div>
      </div>
      <!-- 工具栏和操作按钮，向右对齐 -->
      <div class="p-10px pr-0">
        <a-space :size="10">
          <!-- 工具栏 -->
          <a-space :size="10">
            <a-dropdown :trigger="['click']" :get-popup-container="getPopupContainer">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Default)">
                      较大
                    </a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Middle)">
                      正常
                    </a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="changeTableSize(TableSize.Small)">
                      较小
                    </a>
                  </a-menu-item>
                </a-menu>
              </template>
              <NexiIcon
                icon="column-height"
                :size="20"
                class="inline-block"
                @click.prevent
              />
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
                <a-card
                  :body-style="{ padding: '5px 15px' }"
                  :style="{ padding: 0, width: '170px' }"
                >
                  <template #title>
                    <a-checkbox
                      :checked="isCheckedAll"
                      style="line-height: 1"
                      @click="handleCheckAll"
                    >
                      列展示
                    </a-checkbox>
                  </template>
                  <template #extra>
                    <a href="javascript:;" class="inline-block" @click="resetSortColumn">
                      重置
                    </a>
                  </template>

                  <div style="max-height: 300px; overflow: auto">
                    <div class="list-wrap">
                      <draggable
                        v-model="newColumns"
                        item-key="dataIndex"
                        :move="checkMove"
                      >
                        <template #item="{ element, index }">
                          <div class="flex-h p-3px">
                            <div class="draggable w-24px text-center">
                              <NexiIcon
                                v-if="element.key === 'action'"
                                icon="lock"
                                cursor="not-allowed"
                                :size="14"
                              />
                              <NexiIcon v-else icon="more" cursor="move" :size="14" />
                            </div>
                            <a-checkbox
                              :checked="element.checked"
                              @click="handleCheck(index)"
                            >
                              <span>{{ element.title }}</span>
                            </a-checkbox>
                          </div>
                        </template>
                      </draggable>
                    </div>
                  </div>
                </a-card>
              </template>
              <NexiIcon
                icon="setting"
                :size="20"
                class="inline-block"
                @click="toggleSortColumnPanel(true)"
              />
            </a-dropdown>
          </a-space>
        </a-space>
      </div>
    </div>

    <a-table
      v-bind="props"
      :columns="newColumns.filter((item) => item.checked)"
      :scroll="scroll"
      :size="tableSize"
      :pagination="
        props.pagination
          ? {
              ...props.pagination,
              // 把分页器的 onChange 事件取消，使用table组件onChange事件
              onChange: () => {},
            }
          : false
      "
      class="components-sort-table"
      :class="`components-table-${props.tableId}`"
      :custom-row="props.customRow"
      @change="onChange"
      @expanded-rows-change="expandedRowsChange"
      @resize-column="handleResizeColumn"
    >
      <!-- Table slots -->
      <template v-for="(_, slotName) of $slots" :key="slotName" #[slotName]="slotData">
        <slot :name="slotName" v-bind="slotData"></slot>
      </template>
      <!-- TableColumn slots -->
      <template #bodyCell="slotData">
        <slot name="bodyCell" v-bind="slotData"></slot>
      </template>
    </a-table>

    <div
      v-if="showSortColumnPanel"
      class="components-table-frame"
      @click="toggleSortColumnPanel(false)"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.components-table-wrap {
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
}
</style>
