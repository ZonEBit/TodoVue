import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex)

import * as actions from './actions'
import * as getters from './getters'



const mutations = {
  EDITTODE(state, data) { // 定义名为 EDITTODE函数用作改变todoList的值
    state.todoList = data;
  },
  MENUOPEN(state) { // 定义名为 MENUOPEN函数用作改变menuOpen的值
    state.menuOpen = !state.menuOpen;
  }
}

const state = {
  todoList: [], //指我们的待办事项列表数据 
  menuOpen: false //移动端的时候菜单是否开启
}


export default new Vuex.Store({
  mutations,
  state,
  actions,
  getters
})