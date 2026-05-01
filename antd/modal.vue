<script lang="ts" setup>
import { ref, unref, watch } from "vue";
const props = defineProps({
  layout: {
    type: String,
    default: ".layout-wrap",
  },
  title: {
    type: String,
    default: "",
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  // 是否需要背景渐变色
  bg: {
    type: Boolean,
    default: false,
  },
  // 底部是否显示关闭按钮
  showFooterCloseBtn: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  top: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["ok", "cancel"]);
const visible = ref(false);

const params = ref<any>({});

/** 监听退出登录，关闭全局Modal */
watch(
  () => useGlobalStore().toggleGlobalModal,
  () => {
    if (useGlobalStore().toggleGlobalModal) {
      close();
    }
  },
);

/** 打开弹窗 */
const open = (p: any = {}) => {
  params.value = p;
  visible.value = true;
};

/** 关闭弹窗 */
const close = () => {
  console.log(
    "%c [  ]-62",
    "font-size:13px; background:pink; color:#bf2c9f;",
    visible.value,
  );
  if (!visible.value) return; // 防止watch导致多次emit
  visible.value = false;
  emits("cancel");
};

const handleOk = () => {
  visible.value = false;
  emits("ok", unref(params));
};

const getContainer = () => {
  if (import.meta.client) {
    return document.querySelector(props.layout) as HTMLElement;
  }
};

/** 暴露出去的接口 */
defineExpose({
  open,
  close,
});
</script>
<template>
  <a-modal
    :open="visible"
    :title="props.title || undefined"
    :style="{
      top: props.top,
    }"
    :get-container="getContainer"
    :z-index="props.zIndex"
    :destroy-on-close="props.destroyOnClose"
    class="components-antd-modal"
    @ok="handleOk"
    @cancel="close"
  >
    <div v-if="props.bg" class="ant-modal-custom-bg"></div>
    <template #title>
      <div class="ant-modal-title">
        <slot name="title" />
      </div>
    </template>
    <div style="min-height: 30px; margin-top: 20px; position: relative">
      <slot />
    </div>
    <template v-if="!showFooter" #footer>
      <div style="padding: 16px">
        <slot name="footer" />
      </div>
    </template>
    <template v-else #footer>
      <div style="padding: 16px">
        <a-button type="primary" ghost @click="close">关闭</a-button>
      </div>
    </template>
  </a-modal>
</template>
<style lang="scss" scope>
.components-antd-modal {
  .ant-modal-title {
    :deep(*) {
      font-weight: bold;
    }
  }

  .ant-modal-content {
    padding: 0;
  }
  .ant-modal-header {
    padding: 16px 16px 8px;
  }
  .ant-modal-footer {
    // padding: 16px;
    margin-top: 0;
    box-shadow: 0px -1px 2px 0px rgba(38, 38, 38, 0.1);

    .ant-btn.ant-btn-default {
      color: #4b67f4;
      border-color: #4b67f4;
    }
  }
}
</style>
