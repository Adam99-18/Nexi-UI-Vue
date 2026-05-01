# Antd → Nexi 组件重命名报告

> 生成日期: 2026-05-01 | 仓库: Nexi-UI (antdesign-vue)

---

## 一、总览

| 维度 | 数量 |
|------|------|
| 需要修改的文件总数 | **41 个** |
| 核心注册逻辑 | 1 个文件 |
| 内部组件模板/脚本 | 11 个文件 |
| 文档 (.md) | 26 个文件 |
| 项目配置/说明 | 3 个文件 |

---

## 二、核心：组件注册逻辑（1 个文件）

### `docs/.vitepress/theme/index.ts` — 第 21、26 行

这是整个 `Antd` 前缀的**唯一生成点**。它扫描 `antd/` 目录下的所有 `.vue` 文件，自动生成 PascalCase 和 kebab-case 两种注册名。

**当前代码:**
```ts
const name = 'Antd' + filename
  .split('-')
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join('')
app.component(name, comp)
app.component(`antd-${filename}`, comp)
```

**需改为:**
```ts
const name = 'Nexi' + filename
  .split('-')
  .map(s => s.charAt(0).toUpperCase() + s.slice(1))
  .join('')
app.component(name, comp)
app.component(`nexi-${filename}`, comp)
```

**影响范围:** 31 个组件全部自动从 `AntdXxx` / `antd-xxx` 变为 `NexiXxx` / `nexi-xxx`。

---

## 三、内部组件文件（11 个）

### 3.1 模板中的组件标签引用（7 个文件，简单替换）

这些文件仅在 `<template>` 中使用 `<AntdIcon>` 或 `<AntdNull>` 标签，将 `Antd` 替换为 `Nexi` 即可。

| 文件 | 行号 | 改动内容 |
|------|------|----------|
| `antd/button.vue` | 52 | `<AntdIcon>` → `<NexiIcon>` |
| `antd/checkbox-filter.vue` | 25-26 | `<AntdIcon>` → `<NexiIcon>` |
| `antd/checkbox-filter-search.vue` | 268, 275-276 | `<AntdNull>` → `<NexiNull>`, `<AntdIcon>` → `<NexiIcon>` |
| `antd/drop-down-filter.vue` | 416 | `<AntdIcon>` → `<NexiIcon>` |
| `antd/modal-tip.vue` | 77 | `<AntdIcon>` → `<NexiIcon>` |
| `antd/table-backup.vue` | 230, 275, 281, 296 | `<AntdIcon>` → `<NexiIcon>` (4处) |
| `antd/week-calendar.vue` | 112 | `<AntdNull>` → `<NexiNull>` |

### 3.2 表单组件中的本地 Antd 查找对象（3 个文件，结构化替换）

这三个文件是动态表单的核心，它们维护了一个本地 JavaScript 对象 `Antd`，用字符串 key 映射到实际组件，然后通过 `:is="Antd[column.component]"` 动态渲染。

#### a) `antd/form.vue`

**import 语句（第 14-16 行）:**
```ts
import AntdDropDownSearch from "@/components/antd/drop-down-search.vue";
import AntdTextArea from "@/components/antd/text-area.vue";
import AntdView from "@/components/antd/view.vue";
```
→ 改为:
```ts
import NexiDropDownSearch from "@/components/antd/drop-down-search.vue";
import NexiTextArea from "@/components/antd/text-area.vue";
import NexiView from "@/components/antd/view.vue";
```
注意：路径 `@/components/antd/` **不需要改**（那是目录名）。

**本地 Antd 对象（第 20-33 行）:** 所有 key 中的 `Antd` → `Nexi`:
```ts
const Nexi: any = {
  NexiInput: Input,
  NexiTextArea,
  NexiInputNumber: InputNumber,
  NexiSelect: Select,
  NexiTreeSelect: TreeSelect,
  NexiRadioGroup: RadioGroup,
  NexiNexiDropDownSearch: NexiDropDownSearch,   // 原先的 AntdAntdDropDownSearch
  NexiCheckbox: Checkbox,
  NexiCheckboxGroup: CheckboxGroup,
  NexiDatePicker: DatePicker,
  NexiView,
};
```

