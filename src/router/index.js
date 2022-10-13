import Vue from 'vue' // 导入Vue
import router from 'vue-router' // 导入vue-router 库
Vue.use(router) //全局注册Router组件，它会绑定到Vue实例里面。
import LayOuts from '@/components/LayOuts' // 导入layouts.vue 组件
import TodoItemTop from '@/components/TodoItemTop'
export default new router({ // 创建 router 实例，然后传 `routes` 配置
  mode:'hash',
  routes: [
    {
      path: '/',  //访问路径
      name: 'LayOuts', // 路径名
      component: LayOuts ,//访问的组件,即访问‘/’,它会加载 Layouts 组件所有的内容。
      children: [{
        name: 'todo',
        path: '/todo/:id',
        component:TodoItemTop
      }]
    }
  ]
})