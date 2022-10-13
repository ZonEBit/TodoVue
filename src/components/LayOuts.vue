<template>
  <section class="container"
           :class="{'menu-open': menuOpen}">
    <!--最外层容器-->
    <section class="menu">
      <!--左边的容器-->
      <TodoMenus />
    </section>
    <div class="content-overlay"
         @click="$store.dispatch('updateMenu')">
    </div>
    <div class="content-container">
      <!--右边的容器-->
      <router-view></router-view>
    </div>
  </section>
</template>
<script>
import TodoMenus from './TodoMenus.vue'
export default {
  name: 'LayOuts',
  components: {
    TodoMenus,
  },
  computed: {
    menuOpen () {
      return this.$store.state.menuOpen;
    }
  }
};
</script>
<style lang="less">
@import '../common/style/layouts.less';
</style>