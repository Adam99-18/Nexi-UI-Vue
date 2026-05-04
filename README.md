# Nexi-UI Vue 4.x

企业级中后台 Vue 3 组件库，基于 [Ant Design Vue 4.x](https://github.com/Adam99-18/Nexi-UI-Vue) 深度封装，覆盖 30+ 高频业务场景。

## 安装

```bash
npm install nexi-ui ant-design-vue @ant-design/icons-vue
```

## 快速使用

```ts
// main.ts
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import NexiUI from 'nexi-ui'
import 'ant-design-vue/dist/reset.css'
import 'nexi-ui/style.css'

const app = createApp(App)
app.use(Antd).use(NexiUI).mount('#app')
```

```vue
<template>
  <NexiButton type="primary" auth="user:create">新建</NexiButton>
  <NexiTable :columns="columns" :data-source="data" />
</template>

<script setup>
import { Button as NexiButton, Table as NexiTable } from 'nexi-ui'
</script>
```

## 文档

完整文档请访问：[在线文档](https://nexiui.top/)

<!-- 本地运行文档：

```bash
git clone <repo-url> && cd Nexi-ui
npm install
npm run docs:dev
``` -->

## 依赖要求

| 依赖 | 版本 |
|------|------|
| Vue | >= 3.3.0 |
| ant-design-vue | ^4.0.0 |
| @ant-design/icons-vue | ^7.0.0 |

## License

MIT
