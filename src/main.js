import Vue from 'vue'
import App from './App.vue'
import Mock from './mock'; // 引入mock模块
Mock.start(); //并且执行初始化函数

import store from './store'

Vue.config.productionTip = false
import router from './router'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
