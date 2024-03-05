<template >
  <NuxtLayout>
    <template v-slot:sidebar>
    <!-- 侧边栏的具体内容 -->
    <div class="sidebar-icon">
      <div class="logo">
        <a href="http://localhost:3000">
        <img class="image" src="../assets/images/鸟.png" style="height: 28px">
        </a>
      </div>
    </div>
    </template>

    <!-- 主内容 -->
  <div slot="main">
    <div class="main-content">
      <!-- 主内容的具体内容 -->
    </div>
  </div>
  </NuxtLayout>
</template>

<script>
import MainLayout from '../layouts/default.vue';

export default {
  components: {
    MainLayout // 注册 MainLayout 组件以便在模板中使用
  }
};
</script>

<style scoped>
.sidebar-icon{
  display: flex;
  justify-content: space-between;
  line-height: 32px;
  height: 32px;
  padding: 0 12px;
}
.logo{
  min-width: 105px;
  display: flex;
}
</style>