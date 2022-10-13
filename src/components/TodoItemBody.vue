<template>
  <transition name="slide-fade">
    <div class="list-item editingClass editing"
         :class="{checked: item.checked}"
         v-show="!item.isDelete">
      <!-- 最外层容器-->
      <label class="checkbox">
        <!--自定义的多选框-->
        <input type="checkbox"
               v-model="itemMsg.checked"
               name="checked"
               @change="onChange"
               :disabled="locked">
        <span class="checkbox-custom"></span>
      </label>
      <input type="text"
             v-model="itemMsg.text"
             placeholder='写点什么。。。'
             :disabled=" item.checked || locked"
             @keyup.enter="onChange">
      <!--绑定item.text-->
      <a class="delete-item"
         v-if="item.checked && !locked"
         @click="itemMsg.isDelete = true;onChange()">
        <!--删除图标-->
        <span class="icon-trash"></span>
      </a>
    </div>
  </transition>

</template>
<script>
import { editRecord } from '../api';
export default {
  name: 'TodoItemBody',
  data () {
    return {
      // 双向绑定会改变数据，因此用一个自定义的变量来接收父组件传递的变量
      itemMsg: this.item
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          checked: false,
          text: '你好,世界'
        }
      }
    },
    'index': {
    },
    'id': {
    },
    'init': {
    },
    'locked': {

    },
  },

  watch: {
    item: function (newVal) {
      this.itemMsg = newVal;
    }
  },
  methods: {
    onChange () {
      editRecord({
        id: this.id, record: this.itemMsg, index: this.index
        // eslint-disable-next-line no-unused-vars
      }).then(data => {
        this.init();
        this.$store.dispatch('getTodo');
      });
    }
  }
}

</script>
<style lang="less">
@import '../common/style/list-items.less';
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>