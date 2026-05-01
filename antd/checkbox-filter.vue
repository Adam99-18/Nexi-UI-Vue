<template>
  <div class="checkbox-filter-container">
    <a-popover
      v-model:value="showIconPopover"
      placement="bottomRight"
      trigger="click"
    >
      <template #content>
        <div class="w-130px h-auto mt-5px" style="overflow: auto">
          <a-form-item-rest>
            <div
              v-for="(item, index) in list"
              :key="index"
              class="flex justify-between cursor-pointer lh-30px"
              @click="handleSelect(index)"
            >
              <span>{{ item.label }}</span>
              <a-checkbox :checked="item.checked"></a-checkbox>
            </div>
          </a-form-item-rest>
        </div>
      </template>
      <div class="input-box">
        <span>{{ valuePro }}</span>
        <NexiIcon v-if="!showIconPopover" icon="down" />
        <NexiIcon v-else icon="up" />
      </div>
    </a-popover>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:value", "select"]);

const showIconPopover = ref(false);
const valuePro = ref("全部");
const list = ref<any>([...useDictionaryStore().dictionaryFilter]);

watch(
  () => props.options,
  (options) => {
    if (options && options.length > 0) {
      list.value = options;
    } else {
      list.value = [...useDictionaryStore().dictionaryFilter];
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

const handleSelect = (index: any) => {
  list.value[index].checked = !list.value[index].checked;
  valuePro.value =
    list.value
      .filter((item: any) => item.checked)
      .map((item: any) => item.label)
      .join(",") || "全部";
  emit(
    "update:value",
    list.value
      .filter((item: any) => item.checked)
      .map((item: any) => item.value),
  );
  emit("select", unref(list.value[index]));
};

watch(
  () => props.value,
  (value) => {
    console.log("value", value);
    if (value && value.length > 0) {
      list.value.forEach((item: any) => {
        item.checked = value.includes(item.value);
      });
      const selectedLabels = list.value
        .filter((item: any) => item.checked)
        .map((item: any) => item.label)
        .join(",");
      valuePro.value = selectedLabels || "全部";
    } else {
      list.value.forEach((item: any) => {
        item.checked = false;
      });
      valuePro.value = "全部";
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
<style lang="scss" scoped>
.input-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 173px;
  cursor: pointer;
  padding: 0 10px;

  span {
    overflow: hidden;

    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