**模板中的引用（第 137、174 行）:** `Antd[...]` → `Nexi[...]`:
```html
:is="Nexi[`${column.component}`]"
```

#### b) `antd/modal-form.vue`

与 `form.vue` 相同模式：
- import 名: `AntdDropDownSearch` → `NexiDropDownSearch`, `AntdTextArea` → `NexiTextArea`, `AntdView` → `NexiView`
- 本地对象名: `const Antd` → `const Nexi`
- 所有 key 前缀: `Antd` → `Nexi`（含 `AntdAntdDropDownSearch` → `NexiNexiDropDownSearch`）
- 模板引用 (第 217、260 行): `Antd[...]` → `Nexi[...]`

#### c) `antd/search-form.vue`

import 语句（第 4-8 行）:
```ts
import AntdDropDownSearch from ... → import NexiDropDownSearch from ...
import AntdDropDown from ...       → import NexiDropDown from ...
import AntdTimeItem from ...       → import NexiTimeItem from ...
import AntdCheckboxFilter from ...       → import NexiCheckboxFilter from ...
import AntdCheckboxFilterSearch from ... → import NexiCheckboxFilterSearch from ...
```

本地对象（第 9-23 行）: key 前缀 `Antd` → `Nexi`

模板中的字符串比较（第 144、149、166 行）:
```ts
column.component === 'AntdSelect'              → 'NexiSelect'
['AntdSelect', 'AntdCheckboxFilterSearch', 'AntdCheckboxFilter']  → 对应 Nexi 前缀
```

模板引用（第 126 行）: `Antd[...]` → `Nexi[...]`

### 3.3 不需要改动的地方

- **CSS 类名** `.ant-btn`, `.ant-form-item`, `.ant-modal-title` 等 — 这些来自 `ant-design-vue` 底层库，与本次重命名无关
- **`ant-design-vue` 导入** `import { Input } from 'ant-design-vue'` — 这是第三方包名，不能改
- **文件路径** `@/components/antd/` — 这是实际目录名，不需要改

---

## 四、文档文件（26 个 .md 文件）

### 4.1 指南文档（3 个）

| 文件 | 改动说明 |
|------|----------|
| `docs/guide/quick-start.md` | 所有模板中的 `<AntdButton>`, `<AntdForm>`, `<AntdTable>`, `<AntdModal>` 等 → `Nexi` 前缀 |
| `docs/guide/theme.md` | `<AntdButton>` → `<NexiButton>` |
| `docs/guide/install.md` | 检查是否有 Antd 引用（大概率无） |

### 4.2 组件文档（24 个 `docs/components/*.md`）

每个文件包含 3 类 `Antd` 引用：

1. **Vue 模板示例:** `<AntdButton>`, `<AntdTable>`, `<AntdIcon>` 等 → `<NexiXxx>`
2. **import 语句中的变量名:** `import AntdButton from '@/components/antd/button.vue'` → `import NexiButton from ...`（路径不变）
3. **字符串 component 类型:** `component: 'AntdInput'`, `component: 'AntdSelect'` 等 → `'NexiInput'`, `'NexiSelect'`

具体文件清单：
```
docs/components/action.md
docs/components/button.md
docs/components/checkbox-filter-search.md
docs/components/checkbox-filter.md
docs/components/drop-down-filter.md
docs/components/drop-down-search.md
docs/components/drop-down.md
docs/components/form.md
docs/components/html.md
docs/components/icon.md
docs/components/img.md
docs/components/info-cell.md
docs/components/input.md
docs/components/loading.md
docs/components/modal-form.md
docs/components/modal-tip.md
docs/components/modal.md
docs/components/null.md
docs/components/search-form.md
docs/components/switch.md
docs/components/table.md
docs/components/tabs.md
docs/components/text-area.md
docs/components/time-item.md
docs/components/view.md
docs/components/week-calendar.md
```

---

## 五、项目配置文件（3 个）

