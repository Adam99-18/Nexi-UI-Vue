# 组件库文档规范 v1.0

## 一、文档目录结构

```
docs/
├── index.md                 # 文档首页/快速开始
├── guide/                   # 使用指南
│   ├── install.md           # 安装说明
│   ├── quick-start.md       # 快速开始
│   └── theme.md             # 主题定制
└── components/              # 组件文档
    ├── button.md
    ├── table.md
    ├── modal.md
    ├── form.md
    └── ...
```

## 二、组件文档模板

每个组件文档按以下 5 个章节组织，**顺序固定**：

### 2.1 标题与简介

```markdown
# Button 按钮

触发业务逻辑的操作按钮。

## 何时使用

- 需要触发一个操作时（如：提交表单、打开弹窗）
- 需要引导用户进行下一步操作时
```

**要求：**
- 一级标题：`组件英文名 + 中文名`
- 一段话简述组件用途
- "何时使用"列 2-5 个典型场景

### 2.2 代码演示

```markdown
## 代码演示

### 基础用法

最简单的按钮用法。

:::demo 通过 `type` 属性控制按钮类型。

​```vue
<template>
  <NexiButton type="primary" @click="handleClick">主按钮</NexiButton>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('clicked');
};
</script>
```
:::

### 幽灵按钮

...

### 不同尺寸

...
```

**要求：**
- 每个 demo 用 `###` 三级标题，命名体现场景
- 用 `:::demo` 包裹代码块，紧接的说明文字写在 `:::demo` 第一行
- demo 顺序：基础用法 → 变体/模式 → 尺寸 → 状态 → 特殊场景
- 每个 demo 必须可独立运行
- 避免在一个 demo 里堆砌多个不相关的用法

### 2.3 API

​```markdown
## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | `primary` \| `default` \| `dashed` \| `link` \| `text` | `default` | 否 |
| size | 按钮尺寸 | `small` \| `middle` \| `large` | `middle` | 否 |
| icon | 图标名称 | `string` | - | 否 |
| loading | 加载状态 | `boolean` | `false` | 否 |
| disabled | 禁用状态 | `boolean` | `false` | 否 |
| permission | 权限标识数组，为空表示不校验权限 | `string[]` | `[]` | 否 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 按钮内容 |
| icon | 自定义图标 |
```

**要求：**
- Props 表字段：参数、说明、类型、默认值、必填
- 类型使用 TypeScript 联合类型写法，反引号包裹
- 默认值中 `-` 表示无默认值
- Events 表字段：事件名、说明、回调参数
- Slots 表字段：插槽名、说明
- 如有 `Methods`（通过 ref 调用），追加 Methods 表，字段：方法名、说明、参数、返回值

### 2.4 类型定义

```markdown
## 类型定义

​```ts
// Button 组件类型
interface ButtonProps {
  type?: ButtonType;
  size?: "small" | "middle" | "large";
  icon?: string;
  loading?: boolean;
  disabled?: boolean;
  permission?: string[];
}
```
```

**要求：**
- 仅当组件涉及较复杂的自定义类型时添加此章节（如 Table 的 columns 定义）
- 简单组件可省略

### 2.5 注意事项

​```markdown
## 注意事项

- `permission` 为空数组时不校验权限，所有用户可见
- 图标名称对应 `@ant-design/icons-vue` 的图标名
- 按钮内置权限控制，无权限时不渲染 DOM
```

**要求：**
- 列出易错点、边界行为、与 Ant Design Vue 原生组件的差异
- 3-8 条，无序列表

## 三、Demo 编写规范

### 3.1 `:::demo` 块语法

```
:::demo 这是 demo 的简要说明，显示在预览区上方
\`\`\`vue
<template>
  ...
</template>
<script lang="ts" setup>
...
</script>
\`\`\`
:::
```

- `:::demo` 后面紧接说明文字（同一行），**不可省略**
- 代码块语言标记为 `vue`
- 样式写在 `<style scoped>` 内，禁止写全局样式
- demo 内不引入组件，框架层统一全局注册

### 3.2 Demo 分级

| 级别 | 用途 | 数量 |
|------|------|------|
| 基础用法 | 最小可用示例，展示核心 API | 1 |
| 功能演示 | 每个重要的 Props/功能一个 demo | 3-8 |
| 综合示例 | 组合多个功能的完整场景 | 1-2 |

## 四、全局文案规范

- 组件名在正文中始终用 PascalCase：`NexiButton`、`NexiTable`
- Props/Events 名写在反引号中：`` `type` ``、`` `click` ``
- 类型值写在反引号中：`` `primary` ``、`` `boolean` ``
- 表格中对齐方式：说明列左对齐，其余列居中
- 中文与英文/数字之间加空格：`支持 Vue 3`（页面渲染文本适用，Markdown 源码不强求）
- 章节之间空一行

## 五、文档优先级

核心组件（data-heavy）优先编写，建议顺序：

1. **P0 — 数据容器类**：Table、Form、SearchForm、Modal、ModalForm
2. **P1 — 输入控件类**：Input、TextArea、Select / DropDownSearch、CheckboxFilter、DatePicker
3. **P2 — 展示/交互类**：Button、Icon、Switch、Tabs、Loading、View、InfoCell
4. **P3 — 工具类**：Action、Null、Img、Html、WeekCalendar、ModalTip

## 六、文档框架要求

搭建文档站点时需满足：

- 基于 VitePress / VuePress 搭建，支持 Markdown 渲染
- demo 代码块需解析为可运行的 Vue SFC，并展示源码+预览双栏
- 左侧导航按 P0→P3 分组，组内按字母排序
- 支持深色/浅色主题切换
- 移动端响应式布局
- 生成图片使用教程流程图
- 主题颜色简约风格
