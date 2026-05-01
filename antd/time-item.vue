<script lang="tsx" setup>
import { ref, watch, type PropType } from "vue";
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
const computedField = ref<any>(null);
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
    computedField.value = props.form[props.field] || null;
  },
  { immediate: true }
);
const changeTime = (value: any) => {
  // 将传入的值转换为moment对象，并设定时间为每天的开始和结束
  const formattedValue = value.map((date: string | Date) => {
    if (date) {
      return moment(date).startOf("day");
    }
    return null;
  });

  // 如果结束日期需要设定为23:59:59，这里进行调整
  if (formattedValue.length > 1) {
    formattedValue[1] = moment(formattedValue[1]).endOf("day");
  }

  // 更新内部状态
  computedField.value = formattedValue;

  // 控制台输出格式化的日期时间，展示处理结果
  console.log(
    "Formatted start of day:",
    formattedValue[0]?.format("YYYY-MM-DD HH:mm:ss")
  );
  console.log("Formatted end of day:", formattedValue[1]?.format("YYYY-MM-DD HH:mm:ss"));

  // 发出更新事件，使用Unix时间戳
  emits(
    "update:value",
    formattedValue?.length
      ? [Number(formattedValue[0].format("x")), Number(formattedValue[1].format("x"))]
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
  computedField.value = null;
  activeKey.value = "0";

  emits("update:value", computedField.value);
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
