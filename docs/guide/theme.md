# 主题定制

## 品牌色

覆盖 CSS 变量即可切换主题色：

```css
:root {
  --theme-default-color: #1677ff;   /* 主题色 */
  --text-color: rgba(0, 0, 0, 0.85); /* 文字色 */
  --border-color: #d9d9d9;          /* 边框色 */
  --bg-color: #f5f5f5;              /* 背景色 */
}
```

### 预设色板

```css
:root {
  --theme-default-color: #52c41a; /* 绿色 */
}
```

```css
:root {
  --theme-default-color: #f5222d; /* 红色 */
}
```

```css
:root {
  --theme-default-color: #722ed1; /* 紫色 */
}
```

## 深色主题

```css
.dark {
  --theme-default-color: #1677ff;
  --text-color: rgba(255, 255, 255, 0.85);
  --border-color: #424242;
  --bg-color: #141414;
}
```

## 按钮绿色变体

Button 组件内置绿色样式，通过属性切换：

```vue
<AntdButton color="green">绿色按钮</AntdButton>
```
