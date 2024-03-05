<template>
  <!-- 布局的最外层结构 -->
  <html>
  <head>
    <!-- 可以包含全局的 head 标签，如 meta、title、link 等 -->
    <meta charset="UTF-8">
    <title>知识库</title>
  </head>
  <body>
  <!-- 应用的主容器 -->
  <div id="app">
      <div class="ReactApp">
          <div class="brain">
              <div class="main-wrapper">
                <div id="main-right-content">
                  <div class="layout-module">
                    <div class="brain-main">
                      <div class="main-wrapper">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>

    <!-- 插槽，用于插入当前页面的内容 -->
    <slot></slot>

    <!-- 页脚或其他全局组件 -->
    <footer>
      <!-- 页脚内容 -->
    </footer>
  </div>
  </body>
  </html>
</template>

<script setup>
// 导入必要的库或组件
import { ref } from 'vue';

// 定义响应式数据
const title = ref('My Nuxt 3 App');

// 可以定义一些全局的方法或计算属性
// ...
</script>

<style scoped>
/* 布局相关的样式 */
body {
  font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  width: 100vw;
  scroll-behavior: smooth;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  font-variant: tabular-nums;
  line-height: 1.5715;
  font-feature-settings: "tnum","tnum";
  height: 100%;
  color: #262626;
}
.ReactApp{
  box-sizing: border-box;
}
.brain{
  position: relative;
  background: #fff;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-wrapper{
  flex: 1 0;
  width: 100%;
  box-sizing: border-box;
}
#main-right-content{
  width: 100%;
  overflow-y: auto;
  padding-top: 0;
  box-sizing: border-box;
}
.layout-module{
  min-height: calc(100vh - 108px);
  box-sizing: border-box;
}
.brain-main{
  position: relative;
  background: #fff;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
</style>