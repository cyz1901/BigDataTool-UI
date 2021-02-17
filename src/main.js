import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './config/store'
// import index from './config/index'
import vuetify from './plugins/vuetify'
import './assets/icon/iconfont.css'
import axios from 'axios'

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
new Vue({
  router,
  store,
  // index,
  vuetify,
  render: h => h(App)
}).$mount('#app')
