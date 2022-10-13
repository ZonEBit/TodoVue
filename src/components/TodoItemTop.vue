<template>
  <div class="page lists-show"
       v-show="!todo.isDelete">
    <!--最外层容器-->
    <nav>
      <!--容器上半部分-->
      <!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
      <div class="form list-edit-form"
           v-show="isUpdate">
        <input type="text"
               v-model="todo.title"
               @keyup.enter="updateTitle"
               :disabled="todo.locked">
        <div class="nav-group right">
          <a class="nav-item"
             @click="isUpdate = false">
            <span class="icon-close">
            </span>
          </a>
        </div>
      </div>
      <!--移动端的菜单图标-->
      <div class="nav-group"
           @click="$store.dispatch('updateMenu')"
           v-show="!isUpdate">
        <a class="nav-item">
          <span class="icon-list-unordered">
          </span>
        </a>
      </div>
      <!-- 标题数目 -->
      <h1 class="title-page"
          v-show="!isUpdate"
          @click="isUpdate = true">
        <span class="title-wrapper">{{todo.title}}</span> <!-- 标题-->
        <span class="count-list">{{todo.count || 0}}</span><!-- 数目-->
      </h1>
      <!-- 图标 -->
      <div class="nav-group right"
           v-show="!isUpdate">
        <!-- 右边的删除，锁定图标容器-->
        <div class="options-web">
          <a class=" nav-item"
             @click="onclock">
            <!-- 锁定图标-->
            <span class="icon-lock"
                  v-if="todo.locked"></span>
            <span class="icon-unlock"
                  v-else>
            </span>
          </a>
          <a class=" nav-item">
            <!-- 删除图标-->
            <span class="icon-trash"
                  @click="onDelete">
            </span>
          </a>
        </div>
      </div>

      <!-- 添加待办 -->
      <div class=" form todo-new input-symbol">
        <!-- 新增单个代办单项输入框,监听了回车事件，双向绑定text值,监听了disabled属性，在todo.locked为true的情况下无法编辑-->
        <input type="text"
               v-model="text"
               placeholder='请输入'
               @keyup.enter="onAdd"
               :disabled="todo.locked" />
        <span class="icon-add"></span>
      </div>
    </nav>
    <div class="content-scrollable list-items">
      <!--容器下半部分-->
      <div v-for="(item,index) in items"
           :key="index">
        <TodoItemBody :item="item"
                      :index="index"
                      :id="todo.id"
                      :init="init"
                      :locked="todo.locked" />
      </div>
    </div>
  </div>
</template>
<script>
import TodoItemBody from './TodoItemBody.vue'
import { getTodo, addRecord, editTodo } from '../api';
export default {
  name: 'TodoItemTop',
  data () {
    return {
      todo: { //详情内容
        title: '星期一',
        count: 12,
        locked: false
      },
      items: [],
      text: '',//新增代办单项绑定的值
      isUpdate: false // 新增修改状态
    }
  },
  methods: {
    init () {
      // 获取到 $route下params下的id,即我们在menus.vue组件处传入的数据。
      const ID = this.$route.params.id;
      getTodo({ id: ID }).then(res => {
        let { id, title, count, isDelete, locked, record } = res.data.todo;
        // 请求成功，拿到res.data.todo;在将record 赋值到代办单项列表，其它数据赋值到todo对象
        this.items = record;
        this.todo = {
          id: id,
          title: title,
          count: count,
          locked: locked,
          isDelete: isDelete
        };
      });
      // console.log(this.todo);
    },
    onAdd () {
      //当用户输入文字，并且回车时调用方法。
      const ID = this.$route.params.id;
      addRecord({ id: ID, text: this.text }).then(() => {
        this.text = '';
        this.init();
        //请求成功后初始化
      });
    },
    updateTodo () {
      let _this = this;
      editTodo({
        todo: this.todo
        // eslint-disable-next-line no-unused-vars
      }).then(data => {
        // _this.init();
        _this.$store.dispatch('getTodo');
      });
    },
    updateTitle () {
      this.updateTodo();
      this.isUpdate = false;
    },
    onclock () {
      this.todo.locked = !this.todo.locked;
      this.updateTodo();
    },
    onDelete () {
      this.todo.isDelete = true;
      this.updateTodo();
    }
  },
  components: {
    TodoItemBody
  },
  watch: {
    '$route.params.id' () {
      // 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
      this.init();
      this.isUpdate = false
    },
  },
  created () {
    this.init()
  }
}
</script>
<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>