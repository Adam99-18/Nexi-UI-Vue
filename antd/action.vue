<script lang="tsx" setup>
import { computed, ref, h, type FunctionalComponent } from 'vue';
import { Popconfirm, Tooltip, type TooltipProps } from 'ant-design-vue';
import type { ActionItem } from '@/types/antd/action';
import { debounce, isFunction, isString } from 'lodash-es';
import { isAsyncFunction } from '@/utils/is';
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
const computedActions = computed(() => {
  const actions = props.actions
    .filter((item) => {
      const auth = item.auth;
      if (!auth || !auth.length) return true;
      const result = usePermission(auth);
      if (!result) {
        return false;
      }
      return true;
    })
    .map((item) => {
      const onClick = item.onClick;
      // && !hasClickFnFlag(onClick)
      if (isAsyncFunction(onClick)) {
        item.onClick = debounce(async () => {
          loadingMap.value.set(item.key, true);
          await onClick(props.columnParams).finally(() => {
            loadingMap.value.delete(item.key);
          });
        });
        // setClickFnFlag(item.onClick);
        // && !hasClickFnFlag(onClick)
      } else if (isFunction(onClick)) {
        item.onClick = debounce(onClick);
        // setClickFnFlag(item.onClick);
      }
      if (item.icon) {
        // <Icons
        //     icon={item.icon}
        //     size={13}
        //     class={{ 'inline-block': true, 'mr-0': !!item.label }}
        //   />
        item.icon = h(Icons, {
          icon: item.icon,
          size: 13,
          class: { 'inline-block': true, 'mr-0': !!item.label },
        });
      }

      return item;
    });
  return actions.filter(
    (item) => item.isShow === undefined || item.isShow !== false,
  );
});
const loadingMap = ref(new Map<string, boolean>());

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
      return h(Popconfirm, popConfirm, { default: slots.default });
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
          v-bind="actionItem"
          :loading="loadingMap.get(actionItem.key)"
          @click.stop="actionItem.onClick"
        >
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
