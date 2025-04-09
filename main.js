
// #ifndef VUE3
import Vue from 'vue'
// import elementPlus from 'element-plus'
import App from './App';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from '/store/vuex.js'
import App from './App.vue'
import AICover from '/pages/AI/component/cover'
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.component('AICover', AICover)
  
  	// app.use(ElementPlus, {
  		// locale
	// })
  // app.use(elementPlus)
  return {
    app
  }
}
// #endif