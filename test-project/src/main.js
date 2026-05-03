import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import NexiUI from 'nexi-ui'
import 'nexi-ui/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(Antd)
app.use(NexiUI)
app.mount('#app')
