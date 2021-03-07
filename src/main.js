import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
// import index from './config/index'
import vuetify from './plugins/vuetify'
import './assets/icon/iconfont.css'
import axios from 'axios'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

Vue.config.productionTip = false
Vue.prototype.$axios = axios // 全局注册，使用方法为:this.$axios

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.name) {
//     document.title = to.name
//   }
//   next()
// })
document.title = 'BigDataTool'

// import ECharts modules manually to reduce bundle size

// register globally (or you can do it locally)

new Vue({
  router,
  store,
  // index,
  vuetify,
  render: h => h(App)
}).$mount('#app')
