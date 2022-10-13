<template>
  <div class="list-todos">
    <!--菜单容器-->
    <a @click="goList(item.id)"
       class="list-todo activeListClass list"
       :class="{'active':item.id===todoId}"
       v-for="(item,index) in todoList"
       :key="index">
      <!--单个菜单容器-->
      <span class="icon-lock"
            v-if="item.locked"></span>
      <!--锁的图标-->
      <span class="count-list"
            v-if="item.count>0">{{item.count}}</span>
      <!--数字-->
      {{item.title}}
      <!--菜单内容-->
    </a>
    <a class=" link-list-new"
       @click="addTodoList">
      <!--新增菜单-->
      <span class="icon-plus">
      </span>
      新增
    </a>
  </div>
</template>
<script>
import { addTodo } from '@/api'
export default {
  name: 'TodoMenus',
  data () { //data函数
    return {
      items: [],
      todoId: ''
    };
  },
  computed: {
    todoList () {
      return this.$store.getters.getTodoList;
    }
  },
  created () {
    this.$store.dispatch('getTodo').then(() => { //调用vuex actions.js 里面的 getTodo函数
      this.$nextTick(() => {
        this.goList(this.todoList[0].id);
      });
    });
  },
  methods: {
    goList (id) {
      this.todoId = id
    },
    addTodoList () { // 点击新增按钮时候调用vuex actions.js 里面的 getTodo函数
      // eslint-disable-next-line no-unused-vars
      addTodo({}).then(data => {
        this.$store.dispatch('getTodo').then(() => {
          this.$nextTick(() => {
            setTimeout(() => {
              this.goList(this.todoList[this.todoList.length - 1].id);
            }, 100);
          });
        });
      });
    }
  },
  watch: {
    'todoId' (id) {
      this.$router.push({ name: 'todo', params: { id: id } });
      //监听到用户的点击todoId的变化在跳转路由
    }
  }
}
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>