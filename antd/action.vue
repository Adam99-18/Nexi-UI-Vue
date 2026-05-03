<script lang="tsx" setup>
import { computed, ref, h, type FunctionalComponent } from 'vue';
import { Popconfirm, Tooltip, type TooltipProps } from 'ant-design-vue';
import type { ActionItem } from './runtime';
import { debounce, isFunction, isString } from 'lodash-es';
import { isAsyncFunction, usePermission } from './runtime';
import Icons from './icon.vue';

const props = withDefaults(
  defineProps<{
    rowKey?: string;
    actions: ActionItem[];
    divider?: boolean;
    columnParams?: object;
  }>(),
  {
    rowKey: '',
    divider: true,
    columnParams: undefined,
  },
);

const loadingMap = ref(new Map<string, boolean>());

const computedActions = computed(() => {
  return props.actions
    .filter((item) => {
      const auth = item.auth;
      if (!auth || !auth.length) return true;
      return usePermission(auth);
    })
    .filter((item) => item.isShow === undefined || item.isShow !== false)
    .map((item) => {
      const onClick = item.onClick;
      if (isAsyncFunction(onClick)) {
        return {
          ...item,
          onClick: debounce(async () => {
            loadingMap.value.set(item.key, true);
            await onClick(props.columnParams).finally(() => {
              loadingMap.value.delete(item.key);
            });
          }),
        };
      } else if (isFunction(onClick)) {
        return {
          ...item,
          onClick: debounce(onClick),
        };
      }
      return { ...item };
    });
});

const getTooltip = (data: ActionItem['tooltip']): TooltipProps => {
  return {
    getPopupContainer: () => document?.body,
    placement: 'bottom',
    ...(isString(data) ? { title: data } : data),
  };
};

const ActionItemRender: FunctionalComponent<ActionItem> = (
  action,
  { slots },
) => {
  const { popConfirm, tooltip } = action;

  const PopconfirmRender = () => {
    if (popConfirm) {
      return h(Popconfirm, {
        ...popConfirm,
        onConfirm: () => action.onClick?.(),
      }, { default: slots.default });
    }
    return slots.default?.();
  };

  if (tooltip) {
    return h(Tooltip, getTooltip(tooltip), { default: PopconfirmRender });
  }
  return PopconfirmRender();
};
</script>
<template>
  <div>
    <template
      v-for="(actionItem, index) in computedActions"
      :key="`${index}-${actionItem.key || ''}`"
    >
      <ActionItemRender v-bind="actionItem">
        <a-button
          type="link"
          size="small"
          class="p-0!"
          :loading="!actionItem.popConfirm && loadingMap.get(actionItem.key)"
          @click.stop="!actionItem.popConfirm && actionItem.onClick?.()"
        >
          <template #icon>
            <Icons v-if="actionItem.icon" :icon="actionItem.icon" :size="13" class="inline-block" :class="{ 'mr-0': !!actionItem.label }" />
          </template>
          <a style="margin-inline-start: 0">{{ actionItem.label }}</a>
        </a-button>
      </ActionItemRender>
      <a-divider
        v-if="divider && index < computedActions.length - 1"
        type="vertical"
        class="ml-4px mr-4px"
      />
    </template>
  </div>
</template>
