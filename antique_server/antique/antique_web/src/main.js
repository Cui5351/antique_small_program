import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/router.config'
import ElementPlus from "element-plus"
import '../node_modules/element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
createApp(App)
.use(Router)
.use(ElementPlus,{
    locale:zhCn
})
.mount('#app')
