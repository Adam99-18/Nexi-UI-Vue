<script lang="ts" setup>
  const emits = defineEmits(['click']);
  const props = defineProps({
    options: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    item: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  });
  const handleClick = (e: any) => {
    emits('click', {
      ...props.item,
      key: e.key,
      action: props.options[Number(e.key)].action,
    });
  };

  const checkPermission = (auth: string[]) => {
    return usePermission(auth);
  };
</script>
<template>
  <a-dropdown>
    <a @click.stop>
      <slot />
    </a>
    <template #overlay>
      <a-menu @click="handleClick">
        <template v-for="(it, index) in props.options" :key="index">
          <a-menu-divider v-if="it.divider" />
          <a-menu-item v-if="!it.auth || checkPermission(it.auth)" :key="index">
            <span :style="{ color: it.divider ? 'red' : '#000' }">
              {{ it.label }}
            </span>
          </a-menu-item>
        </template>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style lang="scss" scoped>
  // .components-drop-down {
  // }
  //
</style>
