<script lang="tsx" setup>
import { ref, watch, type PropType } from "vue";
import { moment } from "./dayjs";
const props = defineProps({
  showTime: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  placeholder: {
    type: String as PropType<string>,
    default: "请选择",
  },
  field: {
    // Function
    type: (String as PropType<string> | (() => any)) as PropType<() => any>,
    required: true,
  },
  form: {
    type: Object,
    default: () => ({}),
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["update:value"]);
const activeKey = ref("0");
const computedField = ref<any>(undefined);
watch(
  () => props.field,
  () => {
    if (props.field instanceof Array) {
      computedField.value = props.field;
      return;
    }
    if (typeof props.field === "function") {
      computedField.value = props.field();
      return;
    }
    computedField.value = props.form[props.field] || undefined;
  },
  { immediate: true }
);
const changeTime = (value: any) => {
  if (!value || !Array.isArray(value) || value.length < 2) {
    computedField.value = undefined;
    activeKey.value = "0";
    emits("update:value", null);
    return;
  }

  const formattedValue = value.map((date: string | Date) => {
    if (date) {
      return moment(date).startOf("day");
    }
    return null;
  });

  if (formattedValue.length > 1 && formattedValue[1]) {
    formattedValue[1] = moment(formattedValue[1]).endOf("day");
  }

  computedField.value = formattedValue;

  emits(
    "update:value",
    formattedValue?.length && formattedValue[0]
      ? [Number(formattedValue[0].format("x")), Number(formattedValue[formattedValue.length - 1].format("x"))]
      : null
  );
};

const handleItem = (key: number) => {
  if (activeKey.value === key + "") {
    reset();
    return;
  }
  activeKey.value = key + "";
  const date = moment();
  switch (key) {
    case 1:
      computedField.value = [date.startOf("day"), date.endOf("day")];
      break;
    case 2:
      computedField.value = [
        date.subtract(1, "days").startOf("day"),
        date.subtract(1, "days").endOf("day"),
      ];
      break;
    case 3:
      computedField.value = [date.subtract(7, "days").startOf("day"), date.endOf("day")];
      break;
    case 4:
      computedField.value = [date.subtract(30, "days").startOf("day"), date.endOf("day")];
      break;
  }
  emits("update:value", [
    Number(computedField.value[0].format("x")),
    Number(computedField.value[1].format("x")),
  ]);
};

const reset = () => {
  computedField.value = undefined;
  activeKey.value = "0";
  emits("update:value", null);
};
defineExpose({ reset, handleItem });
</script>
<template>
  <div class="flex-h w-100%">
    <div class="white-space-nowrap">
      <a-radio-group v-model:value="activeKey">
        <a-radio-button class="pl-8px pr-8px" value="1" @click="handleItem(1)">
          今天
        </a-radio-button>
        <a-radio-button class="pl-8px pr-8px" value="2" @click="handleItem(2)">
          昨天
        </a-radio-button>
        <a-radio-button class="pl-8px pr-8px" value="3" @click="handleItem(3)">
          最近7天
        </a-radio-button>
        <a-radio-button class="pl-8px pr-8px" value="4" @click="handleItem(4)">
          最近30天
        </a-radio-button>
      </a-radio-group>
    </div>
    <a-form-item v-show="isShow === true" class="mb-0 ml-5px w-100%">
      <a-range-picker
        v-model:value="computedField"
        allow-clear
        :show-time="props.showTime"
        class="w-100% text-center"
        @change="changeTime"
      />
    </a-form-item>
  </div>
</template>
<style lang="scss" scoped></style>
