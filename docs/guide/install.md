# 安装说明

## 环境要求

- **Node.js** >= 18
- **Vue** >= 3.3.0
- **ant-design-vue** >= 4.0.0

## 安装

```bash
npm install Nexi-ui
```

## 前置依赖

`Nexi-ui` 的 peerDependencies 需要你在项目中预先安装：

```bash
npm install ant-design-vue@^4.0.0 @ant-design/icons-vue@^7.0.0
```

组件库内部依赖了以下工具库，安装时会自动带入：

| 依赖 | 用途 |
|------|------|
| `lodash-es` | 工具函数（debounce、cloneDeep 等） |
| `sortablejs` + `vuedraggable` | Table 组件拖拽排序 |
| `dayjs` | 日期处理（WeekCalendar） |

## 全局样式

在入口文件引入 ant-design-vue 样式：

```ts
// main.ts
import 'ant-design-vue/dist/reset.css'
```

## Composable 接入

部分组件依赖宿主项目提供以下 composable，请确保在你的项目中可用：

| Composable | 签名 | 用途 | 使用组件 |
|------|------|------|------|
| `usePermission(auth)` | `(auth: string) => boolean` | 权限校验 | Button、Action、DropDown |
| `useGlobalStore()` | 返回 `{ toggleGlobalModal }` | 全局弹窗状态（Pinia） | Modal、ModalForm、ModalTip |
| `useDictionaryStore()` | 返回 `{ dictionaryFilter }` | 字典数据 | CheckboxFilter、CheckboxFilterSearch |
| `useTool()` | 返回 `{ resetObj }` | 对象重置工具 | Form |
| `useRuntimeConfig()` | 返回 `{ public: { fontUrl } }` | 运行时配置 | IconFont |

### Schema 类型

以下类型接口需在项目中定义（或使用组件库导出的类型）：

```ts
// types/antd/action.ts
export interface ActionItem {
  label: string
  auth?: string
  disabled?: boolean
  click?: (record?: any) => void
}

// composables/useQueryForm.ts
export interface QueryForm {
  search?: (values?: any) => void
  reset?: () => void
}

// composables/useForm.ts
export interface FormParams {
  open?: (record?: any) => void
  close?: () => void
}
```