### `README.md`
- 第 31 行: `import { Button as AntdButton, Table as AntdTable } from 'Nexi-ui'` → `as NexiButton, as NexiTable`
- 第 26-27 行: 模板中的 `<AntdButton>`, `<AntdTable>` → `<NexiXxx>`

### `docs-spec.md`
- 第 55 行: `<AntdButton>` → `<NexiButton>`
- 第 188 行: 命名规则说明 `AntdButton`, `AntdTable` → `NexiButton`, `NexiTable`

### `package.json`
- 第 35 行 keywords: `"antd-vue"` → 可保留或移除（这是 SEO 关键词，不影响功能），建议替换为 `"nexi-vue"`

---

## 六、不需要修改的内容

| 项目 | 原因 |
|------|------|
| `antd/` 目录名 | 这是文件系统路径，不影响组件注册名 |
| `import { X } from 'ant-design-vue'` | 第三方依赖包名 |
| `@ant-design/icons-vue` | 第三方依赖包名 |
| CSS 类名 `.ant-*` | 来自 ant-design-vue 底层库 |
| `package.json` 的 `name: "Nexi-ui"` | 已经是 Nexi |
| `node_modules/` | 不纳入版本控制 |
| `antd/index.ts` 导出名 | 导出的是 `Button`, `Table` 等短名，不包含前缀 |

---

## 七、执行策略建议

### 方案 A：全局查找替换（推荐）

对所有源文件执行 `Antd` → `Nexi` 的查找替换，然后手动排除不需要改的地方（`ant-design-vue`、CSS 类名等）。因为 `Antd`（首字母大写）在项目中**仅用于本库组件命名**，与 `ant-design-vue`（全小写）不冲突。

**风险点：**
- `antd/` 目录名不要改
- `.css` 文件中的 `.ant-` 类名不要改
- `node_modules` 不要动
- `AntdAntdDropDownSearch` 会变成 `NexiNexiDropDownSearch`（含义未变，但建议顺带清理为 `NexiDropDownSearch`）

### 方案 B：逐文件手动修改

按以下顺序执行，每一步改完后验证：

1. **第一步:** `docs/.vitepress/theme/index.ts` — 改注册逻辑
2. **第二步:** 7 个简单模板文件 — button, checkbox-filter, checkbox-filter-search, drop-down-filter, modal-tip, table-backup, week-calendar
3. **第三步:** 3 个表单文件 — form.vue, modal-form.vue, search-form.vue
4. **第四步:** 26 个文档文件
5. **第五步:** README.md, docs-spec.md

### 向后兼容性

如果下游项目已经使用了 `AntdButton` 等名称，需要在 `docs/.vitepress/theme/index.ts` 中保留旧注册名作为别名：

```ts
app.component(name, comp)           // NexiButton (新)
app.component(`nexi-${filename}`, comp)  // nexi-button (新)
app.component(`Antd${pascalName}`, comp) // 兼容旧名 (可后续移除)
```

---

## 八、影响范围总结

```
docs/.vitepress/theme/index.ts          ← 改 2 行 (核心)
antd/form.vue                           ← 改 import + 对象 + 模板 (约 20 处)
antd/modal-form.vue                     ← 同上
antd/search-form.vue                    ← 同上 + 字符串比较 (约 25 处)
antd/button.vue                         ← 改 1 处模板标签
antd/checkbox-filter.vue                ← 改 2 处模板标签
antd/checkbox-filter-search.vue         ← 改 3 处模板标签
antd/drop-down-filter.vue              ← 改 1 处模板标签
antd/modal-tip.vue                      ← 改 1 处模板标签
antd/table-backup.vue                   ← 改 4 处模板标签
antd/week-calendar.vue                  ← 改 1 处模板标签
docs/components/*.md (24 files)         ← 每个文件约 3-30 处
docs/guide/*.md (2 files)               ← 每文件约 5-50 处
README.md                               ← 约 5 处
docs-spec.md                            ← 约 2 处
package.json                            ← 1 处 keyword (可选)
```

**预估总改动量:** 约 300-500 处替换，涉及 41 个文件。
