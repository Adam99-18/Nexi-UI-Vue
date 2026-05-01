<!-- 提示弹窗 -->
<script lang="ts" setup>
const props = defineProps({
  layout: {
    type: String,
    default: '.layout-wrap',
  },
  title: {
    type: String,
    default: '提示',
  },
  content: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['ok', 'cancel']);
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
  if (!visible.value) return; // 防止watch导致多次emit
  visible.value = false;
  emits('cancel');
};

const handleOk = () => {
  visible.value = false;
  emits('ok', unref(params));
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
    :get-container="getContainer"
    destroy-on-close
    class="components-antd-modal"
    :width="400"
    @ok="handleOk"
    @cancel="close"
  >
    <div
      class="flex"
      style="align-items: flex-start; min-height: 30px; margin: 5px 18px 0 18px"
    >
      <NexiIcon icon="exclamation-circle" :size="20" color="#F4AB62" fill />
      <div style="margin-left: 8px; font-size: 14px; color: #585858">
        {{ props.content || '' }}
      </div>
    </div>
    <div class="flex justify-end" style="padding: 16px">
      <a-space>
        <a-button type="primary" ghost @click="close">取消</a-button>
        <a-button type="primary" @click="handleOk">确定</a-button>
      </a-space>
    </div>
    <template #footer></template>
  </a-modal>
</template>
<style lang="scss" scoped></style>
